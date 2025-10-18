import Hero from './sections/hero';
import VideoDemo from './sections/video-demo';
import ValueProp from './sections/value-prop';
import HowItWorks from './sections/how-it-works';
import CommittedToQuality from './sections/committed-to-quality';
import CallToAction from './sections/call-to-action';

const ConversationsFeaturePage = () => {
  const Sections = [
    Hero,
    VideoDemo,
    ValueProp,
    HowItWorks,
    CommittedToQuality,
    CallToAction,
  ];

  return (
    <main className="min-h-screen">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
};

export default ConversationsFeaturePage;
