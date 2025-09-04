"use client";

import { useCallback } from "react";
import { useAnalyticsEvents } from "@/lib/analytics/hooks/use-analytics-events";

type DownloadItem = { filename: string; title?: string };

interface Props {
  slug: string;
  downloads: DownloadItem[];
}

export default function BlogPostDownloadsClient({ slug, downloads }: Props) {
  const { trackLinkClick } = useAnalyticsEvents();

  const handleClick = useCallback(
    (item: DownloadItem) => async () => {
      const linkUrl = `/api/download-link/${slug}/${item.filename}`;
      try {
        await trackLinkClick(item.title || item.filename, linkUrl);
      } catch (err) {
        // non-blocking
        console.warn("Failed to track download click", err);
      }
    },
    [slug, trackLinkClick]
  );

  return (
    <ul className="list-disc pl-6 space-y-2">
      {downloads.map((d, i) => (
        <li key={i}>
          <a
            href={`/api/download-link/${slug}/${d.filename}`}
            className="text-primary underline underline-offset-4"
            rel="noopener noreferrer"
            onClick={handleClick(d)}
            data-analytics-id="blog_download_click"
            data-analytics-name={(d.title || d.filename) + " (Blog Downloads)"}
            data-analytics-context={JSON.stringify({ source: "blog", section: "downloads", slug, filename: d.filename })}
          >
            {d.title || d.filename}
          </a>
        </li>
      ))}
    </ul>
  );
}


