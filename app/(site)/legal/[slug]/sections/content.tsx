import { Animate } from "@/components/ui/animate";
import { LegalPage } from "@/lib/legal";

type Props = {
  legalPage: LegalPage;
};

export default function LegalPageContent({ legalPage }: Props) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <Animate name="fadeIn" trigger="onVisible" className="mb-16">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {legalPage.title}
          </h1>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {legalPage.description}
          </p>
        </div>

        {/* Meta Information */}
        <div className="flex justify-center text-sm text-foreground/70 border-t border-border/50 pt-8">
          <div className="bg-muted/20 px-4 py-2 rounded-lg">
            <strong>Last Updated:</strong> {legalPage.lastUpdated}
          </div>
        </div>
      </Animate>

      {/* Content */}
      <Animate name="fadeIn" trigger="onVisible" delay={200}>
        <div
          className="legal-content bg-card/30 rounded-xl p-8 md:p-12 border border-border/30"
          dangerouslySetInnerHTML={{ __html: legalPage.htmlContent }}
        />
      </Animate>
    </section>
  );
}
