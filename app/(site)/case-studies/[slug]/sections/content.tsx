import { Animate } from "@/components/ui/animate";
import type { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyContent({ caseStudy }: Props) {
  return (
    <section className="relative isolate py-12">
      <div className="mx-auto max-w-4xl px-6">
        <Animate name="fadeInStagger" trigger="onVisible">
          <div
            className="animate-item case-study-content"
            dangerouslySetInnerHTML={{ __html: caseStudy.htmlContent }}
          />
        </Animate>
      </div>
    </section>
  );
}
