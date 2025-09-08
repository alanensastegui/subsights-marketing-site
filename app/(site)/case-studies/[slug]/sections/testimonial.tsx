import { Animate } from "@/components/ui/animate";
import { CustomerQuoteCard } from "@/components/ui/customer-quote-card";
import type { CaseStudy } from "@/lib/case-studies";
import { getTestimonialById } from "@/lib/testimonials";

interface Props {
  caseStudy: CaseStudy;
}

type Copy = {
  heading: string;
  subheading: string;
};

const copy = {
  heading: "In their words",
  subheading: "How {company} runs customer experience with Subsights.",
} satisfies Copy;

export default function CaseStudyTestimonial({ caseStudy }: Props) {
  // Get the testimonial for this specific case study
  const testimonial = getTestimonialById(caseStudy.slug);

  // Don't render anything if we don't have a testimonial
  if (!testimonial) {
    return null;
  }

  return (
    <section className="relative isolate py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="text-center mb-12">
            <h2 className="animate-item text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {copy.heading}
            </h2>
            <p className="animate-item text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {copy.subheading.replace('{company}', caseStudy.company)}
            </p>
          </div>

          <div className="animate-item">
            <CustomerQuoteCard testimonial={testimonial} />
          </div>
        </Animate>
      </div>
    </section>
  );
}
