import type { Metadata } from 'next';
import DemoPageClient from '@/components/demo/demo-client-page';
import { PrivateDemoPage } from '@/components/demo/private-demo-page';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Subsights demo', description: 'A Subsights assistant demonstration.',
  robots: { index: false, follow: false }, referrer: 'no-referrer',
};
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return slug === 'phoenix-2025' ? <DemoPageClient slug={slug} /> : <PrivateDemoPage slug={slug} />;
}
