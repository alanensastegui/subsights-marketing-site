import { Cta } from "@/components/ui/cta";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle?: string;
  primaryCta: { label: string; href: string; external: boolean };
  secondaryCta: { label: string; href: string; external: boolean };
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ready to see similar results?",
  subtitle: "Join the growing list of satisfied customers",
  primaryCta: { label: "Book Demo", href: CALENDLY_URL, external: true },
  secondaryCta: { label: "Start Free", href: "/pricing", external: false },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl">
      <Animate name="fadeInStagger" trigger="onVisible">
        <Cta
          copy={copy}
          analyticsContext="case_study_cta"
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