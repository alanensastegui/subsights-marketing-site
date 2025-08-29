import Link from "next/link";
import { ButtonDuo } from "@/components/ui/button-duo";
import { Animate } from "@/components/ui/animate";

export const sectionId = "hero";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

// ---- SECTION COPY REGION ----
const copy = {
  title: "Latest from Subsights",
  subtitle: "Clear guides, product updates, and field notes from the team",
  primaryCta: { label: "Get Demo", href: "/get-demo" },
  secondaryCta: { label: "Read Posts", href: "#posts" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="relative isolate text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mx-auto max-w-4xl text-center">
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="animate-item space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 max-w-2xl text-center mx-auto">
                {c.title}
              </h1>
              <div className="w-full flex justify-center">
                <h2 className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 break-normal max-w-md text-center mx-auto">
                  {c.subtitle}
                </h2>
              </div>
            </div>
            <div className="animate-item">
              <ButtonDuo
                primary={{
                  asChild: true,
                  children: (
                    <Link href={c.primaryCta.href}>{c.primaryCta.label}</Link>
                  ),
                  size: "lg",
                  dataAttributes: {
                    "data-analytics-id": "blog_hero_demo",
                    "data-analytics-name": "Get Demo (Blog Hero)",
                    "data-analytics-context":
                      '{"source":"blog_hero","section":"hero"}',
                  },
                }}
                secondary={{
                  asChild: true,
                  children: (
                    <Link href={c.secondaryCta.href}>
                      {c.secondaryCta.label}
                    </Link>
                  ),
                  variant: "outline",
                  size: "lg",
                }}
                gap="md"
                stackAt="sm"
                fullWidthMobile
              />
            </div>
          </Animate>
        </div>
      </div>
    </section>
  );
}
