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
    limit: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
  comparison: {
    heading: string;
    existing: string;
    assistant: string;
    retained: string;
  };
};

export const sectionId = 'visitor-questions';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Help visitors turn a question into a plan.',
  description:
    'Examples adapted from destination visitor questions. They describe the experience to build around your sources, rather than recorded chatbot answers.',
  moments: [
    {
      title: 'Dates that stay exact',
      question:
        'We are visiting in March. Which days are the races, rather than training?',
      response:
        'Use the connected calendar for the requested year and distinguish race days, training and other related events. Keep those distinctions through follow-up questions.',
      nextStep: 'Link the official event details and booking or ticket page.',
      limit:
        'Published dates do not establish ticket availability. The event organizer confirms changes and places.',
      icon: CalendarDays,
    },
    {
      title: 'The right lodging route',
      question: 'We are a family looking for a vacation rental, not a hotel.',
      response:
        'Retain the party’s needs and the difference between a hotel and a rental. Use the relevant approved lodging listings and enquiry route.',
      nextStep:
        'Open the matching property or booking partner page for dates, rates and availability.',
      limit:
        'A listing is not live inventory. The assistant does not promise a room, a price or a reservation without a booking connection.',
      icon: Tent,
    },
    {
      title: 'Holiday hours without a guess',
      question: 'Will the visitor center be open the day after Christmas?',
      response:
        'Look for the exact holiday date and location. Regular seasonal hours alone do not establish a holiday opening.',
      nextStep:
        'Give confirmed published hours where available, or the official contact to check that date.',
      limit:
        'Make a missing holiday schedule clear instead of inferring that the office is open.',
      icon: Moon,
    },
    {
      title: 'Useful local discovery',
      question:
        'Where can we eat nearby with children and a specific dietary need?',
      response:
        'Ask which location and constraints matter, then narrow the connected local listings. Keep those details when the visitor changes one part of the plan.',
      nextStep:
        'Share the business profile and its official menu or contact route.',
      limit:
        'The business confirms dietary suitability, opening hours and reservations. A directory description is not that confirmation.',
      icon: Route,
    },
    {
      title: 'The same useful route in another language',
      question: '¿Dónde puedo estacionar cerca del evento?',
      response:
        'Help the visitor in their language using the same published event, parking and transport information.',
      nextStep:
        'Link the official parking or transport instructions and retain the requested event and date.',
      limit:
        'Do not invent a parking restriction, accessible space or shuttle service when the source does not cover it.',
      icon: Globe,
    },
  ],
  comparison: {
    heading: 'Keep the destination tools visitors already use.',
    existing:
      'A good FAQ, map, calendar and booking site are often the quickest route for a visitor who knows exactly what they want.',
    assistant:
      'A conversation helps when dates, party needs and preferences cross several pages, or when a follow-up changes the plan. Compatible calendar and directory connections are checked during setup.',
    retained:
      'Your calendar and tourism content remain the sources. Booking providers own availability, payment and reservations. Your team handles information that has not been published or connected.',
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
            ({ title, question, response, nextStep, limit, icon: Icon }) => (
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
                  <div>
                    <dt className="font-semibold">
                      What still needs confirmation
                    </dt>
                    <dd className="mt-1 text-muted-foreground">{limit}</dd>
                  </div>
                </dl>
              </li>
            )
          )}
        </ul>
        <div className="mt-12 border-t border-border pt-10">
          <h2 className="text-2xl font-semibold">{copy.comparison.heading}</h2>
          <dl className="mt-7 grid gap-7 md:grid-cols-3">
            <div>
              <dt className="font-semibold">What already works</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                {copy.comparison.existing}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Where a conversation helps</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                {copy.comparison.assistant}
              </dd>
            </div>
            <div>
              <dt className="font-semibold">Keep the right system in charge</dt>
              <dd className="mt-3 leading-relaxed text-muted-foreground">
                {copy.comparison.retained}
              </dd>
            </div>
          </dl>
        </div>
      </Animate>
    </section>
  );
}
