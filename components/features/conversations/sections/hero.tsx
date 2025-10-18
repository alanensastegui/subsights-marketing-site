import { Animate } from '@/components/ui/animate';
import { ButtonDuo } from '@/components/ui/button-duo';
import Link from 'next/link';
import { getFeatureMetadata } from '@/lib/features/registry';
import { getFreeTrialUrl } from '@/lib/subscriptions';

type Copy = {
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export const sectionId = 'hero';

// ---- SECTION COPY REGION ----
const copy = {
  title: getFeatureMetadata('conversations').title,
  subtitle: getFeatureMetadata('conversations').description,
  primaryCta: { label: 'Email My Demo', href: '/email-my-demo' },
  secondaryCta: { label: 'Start Free Trial', href: getFreeTrialUrl() },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Hero() {
  const c = copy;
  return (
    <section className="text-center space-y-8 max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
          {c.title}
        </h2>
        <p className="animate-item text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
          {c.subtitle}
        </p>
        <div className="animate-item">
          <ButtonDuo
            stackAt="sm"
            fullWidthMobile={true}
            primary={{
              asChild: true,
              size: 'lg',
              children: (
                <Link href={c.primaryCta.href}>{c.primaryCta.label}</Link>
              ),
              dataAttributes: {
                'data-analytics-id': 'conversations_hero_demo',
                'data-analytics-name': 'Email My Demo (Conversations Hero)',
                'data-analytics-context':
                  '{"source":"conversations_hero","section":"hero"}',
              },
            }}
            secondary={{
              asChild: true,
              size: 'lg',
              children: (
                <a
                  href={c.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.secondaryCta.label}
                </a>
              ),
              dataAttributes: {
                'data-analytics-id': 'conversations_hero_start_free',
                'data-analytics-name': 'Start Free Trial (Conversations Hero)',
                'data-analytics-context':
                  '{"source":"conversations_hero","section":"hero"}',
              },
            }}
          />
        </div>
      </Animate>
    </section>
  );
}
