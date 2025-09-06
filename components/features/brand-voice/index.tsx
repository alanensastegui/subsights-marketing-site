import type { FeatureMetadata, FeaturePackage } from "@/lib/features/types";
import BrandPage from "./page";

export const metadata: FeatureMetadata = {
  id: 'brand-voice' as const,
  title: 'Brand & voice',
  description: 'Voice, tone, and UI. Dialed to your brand.',
};

const featurePackage: FeaturePackage = {
  metadata,
  Page: BrandPage,
};

export default featurePackage;
