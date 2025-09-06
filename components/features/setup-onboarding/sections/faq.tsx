import { Animate } from "@/components/ui/animate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type Copy = {
  heading: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const sectionId = "faq";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "FAQs",
  faqs: [
    {
      question: "How do I test before going live?",
      answer: "Preview and adjust your AI Teammate in the Subsights platform. Validate responses, tone, and behavior in real time before publishing."
    },
    {
      question: "How does team access work?",
      answer: "Send unlimited email notifications on any plan. Seats for managing the app vary: Professional includes 1, Professional Plus includes 3, and Enterprise is custom."
    },
    {
      question: "How does the knowledge base stay current?",
      answer: "Sitemap pages refresh hourly. Individual pages outside a sitemap refresh weekly. Updates happen automatically—no manual action required."
    },
    {
      question: "How do I turn off the chatbot?",
      answer: "Remove the snippet from your site. Nothing remains behind."
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function FAQ() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {copy.heading}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-item">
          <Accordion type="single" collapsible className="space-y-4">
            {copy.faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/50 rounded-lg overflow-hidden hover:border-border transition-colors duration-200 last:border-b"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-muted-foreground transition-colors">
                    {faq.question}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Animate>
    </section>
  );
}
