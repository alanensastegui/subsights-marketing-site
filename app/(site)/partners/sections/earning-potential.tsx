import { Animate } from "@/components/ui/animate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EarningToggle from "./earning-toggle";

type Copy = {
  title: string;
  subtitleTop: string;
  subtitleBottom: string;
  tiers: Array<{
    name: string;
    description: string;
    featured?: boolean;
    commissionRates: Array<{
      plan: string;
      year1to2: string;
      year3plus: string;
    }>;
  }>;
};

type Props = {
  searchParams?: { tier?: string };
};

export const sectionId = "earning-potential";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Your earning potential",
  subtitleTop: "A structure that rewards loyalty",
  subtitleBottom: "Early partners benefit from exclusive Founders Club rates",
  tiers: [
    {
      name: "Founders Club",
      description: "Premium rates (first 25 partners)",
      featured: true,
      commissionRates: [
        { plan: "Monthly Plan", year1to2: "25%", year3plus: "15%" },
        { plan: "Annual Plan", year1to2: "30%", year3plus: "20%" },
      ],
    },
    {
      name: "Standard Partner",
      description: "Great rates for all",
      commissionRates: [
        { plan: "Monthly Plan", year1to2: "20%", year3plus: "5%" },
        { plan: "Annual Plan", year1to2: "25%", year3plus: "10%" },
      ],
    },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function EarningPotential({ searchParams }: Props) {
  const c = copy;
  const isFoundersClub = searchParams?.tier !== "standard";
  const activeTier = isFoundersClub ? c.tiers[0] : c.tiers[1]; // Founders Club is first, Standard is second

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Main Heading */}
        <div className="animate-item text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <div className="text-xl text-muted-foreground max-w-3xl mx-auto">
            <p>{c.subtitleTop}</p>
            <p className="mt-2">{c.subtitleBottom}</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="animate-item">
          <EarningToggle isFoundersClub={isFoundersClub} />
        </div>

        {/* Commission Table */}
        <Card className={`animate-item h-full transition-all duration-300 hover:scale-105 hover:shadow-lg max-w-2xl mx-auto ${activeTier.featured ? 'ring-2 ring-primary/20 shadow-lg' : ''
          }`}>
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CardTitle className="text-2xl font-bold">
                {activeTier.name}
              </CardTitle>
              {activeTier.featured && (
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">
              {activeTier.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Subscription Term</th>
                    <th className="text-center py-3 px-4 font-semibold">Commissions (Years 1–2)</th>
                    <th className="text-center py-3 px-4 font-semibold">Commissions (Years 3+)</th>
                  </tr>
                </thead>
                <tbody>
                  {activeTier.commissionRates.map((rate, rateIndex) => (
                    <tr key={rateIndex} className="border-b border-border/50 last:border-b-0">
                      <td className="py-3 px-4 font-medium">{rate.plan}</td>
                      <td className="py-3 px-4 text-center font-bold text-primary">{rate.year1to2}</td>
                      <td className="py-3 px-4 text-center font-bold text-muted-foreground">{rate.year3plus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Animate>
    </section>
  );
}
