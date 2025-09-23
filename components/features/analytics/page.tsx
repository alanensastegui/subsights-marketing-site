import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import ValueProp from "./sections/value-prop";
import HowItWorks from "./sections/how-it-works";
import AnalyticsOnRamp from "./sections/analytics-on-ramp";
import CallToAction from "./sections/call-to-action";

const AnalyticsFeaturePage = () => {
  const Sections = [Hero, VideoDemo, ValueProp, HowItWorks, AnalyticsOnRamp, CallToAction];

  return (
    <main className="min-h-screen">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}

export default AnalyticsFeaturePage;


