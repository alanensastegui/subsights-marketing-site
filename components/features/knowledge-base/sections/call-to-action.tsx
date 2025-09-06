import { Cta } from "@/components/ui/cta";
import { Animate } from "@/components/ui/animate";
import { getFreeTrialUrl } from "@/lib/subscriptions";
import { getFeatureMetadata } from "@/lib/features";

type Copy = {
  title: string;
  primaryCta: { label: string; href: string; external: boolean };
  secondaryCta: { label: string; href: string; external: boolean };
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const featureMetadata = getFeatureMetadata('knowledge-base');
const copy = {
  title: featureMetadata.ctaTitle,
  primaryCta: { label: "Email My Demo", href: "/email-my-demo", external: false },
  secondaryCta: { label: "Start Free Trial", href: getFreeTrialUrl(), external: true },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  return (
    <section className="relative isolate px-6 py-12 max-w-5xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <Cta
          copy={copy}
          analyticsContext="knowledge_base_cta"
          classes={{
            title: "animate-item",
            primaryButton: "animate-item",
            secondaryButton: "animate-item",
          }}
        />
      </Animate>
    </section>
  );
}
