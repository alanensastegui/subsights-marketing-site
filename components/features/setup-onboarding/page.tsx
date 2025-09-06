import Placeholder from "./sections/placeholder";

const EffortlessSetupOnboardingPage = () => {
  // Custom page layout for setup & onboarding feature
  const Sections = [
    Placeholder,
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