import { StatCounter } from "@/components/ui/stat-counter";
import { Animate } from "@/components/ui/animate";

export const sectionId = "stats";

type Copy = {
  availability: { value: string; label: string };
  messagesAnswered: {
    label: string;
    target: number;
    durationMs?: number;
    prefix?: string;
    suffix?: string;
    suffixOnCompleteOnly?: boolean;
  };
  responseTime: { value: string; label: string };
};

// ---- SECTION COPY REGION ----
const copy = {
  availability: { value: "24/7", label: "availability" },
  messagesAnswered: {
    label: "messages answered",
    target: 25000,
    durationMs: 2500,
    suffix: "+",
    suffixOnCompleteOnly: true,
  },
  responseTime: { value: "<10s", label: "response time" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Stats() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-12 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="animate-item text-center">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">{c.availability.value}</div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">{c.availability.label}</div>
            </div>

            <StatCounter
              target={c.messagesAnswered.target}
              durationMs={c.messagesAnswered.durationMs}
              label={c.messagesAnswered.label}
              className="animate-item"
              suffix={c.messagesAnswered.suffix}
              suffixOnCompleteOnly={c.messagesAnswered.suffixOnCompleteOnly}
            />

            <div className="animate-item text-center">
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight tabular-nums">{c.responseTime.value}</div>
              <div className="text-sm md:text-base text-muted-foreground mt-1">{c.responseTime.label}</div>
            </div>
          </div>
        </div>
      </Animate>
    </section>
  );
}
