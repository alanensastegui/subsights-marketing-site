import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Animate } from "@/components/ui/animate";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/lib/case-studies";

interface Props {
  caseStudy: CaseStudy;
}

export default function CaseStudyHero({ caseStudy }: Props) {
  return (
    <section className="relative isolate py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Animate name="fadeInStagger" trigger="onVisible">
            {/* Company Logo */}
            <div className="animate-item flex justify-center mb-8">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-muted/50 shadow-lg flex items-center justify-center p-4">
                <Image
                  src={caseStudy.logo}
                  alt={`${caseStudy.company} logo`}
                  width={64}
                  height={64}
                  className={cn(
                    "object-contain w-full h-full",
                    caseStudy.logo.includes("allied-health") && "grayscale brightness-150 filter"
                  )}
                />
                {/* TODO: Get proper color logos for all clients so we can apply grayscale filter universally */}
              </div>
            </div>

            {/* Industry Badge */}
            <Badge variant="outline" className="text-sm animate-item mb-8">
              {caseStudy.industry}
            </Badge>

            {/* Company Name */}
            <h1 className="animate-item text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-8">
              {caseStudy.company}
            </h1>

            {/* Brief Tagline */}
            <p className="animate-item text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Transforming {caseStudy.industry.toLowerCase()} through AI-powered solutions
            </p>
          </Animate>
        </div>
      </div>
    </section>
  );
}
