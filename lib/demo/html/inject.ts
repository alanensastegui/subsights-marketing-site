const SUBSIGHTS_SENTINEL_ID = "subsights-injected";

function isValidScriptTag(scriptTag: string): boolean {
  const trimmed = scriptTag.trim();
  return trimmed.startsWith('<script') &&
    trimmed.endsWith('</script>') &&
    trimmed.includes('src=') &&
    trimmed.includes('data-workspace=') &&
    trimmed.includes('data-api-key=');
}

function createSentinelScript(): string {
  return `<script id="${SUBSIGHTS_SENTINEL_ID}">
  window.parent?.postMessage({ type: "subsights:proxy", status: "ok" }, "*");
</script>`;
}

export function injectWidget({
  html,
  origin,
  scriptTag
}: {
  html: string;
  origin: string;
  scriptTag: string;
}) {
  // Validate script tag format
  if (!isValidScriptTag(scriptTag)) {
    console.error("Subsights: Invalid script tag format:", scriptTag);
    throw new Error("Invalid script tag format. Expected: <script src=\"...\" data-workspace=\"...\" data-api-key=\"...\"></script>");
  }

  // Check if we've already injected (idempotency)
  if (html.includes(SUBSIGHTS_SENTINEL_ID)) {
    console.warn("Subsights: HTML already contains injection sentinel, skipping");
    return html;
  }

  const injectionContent = `<base href="${origin}">\n${createSentinelScript()}\n${scriptTag}`;

  // Try to insert before </head> first
  const headClose = "</head>";
  if (html.includes(headClose)) {
    return html.replace(headClose, `${injectionContent}\n${headClose}`);
  }

  // Fallback: insert before </body>
  const bodyClose = "</body>";
  if (html.includes(bodyClose)) {
    return html.replace(bodyClose, `${injectionContent}\n${bodyClose}`);
  }

  // Last resort: append to end
  return `${html}\n${injectionContent}`;
}

export function createErrorPage(reason: string): string {
  return `<!DOCTYPE html>
<html>
<head><title>Demo Error</title></head>
<body>
<script id="${SUBSIGHTS_SENTINEL_ID}">
  window.parent?.postMessage({ type: "subsights:proxy", status: "error", reason: "${reason}" }, "*");
</script>
<div style="display:none;">Demo error: ${reason}</div>
</body>
</html>`;
}
