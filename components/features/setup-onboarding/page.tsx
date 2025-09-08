import Hero from "./sections/hero";
import QuickSetup from "./sections/value-prop";
import VideoDemo from "./sections/video-demo";
import HowItWorks from "./sections/how-it-works";
import BuiltToBeSimple from "./sections/built-to-be-simple";
import CallToAction from "./sections/call-to-action";

const EffortlessSetupOnboardingPage = () => {
  // Custom page layout for setup & onboarding feature
  const Sections = [
    Hero,
    VideoDemo,
    QuickSetup,
    HowItWorks,
    BuiltToBeSimple,
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

export default EffortlessSetupOnboardingPage;