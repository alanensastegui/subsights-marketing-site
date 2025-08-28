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
    line1: "Go beyond basic bots",
    line2: "Get a Strategic AI Partner",
  },
  description: "Engineered to execute your business goals with precision",
  valuePropositions: [
    {
      title: "Qualify every lead",
      subtext:
        "Filter by intent, budget, and custom rules so sales only sees prospects ready to buy.",
      chatEmoji: "🔍",
      imageSrc: "/images/value-props/filter_lead_example.png",
      imageAlt:
        "AI lead filtering and qualification interface showing intent detection and budget analysis",
    },
    {
      title: "Provide real answers",
      subtext:
        "Go far beyond FAQs. Tackle multi-step, nuanced questions with the clarity of a human expert.",
      chatEmoji: "💬",
      imageSrc: "/images/value-props/expert_example.png",
      imageAlt:
        "AI expert conversation interface showing detailed, nuanced responses to complex questions",
    },
    {
      title: "Drive outcomes",
      subtext:
        "Guide users to the right plan, booking, or product. Suggest upsells and apply targeted incentives.",
      chatEmoji: "💰",
      imageSrc: "/images/value-props/revenue_example.png",
      imageAlt:
        "AI revenue optimization interface showing upsell opportunities and strategic discount applications",
    },
  ],
} as const;

export const sectionId = "strategic-ai-partner";
