import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import Narrative from "./sections/narrative";
import Team from "./sections/team";
import News from "./sections/news";

export const metadata: Metadata = buildMetadata({
    title: 'About Us',
    description: 'Meet Alán, Lucas and Ryan, the builders of Subsights. Personal setup, AI-assisted development and ongoing care for an assistant shaped around your business.',
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
