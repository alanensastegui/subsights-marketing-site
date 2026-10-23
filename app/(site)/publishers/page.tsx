import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import PublisherStory from './sections/publisher-story';

export const metadata: Metadata = buildMetadata({
  title: 'Website AI for Publishers & Affiliate Directories',
  description:
    'Help readers choose relevant next steps with managed website AI. Connect your content and approved partner links, then learn from conversations and clicks.',
  path: '/publishers',
});

export default function PublishersPage() {
  const Sections = [PublisherStory];
  return (
    <main className="-mx-6">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
