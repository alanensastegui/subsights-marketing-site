import { Animate } from '@/components/ui/animate';
import Link from 'next/link';

type Copy = {
  heading: string;
  items: Array<{
    question: string;
    answer: string;
    link?: { label: string; href: string };
  }>;
};

export const sectionId = 'destinations-faq';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Questions destinations ask us',
  items: [
    {
      question: 'How current are the answers?',
      answer:
        'Subsights refreshes the sources you connect. Your team can flag changes and missing details for us to tune. A festival activity hidden inside a larger listing may need its own calendar entry or a note from your team. For live availability or conditions, answers should direct visitors to the official provider.',
    },
    {
      question: 'Which languages does it speak?',
      answer:
        "Visitors can ask in their own language and get the answer in it. Visit Sun Valley's assistant talks with visitors in dozens of languages.",
    },
    {
      question: 'How does it treat our partners?',
      answer:
        'We configure the sources and guidance with your team, including which partner pages to recommend. You can review conversations and flag answers that need adjusting.',
    },
    {
      question: 'What about safety, closures and emergencies?',
      answer:
        'You set fixed answers and hand-offs for sensitive topics, and it points visitors to the official source for live conditions.',
    },
    {
      question: 'What does our web team have to do?',
      answer:
        "Paste one script into your site. We handle setup, testing and tuning, and we'll help your agency with the install.",
    },
    {
      question: 'What does it cost?',
      answer:
        'See current plans and included conversation volumes on our pricing page. We can discuss the right setup for your destination and any custom integrations.',
      link: { label: 'See current pricing', href: '/pricing' },
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsFaq() {
  return (
    <section className="max-w-4xl mx-auto py-section">
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
                  className="ml-4 text-muted-foreground transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
              {'link' in item && item.link && (
                <Link
                  href={item.link.href}
                  className="mt-3 inline-block text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {item.link.label} →
                </Link>
              )}
            </details>
          ))}
        </div>
      </Animate>
    </section>
  );
}
