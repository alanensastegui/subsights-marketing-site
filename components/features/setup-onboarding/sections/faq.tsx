import { Animate } from "@/components/ui/animate";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Play, Users, RefreshCw, Power } from "lucide-react";

type Copy = {
  heading: string;
  faqs: Array<{
    question: string;
    answer: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = "faq";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "FAQs",
  faqs: [
    {
      question: "How do I test before going live?",
      answer: "Preview and adjust your AI Teammate in the Subsights platform. Validate responses, tone, and behavior in real time before publishing.",
      icon: Play
    },
    {
      question: "How does team access work?",
      answer: "Send unlimited email notifications on any plan. Seats for managing the app vary: Professional includes 1, Professional Plus includes 3, and Enterprise is custom.",
      icon: Users
    },
    {
      question: "How does the knowledge base stay current?",
      answer: "Sitemap pages refresh hourly. Individual pages outside a sitemap refresh weekly. Updates happen automatically—no manual action required.",
      icon: RefreshCw
    },
    {
      question: "How do I turn off the chatbot?",
      answer: "Remove the snippet from your site. Nothing remains behind.",
      icon: Power
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
          <Accordion type="single" collapsible className="space-y-6">
            {copy.faqs.map((faq, index) => {
              const IconComponent = faq.icon;
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-0"
                >
                  <Card className="overflow-hidden hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ease-out hover:scale-[1.02] will-change-transform gap-0 py-4">
                    <AccordionTrigger className="px-4 py-0 text-left hover:no-underline group">
                      <div className="flex items-center gap-3 w-full">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 group-hover:border-primary/30 transition-all duration-300 ease-out">
                          <IconComponent className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300 ease-out" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 ease-out">
                            {faq.question}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-2 pt-0">
                      <div className="ml-13">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </Animate>
    </section>
  );
}
