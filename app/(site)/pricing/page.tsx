import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Pricing from "./sections/pricing";

export const metadata: Metadata = buildMetadata({
    title: "Pricing",
    description: "Simple, transparent pricing plans for teams of any size. Choose the plan that fits your business needs.",
    path: "/pricing",
});

type Props = {
    searchParams?: Promise<{ billing?: string }>;
};

export default async function Page({ searchParams }: Props) {
    const params = await searchParams;
    const Sections = [Pricing];
    return (
        <main>
            {Sections.map((S, i) => <S key={i} searchParams={params} />)}
        </main>
    );
}
