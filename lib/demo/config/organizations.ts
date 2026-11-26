import 'server-only';
import type { ProspectDemo } from './prospects';

// Public source content only. Bot capabilities are supplied after native access verification.
export const ORGANIZATION_DEMOS: ProspectDemo[] = [
  {
    "slug": "colliers-seattle-dsf",
    "label": "Colliers Seattle Debt & Structured Finance",
    "url": "https://www.colliers.com/en/services/colliers-debt-and-structured-finance",
    "headline": "Find the right Colliers financing or servicing route.",
    "description": "Connect with Seattle’s multifamily financing team for a new inquiry, or open the official borrower portal for an existing loan.",
    "questions": [
      "Who handles Seattle multifamily financing?",
      "Who can I talk to about a refinance?",
      "Where is the existing borrower login?"
    ],
    "tools": [
      {
        "name": "Seattle financing contact",
        "text": "Find the Colliers Seattle expert for multifamily acquisition or refinance.",
        "href": "https://www.colliers.com/en/experts/mark-plenge",
        "action": "Mark Plenge’s profile"
      },
      {
        "name": "Debt & Structured Finance",
        "text": "See Colliers’ published financing and servicing routes.",
        "href": "https://www.colliers.com/en/services/colliers-debt-and-structured-finance",
        "action": "Colliers financing services"
      },
      {
        "name": "Service an existing loan",
        "text": "Open the borrower sign-in published by Colliers for current clients.",
        "href": "https://colliers.precision-lm.com/",
        "action": "Colliers borrower portal"
      }
    ],
    "scope": "Colliers handles rates and eligibility, account access and loan servicing through its own team and portal.",
    "accent": "#235373",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "seattle-finance-collective",
    "label": "Seattle Finance Collective",
    "url": "https://www.seattlefinancecollective.com/",
    "headline": "Find your next step with Seattle Finance Collective.",
    "description": "Check the guest event allowance, open the membership application or find the right place to ask about sponsorship.",
    "questions": [
      "Can I attend a second event as a guest?",
      "How do I apply after two SFC events?",
      "Where do I ask about sponsorship?"
    ],
    "sources": [
      {
        "label": "Membership and guest policy",
        "url": "https://www.seattlefinancecollective.com/members"
      },
      {
        "label": "SFC Event Calendar",
        "url": "https://www.seattlefinancecollective.com/new-events"
      },
      {
        "label": "Contact Seattle Finance Collective",
        "url": "https://www.seattlefinancecollective.com/contact"
      }
    ],
    "tools": [
      {
        "name": "Find an event",
        "text": "Look up dates and check the details for a particular event.",
        "href": "https://www.seattlefinancecollective.com/new-events",
        "action": "SFC Event Calendar"
      },
      {
        "name": "Apply for membership",
        "text": "Open the official application after attending two events.",
        "href": "https://www.seattlefinancecollective.com/new-sfc-member-application",
        "action": "New SFC Member Application"
      },
      {
        "name": "Ask about sponsorship",
        "text": "Reach SFC about sponsoring an event.",
        "href": "https://www.seattlefinancecollective.com/contact",
        "action": "Contact Seattle Finance Collective"
      }
    ],
    "scope": "Seattle Finance Collective handles registration, applications, sponsorship and dues through its own pages and team.",
    "accent": "#244662",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "timber-ridge",
    "label": "Timber Ridge at Talus",
    "url": "https://timberridgelcs.com/",
    "headline": "Plan a visit or explore life at Timber Ridge.",
    "description": "Find the right contact for a visit, compare apartment layouts and understand which programs are for residents.",
    "questions": [
      "Who do I contact to arrange a tour?",
      "Which apartments have a bedroom and a den?",
      "Can nonresidents apply directly for assisted living?"
    ],
    "sources": [
      {"label": "Timber Ridge contact", "url": "https://timberridgelcs.com/contact/"},
      {"label": "Fitness and wellness", "url": "https://timberridgelcs.com/lifestyle/fitness-wellness/"},
      {"label": "Assisted living", "url": "https://timberridgelcs.com/health-center/assisted-living/"}
    ],
    "tools": [
      {"name": "Ask about a tour", "text": "Reach the senior living team to request a visit.", "href": "https://timberridgelcs.com/contact/", "action": "Contact Timber Ridge"},
      {"name": "Compare apartment layouts", "text": "Look through the published independent living floor plans.", "href": "https://timberridgelcs.com/independent-living/floor-plans/", "action": "Floor plans"},
      {"name": "Explore resident programs", "text": "Read about continuing education and other wellness activities.", "href": "https://timberridgelcs.com/lifestyle/fitness-wellness/", "action": "Fitness and wellness"}
    ],
    "scope": "Timber Ridge handles visits, availability and resident services through its own team and website.",
    "accent": "#345749",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "seattle-chamber",
    "label": "Seattle Metro Chamber",
    "url": "https://www.seattlechamber.com/",
    "headline": "Find a Chamber event or member resource.",
    "description": "Check who can attend a program, find a company listing or reach the Chamber team that can help.",
    "questions": [
      "Can I attend a program as a prospective member?",
      "Where can I look up my company in the directory?",
      "Who can correct a listing for my company?"
    ],
    "sources": [
      {"label": "Chamber FAQs", "url": "https://www.seattlechamber.com/faq/"},
      {"label": "Events by program", "url": "https://www.seattlechamber.com/events-by-program/"},
      {"label": "Member portal guide", "url": "https://www.seattlechamber.com/news/2025/02/27/community-news/new-chamber-website-is-here/"}
    ],
    "tools": [
      {"name": "Find a Chamber event", "text": "Open the Chamber calendar to check event details, eligibility and registration.", "href": "https://members.seattlechamber.com/atlas/calendar?oe=true", "action": "Chamber calendar"},
      {"name": "Look up a business", "text": "Browse public listings in the existing member directory.", "href": "https://seattlechamber.weblinkconnect.com/atlas/directory/all-categories", "action": "Member directory"},
      {"name": "Fix a company listing", "text": "Find the Chamber's instructions and who can change the listing.", "href": "https://www.seattlechamber.com/faq/", "action": "Member services FAQ"}
    ],
    "scope": "Event registration, membership and directory edits stay in the Chamber’s systems.",
    "accent": "#28624b",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "kirkland-rotary",
    "label": "Rotary Club of Kirkland",
    "url": "https://www.kirklandrotary.org/",
    "headline": "Visit a meeting or find your way into Rotary.",
    "description": "Check where a club event takes place, compare membership options and reach the right club page.",
    "questions": [
      "Where should I go for a first visit?",
      "Can a guest register for the holiday dinner?",
      "Where can I confirm current membership dues?"
    ],
    "sources": [
      {"label": "Club events", "url": "https://www.kirklandrotary.org/events"},
      {"label": "Membership information", "url": "https://www.kirklandrotary.org/sitepage/membership-in-rotary/become-a-rotarian"},
      {"label": "Community service", "url": "https://www.kirklandrotary.org/sitepage/community-service"}
    ],
    "tools": [
      {"name": "Find a meeting", "text": "Check the date, location and dinner or meeting time.", "href": "https://www.kirklandrotary.org/events", "action": "Club events"},
      {"name": "Ask about joining", "text": "Confirm dues and ask the club about the inquiry process.", "href": "https://kirklandrotary.org/form/membership-inquiry/", "action": "Membership inquiry"},
      {"name": "Get involved locally", "text": "Find the club’s local community service work.", "href": "https://www.kirklandrotary.org/sitepage/community-service", "action": "Community service"}
    ],
    "scope": "The club handles event registration, payments and membership inquiries on its own website.",
    "accent": "#17458f",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "bellevue-rotary",
    "label": "Bellevue Rotary Club",
    "url": "https://bellevuerotary.org/",
    "headline": "Plan a visit or find a way to serve.",
    "description": "Find Tuesday lunch details, ask about helping with a local project and see where Bellevue Rotary handles membership or grant questions.",
    "entry": [
      {
        "label": "First visit",
        "text": "The club covers lunch for first-time guests."
      }
    ],
    "questions": [
      "When can I visit for a first lunch?",
      "Can I help with a Porchlight project?",
      "Are local grant applications open?"
    ],
    "sources": [
      {
        "label": "Weekly meetings",
        "url": "https://bellevuerotary.org/events/"
      },
      {
        "label": "Club calendar",
        "url": "https://bellevuerotary.org/rotary-calendar/"
      },
      {
        "label": "Club contact",
        "url": "https://bellevuerotary.org/contact/"
      }
    ],
    "tools": [
      {
        "name": "Visit a Tuesday lunch",
        "text": "See the venue, schedule and first-visit lunch offer.",
        "href": "https://bellevuerotary.org/visit-us/",
        "action": "Visit Bellevue Rotary"
      },
      {
        "name": "Find a service project",
        "text": "Browse the club’s local and international work.",
        "href": "https://bellevuerotary.org/service-projects/",
        "action": "Service projects"
      },
      {
        "name": "Ask about membership",
        "text": "Contact the Membership Team about dues or joining.",
        "href": "https://bellevuerotary.org/join-bellevue-rotary/",
        "action": "Membership inquiry"
      },
      {
        "name": "Check a local grant",
        "text": "Find the current cycle and the expenses the club funds.",
        "href": "https://bellevuerotary.org/apply-for-local-grant/",
        "action": "Local grant application"
      }
    ],
    "scope": "Bellevue Rotary handles visits, membership inquiries, volunteer arrangements and grant applications on its website.",
    "accent": "#153c69",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "reaps",
    "label": "Real Estate Association of Puget Sound",
    "url": "https://www.reapsweb.com/",
    "headline": "Find the right REAPS event or membership.",
    "description": "Check when the first-time guest pass applies, what your event costs and which membership includes in-person meetings.",
    "questions": [
      "Can I use my first-time pass for Bellevue Coffee?",
      "What changes if I’m already a member?",
      "Can five coworkers share a business membership?"
    ],
    "sources": [
      {
        "label": "Meeting schedule",
        "url": "https://www.reapsweb.com/Page.aspx?ID=REAPS-Monthly-Meetings-Schedule"
      },
      {
        "label": "Event calendar",
        "url": "https://www.reapsweb.com/Calendar.aspx"
      },
      {
        "label": "Membership options",
        "url": "https://www.reapsweb.com/MembershipInfo.aspx"
      }
    ],
    "tools": [
      {
        "name": "Try a regular Main meeting",
        "text": "Check the one-time free guest pass for regular Main meetings.",
        "href": "https://www.reapsweb.com/GuestPass.aspx",
        "action": "Guest pass rules"
      },
      {
        "name": "Plan a visit to Bellevue Coffee",
        "text": "Open the December 1 event for the time, venue and member or guest price.",
        "href": "https://www.reapsweb.com/Events.aspx?ID=Coffee-Conversations-Focused-on-REI-213-12-1-2026",
        "action": "Bellevue Coffee details"
      },
      {
        "name": "Choose a membership",
        "text": "Compare online-only, individual and business options.",
        "href": "https://www.reapsweb.com/MembershipInfo.aspx",
        "action": "Membership options"
      },
      {
        "name": "Resolve a membership question",
        "text": "Check a conflicting price or business seat limit with REAPS before paying.",
        "href": "https://www.reapsweb.com/Contact.aspx",
        "action": "Contact REAPS"
      }
    ],
    "scope": "REAPS handles event registration, membership and guest passes on its website.",
    "accent": "#263e36",
    "widgetUrl": "",
    "teamView": []
  },
  {
    "slug": "northmarq",
    "label": "Northmarq Seattle",
    "url": "https://www.northmarq.com/offices/wa/seattle-wa-8th-st",
    "headline": "Find the right Seattle investment sales or financing team.",
    "description": "Browse multifamily properties, look up the Seattle team and find the right next step for a purchase or refinance.",
    "questions": [
      "Is Rainier Beach an operating apartment property or a development site?",
      "Where can I check the terms for Cheney Park Commons?",
      "Who should I talk to if I want financing for a multifamily property?"
    ],
    "sources": [
      {
        "label": "Seattle 8th Street office",
        "url": "https://www.northmarq.com/offices/wa/seattle-wa-8th-st"
      },
      {
        "label": "Seattle brokerage profile and properties",
        "url": "https://www.northmarq.com/people/tyler-smith"
      },
      {
        "label": "Multifamily services",
        "url": "https://www.northmarq.com/property-types-industries/multifamily"
      }
    ],
    "tools": [
      {
        "name": "Browse apartments for sale",
        "text": "Open Northmarq’s multifamily listings and use its location and property filters.",
        "href": "https://www.northmarq.com/properties/multifamily",
        "action": "Multifamily listings"
      },
      {
        "name": "Look up a named property",
        "text": "Find the Seattle team’s property cards and open the details for the listing you mean.",
        "href": "https://www.northmarq.com/people/tyler-smith",
        "action": "Seattle team properties"
      },
      {
        "name": "Explore multifamily financing",
        "text": "Find the financing path for an acquisition or refinance.",
        "href": "https://www.northmarq.com/property-types-industries/multifamily",
        "action": "Multifamily financing"
      },
      {
        "name": "Reach the Seattle team",
        "text": "Find the local office and its published contacts.",
        "href": "https://www.northmarq.com/offices/wa/seattle-wa-8th-st",
        "action": "Seattle office"
      }
    ],
    "scope": "Northmarq publishes its listings and handles inquiries directly.",
    "accent": "#20334a",
    "widgetUrl": "",
    "teamView": []
  },
{
  "slug": "creda",
  "label": "CREDA Washington State",
  "url": "https://www.credawa.org/",
  "headline": "Find your next CREDA opportunity.",
  "description": "Compare membership, plan a program visit or find a recording. Change a detail without starting over.",
  "questions": [
    "Compare 2027 membership dues",
    "Plan the January forecast",
    "Can I join the mentor program?",
    "Find a public webinar recording"
  ],
  "scope": "Selected official public pages checked November 25, 2026 (Pacific). Membership, registration, payments and account access finish through CREDA.",
  "entry": [
    {
      "label": "Try it",
      "text": "Ask a question, then change your age, membership status or selected program."
    }
  ],
  "sources": [
    {
      "label": "2027 membership dues",
      "url": "https://www.credawa.org/membership"
    },
    {
      "label": "January forecast",
      "url": "https://www.credawa.org/index.php?option=com_jevents&task=icalrepeat.detail&evid=658&Itemid=174&year=2027&month=01&day=28&title=2027-economic-forecast-south-sound&uid=41f08679064677e28ec5c3eec6be5f53"
    },
    {
      "label": "Mentor program",
      "url": "https://www.credawa.org/index.php?option=com_jevents&task=icalrepeat.detail&evid=659&Itemid=174&year=2027&month=01&day=21&title=2027-mentor-program--kick-off-developing-leaders&uid=3d4e17ad642c612c5b10fb61d90ac55f"
    },
    {
      "label": "Webinar recordings",
      "url": "https://www.credawa.org/webinar-library"
    },
    {
      "label": "Member services",
      "url": "https://www.credawa.org/contact"
    }
  ],
  "accent": "#1f2937",
  "widgetUrl": "",
  "teamView": [],
  "tools": [
    {
      "name": "Compare membership",
      "text": "Check 2027 dues for your age, student status and company membership position.",
      "href": "https://www.credawa.org/membership",
      "action": "Membership dues"
    },
    {
      "name": "Plan the forecast",
      "text": "Check the January 28 South Sound forecast in Tacoma, its schedule and member or non-member tickets.",
      "href": "https://www.credawa.org/index.php?option=com_jevents&task=icalrepeat.detail&evid=658&Itemid=174&year=2027&month=01&day=28&title=2027-economic-forecast-south-sound&uid=41f08679064677e28ec5c3eec6be5f53",
      "action": "Forecast details"
    },
    {
      "name": "Explore mentoring",
      "text": "Check member participation, the January 21 kick-off and monthly meetings.",
      "href": "https://www.credawa.org/index.php?option=com_jevents&task=icalrepeat.detail&evid=659&Itemid=174&year=2027&month=01&day=21&title=2027-mentor-program--kick-off-developing-leaders&uid=3d4e17ad642c612c5b10fb61d90ac55f",
      "action": "Mentor program"
    },
    {
      "name": "Find a recording",
      "text": "Browse the library and see which DEI recordings are also available to non-members.",
      "href": "https://www.credawa.org/webinar-library",
      "action": "Webinar library"
    },
    {
      "name": "Reach member services",
      "text": "Find the published contact for renewals, login help or another question.",
      "href": "https://www.credawa.org/contact",
      "action": "Contact CREDA"
    }
  ]
},
{
  "slug": "oneredmond",
  "label": "OneRedmond",
  "url": "https://oneredmond.org/",
  "headline": "Find the right business support.",
  "description": "Explore free advice, compare membership or plan an event visit. Change a detail without starting over.",
  "questions": [
    "Can I get free business advice?",
    "Compare annual membership levels",
    "Plan the December networking lunch",
    "Find relocation resources"
  ],
  "scope": "Selected official public pages checked November 26, 2026. Advice requests, membership and event registration finish through OneRedmond.",
  "entry": [
    {
      "label": "Try it",
      "text": "Ask a question, then change your employee count, location or another detail."
    }
  ],
  "sources": [
    {
      "label": "Business advice",
      "url": "https://oneredmond.org/support-services/"
    },
    {
      "label": "Membership",
      "url": "https://engage.oneredmond.org/membership-levels"
    },
    {
      "label": "Holiday lunch",
      "url": "https://engage.oneredmond.org/events/lunchdec26"
    },
    {
      "label": "Relocation",
      "url": "https://oneredmond.org/locate-your-business/"
    }
  ],
  "accent": "#1f2937",
  "widgetUrl": "",
  "teamView": [],
  "tools": [
    {
      "name": "Find free advice",
      "text": "Explore no-cost business advice and public resources before deciding whether to contact an adviser.",
      "href": "https://oneredmond.org/support-services/",
      "action": "Business support"
    },
    {
      "name": "Compare membership",
      "text": "Check annual levels for your organization type and employee count.",
      "href": "https://engage.oneredmond.org/membership-levels",
      "action": "Membership levels"
    },
    {
      "name": "Plan the holiday lunch",
      "text": "Check the December 3 lunch at Together Center, its agenda and the published member rate.",
      "href": "https://engage.oneredmond.org/events/lunchdec26",
      "action": "Holiday lunch details"
    },
    {
      "name": "Explore relocation",
      "text": "Find OneRedmond’s relocation guide and local business support.",
      "href": "https://oneredmond.org/locate-your-business/",
      "action": "Relocation resources"
    }
  ]
},
  {
    slug: 'kidder-simon-anderson',
    label: 'Simon | Anderson',
    url: 'https://simonandersonteam.com/',
    headline: 'Keep your apartment search on track.',
    description:
      'Explore listings, choose a market report, understand valuation or find the right person. Change a detail without starting over.',
    questions: [
      'Find listings by county and type',
      'Choose a Puget Sound report',
      'How does valuation work?',
      'Find a team member',
    ],
    scope:
      'Selected official public pages checked November 26, 2026. Finish listing searches, valuation and contact requests on the team’s site.',
    entry: [
      {
        label: 'Try it',
        text: 'Ask a question, then change the county, report edition or another detail.',
      },
    ],
    sources: [
      {
        label: 'Property listings',
        url: 'https://simonandersonteam.com/listings/',
      },
      {
        label: 'Market reports',
        url: 'https://simonandersonteam.com/market-reports/',
      },
      {
        label: 'How it works',
        url: 'https://simonandersonteam.com/how-we-do-it/',
      },
      {
        label: 'Team',
        url: 'https://simonandersonteam.com/team/',
      },
    ],
    accent: '#1f2937',
    widgetUrl: '',
    teamView: [],
    tools: [
      {
        name: 'Find listings',
        text: 'Choose property type, county, status and broker on the team’s listing page. Use List View or Map View to explore matching results.',
        href: 'https://simonandersonteam.com/listings/',
        action: 'Property listings',
      },
      {
        name: 'Choose a report',
        text: 'Find the November 10 Q4 2026 Puget Sound report or the August 16 Q3 edition for historical comparison. Open the selected report from the archive.',
        href: 'https://simonandersonteam.com/market-reports/',
        action: 'Report archive',
      },
      {
        name: 'Explore valuation',
        text: 'Learn what the team asks for in its free valuation request and how its six-stage brokerage process works. You can explore before deciding to sell.',
        href: 'https://simonandersonteam.com/how-we-do-it/',
        action: 'Valuation and process',
      },
      {
        name: 'Find the right person',
        text: 'Choose a named team member, a general discussion or research updates. Use the existing contact route only when you want it.',
        href: 'https://simonandersonteam.com/team/',
        action: 'Team profiles',
      },
    ],
  },
  {
    "slug": "gsba-business-support",
    "label": "GSBA",
    "url": "https://thegsba.org/",
    "headline": "Find the right GSBA support.",
    "description": "Explore business consulting, membership, directory help or an event. Keep your goal and the relevant terms together.",
    "questions": [
      "Find business consulting",
      "Compare membership options",
      "Understand monthly dues",
      "Find a business or event"
    ],
    "scope": "Selected official public pages checked November 26, 2026. Consulting requests, membership and events finish through GSBA.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change a detail or ask what to do next."
      }
    ],
    "sources": [
      {
        "label": "Business Academy",
        "url": "https://thegsba.org/business-academy/"
      },
      {
        "label": "Membership and dues",
        "url": "https://thegsba.org/levels-and-benefits/"
      },
      {
        "label": "Directory guide",
        "url": "https://thegsba.org/how-to-use-the-gsba-directory/"
      },
      {
        "label": "GSBA events",
        "url": "https://thegsba.org/"
      },
      {
        "label": "GSBA team",
        "url": "https://thegsba.org/team/"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "One-to-one business support",
        "text": "Explore cash flow, business plans, grant applications and other consulting topics. Ask GSBA about a session for your business.",
        "href": "https://thegsba.org/business-academy/",
        "action": "Consulting topics"
      },
      {
        "name": "Compare membership",
        "text": "Compare business, nonprofit and individual categories, their eligibility and published benefits. GSBA reviews applications.",
        "href": "https://thegsba.org/levels-and-benefits/",
        "action": "Membership options"
      },
      {
        "name": "Understand dues",
        "text": "Small Business monthly payments are installments of annual dues, with a $20 fee on the first payment. Ask about qualification for affordability support.",
        "href": "https://thegsba.org/levels-and-benefits/",
        "action": "Dues and payment terms"
      },
      {
        "name": "Find a business",
        "text": "Use GSBA’s guide to search the existing directory by name, category or keyword and refine the attributes that matter to you.",
        "href": "https://thegsba.org/how-to-use-the-gsba-directory/",
        "action": "Directory search guide"
      },
      {
        "name": "Improve your listing",
        "text": "Keep included Small Business onboarding help separate from optional $75 premium assistance. Start with your existing membership.",
        "href": "https://thegsba.org/levels-and-benefits/",
        "action": "Listing benefits"
      },
      {
        "name": "Choose an event",
        "text": "Power Connect at WAC and Hill Talk at Union are separate events. Use the selected event’s own listing for attendance details.",
        "href": "https://thegsba.org/",
        "action": "GSBA events"
      }
    ]
  },
  {
    "slug": "startup425",
    "label": "Startup425",
    "url": "https://www.startup425.org/",
    "headline": "Find your next program.",
    "description": "Explore a workshop, coworking session, accelerator or city resource while keeping the date and your goal together.",
    "questions": [
      "Can I attend the November AI workshop?",
      "Check the Bothell coworking date",
      "Explore the next accelerator cohort",
      "Find Bellevue licensing resources"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Event registration, applications and city services finish in their own systems.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the city, date or another detail."
      }
    ],
    "sources": [
      {
        "label": "Upcoming events",
        "url": "https://www.startup425.org/upcoming-events"
      },
      {
        "label": "Accelerator",
        "url": "https://www.startup425.org/accelerator"
      },
      {
        "label": "Starting a business guide",
        "url": "https://www.startup425.org/starting-a-business-guide"
      },
      {
        "label": "Bellevue licensing",
        "url": "https://bellevuewa.gov/city-government/departments/finance/business-taxes/business-licenses"
      },
      {
        "label": "Bellevue tax forms",
        "url": "https://bellevuewa.gov/taxforms"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "December 14 Demo Day",
        "text": "Attend the free program in Kirkland, 4–6 p.m. Pacific. The event page says next-cohort applications open on Demo Day.",
        "href": "https://www.startup425.org/event-details/startup425-accelerator-demo-day-cohort-6-december-2026",
        "action": "Demo Day details"
      },
      {
        "name": "Bothell coworking",
        "text": "The title lists December 2; the description says December 8. Ask the organizer to confirm before making plans.",
        "href": "https://www.startup425.org/event-details/startup-small-business-coworking-bothell-december-2",
        "action": "Check the conflicting listing"
      },
      {
        "name": "Explore the accelerator",
        "text": "Read the program and city preferences, keeping eligibility, application timing and admission separate.",
        "href": "https://www.startup425.org/accelerator",
        "action": "Accelerator information"
      },
      {
        "name": "Past AI workshop",
        "text": "The November 18 Bothell workshop has passed and registration is closed. Use current events to find another session.",
        "href": "https://www.startup425.org/event-details/ai-small-business-workshop-bothell-november",
        "action": "Past workshop details"
      },
      {
        "name": "Past holiday workshop",
        "text": "The November 18 holiday session was distinct from the AI workshop and general coworking. Registration is closed.",
        "href": "https://www.startup425.org/event-details/holiday-marketing-workshop-coworking-bothell-november",
        "action": "Past holiday session details"
      },
      {
        "name": "Bellevue business resources",
        "text": "Use the introductory guide alongside current city licensing and tax requirements. Other cities have their own rules.",
        "href": "https://www.startup425.org/starting-a-business-guide",
        "action": "Business guide"
      }
    ]
  },
  {
    "slug": "seattle-4-rotary",
    "label": "Rotary Club of Seattle",
    "url": "https://www.seattlerotary.org/",
    "headline": "Find your meeting or next step.",
    "description": "Keep the date and purpose together as you explore a lunch, remote program, speaker proposal or membership.",
    "questions": [
      "Who speaks on December 2?",
      "Find the January 27 remote program",
      "How do I propose a speaker?",
      "Explore membership"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Registration, proposals and membership finish in the club’s own services.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the date or another detail."
      }
    ],
    "sources": [
      {
        "label": "Club meeting information",
        "url": "https://www.seattlerotary.org/page/meeting-information"
      },
      {
        "label": "Current events",
        "url": "https://seattlerotary.org/Events"
      },
      {
        "label": "Speaker proposal instructions",
        "url": "https://www.seattlerotary.org/page/propose-a-speaker"
      },
      {
        "label": "Membership",
        "url": "https://www.seattlerotary.org/page/membership"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "December 2 lunch",
        "text": "Seattle City Attorney Erika Evans at Washington Athletic Club, 12:30–1:30 p.m. Pacific. Check the event’s own registration for current terms.",
        "href": "https://seattlerotary.org/events/december-2-lunch-meeting-at-the-wac/",
        "action": "Lunch details"
      },
      {
        "name": "January 27 remote program",
        "text": "Journalist James Traub’s program is Zoom only, 12:30–1:30 p.m. Pacific. Use its own event instructions.",
        "href": "https://portal.clubrunner.ca/2728/Events/january-27-zoom-only-meeting-with-journalist-james-traub",
        "action": "Remote program details"
      },
      {
        "name": "Propose a speaker",
        "text": "Email the published speaker contact with information and availability. Lunch registration is a separate service.",
        "href": "https://www.seattlerotary.org/page/propose-a-speaker",
        "action": "Speaker instructions"
      },
      {
        "name": "Membership",
        "text": "Explore the separate inquiry and application routes, and ask Mary Goldie about dues and Foundation contributions.",
        "href": "https://www.seattlerotary.org/page/membership",
        "action": "Membership information"
      },
      {
        "name": "Prospective members: plan a visit",
        "text": "Contact Club Director Mary Goldie in advance. The club office is separate from the lunch venue.",
        "href": "https://www.seattlerotary.org/page/contact-us",
        "action": "Club contact"
      }
    ]
  },
  {
    "slug": "redmond-rotary",
    "label": "Rotary Club of Redmond",
    "url": "https://redmondrotary.org/",
    "headline": "Find the right meeting or way to help.",
    "description": "Keep your date and goal together as you explore meetings, volunteering or club support.",
    "questions": [
      "Is there a Thanksgiving meeting?",
      "Find a December visitor meeting",
      "Explore volunteer opportunities",
      "Check Stinky Spoke 2027"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Bookings, membership, assignments and payments finish in the club’s own services.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the date or another detail."
      }
    ],
    "sources": [
      {
        "label": "Meeting schedule and club services",
        "url": "https://redmondrotary.org/"
      },
      {
        "label": "Club contact",
        "url": "https://redmondrotary.org/?s=contact"
      },
      {
        "label": "District meeting guide",
        "url": "https://district5030.org/clubs/"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "Visitor meetings",
        "text": "No Thanksgiving, Christmas Eve or New Year’s Eve meeting. Other Thursdays have different venues; fifth-Thursday arrangements remain undecided.",
        "href": "https://redmondrotary.org/",
        "action": "Current meeting schedule"
      },
      {
        "name": "Membership",
        "text": "Ask Membership Chair David North about joining and current requirements.",
        "href": "https://redmondrotary.org/?s=contact",
        "action": "Membership contact"
      },
      {
        "name": "Volunteer updates",
        "text": "Ask about future volunteer opportunities and their requirements through the club’s published contact.",
        "href": "https://redmondrotary.org/?s=contact",
        "action": "Volunteer contact"
      },
      {
        "name": "Club dues",
        "text": "Use the club’s dues service to check the correct amount and recipient. Foundation donations are a separate path.",
        "href": "https://secure.etransfer.com/EFT/blockcodeEvent_v2/payment1.cfm?d2org=RotaryClubofRedmond&d2tool=payment",
        "action": "Pay club dues"
      },
      {
        "name": "Foundation support",
        "text": "Use the Foundation’s own donation service. It does not pay your club dues.",
        "href": "https://secure.etransfer.com/eft/flexblockcode/donation1.cfm?d2org=RCRFoundation&d2tool=donate",
        "action": "Foundation donation"
      },
      {
        "name": "Stinky Spoke 2027",
        "text": "The club lists a tentative February event at Redmond Senior & Community Center. Confirm the day and registration with the club.",
        "href": "https://redmondrotary.org/?s=contact",
        "action": "Confirm event details"
      }
    ]
  },
  {
    "slug": "bellevue-sunrise-rotary",
    "label": "Bellevue Sunrise Rotary",
    "url": "https://www.bellevuesunriserotary.org/",
    "headline": "Plan a visit or a way to help.",
    "description": "Keep the meeting date, grocery list or project you care about together through your next question.",
    "questions": [
      "Who speaks on December 1?",
      "What goes in the December 1 grocery bags?",
      "Ask about appliance assistance",
      "How do I apply for membership?"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Applications, Zoom requests, donations and volunteer assignments finish in the club’s own services.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the date or another detail."
      }
    ],
    "sources": [
      {
        "label": "December 1 program",
        "url": "https://www.bellevuesunriserotary.org/josh-walter-nuclear-energy/"
      },
      {
        "label": "Meetings and grocery list",
        "url": "https://www.bellevuesunriserotary.org/"
      },
      {
        "label": "Membership and native forms",
        "url": "https://www.bellevuesunriserotary.org/about-us/"
      },
      {
        "label": "Club projects",
        "url": "https://www.bellevuesunriserotary.org/projects/"
      },
      {
        "label": "Medical scholarship",
        "url": "https://www.bellevuesunriserotary.org/rotary-scholarship/"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "Visit on December 1",
        "text": "Dr. Josh Walter on nuclear energy. Published meeting: 7–8:30 a.m. Pacific at Cascades Grille, Embassy Suites Bellevue.",
        "href": "https://www.bellevuesunriserotary.org/josh-walter-nuclear-energy/",
        "action": "Program details"
      },
      {
        "name": "Membership",
        "text": "Use Sunrise’s own application and confirm current dues with the club. The linked Edmonds handbook describes a different club.",
        "href": "https://portals.compass-360.org/Compass360WebUserServices08/org=bellevuesunriserotary.org/request=questionnairePortal/questionnaireId=EBD49840-5AAC-49A3-AB3E-6DBFFA345BB7",
        "action": "Membership application"
      },
      {
        "name": "Appliance assistance",
        "text": "Ask the club about qualification and local screening. An appliance, cash award or delivery date is not guaranteed.",
        "href": "https://www.bellevuesunriserotary.org/neighborhood-appliance-replacement-program/",
        "action": "Program details"
      },
      {
        "name": "Grant proposals",
        "text": "Use the club’s native proposal route and confirm current criteria and deadlines. A past recipient list is not eligibility.",
        "href": "https://portals.compass-360.org/Compass360WebUserServices08/org=bellevuesunriserotary.org/request=questionnairePortal/questionnaireId=A3C4DDFC-8418-4D83-8CC3-9F6479756F6D",
        "action": "Grant proposal"
      },
      {
        "name": "Fundraising",
        "text": "The listed August 12, 2026 croquet event is past. Ask the club about current ways to support its work.",
        "href": "https://www.bellevuesunriserotary.org/fundraising/",
        "action": "Fundraising details"
      },
      {
        "name": "December grocery bags",
        "text": "Use the dated list: two bars of soap for December 1, shampoo for December 8. Confirm volunteer changes with the club.",
        "href": "https://www.bellevuesunriserotary.org/",
        "action": "Current grocery list"
      },
      {
        "name": "Medical scholarship",
        "text": "Read about supporting the WSU medical scholarship fund. This page does not establish an open student application.",
        "href": "https://www.bellevuesunriserotary.org/rotary-scholarship/",
        "action": "Scholarship details"
      }
    ]
  },
  {
    "slug": "wmfha",
    "label": "WMFHA",
    "url": "https://www.wmfha.org/",
    "headline": "Find the right class, company account or supplier.",
    "description": "Keep your topic, company role or service area together through the next question.",
    "questions": [
      "Which December webinar covers practical AI?",
      "How do I view a member-company invoice?",
      "Find a painter serving the Eastside",
      "Can I still apply to speak at EdCon?"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Registration, invoices, applications and payments stay in WMFHA’s own services.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the topic, company role or another detail."
      }
    ],
    "sources": [
      {
        "label": "December AI webinar",
        "url": "https://www.wmfha.org/events/multifamily-insider-webinar-immediate-impact-practical-ai-tools-for-property-teams"
      },
      {
        "label": "Regional manager webinar",
        "url": "https://www.wmfha.org/events/multifamily-insider-webinar-maximizing-success-for-current-and-future-regional-property-managers"
      },
      {
        "label": "Company membership",
        "url": "https://www.wmfha.org/membership-information"
      },
      {
        "label": "Supplier directory",
        "url": "https://www.wmfha.org/statewide-supplier-directory"
      },
      {
        "label": "EdCon speaker guidance",
        "url": "https://www.wmfha.org/edcon-2027-speaker-application-info-page"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "December 16 AI webinar",
        "text": "Chelsea Kneeland, 11 a.m.–noon PST. One CEC for CAM, CAPS, CALP and AIME holders.",
        "href": "https://www.wmfha.org/events/multifamily-insider-webinar-immediate-impact-practical-ai-tools-for-property-teams",
        "action": "Webinar details"
      },
      {
        "name": "Member Compass",
        "text": "Use your existing company account for invoices and member services. Available invoices depend on your account permissions.",
        "href": "https://www.wmfha.org/member-compass",
        "action": "Open Member Compass"
      },
      {
        "name": "Supplier directory",
        "text": "Filter by expertise and service area, then confirm insurance and service directly with the supplier.",
        "href": "https://www.wmfha.org/statewide-supplier-directory",
        "action": "Find suppliers"
      },
      {
        "name": "EdCon 2027 speakers",
        "text": "The call closed November 8. The March 23 conference date does not reopen applications.",
        "href": "https://www.wmfha.org/edcon-2027-speaker-application-info-page",
        "action": "Read speaker guidance"
      },
      {
        "name": "Company membership",
        "text": "Compare company types and regional dues. Individual employees use their member company’s account route.",
        "href": "https://www.wmfha.org/membership-information",
        "action": "Membership options"
      }
    ],
    "toolsComingSoon": "Coming soon: connected company-account help once WMFHA authorizes access."
  },
  {
    "slug": "crew-seattle",
    "label": "CREW Seattle",
    "url": "https://seattle.crewnetwork.org/",
    "headline": "Find the right event, access or career program.",
    "description": "Keep your Seattle event, member role or career goal together through the next question.",
    "questions": [
      "What is the next Seattle networking event?",
      "Does a nonmember account include CREWbiz?",
      "Is the $150 mentoring program open?",
      "Where does a college group start?"
    ],
    "scope": "Selected official public pages checked November 25, 2026. Registration, renewal, payments and private member work stay in CREW’s own systems.",
    "entry": [
      {
        "label": "Try it",
        "text": "Ask a question, then change the event, your role or another detail."
      }
    ],
    "sources": [
      {
        "label": "Seattle events",
        "url": "https://seattle.crewnetwork.org/events/view-all-events?from=2026-11-25&to=2029-12-30&chapters=CN%2CSEA&page=1"
      },
      {
        "label": "January lunch",
        "url": "https://seattle.crewnetwork.org/en/events/2027/january-lunch-program"
      },
      {
        "label": "Membership",
        "url": "https://seattle.crewnetwork.org/join"
      },
      {
        "label": "Mentoring",
        "url": "https://seattle.crewnetwork.org/get-involved/mentoring"
      },
      {
        "label": "Leadership",
        "url": "https://seattle.crewnetwork.org/events/leadership-series"
      },
      {
        "label": "Career outreach",
        "url": "https://seattle.crewnetwork.org/get-involved/career-outreach"
      }
    ],
    "accent": "#1f2937",
    "widgetUrl": "",
    "teamView": [],
    "tools": [
      {
        "name": "January 14 lunch",
        "text": "Xander Snyder’s economic forecast, 11:15 a.m.–1 p.m. PST. Venue is TBD; published fees are $75 members and $105 nonmembers.",
        "href": "https://seattle.crewnetwork.org/en/events/2027/january-lunch-program",
        "action": "January details"
      },
      {
        "name": "Membership and renewal",
        "text": "Compare categories or use your existing member account to renew.",
        "href": "https://seattle.crewnetwork.org/join",
        "action": "Membership options"
      },
      {
        "name": "CREWbiz",
        "text": "Use the member discussion, directory and resources in the native community.",
        "href": "https://seattle.crewnetwork.org/get-involved/crewbiz-online-community",
        "action": "Explore CREWbiz"
      },
      {
        "name": "Mentoring",
        "text": "The published $150 cohort is from 2025–2026. Ask the chapter about the next cohort.",
        "href": "https://seattle.crewnetwork.org/get-involved/mentoring",
        "action": "Mentoring details"
      },
      {
        "name": "Career center",
        "text": "Search national employer listings by location. A listing is not a chapter staff vacancy.",
        "href": "https://careers.crewnetwork.org/jobseekers/",
        "action": "Search jobs"
      },
      {
        "name": "College career exploration",
        "text": "UCREW introduces college students to commercial real estate through local chapters.",
        "href": "https://crewnetwork.org/get-involved/career-outreach-programs/ucrew",
        "action": "Explore UCREW"
      }
    ],
    "toolsComingSoon": "Coming soon: connected member-account help once CREW Seattle authorizes access."
  },
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
