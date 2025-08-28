import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";
import Posts from "./sections/posts";

export const metadata: Metadata = buildMetadata({
  title: "Blog - Subsights AI",
  description: "Latest news and insights from the Subsights team.",
  path: "/blog",
});

export default function BlogPage() {
  const Sections = [Hero, Posts];
  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
