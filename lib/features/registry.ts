import type { ComponentType } from "react";
import type { FeatureMetadata, FeatureName, FeaturePackage } from "./types";
import { Rocket, BookOpen, Palette } from "lucide-react";

// Map feature names to their icon components
export const iconMap: Record<FeatureName, ComponentType<{ className?: string }>> = {
  'setup-onboarding': Rocket,
  'knowledge-base': BookOpen,
  'brand-voice': Palette,
};

// Registry of feature packages
// Each key is the feature name, value is a dynamic import
const featurePackages: Record<FeatureName, () => Promise<FeaturePackage>> = {
  'setup-onboarding': async () => (await import('@/components/features/setup-onboarding')).default,
  'knowledge-base': async () => (await import('@/components/features/knowledge-base')).default,
  'brand-voice': async () => (await import('@/components/features/brand-voice')).default,
};

// Cache for loaded packages to avoid re-importing
const packageCache = new Map<FeatureName, FeaturePackage>();

// Cache for metadata to avoid loading full packages when only metadata is needed
const metadataCache = new Map<FeatureName, FeatureMetadata>();

/**
 * Get all feature metadata (for the grid page)
 * Uses caching for better performance
 */
export async function getAllFeatureMetadata(): Promise<FeatureMetadata[]> {
  const ids = getAllFeatureIds();
  const metadataPromises = ids.map(id => getFeatureMetadata(id));
  const results = await Promise.all(metadataPromises);

  // Filter out null results (shouldn't happen in normal operation)
  return results.filter((metadata): metadata is FeatureMetadata => metadata !== null);
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
 * Get feature metadata by id (without loading the full package)
 * Uses separate metadata cache for better performance
 */
export async function getFeatureMetadata(id: FeatureName): Promise<FeatureMetadata | null> {
  // Return cached metadata if available
  if (metadataCache.has(id)) {
    return metadataCache.get(id)!;
  }

  const loadPackage = featurePackages[id];
  if (!loadPackage) {
    return null;
  }

  try {
    // Load only the metadata, not the full package
    const module = await import(`@/components/features/${id}`);
    const metadata = module.metadata;

    // Cache the metadata
    metadataCache.set(id, metadata);
    return metadata;
  } catch (error) {
    console.error(`Failed to load feature metadata for id "${id}":`, error);
    return null;
  }
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

