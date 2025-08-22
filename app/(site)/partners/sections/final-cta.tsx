import { Animate } from "@/components/ui/animate";
import { Cta } from "@/components/ui/cta";
import { PARTNERSHIP_URL } from "@/lib/config";

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
};

export const sectionId = "final-cta";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ready to grow together?",
  subtitle: "Join a program that values your expertise and rewards long-term relationships",
  primaryCta: { label: "Apply Today", href: PARTNERSHIP_URL }
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function FinalCta() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl">
    <Animate name="fadeInStagger" trigger="onVisible">
      <Cta
        copy={copy}
        analyticsContext="partners_final_cta"
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
