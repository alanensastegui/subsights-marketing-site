import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import DestinationsHero from './sections/destinations-hero';
import VisitorProof from './sections/visitor-proof';
import VisitorQuestions from './sections/visitor-questions';
import HowItWorks from './sections/how-it-works';
import LaunchSteps from './sections/launch-steps';
import DestinationsFaq from './sections/destinations-faq';
import DestinationsCta from './sections/destinations-cta';

export const metadata: Metadata = buildMetadata({
  title: 'AI Visitor Assistant for Destinations - Subsights AI',
  description:
    "Help visitors plan their trip with answers from your destination's website and calendars. See how Visit Sun Valley uses Subsights to guide visitors, 24/7.",
  path: '/destinations',
});

export default function DestinationsPage() {
  const Sections = [
    DestinationsHero,
    VisitorProof,
    VisitorQuestions,
    HowItWorks,
    LaunchSteps,
    DestinationsFaq,
    DestinationsCta,
  ];

  return (
    <div className="min-h-screen">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </div>
  );
}
