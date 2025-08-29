import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Hero from "./sections/hero";

export const metadata: Metadata = buildMetadata({
  title: "Get Demo",
  description: "Choose how you’d like to see Subsights in action.",
  path: "/get-demo",
});

export default function Page() {
  const Sections = [Hero];
  return (
    <main>
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
