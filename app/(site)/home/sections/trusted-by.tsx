import { Animate } from "@/components/ui/animate";
import { CustomerQuoteCard } from "@/components/ui/customer-quote-card";
import TrustedByCarousel from "./trusted-by-carousel";
import { getTestimonialById } from "@/lib/testimonials";

// ============================================================================
// TYPES & COPY
// ============================================================================

type Copy = {
  heading: string;
  logos: Array<{
    logoSrc: string;
    logoAlt: string;
    websiteUrl: string;
  }>;
};

const copy = {
  heading: "Trusted By",
  logos: [
    {
      logoSrc: "/images/client-logos/vsv.avif",
      logoAlt: "VSV company logo",
      websiteUrl: "https://visitsunvalley.com"
    },
    {
      logoSrc: "/images/client-logos/dylan's tours.avif",
      logoAlt: "Dylan's Tours company logo",
      websiteUrl: "https://www.dylanstours.com/"
    },
    {
      logoSrc: "/images/client-logos/intrust.avif",
      logoAlt: "Intrust company logo",
      websiteUrl: "https://intrustfunding.com/"
    },
    {
      logoSrc: "/images/client-logos/allied-health.svg",
      logoAlt: "Allied Health company logo",
      websiteUrl: "https://www.allalliedhealthschools.com/"
    },
  ],
} satisfies Copy;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TrustedBy() {
  // Get VSV testimonial
  const vsvTestimonial = getTestimonialById("visit-sun-valley");

  return (
    <Animate name="fadeIn" trigger="onVisible">
      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
        </div>

        {/* Carousel */}
        <div className="mb-16">
          <TrustedByCarousel logos={copy.logos} />
        </div>

        {/* VSV Testimonial */}
        {vsvTestimonial && (
          <Animate name="fadeIn" trigger="onVisible" delay={200}>
            <div className="max-w-4xl mx-auto">
              <CustomerQuoteCard testimonial={vsvTestimonial} />
            </div>
          </Animate>
        )}
      </section>
    </Animate>
  );
}

export const sectionId = "trusted-by";