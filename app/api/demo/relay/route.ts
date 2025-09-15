import { NextRequest, NextResponse } from "next/server";
import { getDemoTarget } from "@/lib/demo/config";

export const revalidate = 0;
export const runtime = "nodejs";

const ALLOWED_METHODS = ["GET", "HEAD", "OPTIONS"] as const;
type AllowedMethod = typeof ALLOWED_METHODS[number];

function isAllowedMethod(method: string): method is AllowedMethod {
  return (ALLOWED_METHODS as readonly string[]).includes(method);
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    const rawUrl = searchParams.get("url");

    if (!slug || !rawUrl) {
      return new NextResponse("Missing slug or url", { status: 400 });
    }

    const target = getDemoTarget(slug);
    if (!target) {
      return new NextResponse("Unknown demo target", { status: 404 });
    }

    // Only allow requests to the same origin as the demo target
    let url: URL;
    try {
      url = new URL(rawUrl);
    } catch {
      return new NextResponse("Invalid url", { status: 400 });
    }

    const targetOrigin = new URL(target.url).origin;
    if (url.origin !== targetOrigin) {
      return new NextResponse("Origin not allowed", { status: 403 });
    }

    // Enforce safe methods
    if (!isAllowedMethod(req.method)) {
      return new NextResponse("Method not allowed", { status: 405 });
    }

    const upstream = await fetch(url.toString(), {
      method: "GET",
      headers: {
        // Minimal headers; do not forward cookies for safety
        "user-agent": req.headers.get("user-agent") ?? "Mozilla/5.0 (compatible; SubsightsDemo/1.0)",
        "accept": req.headers.get("accept") ?? "*/*",
        "accept-language": req.headers.get("accept-language") ?? "en-US,en;q=0.9",
      },
      redirect: "follow",
      cache: "no-store",
    });

    // Pass through status and a subset of safe headers
    const resHeaders = new Headers();
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    resHeaders.set("content-type", contentType);
    const cacheControl = upstream.headers.get("cache-control");
    if (cacheControl) resHeaders.set("cache-control", cacheControl);

    // CORS: allow our own origin only
    const origin = req.headers.get("origin") || "";
    resHeaders.set("access-control-allow-origin", origin);
    resHeaders.set("vary", "origin");

    const body = await upstream.arrayBuffer();
    return new NextResponse(body, { status: upstream.status, headers: resHeaders });
  } catch {
    return new NextResponse("Relay error", { status: 502 });
  }
}

export async function OPTIONS() {
  const headers = new Headers();
  headers.set("access-control-allow-origin", "*");
  headers.set("access-control-allow-methods", "GET, HEAD, OPTIONS");
  headers.set("access-control-allow-headers", "content-type");
  return new NextResponse(null, { status: 204, headers });
}


