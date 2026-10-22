import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Hero from './sections/hero';
import CustomerStories from './sections/customer-stories';
import CallToAction from './sections/call-to-action';

export const metadata: Metadata = buildMetadata({
  title: 'Customer Stories',
  description:
    'See how Subsights website assistants serve a destination and a private lender, plus a past publisher implementation. Practical examples with clear scope.',
  path: '/case-studies',
});

export default function CaseStudies() {
  const Sections = [Hero, CustomerStories, CallToAction];
  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
