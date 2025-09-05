import type { ComponentType } from "react";

export type FeatureName = 'effortless-setup-onboarding';

export interface FeatureMetadata {
  id: FeatureName;
  title: string;
  description: string;
}

export interface FeaturePackage {
  metadata: FeatureMetadata;
  Page: ComponentType;
}
