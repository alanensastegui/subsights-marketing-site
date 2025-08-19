export type TestimonialId = string;

export interface Testimonial {
  id: TestimonialId;           // Same as case study slug for consistency
  quote: string;
  attribution: string;
  company: string;
  industry: string;
  logo: string;                // Path to company logo image
  website: string;             // Company website URL
  featured: boolean;           // For homepage display
  tags: string[];              // For categorization
}
