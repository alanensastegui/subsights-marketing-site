import { Animate } from "@/components/ui/animate";
import { Button } from "@/components/ui/button";
import { CustomerQuoteCard } from "@/components/ui/customer-quote-card";
import Link from "next/link";
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
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <div className="animate-item text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
            {copy.heading}
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto px-2">
            {copy.subheading}
          </p>
        </div>

        {/* Quotes Grid */}
        <div className="animate-item grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {testimonials.map((testimonial) => (
            <CustomerQuoteCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="animate-item text-center">
          <Button asChild size="lg" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
            <Link href={copy.cta.link}>
              {copy.cta.text}
            </Link>
          </Button>
        </div>
      </Animate>
    </section>
  );
}

export const sectionId = "customer-quote";
