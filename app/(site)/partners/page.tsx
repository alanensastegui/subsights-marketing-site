import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import WhyPartner from "./sections/why-partner";
import EarningPotential from "./sections/earning-potential";
import PerformanceIncentives from "./sections/performance-incentives";
import GetStarted from "./sections/get-started";
import IdealFor from "./sections/ideal-for";
import FinalCta from "./sections/final-cta";

export const metadata: Metadata = buildMetadata({
  title: "Partners",
  description: "Partner with Subsights to build smarter AI assistants and grow your business together.",
  path: "/partners",
});

type Props = {
  searchParams?: Promise<{ tier?: string }>;
};

export default async function Partners({ searchParams }: Props) {
  const params = await searchParams;
  const Sections = [Hero, GetStarted, WhyPartner, EarningPotential, PerformanceIncentives, IdealFor, FinalCta];
  return (
    <main>
      {Sections.map((S, i) => {
        // Only pass searchParams to EarningPotential section
        if (S === EarningPotential) {
          return <S key={i} searchParams={params} />;
        }
        return <S key={i} />;
      })}
    </main>
  );
}
