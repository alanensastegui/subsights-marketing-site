import Link from "next/link";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Animate } from "@/components/ui/animate";
import { getAllPosts } from "@/lib/blog";

export const sectionId = "posts";

type Copy = Record<string, never>;

// ---- SECTION COPY REGION ----
const copy = {} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Posts() {
  void copy;
  const posts = getAllPosts();

  return (
    <section id="posts" className="relative isolate py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-stretch">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="animate-item h-full overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </CardHeader>
                <CardContent className="text-muted-foreground flex-1">
                  <p>{post.excerpt}</p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary/80 transition-colors font-medium group/link"
                  >
                    Read Post
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Animate>
      </div>
    </section>
  );
}
