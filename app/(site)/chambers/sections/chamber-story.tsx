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
      question:
        'I run a new business with a small budget. Is membership useful for me?',
      response:
        'Ask what the owner needs: local introductions, promotion, advocacy or events. Compare those goals with the published membership benefits and prices.',
      nextStep:
        'Link the relevant membership information or the team member who can discuss fit. Help an existing member with their account instead of selling membership again.',
      limit:
        'Do not invent a discount, return on membership or a benefit that is not included in that tier.',
    },
    {
      question:
        'Can a non-member come to next month’s lunch, and what does it cost?',
      response:
        'Look up the relevant dated event when a compatible calendar is connected, then preserve its published guest rules, price and registration link.',
      nextStep:
        'Open the official event registration page. If guest eligibility is unclear, give the event team’s approved contact.',
      limit:
        'The event platform confirms remaining places, registration and payment. An exception for a guest needs the Chamber’s decision.',
    },
    {
      question:
        'I need someone local for a small business project. Who should I contact?',
      response:
        'Clarify the service, location and other constraints, then use the connected member directory to find relevant profiles.',
      nextStep:
        'Offer the business profile and its published contact route, retaining the visitor’s constraints when they refine the question.',
      limit:
        'Directory coverage and supported search are checked during setup. A listing is not a referral, endorsement or confirmation of availability.',
    },
  ],
  comparison: {
    heading: 'Work with your member website and event platform.',
    existing:
      'Your directory, event calendar, FAQ and membership form already handle direct lookups and transactions.',
    assistant:
      'A conversation helps when a visitor does not know the right category, needs to compare benefits, or asks a follow-up that crosses several pages.',
    retained:
      'The Chamber’s member system owns membership records, renewals and permissions. Your event platform owns registration and payment; a chat reply does not complete either.',
  },
  proof: {
    linkLabel: 'Read the destination example',
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
        'Choose from the report schedules available for your account and select the recipients during setup. Review the underlying conversations before acting on a trend. Confirm the first delivery with your team; a saved schedule alone does not show that a report arrived.',
    },
    {
      title: 'Follow-up with the right context',
      description:
        'Choose the contact details to request and the recipients for visitors who want a follow-up. We check the lead notification path during setup. Your contact page and phone number remain available; a chat reply must not claim that someone was notified without a delivery result.',
    },
  ],
  cta: 'Bring a question your members ask every week.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ChamberStory() {
  return <IndustryStory copy={copy} />;
}
