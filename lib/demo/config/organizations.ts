import 'server-only';
import type { ProspectDemo } from './prospects';

// Public source content only. Bot capabilities are supplied after native access verification.
export const ORGANIZATION_DEMOS: ProspectDemo[] = [
  {
    "slug": "wmba",
    "label": "Washington Mortgage Bankers Association",
    "url": "https://wa-mba.org/",
    "headline": "The right event, membership and next step.",
    "description": "Keep your event and role together as you find WMBA programs, education and member services.",
    "questions": [
      "What is the December 1 Income Property luncheon?",
      "Can I register for the January 14 luncheon?",
      "Who chairs the Income Property committee?",
      "Where can a member update contact information?"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Applications, payments, calendar imports and member updates stay in WMBA’s own systems.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the event, your role or another detail."
      }
    ],
    "sources": [
      {
        "label": "December",
        "url": "https://wa-mba.org/all-events/ip-luncheon-december-2026/?occurrence=2026-12-01"
      },
      {
        "label": "January",
        "url": "https://wa-mba.org/all-events/ip-luncheon-january-2027/?occurrence=2027-01-14"
      },
      {
        "label": "Committees",
        "url": "https://wa-mba.org/committees/"
      },
      {
        "label": "Membership",
        "url": "https://wa-mba.org/membership/"
      },
      {
        "label": "Members",
        "url": "https://wa-mba.org/wmba-members/"
      },
      {
        "label": "Education",
        "url": "https://wa-mba.org/education-2/"
      },
      {
        "label": "Member update",
        "url": "https://ami.jotform.com/262355556572969"
      },
      {
        "label": "Application",
        "url": "https://wa-mba.org/become-a-member/"
      },
      {
        "label": "December form",
        "url": "https://ami.jotform.com/263134523756963"
      },
      {
        "label": "December calendar export",
        "url": "https://wa-mba.org/?method=ical&id=8035&occurrence=2026-12-01"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "December 1 luncheon",
        "text": "World Cup impact at Perkins Coie and on Zoom. Registration is closed; ask WMBA about any exception.",
        "href": "https://wa-mba.org/all-events/ip-luncheon-december-2026/?occurrence=2026-12-01",
        "action": "Event details"
      },
      {
        "name": "January 14 luncheon",
        "text": "Check the January page and organizer for unsettled time, venue and registration details.",
        "href": "https://wa-mba.org/all-events/ip-luncheon-january-2027/?occurrence=2027-01-14",
        "action": "January details"
      },
      {
        "name": "Committees",
        "text": "Find the current chair for the committee you need.",
        "href": "https://wa-mba.org/committees/",
        "action": "Find a committee"
      },
      {
        "name": "Education",
        "text": "Explore Lunch & Learns, the past-offerings library and MBA courses.",
        "href": "https://wa-mba.org/education-2/",
        "action": "Explore education"
      },
      {
        "name": "Membership",
        "text": "Compare General and Associate membership. Board approval comes before dues payment.",
        "href": "https://wa-mba.org/become-a-member/",
        "action": "View application"
      },
      {
        "name": "Member information",
        "text": "Update contact details in WMBA’s existing form.",
        "href": "https://ami.jotform.com/262355556572969",
        "action": "Open update form"
      }
    ],
    "toolsComingSoon": "Coming soon: connected member-account help once WMBA authorizes access."
  },
  {
    slug: 'rhawa',
    label: 'RHAWA',
    url: 'https://www.rhawa.org',
    headline: 'Find the right course, form or member service.',
    description:
      'Keep your role and question together as you find RHAWA education, current forms, vendors and screening.',
    questions: [
      'What Academy access do property managers get?',
      'Where is the current multi-family term lease?',
      'Find a plumber in Snohomish County',
      'How much is screening per adult?',
    ],
    scope:
      'Selected official public pages checked November 25, 2026. Member access, documents, screening and payments stay in RHAWA’s own systems.',
    entry: [
      {
        label: 'Try it',
        text: 'Ask a question, then change your role or ask for the next step.',
      },
    ],
    sources: [
      {
        label: 'Past Atlas event',
        url: 'https://www.rhawa.org/past-event',
      },
      {
        label: 'Academy access and courses',
        url: 'https://www.rhawa.org/academy',
      },
      {
        label: 'Rental forms and instructions',
        url: 'https://www.rhawa.org/rental-forms-leases-notices',
      },
      {
        label: 'Vendor directory',
        url: 'https://www.rhawa.org/vendor-directory',
      },
      {
        label: 'Screening information',
        url: 'https://www.rhawa.org/screening',
      },
      {
        label: 'Membership categories',
        url: 'https://www.rhawa.org/membership-information',
      },
      {
        label: 'Contact and support',
        url: 'https://www.rhawa.org/contact-us',
      },
    ],
    accent: '#1f2937',
    widgetUrl: '',
    teamView: [],
    tools: [
      {
        name: 'Education calendar',
        text: 'Choose a current class rather than a past event.',
        href: 'https://www.rhawa.org/events/education',
        action: 'Find classes',
      },
      {
        name: 'Academy',
        text: 'Compare role-specific courses, subscriptions and access help.',
        href: 'https://www.rhawa.org/academy',
        action: 'Explore courses',
      },
      {
        name: 'Current rental forms',
        text: 'Find the named lease and its published revision before opening the member file.',
        href: 'https://www.rhawa.org/rental-forms-leases-notices',
        action: 'Open library',
      },
      {
        name: 'Vendor directory',
        text: 'Choose your county and expertise, then contact an actual result.',
        href: 'https://www.rhawa.org/vendor-directory',
        action: 'Search vendors',
      },
      {
        name: 'Screening',
        text: 'Review published fees and use the member entry into Intellirent.',
        href: 'https://www.rhawa.org/screening',
        action: 'Open screening',
      },
      {
        name: 'Membership',
        text: 'Confirm your category and conflicting dues with the membership specialist.',
        href: 'https://www.rhawa.org/membership-information',
        action: 'Compare categories',
      },
    ],
    toolsComingSoon:
      'Coming soon: connected member-account help once RHAWA authorizes access.',
  },
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
