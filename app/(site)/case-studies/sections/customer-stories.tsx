import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import { getAllCaseStudies } from "@/lib/case-studies";

type Copy = Record<string, never>;

export const sectionId = "case-studies";

// ---- SECTION COPY REGION ----
const copy = {} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function CustomerStories() {
  void copy;
  const stories = getAllCaseStudies();

  return (
    <section id="case-studies" className="relative isolate py-12">
      <div className="mx-auto max-w-6xl px-6">
        <Animate name="fadeInStagger" trigger="onVisible">

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 items-stretch">
            {stories.map((story) => (
              <Card key={story.slug} className="animate-item h-full overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                      <a
                        href={story.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                        aria-label={`Visit ${story.company} website`}
                      >
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
                      </a>
                      {/* TODO: Get proper color logos for all clients so we can apply grayscale filter universally */}
                    </div>
                    <div className="min-w-0 flex-1">
                      <a
                        href={story.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block hover:text-primary-foreground transition-colors"
                      >
                        <CardTitle className="text-lg sm:text-xl break-words hover:text-primary-foreground transition-colors">
                          {story.company}
                        </CardTitle>
                      </a>
                      <Badge variant="outline" className="text-xs mt-1">
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
                            <p className="text-sm break-words leading-relaxed">{story.overview.challenge}</p>
                          </div>
                        )}
                        {story.overview.solution && (
                          <div>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">Solution</h4>
                            <p className="text-sm break-words leading-relaxed">{story.overview.solution}</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 flex-1">
                  {story.overview?.keyResults && story.overview.keyResults.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Key Results</h4>
                      <ul className="space-y-1">
                        {story.overview.keyResults.map((result, i) => (
                          <li key={i} className="text-sm flex items-start gap-2">
                            <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                            <span className="break-words leading-relaxed">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {story.overview?.metrics && story.overview.metrics.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-3">Metrics</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {story.overview.metrics.map((metric, i) => (
                          <div key={i} className="text-center p-2 sm:p-3 bg-background rounded-lg">
                            <div className="text-base sm:text-lg font-bold text-primary break-words">{metric.value}</div>
                            <div className="text-xs text-muted-foreground break-words leading-tight">{metric.label}</div>
                            <div className="text-xs text-green-600 font-medium break-words">{metric.change}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </CardContent>
                <CardFooter className="pt-4 border-t border-border">
                  <Link
                    href={`/case-studies/${story.slug}`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary/80 transition-colors font-medium group/link w-full sm:w-auto justify-center sm:justify-start"
                  >
                    Read Full Case Study
                    <svg
                      className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Animate>
      </div>
    </section>
  );
}
