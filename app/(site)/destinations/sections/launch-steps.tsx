import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  description: string;
  steps: Array<{ title: string; description: string }>;
};

export const sectionId = "launch-steps";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "We launch it and keep it tuned",
  description: "Managed support is part of every plan. You don't build or babysit a bot.",
  steps: [
    { title: "Connect your sources", description: "Your website, event calendars and any guides or notes you want it to use." },
    { title: "Set voice and boundaries", description: "Tone, greeting, the topics it hands to your team, and where each answer should lead." },
    { title: "Test your busiest questions", description: "We run the questions your front desk hears most and fix what's off before launch." },
    { title: "Add one script to your site", description: "Your web team or agency pastes one line; we help them do it." },
    { title: "Tune it each season", description: "Summer festivals, ski season, road closures: we adjust priorities as your year changes." },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function LaunchSteps() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center mb-12">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">{copy.heading}</h2>
          <p className="animate-item mt-4 text-xl text-muted-foreground">{copy.description}</p>
        </div>
        <ol className="grid gap-6 md:grid-cols-5">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="animate-item rounded-xl border border-white/10 bg-white/5 p-6">
              <span className="text-3xl font-bold text-primary">{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </Animate>
    </section>
  );
}
