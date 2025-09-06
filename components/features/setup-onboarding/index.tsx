import type { FeatureMetadata, FeaturePackage } from "@/lib/features/types";
import EffortlessSetupOnboardingPage from "./page";

export const metadata: FeatureMetadata = {
  id: 'setup-onboarding' as const,
  title: 'Setup & Onboarding',
  description: 'Effortless. No code required. Real results on day one.',
};

const featurePackage: FeaturePackage = {
  metadata,
  Page: EffortlessSetupOnboardingPage,
};

export default featurePackage;
