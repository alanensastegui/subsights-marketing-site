import { NextRequest, NextResponse } from "next/server";
import { getDemoTarget } from "@/lib/demo/config";
import { injectWidget } from "@/lib/demo/html";

export const runtime = "nodejs"; // server function on Netlify
export const revalidate = 0;      // no caching for demos

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const target = getDemoTarget(slug);
    if (!target) return new NextResponse("Not found", { status: 404 });

    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    try {
        const res = await fetch(target.url, {
            headers: { "user-agent": req.headers.get("user-agent") ?? "" },
            redirect: "follow",
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Check if request was successful
        if (!res.ok) {
            const errorHtml = `
<!DOCTYPE html>
<html>
<head><title>Target Site Error</title></head>
<body>
<script>
window.parent?.postMessage({ 
    type: "subsights:proxy", 
    status: "error", 
    reason: "proxy-http-error" 
}, "*");
</script>
<div style="display:none;">Target site returned error status: ${res.status}</div>
</body>
</html>`;
            return new NextResponse(errorHtml, {
                status: 200,
                headers: { "content-type": "text/html; charset=utf-8" }
            });
        }

        // Only handle HTML
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) {
            const errorHtml = `
<!DOCTYPE html>
<html>
<head><title>Not HTML Content</title></head>
<body>
<script>
window.parent?.postMessage({ 
    type: "subsights:proxy", 
    status: "error", 
    reason: "proxy-not-html" 
}, "*");
</script>
<div style="display:none;">Target site did not return HTML content</div>
</body>
</html>`;
            return new NextResponse(errorHtml, {
                status: 200,
                headers: { "content-type": "text/html; charset=utf-8" }
            });
        }

        // Pull HTML, inject <base> and our widget <script>
        const html = await res.text();
        const modified = injectWidget({
            html,
            origin: target.url,
            scriptTag: target.scriptTag,
        });

        // Strip/adjust headers that might break our demo
        const headers = new Headers({
            "content-type": "text/html; charset=utf-8",
            // Optional: loosen CSP/frame headers for demo rendering
            // "content-security-policy": "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;",
        });

        return new NextResponse(modified, { headers });

    } catch (error) {
        clearTimeout(timeoutId);
        console.error(`[Proxy] ${target.slug} failed:`, error);

        const errorName = error instanceof Error ? error.name : 'UnknownError';
        const errorMessage = error instanceof Error ? error.message : String(error);
        const reason = errorName === 'AbortError' ? 'proxy-timeout' : 'proxy-error';

        const errorHtml = `
<!DOCTYPE html>
<html>
<head><title>Proxy Failed</title></head>
<body>
<script>
window.parent?.postMessage({ 
    type: "subsights:proxy", 
    status: "error", 
    reason: "${reason}" 
}, "*");
</script>
<div style="display:none;">Proxy failed: ${errorMessage}</div>
</body>
</html>`;

        return new NextResponse(errorHtml, {
            status: 200,
            headers: { "content-type": "text/html; charset=utf-8" }
        });
    }
}
