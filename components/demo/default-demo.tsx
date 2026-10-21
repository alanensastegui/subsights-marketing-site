import { useEffect, useRef } from "react";

interface DefaultDemoProps {
  targetLabel: string;
  sourceUrl: string;
  scriptTag?: string;
}

export function DefaultDemo({ targetLabel, sourceUrl, scriptTag }: DefaultDemoProps) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!scriptTag || mountedRef.current) return;

    const container = document.createElement("div");
    container.innerHTML = scriptTag;
    const source = container.querySelector("script");
    if (!source?.src) return;

    mountedRef.current = true;
    const script = document.createElement("script");
    script.src = source.src;
    script.setAttribute("data-workspace", source.getAttribute("data-workspace") || "");
    script.setAttribute("data-api-key", source.getAttribute("data-api-key") || "");
    document.head.appendChild(script);
  }, [scriptTag]);

  return (
    <div className="h-full overflow-auto bg-background text-foreground">
      <main className="mx-auto max-w-3xl px-6 py-10 pb-28 sm:px-10 sm:py-20">
        <p className="mb-5 text-sm font-medium text-primary">Subsights demonstration</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Try the {targetLabel} assistant
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Ask a question, then change a detail. The assistant should keep your
          plans and preferences in mind as the conversation continues.
        </p>

        {scriptTag ? (
          <div className="mt-8 rounded-2xl border bg-muted/30 p-6">
            <h2 className="text-lg font-semibold">Start with the chat in the lower right</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Try a question you would ask the team, then a follow-up. For a
              visitor destination, try planning a short visit and then changing
              how much time you have.
            </p>
          </div>
        ) : (
          <p className="mt-8 leading-relaxed text-muted-foreground">
            Coming soon: an assistant that answers questions from {targetLabel}&apos;s
            public pages once connected.
          </p>
        )}

        <div className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            This demonstration reads public information from{" "}
            <a className="font-medium text-foreground underline underline-offset-4" href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {targetLabel}&apos;s website
            </a>
            . Sources are refreshed manually.
          </p>
          <p>
            It cannot check live availability, make a reservation or take payment.
            Use the official website to confirm details and book.
          </p>
        </div>
      </main>
    </div>
  );
}
