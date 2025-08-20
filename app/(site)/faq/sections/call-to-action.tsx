import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";

type Copy = {
  message: string;
  cta: {
    label: string;
    href: string;
  };
};

export const sectionId = "call-to-action";

// ---- SECTION COPY REGION ----
const copy = {
  message: "Still have questions? We're here to help.",
  cta: {
    label: "Contact Support",
    href: "mailto:support@subsights.com?subject=FAQ%20Support%20Request",
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CallToAction() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-4">
      <div className="text-center space-y-8">
        <Animate name="fadeIn" trigger="onVisible">
          <p className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {c.message}
          </p>
        </Animate>

        <Animate name="fadeIn" trigger="onVisible" delay={200}>
          <Button asChild size="lg">
            <a href={c.cta.href} target="_blank" rel="noopener noreferrer">
              {c.cta.label}
            </a>
          </Button>
        </Animate>
      </div>
    </section>
  );
}
