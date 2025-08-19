import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/case-studies";
import CaseStudyHero from "./sections/hero";
import CaseStudyContent from "./sections/content";
import CaseStudyMetrics from "./sections/metrics";
import CallToAction from "./sections/call-to-action";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return buildMetadata({
    title: `${caseStudy.company} Case Study - Customer Success Story`,
    description: caseStudy.overview.challenge,
    path: `/case-studies/${caseStudy.slug}`,
    image: caseStudy.logo,
    ogType: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const caseStudy = await getCaseStudyBySlug(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const Sections = [
    () => <CaseStudyHero caseStudy={caseStudy} />,
    () => <CaseStudyContent caseStudy={caseStudy} />,
    () => <CaseStudyMetrics caseStudy={caseStudy} />,
    () => <CallToAction caseStudy={caseStudy} />,
  ];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => <S key={i} />)}
    </main>
  );
}
