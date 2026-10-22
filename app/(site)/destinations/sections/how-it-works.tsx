import { Animate } from '@/components/ui/animate';

type Copy = {
  heading: string;
  items: Array<{ title: string; description: string }>;
};

export const sectionId = 'how-it-works';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Built for how a destination works',
  items: [
    {
      title: "Answers from your destination's sources",
      description:
        'Connect your website, event calendars and local guidance. We help tune answers as the seasons change and add details that a bundled festival listing may leave out.',
    },
    {
      title: 'Gives visitors a next step',
      description:
        'Guide people to relevant event, lodging and partner pages. Link tracking helps you see which resources visitors follow from the conversation.',
    },
    {
      title: 'Keeps your team involved',
      description:
        'You approve the sources and the topics that go to a person. Your team can review, comment on and flag any conversation.',
    },
    {
      title: 'Shows what visitors need',
      description:
        "Review conversation volume, recurring topics and unanswered questions. Use those patterns to improve website content and decide what needs your team's attention.",
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  return (
    <section className="max-w-section mx-auto py-section">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
          {copy.heading}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {copy.items.map(({ title, description }, index) => (
            <div key={title} className="animate-item flex gap-4 sm:gap-6">
              <span
                aria-hidden="true"
                className="text-2xl font-semibold text-muted-foreground tabular-nums"
              >
                0{index + 1}
              </span>
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
