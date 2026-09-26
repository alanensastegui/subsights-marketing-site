import { CalendarDays, Globe, Moon, Route, Tent } from "lucide-react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  description: string;
  moments: Array<{ title: string; question: string; icon: React.ComponentType<{ className?: string }> }>;
};

export const sectionId = "visitor-questions";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "The questions your visitors actually ask",
  description: "Your website already has the answers. Visitors just have to find them. Now they can ask.",
  moments: [
    { title: "Before the trip", question: "Which weekend in June has the most going on?", icon: CalendarDays },
    { title: "Getting around", question: "Can I get from the airport to town without a car?", icon: Route },
    { title: "Things to do", question: "What's good for kids on a rainy afternoon?", icon: Tent },
    { title: "After hours", question: "Is the visitor center open tomorrow morning?", icon: Moon },
    { title: "In their language", question: "¿Dónde puedo estacionar cerca del festival?", icon: Globe },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VisitorQuestions() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center mb-12">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">{copy.heading}</h2>
          <p className="animate-item mt-4 text-xl text-muted-foreground">{copy.description}</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {copy.moments.map(({ title, question, icon: Icon }) => (
            <li key={title} className="animate-item rounded-xl border border-white/10 bg-white/5 p-6">
              <Icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-muted-foreground italic">&ldquo;{question}&rdquo;</p>
            </li>
          ))}
        </ul>
      </Animate>
    </section>
  );
}
