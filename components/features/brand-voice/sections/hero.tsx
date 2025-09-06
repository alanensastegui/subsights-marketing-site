import { Animate } from "@/components/ui/animate";
import { ButtonDuo } from "@/components/ui/button-duo";
import Link from "next/link";
import { getFeatureMetadata } from "@/lib/features/registry";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: getFeatureMetadata('brand-voice').title,
  subtitle: getFeatureMetadata('brand-voice').description,
  primaryCta: { label: "Email My Demo", href: "/email-my-demo" },
  secondaryCta: { label: "Start Free Trial", href: "https://app.subsights.com/signup" }
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Title */}
        <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
          {c.title}
        </h2>

        {/* Subtitle */}
        <p className="animate-item text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
          {c.subtitle}
        </p>

        {/* Call to Action Buttons */}
        <div className="animate-item flex justify-center">
          <ButtonDuo
            stackAt="sm"
            fullWidthMobile={true}
            primary={{
              asChild: true,
              size: "lg",
              children: (
                <Link href={c.primaryCta.href}>
                  {c.primaryCta.label}
                </Link>
              )
            }}
            secondary={{
              asChild: true,
              size: "lg",
              children: (
                <a href={c.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                  {c.secondaryCta.label}
                </a>
              )
            }}
          />
        </div>
      </Animate>
    </section>
  );
}
