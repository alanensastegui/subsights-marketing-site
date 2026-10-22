import Image from 'next/image';
import Link from 'next/link';

type Copy = {
  heading: string;
  quote: string;
  attribution: string;
  customers: { name: string; logo: string; href: string }[];
};
export const sectionId = 'trusted-by';

// ---- SECTION COPY REGION ----
const copy = {
  heading: 'Working with teams who know their customers.',
  quote:
    'The chatbot is fantastic in providing eloquent and informative responses to users. We have seen a decrease in email inquiries as a result.',
  attribution: 'Jessica Maynard, Director of Operations, Visit Sun Valley',
  customers: [
    {
      name: 'Visit Sun Valley',
      logo: '/images/client-logos/vsv.avif',
      href: '/case-studies/visit-sun-valley',
    },
    {
      name: 'Intrust Funding',
      logo: '/images/client-logos/intrust.avif',
      href: '/case-studies/intrust-funding',
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function TrustedBy() {
  return (
    <section
      aria-labelledby="customer-proof-title"
      className="max-w-section mx-auto px-section py-section"
    >
      <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-6 sm:p-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2
            id="customer-proof-title"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {copy.heading}
          </h2>
          <div className="mt-7 flex flex-wrap gap-6">
            {copy.customers.map((customer) => (
              <Link
                key={customer.name}
                href={customer.href}
                className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-ring"
              >
                <Image
                  src={customer.logo}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg object-contain"
                />
                <span className="text-sm">{customer.name}</span>
              </Link>
            ))}
          </div>
        </div>
        <figure>
          <blockquote className="text-xl leading-relaxed sm:text-2xl">
            &ldquo;{copy.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-5 text-sm leading-relaxed text-muted-foreground">
            {copy.attribution}
          </figcaption>
          <Link
            href="/case-studies/visit-sun-valley"
            className="mt-4 inline-block text-sm underline underline-offset-4"
          >
            Meet Sunny at Visit Sun Valley →
          </Link>
        </figure>
      </div>
    </section>
  );
}
