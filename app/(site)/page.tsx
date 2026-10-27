import type { Metadata } from 'next';
import Home from './home/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Your Website Assistant, Cared for by Its Builders',
  description:
    'A website assistant shaped around your business. Work with its builders on content, appearance and answers, with testing before launch and ongoing care.',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
