import { Animate } from "@/components/ui/animate";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { cn } from "@/lib/cn";
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
  heading: "In Their Own Words",
  subheading: "Hear directly from {company} about their experience with Subsights AI",
} satisfies Copy;

export default function CaseStudyTestimonial({ caseStudy }: Props) {
  // Get the testimonial for this specific case study
  const testimonial = getTestimonialById(caseStudy.slug);

  // Don't render anything if we don't have a testimonial
  if (!testimonial) {
    return null;
  }

  return (
    <section className="relative isolate py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <Animate name="fadeIn" trigger="onVisible" className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {copy.heading}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {copy.subheading.replace('{company}', caseStudy.company)}
          </p>
        </Animate>

        <Animate name="fadeIn" trigger="onVisible" delay={200}>
          <Card className="border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed italic relative text-center">
                  <span className="absolute -top-2 -left-2 text-3xl sm:text-4xl text-primary/30 font-serif">&ldquo;</span>
                  {testimonial.quote}
                  <span className="absolute -bottom-2 -right-2 text-3xl sm:text-4xl text-primary/30 font-serif">&rdquo;</span>
                </blockquote>

                <Separator className="bg-white/10" />

                {/* Attribution & Company Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <a
                      href={testimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                      aria-label={`Visit ${testimonial.company} website`}
                    >
                      <Image
                        src={caseStudy.logo}
                        alt={`${testimonial.company} company logo`}
                        width={64}
                        height={64}
                        className={cn(
                          "object-contain h-16 rounded-lg",
                          caseStudy.logo.includes("allied-health") && "grayscale brightness-150 filter"
                        )}
                      />
                    </a>
                  </div>

                  <div className="flex-1 min-w-0">
                    <cite className="text-white font-semibold not-italic block text-lg sm:text-xl mb-2">
                      {testimonial.attribution}
                    </cite>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                      <a
                        href={testimonial.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground text-base sm:text-lg font-medium hover:text-primary-foreground transition-colors"
                      >
                        {testimonial.company}
                      </a>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/20 text-foreground border-primary/30 w-fit"
                      >
                        {testimonial.industry}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Animate>
      </div>
    </section>
  );
}
