export type DemoMode = "proxy" | "iframe" | "default";
export type DemoPolicy = "auto" | DemoMode;
export type DemoVariant = "default" | "estoPhoenix";

export type DemoTarget = {
  slug: string;
  url: string;
  label: string;
  testMessage: string; // test message to send to the chatbot
  scriptTag: string; // Full script tag from sales (e.g., <script src="..." data-workspace="..." data-api-key="..."></script>)
  variant?: DemoVariant; // demo variant - defaults to "default" if not specified
  // optional controls
  policy?: DemoPolicy; // default: "auto"
  allowIframe?: boolean; // override when you *know* iframe is OK
  timeoutMs?: number; // fetch timeout for proxy
  maxHtmlBytes?: number; // safety cap (e.g., 2_000_000)
};

export const DEMO_TARGETS: DemoTarget[] = [
  {
    slug: "forks",
    url: "https://www.forkswa.com",
    label: "Forks, WA",
    testMessage: "Hi, where can I find a good",
    scriptTag:
      '<script src="https://widget.latest.subsights.com/chatbot.js" data-workspace="I6BHboKbqb" data-api-key="4yO7Z30ZFFZ79w75v5d1VqYhfHX63z44"></script>',
    variant: "default",
  },
  {
    slug: "seattle-chamber",
    url: "https://www.seattlechamber.com/",
    label: "Seattle Chamber",
    testMessage:
      "Hi, I want to open up a coffee shop in Seattle. What do I need to do?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="9l1V6iBeIO9Rhmo9ILRsP9Rq7xtwvj2u"></script>',
    variant: "default",
  },
  {
    slug: "phoenix-2025",
    url: "https://www.subsights.com",
    label: "Phoenix",
    testMessage: "Hi, what are some good AI sessions I could attend this week?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key="m8CbV0kVKAgdDF7CYZPLdLKNWO24asBD"></script>',
    variant: "estoPhoenix",
    policy: "default",
  },
  {
    slug: "business-impact-nw",
    url: "https://businessimpactnw.org/",
    label: "Business Impact NW",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="Afr6bSyHnD9cZh41CU88gnvXztbdQNxe"></script>',
    variant: "default",
  },
  {
    slug: "cesi",
    url: "https://www.4cesi.com/",
    label: "CESI",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="9GcLTB5PakGlQ0y7LwlEvDOum7Ma68ms"></script>',
    variant: "default",
  },
  {
    slug: "cleanupguys",
    url: "https://cleanupguys.com/",
    label: "Clean Up Guys",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="ZOkSEOZS2gFSKJIOZZjNPuEp1YXG88nR"></script>',
    variant: "default",
  },
  {
    slug: "enrepreneurs-source",
    url: "https://entrepreneurssource.com/",
    label: "Entrepreneurs Source",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="cgbjGx4QO1oFbn5yq2icsalng2ZfUuEe"></script>',
    variant: "default",
  },
  {
    slug: "eugene-cascades",
    url: "https://www.eugenecascadescoast.org/",
    label: "Eugene Cascades",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="4AnNmgC3ljmuZE1B2j7e3STKChNxuA6s"></script>',
    variant: "default",
  },
  {
    slug: "featuregraphics",
    url: "https://www.featuregraphicsrendering.com/",
    label: "Feature Graphics",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="kxIYnpZo2G6LTeE8h2EkbDG3D8KLWwb0"></script>',
    variant: "default",
  },
  {
    slug: "finfit-life",
    url: "https://www.finfitlife.com/",
    label: "Finfit Life",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="2oILFGTGuCZQcO9PidMSBcRNl2HfryL8"></script>',
    variant: "default",
  },
  {
    slug: "fresno-county",
    url: "https://www.visitfresnocounty.org/",
    label: "Fresno",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="UrjpPGx7x5nJ1dmuktIMf7CbpEGoCvqt"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "growing-contigo",
    url: "https://www.growingcontigo.com/",
    label: "Growing Contigo",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="nA52NxLiWu3rk1QWKuTbyZXDnCWfy0cK"></script>',
    variant: "default",
  },
  {
    slug: "gsba",
    url: "https://thegsba.org/",
    label: "GSBA",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="orE02naKJ0ZZt7JbpqB3gaAfbCquXzXy"></script>',
    variant: "default",
  },
  {
    slug: "hc",
    url: "https://www.highline.edu/",
    label: "Highline College",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="EsFwua1KIwihRp5Df16iVzYlybRgNwA1"></script>',
    variant: "default",
  },
  {
    slug: "jlt",
    url: "https://www.jltwebsolutions.com/",
    label: "JLT Web Design & Digital Marketing",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="pZD0ejN8CLjnnAsC5GE8xruAcmofnBns"></script>',
    variant: "default",
  },
  {
    slug: "laguna-beach",
    url: "https://www.visitlagunabeach.com",
    label: "Laguna Beach",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="HZToz7MxDHAK7oJydduT7FyiAXt1a5ci"></script>',
    variant: "default",
  },
  {
    slug: "lake-tahoe",
    url: "https://visitlaketahoe.com/",
    label: "Lake Tahoe",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="L93pi60wgvK4PZjH98giOmmZfYriqesT"></script>',
    variant: "default",
  },
  {
    slug: "lithtex-nw",
    url: "https://www.lithtexnw.com/",
    label: "Lithtex",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="cNOO8kH9QWc2GWGFaNFQMPuHUabKcvGY"></script>',
    variant: "default",
  },
  {
    slug: "massage-reimagined",
    url: "https://massagereimagined.com/",
    label: "Massage Reimagined",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="3vRaqoLArV" data-api-key="1qSJwOfNURI2NRZfeXd2CqCS3fDMkTQA"></script>',
    variant: "default",
  },
  {
    slug: "monterey",
    url: "https://www.seemonterey.com/",
    label: "Monterey",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="RK1SFqZA1KpiWYZborO68ktCjHMsMJqW"></script>',
    variant: "default",
  },
  {
    slug: "newport-beach",
    url: "https://visitnewportbeach.com/",
    label: "Newport Beach",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="rAQrEeJt4vREeHMK6C8KYSJrWnZefKLd"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "oakland",
    url: "https://www.visitoakland.com/",
    label: "Oakland",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="IndQMjbsV7ZBiFKdZJAjz5CrVlK04LaX"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "palm-springs",
    url: "https://visitpalmsprings.com/",
    label: "Palm Springs",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="l6GDHxi0N3G4EW5QWTZpIhJnRJSvKzcD"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "redfish-lake",
    url: "https://redfishlake.com/",
    label: "Redfish Lake",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="5qbYO9C3MoDulbSKWsbaPbHozyuQzRCi"></script>',
    variant: "default",
  },
  {
    slug: "safariyellowstone",
    url: "https://www.safariyellowstone.com/",
    label: "Safari Yellowstone",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="8JTv8TZcLT02wW4QLqCLdwQS0NLoP1Pr"></script>',
    variant: "default",
  },
  {
    slug: "santa-cruz",
    url: "https://www.santacruz.org/",
    label: "Santa Cruz",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="9Z6gAchgUgFVI0bGQwL6gswoKNdDbteR"></script>',
    variant: "default",
  },
  {
    slug: "santa-monica",
    url: "https://www.santamonica.com/",
    label: "Santa Monica",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="VRabj3ytY4iRZXj7N27Xv4UxbaMED25e"></script>',
    variant: "default",
  },
  {
    slug: "santa-rosa",
    url: "https://www.visitsantarosa.com/",
    label: "Santa Rose",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="FOZk4Q6bgoIG8Q3edmu73BEVZZbTGY29"></script>',
    variant: "default",
  },
  {
    slug: "second-love",
    url: "https://www.secondlovecoffeeroasters.com/",
    label: "Second Love",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="7y8BF0r34qIwmbsEOmRY6TpKlYlMFXnw"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "sonoma-county",
    url: "https://www.sonomacounty.com/",
    label: "Sonoma County",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="vH2lR6fXQDingxT4kh7DnfhbSldQ2gsr"></script>',
    variant: "default",
  },
  {
    slug: "southside-chamber",
    url: "https://www.seattlesouthsidechamber.com/",
    label: "Southside Chamber",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="dB1ULbVjEgUUZupEo1QoGxPSeWf2kGut"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "stockton",
    url: "https://www.visitstockton.org/",
    label: "Stockton",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="GnDm5LyL6vDUj1iOGrjSoNIJZb8dnpl0"></script>',
    variant: "default",
  },
  {
    slug: "twin-falls",
    url: "https://www.twinfallschamber.com/visit/",
    label: "Twin Falls",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="PZINHCGB30LGIzOTTd9PjhbvJ1r8Ml6y"></script>',
    variant: "default",
  },
  {
    slug: "bouldercoloradousa",
    url: "https://www.bouldercoloradousa.com/",
    label: "Visit Boulder",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="YJeRNl4uTB5jhrbv9I2KbMaL28dwH4Rl"></script>',
    variant: "default",
    policy: "default",
  },
  {
    slug: "irvine",
    url: "https://www.destinationirvine.com",
    label: "Visit Irvine",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="alRUr8yGLO71Y0MGtHxXvwz6lUqqFIco"></script>',
    variant: "default",
  },
  {
    slug: "oregon-coast",
    url: "https://visittheoregoncoast.com/",
    label: "Visit Oregon Coast",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="G1vwACnysvilFgwezZb6fXrBkUsuXV0N"></script>',
    variant: "default",
  },
  {
    slug: "redding",
    url: "https://visitredding.com/",
    label: "Visit Redding",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="mRgCMAhx8l" data-api-key="rVL4ECveLPGOUtQciRcYL5XnsWWwmAHJ"></script>',
    variant: "default",
  },
  {
    slug: "watchtower",
    url: "https://www.watchtowerits.com/",
    label: "WatchTower IT",
    testMessage: "Hi, where can I find a good place to eat?",
    scriptTag:
      '<script src="https://widget.subsights.com/chatbot.js" data-workspace="0XvceSLk1j" data-api-key="KDKqFBuiqwiYegMqGh56Jmna5aHN4Ys5"></script>',
    variant: "default",
  },
];

export const getDemoTarget = (slug: string) =>
  DEMO_TARGETS.find((d) => d.slug === slug) ?? null;
