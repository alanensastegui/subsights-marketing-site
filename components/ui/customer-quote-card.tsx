import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/lib/testimonials/types";

interface CustomerQuoteCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function CustomerQuoteCard({ testimonial, className }: CustomerQuoteCardProps) {
  return (
    <Card className={cn(
      "group border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-300 hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col will-change-transform",
      className
    )}>
      <CardContent className="p-6 sm:p-8 flex flex-col h-full">
        {/* Quote Content */}
        <div className="flex flex-col h-full">
          {/* Quote Text */}
          <blockquote className="text-lg sm:text-xl md:text-2xl text-white/95 leading-relaxed font-medium relative flex-1 pt-8 pb-8">
            <span className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 text-3xl sm:text-5xl text-muted-foreground/80 font-serif leading-none">&ldquo;</span>
            <div className="pr-10 pl-2">
              {testimonial.quote}
            </div>
            <span className="absolute -bottom-2 sm:-bottom-3 -right-1 sm:-right-2 text-3xl sm:text-5xl text-muted-foreground/80 font-serif leading-none">&rdquo;</span>
          </blockquote>
        </div>
      </CardContent>

      <CardFooter className="px-6 sm:px-8 pb-2 sm:pb-2 pt-0 space-y-4 border-t border-white/10">
        {/* Attribution & Company Info */}
        <div className="flex flex-col items-start gap-3 sm:gap-4 w-full">
          <div className="flex items-center gap-3 sm:gap-4 w-full">
            <div className="flex-shrink-0">
              <a
                href={testimonial.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg will-change-transform"
                aria-label={`Visit ${testimonial.company} website`}
              >
                <Image
                  src={testimonial.logo}
                  alt={`${testimonial.company} company logo`}
                  width={64}
                  height={64}
                  className={cn(
                    "object-contain h-16 rounded-lg",
                    testimonial.logo.includes("allied-health") && "grayscale brightness-150 filter"
                  )}
                />
              </a>
            </div>

            <div className="flex-1 min-w-0">
              <cite className="text-white font-semibold not-italic block text-sm sm:text-base">
                {testimonial.attribution}
              </cite>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                <a
                  href={testimonial.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground text-xs sm:text-sm font-medium hover:text-primary-foreground transition-colors"
                >
                  {testimonial.company}
                </a>
                <Badge
                  variant="secondary"
                  className="text-xs bg-primary/30 text-primary-foreground border-primary/50 w-fit"
                >
                  {testimonial.industry}
                </Badge>
              </div>
            </div>
          </div>

          {/* View Case Study Link */}
          <Link
            href={`/case-studies/${testimonial.id}`}
            className="inline-flex items-center gap-2 text-sm text-primary-foreground hover:text-primary transition-colors font-medium group/link"
          >
            View Case Study
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
        </div>
      </CardFooter>
    </Card>
  );
}
