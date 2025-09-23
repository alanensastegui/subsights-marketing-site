import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import ValueProp from "./sections/value-prop";
import HowItWorks from "./sections/how-it-works";
import HandsOnSupport from "./sections/hands-on-support";
import CallToAction from "./sections/call-to-action";

const AnalyticsFeaturePage = () => {
  const Sections = [Hero, VideoDemo, ValueProp, HowItWorks, HandsOnSupport, CallToAction];

  return (
    <main className="min-h-screen">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}

export default AnalyticsFeaturePage;


