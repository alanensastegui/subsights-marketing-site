import 'server-only';
export type DemoMode = "proxy" | "iframe" | "default";
export type DemoPolicy = "auto" | DemoMode;
export type DemoVariant = "default" | "estoPhoenix";

export type DemoTarget = {
  slug: string;
  url: string;
  label: string;
  testMessage: string; // test message to send to the chatbot
  scriptTag: string; // Full script tag from sales (e.g., <script src="..." data-workspace="..." data-api-key=""></script>)
  variant?: DemoVariant; // demo variant - defaults to "default" if not specified
  // optional controls
  policy?: DemoPolicy; // omitted or "auto": assistant; proxy/iframe require opt-in
  allowIframe?: boolean; // override when you *know* iframe is OK
  timeoutMs?: number; // fetch timeout for proxy
  maxHtmlBytes?: number; // safety cap (e.g., 2_000_000)
};

export const CUSTOMER_DEMO_TARGETS: DemoTarget[] = [
  {
    slug: "kirkland-chamber",
    url: "https://www.kirklandchamber.org/",
    label: "Kirkland Chamber of Commerce",
    testMessage: "How can the Kirkland Chamber help my local business, and how do I join?",
    scriptTag:
      "<script src=\"https://widget.subsights.com/chatbot.js\" data-workspace=\"0XvceSLk1j\" data-api-key=\"\" defer></script>",
    variant: "default",
    policy: "default",
  },

  {
    slug: "santa-monica-pier",
    url: "https://www.santamonicapier.org/",
    label: "Santa Monica Pier",
    testMessage: "I am a professional photographer. Where are some popular spots to take photos?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "seattle-chamber",
    url: "https://www.seattlechamber.com/",
    label: "Seattle Chamber",
    testMessage:
      "Hi, I want to open up a coffee shop in Seattle. What do I need to do?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "phoenix-2025",
    url: "https://www.subsights.com",
    label: "Phoenix",
    testMessage: "Hi, what are some good AI sessions I could attend this week?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "estoPhoenix",
    policy: "default",
  },
  {
    slug: "business-impact-nw",
    url: "https://businessimpactnw.org/",
    label: "Business Impact NW",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "cesi",
    url: "https://www.4cesi.com/",
    label: "CESI",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "cleanupguys",
    url: "https://cleanupguys.com/",
    label: "Clean Up Guys",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "enrepreneurs-source",
    url: "https://entrepreneurssource.com/",
    label: "Entrepreneurs Source",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "eugene-cascades",
    url: "https://www.eugenecascadescoast.org/",
    label: "Eugene Cascades",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "featuregraphics",
    url: "https://www.featuregraphicsrendering.com/",
    label: "Feature Graphics",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "finfit-life",
    url: "https://www.finfitlife.com/",
    label: "Finfit Life",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "fresno-county",
    url: "https://www.visitfresnocounty.org/",
    label: "Fresno",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "growing-contigo",
    url: "https://www.growingcontigo.com/",
    label: "Growing Contigo",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "gsba",
    url: "https://thegsba.org/",
    label: "GSBA",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "hc",
    url: "https://www.highline.edu/",
    label: "Highline College",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "jlt",
    url: "https://www.jltwebsolutions.com/",
    label: "JLT Web Design & Digital Marketing",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "laguna-beach",
    url: "https://www.visitlagunabeach.com",
    label: "Laguna Beach",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "lake-tahoe",
    url: "https://visitlaketahoe.com/",
    label: "Lake Tahoe",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "lithtex-nw",
    url: "https://www.lithtexnw.com/",
    label: "Lithtex",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "luxury-supercars-dubai",
    url: "https://luxurysupercarsdubai.com",
    label: "Luxury Supercars Dubai",
    testMessage: "I'm visiting Dubai soon and want to rent a Lamborghini. Which models are available?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "massage-reimagined",
    url: "https://massagereimagined.com/",
    label: "Massage Reimagined",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "monterey",
    url: "https://www.seemonterey.com/",
    label: "Monterey",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "newport-beach",
    url: "https://visitnewportbeach.com/",
    label: "Newport Beach",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "oakland",
    url: "https://www.visitoakland.com/",
    label: "Oakland",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "palm-springs",
    url: "https://visitpalmsprings.com/",
    label: "Palm Springs",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "redfish-lake",
    url: "https://redfishlake.com/",
    label: "Redfish Lake",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "safariyellowstone",
    url: "https://www.safariyellowstone.com/",
    label: "Safari Yellowstone",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "santa-cruz",
    url: "https://www.santacruz.org/",
    label: "Santa Cruz",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "santa-monica",
    url: "https://www.santamonica.com/",
    label: "Santa Monica",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "santa-rosa",
    url: "https://www.visitsantarosa.com/",
    label: "Santa Rosa",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "second-love",
    url: "https://www.secondlovecoffeeroasters.com/",
    label: "Second Love",
    testMessage: "Which coffee would you suggest for someone who prefers a darker roast?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "sonoma-county",
    url: "https://www.sonomacounty.com/",
    label: "Sonoma County",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "southside-chamber",
    url: "https://www.seattlesouthsidechamber.com/",
    label: "Southside Chamber",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "stockton",
    url: "https://www.visitstockton.org/",
    label: "Stockton",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "twin-falls",
    url: "https://www.twinfallschamber.com/visit/",
    label: "Twin Falls",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "bouldercoloradousa",
    url: "https://www.bouldercoloradousa.com/",
    label: "Visit Boulder",
    testMessage: "We are flying into Denver without a car. How do we get to Boulder?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "irvine",
    url: "https://www.destinationirvine.com",
    label: "Visit Irvine",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "oregon-coast",
    url: "https://visittheoregoncoast.com/",
    label: "Visit Oregon Coast",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "redding",
    url: "https://visitredding.com/",
    label: "Visit Redding",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "cabarstyle",
    url: "https://cabarstyle.com/",
    label: "Cabarstyle",
    testMessage: "Hi, I'm preparing for the CA Bar exam. What programs do you offer to help me pass?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "visit-irving",
    url: "https://www.irvingtexas.com/",
    label: "Visit Irving",
    testMessage: "What family-friendly things to do are near the Las Colinas Entertainment District?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "riverside",
    url: "https://riversidecvb.com/",
    label: "Riverside",
    testMessage: "Hi, I'd like to host a convention in Riverside. What are the best hotels and venues?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "swiftsku",
    url: "https://www.swiftsku.com/",
    label: "SwiftSKU",
    testMessage: "How can I get started?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "aurora",
    url: "https://www.visitaurora.com/",
    label: "Visit Aurora",
    testMessage: "I'm looking into hosting a conference in Aurora",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key=""></script>',
    variant: "default",
  },
  {
    slug: "modesto",
    url: "https://visitmodesto.com/",
    label: "Visit Modesto",
    testMessage: "We have two hours before a Gallo show. What should we do?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key=""></script>',
    variant: "default",
    policy: "default",
  },
];

export const getCustomerDemoTarget = (slug: string) =>
  CUSTOMER_DEMO_TARGETS.find((d) => d.slug === slug) ?? null;
