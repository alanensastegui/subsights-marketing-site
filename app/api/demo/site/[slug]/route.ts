import { NextRequest, NextResponse } from "next/server";
import { getDemoTarget } from "@/lib/demo/config";
import { injectWidget } from "@/lib/demo/html";

export const revalidate = 0;

// Types
interface ProxyError {
    reason: string;
    message: string;
    status?: number;
}

interface ProxyResult {
    success: boolean;
    html?: string;
    error?: ProxyError;
}

// Constants - optimized for server environment
const PROXY_TIMEOUT_MS = 10000;
const SUCCESS_STATUS_CODES = [200, 201, 202, 203, 206];

// Error HTML templates
const createErrorHtml = (reason: string, message: string): string => `
<!DOCTYPE html>
<html>
<head><title>Demo Error</title></head>
<body>
<script>
window.parent?.postMessage({ 
    type: "subsights:proxy", 
    status: "error", 
    reason: "${reason}" 
}, "*");
</script>
<div style="display:none;">${message}</div>
</body>
</html>`;

// Validation functions
const isValidTarget = (target: ReturnType<typeof getDemoTarget>): target is NonNullable<ReturnType<typeof getDemoTarget>> => {
    return target !== null;
};

const isHtmlResponse = (contentType: string): boolean => {
    return contentType.includes("text/html");
};

const isSuccessfulResponse = (status: number): boolean => {
    return SUCCESS_STATUS_CODES.includes(status);
};

// Fetch target site with timeout - optimized for server environment
const fetchTargetSite = async (url: string, userAgent: string): Promise<Response> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PROXY_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            headers: {
                "user-agent": userAgent,
                // Add headers for better compatibility with various sites
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "accept-language": "en-US,en;q=0.5"
            },
            redirect: "follow",
            signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
};

// Process successful HTML response
const processHtmlResponse = async (response: Response, targetUrl: string, slug: string, scriptTag: string): Promise<string> => {
    const html = await response.text();

    return injectWidget({
        html,
        origin: targetUrl,
        slug,
        scriptTag,
    });
};

// Handle different error scenarios
const handleResponseError = (response: Response): ProxyError => {
    if (!isSuccessfulResponse(response.status)) {
        return {
            reason: "proxy-http-error",
            message: `Target site returned error status: ${response.status}`,
            status: response.status,
        };
    }

    const contentType = response.headers.get("content-type") || "";
    if (!isHtmlResponse(contentType)) {
        return {
            reason: "proxy-not-html",
            message: "Target site did not return HTML content",
        };
    }

    return {
        reason: "proxy-unknown-error",
        message: "Unknown response error",
    };
};

// Handle fetch errors - enhanced for server environment
const handleFetchError = (error: unknown): ProxyError => {
    if (error instanceof Error) {
        if (error.name === 'AbortError') {
            return {
                reason: "proxy-timeout",
                message: "Target site took too long to respond",
            };
        }
        return {
            reason: "proxy-error",
            message: `Failed to fetch target site: ${error.message}`,
        };
    }

    return {
        reason: "proxy-error",
        message: "Failed to fetch target site: Unknown error",
    };
};

// Main proxy logic
const proxyTargetSite = async (target: NonNullable<ReturnType<typeof getDemoTarget>>, userAgent: string): Promise<ProxyResult> => {
    try {
        const response = await fetchTargetSite(target.url, userAgent);

        // Check for response errors
        const responseError = handleResponseError(response);
        if (responseError.reason !== "proxy-unknown-error") {
            return { success: false, error: responseError };
        }

        // Process successful HTML response
        const modifiedHtml = await processHtmlResponse(response, target.url, target.slug, target.scriptTag);

        return { success: true, html: modifiedHtml };
    } catch (error) {
        const fetchError = handleFetchError(error);
        return { success: false, error: fetchError };
    }
};

// Main route handler - optimized for server environment
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const startTime = Date.now();

    try {
        const { slug } = await params;
        const target = getDemoTarget(slug);

        if (!isValidTarget(target)) {
            console.warn(`[Proxy] Demo target not found: ${slug}`);
            return new NextResponse("Demo target not found", { status: 404 });
        }

        const userAgent = req.headers.get("user-agent") ?? "";
        const result = await proxyTargetSite(target, userAgent);

        if (!result.success || !result.html) {
            const error = result.error!;
            const duration = Date.now() - startTime;

            console.error(`[Proxy] ${target.slug} failed after ${duration}ms:`, {
                reason: error.reason,
                message: error.message,
                status: error.status,
                targetUrl: target.url
            });

            const errorHtml = createErrorHtml(error.reason, error.message);
            return new NextResponse(errorHtml, {
                status: 200,
                headers: { "content-type": "text/html; charset=utf-8" }
            });
        }

        // Return successful response
        const duration = Date.now() - startTime;
        console.log(`[Proxy] ${target.slug} succeeded in ${duration}ms`);

        const headers = new Headers({
            "content-type": "text/html; charset=utf-8",
        });

        return new NextResponse(result.html, { headers });
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[Proxy] Unexpected error after ${duration}ms:`, error);

        const errorHtml = createErrorHtml("proxy-error", "Unexpected proxy error");
        return new NextResponse(errorHtml, {
            status: 200,
            headers: { "content-type": "text/html; charset=utf-8" }
        });
    }
}
