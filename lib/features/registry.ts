import type { ComponentType } from "react";
import type { FeatureMetadata, FeatureName, FeaturePackage } from "./types";
import { Rocket, BookOpen, Palette } from "lucide-react";

// Central metadata registry
export const featureMetadata: Record<FeatureName, FeatureMetadata> = {
  'setup-onboarding': {
    id: 'setup-onboarding',
    title: 'Setup & Onboarding',
    description: 'No code required. Real results on day one',
    ctaTitle: 'Get value on day one.',
  },
  'knowledge-base': {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    description: 'Define what\'s in scope. Your AI Teammate responds with accuracy',
    ctaTitle: 'Keep every answer accurate.',
  },
  'brand-voice': {
    id: 'brand-voice',
    title: 'Brand & Voice',
    description: 'Voice, tone, and UI. Dialed to your brand',
    ctaTitle: 'Make the experience yours.',
  },
};

// Map feature names to their icon components
export const iconMap: Record<FeatureName, ComponentType<{ className?: string }>> = {
  'setup-onboarding': Rocket,
  'knowledge-base': BookOpen,
  'brand-voice': Palette,
};

// Registry of feature packages
// Constructs packages using centralized metadata and dynamic Page imports
const featurePackages: Record<FeatureName, () => Promise<FeaturePackage>> = {
  'setup-onboarding': async () => ({
    metadata: featureMetadata['setup-onboarding'],
    Page: (await import('@/components/features/setup-onboarding')).default,
  }),
  'knowledge-base': async () => ({
    metadata: featureMetadata['knowledge-base'],
    Page: (await import('@/components/features/knowledge-base')).default,
  }),
  'brand-voice': async () => ({
    metadata: featureMetadata['brand-voice'],
    Page: (await import('@/components/features/brand-voice')).default,
  }),
};

// Cache for loaded packages to avoid re-importing
const packageCache = new Map<FeatureName, FeaturePackage>();

/**
 * Get all feature metadata (for the grid page)
 * Returns metadata from central registry
 */
export function getAllFeatureMetadata(): FeatureMetadata[] {
  return Object.values(featureMetadata);
}

/**
 * Get a single feature package by id
 * Uses caching to avoid re-importing the same package
 */
export async function getFeaturePackage(id: FeatureName): Promise<FeaturePackage | null> {
  // Return cached package if available
  if (packageCache.has(id)) {
    return packageCache.get(id)!;
  }

  const loadPackage = featurePackages[id];
  if (!loadPackage) {
    return null;
  }

  try {
    const pkg = await loadPackage();
    // Cache the loaded package
    packageCache.set(id, pkg);
    return pkg;
  } catch (error) {
    console.error(`Failed to load feature package for id "${id}":`, error);
    return null;
  }
}

/**
 * Get feature metadata by id
 * Returns metadata from central registry
 */
export function getFeatureMetadata(id: FeatureName): FeatureMetadata {
  return featureMetadata[id];
}

/**
 * Get all feature ids (for static params generation)
 * Returns a readonly array for better type safety
 */
export function getAllFeatureIds(): readonly FeatureName[] {
  return Object.keys(featurePackages) as FeatureName[];
}

/**
 * Type guard to check if a string is a valid feature name
 */
export function isFeatureName(id: string): id is FeatureName {
  return id in featurePackages;
}

