// Public widget embed URLs only. Platform session credentials never belong here.
export type ProspectDemo = {
  slug: string;
  label: string;
  url: string;
  headline: string;
  description: string;
  questions: string[];
  scope: string;
  // Shown at the chat entry: what the preview is connected to, what it reads,
  // what is known about refresh, and what the visitor does next.
  entry?: { label: string; text: string }[];
  sources: { label: string; url: string }[];
  accent: string;
  // Optional look borrowed from the prospect's own site: heading type, a second brand color for the main
  // call to action and square corners. Never their logo; the page stays a Subsights preview.
  theme?: {
    headingFont?: 'jost';
    highlight?: string;
    highlightInk?: string;
    square?: boolean;
  };
  // The prospect's own logo, shown beside the "A Subsights preview for" label, which stays.
  logo?: { src: string; alt: string; width: number; height: number };
  // Tools a visitor can try on this page today. Each action is a working link in the page or the chat.
  tools?: { name: string; text: string; href: string; action: string }[];
  // One line for what the tools do once a real workspace is connected.
  toolsComingSoon?: string;
  // What the live assistant can do for this organization. Every `ask` is a question the live
  // preview answers today; anything not connected carries its own "Coming soon:" line.
  capabilities?: {
    title: string;
    tested?: string;
    tools: Capability[];
    habits: Capability[];
  };
  // Needs we can build for beyond this preview, with one invitation to talk it through.
  builtFor?: { title: string; text: string; ideas: { name: string; text: string }[]; invite: string };
  widgetUrl: string;
  publishedLinks?: { label: string; url: string }[];
  industryHref?: string;
  teamView: { question: string; insight: string }[];
  conversation: {
    title: string;
    turns: {
      question: string;
      answer: string;
      source: { label: string; url: string };
    }[];
    takeaway: string;
  };
};

export type Capability = { name: string; text: string; ask: string; comingSoon?: string };

export const PROSPECT_DEMOS: ProspectDemo[] = [
  {
    slug: 'forks',
    label: 'Forks Chamber of Commerce',
    url: 'https://forkswa.com/',
    headline: 'Plan your Forks visit.',
    description:
      'Ask about getting here, Forever Twilight, places to stay, or nearby beaches and rainforest. Change your timing or transport and keep the conversation going.',
    questions: [
      'I have 45 minutes in Forks and no car. What can I do?',
      'Where can I check the official Forever Twilight dates?',
      'Show me what our team would receive, then help me plan setup.',
    ],
    scope:
      'This assistant uses published Forks Chamber information and linked official visitor sources, checked October 20, 2026 (Pacific time) and refreshed by our team. It cannot book tickets or rooms or check live road conditions. Ask the chat about its current tools and connections; the team samples above are fictional illustrations.',
    sources: [
      { label: 'Forks visitor information', url: 'https://forkswa.com/' },
      { label: 'Area events', url: 'https://forkswa.com/things-to-do/area-events/' },
      { label: 'Directions and transport', url: 'https://forkswa.com/plan-your-visit/directions/' },
    ],
    accent: '#244d3c',
    widgetUrl:
      'https://widget.subsights.com/index.html?view=inline&workspace_id=0XvceSLk1j&api_key=b1l8ztD9sb5UiXu4CFnb9g1esLWJDOXR',
    teamView: [
      { question: 'What can I do with limited time and no car?',
        insight: 'Make practical transport and short-visit information easy to find.' },
      { question: 'Where are the official event dates?',
        insight: 'Keep event dates attached to their official source and year.' },
      { question: 'Can you book a room for me?',
        insight: 'Explain the available booking route without claiming live room inventory.' },
    ],
    conversation: {
      title: 'A visitor changes the plan. The assistant keeps the constraint.',
      turns: [
        { question: 'Can you help me plan a visit to Forks?',
          answer: 'Use the official visitor information to plan your visit. Your arrival date and transport will shape which ideas fit.',
          source: { label: 'Forks visitor information', url: 'https://forkswa.com/' } },
        { question: 'Actually, I only have 45 minutes and no car.',
          answer: 'Keep the plan focused on Forks itself. A beach or rainforest trip needs transport and more time; I would not add one to this short stop.',
          source: { label: 'Forks visitor information', url: 'https://forkswa.com/' } },
        { question: 'Can you book the rest of my trip?',
          answer: 'This preview cannot book rooms or tickets. Check the official visitor information for the available routes.',
          source: { label: 'Forks visitor information', url: 'https://forkswa.com/' } },
      ],
      takeaway:
        'This written example shows why a changed time or transport constraint needs to carry into the next answer. Try your own conversation in the live assistant above.',
    },
  },

  {
    slug: 'kirkland-chamber',
    label: 'Kirkland Chamber of Commerce',
    url: 'https://www.kirklandchamber.org/',
    headline: 'A helpful first conversation with the Chamber.',
    description:
      'Explore membership, find an event or discover a local business. Ask a follow-up and see how the assistant keeps track of what matters to you.',
    questions: [
      'Which membership fits a $900 annual budget for a design studio that wants a ribbon cutting?',
      'I’m not a member yet. What’s the next networking event I can attend?',
      'What does a table at the Chamber gala cost?',
      '¿Cuál es el próximo evento de networking?',
      'Can I get Kathryn Straub’s cell number?',
    ],
    scope:
      'Answers use selected public membership and directory pages and an imported Chamber events calendar. They do not establish current availability, admission or registration. Follow the official source to confirm. This preview cannot register you, edit member records or notify Chamber staff. Report emails and lead forwarding are not connected. Team samples are fictional illustrations.',
    entry: [
      {
        label: 'Sources',
        text: 'Saved public membership and directory pages, plus the imported Chamber events calendar.',
      },
      {
        label: 'Try it',
        text: 'Ask about your goal, then change a detail or ask for the official link.',
      },
    ],
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
    accent: '#173851',
    theme: { headingFont: 'jost', highlight: '#E2D573', highlightInk: '#173851', square: true },
    logo: { src: '/images/demo/kirkland-chamber-logo.png', alt: 'Greater Kirkland Chamber of Commerce', width: 320, height: 138 },
    tools: [
      {
        name: 'Weekly report',
        text: 'The summary your team would get each week.',
        href: '#sample-report?cadence=weekly',
        action: 'Preview the weekly report',
      },
      {
        name: 'Staff alerts',
        text: 'The email staff get when a visitor asks for follow-up.',
        href: '#sample-notification?cadence=weekly&staff-alerts=on',
        action: 'Turn on staff alerts',
      },
    ],
    toolsComingSoon:
      'Coming soon: reports and staff alerts built from your own test chat, sent to your inbox once your workspace is connected.',
    capabilities: {
      title: 'What it can do for the Chamber',
      tested:
        'Tested on 32 real Chamber questions, including follow-ups that change a detail, other languages and requests it should decline.',
      tools: [
        {
          name: 'Events calendar',
          text: 'Reads the imported Chamber calendar and gives the date, time, place and registration link.',
          ask: 'What Chamber events are coming up?',
        },
        {
          name: 'Member directory',
          text: 'Finds members by what they do and links each profile.',
          ask: 'Which members do commercial photography?',
        },
        {
          name: 'Membership advisor',
          text: 'Matches a tier to a budget and goals, using the published benefits.',
          ask: 'What does Engagement membership include?',
        },
        {
          name: 'Staff routing',
          text: 'Points a visitor to the right person on the team, not a general inbox.',
          ask: 'Who should I talk to about sponsoring an event?',
          comingSoon: 'Coming soon: hands the request to that person by email once lead forwarding is connected.',
        },
      ],
      habits: [
        {
          name: 'Answers in their language',
          text: 'Replies in the language the visitor writes in.',
          ask: 'Quels avantages offre l’adhésion à la Chambre ?',
        },
        {
          name: 'Keeps the thread',
          text: 'Carries a budget or plan into the next answer. Ask the $900 question first.',
          ask: 'What if my budget drops to $500?',
        },
        {
          name: 'Honest about gaps',
          text: 'Says when something is not published and gives the official route instead.',
          ask: 'Do you know the Chamber’s annual revenue?',
        },
      ],
    },
    builtFor: {
      title: 'Built for your Chamber',
      text: 'This preview runs on public pages. With your team, we shape it around the questions you handle every week.',
      ideas: [
        { name: 'Sponsorships and the gala', text: 'Packages, tables and who to talk to, with the inquiry sent to the right person.' },
        { name: 'New member onboarding', text: 'First steps, benefits to use early and answers to the questions new members ask.' },
        { name: 'Ribbon cuttings', text: 'Who qualifies, what to prepare and how to request a date.' },
        { name: 'Program staff routing', text: 'Leadership, events and member services questions sent to the staff who run them.' },
        { name: 'Chamber Organizer', text: 'Connect your calendar and member directory so answers follow your updates.' },
      ],
      invite: 'Tell us what your team answers most, and we will show you how it would work.',
    },
    widgetUrl:
      'https://widget.subsights.com/?view=inline&api_key=a6hGMAbp2dSTwGAILaHkafFwTju6zm5H&workspace_id=0XvceSLk1j',
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
    conversation: {
      title: 'A launch plan becomes a membership decision.',
      turns: [
        {
          question:
            'I am launching a design studio. I want a directory listing and a ribbon cutting.',
          answer:
            'Compare Community membership: the published benefits include a ribbon cutting plus the Engagement benefits, including the print and online directory listing.',
          source: {
            label: 'Membership benefits',
            url: 'https://www.kirklandchamber.org/join-kirkland-chamber',
          },
        },
        {
          question: 'What if I only need the listing for now?',
          answer:
            'Then look at Engagement first. The directory listing is included there; Community adds the ribbon cutting and other benefits. Your launch plans are what make that comparison useful.',
          source: {
            label: 'Compare the tiers',
            url: 'https://www.kirklandchamber.org/join-kirkland-chamber',
          },
        },
        {
          question: 'Does joining also reserve my spot at events?',
          answer:
            'Membership pricing is a listed benefit, but it does not itself reserve an event place. Check the individual event listing for registration, eligibility and availability.',
          source: {
            label: 'Official events calendar',
            url: 'https://www.kirklandchamber.org/events',
          },
        },
      ],
      takeaway:
        'The conversation reveals which benefit matters to a prospective member and where the difference between membership and event registration needs to be clearer.',
    },
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
      'https://widget.subsights.com/?view=inline&api_key=Fz3nZgAkChEXuncy7Z4KIl9O8eTfM3Y7&workspace_id=0XvceSLk1j',
    url: 'https://visitkitsap.com/itineraries/one-more-night-in-bremerton/',
    teamView: [
      {
        question: 'What can I do without a car?',
        insight: 'Trip planning: make walkable itineraries easy to find.',
      },
      {
        question: 'I only have a short time before my ferry.',
        insight:
          'Visitor needs: connect nearby activities with official transport information.',
      },
      {
        question: 'Can we make this work with children?',
        insight:
          'Content opportunity: explain the practical details families ask about.',
      },
    ],
    conversation: {
      title: 'An itinerary adapts to the time a visitor has.',
      turns: [
        {
          question:
            'I am getting off the ferry in Bremerton without a car. Any ideas?',
          answer:
            'The Bremerton itinerary highlights a walkable downtown, the boardwalk and Harborside Fountain Park near the waterfront. Are you after food, shops or time by the water?',
          source: {
            label: 'Bremerton itinerary',
            url: 'https://visitkitsap.com/itineraries/one-more-night-in-bremerton/',
          },
        },
        {
          question: 'Just the water. I only have about 90 minutes.',
          answer:
            'Keep it focused on the boardwalk and fountain park rather than adding the Manette dinner stop from the longer itinerary. Leave time to return to the terminal.',
          source: {
            label: 'Waterfront ideas',
            url: 'https://visitkitsap.com/itineraries/one-more-night-in-bremerton/',
          },
        },
        {
          question: 'Can you confirm which ferry I can catch?',
          answer:
            'I cannot check live departures or queues in this preview. Use the ferry operator’s current schedule and allow a boarding buffer before choosing your return sailing.',
          source: {
            label: 'Official ferry schedules',
            url: 'https://wsdot.com/ferries/schedule/',
          },
        },
      ],
      takeaway:
        'You learn that the visitor needs a short, car-free plan, not just a list of attractions. That is a useful direction for your next itinerary or visitor guide.',
    },
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
      'https://widget.subsights.com/?view=inline&api_key=0oaBrAQl00GvbtUAzN1W3bZJtE1JZNZW&workspace_id=0XvceSLk1j',
    url: 'https://cascaracapital.com/loan-programs/',
    teamView: [
      {
        question: 'Which program is for a renovation and resale?',
        insight:
          'Borrower intent: clarify how published programs fit different projects.',
      },
      {
        question: 'What if I build on an empty lot instead?',
        insight:
          'Content opportunity: make the distinction between renovation and new construction clear.',
      },
      {
        question: 'What should I bring to a first conversation?',
        insight:
          'Next steps: make the published contact and application paths easy to find.',
      },
    ],
    conversation: {
      title: 'A changed project points to a different program.',
      turns: [
        {
          question:
            'I want to buy a house, renovate it and sell it. Which program should I read?',
          answer:
            'Start with the published Fix and Flip program, which describes financing to acquire, renovate and sell a property. The lending team would still need to evaluate your project.',
          source: {
            label: 'Published loan programs',
            url: 'https://cascaracapital.com/loan-programs/',
          },
        },
        {
          question: 'What if I buy an empty lot and build a new house instead?',
          answer:
            'That changes the comparison. The Vertical Construction program describes ground-up builds, while Fix and Flip describes renovating an existing property. Compare the construction information for that plan.',
          source: {
            label: 'Construction and renovation programs',
            url: 'https://cascaracapital.com/loan-programs/',
          },
        },
        {
          question: 'Can you tell me whether I am approved?',
          answer:
            'This preview cannot determine approval or quote terms. Use Cascara’s contact or application path to have the lending team review the specifics.',
          source: {
            label: 'Contact Cascara',
            url: 'https://cascaracapital.com/contact-us/',
          },
        },
      ],
      takeaway:
        'The team can see which projects visitors are exploring and where a program comparison could make the first lending conversation more useful.',
    },
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
      'https://widget.subsights.com/?view=inline&api_key=2pTsOd3Uo0BDw5eKVvpPrYWIj76hw85x&workspace_id=0XvceSLk1j',
    url: 'https://www.onlineu.com/degrees/nursing',
    teamView: [
      {
        question: 'I am an RN with an ADN. Where do I start?',
        insight:
          'Reader intent: surface the guide relevant to their current education.',
      },
      {
        question: 'I do not have an RN license yet.',
        insight:
          'Content opportunity: distinguish initial nursing education from degree completion.',
      },
      {
        question: 'Is an online program completely remote?',
        insight:
          'Decision support: point readers to current program and clinical requirements.',
      },
    ],
    conversation: {
      title: 'One detail changes the education path.',
      turns: [
        {
          question: 'I have an ADN and want a bachelor’s degree in nursing.',
          answer:
            'The RN-to-BSN guide is a useful starting point for registered nurses completing a bachelor’s degree. Are you already an RN?',
          source: {
            label: 'RN-to-BSN guide',
            url: 'https://www.onlineu.com/degrees/rn-to-bsn',
          },
        },
        {
          question: 'Actually, I am not licensed as an RN.',
          answer:
            'That matters. Do not assume an RN-to-BSN completion program is your starting route. Compare the nursing guide and check each school’s entry requirements for someone at your stage.',
          source: {
            label: 'Nursing paths',
            url: 'https://www.onlineu.com/degrees/nursing',
          },
        },
        {
          question: 'If a course says online, can I do everything remotely?',
          answer:
            'Check the school’s current requirements, including clinical or other in-person components and where students can enroll. “Online” alone does not establish that the whole program is remote.',
          source: {
            label: 'Program information to compare',
            url: 'https://www.onlineu.com/degrees/rn-to-bsn',
          },
        },
      ],
      takeaway:
        'Readers reveal the distinctions they need help with. Use those questions to improve guide navigation and put important eligibility details beside the next link.',
    },
  },
  {
    slug: 'secret-burger-kitchen',
    label: 'Secret Burger Kitchen',
    url: 'https://secretburgerkitchen.com/',
    headline: 'Hours, prices, catering and the truck, answered.',
    description:
      'Ask which SBK is open, what a Double Smash costs, or what catering for your office would run. Catering and truck requests can go straight to your team.',
    questions: [
      'Which SBK is open right now?',
      'How much is a Double Smash?',
      'Can I book the food truck for an event?',
      'What would catering for 25 people cost?',
    ],
    scope:
      'Answers use 19 public pages of secretburgerkitchen.com, published store hours, the food truck’s online menu and the published ezCater catering menus, checked November 11, 2026 (Pacific time). Store menu prices behind Toast’s bot check could not be read, so prices quote the truck menu. This preview cannot place an order or confirm a booking; requests go to a demo inbox. Team samples are fictional illustrations.',
    entry: [
      { label: 'Sources', text: 'Your public pages, store hours, the truck menu and your ezCater catering menus.' },
      { label: 'Try it', text: 'Ask about a store, a price or an event, then change the headcount or the place.' },
    ],
    sources: [
      { label: 'Locations and hours', url: 'https://secretburgerkitchen.com/locations/' },
      { label: 'Menu', url: 'https://secretburgerkitchen.com/menu/' },
      { label: 'Food truck', url: 'https://secretburgerkitchen.com/locations/kent/' },
      { label: 'Seattle catering on ezCater', url: 'https://www.ezcater.com/catering/secret-burger-kitchen-4' },
    ],
    accent: '#BF1F09',
    logo: { src: '/images/demo/secret-burger-kitchen-logo.png', alt: 'Secret Burger Kitchen', width: 300, height: 300 },
    widgetUrl:
      'https://widget.subsights.com/?view=inline&api_key=2xKB6yQ8ThAn5VW6OxwDWT53GyTYLN0P&workspace_id=0XvceSLk1j',
    teamView: [
      { question: 'Can I book the food truck for a company event of about 60 people?', insight: 'Truck leads: the request goes to the truck team with the date, headcount and place.' },
      { question: 'How much is a Double Smash?', insight: 'Prices: guests want a number before they order; keep each store’s menu readable.' },
      { question: 'Is the Renton location open yet?', insight: 'New stores: say the opening month and point to the nearest open SBK.' },
    ],
    conversation: {
      title: 'A truck booking that reaches the truck team.',
      turns: [
        {
          question: 'Can I book the food truck for a company event of about 60 people in Kirkland next month? How do I get a quote?',
          answer:
            'Yes, SBK Mobile handles private event bookings. For a quote for your December company event in Kirkland for about 60 people, call the truck team at (206) 759-0000. They can discuss the date, travel and pricing; availability isn’t confirmed. If you prefer, I can help pass along your request for a quote.',
          source: { label: 'Food truck', url: 'https://secretburgerkitchen.com/locations/kent/' },
        },
        {
          question: 'How much would it cost to cater lunch for about 25 people at our office in Seattle?',
          answer:
            'For about 25 people, Seattle drop-off catering estimates are 25 Executive Boxes at $487.50, or 4 Event Burger Bars at $440 for 32 servings. Add $20 for delivery. These are estimates before tax and tip, not quotes.',
          source: { label: 'Seattle catering on ezCater', url: 'https://www.ezcater.com/catering/secret-burger-kitchen-4' },
        },
        {
          question: 'Is the Renton location open yet?',
          answer:
            'Not yet. The Renton location at 202 SW 43rd St is opening in December 2026; an exact day hasn’t been published. The nearest open SBK is the Auburn food truck, about 10 miles away, at 102 15th St NE.',
          source: { label: 'Locations and hours', url: 'https://secretburgerkitchen.com/locations/' },
        },
      ],
      takeaway: 'These are answers the live assistant gave on November 11, 2026. Ask your own in the chat above.',
    },
  },

  {
    slug: 'studio-east',
    label: 'Studio East',
    url: 'https://studio-east.org/',
    headline: 'The right class, camp or show for every family.',
    description:
      'Ask which class fits your child, when the next show is, or what the refund policy says. Each answer links the exact sign-up or ticket page.',
    questions: [
      'Which class fits my 8-year-old this winter?',
      'A Christmas Story dates and tickets?',
      'What’s the refund policy for classes?',
      'Is there help with tuition?',
    ],
    scope:
      'Answers use 18 public pages of studio-east.org, the class and camp listings on Active.com and the show listings on the Studio East ticket site, checked November 11, 2026 (Pacific time). This preview cannot register a child or sell a ticket; it links the exact page. Requests go to a demo inbox. Team samples are fictional illustrations.',
    entry: [
      { label: 'Sources', text: 'Your public pages, your Active.com class and camp listings and your ticket site.' },
      { label: 'Try it', text: 'Ask about your child’s grade and free days, then change a detail.' },
    ],
    sources: [
      { label: 'Classes', url: 'https://studio-east.org/classes' },
      { label: 'Policies and FAQs', url: 'https://studio-east.org/policies-and-faqs' },
      { label: 'Class and camp registration', url: 'https://campscui.active.com/orgs/StudioEast' },
      { label: 'Tickets', url: 'https://studioeast.my.salesforce-sites.com/ticket/' },
    ],
    accent: '#171D3A',
    theme: { highlight: '#A72061', highlightInk: '#ffffff' },
    logo: { src: '/images/demo/studio-east-logo.png', alt: 'Studio East', width: 750, height: 156 },
    widgetUrl:
      'https://widget.subsights.com/?view=inline&api_key=oi1687OBN1Wwjl5wKISwwT7QKgaOvT4e&workspace_id=0XvceSLk1j',
    teamView: [
      { question: 'Which class fits my 8-year-old in January?', insight: 'Placement: parents think in ages; the site places by grade.' },
      { question: 'Do you have a camp during mid-winter break?', insight: 'Camps: publish grades and prices for planned camps as soon as they are set.' },
      { question: 'Can I get a refund if we cancel?', insight: 'Policies: classes, camps and tickets each have their own rules.' },
    ],
    conversation: {
      title: 'A parent’s question, from age to sign-up.',
      turns: [
        {
          question: 'Which class or camp fits my 8-year-old in January, and where do I sign up?',
          answer:
            'Studio East places children by school grade, not age. An 8-year-old is usually in second or third grade. Frozen KIDS (grades 2–6, Tuesdays, January 12–March 23, $450) and Broadway Kids: The Little Mermaid (grades 1–3, Saturdays, January 16–March 27, $220) both fit. The links go directly to registration.',
          source: { label: 'Class and camp registration', url: 'https://campscui.active.com/orgs/StudioEast' },
        },
        {
          question: 'I want 4 tickets for A Christmas Story on the afternoon of Saturday, December 19. How much will that be?',
          answer:
            'For the Saturday, December 19, 2026, 2 PM matinee, four standard tickets are $112 total ($25 plus a $3 fee each); reduced-price blue seats are $72 total. It is a relaxed performance and a Christmas Morning PJ matinee.',
          source: { label: 'Tickets', url: 'https://studioeast.my.salesforce-sites.com/ticket/' },
        },
        {
          question: 'I registered my son for Frozen KIDS but we need to cancel. Class starts January 12. Do I get my money back?',
          answer:
            'Yes. Canceling now is more than 48 hours before the first class, so the class cost is refundable minus the $50 non-refundable registration fee, or the full cost can be kept as credit. On the listed $450 tuition, that is $400 refunded.',
          source: { label: 'Policies and FAQs', url: 'https://studio-east.org/policies-and-faqs' },
        },
      ],
      takeaway: 'These are answers the live assistant gave on November 11, 2026. Ask your own in the chat above.',
    },
  },
];

// Publish this private preview after its existing bot has a widget key and paid
// admission is installed. The key is public embed access, not a platform token.
export function getProspectDemo(
  slug: string,
  postcardsKey = process.env.SUBSIGHTS_POSTCARDS_WIDGET_KEY,
): ProspectDemo | null {
  if (slug !== 'postcards-to-seattle') {
    return PROSPECT_DEMOS.find((demo) => demo.slug === slug) ?? null;
  }
  if (!postcardsKey?.trim()) return null;
  const widget = new URL('https://widget.subsights.com/index.html');
  widget.searchParams.set('view', 'inline');
  widget.searchParams.set('workspace_id', '0XvceSLk1j');
  widget.searchParams.set('api_key', postcardsKey.trim());
  return {
    slug,
    label: 'Postcards to Seattle',
    url: 'https://postcardstoseattle.com/',
    headline: 'Help readers find the stay that fits.',
    description: 'Try a conversation built around Marissa’s San Juan Islands lodging guide. Narrow the options, change your plans and follow the matching published link.',
    questions: [
      'We’re walking off the Friday Harbor ferry. What is an affordable place to stay?',
      'Actually, we want a boutique feel. Still no car.',
      'Can you confirm a room is available tonight? Then show a sample of what our team would learn.',
    ],
    scope: 'Selected San Juan Islands lodging content, prepared independently for this preview. Recommendations and commercial links come from the published guide, which discloses affiliate links. Live room availability, current rates, reservations and staff notifications are not established by this content. The samples above are fictional and send nothing.',
    sources: [{ label: 'Marissa’s San Juan Islands lodging guide', url: 'https://postcardstoseattle.com/where-to-stay-san-juan-islands/' }],
    accent: '#234e52',
    widgetUrl: widget.toString(),
    publishedLinks: [
      { label: 'Read the lodging guide', url: 'https://postcardstoseattle.com/where-to-stay-san-juan-islands/' },
      { label: 'Earthbox: published booking link', url: 'https://www.booking.com/hotel/us/earthbox-inn-amp-spa.html' },
      { label: 'Bird Rock: published booking link', url: 'https://www.booking.com/hotel/us/bird-rock.html' },
    ],
    teamView: [
      { question: 'Boutique, but still no car', insight: 'See which travel constraints readers keep while changing their preferences.' },
      { question: 'Does the family pick work without a car?', insight: 'Find transport questions the guide could explain beside a recommendation.' },
      { question: 'Is there a room tonight?', insight: 'Separate a useful published booking route from inventory the assistant cannot verify.' },
    ],
    conversation: {
      title: 'A reader changes the plan',
      turns: [
        { question: 'Affordable, near the Friday Harbor ferry, without a car.', answer: 'The guide presents Earthbox as a budget/mid-range Friday Harbor option. Compare its published details and check the booking page for current rates and rooms.', source: { label: 'Earthbox in the guide', url: 'https://postcardstoseattle.com/where-to-stay-san-juan-islands/#1_Earthbox_Inn_Spa_Best_for_Budget_Travelers' } },
        { question: 'Actually, boutique. Still no car.', answer: 'The guide describes Bird Rock as a boutique downtown option near the ferry. That keeps your no-car preference in view; it does not confirm a room or an accessible route.', source: { label: 'Bird Rock in the guide', url: 'https://postcardstoseattle.com/where-to-stay-san-juan-islands/#2_Bird_Rock_Hotel_Best_Boutique_Stay_Under_Friday_Harbor_House' } },
        { question: 'Is it available tonight?', answer: 'The guide cannot establish tonight’s inventory or price. Use its published Bird Rock booking link to check before making plans.', source: { label: 'Published Bird Rock booking route', url: 'https://www.booking.com/hotel/us/bird-rock.html' } },
      ],
      takeaway: 'Useful reader questions can show where a guide needs clearer transport or booking information. These examples do not establish bookings, revenue or a change to the article.',
    },
  };
}
