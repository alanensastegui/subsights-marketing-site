import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import BlogPostSection from "./sections/blog-post";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: "Post Not Found" };
  }
  return buildMetadata({
    title: `${post.title} - Subsights Blog`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    ogType: "article",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const Sections = [BlogPostSection];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} post={post} />
      ))}
    </main>
  );
}
