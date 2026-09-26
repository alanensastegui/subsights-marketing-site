import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  items: Array<{ question: string; answer: string }>;
};

export const sectionId = "destinations-faq";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Questions destinations ask us",
  items: [
    {
      question: "How current are the answers?",
      answer:
        "It re-reads your sitemap every hour and individual pages weekly, and syncs the public event calendars you connect. Seasonal notes you give us take effect when we publish them.",
    },
    {
      question: "Which languages does it speak?",
      answer:
        "Visitors can ask in their own language and get the answer in it. Visit Sun Valley's assistant talks with visitors in dozens of languages.",
    },
    {
      question: "How does it treat our partners?",
      answer:
        "It recommends from the sources and rules you approve and links to partner pages the same way every time. You decide what it promotes.",
    },
    {
      question: "What about safety, closures and emergencies?",
      answer:
        "You set fixed answers and hand-offs for sensitive topics, and it points visitors to the official source for live conditions.",
    },
    {
      question: "What does our web team have to do?",
      answer: "Paste one script into your site. We handle setup, testing and tuning, and we'll help your agency with the install.",
    },
    {
      question: "What does it cost?",
      answer:
        "Destinations can start with a three-month pilot at $99 a month. After that, plans start at $199 a month, or $1,990 a year, with managed support included. Multi-destination and custom-integration plans are quoted.",
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function DestinationsFaq() {
  return (
    <section className="max-w-4xl mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-10">{copy.heading}</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {copy.items.map((item) => (
            <details key={item.question} className="animate-item group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-lg font-semibold text-white">
                {item.question}
                <span className="ml-4 text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </Animate>
    </section>
  );
}
