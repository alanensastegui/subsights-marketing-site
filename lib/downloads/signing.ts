import crypto from "crypto";
import path from "path";
import { getDownloadsHmacSecret } from "@/lib/env";


export type SignedDownloadParams = {
  method: "GET";
  slug: string;
  filename: string;
  exp: number; // unix seconds
};

export const buildSigningString = (p: SignedDownloadParams): string => {
  const normalizedPath = `/api/download/${p.slug}/${p.filename}`;
  return `${p.method}|${normalizedPath}|${p.exp}`;
};

export const createSignature = (signingString: string): string => {
  const secret = getDownloadsHmacSecret();
  return crypto.createHmac("sha256", secret).update(signingString).digest("hex");
};

export const verifySignature = (
  signingString: string,
  providedSig: string
): boolean => {
  const expected = createSignature(signingString);
  if (expected.length !== providedSig.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(providedSig));
};

export const isValidSlug = (slug: string): boolean => /^[a-z0-9-]+$/.test(slug);

export const isValidFilename = (filename: string): boolean => /^[A-Za-z0-9._-]+$/.test(filename);

export const resolveDownloadPath = (slug: string, filename: string): string => {
  const base = path.join(process.cwd(), "public", "blog-downloads", slug);
  const resolved = path.resolve(base, filename);
  if (!resolved.startsWith(base + path.sep)) {
    throw new Error("Path traversal detected");
  }
  return resolved;
};

export const buildSignedUrl = (
  origin: string,
  params: Omit<SignedDownloadParams, "method"> & { method?: "GET" }
): string => {
  const p: SignedDownloadParams = { method: "GET", ...params } as SignedDownloadParams;
  const signingString = buildSigningString(p);
  const sig = createSignature(signingString);
  const url = new URL(`/api/download/${p.slug}/${p.filename}`, origin);
  url.searchParams.set("exp", String(p.exp));
  url.searchParams.set("sig", sig);
  return url.toString();
};

export const buildSignedPath = (
  params: Omit<SignedDownloadParams, "method"> & { method?: "GET" }
): string => {
  const p: SignedDownloadParams = { method: "GET", ...params } as SignedDownloadParams;
  const signingString = buildSigningString(p);
  const sig = createSignature(signingString);
  return `/api/download/${p.slug}/${p.filename}?exp=${encodeURIComponent(String(p.exp))}&sig=${encodeURIComponent(sig)}`;
};


