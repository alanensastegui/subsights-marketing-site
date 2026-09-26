import Link from "next/link";
import { ArrowRight, Compass, LayoutGrid, MapPin } from "lucide-react";
import { Animate } from "@/components/ui/animate";

type Copy = {
  heading: string;
  routes: Array<{ title: string; description: string; href: string; analyticsId: string; icon: React.ComponentType<{ className?: string }> }>;
};

export const sectionId = "industry-routes";

// ---- SECTION COPY REGION ----
const copy = {
  heading: "Who it's for",
  routes: [
    {
      title: "Destination organizations",
      description: "Visitor bureaus, tourism boards and chambers: events, lodging and getting around, 24/7.",
      href: "/destinations",
      analyticsId: "home_industry_destinations",
      icon: MapPin,
    },
    {
      title: "Tour and activity operators",
      description: "Parking, meeting points and tour times answered after hours, so guests arrive ready.",
      href: "/case-studies/dylans-tours",
      analyticsId: "home_industry_tour_operators",
      icon: Compass,
    },
    {
      title: "Other teams",
      description: "Any website with questions your team answers over and over.",
      href: "/features",
      analyticsId: "home_industry_other",
      icon: LayoutGrid,
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function IndustryRoutes() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-12" aria-labelledby="industry-routes-title">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h2 id="industry-routes-title" className="animate-item sr-only">
          {copy.heading}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {copy.routes.map(({ title, description, href, analyticsId, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              data-slot="button"
              data-analytics-id={analyticsId}
              data-analytics-name={`${title} (Home Industries)`}
              data-analytics-context='{"source":"home_industries","section":"industry-routes"}'
              className="animate-item group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-white">
                {title}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </h3>
              <p className="mt-2 text-muted-foreground">{description}</p>
            </Link>
          ))}
        </div>
      </Animate>
    </section>
  );
}
