import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug } from "@/lib/blog";
import { buildSignedUrl, isValidFilename, isValidSlug } from "@/lib/downloads/signing";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ slug: string; filename: string }> }
) {
  const { slug, filename } = await ctx.params;
  if (!isValidSlug(slug) || !isValidFilename(filename)) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const allowed = (post.downloads || []).some((d) => d.filename === filename);
  if (!allowed) {
    return NextResponse.json({ error: "File not allowed" }, { status: 404 });
  }

  const exp = Math.floor(Date.now() / 1000) + 600; // 10 minutes
  const origin = req.nextUrl.origin;
  const signed = buildSignedUrl(origin, { slug, filename, exp });
  return NextResponse.redirect(signed, { status: 307 });
}

export const dynamic = "force-dynamic";

