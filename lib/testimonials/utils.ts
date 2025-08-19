import { testimonials } from "./data";
import type { Testimonial, TestimonialId } from "./types";

/**
 * Get all testimonials
 */
export function getAllTestimonials(): Testimonial[] {
  return testimonials;
}

/**
 * Get a testimonial by its id (case study slug)
 */
export function getTestimonialById(id: TestimonialId): Testimonial | undefined {
  return testimonials.find(testimonial => testimonial.id === id);
}

/**
 * Get testimonials by company name
 */
export function getTestimonialsByCompany(company: string): Testimonial[] {
  return testimonials.filter(testimonial =>
    testimonial.company.toLowerCase().includes(company.toLowerCase())
  );
}

/**
 * Get testimonials by industry
 */
export function getTestimonialsByIndustry(industry: string): Testimonial[] {
  return testimonials.filter(testimonial =>
    testimonial.industry.toLowerCase() === industry.toLowerCase()
  );
}

/**
 * Get featured testimonials for homepage display
 */
export function getFeaturedTestimonials(limit?: number): Testimonial[] {
  const featured = testimonials.filter(testimonial => testimonial.featured);

  if (limit) {
    return featured.slice(0, limit);
  }

  return featured;
}

/**
 * Get testimonials by tags
 */
export function getTestimonialsByTags(tags: string[]): Testimonial[] {
  return testimonials.filter(testimonial =>
    tags.some(tag => testimonial.tags.includes(tag))
  );
}
