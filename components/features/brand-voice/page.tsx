import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import CallToAction from "./sections/call-to-action";

export default function BrandPage() {
  // Custom page layout for brand feature
  const Sections = [
    Hero,
    VideoDemo,
    CallToAction,
  ];

  return (
    <main className="min-h-screen">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
