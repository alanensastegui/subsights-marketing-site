import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ChamberStory from './sections/chamber-story';

export const metadata: Metadata = buildMetadata({
  title: 'Website AI for Chambers of Commerce & Business Associations',
  description:
    'Help members find events, understand membership and discover local businesses. A branded website assistant, managed setup and clear annual pricing.',
  path: '/chambers',
});

export default function ChambersPage() {
  const Sections = [ChamberStory];
  return (
    <main className="-mx-6">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
