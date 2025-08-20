import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getFeaturedTestimonials } from "@/lib/testimonials";

type Copy = {
  heading: string;
  subheading: string;
  cta: {
    text: string;
    link: string;
  };
};

const copy = {
  heading: "Don't Just Take Our Word For It",
  subheading: "See how businesses across industries are transforming their customer experience with Subsights AI",
  cta: {
    text: "View All Case Studies",
    link: "/case-studies",
  },
} satisfies Copy;

export default function CustomerQuote() {
  // Get featured testimonials for homepage display
  const testimonials = getFeaturedTestimonials();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-12 sm:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
          {copy.heading}
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
          {copy.subheading}
        </p>
      </Animate>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {testimonials.map((testimonial, index) => (
          <Animate
            key={testimonial.id}
            name="fadeIn"
            trigger="onVisible"
            delay={index * 150}
          >
            <Card className="group border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
              <CardContent className="p-6 sm:p-8 flex flex-col h-full">
                {/* Quote Content */}
                <div className="space-y-4 sm:space-y-6 flex flex-col h-full">
                  {/* Quote Text */}
                  <blockquote className="text-base sm:text-lg md:text-xl text-white leading-relaxed italic relative flex-1 flex items-center text-left">
                    <span className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 text-2xl sm:text-4xl text-primary/30 font-serif">&ldquo;</span>
                    {testimonial.quote}
                    <span className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 text-2xl sm:text-4xl text-primary/30 font-serif">&rdquo;</span>
                  </blockquote>
                </div>
              </CardContent>

              <CardFooter className="px-6 sm:px-8 pb-2 sm:pb-2 pt-0 space-y-4 border-t border-white/10">
                {/* Attribution & Company Info */}
                <div className="flex flex-col items-start gap-3 sm:gap-4 w-full">
                  <div className="flex items-center gap-3 sm:gap-4 w-full">
                    <div className="flex-shrink-0">
                      <a
                        href={testimonial.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                        aria-label={`Visit ${testimonial.company} website`}
                      >
                        <Image
                          src={testimonial.logo}
                          alt={`${testimonial.company} company logo`}
                          width={64}
                          height={64}
                          className={cn(
                            "object-contain h-16 rounded-lg",
                            testimonial.logo.includes("allied-health") && "grayscale brightness-150 filter"
                          )}
                        />
                      </a>
                    </div>

                    <div className="flex-1 min-w-0">
                      <cite className="text-white font-semibold not-italic block text-sm sm:text-base">
                        {testimonial.attribution}
                      </cite>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                        <a
                          href={testimonial.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground text-xs sm:text-sm font-medium hover:text-primary-foreground transition-colors"
                        >
                          {testimonial.company}
                        </a>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/30 text-primary-foreground border-primary/50 w-fit"
                        >
                          {testimonial.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* View Case Study Link */}
                  <Link
                    href={`/case-studies/${testimonial.id}`}
                    className="inline-flex items-center gap-2 text-sm text-primary-foreground hover:text-primary transition-colors font-medium group/link"
                  >
                    View Case Study
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </Animate>
        ))}
      </div>

      {/* Call to Action */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center">
        <Button asChild size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
          <Link href={copy.cta.link}>
            {copy.cta.text}
          </Link>
        </Button>
      </Animate>
    </section>
  );
}

export const sectionId = "customer-quote";
