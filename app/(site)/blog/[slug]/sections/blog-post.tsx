import { Animate } from "@/components/ui/animate";
import Image from "next/image";
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
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground/80">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-muted-foreground/20">
                  <Image
                    src={post.author.image}
                    alt={`${post.author.name}'s profile picture`}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-foreground/90">{post.author.name}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40"></div>
              <span className="font-mono text-xs tracking-wide">{(() => {
                const [year, month, day] = post.date.split('-').map(Number);
                return new Date(year, month - 1, day).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                });
              })()}</span>
              <div className="w-1 h-1 rounded-full bg-muted-foreground/40"></div>
              <span className="font-mono text-xs tracking-wide">{readTime} min read</span>
            </div>
          </div>
          <div
            className="animate-item case-study-content"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
          {post.downloads && post.downloads.length > 0 && (
            <div className="animate-item mt-12 border-t pt-8">
              <h3 className="text-lg font-semibold mb-4">Downloads</h3>
              <ul className="list-disc pl-6 space-y-2">
                {post.downloads.map((d, i) => (
                  <li key={i}>
                    <a
                      href={`/api/download-link/${post.slug}/${d.filename}`}
                      className="text-primary underline underline-offset-4"
                      rel="noopener noreferrer"
                    >
                      {d.title || d.filename}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Animate>
      </div>
    </section>
  );
}
