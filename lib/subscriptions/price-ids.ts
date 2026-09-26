import type { RuntimeEnvironment } from "@/lib/env";

// Hardcoded Stripe Price IDs per environment
export const PRICE_IDS: Record<RuntimeEnvironment, {
  free_trial: string;
  professional: { monthly: string; annual: string };
  professional_plus: { monthly: string; annual: string };
}> = {
  development: {
    free_trial: "price_1RWNJsHSlLIGGSTujoK9WPEG",
    professional: {
      monthly: "price_1RWNJsHSlLIGGSTujoK9WPEG",
      annual: "price_1RlgdNHSlLIGGSTubGcGyGSn",
    },
    professional_plus: {
      monthly: "price_1RWNMtHSlLIGGSTuYFXrQJ07",
      annual: "price_1RlgdCHSlLIGGSTuZLTTFR1c",
    },
  },
  preview: {
    free_trial: "price_1RWMl9LBwjY0mWjvMzEzck16",
    professional: {
      monthly: "price_1RWMl9LBwjY0mWjvMzEzck16",
      annual: "price_1RlgcGLBwjY0mWjv7HoHGUwc",
    },
    professional_plus: {
      monthly: "price_1RWMm0LBwjY0mWjv2RPAqIuk",
      annual: "price_1RlgbnLBwjY0mWjvFfWunbRd",
    },
  },
  prod: {
    free_trial: "price_1UJmdGLBwjY0mWjvOEpAbsSF",
    professional: {
      monthly: "price_1UJmdGLBwjY0mWjvOEpAbsSF",
      annual: "price_1UJmdGLBwjY0mWjveBm9yAlU",
    },
    professional_plus: {
      monthly: "price_1UJmdHLBwjY0mWjvpHvYKUE3",
      annual: "price_1UJmdHLBwjY0mWjvfPykZT11",
    },
  },
};


