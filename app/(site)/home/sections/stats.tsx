import { StatCounter } from "@/components/ui/stat-counter";
import { Animate } from "@/components/ui/animate";

export const sectionId = "stats";

export default function Stats() {
  return (
    <section className="relative isolate px-6 py-16 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="animate-item text-center">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">
                24/7
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                availability
              </div>
            </div>
            <StatCounter
              target={25000}
              durationMs={5000}
              label="messages answered"
              className="animate-item"
              suffix="+"
              suffixOnCompleteOnly
            />
            <div className="animate-item text-center">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">
                &lt;30s
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">
                response time
              </div>
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}
