import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import HowItWorks from "./sections/how-it-works";
import CallToAction from "./sections/call-to-action";

export default function KnowledgeBasePage() {
  // Custom page layout for knowledge base feature
  const Sections = [
    Hero,
    VideoDemo,
    HowItWorks,
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
