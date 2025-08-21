import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";

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

  return (
    <article className="prose prose-gray max-w-none dark:prose-invert">
      <h1>{post.title}</h1>
      <p className="text-sm text-muted-foreground">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.htmlContent }} />
    </article>
  );
}
