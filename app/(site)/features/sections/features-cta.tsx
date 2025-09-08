import { Animate } from "@/components/ui/animate";
import { Cta } from "@/components/ui/cta";
import { getFreeTrialUrl } from "@/lib/subscriptions";

type Copy = {
  title: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; external: boolean };
};

export const sectionId = "features-cta";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Make every visit count.",
  primaryCta: { label: "Email My Demo", href: "/email-my-demo" },
  secondaryCta: { label: "Start Free", href: getFreeTrialUrl(), external: true },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function FeaturesCta() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <Cta
          copy={copy}
          analyticsContext="features_cta"
          className="flex-col text-center space-y-8"
          classes={{
            title: "animate-item",
            primaryButton: "animate-item",
            secondaryButton: "animate-item"
          }}
        />
      </Animate>
    </section>
  );
}
