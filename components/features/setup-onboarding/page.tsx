import Hero from "./sections/hero";
import VideoDemo from "./sections/video-demo";
import HowItWorks from "./sections/how-it-works";
import CallToAction from "./sections/call-to-action";

const EffortlessSetupOnboardingPage = () => {
  // Custom page layout for setup & onboarding feature
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

export default EffortlessSetupOnboardingPage;