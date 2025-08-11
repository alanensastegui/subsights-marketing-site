export type DemoMode = "proxy" | "iframe" | "default";
export type FallbackPolicy = "auto" | "force-proxy" | "force-iframe" | "force-default";

export type DemoTarget = {
    slug: string;
    url: string;
    label: string;
    scriptTag: string;           // Full script tag from sales (e.g., <script src="..." data-workspace="..." data-api-key="..."></script>)
    // optional controls
    policy?: FallbackPolicy;     // default: "auto"
    allowIframe?: boolean;       // override when you *know* iframe is OK
    timeoutMs?: number;          // fetch timeout for proxy
    maxHtmlBytes?: number;       // safety cap (e.g., 2_000_000)
};

export const DEMO_TARGETS: DemoTarget[] = [
    {
        slug: "forks",
        url: "https://www.forkswa.com",
        label: "Forks, WA",
        scriptTag: '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key="yTtjPyV193XXx3fdvzVbXW3k0EiPPurU"></script>'
    },
];

export const getDemoTarget = (slug: string) => DEMO_TARGETS.find(d => d.slug === slug) ?? null;
