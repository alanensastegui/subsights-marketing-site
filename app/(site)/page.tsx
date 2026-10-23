import type { Metadata } from 'next';
import Home from './home/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Affordable Website AI, Managed for You',
  description:
    'A branded AI widget for destinations, private lenders and publishers. Subsights handles setup and ongoing care. Managed plans from $1,990 a year.',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
