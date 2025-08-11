import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="h-full py-20 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Transform Your Website Into a<br />
          <span className="text-primary">Revenue Engine</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Subsights helps you understand your visitors and convert them into customers
          with intelligent insights and conversion optimization tools.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/schedule">
              Schedule Demo
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/demo/acme">
              Start for free
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Preview */}
      <section className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-semibold">📊</span>
            </div>
            <CardTitle className="text-xl">Real-time Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-base">
              Understand visitor behavior with comprehensive analytics and heatmaps.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-semibold">🎯</span>
            </div>
            <CardTitle className="text-xl">Smart Targeting</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-base">
              Show the right message to the right visitor at the perfect moment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-semibold">📈</span>
            </div>
            <CardTitle className="text-xl">Conversion Optimization</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground text-base">
              Increase conversions with A/B testing and personalized experiences.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
