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
  slug,
  scriptTag
}: {
  html: string;
  origin: string;
  slug: string;
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

  // Network relay monkey patch to rewrite fetch/XHR calls targeting the demo origin
  const jsOrigin = JSON.stringify(origin);
  const jsSlug = JSON.stringify(slug);
  const networkPatch = `<script>(function(){
    try {
      var TARGET_ORIGIN = new URL(${jsOrigin}).origin;
      // Use absolute URL to avoid <base> rewriting to target origin
      var RELAY_BASE = String(window.location.origin) + "/api/demo/relay?slug=" + ${jsSlug} + "&url=";

      function normalizeUrl(u){
        try { return new URL(u, TARGET_ORIGIN); } catch (e) { return null; }
      }

      function isTarget(u){
        var urlObj = normalizeUrl(u);
        return urlObj && urlObj.origin === TARGET_ORIGIN;
      }

      function isAlreadyRelayed(u){
        try { return String(u).indexOf(RELAY_BASE) !== -1; } catch(e){ return false; }
      }

      function toRelay(u){
        var urlObj = normalizeUrl(u);
        if (!urlObj) return u;
        return RELAY_BASE + encodeURIComponent(urlObj.href);
      }

      // Patch fetch
      var origFetch = window.fetch;
      if (typeof origFetch === 'function') {
        window.fetch = function(input, init){
          try {
            var url = (typeof input === 'string') ? input : (input && input.url);
            if (url && isTarget(url) && !isAlreadyRelayed(url)) {
              var rewritten = toRelay(url);
              if (typeof input === 'string') {
                input = rewritten;
              } else {
                input = new Request(rewritten, input);
              }
            }
          } catch (e) {}
          return origFetch.call(this, input, init);
        };
      }

      // Patch XMLHttpRequest
      if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
        var origOpen = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(method, url){
          try {
            if (url && isTarget(url) && !isAlreadyRelayed(url)) {
              url = toRelay(url);
            }
          } catch (e) {}
          return origOpen.apply(this, [method, url].concat([].slice.call(arguments, 2)));
        };
      }
    } catch (e) {}
  })();</script>`;

  const injectionContent = `<base href="${origin}">\n${createSentinelScript()}\n${networkPatch}\n${scriptTag}`;

  // Best effort: insert immediately after <head> so relative URLs resolve correctly
  const headOpenMatch = html.match(/<head[^>]*>/i);
  if (headOpenMatch) {
    const headOpen = headOpenMatch[0];
    const insertIndex = html.indexOf(headOpen) + headOpen.length;
    return html.slice(0, insertIndex) + `\n${injectionContent}` + html.slice(insertIndex);
  }

  // Fallback: insert before </head>
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
