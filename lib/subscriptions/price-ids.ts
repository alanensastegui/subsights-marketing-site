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
    free_trial: "price_1RWMgmLBwjY0mWjvWBn3bbaM",
    professional: {
      monthly: "price_1RWMgmLBwjY0mWjvWBn3bbaM",
      annual: "price_1Rlg1ALBwjY0mWjvoASzYgKk",
    },
    professional_plus: {
      monthly: "price_1RWMinLBwjY0mWjvNsqW5b0B",
      annual: "price_1Rlg1eLBwjY0mWjv0ju095LY",
    },
  },
};


