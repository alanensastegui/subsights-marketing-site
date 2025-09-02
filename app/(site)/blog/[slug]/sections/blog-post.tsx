import { Animate } from "@/components/ui/animate";
import type { BlogPost } from "@/lib/blog";

interface BlogPostSectionProps {
  post: BlogPost;
}

export const sectionId = "blog-post";

// Calculate estimated read time based on 200 WPM
function calculateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

export default function BlogPostSection({ post }: BlogPostSectionProps) {
  const readTime = calculateReadTime(post.htmlContent);

  return (
    <section className="relative isolate py-12">
      {/* Background blur effect */}
      <div className="absolute inset-0 -z-10 bg-background/5 backdrop-blur-[96px]" />

      <div className="mx-auto max-w-3xl px-6">
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="animate-item space-y-4 text-center mb-12">
            <h2 className="text-4xl font-bold tracking-tight">{post.title}</h2>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>{new Date(post.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
          <div
            className="animate-item case-study-content"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </Animate>
      </div>
    </section>
  );
}
