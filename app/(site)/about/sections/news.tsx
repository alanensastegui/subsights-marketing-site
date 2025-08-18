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
  items: [
    {
      title: "New feature: Automated conversation summarization now available",
      url: "/news/auto-summarization",
      dateISO: "2024-01-15",
      author: "Alan Ensastegui",
      imageSrc: "/images/news/auto-summarization.jpg",
      imageAlt: "AI conversation summarization interface"
    },
    {
      title: "Customer spotlight: How VSV improved response times by 80%",
      url: "/news/vsv-case-study",
      dateISO: "2024-01-10",
      author: "Lucas Cairns",
      imageSrc: "/images/news/vsv-success.jpg",
      imageAlt: "VSV customer success metrics dashboard"
    },
    {
      title: "Subsights reaches 100+ active users milestone",
      url: "/news/user-milestone",
      dateISO: "2024-01-05",
      author: "Ryan Buchmayer",
      imageSrc: "/images/news/milestone-celebration.jpg",
      imageAlt: "Subsights team celebrating user milestone"
    }
  ],
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
      className="max-w-5xl mx-auto px-6 py-20"
    >
      <div className="space-y-8">
        <Animate name="fadeIn" trigger="onVisible">
          <h2 id="about-news" className="text-2xl font-semibold tracking-tight">
            {c.title}
          </h2>
        </Animate>
        <Animate name="fadeIn" trigger="onVisible">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
