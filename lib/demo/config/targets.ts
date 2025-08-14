export type DemoMode = "proxy" | "iframe" | "default";
export type FallbackPolicy = "auto" | "force-proxy" | "force-iframe" | "force-default";
export type DemoVariant = "default" | "estoPhoenix";

export type DemoTarget = {
    slug: string;
    url: string;
    label: string;
    testMessage: string;        // test message to send to the chatbot
    scriptTag: string;           // Full script tag from sales (e.g., <script src="..." data-workspace="..." data-api-key="..."></script>)
    variant?: DemoVariant;      // demo variant - defaults to "default" if not specified
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
        testMessage: "Hi, where can I get a Very Important Twilighter ticket?",
        scriptTag: '<script src="https://widget.latest.subsights.com/chatbot.js" data-workspace="I6BHboKbqb" data-api-key="4yO7Z30ZFFZ79w75v5d1VqYhfHX63z44"></script>',
        variant: "default",
    },
    {
        slug: "seattle-chamber",
        url: "https://www.seattlechamber.com/",
        label: "Seattle Chamber",
        testMessage: "Hi, I want to open up a coffee shop in Seattle. What do I need to do?",
        scriptTag: '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="9l1V6iBeIO9Rhmo9ILRsP9Rq7xtwvj2u"></script>',
        variant: "default",
    },
    {
        slug: "esto-phoenix",
        url: "https://www.estophoenix.com",
        label: "Esto Phoenix",
        testMessage: "Hi, I'm interested in learning more about your services",
        scriptTag: '<script src="https://widget.subsights.com/chatbot.js" data-workspace="esto-phoenix" data-api-key="esto-phoenix-key"></script>',
        variant: "estoPhoenix",
    },
];

export const getDemoTarget = (slug: string) => DEMO_TARGETS.find(d => d.slug === slug) ?? null;
