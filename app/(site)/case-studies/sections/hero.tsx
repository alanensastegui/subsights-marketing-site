import Link from "next/link";
import { ButtonDuo } from "@/components/ui/button-duo";
import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Meet the teams who support customers 24/7",
  subtitle:
    "Subsights powers consistent answers, faster routing, and better outcomes",
  primaryCta: { label: "Get Demo", href: "/get-demo" },
  secondaryCta: { label: "View Case Studies", href: "#customer-stories" },
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
                    "data-analytics-id": "case_studies_hero_demo",
                    "data-analytics-name": "Get Demo (Case Studies Hero)",
                    "data-analytics-context":
                      '{"source":"case_studies_hero","section":"hero"}',
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
