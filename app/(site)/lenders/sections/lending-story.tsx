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
        'Ask about the property location, loan purpose and experience before explaining the published programs that fit those details.',
      nextStep:
        'Open the lender’s existing application or the approved loan officer contact, carrying the visitor’s stated project into the conversation.',
      limit:
        'The lending team confirms current terms, eligibility and underwriting. A program description is not an approval.',
    },
    {
      question: 'I already have a loan. How do I get a payoff statement?',
      response:
        'Recognize an existing borrower and explain the approved payoff request process, rather than starting a new loan enquiry.',
      nextStep:
        'Use the published servicing or payoff request route, with its required details and stated response process.',
      limit:
        'The assistant does not retrieve a loan balance, issue a payoff statement or claim a request was sent.',
    },
    {
      question: 'Can you tell my contractor what is happening with my loan?',
      response:
        'Distinguish a third-party request from a borrower’s general program question. Avoid disclosing account or deal details.',
      nextStep:
        'Direct the visitor to the authorized team contact for an identity and permission check.',
      limit:
        'The CRM and lending team remain responsible for permission, private deal status and any disclosure.',
    },
  ],
  comparison: {
    heading: 'Keep the application. Improve the conversation before it.',
    existing:
      'A clear program page, FAQ and application form work well when a borrower knows what they need.',
    assistant:
      'A conversation can distinguish a new project from servicing, retain location and loan purpose, and help the visitor choose the right existing route.',
    retained:
      'Your application, CRM and servicing process remain the records of the deal. Live status, document collection and CRM writes require an agreed connection.',
  },
  proof: {
    linkLabel: 'Read the lending example',
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
