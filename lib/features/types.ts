import type { ComponentType } from "react";

export type FeatureName = 'setup-onboarding' | 'knowledge-base' | 'brand-voice';

export interface FeatureMetadata {
  id: FeatureName;
  title: string;
  description: string;
}

export interface FeaturePackage {
  metadata: FeatureMetadata;
  Page: ComponentType;
}
