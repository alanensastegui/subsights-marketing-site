import { NextRequest, NextResponse } from "next/server";
import { getDemoTarget } from "@/lib/config/demo-targets";
import { FALLBACK_CONSTANTS } from "@/lib/demo/fallback";

export const runtime = "nodejs";
export const revalidate = 0;

type ProbeResult = {
    frameLikelyAllowed: boolean;
    signals: {
        xfo?: string;
        csp?: string;
        reason?: string;
    };
};

function parseXFrameOptions(value: string): boolean {
    const normalized = value.toLowerCase().trim();
    return !normalized.includes("deny") && !normalized.includes("sameorigin");
}

function parseCSPFrameAncestors(cspValue: string): boolean {
    const normalized = cspValue.toLowerCase();

    // Look for frame-ancestors directive
    const frameAncestorsMatch = normalized.match(/frame-ancestors\s+([^;]+)/);
    if (!frameAncestorsMatch) return true; // No frame-ancestors restriction

    const directive = frameAncestorsMatch[1].trim();

    // Check for restrictive values
    if (directive.includes("'none'") || directive.includes("'self'")) {
        return false;
    }

    return true; // Allows other origins or wildcards
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
        return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
    }

    const target = getDemoTarget(slug);
    if (!target) {
        return NextResponse.json({ error: "Unknown demo target" }, { status: 404 });
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
            () => controller.abort(),
            FALLBACK_CONSTANTS.IFRAME_PROBE_TIMEOUT_MS
        );

        const response = await fetch(target.url, {
            method: "HEAD",
            signal: controller.signal,
            headers: {
                "User-Agent": req.headers.get("user-agent") ?? "Mozilla/5.0 (compatible; SubsightsBot/1.0)",
            },
            redirect: "follow",
        });

        clearTimeout(timeoutId);

        const xfo = response.headers.get("x-frame-options");
        const csp = response.headers.get("content-security-policy");

        let frameLikelyAllowed = true;
        let reason = "";

        // Check X-Frame-Options
        if (xfo && !parseXFrameOptions(xfo)) {
            frameLikelyAllowed = false;
            reason = `X-Frame-Options: ${xfo}`;
        }

        // Check CSP frame-ancestors (only if XFO didn't already block)
        if (frameLikelyAllowed && csp && !parseCSPFrameAncestors(csp)) {
            frameLikelyAllowed = false;
            reason = "CSP frame-ancestors restriction";
        }

        const result: ProbeResult = {
            frameLikelyAllowed,
            signals: {
                xfo: xfo || undefined,
                csp: csp || undefined,
                reason: reason || undefined,
            },
        };

        // Log the probe result for observability
        console.log(`[Probe] ${slug}: frameLikelyAllowed=${frameLikelyAllowed}`, {
            url: target.url,
            xfo,
            csp: csp?.substring(0, 100), // Truncate for logging
            reason,
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error(`[Probe] ${slug} failed:`, error);

        const result: ProbeResult = {
            frameLikelyAllowed: false,
            signals: {
                reason: error instanceof Error ? error.message : "Probe request failed",
            },
        };

        return NextResponse.json(result);
    }
}
