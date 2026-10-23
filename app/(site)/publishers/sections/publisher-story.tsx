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
  exampleHeading: 'Understand the need before recommending the next step.',
  examples: [
    {
      question: "I'm changing careers. Where do I start?",
      response:
        "Ask about the reader's goal and starting point. Explain relevant options using the publisher's content.",
    },
    {
      question: 'Which of these programs fits my situation?',
      response:
        'Clarify the criteria that matter before sharing an approved partner or program link. Identify what still needs to be checked with the provider.',
    },
    {
      question: 'Do you have anything that fits my location?',
      response:
        "Use available, approved information. When there isn't a suitable match, explain the gap and offer a useful next step.",
    },
  ],
  proof: {
    label: 'A past implementation',
    title: 'Guided discovery for All Allied Health Schools',
    description:
      'Our work with All Star Directories connected educational content and approved affiliate links in conversation. That experience informs how we design discovery for publishers and directories today.',
    href: '/case-studies/all-allied-health-schools',
  },
  learning: {
    title: 'Learn where readers get stuck.',
    description:
      'Conversation and link-click reporting helps reveal what people are looking for, which options they ask about and where your content needs a better answer.',
  },
  boundaries: [
    {
      title: 'Preserve the approved path',
      description:
        'Use the destination URLs and tracking parameters you provide. Live catalog availability, eligibility checks and catalog integrations need a separately agreed scope.',
    },
    {
      title: 'Measure beyond the click',
      description:
        'Subsights can show conversations and link engagement. Accepted leads, applications, enrollments and revenue need data from your own downstream systems.',
    },
  ],
  cta: 'Bring a page where readers struggle to choose.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function PublisherStory() {
  return <IndustryStory copy={copy} />;
}
