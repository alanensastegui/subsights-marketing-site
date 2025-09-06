import { Animate } from "@/components/ui/animate";
import { YoutubeEmbed } from "@/components/ui/youtube-embed";

type Copy = {
  title: string;
  subtitle: string;
  videoId: string;
};

export const sectionId = "video-demo";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Answers you can trust",
  subtitle: "Control the knowledge your AI Teammate uses. Every answer stays accurate, consistent, and reliable.",
  videoId: "nwFlzhBB_gI",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VideoDemo() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-16 max-w-7xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Text Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">
              {c.title}
            </h2>
            <p className="animate-item text-lg text-muted-foreground leading-relaxed">
              {c.subtitle}
            </p>
          </div>

          {/* Video Container - Right Side */}
          <div className="lg:col-span-3 animate-item">
            <YoutubeEmbed
              videoId={c.videoId}
              title="Knowledge Base Demo"
            />
          </div>
        </div>
      </Animate>
    </section>
  );
}
