import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, MailOpen, MessageSquare, CheckCircle2 } from "lucide-react";

type Copy = {
  title: string;
  steps: { title: string; description: string; icon: React.ComponentType<{ className?: string }>; }[];
};

export const sectionId = "fast-path";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Fast path to insight and action",
  steps: [
    {
      title: "Open your report",
      description: "Start from your daily, automated email summary.",
      icon: MailOpen,
    },
    {
      title: "Click into a chat",
      description: "Jump straight to the conversation in the dashboard.",
      icon: MessageSquare,
    },
    {
      title: "Flag or star",
      description: "Leave a comment, change status, and our team handles the rest.",
      icon: CheckCircle2,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function FastPath() {
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-8">{copy.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {copy.steps.map((step, index) => (
            <div key={step.title} className="animate-item">
              <div className="relative group transform-gpu transition-transform duration-300 hover:scale-105">
                <Card className="group hover:bg-card/80 hover:border-border/70 hover:shadow-lg h-full">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold tracking-tight text-foreground">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {index < copy.steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
                    <div className="w-8 h-8 rounded-full bg-background border border-border/50 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}


