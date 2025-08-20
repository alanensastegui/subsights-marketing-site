import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllLegalPageSlugs, getLegalPageBySlug, getLegalPageOverviewBySlug } from "@/lib/legal";
import LegalPageContent from "./sections/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllLegalPageSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const legalPage = getLegalPageOverviewBySlug(slug);

  if (!legalPage) {
    return {
      title: "Legal Page Not Found",
    };
  }

  return buildMetadata({
    title: legalPage.title,
    description: legalPage.description,
    path: `/${legalPage.slug}`,
    ogType: "article",
  });
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const legalPage = await getLegalPageBySlug(slug);

  if (!legalPage) {
    notFound();
  }

  const Sections = [
    () => <LegalPageContent legalPage={legalPage} />,
  ];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => <S key={i} />)}
    </main>
  );
}
