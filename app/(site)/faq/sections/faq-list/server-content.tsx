import { getCategories, groupByCategory, type FAQ } from "./faq-utils";
import { Animate } from "@/components/ui/animate";
import FAQAccordionList from "./faq-accordion-list";
import FAQCategoryHeader from "./faq-category-header";

export default function FAQServerContent({ copy }: { copy: { faqs: FAQ[] } }) {
  const categories = getCategories(copy.faqs);
  const grouped = groupByCategory(copy.faqs);

  return (
    <div id="faq-server" className="max-w-4xl mx-auto faq-server-content">
      <Animate name="fadeInStagger" trigger="onVisible">
        {categories.map((category) => {
          const faqs = grouped[category];
          return (
            <div key={category} className="animate-item mb-8">
              <FAQCategoryHeader
                category={category}
                faqCount={faqs.length}
              />

              <FAQAccordionList
                faqs={faqs}
              />
            </div>
          );
        })}
      </Animate>
    </div>
  );
}
