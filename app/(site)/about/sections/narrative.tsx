import { Animate } from '@/components/ui/animate';

type Copy = {
  lead: string;
  paragraphs: string[];
};

export const sectionId = 'narrative';

// ---- SECTION COPY REGION ----
const copy = {
  lead: 'Helpful website AI, without making it your new project.',
  paragraphs: [
    'We built Subsights to make it easier to give website visitors useful answers. A small assistant can match your brand and help people find the right page, program or person.',
    'You bring your website and the questions your customers ask. We work with you on its sources, appearance and responses, handle setup, and keep improving it with you.',
    'Conversations give your team another way to understand visitors: what they need, what confuses them and which information is hard to find. Bespoke integrations are scoped separately, so the service fits what your business actually needs.',
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  return (
    <section
      aria-labelledby="about-narrative"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <div className="space-y-12">
        <h2 id="about-narrative" className="sr-only">
          Our approach
        </h2>
        <Animate name="fadeInStagger" trigger="onVisible">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column - Large lead text */}
            <div className="animate-item space-y-6">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed text-foreground">
                {c.lead}
              </p>
            </div>

            {/* Right column - Paragraphs */}
            <div className="animate-item space-y-6">
              {c.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Animate>
      </div>
    </section>
  );
}
