import type { FeaturePackage } from "@/lib/features/types";
import FeaturePage from "./page";

export const metadata = {
  id: 'effortless-setup-onboarding' as const,
  title: 'Effortless Setup & Onboarding',
  description: 'Get up and running in minutes with our intuitive setup process and guided onboarding experience.',
  longDescription: 'Our streamlined setup process gets you from signup to first conversation in under 5 minutes. With guided onboarding, smart defaults, and one-click integrations, you\'ll be capturing leads before your coffee gets cold.',
};

const featurePackage: FeaturePackage = {
  metadata,
  Page: FeaturePage,
};

export default featurePackage;
