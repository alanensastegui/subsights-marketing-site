// /lib/seo.ts
import type { Metadata } from "next";

export type OGType =
  | "website"
  | "article"
  | "book"
  | "profile"
  | "music.song"
  | "music.album"
  | "music.playlist"
  | "music.radio_station"
  | "video.movie"
  | "video.episode"
  | "video.tv_show"
  | "video.other";

export type TwitterCard = "summary" | "summary_large_image" | "app" | "player";

type OgImage =
  | string
  | {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
    type?: string;
  };

export type BuildMetadataInput = {
  title: string;
  description: string;
  /** Route path starting with '/', e.g. '/pricing' */
  path: string;
  image?: OgImage | OgImage[];
  ogType?: OGType; // default: "website"
  twitterCard?: TwitterCard; // default: "summary_large_image"
  noindex?: boolean;
  overrides?: Partial<Metadata>;
};

function ensureLeadingSlash(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function toOgImages(
  image?: OgImage | OgImage[]
): NonNullable<Metadata["openGraph"]>["images"] | undefined {
  if (!image) return undefined;
  const arr = Array.isArray(image) ? image : [image];
  return arr.map((img) =>
    typeof img === "string"
      ? { url: img }
      : {
        url: img.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        type: img.type,
      }
  );
}

function toTwitterImages(
  image?: OgImage | OgImage[]
): NonNullable<Metadata["twitter"]>["images"] | undefined {
  if (!image) return undefined;
  const arr = Array.isArray(image) ? image : [image];
  // Twitter accepts string/URL or array; collapse objects to their src.
  const urls = arr.map((img) => (typeof img === "string" ? img : img.src));
  return urls.length === 1 ? urls[0] : urls;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  overrides,
}: BuildMetadataInput): Metadata {
  const canonical = ensureLeadingSlash(path);
  const ogImages = toOgImages(image);
  const twImages = toTwitterImages(image);

  const base: Metadata = {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: ogImages,
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: twImages,
    },
    robots: noindex ? { index: false } : undefined,
  };

  // Shallow merge with conservative nested merges
  return {
    ...base,
    ...overrides,
    alternates: { ...base.alternates, ...overrides?.alternates },
    openGraph: { ...base.openGraph, ...overrides?.openGraph },
    twitter: { ...base.twitter, ...overrides?.twitter },
    robots: (() => {
      if (typeof overrides?.robots === "object" && overrides.robots && base.robots && typeof base.robots === "object") {
        return { ...base.robots, ...overrides.robots };
      }
      return overrides?.robots ?? base.robots;
    })(),
  };
}