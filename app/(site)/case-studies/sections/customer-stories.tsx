import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { getAllCaseStudies } from "@/lib/case-studies";

type Copy = {
  title: string;
  subtitle: string;
};

export const sectionId = "customer-stories";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Customer Success Stories",
  subtitle: "See how we've helped businesses transform their customer service",
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CustomerStories() {
  const c = copy;
  const stories = getAllCaseStudies();

  return (
    <section id="customer-stories" className="relative isolate py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Animate name="fadeIn" trigger="onVisible" className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {c.subtitle}
          </p>
        </Animate>

        <div className="grid gap-8 md:grid-cols-2 items-stretch">
          {stories.map((story, index) => (
            <Animate key={story.slug} name="fadeIn" trigger="onVisible" delay={index * 100}>
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center p-2">
                      <Image
                        src={story.logo}
                        alt={`${story.company} logo`}
                        width={48}
                        height={48}
                        className={cn(
                          "object-contain w-full h-full",
                          story.logo.includes("allied-health") && "grayscale brightness-150 filter"
                        )}
                      />
                      {/* TODO: Get proper color logos for all clients so we can apply grayscale filter universally */}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{story.company}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {story.industry}
                      </Badge>
                    </div>
                  </div>
                  {story.overview && (
                    <>
                      <div className="space-y-3">
                        {story.overview.challenge && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Challenge</h4>
                            <p className="text-sm">{story.overview.challenge}</p>
                          </div>
                        )}
                        {story.overview.solution && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Solution</h4>
                            <p className="text-sm">{story.overview.solution}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardHeader>

                <CardContent className="space-y-6 flex-1">
                  {story.overview?.keyResults && story.overview.keyResults.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Key Results</h4>
                      <ul className="space-y-1">
                        {story.overview.keyResults.map((result, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {story.overview?.metrics && story.overview.metrics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3">Metrics</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {story.overview.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-3 bg-background rounded-lg">
                            <div className="text-lg font-bold text-primary">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                            <div className="text-xs text-green-600 font-medium">{metric.change}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </CardContent>
                <CardFooter className="pt-4 border-t border-border">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/case-studies/${story.slug}`}>
                      Read Full Case Study
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </Animate>
          ))}
        </div>
      </div>
    </section>
  );
}
