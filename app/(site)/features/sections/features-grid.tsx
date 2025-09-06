import { Animate } from "@/components/ui/animate";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllFeatureMetadata } from "@/lib/features/registry";
import { iconMap } from "@/lib/features/registry";

export const sectionId = "features-grid";

export default function FeaturesGrid() {
  const features = getAllFeatureMetadata();

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="animate-item">
              <Card className="group h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 hover:border-primary/20 flex flex-col">
                <CardHeader className="pb-4 flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mb-2">
                      {(() => {
                        const Icon = iconMap[feature.id];
                        return Icon ? <Icon className="w-8 h-8 text-primary" /> : null;
                      })()}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-semibold">
                    <Link
                      href={`/features/${feature.id}`}
                      className="hover:text-primary transition-colors"
                      data-analytics-id={`features_grid_title_${feature.id}`}
                      data-analytics-name={`Feature Title - ${feature.title}`}
                      data-analytics-context={`{"source":"features_grid","feature":"${feature.id}"}`}
                    >
                      {feature.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-0 mt-auto">
                  {/* Learn More Link */}
                  <Link
                    href={`/features/${feature.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                    data-analytics-id={`features_grid_${feature.id}`}
                    data-analytics-name={`Learn More - ${feature.title}`}
                    data-analytics-context={`{"source":"features_grid","feature":"${feature.id}"}`}
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>

      </Animate>
    </section>
  );
}
