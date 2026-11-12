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
    'A website assistant that feels like part of your Chamber. Prospective members can explore the value of joining, existing members can find useful resources, and visitors can discover local events and businesses. We handle setup with your team and improve the experience as we learn.',
  exampleHeading: 'One website. Different reasons to visit.',
  examples: [
    {
      question:
        'I run a new business with a small budget. Is membership useful for me?',
      response:
        'Published benefits and prices put membership in the context of what the owner needs, from local introductions to promotion.',
      nextStep:
        'The relevant membership options and a person to discuss fit. Existing members get help using their membership.',
    },
    {
      question:
        'Can a non-member come to next month’s lunch, and what does it cost?',
      response:
        'The exact event’s date, published guest rules and price, drawn from your connected calendar.',
      nextStep:
        'The official registration page for places and payment, or your event team when guest eligibility needs clarification.',
    },
    {
      question:
        'I need someone local for a small business project. Who should I contact?',
      response:
        'Relevant member profiles from your connected directory, narrowed by the service and location the visitor needs.',
      nextStep:
        'A business profile and its published contact details to discuss the project and availability.',
    },
  ],
  comparison: {
    heading: 'Make your member website easier to use.',
    existing:
      'Your directory, calendar, FAQ and membership form are useful when people know where to look.',
    assistant:
      'One conversation can connect benefits, events and local businesses around a visitor’s needs, including follow-up questions.',
  },
  proof: {
    linkLabel: 'Read the destination example',
    label: 'Experience serving a community online',
    title: 'Sunny at Visit Sun Valley',
    description:
      'Visit Sun Valley uses Subsights to help people explore its destination. That work informs our approach to local discovery and useful follow-up questions.',
    href: '/case-studies/visit-sun-valley',
  },
  learning: {
    title: 'Hear the question behind the click.',
    description:
      'See which benefits prospective members ask about, which event rules confuse people and which resources members struggle to find. Those conversations can inform your website, programming and member experience.',
  },
  boundaries: [
    {
      title: 'An experience that fits your organization',
      description:
        'Your brand, tone, sources and priorities shape the assistant. Setup includes realistic member questions and the next steps your team wants to support.',
    },
    {
      title: 'Events with a clear next step',
      description:
        'A supported calendar feed brings dated events into the conversation. Registration, payment and membership changes continue through your official services.',
    },
    {
      title: 'Reports your team can use',
      description:
        'Your team can choose recipients and available report schedules, then explore the conversations behind the trends.',
    },
    {
      title: 'Follow-up with useful context',
      description:
        'Visitors can leave contact details for a follow-up. We agree on the handoff with your team, alongside your existing phone and contact routes.',
    },
  ],
  cta: 'Bring a question your members ask every week.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function ChamberStory() {
  return <IndustryStory copy={copy} />;
}
