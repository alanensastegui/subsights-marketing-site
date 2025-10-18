import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  subheading: string;
  features: Array<{ title: string; description: string }>;
};

export const sectionId = 'value-prop';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Understand what drives conversations',
  subheading:
    'Learn why customers reach out so you can improve answers, remove friction, and spot opportunities.',
  features: [
    {
      title: 'Review for quality',
      description: 'Ensure every chat reflects your standards and brand voice.',
    },
    {
      title: 'Collaborate in place',
      description:
        'Flag issues, leave comments, and track status through to resolution.',
    },
    {
      title: 'Spot opportunities to convert',
      description:
        'Identify high-impact moments in chat that lead to more customers.',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ValueProp() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="animate-item space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              {copy.heading}
            </h2>
            <h3 className="text-lg text-muted-foreground leading-relaxed">
              {copy.subheading}
            </h3>
          </div>
          <div className="animate-item space-y-12">
            {copy.features.map((feature, index) => (
              <div key={index}>
                <div className="space-y-4">
                  <h4 className="text-2xl font-semibold text-white transition-colors duration-300">
                    {feature.title}
                  </h4>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                {index < copy.features.length - 1 && (
                  <div className="mt-8 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Animate>
    </section>
  );
}
