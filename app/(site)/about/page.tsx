import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import Narrative from "./sections/narrative";
import Team from "./sections/team";
import News from "./sections/news";

export const metadata: Metadata = buildMetadata({
    title: "About Us",
    description: "Learn about the Subsights team and our mission to build smarter AI assistants.",
    path: "/about",
});

export default function About() {
    const Sections = [Hero, Narrative, Team, News];
    return (
        <main>
            {Sections.map((S, i) => <S key={i} />)}
        </main>
    );
}
