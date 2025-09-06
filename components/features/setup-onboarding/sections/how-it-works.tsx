import { Animate } from "@/components/ui/animate";

type Step = {
  number: string;
  title: string;
  description: string;
};

type Copy = {
  title: string;
  subtitle: string;
  steps: Step[];
};

export const sectionId = "how-it-works";

// ---- SECTION COPY REGION ----
const copy = {
  title: "How it works",
  subtitle: "Go from sign-up to a live AI teammate in four simple steps—fast, clear, done.",
  steps: [
    {
      number: "01",
      title: "Build the brain",
      description: "Upload files, connect your sitemap, or paste text. See what it knows, control sources and rules, and manage updates—so answers stay accurate and up to date."
    },
    {
      number: "02",
      title: "Set the voice",
      description: "Use natural language to set tone, greetings, and guardrails; match colors, logos, and icons so it feels unmistakingly yours."
    },
    {
      number: "03",
      title: "Wire your workflow",
      description: "Send handoffs and alerts to your teams and get daily or weekly summaries to keep everyone aligned."
    },
    {
      number: "04",
      title: "Embed once",
      description: "Drop a lightweight snippet and go live."
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {c.steps.map((step, index) => (
            <div key={step.number} className="relative">
              {/* Step Number */}
              <div className="animate-item mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/25 border border-primary">
                  <span className="text-lg font-bold text-foreground">{step.number}</span>
                </div>
              </div>

              {/* Step Content */}
              <div className="animate-item space-y-3">
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* Connecting Line (except for last item) */}
              {index < c.steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-12 w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
