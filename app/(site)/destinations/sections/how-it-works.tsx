import { BarChart3, MousePointerClick, RefreshCw, ShieldCheck } from "lucide-react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  items: Array<{ title: string; description: string; icon: React.ComponentType<{ className?: string }> }>;
};

export const sectionId = "how-it-works";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Built for how a destination works",
  items: [
    {
      title: "Stays current without your team",
      description:
        "It reads your website sitemap every hour and single pages weekly, plus your public event calendars, files and notes. Publish a page and it's in the answers within about an hour.",
      icon: RefreshCw,
    },
    {
      title: "Turns answers into visits",
      description:
        "Every answer links to the event, lodging, partner or booking page, and each click is counted, so you can show partners the traffic you send them.",
      icon: MousePointerClick,
    },
    {
      title: "Stays inside your boundaries",
      description:
        "You approve the sources and the topics that go to a person. Your team can review, comment on and flag any conversation.",
      icon: ShieldCheck,
    },
    {
      title: "Reports your board will read",
      description:
        "Conversation volume, top topics, questions it couldn't answer and link clicks, emailed daily or weekly.",
      icon: BarChart3,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">{copy.heading}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {copy.items.map(({ title, description, icon: Icon }) => (
            <div key={title} className="animate-item flex gap-6">
              <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
