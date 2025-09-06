import type { FeatureMetadata, FeaturePackage } from "@/lib/features/types";
import KnowledgeBasePage from "./page";

export const metadata: FeatureMetadata = {
  id: 'knowledge-base' as const,
  title: 'Knowledge Base',
  description: 'You decide what\'s in scope. We answer from it.',
};

const featurePackage: FeaturePackage = {
  metadata,
  Page: KnowledgeBasePage,
};

export default featurePackage;
