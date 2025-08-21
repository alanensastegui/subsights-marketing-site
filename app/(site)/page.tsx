import type { Metadata } from "next";
import Home from "./home/page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Home - Subsights AI",
  description: "The AI-Native Chatbot for Your Website. Subsights AI qualifies, guides, and converts your best website visitors so your team doesn't have to.",
  path: "/",
});

export default function HomePage() {
  return (
    <Home />
  );
}
