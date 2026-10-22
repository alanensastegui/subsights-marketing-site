import { Suspense } from 'react';
import DemoRequestForm from './form-client';

type Copy = { heading: string; description: string };
export const sectionId = 'form';

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Let's look at your website.",
  description:
    "Tell us who you help and bring a question your visitors ask. We'll review your website and reply to discuss the right next step.",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Form() {
  return (
    <section className="max-w-section mx-auto px-section py-section">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Talk with Subsights
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.heading}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {copy.description}
        </p>
        <Suspense
          fallback={
            <p className="mt-8">
              Loading the request form. You can also email team@subsights.com.
            </p>
          }
        >
          <DemoRequestForm />
        </Suspense>
      </div>
    </section>
  );
}
