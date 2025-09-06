import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getFeaturePackage, getFeatureMetadata, getAllFeatureIds, isFeatureName } from "@/lib/features/registry";

interface FeaturePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const ids = getAllFeatureIds();
  return ids.map((id) => ({
    slug: id,
  }));
}

export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isFeatureName(slug)) {
    return buildMetadata({
      title: "Feature Not Found - Subsights AI",
      description: "The requested feature could not be found.",
      path: `/features/${slug}`,
    });
  }

  const metadata = await getFeatureMetadata(slug);

  if (!metadata) {
    return buildMetadata({
      title: "Feature Not Found - Subsights AI",
      description: "The requested feature could not be found.",
      path: `/features/${slug}`,
    });
  }

  return buildMetadata({
    title: `${metadata.title} - Subsights AI`,
    description: metadata.description,
    path: `/features/${metadata.id}`,
  });
}

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;

  if (!isFeatureName(slug)) {
    notFound();
  }

  const featurePackage = await getFeaturePackage(slug);

  if (!featurePackage) {
    notFound();
  }

  const { Page } = featurePackage;

  return <Page />;
}
