import {
  IndustryStory,
  type IndustryStoryCopy,
} from '@/components/ui/industry-story';

type Copy = IndustryStoryCopy;
export const sectionId = 'chamber-story';

// ---- SECTION COPY REGION ----
const copy = {
  industry: 'chambers',
  eyebrow: 'For chambers of commerce and business associations',
  heading: 'Help members find their next step.',
  description:
    'A website assistant that feels like part of your Chamber. Help prospective members understand the value of joining, existing members find the right resource, and visitors discover events and local businesses. We handle setup with your team, match your brand and improve the answers as we learn.',
  exampleHeading: 'One website. Different reasons to visit.',
  examples: [
    {
      question: 'I am opening a business. Is membership worth it for me?',
      response:
        'Understand their goals and budget, compare your published benefits and explain the next step. An existing member gets help with their membership, rather than another sales pitch.',
    },
    {
      question: 'Can I attend a lunch before joining?',
      response:
        'Find the relevant event, preserve its date and eligibility rules, and link the official registration or contact route. Ask about a guest exception without promising one.',
    },
    {
      question: 'Who in the directory could help with my project?',
      response:
        'Narrow the options around what the visitor needs and share the relevant business profiles. Confirm details from your content instead of guessing services or availability.',
    },
  ],
  proof: {
    label: 'Experience serving a community online',
    title: 'Sunny at Visit Sun Valley',
    description:
      'Visit Sun Valley uses Subsights to help people explore its destination. That work informs our approach to local discovery, useful follow-up questions and linking people to the right resource.',
    href: '/case-studies/visit-sun-valley',
  },
  learning: {
    title: 'Hear the question behind the click.',
    description:
      'Learn which benefits prospective members ask about, which event rules confuse people and which resources existing members struggle to find. Review the conversations behind those patterns, then use what you learn to improve the website, programming and member experience.',
  },
  boundaries: [
    {
      title: 'An experience that fits your organization',
      description:
        'Agree on tone, appearance, useful questions and approved next steps with our founding team. We test realistic conversations, including corrections, follow-ups and questions the assistant cannot answer.',
    },
    {
      title: 'Calendar information that stays useful',
      description:
        'Connect a supported calendar feed for event lookup, with a refresh process agreed during setup. Other event systems need a compatibility check. Registration, ticket availability and member eligibility stay with your official systems.',
    },
    {
      title: 'Reports your team can use',
      description:
        'Daily, weekly and monthly report options bring conversation activity and questions to selected recipients. Choose a useful cadence during setup, and turn recurring questions into better content. Open the underlying conversations to understand the context behind each trend.',
    },
    {
      title: 'Follow-up with the right context',
      description:
        'Help visitors get the information they need in the conversation. When someone wants a follow-up, configured lead collection and forwarding can send their contact details and a conversation summary to agreed recipients. Keep the relevant contact page or phone number easy to find.',
    },
  ],
  cta: 'Bring a question your members ask every week.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ChamberStory() {
  return <IndustryStory copy={copy} />;
}
