import { getCategories, groupByCategory, type FAQ } from "./faq-utils";
import { getMeta } from "./meta";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Animate } from "@/components/ui/animate";

export default function FAQServerContent({ copy }: { copy: { faqs: FAQ[] } }) {
  const categories = getCategories(copy.faqs);
  const grouped = groupByCategory(copy.faqs);

  return (
    <div id="faq-server" className="max-w-4xl mx-auto faq-server-content">
      {categories.map((category, categoryIndex) => {
        const meta = getMeta(category);
        const faqs = grouped[category];
        return (
          <Animate key={category} name="fadeIn" trigger="onVisible" delay={categoryIndex * 100}>
            <div className="mb-8">
              <Animate name="fadeIn" trigger="onVisible" delay={categoryIndex * 100 + 50}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-2 rounded-lg ${meta.bgClass}`}>
                    <meta.Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">{category}</h3>
                  <span className="ml-auto text-sm text-gray-400">
                    {faqs.length} question{faqs.length !== 1 ? "s" : ""}
                  </span>
                </div>
              </Animate>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, faqIndex) => (
                  <Animate
                    key={faq.id}
                    name="fadeIn"
                    trigger="onVisible"
                    delay={categoryIndex * 100 + 100 + faqIndex * 50}
                  >
                    <AccordionItem
                      value={faq.id}
                      className="border border-white/10 bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
                    >
                      <AccordionTrigger className="px-6 py-4 hover:no-underline">
                        <div className="flex items-start gap-4 w-full">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors text-left" id={faq.id}>
                              {faq.question}
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
                            {faq.answer}
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Animate>
                ))}
              </Accordion>
            </div>
          </Animate>
        );
      })}
    </div>
  );
}
