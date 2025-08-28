import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { BlogPost, BlogPostOverview } from "./types";
import { BlogPostSchema } from "./types";

const postsDirectory = path.join(process.cwd(), "lib/blog/content");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .filter((fileName) => fileName.toLowerCase() !== "readme.md")
    .filter((fileName) => !fileName.startsWith("_"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllPosts(): BlogPostOverview[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostOverviewBySlug(slug))
    .filter(Boolean) as BlogPostOverview[];
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const validationResult = BlogPostSchema.safeParse({ slug, ...data });
    if (!validationResult.success) {
      console.warn(`Invalid blog post data for ${slug}:`, validationResult.error);
      return null;
    }
    const frontMatter = validationResult.data;
    const processedContent = await remark().use(html).process(content);
    const htmlContent = processedContent.toString();
    return {
      ...frontMatter,
      content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getPostOverviewBySlug(slug: string): BlogPostOverview | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const validationResult = BlogPostSchema.safeParse({ slug, ...data });
    if (!validationResult.success) {
      console.warn(`Invalid blog post overview data for ${slug}:`, validationResult.error);
      return null;
    }
    return validationResult.data;
  } catch (error) {
    console.error(`Error reading blog post overview ${slug}:`, error);
    return null;
  }
}
