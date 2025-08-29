import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import EmailMyDemoFormSection from "./sections/form";

export const metadata: Metadata = buildMetadata({
  title: "Email My Demo",
  description: "Get a personalized demo link sent to your inbox in minutes.",
  path: "/email-my-demo",
});

export default function Page() {
  const Sections = [EmailMyDemoFormSection];
  return (
    <main>
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}


