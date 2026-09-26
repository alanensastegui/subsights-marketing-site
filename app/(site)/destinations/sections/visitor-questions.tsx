import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  description: string;
  moments: Array<{ title: string; question: string }>;
};

export const sectionId = 'visitor-questions';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'You know the destination. Help visitors find their way.',
  description:
    "Festival details sit inside larger event listings. Transport information changes. Visitors ask about rooms you can't check in real time. Your team needs help answering the repeat questions and spotting gaps in the information.",
  moments: [
    {
      title: 'Events & activities',
      question: "What's happening while we're in town?",
    },
    { title: 'Getting around', question: 'How do we get there without a car?' },
    {
      title: 'Places to stay',
      question: 'Where can we look for somewhere to stay?',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function VisitorQuestions() {
  return (
    <section className="max-w-section mx-auto py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center mb-12">
          <h2 className="animate-item max-w-3xl mx-auto text-3xl md:text-4xl font-bold tracking-tight">
            {copy.heading}
          </h2>
          <p className="animate-item max-w-3xl mx-auto mt-5 text-lg leading-relaxed text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <ul className="grid gap-4 md:grid-cols-3">
          {copy.moments.map(({ title, question }) => (
            <li
              key={title}
              className="animate-item rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-muted-foreground italic">
                &ldquo;{question}&rdquo;
              </p>
            </li>
          ))}
        </ul>
        <p className="animate-item mt-4 text-center text-sm text-muted-foreground">
          Illustrative questions based on common visitor topics, not verbatim
          visitor messages.
        </p>
      </Animate>
    </section>
  );
}
