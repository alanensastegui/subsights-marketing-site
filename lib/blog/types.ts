import { z } from "zod";

const DownloadItemSchema = z.object({
  filename: z.string(),
  title: z.string().optional(),
});

const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: z.string(),
  excerpt: z.string(),
  author: z.object({
    name: z.string(),
    image: z.string(),
  }),
  downloads: z.array(DownloadItemSchema).optional(),
});

export type BlogPostOverview = z.infer<typeof BlogPostSchema>;

export interface BlogPost extends BlogPostOverview {
  content: string;
  htmlContent: string;
}

export { BlogPostSchema };
