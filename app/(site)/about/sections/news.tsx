import Image from "next/image";
import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  items: {
    title: string;
    url: string;
    dateISO: string;
    author: string;
    imageSrc: string;
    imageAlt: string;
  }[];
  seeMoreUrl: string;
};

export const sectionId = "news";

// ---- SECTION COPY REGION ----
const copy = {
  title: "News",
  items: [] as Copy["items"],
  seeMoreUrl: "/now"
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  // Don't render if no news items
  if (!c.items || c.items.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="about-news"
      className="max-w-5xl mx-auto px-6 py-12"
    >
      <div className="space-y-8">
        <Animate name="fadeInStagger" trigger="onVisible">
          <h2 id="about-news" className="animate-item text-2xl font-semibold tracking-tight">
            {c.title}
          </h2>

          <div className="animate-item grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {c.items.slice(0, 3).map((item) => (
              <article key={item.url} className="group">
                <a href={item.url} className="block space-y-4">
                  {/* Image */}
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {/* Author and Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{item.author}</span>
                      <span>•</span>
                      <time dateTime={item.dateISO}>
                        {new Date(item.dateISO).toLocaleDateString()}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </Animate>

        {c.items.length > 3 && (
          <div className="mt-4">
            <a className="text-sm underline underline-offset-4" href={c.seeMoreUrl}>
              See more
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
