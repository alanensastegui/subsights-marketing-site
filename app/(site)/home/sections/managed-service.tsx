import Image from 'next/image';

type Copy = {
  heading: string;
  description: string;
  steps: { title: string; description: string }[];
  insight: { heading: string; description: string };
};
export const sectionId = 'managed-service';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'You know your business. We make the assistant work for it.',
  description:
    'Work directly with the people building your assistant, from the first conversation through ongoing improvements.',
  steps: [
    {
      title: 'Make it yours',
      description:
        'Your colors, greeting, tone and approved sources. We agree on the questions it should answer and when it should send someone to your team.',
    },
    {
      title: 'Test before launch',
      description:
        'Bring your real questions, awkward edge cases and important links. We work through them together before adding the assistant to your website.',
    },
    {
      title: 'Keep learning',
      description:
        'Review conversations, link clicks and recurring questions. Use what people ask to improve both the assistant and your website.',
    },
  ],
  insight: {
    heading: 'Another way to understand your customers.',
    description:
      'Page views tell you where people went. Conversations help you understand what they were trying to do. See questions, review responses and find gaps in your content.',
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ManagedService() {
  return (
    <section
      aria-labelledby="managed-service-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <h2
        id="managed-service-title"
        className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl"
      >
        {copy.heading}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        {copy.description}
      </p>
      <ol className="mt-10 grid gap-8 md:grid-cols-3">
        {copy.steps.map((step, i) => (
          <li key={step.title} className="border-t border-border pt-5">
            <span className="text-sm text-muted-foreground">0{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-14 grid items-center gap-8 rounded-2xl bg-card p-6 sm:p-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-semibold">{copy.insight.heading}</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {copy.insight.description}
          </p>
        </div>
        <Image
          src="/images/product-screenshots/chatbot-analytics.png"
          alt="Subsights conversation analytics dashboard"
          width={1280}
          height={800}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full rounded-xl border border-border"
        />
      </div>
    </section>
  );
}
