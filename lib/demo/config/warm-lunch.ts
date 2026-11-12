import type { ProspectDemo } from './prospects';

// Prepared in the existing demo renderer. These are absent from public demo
// registries and remain unavailable until the owner supplies the corresponding
// bot's public embed key after admission and real answer checks. A key enables
// an unlisted public route, not an authenticated private page.
export const WARM_LUNCH_DEMOS: {
  keyEnv: string;
  demo: Omit<ProspectDemo, 'widgetUrl'>;
}[] = [
  {
    keyEnv: 'SUBSIGHTS_KIRKLAND_FOUNDATION_WIDGET_KEY',
    demo: {
      slug: 'kirkland-community-foundation',
      label: 'Kirkland Community Foundation',
      url: 'https://kirklandcommunity.org/',
      headline: 'Find your way to give, volunteer or start something good.',
      description: 'Explore a community idea, a giving circle or a fund. Keep your goal in the conversation and find the Foundation’s published next step.',
      questions: [
        'I have a community project idea. Where do I start?',
        'Could an $80 neighborhood project fit a Spark grant?',
        'I can volunteer my skills. Who should I contact?',
        'How do giving circles and opening a fund differ?',
      ],
      scope: 'Uses selected public Foundation information checked November 12, 2026. The Foundation already provides giving pages and project inquiry forms. This preview helps choose a route; it cannot submit an inquiry, accept a donation, approve a grant or give personal tax advice.',
      sources: [
        { label: 'Foundation programs and inquiry options', url: 'https://kirklandcommunity.org/' },
        { label: 'Contact the Foundation', url: 'https://kirklandcommunity.org/contact/' },
      ],
      accent: '#1d594a',
      tools: [
        { name: 'Project or volunteering inquiry', text: 'Tell the Foundation about your idea or skills through its contact page.', href: 'https://kirklandcommunity.org/contact/', action: 'Contact the Foundation' },
        { name: 'Giving circles', text: 'Explore the Foundation’s two published giving-circle routes.', href: 'https://kirklandcommunity.org/kirkland-womens-giving-circle/', action: 'Women’s Giving Circle' },
        { name: 'Kirkland Charitable Collective', text: 'Read the other published giving-circle option.', href: 'https://kirklandcommunity.org/kirkland-charitable-collective/', action: 'Explore the Collective' },
        { name: 'Open a fund', text: 'Start with the published donor-advised fund information.', href: 'https://kirklandcommunity.org/donor-advised-funds/', action: 'Explore a fund' },
      ],
      teamView: [],
    },
  },
  {
    keyEnv: 'SUBSIGHTS_SIMPLY_BOLD_WIDGET_KEY',
    demo: {
      slug: 'simply-bold-design',
      label: 'Simply Bold Design',
      url: 'https://www.simplybolddesign.com/',
      headline: 'Refresh your room around the pieces you love.',
      description: 'Explore a room refresh without a remodel. Talk through what stays, your household and buying at your own pace, then follow the existing consultation route.',
      questions: [
        'Can we refresh our living room without remodeling?',
        'I want to keep my sofa and table. Can the design work around them?',
        'Can I buy the recommended pieces over several months?',
        'How do I arrange a discovery call?',
      ],
      scope: 'Uses Simply Bold Design’s public FAQ and contact page checked November 12, 2026. Its FAQ already explains retained furniture, phased purchases and the design process. The contact form leads to its discovery-call calendar. This preview cannot quote a package, submit the form or book a call.',
      sources: [
        { label: 'Design FAQs', url: 'https://www.simplybolddesign.com/faq' },
        { label: 'Discovery call inquiry', url: 'https://www.simplybolddesign.com/contact' },
      ],
      accent: '#535b40',
      tools: [
        { name: 'Explore the process', text: 'Read the designer’s answers about scope, retained furniture and shopping.', href: 'https://www.simplybolddesign.com/faq', action: 'Read the FAQs' },
        { name: 'Discovery call', text: 'Complete the existing contact form to reach the complimentary discovery-call calendar.', href: 'https://www.simplybolddesign.com/contact', action: 'Start your inquiry' },
      ],
      teamView: [],
    },
  },
  {
    keyEnv: 'SUBSIGHTS_BERNADETTE_WIDGET_KEY',
    demo: {
      slug: 'captured-by-bernadette',
      label: 'Captured by Bernadette',
      url: 'https://www.capturedbybernadette.com/',
      headline: 'Find the photography collection that fits your plans.',
      description: 'Explore a small wedding, an elopement or a local session. Change the location or group size, then take your questions to the photographer’s existing inquiry form.',
      questions: [
        'How does a micro wedding differ from an elopement?',
        'What are the published starting prices for wedding collections?',
        'Would the local session fit five people near Snohomish?',
        'How do I ask about my date and location?',
      ],
      scope: 'Uses published collection details and FAQs checked November 12, 2026. The existing site already explains collections, delivery and inquiries. Starting prices are not a personal quote. This preview cannot confirm a date, reserve a session, accept a payment or guarantee a permit.',
      sources: [
        { label: 'Collection details and pricing', url: 'https://www.capturedbybernadette.com/snohomish-sedonaweddingcollectionpricing' },
        { label: 'Wedding and elopement FAQs', url: 'https://www.capturedbybernadette.com/faqweddingelopements' },
        { label: 'General photography FAQs', url: 'https://www.capturedbybernadette.com/frequentlyaskedquestions' },
      ],
      accent: '#754d39',
      tools: [
        { name: 'Published collections', text: 'Compare starting prices and session details on the photographer’s own page.', href: 'https://www.capturedbybernadette.com/snohomish-sedonaweddingcollectionpricing', action: 'Explore collections' },
        { name: 'Your date and plans', text: 'Use the photographer’s inquiry form for current availability and a personal quote.', href: 'https://www.capturedbybernadette.com/snohomishweddingphotographerinquire', action: 'Ask about your plans' },
      ],
      teamView: [],
    },
  },
];

export function getWarmLunchDemo(
  slug: string,
  env: Record<string, string | undefined> = process.env,
): ProspectDemo | null {
  const prepared = WARM_LUNCH_DEMOS.find(({ demo }) => demo.slug === slug);
  if (!prepared) return null;
  const key = env[prepared.keyEnv]?.trim();
  if (!key) return null;
  const widget = new URL('https://widget.subsights.com/index.html');
  widget.searchParams.set('view', 'inline');
  widget.searchParams.set('workspace_id', '0XvceSLk1j');
  widget.searchParams.set('api_key', key);
  return { ...prepared.demo, widgetUrl: widget.toString() };
}
