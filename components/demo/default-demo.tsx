interface DefaultDemoProps {
  targetLabel: string;
  sourceUrl: string;
  scriptTag?: string;
}

const escapeAttribute = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]!
  );

export function DefaultDemo({
  targetLabel,
  sourceUrl,
  scriptTag,
}: DefaultDemoProps) {
  const workspace = scriptTag?.match(/data-workspace=["']([^"']+)["']/)?.[1];
  const apiKey = scriptTag?.match(/data-api-key=["']([^"']+)["']/)?.[1];
  const widgetUrl =
    workspace && apiKey
      ? `https://widget.subsights.com/index.html?${new URLSearchParams({ workspace_id: workspace, api_key: apiKey })}`
      : null;
  // Give each demo its own widget document, so its script and mounted UI
  // cannot survive a switch to another prospect. Open through the native API.
  const widgetDocument = widgetUrl
    ? `<!doctype html>
<html lang="en"><head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeAttribute(targetLabel)} assistant</title>
  <style>html,body{height:100%;margin:0}</style>
</head><body>
  <p id="widget-fallback" style="padding:24px;font:16px/1.5 system-ui;color:#111">
    <a href="${escapeAttribute(widgetUrl)}" target="_blank" rel="noopener noreferrer">Open the assistant in a new tab</a> if it does not appear here.
  </p>
  <script>
    window.addEventListener('subsights:open', function () { document.getElementById('widget-fallback').hidden = true; }, { once: true });
    window.addEventListener('load', function () { window.subsightsApp?.open(); });
  </script>
  <script src="https://widget.subsights.com/chatbot.js" data-workspace="${escapeAttribute(workspace!)}" data-api-key="${escapeAttribute(apiKey!)}" data-iframe="true"></script>
</body></html>`
    : undefined;

  return (
    <div className="h-full overflow-auto bg-background text-foreground">
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-8 sm:px-10 lg:grid-cols-2 lg:py-12">
        <div>
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Subsights demonstration
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Try the {targetLabel} assistant
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Ask a question you would ask the team, then change a detail or ask a
            follow-up.
          </p>
          <div className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              This demonstration reads public information from{' '}
              <a
                className="font-medium text-foreground underline underline-offset-4"
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {targetLabel}&apos;s website
              </a>
              . Sources are refreshed manually.
            </p>
            <p>
              It cannot check live availability, make a reservation or take
              payment. Use the official website to confirm details.
            </p>
          </div>
          {widgetUrl && (
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#demo-assistant"
                className="inline-flex min-h-12 items-center rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                Ask the assistant
              </a>
              <a
                className="text-sm font-medium underline underline-offset-4"
                href={widgetUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open assistant in a new tab
              </a>
            </div>
          )}
        </div>
        {widgetUrl ? (
          <iframe
            id="demo-assistant"
            key={widgetUrl}
            srcDoc={widgetDocument}
            title={`${targetLabel} assistant`}
            className="h-[560px] w-full rounded-2xl border bg-white lg:h-[620px]"
            allow="clipboard-write"
          />
        ) : (
          <p className="leading-relaxed text-muted-foreground">
            Coming soon: an assistant that answers questions from {targetLabel}
            &apos;s public pages once connected.
          </p>
        )}
      </main>
    </div>
  );
}
