import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Cta = { label: string; href: string; external?: boolean };

type Copy = {
  title: string;
  description?: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
};

interface CtaProps {
  copy: Copy;
  className?: string;
  analyticsContext?: string;
  classes?: {
    title?: string;
    description?: string;
    primaryButton?: string;
    secondaryButton?: string;
  };
}

export function Cta({ copy, className, analyticsContext, classes }: CtaProps) {
  const c = copy;

  return (
    <div
      className={cn(
        "mx-auto text-center flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Title */}
      <h2 className={cn("text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8 text-center", classes?.title)}>
        {c.title}
      </h2>

      {/* Call to Action Buttons */}
      <div className="flex w-full sm:w-auto flex-col sm:flex-row gap-4 justify-center items-stretch">
        <Button
          size="lg"
          asChild
          className={cn("w-full sm:w-auto min-w-[140px]", classes?.primaryButton)}
          data-analytics-id={analyticsContext ? `${analyticsContext}_primary` : "cta_primary"}
          data-analytics-name={c.primaryCta.label}
          data-analytics-context={analyticsContext ? `{"source":"${analyticsContext}","section":"cta"}` : '{"section":"cta"}'}
        >
          {c.primaryCta.external ? (
            <a href={c.primaryCta.href} target="_blank" rel="noopener noreferrer">
              {c.primaryCta.label}
            </a>
          ) : (
            <a href={c.primaryCta.href}>
              {c.primaryCta.label}
            </a>
          )}
        </Button>

        {c.secondaryCta && (
          <Button variant="outline" size="lg" asChild className={cn("w-full sm:w-auto min-w-[140px]", classes?.secondaryButton)}>
            {c.secondaryCta.external ? (
              <a href={c.secondaryCta.href} target="_blank" rel="noopener noreferrer">
                {c.secondaryCta.label}
              </a>
            ) : (
              <a href={c.secondaryCta.href}>
                {c.secondaryCta.label}
              </a>
            )}
          </Button>
        )}
      </div>

      {/* Description (optional) */}
      {c.description && (
        <p className={cn("text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 md:mb-0 md:basis-full md:order-3", classes?.description)}>
          {c.description}
        </p>
      )}
    </div>
  );
}
