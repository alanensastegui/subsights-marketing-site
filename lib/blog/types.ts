import { z } from "zod";

const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
});

export type BlogPostOverview = z.infer<typeof BlogPostSchema>;

export interface BlogPost extends BlogPostOverview {
  content: string;
  htmlContent: string;
}

export { BlogPostSchema };
