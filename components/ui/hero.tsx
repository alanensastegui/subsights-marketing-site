import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import Link from "next/link";

export type ResponsiveText = string | { mobile: string; desktop: string };

export type HeroProps = {
  slogan: ResponsiveText;
  description: ResponsiveText;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta: { label: string; href: string; external?: boolean };
  classNames?: {
    wrapper?: string;
    title?: string;
    description?: string;
    buttons?: string;
  };
};

export function Hero({ slogan, description, primaryCta, secondaryCta, classNames }: HeroProps) {
  // Helper function to get responsive text for a specific breakpoint
  const getResponsiveText = (text: ResponsiveText, breakpoint: 'mobile' | 'desktop') => {
    if (typeof text === 'string') {
      return text;
    }
    return text[breakpoint];
  };

  // Helper function to render CTA button content
  const renderCta = (cta: { label: string; href: string; external?: boolean }) => {
    if (cta.external) {
      return (
        <a href={cta.href} target="_blank" rel="noopener noreferrer">
          {cta.label}
        </a>
      );
    }
    return (
      <Link href={cta.href}>
        {cta.label}
      </Link>
    );
  };

  return (
    <div className={cn("space-y-2", classNames?.wrapper)}>
      <h2 className={cn("text-4xl md:text-5xl font-bold tracking-tight leading-tight text-center mx-auto mb-2", classNames?.title)}>
        <span className="block sm:hidden">{getResponsiveText(slogan, 'mobile')}</span>
        <span className="hidden sm:block">{getResponsiveText(slogan, 'desktop')}</span>
      </h2>

      <div className="w-full flex justify-center">
        <p className={cn("text-xl md:text-2xl text-muted-foreground leading-relaxed break-normal text-center mx-auto mb-5", classNames?.description)}>
          <span className="block sm:hidden">{getResponsiveText(description, 'mobile')}</span>
          <span className="hidden sm:block">{getResponsiveText(description, 'desktop')}</span>
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-xs flex-col items-stretch gap-2 sm:gap-2 sm:flex-row">
        <Button
          size="lg"
          asChild
          className="w-full sm:flex-1"
          data-analytics-id="home_hero_demo"
          data-analytics-name="Email My Demo (Home Hero)"
          data-analytics-context='{"source":"home_hero","section":"hero"}'
        >
          {renderCta(primaryCta)}
        </Button>

        <Button variant="outline" size="lg" asChild className="w-full sm:flex-1">
          {renderCta(secondaryCta)}
        </Button>
      </div>
    </div>
  );
}

export default Hero;


