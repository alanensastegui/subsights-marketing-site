import { Animate } from "@/components/ui/animate";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, Megaphone, Briefcase, Server } from "lucide-react";

type Copy = {
  title: string;
  subtitle: string;
  professionals: Array<{
    title: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
};

export const sectionId = "ideal-for";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Ideal for Professionals Who Advise Businesses",
  subtitle: "If you help businesses grow, you're a perfect fit. Our partners include:",
  professionals: [
    { title: "Web Designers & Developers", icon: Palette },
    { title: "Digital Marketing Agencies", icon: Megaphone },
    { title: "Business & Tech Consultants", icon: Briefcase },
    { title: "Managed Service Providers", icon: Server },
  ],
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function IdealFor() {
  const c = copy;
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {/* Main Heading */}
      <Animate name="fadeIn" trigger="onVisible" className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {c.title}
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {c.subtitle}
        </p>
      </Animate>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {c.professionals.map((professional, index) => (
          <Animate
            key={index}
            name="fadeIn"
            trigger="onVisible"
            delay={index * 100}
          >
            <Card className="h-full transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <professional.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">
                  {professional.title}
                </h3>
              </CardContent>
            </Card>
          </Animate>
        ))}
      </div>
    </section>
  );
}
