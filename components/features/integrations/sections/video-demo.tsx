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
  title: "How Subsights Integrates With Your Tools",
  subtitle: "A quick look at how our integrations automate handoffs, capture context, and keep your team in the loop.",
  videoId: "OlwA_a5CpYQ", // TODO: confirm video → Ask user: "Provide the final YouTube ID when ready"
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VideoDemo() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-12 max-w-7xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">{c.title}</h2>
            <p className="animate-item text-lg text-muted-foreground leading-relaxed">{c.subtitle}</p>
          </div>
          <div className="lg:col-span-3 animate-item">
            <YoutubeEmbed videoId={c.videoId} title="Subsights Integrations Demo" />
          </div>
        </div>
      </Animate>
    </section>
  );
}


