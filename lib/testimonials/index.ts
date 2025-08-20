// Export types
export type { Testimonial, TestimonialId } from "./types";

// Export data
export { testimonials } from "./data";

// Export utility functions
export {
  getAllTestimonials,
  getTestimonialById,
  getTestimonialsByCompany,
  getTestimonialsByIndustry,
  getFeaturedTestimonials,
  getTestimonialsByTags
} from "./utils";
