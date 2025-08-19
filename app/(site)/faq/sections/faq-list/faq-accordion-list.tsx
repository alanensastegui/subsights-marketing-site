import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Animate } from "@/components/ui/animate";
import { getMeta } from "./meta";
import type { FAQ } from "./faq-utils";

interface FAQAccordionListProps {
  faqs: FAQ[];
  searchQuery?: string;
  openedId?: string;
  onValueChange?: (value: string | undefined) => void;
  highlight?: (text: string, query: string) => React.ReactNode;
  delayOffset?: number;
}

export default function FAQAccordionList({
  faqs,
  searchQuery = "",
  openedId,
  onValueChange,
  highlight = (text) => text,
  delayOffset = 0
}: FAQAccordionListProps) {
  return (
    <Accordion
      type="single"
      collapsible
      className="space-y-4"
      value={openedId}
      onValueChange={onValueChange}
    >
      {faqs.map((faq, i) => (
        <Animate
          key={faq.id}
          name="fadeIn"
          trigger="onVisible"
          delay={delayOffset + i * 50}
        >
          <AccordionItem
            value={faq.id}
            className="border-white/10 bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
          >
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <h4 className="text-lg font-medium text-white group-hover:text-muted-foreground transition-colors">
                    {highlight(faq.question, searchQuery)}
                  </h4>
                </div>
                <div className="flex-shrink-0">
                  <span className={`text-xs px-2 py-1 rounded border ${getMeta(faq.category).badgeClass}`}>
                    {faq.category}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {highlight(faq.answer, searchQuery)}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Animate>
      ))}
    </Accordion>
  );
}
