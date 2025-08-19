import type { Testimonial } from "./types";

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
    tags: ["lead-qualification", "sales-efficiency", "team-productivity"]
  },
  {
    id: "visit-sun-valley",
    quote: "Lucas and the Subsights team have been great to work with from the start. They have always been available and helpful. The chatbot is fantastic in providing eloquent and informative responses to users. We have seen a decrease in email inquiries as a result. Lastly, I love that the chatbot can seamlessly communicate in dozens of different languages!",
    attribution: "Operations Manager",
    company: "Visit Sun Valley",
    industry: "Tourism & Travel",
    logo: "/images/client-logos/vsv.avif",
    website: "https://visitsunvalley.com",
    featured: true,
    tags: ["multilingual", "customer-service", "email-reduction", "tourism"]
  }
];
