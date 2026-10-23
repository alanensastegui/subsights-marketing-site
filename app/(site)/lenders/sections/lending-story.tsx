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
      question: 'Do you fund fix-and-flips in my area?',
      response:
        "Explain the lender's published service area and programs. Ask where the property is and what the borrower plans to do.",
    },
    {
      question: 'What do you need to look at my project?',
      response:
        'Use your approved requirements to guide the visitor to the right application, document checklist or contact.',
    },
    {
      question: 'Can I speak with someone about my deal?',
      response:
        'Direct the visitor to your team through the contact and application paths you approve.',
    },
  ],
  proof: {
    label: 'A working customer example',
    title: 'Penny at Intrust Funding',
    description:
      "Intrust Funding uses Subsights for its website assistant, Penny. The implementation focuses on the lender's Washington real estate investor programs, common borrower questions and the next step to reach the team.",
    href: '/case-studies/intrust-funding',
  },
  learning: {
    title: 'Hear what borrowers are trying to understand.',
    description:
      'Review questions about service areas, loan purpose, program fit and application requirements. Find confusing website content and useful topics for your next update.',
  },
  boundaries: [
    {
      title: 'Information, with clear limits',
      description:
        'Your lending team owns underwriting, current terms and credit decisions. We agree on what the assistant can explain and which questions go to a person.',
    },
    {
      title: 'Connect the systems that matter',
      description:
        'Start with your website and existing application links. CRM updates, live deal status and other system actions need a separately agreed integration.',
    },
  ],
  cta: 'Bring a question your loan officers hear every week.',
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function LendingStory() {
  return <IndustryStory copy={copy} />;
}
