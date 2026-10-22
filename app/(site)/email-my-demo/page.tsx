import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EmailMyDemoFormSection from './sections/form';

export const metadata: Metadata = buildMetadata({
  title: 'Talk with Lucas',
  description:
    'Bring Lucas your website and a question your visitors ask. Discuss a managed AI assistant for your destination, lending business, publisher or directory.',
  path: '/email-my-demo',
});

export default function Page() {
  const Sections = [EmailMyDemoFormSection];
  return (
    <main className="-mx-6">
      {Sections.map((S, i) => (
        <S key={i} />
      ))}
    </main>
  );
}
