import { CalendarDays, Globe, Moon, Route, Tent } from 'lucide-react';
import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  description: string;
  moments: Array<{
    title: string;
    question: string;
    response: string;
    nextStep: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  comparison: {
    heading: string;
    existing: string;
    assistant: string;
  };
};

export const sectionId = 'visitor-questions';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Help visitors turn a question into a plan.',
  description:
    'Illustrative visitor journeys, tailored to your content and connections.',
  moments: [
    {
      title: 'Dates that stay exact',
      question:
        'We are visiting in March. Which days are the races, rather than training?',
      response:
        'Race dates for the requested year, clearly distinguished from training and related events in your connected calendar.',
      nextStep:
        'The official event page for details, ticket availability and any schedule changes.',
      icon: CalendarDays,
    },
    {
      title: 'The right lodging route',
      question: 'We are a family looking for a vacation rental, not a hotel.',
      response:
        'Relevant vacation rentals from your approved listings, with the family’s needs carried through the conversation.',
      nextStep:
        'The property or booking partner’s page for dates, current rates and availability.',
      icon: Tent,
    },
    {
      title: 'Holiday hours without a guess',
      question: 'Will the visitor center be open the day after Christmas?',
      response:
        'Published holiday hours for the exact date and location, or a clear indication that the holiday schedule still needs checking.',
      nextStep:
        'The visitor center’s official hours page or contact details to confirm the holiday opening.',
      icon: Moon,
    },
    {
      title: 'Useful local discovery',
      question:
        'Where can we eat nearby with children and a specific dietary need?',
      response:
        'Relevant local listings shaped around the family’s location and dietary needs, with room to refine the plan.',
      nextStep:
        'The business’s menu or contact details to confirm dietary suitability, opening hours and reservations.',
      icon: Route,
    },
    {
      title: 'The same useful route in another language',
      question: '¿Dónde puedo estacionar cerca del evento?',
      response:
        'Published parking and transport information for the visitor’s event and date, explained in Spanish.',
      nextStep:
        'The official parking or transport guidance, with any accessibility details covered by the source.',
      icon: Globe,
    },
  ],
  comparison: {
    heading: 'A conversation that connects the trip.',
    existing:
      'Your FAQ, map, calendar and booking links help visitors who know where to look.',
    assistant:
      'An assistant brings those resources together around dates, party needs and preferences. Follow-up questions help visitors refine the plan and reach the right page.',
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VisitorQuestions() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="mb-12 max-w-3xl">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
          <p className="animate-item mt-4 text-lg text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <ul className="grid gap-5 md:grid-cols-2">
          {copy.moments.map(
            ({ title, question, response, nextStep, icon: Icon }) => (
              <li
                key={title}
                className="animate-item rounded-xl border border-border bg-card p-6"
              >
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-3 italic">&ldquo;{question}&rdquo;</p>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {response}
                </p>
                <dl className="mt-5 space-y-3 text-sm leading-relaxed">
                  <div>
                    <dt className="font-semibold">Next step</dt>
                    <dd className="mt-1 text-muted-foreground">{nextStep}</dd>
                  </div>
                </dl>
              </li>
            )
          )}
        </ul>
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold">{copy.comparison.heading}</h2>
          <dl className="mt-7 grid gap-7 md:grid-cols-2">
            <div>
              <dt className="font-semibold">Your website today</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                {copy.comparison.existing}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">A conversation adds</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                {copy.comparison.assistant}
              </dd>
            </div>
          </dl>
        </div>
      </Animate>
    </section>
  );
}
