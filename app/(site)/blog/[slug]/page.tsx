import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { Animate } from "@/components/ui/animate";

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
    <main className="min-h-screen">
      <section className="relative isolate py-12">
        <div className="mx-auto max-w-4xl px-6">
          <Animate name="fadeInStagger" trigger="onVisible">
            <div className="animate-item space-y-4 text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
              <p className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </div>
            <div
              className="animate-item case-study-content"
              dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />
          </Animate>
        </div>
      </section>
    </main>
  );
}
