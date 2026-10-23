// Public widget embed URLs only. Platform session credentials never belong here.
export type ProspectDemo = {
  slug: string;
  label: string;
  url: string;
  headline: string;
  description: string;
  questions: string[];
  scope: string;
  sources: { label: string; url: string }[];
  accent: string;
  widgetUrl: string;
  industryHref?: string;
  teamView?: { question: string; insight: string }[];
};

export const PROSPECT_DEMOS: ProspectDemo[] = [
  {
    slug: 'kirkland-chamber',
    label: 'Kirkland Chamber of Commerce',
    url: 'https://www.kirklandchamber.org/',
    headline: 'A helpful first conversation with the Chamber.',
    description:
      'Explore membership, find an event or discover a local business. Ask a follow-up and see how the assistant keeps track of what matters to you.',
    questions: [
      'I am opening a design studio and want a ribbon cutting. Which membership fits a $900 annual budget?',
      'Could I attend the November 5 lunch before joining?',
      'I am already a member and our directory address is wrong. What should I do?',
    ],
    scope:
      'Membership, public directory and October–November 2026 event information, refreshed manually. Check current event details on the official calendar. This preview cannot register visitors, change member records or notify Chamber staff. Calendar sync, report emails and lead forwarding are not connected in this preview.',
    sources: [
      {
        label: 'Membership benefits',
        url: 'https://www.kirklandchamber.org/join-kirkland-chamber',
      },
      {
        label: 'Official events calendar',
        url: 'https://www.kirklandchamber.org/events',
      },
      {
        label: 'Public business directory',
        url: 'https://www.kirklandchamber.org/directory',
      },
      {
        label: 'Chamber contact',
        url: 'https://www.kirklandchamber.org/contact',
      },
    ],
    accent: '#155E75',
    widgetUrl:
      'https://widget.subsights.com/?api_key=a6hGMAbp2dSTwGAILaHkafFwTju6zm5H&workspace_id=0XvceSLk1j',
    industryHref: '/chambers',
    teamView: [
      {
        question: 'Which membership includes a ribbon cutting?',
        insight:
          'Membership interest: make the benefit comparison easy to find.',
      },
      {
        question: 'Can I try an event before joining?',
        insight:
          'Event eligibility: clarify guest guidance beside registration.',
      },
      {
        question: 'Our directory address is wrong.',
        insight:
          'Member support: make the published update/contact route clearer.',
      },
    ],
  },
  {
    slug: 'visit-kitsap-peninsula',
    label: 'Visit Kitsap Peninsula',
    headline: 'A ferry ride. A few questions. A better day out.',
    description:
      'Help visitors turn Kitsap’s itineraries into a trip that fits their interests, timing and transport.',
    questions: [
      'What can I do in Bremerton without a car?',
      'What can I explore on foot on Bainbridge?',
      'Help me plan a day in Poulsbo.',
    ],
    scope:
      'A first preview of trip planning from selected public itineraries. Ferry departures, opening hours, accessibility details and reservations need confirmation with the official operator.',
    sources: [
      {
        label: 'Bremerton itinerary',
        url: 'https://visitkitsap.com/itineraries/one-more-night-in-bremerton/',
      },
      {
        label: 'Bainbridge day trip',
        url: 'https://visitkitsap.com/itineraries/bainbridge-island-day-trip-itinerary/',
      },
      {
        label: 'All Kitsap itineraries',
        url: 'https://visitkitsap.com/itineraries/',
      },
    ],
    accent: '#006AB4',
    widgetUrl:
      'https://widget.subsights.com/?api_key=Fz3nZgAkChEXuncy7Z4KIl9O8eTfM3Y7&workspace_id=0XvceSLk1j',
    url: 'https://visitkitsap.com/itineraries/one-more-night-in-bremerton/',
  },
  {
    slug: 'cascara-capital',
    label: 'Cascara Capital',
    headline: 'Help a borrower find their next step.',
    description:
      'Explain published loan programs, ask a useful question and point visitors toward the right page or person.',
    questions: [
      'What loan is for a property I renovate and sell?',
      'Bridge or ground-up construction: what differs?',
      'How can I talk to someone about my project?',
    ],
    scope:
      'Program information and links from public pages. This preview cannot quote a rate, decide eligibility, approve a loan, review an application or confirm funding dates.',
    sources: [
      {
        label: 'Loan programs',
        url: 'https://cascaracapital.com/loan-programs/',
      },
      {
        label: 'Fix and flip',
        url: 'https://cascaracapital.com/fix-and-flip-loans/',
      },
      {
        label: 'Talk to Cascara',
        url: 'https://cascaracapital.com/contact-us/',
      },
    ],
    accent: '#002144',
    widgetUrl:
      'https://widget.subsights.com/?api_key=0oaBrAQl00GvbtUAzN1W3bZJtE1JZNZW&workspace_id=0XvceSLk1j',
    url: 'https://cascaracapital.com/loan-programs/',
  },
  {
    slug: 'onlineu',
    label: 'OnlineU',
    headline: 'The right program starts with the right question.',
    description:
      'Guide readers toward a relevant education path, with links back to OnlineU’s research and program pages.',
    questions: [
      'I’m an RN with an ADN. Where should I start?',
      'I’m not a nurse. Can I use an RN-to-BSN?',
      'What should I check before choosing a program?',
    ],
    scope:
      'A focused nursing discovery preview using selected public guides. School admissions, state authorization, licensure, clinical placements and current tuition must be confirmed with each school. Advertising and referral links follow OnlineU’s published disclosures.',
    sources: [
      {
        label: 'Nursing guide',
        url: 'https://www.onlineu.com/degrees/nursing',
      },
      {
        label: 'RN-to-BSN programs',
        url: 'https://www.onlineu.com/degrees/rn-to-bsn',
      },
      {
        label: 'About OnlineU and advertising',
        url: 'https://www.onlineu.com/about',
      },
    ],
    accent: '#0B60BE',
    widgetUrl:
      'https://widget.subsights.com/?api_key=2pTsOd3Uo0BDw5eKVvpPrYWIj76hw85x&workspace_id=0XvceSLk1j',
    url: 'https://www.onlineu.com/degrees/nursing',
  },
];

export const getProspectDemo = (slug: string) =>
  PROSPECT_DEMOS.find((demo) => demo.slug === slug) ?? null;
