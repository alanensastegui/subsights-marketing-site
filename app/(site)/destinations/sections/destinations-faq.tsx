import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  items: Array<{ question: string; answer: string }>;
};

export const sectionId = 'destinations-faq';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Questions destinations ask us',
  items: [
    {
      question: 'How current are the answers?',
      answer:
        'We agree on your sources and refresh setup during onboarding. We test important dates and seasonal information with your team. Live conditions still need a current, authoritative source.',
    },
    {
      question: 'Which languages does it speak?',
      answer:
        'Visitors can ask in their own language. We can test the languages that matter to your destination with you before launch.',
    },
    {
      question: 'How does it treat our partners?',
      answer:
        'We agree on the sources, partner pages and recommendation priorities with you, then test the behavior against realistic visitor questions.',
    },
    {
      question: 'What about safety, closures and emergencies?',
      answer:
        'We identify sensitive questions during setup and agree on the official resources and human contact paths to use. An assistant needs a live source to report live conditions.',
    },
    {
      question: 'What does our web team have to do?',
      answer:
        "Paste one script into your site. We handle setup, testing and tuning, and we'll help your agency with the install.",
    },
    {
      question: 'What does it cost?',
      answer:
        'Professional+ is $3,990 a year with 2,200 conversations per month, 2 chatbots, 3 seats, analytics, 2 custom reports and managed priority support. Professional is $1,990 a year with 600 conversations per month. Monthly options are available. Bespoke integrations and larger deployments are quoted separately.',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsFaq() {
  return (
    <section className="max-w-4xl mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">
          {copy.heading}
        </h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {copy.items.map((item) => (
            <details key={item.question} className="animate-item group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-white">
                {item.question}
                <span
                  className="ml-4 text-primary transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Animate>
    </section>
  );
}
