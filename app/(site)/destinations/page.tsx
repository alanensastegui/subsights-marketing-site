import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import DestinationsHero from './sections/destinations-hero';
import VisitorProof from './sections/visitor-proof';
import VisitorQuestions from './sections/visitor-questions';
import DestinationValue from './sections/destination-value';
import LaunchSteps from './sections/launch-steps';
import DestinationsFaq from './sections/destinations-faq';
import DestinationsCta from './sections/destinations-cta';

export const metadata: Metadata = buildMetadata({
  title: 'AI Visitor Assistant for Destinations - Subsights AI',
  description:
    'A branded website assistant for your destination, with setup, visitor insights and managed support. Professional+ is $3,990 annually. Meet Sunny at Sun Valley.',
  path: '/destinations',
});

export default function DestinationsPage() {
  const Sections = [
    DestinationsHero,
    VisitorProof,
    VisitorQuestions,
    DestinationValue,
    LaunchSteps,
    DestinationsFaq,
    DestinationsCta,
  ];

  return (
    <main className="-mx-6 min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
