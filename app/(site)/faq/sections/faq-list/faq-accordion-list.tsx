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
}

export default function FAQAccordionList({
  faqs,
  searchQuery = "",
  openedId,
  onValueChange,
  highlight = (text) => text,
}: FAQAccordionListProps) {
  return (
    <Animate name="fadeInStagger" trigger="onVisible">
      <Accordion
        type="single"
        collapsible
        className="space-y-4"
        value={openedId}
        onValueChange={onValueChange}
      >
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="animate-item border-b-0 bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
          >
            <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 text-left hover:no-underline group">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4 w-full">
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-muted-foreground transition-colors break-words leading-relaxed">
                    {highlight(faq.question, searchQuery)}
                  </h4>
                </div>
                <div className="flex-shrink-0 self-start sm:self-auto">
                  <span className={`text-xs px-2 py-1 rounded border ${getMeta(faq.category).badgeClass} whitespace-nowrap`}>
                    {faq.category}
                  </span>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 sm:px-6 pb-4 sm:pb-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                  {highlight(faq.answer, searchQuery)}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Animate>
  );
}
