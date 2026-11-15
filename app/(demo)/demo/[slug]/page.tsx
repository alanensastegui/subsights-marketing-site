import type { Metadata } from 'next';
import DemoPageClient from '@/components/demo/demo-client-page';
import { PrivateDemoPage } from '@/components/demo/private-demo-page';
export const dynamic = 'force-dynamic';
// PrivateDemoPage owns its title so late streamed metadata cannot replace an authorized label.
export const metadata: Metadata = {
  description: 'A Subsights assistant demonstration.',
  robots: { index: false, follow: false }, referrer: 'no-referrer',
};
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return slug === 'phoenix-2025' ? <><title>Subsights demo</title><DemoPageClient slug={slug} /></> : <PrivateDemoPage slug={slug} />;
}
