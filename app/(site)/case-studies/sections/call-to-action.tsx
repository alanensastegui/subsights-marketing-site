import { Cta } from "@/components/ui/cta";
import { Animate } from "@/components/ui/animate";
import { getFreeTrialUrl } from "@/lib/subscriptions";

type Copy = {
  title: string;
  primaryCta: { label: string; href: string; external: boolean };
  secondaryCta: { label: string; href: string; external: boolean };
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ready to see similar results?",
  primaryCta: { label: "Get Demo", href: "/get-demo", external: false },
  secondaryCta: {
    label: "Start Free",
    href: getFreeTrialUrl(),
    external: true,
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl">
      <Animate name="fadeInStagger" trigger="onVisible">
        <Cta
          copy={copy}
          analyticsContext="all_case_studies_cta"
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
