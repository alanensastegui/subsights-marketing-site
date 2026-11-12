import {
  IndustryStory,
  type IndustryStoryCopy,
} from '@/components/ui/industry-story';

type Copy = IndustryStoryCopy;
export const sectionId = 'publisher-story';

// ---- SECTION COPY REGION ----
const copy = {
  industry: 'publishers',
  eyebrow: 'For publishers, directories and affiliate websites',
  heading: 'A better path from a question to the right link.',
  description:
    'Help readers choose their next step. Build a conversational guide around your content and approved partner links, with fit at the center of the experience.',
  exampleHeading: 'Help readers find the option that fits.',
  examples: [
    {
      question:
        'I want to change careers, but I need an online option around work.',
      response:
        'Relevant guides and program options narrowed around the reader’s goal, education, location and schedule.',
      nextStep:
        'Your approved guide or partner page, with its tracking link preserved.',
    },
    {
      question: 'Does this program qualify me to work in my state?',
      response:
        'The program’s published state requirements, with any qualification that still needs confirmation made clear.',
      nextStep:
        'The provider or licensing authority’s official requirements before the reader applies.',
    },
    {
      question: 'Which of these options fits my budget and prerequisites?',
      response:
        'A comparison of the costs and entry criteria covered in your content, shaped around the reader’s constraints.',
      nextStep:
        'The approved provider enquiry or application page for current tuition, prerequisites and availability.',
    },
  ],
  comparison: {
    heading: 'Put your editorial work into the conversation.',
    existing:
      'Comparison pages, filters and partner links help readers who already know which criteria matter.',
    assistant:
      'A conversation uncovers additional needs and connects answers across your guides, helping readers choose a useful next step.',
  },
  proof: {
    linkLabel: 'Read the past implementation',
    label: 'A past implementation',
    title: 'Guided discovery for All Allied Health Schools',
    description:
      'Our work with All Star Directories connected educational content and approved affiliate links in conversation. That experience informs how we design discovery for publishers and directories today.',
    href: '/case-studies/all-allied-health-schools',
  },
  learning: {
    title: 'Learn where readers get stuck.',
    description:
      'Conversation and link-click reporting can reveal the options people ask about and where your content needs a better answer.',
  },
  boundaries: [
    {
      title: 'Your approved content and partner links',
      description:
        'Your editorial sources guide recommendations. Official providers confirm admission, licensing eligibility and current availability. Live catalogs and eligibility checks can be scoped separately.',
    },
    {
      title: 'A clear view of engagement',
      description:
        'Subsights shows conversations and link engagement. Measuring accepted leads, applications, enrollments or revenue takes data from your downstream systems.',
    },
  ],
  cta: 'Bring a page where readers struggle to choose.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function PublisherStory() {
  return <IndustryStory copy={copy} />;
}
