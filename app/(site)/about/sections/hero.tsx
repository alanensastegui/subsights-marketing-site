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
  title: "Subsights is bringing clarity back to customer conversations",
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
    <section className="mx-auto max-w-6xl px-6 py-20">
      <Animate name="fadeIn" trigger="onVisible">
        <h1 className="text-center text-4xl md:text-6xl font-semibold tracking-tight">
          {c.title}
        </h1>
      </Animate>

      <Animate name="zoomIn" trigger="onVisible">
        <div className="mt-10">
          <ProductScreenshot {...c.productScreenshot} />
        </div>
      </Animate>
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
            tilt-3d shadow-white/75
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
