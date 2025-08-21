import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export const metadata = buildMetadata({
  title: "Blog - Subsights AI",
  description: "Latest news and insights from the Subsights team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="space-y-8">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="space-y-1">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
