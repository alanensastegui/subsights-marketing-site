import type { RuntimeEnvironment } from "@/lib/env";

// Hardcoded Stripe Price IDs per environment
export const PRICE_IDS: Record<RuntimeEnvironment, {
  free_trial: string;
  professional: { monthly: string; annual: string };
  professional_plus: { monthly: string; annual: string };
}> = {
  development: {
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
  preview: {
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


