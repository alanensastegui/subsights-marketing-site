// components/sections/strategic-ai-partner/copy.ts
export type Copy = {
  heading: { line1: string; line2: string };
  description: string;
  valuePropositions: Array<{
    title: string;
    subtext: string;
    chatEmoji: string;
    imageSrc: string;
    imageAlt: string;
  }>;
};

export const strategicCopy: Copy = {
  heading: {
    line1: "Go Beyond Basic Bots",
    line2: "Get a Strategic AI Partner",
  },
  description: "Engineered to execute your business goals with precision",
  valuePropositions: [
    {
      title: "Filter & Qualify Every Lead",
      subtext:
        "Our AI filters for intent, budget, and custom rules, so your sales team only engages with prospects ready to convert.",
      chatEmoji: "🔍",
      imageSrc: "/images/value-props/filter_lead_example.png",
      imageAlt:
        "AI lead filtering and qualification interface showing intent detection and budget analysis",
    },
    {
      title: "Provide Expert, Nuanced Answers",
      subtext:
        "Go beyond FAQs. Our AI handles complex, multi-step questions with the nuance of a human expert, building customer trust around the clock.",
      chatEmoji: "💬",
      imageSrc: "/images/value-props/expert_example.png",
      imageAlt:
        "AI expert conversation interface showing detailed, nuanced responses to complex questions",
    },
    {
      title: "Drive Revenue & Strategic Goals",
      subtext:
        "Our AI intelligently upsells services, applies strategic discounts, and guides every user toward your most important business goals.",
      chatEmoji: "💰",
      imageSrc: "/images/value-props/revenue_example.png",
      imageAlt:
        "AI revenue optimization interface showing upsell opportunities and strategic discount applications",
    },
  ],
} as const;

export const sectionId = "strategic-ai-partner";
