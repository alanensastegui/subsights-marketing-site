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
  title: "A smarter website in minutes",
  subtitle: "A tool designed to save you time shouldn't start by consuming it. Our platform is built around an intuitive process that gets you from sign-up to a fully functional AI Teammate without the technical headaches",
  videoId: "iicp8Ydxrnk", // TODO: confirm video ID → Ask user: "Is this the correct YouTube video ID?"
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VideoDemo() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-16 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="animate-item text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Video Container */}
        <div className="animate-item">
          <YoutubeEmbed
            videoId={c.videoId}
            title="Subsights AI Setup Demo"
          />
        </div>
      </Animate>
    </section>
  );
}
