import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import HowItWorks from "./sections/how-it-works";
import ValueProp from "./sections/value-prop";
import CallToAction from "./sections/call-to-action";

const IntegrationsFeaturePage = () => {
  const Sections = [
    Hero,
    VideoDemo,
    ValueProp,
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

export default IntegrationsFeaturePage;
