import {
  BarChart3,
  MousePointerClick,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  items: Array<{
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = 'how-it-works';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Built for how a destination works',
  items: [
    {
      title: 'Information from your destination',
      description:
        'Your website, compatible event calendars, guides and notes bring local information together. We agree on the sources and refresh setup with your team.',
      icon: RefreshCw,
    },
    {
      title: 'Useful links, visible engagement',
      description:
        'Visitors can follow links to your events, lodging and partner pages. Link-click reporting helps you see which resources they explore.',
      icon: MousePointerClick,
    },
    {
      title: 'Stays inside your boundaries',
      description:
        'You approve the sources and the topics that go to a person. Your team can review, comment on and flag any conversation.',
      icon: ShieldCheck,
    },
    {
      title: 'Reports your board will read',
      description:
        'Conversation volume, top topics, unanswered questions and link clicks, with report schedules and recipients selected for your team.',
      icon: BarChart3,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          {copy.heading}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {copy.items.map(({ title, description, icon: Icon }) => (
            <div key={title} className="animate-item flex gap-6">
              <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                <p className="mt-2 text-lg text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
