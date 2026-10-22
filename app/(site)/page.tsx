import type { Metadata } from 'next';
import Home from './home/page';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Managed Website AI',
  description:
    'Managed website AI for destinations, private lenders and publishers. A branded assistant, personal setup, ongoing care and clear annual pricing from Subsights.',
  path: '/',
});

export default function HomePage() {
  return <Home />;
}
