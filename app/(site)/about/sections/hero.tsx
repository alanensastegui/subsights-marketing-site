import Image from "next/image";
import { Animate } from "@/components/ui/animate";

type Copy = {
  title: string;
  productScreenshot: {
    posterJpg: string;
    ariaLabel: string;
  };
};

export const sectionId = "hero";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Trust, built in",
  productScreenshot: {
    posterJpg: "/images/product-screenshots/conversations-graph.png",
    ariaLabel:
      "Subsights auto-summarizes conversations and highlights root causes in real time.",
  },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="space-y-8">
        <Animate name="fadeInStagger" trigger="onVisible">
          <h1 className="animate-item text-center text-4xl md:text-5xl font-semibold tracking-tight mb-8">
            {c.title}
          </h1>

          {/* <div className="animate-item">
            <ProductScreenshot {...c.productScreenshot} />
          </div> */}
        </Animate>
      </div>
    </section>
  );
}

// Inline component for the product vignette
function ProductScreenshot(props: {
  posterJpg: string;
  ariaLabel: string;
}) {
  const { posterJpg, ariaLabel } = props;

  return (
    <figure aria-label={ariaLabel} className="block">
      {/* 3D stage (perspective lives on the parent) */}
      <div className="relative mx-auto max-w-5xl [perspective:1600px]">
        <div
          className="
            relative z-[1] isolate overflow-hidden rounded-xl shadow-2xl
            ring-1 ring-black/5 dark:ring-white/5 origin-top will-change-[transform]
            tilt-3d hover:rotate-y-[-24deg] hover:rotate-x-[9deg] hover:rotate-z-[4deg] hover:translate-y-[5%] hover:scale-[0.96]
            transition-transform duration-600 ease-in-out
            shadow-white/75
          "
        >
          <Image
            src={posterJpg}
            alt={ariaLabel}
            width={1600}
            height={900}
            priority
            className="block w-full backface-hidden"
          />
        </div>
      </div>
    </figure>
  );
}
