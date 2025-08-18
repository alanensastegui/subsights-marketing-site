import { getCategories, groupByCategory, type FAQ } from "./faq-utils";
import { Animate } from "@/components/ui/animate";
import FAQAccordionList from "./faq-accordion-list";
import FAQCategoryHeader from "./faq-category-header";

export default function FAQServerContent({ copy }: { copy: { faqs: FAQ[] } }) {
  const categories = getCategories(copy.faqs);
  const grouped = groupByCategory(copy.faqs);

  return (
    <div id="faq-server" className="max-w-4xl mx-auto faq-server-content">
      {categories.map((category, categoryIndex) => {
        const faqs = grouped[category];
        return (
          <Animate key={category} name="fadeIn" trigger="onVisible" delay={categoryIndex * 100}>
            <div className="mb-8">
              <FAQCategoryHeader
                category={category}
                faqCount={faqs.length}
                delay={categoryIndex * 100 + 50}
              />

              <FAQAccordionList
                faqs={faqs}
                delayOffset={categoryIndex * 100 + 100}
              />
            </div>
          </Animate>
        );
      })}
    </div>
  );
}
