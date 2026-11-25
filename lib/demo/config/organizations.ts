import 'server-only';
import type { ProspectDemo } from './prospects';

// Public source content only. Bot capabilities are supplied after native access verification.
export const ORGANIZATION_DEMOS: ProspectDemo[] = [
  {
    slug: 'bellevue',
    label: 'Bellevue Chamber',
    url: 'https://www.bellevuechamber.org/',
    headline: 'Find the right event. Keep the details straight.',
    description:
      'Choose a Chamber program, check member access, or find the native route for invoices and local services.',
    questions: [
      'Is December EBRT lunch or breakfast?',
      'Is EBRT included with Community Builder?',
      'How do I pay a member invoice?',
      'Find computer support with a special offer',
    ],
    scope:
      'Selected official public pages checked November 25, 2026. Registration, payments, member accounts and applications stay in the organization’s own systems.',
    entry: [
      {
        label: 'Try it',
        text: 'Ask a question, then change a detail or ask for the exact next step.',
      },
    ],
    sources: [
      {
        label: 'Member directory',
        url: 'https://www.bellevuechamber.org/member-directory/',
      },
      {
        label: 'Executive Business Roundtable',
        url: 'https://www.bellevuechamber.org/ebrt',
      },
      {
        label: 'Chamber events',
        url: 'https://www.bellevuechamber.org/events/chamber-events',
      },
      {
        label: 'December 8 breakfast',
        url: 'https://www.bellevuechamber.org/events/executive-business-roundtable-legislative-look-ahead',
      },
      {
        label: 'Economic forecast programs',
        url: 'https://www.bellevuechamber.org/economic-forecast-summit',
      },
      {
        label: 'Speaker-program calendar',
        url: 'https://www.bellevuechamber.org/events/speaker-program',
      },
    ],
    accent: '#1f2937',
    widgetUrl: '',
    teamView: [],
    tools: [
      {
        name: 'December 8 breakfast',
        text: '7:30–9 a.m. at Bellevue Club; confirm EBRT eligibility.',
        href: 'https://www.bellevuechamber.org/events/executive-business-roundtable-legislative-look-ahead',
        action: 'Event details',
      },
      {
        name: 'Forecast calendar',
        text: 'Find the June 17 Mid-Year Economic Forecast.',
        href: 'https://www.bellevuechamber.org/events/speaker-program',
        action: 'View calendar',
      },
      {
        name: 'Member Compass',
        text: 'Sign in to view or pay your company’s invoices.',
        href: 'https://www.bellevuechamber.org/member-compass',
        action: 'Member sign-in',
      },
      {
        name: 'Member directory',
        text: 'Use the Computer/IT Services and special-offer filters.',
        href: 'https://www.bellevuechamber.org/member-directory/',
        action: 'Search directory',
      },
    ],
    toolsComingSoon:
      'Coming soon: connected member-account help once the Chamber authorizes access.',
  },
  {
    slug: 'issaquah',
    label: 'Greater Issaquah Chamber',
    url: 'https://www.issaquahchamber.com/',
    headline: 'Your next event, business or member service.',
    description:
      'Find a local event, compare member and non-member access, or reach the right business without losing your question in the directory.',
    questions: [
      'Where is the five-chamber breakfast?',
      'Can I attend as a non-member?',
      'Find a local IT consultant',
      'How do I update our business listing?',
    ],
    scope:
      'Selected official public pages checked November 25, 2026. Registration, payments, member accounts and applications stay in the organization’s own systems.',
    entry: [
      {
        label: 'Try it',
        text: 'Ask a question, then change a detail or ask for the exact next step.',
      },
    ],
    sources: [
      {
        label: 'Salmon Days',
        url: 'https://www.salmondays.org/',
      },
      {
        label: 'IT consulting directory',
        url: 'https://business.issaquahchamber.com/list/category/it-consulting-716',
      },
      {
        label: 'Past ribbon cutting',
        url: 'https://business.issaquahchamber.com/events/details/ribbon-cutting-dickey-s-barbecue-pit-9452?calendarMonth=2026-11-01',
      },
      {
        label: 'Visitor and relocation guide',
        url: 'https://www.issaquahchamber.com/2026-visitor-relocation-guide/',
      },
      {
        label: 'Business directory',
        url: 'https://business.issaquahchamber.com/list/',
      },
      {
        label: 'Atekro member profile',
        url: 'https://business.issaquahchamber.com/list/member/atekro-11417',
      },
      {
        label: 'Visit Issaquah calendar',
        url: 'https://www.visitissaquahwa.com/calendar/',
      },
      {
        label: 'Member benefits',
        url: 'https://www.issaquahchamber.com/membership-benefits/',
      },
      {
        label: 'Encompass job posting',
        url: 'https://business.issaquahchamber.com/jobs/info/non-profit-and-social-services-certified-occupational-therapy-assistant-303',
      },
      {
        label: 'Chamber calendar',
        url: 'https://business.issaquahchamber.com/events/calendar/',
      },
      {
        label: 'Chamber home',
        url: 'https://www.issaquahchamber.com/',
      },
      {
        label: 'Job postings',
        url: 'https://business.issaquahchamber.com/jobs/',
      },
      {
        label: 'December 4 breakfast',
        url: 'https://business.issaquahchamber.com/events/details/5-chamber-breakfast-9382?calendarMonth=2026-12-01',
      },
    ],
    accent: '#1f2937',
    widgetUrl: '',
    teamView: [],
    tools: [
      {
        name: 'December 4 breakfast',
        text: 'Compare member and non-member tickets before registering.',
        href: 'https://business.issaquahchamber.com/events/details/5-chamber-breakfast-9382?calendarMonth=2026-12-01',
        action: 'Event details',
      },
      {
        name: 'Chamber calendar',
        text: 'Choose a current Chamber event.',
        href: 'https://business.issaquahchamber.com/events/calendar/',
        action: 'View calendar',
      },
      {
        name: 'Local IT support',
        text: 'Find the published provider profile and contact details.',
        href: 'https://business.issaquahchamber.com/list/member/atekro-11417',
        action: 'View Atekro',
      },
      {
        name: 'Member profile',
        text: 'Sign in to manage your business listing.',
        href: 'https://business.issaquahchamber.com/login/',
        action: 'Member sign-in',
      },
      {
        name: 'Local jobs',
        text: 'See the employer and requirements for each posting.',
        href: 'https://business.issaquahchamber.com/jobs/',
        action: 'View jobs',
      },
      {
        name: 'Visitor activities',
        text: 'Find community events through Visit Issaquah.',
        href: 'https://www.visitissaquahwa.com/calendar/',
        action: 'Explore events',
      },
    ],
    toolsComingSoon:
      'Coming soon: connected member-account help once the Chamber authorizes access.',
  },
];

export function getOrganizationDemo(
  slug: string,
  capability: string
): ProspectDemo | null {
  const demo = ORGANIZATION_DEMOS.find((item) => item.slug === slug);
  return demo && capability.trim() ? demo : null;
}
