import { APP_URL, CALENDLY_URL } from "../config";
import { PRICE_IDS } from "./price-ids";
import { RUNTIME } from "../env";
import type { BillingCycle, PlanId } from "./types";

export const getPriceId = (plan: PlanId, cycle: BillingCycle = "monthly"): string => {
  const env = RUNTIME;
  if (plan === "enterprise") {
    throw new Error("Enterprise plan does not have a Stripe price ID");
  }
  if (plan === "free_trial") {
    return PRICE_IDS[env].free_trial;
  }
  const byPlan = PRICE_IDS[env][plan];
  const priceId = byPlan?.[cycle];
  if (!priceId) {
    throw new Error(`Missing price ID for plan=${plan} cycle=${cycle} env=${env}`);
  }
  return priceId;
};

export const getSignupUrl = (options: { plan: PlanId; cycle: BillingCycle; isFreeTrial?: boolean }): string => {
  const { plan, cycle, isFreeTrial } = options;
  if (plan === "enterprise") {
    return CALENDLY_URL;
  }
  const baseUrl = `${APP_URL}/auth/signup`;
  const priceId = plan === "free_trial" ? getPriceId("free_trial") : getPriceId(plan, cycle);
  const params = new URLSearchParams({
    price_id: priceId,
    is_free_trial: ((plan === "free_trial") || Boolean(isFreeTrial)).toString(),
  });
  return `${baseUrl}?${params.toString()}`;
};

export const getFreeTrialUrl = (): string => getSignupUrl({ plan: "free_trial", cycle: "monthly" });

export const getAllResolvedPriceIds = () => {
  return PRICE_IDS[RUNTIME];
};
