import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookOpen } from "lucide-react";

type Copy = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export const sectionId = "knowledge-base-placeholder";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Knowledge Base",
  description: "This feature page is coming soon. We're working on creating an amazing knowledge base experience for you.",
  cta: { label: "Back to Features", href: "/features" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Placeholder() {
  const c = copy;

  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <Animate name="fadeIn" trigger="onVisible">
          <div className="text-center">
            {/* Back Link */}
            <div className="mb-8">
              <Link
                href="/features"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Features
              </Link>
            </div>

            {/* Icon */}
            <div className="mx-auto mb-6 w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-primary" />
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {c.title}
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground mb-10">
              {c.description}
            </p>

            {/* CTA */}
            <Button size="lg" asChild>
              <Link href={c.cta.href}>{c.cta.label}</Link>
            </Button>
          </div>
        </Animate>
      </div>
    </section>
  );
}
