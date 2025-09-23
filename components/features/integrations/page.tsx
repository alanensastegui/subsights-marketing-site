import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import HowItWorks from "./sections/how-it-works";
import ValueProp from "./sections/value-prop";
import CallToAction from "./sections/call-to-action";
import FastPath from "./sections/fast-path";

const IntegrationsFeaturePage = () => {
  const Sections = [
    Hero,
    VideoDemo,
    ValueProp,
    HowItWorks,
    FastPath,
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
