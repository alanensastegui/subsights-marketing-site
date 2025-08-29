import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";

export const metadata: Metadata = buildMetadata({
  title: "Get Demo",
  description: "Book a live demo or share your details to explore Subsights.",
  path: "/get-demo",
  image: "/images/logo/small-logo.svg",
});

export default function GetDemo() {
  const Sections = [Hero];
  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
