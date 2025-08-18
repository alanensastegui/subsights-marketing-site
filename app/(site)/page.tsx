import type { Metadata } from "next";
import Home from "./home/page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Home - Subsights AI",
  description: "Your Website is Your Front Door. We Provide the 24/7 Expert. Subsights AI qualifies, guides, and converts your best website visitors.",
  path: "/",
});

export default function HomePage() {
  return (
    <Home />
  );
}
