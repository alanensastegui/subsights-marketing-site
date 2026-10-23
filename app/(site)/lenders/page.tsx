import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import LendingStory from './sections/lending-story';

export const metadata: Metadata = buildMetadata({
  title: 'Website AI for Private & Hard Money Lenders',
  description:
    'Help borrowers understand your lending programs and take the next step. Managed website AI, clear annual pricing and a personal setup with Subsights.',
  path: '/lenders',
});

export default function LendersPage() {
  const Sections = [LendingStory];
  return (
    <main className="-mx-6">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
