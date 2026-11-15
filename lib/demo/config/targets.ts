export type DemoMode = "proxy" | "iframe" | "default";
export type DemoPolicy = "auto" | DemoMode;
export type DemoVariant = "default" | "estoPhoenix";

export type DemoTarget = {
  slug: string;
  url: string;
  label: string;
  testMessage: string; // test message to send to the chatbot
  scriptTag: string; // Full script tag from sales (e.g., <script src="..." data-workspace="..." data-api-key="..."></script>)
  variant?: DemoVariant; // demo variant - defaults to "default" if not specified
  // optional controls
  policy?: DemoPolicy; // omitted or "auto": assistant; proxy/iframe require opt-in
  allowIframe?: boolean; // override when you *know* iframe is OK
  timeoutMs?: number; // fetch timeout for proxy
  maxHtmlBytes?: number; // safety cap (e.g., 2_000_000)
};

export const DEMO_TARGETS: DemoTarget[] = [
{
    slug: "phoenix-2025",
    url: "https://www.subsights.com",
    label: "Phoenix",
    testMessage: "Hi, what are some good AI sessions I could attend this week?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key="m8CbV0kVKAgdDF7CYZPLdLKNWO24asBD"></script>',
    variant: "estoPhoenix",
    policy: "default",
  }
];

export const getDemoTarget = (slug: string) => DEMO_TARGETS.find(d => d.slug === slug) ?? null;
