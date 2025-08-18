import { copy } from "./copy";
import { FaqJsonLd } from "./FaqJsonLd";
import FAQShell from "./shell";
import FAQServerContent from "./server-content";

export default function FAQListSection() {
  return (
    <>
      <FaqJsonLd faqs={copy.faqs} />
      <FAQShell copy={copy}>
        <FAQServerContent copy={copy} />
      </FAQShell>
    </>
  );
}