import type { Testimonial } from "./types";

/**
 * Tag Convention:
 * - Use kebab-case for multi-word tags (e.g., "email-reduction", "after-hours-booking")
 * - Keep tags descriptive and benefit-focused
 * - Common tag categories (examples, not exhaustive):
 *   - Benefits: "email-reduction", "team-productivity", "customer-service"
 *   - Features: "instant-answers", "after-hours-booking", "multilingual"
 *   - Industry: "tourism", "financial-services" 
 *   - Business outcomes: "lead-qualification", "lead-capture"
 */
export const testimonials: Testimonial[] = [
  {
    id: "intrust-funding",
    quote: "Subsights has been a game-changer. Our AI assistant handles the vast majority of our online inquiries, which has freed up our team to focus on providing exceptional in-person guest services. It's a true extension of our team.",
    attribution: "Principal",
    company: "Intrust Funding",
    industry: "Financial Services",
    logo: "/images/client-logos/intrust.avif",
    website: "https://intrustfunding.com",
    featured: true,
    tags: ["lead-qualification", "team-productivity", "customer-service", "financial-services"]
  },
  {
    id: "dylans-tours",
    quote: "I was spending half my day just answering emails about parking and tour times. Now, the chatbot handles all of that for us. It gives our visitors instant answers and gets them booked, even when we're closed for the night. We're finally ahead of our inbox.",
    attribution: "Manager",
    company: "Dylan's Tours",
    industry: "Tourism & Travel",
    logo: "/images/client-logos/dylan's tours.avif",
    website: "https://www.dylanstours.com",
    featured: true,
    tags: ["email-reduction", "after-hours-booking", "instant-answers", "tourism"]
  },
  {
    id: "visit-sun-valley",
    quote: "Lucas and the Subsights team have been great to work with from the start. They have always been available and helpful. The chatbot is fantastic in providing eloquent and informative responses to users. We have seen a decrease in email inquiries as a result. Lastly, I love that the chatbot can seamlessly communicate in dozens of different languages!",
    attribution: "Operations Manager",
    company: "Visit Sun Valley",
    industry: "Tourism & Travel",
    logo: "/images/client-logos/vsv.avif",
    website: "https://visitsunvalley.com",
    featured: false,
    tags: ["multilingual", "customer-service", "email-reduction", "tourism"]
  }
];
