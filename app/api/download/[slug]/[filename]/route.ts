import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import {
  buildSigningString,
  isValidFilename,
  isValidSlug,
  resolveDownloadPath,
  verifySignature,
} from "@/lib/downloads/signing";

// Simple in-memory rate limiting per IP (best-effort; resets on redeploy)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10;
const ipToHits: Map<string, { count: number; windowStart: number }> = new Map();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipToHits.get(ip);
  if (!entry) {
    ipToHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipToHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await ctx.params;
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
  const ip = ipHeader.split(",")[0]?.trim() || "unknown";
  if (!rateLimit(String(ip))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  if (!isValidSlug(slug) || !isValidFilename(filename)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const expStr = req.nextUrl.searchParams.get("exp");
  const sig = req.nextUrl.searchParams.get("sig") || "";
  const exp = expStr ? Number(expStr) : NaN;
  if (!expStr || Number.isNaN(exp)) {
    return NextResponse.json({ error: "Missing exp" }, { status: 400 });
  }
  if (Math.floor(Date.now() / 1000) > exp) {
    return NextResponse.json({ error: "Link expired" }, { status: 401 });
  }

  const signingString = buildSigningString({ method: "GET", slug, filename, exp });
  const ok = verifySignature(signingString, sig);
  if (!ok) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed = (post.downloads || []).some((d) => d.filename === filename);
  if (!allowed) {
    return NextResponse.json({ error: "File not allowed" }, { status: 404 });
  }

  let filePath: string;
  try {
    filePath = resolveDownloadPath(slug, filename);
  } catch {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const stat = fs.statSync(filePath);
  const contentType = (() => {
    const lowered = filename.toLowerCase();
    if (lowered.endsWith(".pdf")) return "application/pdf";
    if (lowered.endsWith(".txt")) return "text/plain; charset=utf-8";
    if (lowered.endsWith(".csv")) return "text/csv; charset=utf-8";
    if (lowered.endsWith(".json")) return "application/json";
    if (lowered.endsWith(".zip")) return "application/zip";
    if (lowered.endsWith(".png")) return "image/png";
    if (lowered.endsWith(".jpg") || lowered.endsWith(".jpeg")) return "image/jpeg";
    if (lowered.endsWith(".svg")) return "image/svg+xml";
    return "application/octet-stream";
  })();

  const stream = fs.createReadStream(filePath);
  const res = new NextResponse(stream as unknown as BodyInit, {
    status: 200,
    headers: new Headers({
      "Content-Type": contentType,
      "Content-Length": String(stat.size),
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    }),
  });

  return res;
}

export const dynamic = "force-dynamic"; // ensure server runtime; streaming from filesystem


