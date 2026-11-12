import {
  IndustryStory,
  type IndustryStoryCopy,
} from '@/components/ui/industry-story';

type Copy = IndustryStoryCopy;
export const sectionId = 'lending-story';

// ---- SECTION COPY REGION ----
const copy = {
  industry: 'lenders',
  eyebrow: 'For private and hard money lenders',
  heading: 'Help the right borrowers take the next step.',
  description:
    'Visitors arrive with a project, a timeline and questions about whether you can help. Give them a website assistant that explains your programs, asks about fit and points them toward your lending team.',
  exampleHeading: 'Make the first conversation useful.',
  examples: [
    {
      question:
        'I am buying my first investment property. Which program should I look at?',
      response:
        'Published program details become easier to compare around the property’s location, loan purpose and the borrower’s experience.',
      nextStep:
        'Your existing application or loan officer contact. Your lending team confirms current terms, eligibility and approval.',
    },
    {
      question: 'I already have a loan. How do I get a payoff statement?',
      response:
        'An existing borrower gets the published payoff request process and the details needed to start it.',
      nextStep:
        'Your servicing or payoff request route, where the authorized team can provide the statement.',
    },
    {
      question: 'Can you tell my contractor what is happening with my loan?',
      response:
        'The visitor gets a clear route for an authorized status request, with private deal details kept out of the chat.',
      nextStep:
        'Your team’s identity and permission check before any account information is shared.',
    },
  ],
  comparison: {
    heading: 'A useful conversation before the application.',
    existing:
      'Program pages, FAQs and an application form work well when a borrower knows what they need.',
    assistant:
      'A conversation helps distinguish a new project from servicing, carries the borrower’s criteria through follow-ups and points them to the appropriate route.',
  },
  proof: {
    linkLabel: 'Read the lending example',
    label: 'A working customer example',
    title: 'Penny at Intrust Funding',
    description:
      'Intrust Funding uses Subsights for its website assistant, Penny. The implementation focuses on the lender’s Washington real estate investor programs, common borrower questions and reaching the right team.',
    href: '/case-studies/intrust-funding',
  },
  learning: {
    title: 'Hear what borrowers are trying to understand.',
    description:
      'Questions about service areas, program fit and application requirements reveal confusing content and useful topics for your next website update.',
  },
  boundaries: [
    {
      title: 'Guidance that leads to your lending team',
      description:
        'Your published information helps borrowers prepare. Underwriting, account balances, payoff statements and credit decisions stay with your authorized team.',
    },
    {
      title: 'Connections around your workflow',
      description:
        'Website content and existing application links are the starting point. Live deal status, document collection and CRM updates can be scoped as separate integrations.',
    },
  ],
  cta: 'Bring a question your loan officers hear every week.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function LendingStory() {
  return <IndustryStory copy={copy} />;
}
