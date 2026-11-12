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
      question:
        'I want to change careers, but I need an online option around work.',
      response:
        'Ask about the reader’s goal, prior education, location and schedule before narrowing the options in your approved content.',
      nextStep:
        'Link the relevant guide or approved program page, keeping any partner tracking parameters intact.',
      limit:
        'A broad career match does not establish admission, cost, accreditation or professional licensing eligibility.',
    },
    {
      question: 'Does this program qualify me to work in my state?',
      response:
        'Use the published state and program information where it answers the exact question. Make any missing qualification clear.',
      nextStep:
        'Direct the reader to the provider’s official requirements or the relevant licensing authority for confirmation.',
      limit:
        'Do not turn a general program description into a state licensing guarantee or invent a suitable program when none is supported.',
    },
    {
      question: 'Which of these options fits my budget and prerequisites?',
      response:
        'Compare the criteria covered in your content, retain the reader’s constraints and explain where details are missing.',
      nextStep:
        'Open the approved provider enquiry or application route so the reader can verify current tuition, prerequisites and availability.',
      limit:
        'A link click is not an accepted lead, application, enrollment or commission. Those outcomes must come from the downstream system.',
    },
  ],
  comparison: {
    heading: 'Add guidance without replacing your editorial work.',
    existing:
      'Comparison pages, filters and approved partner links serve readers who know which criteria to use.',
    assistant:
      'A conversation can uncover a missing constraint, connect answers across guides and help a reader choose which official detail to verify next.',
    retained:
      'Your content remains the editorial source. Partner catalogs and admissions systems own current availability and outcomes; your CRM or affiliate platform owns conversion attribution.',
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
