import { Animate } from "@/components/ui/animate";
import { Globe, FileText, PenTool } from "lucide-react";

type Method = {
  title: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
};

type Copy = {
  title: string;
  subtitle: string;
  methods: Method[];
};

export const sectionId = "how-it-works";

// ---- SECTION COPY REGION ----
const copy = {
  title: "How it works",
  subtitle: "Multiple ways to build your knowledge base—choose what works best for your content and workflow.",
  methods: [
    {
      title: "Train from your website",
      icon: Globe,
      features: [
        "Sitemap (Recommended): Add your entire sitemap at once, or train the AI on specific branches",
        "Single URL: Paste URLs directly for key pages you want to include",
        "Website Crawl: Start on a source page and index all reachable sub-pages",
        "Auto-refresh every 24 hours with training cut-off dates for content control"
      ]
    },
    {
      title: "Direct file uploads",
      icon: FileText,
      features: [
        "Upload .pdf, .md, or .txt files directly to the knowledge base",
        "Perfect for internal price lists and detailed product manuals",
        "Ideal for marketing one-pagers not on your public site",
        "Secure file storage with full control over content access"
      ]
    },
    {
      title: "Manual text input",
      icon: PenTool,
      features: [
        "Simple Text: Create topics with headers and body content",
        "Perfect for company boilerplate or specific policy details",
        "Q&A Pairs: Input questions with exact answers for consistent responses",
        "Quick additions for specific directives and custom knowledge"
      ]
    }
  ]
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function HowItWorks() {
  const c = copy;
  return (
    <section className="relative isolate px-6 py-16 max-w-6xl mx-auto">
      <Animate name="fadeInStagger" trigger="onVisible">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="animate-item text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {c.title}
          </h2>
          <p className="animate-item text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
          </p>
        </div>

        {/* Methods List */}
        <div className="space-y-16">
          {c.methods.map((method) => (
            <div key={method.title} className="animate-item">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                {/* Icon and Title */}
                <div className="flex items-center gap-4 lg:w-80 lg:flex-shrink-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20">
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold tracking-tight lg:text-xl">{method.title}</h3>
                </div>

                {/* Features List */}
                <div className="flex-1">
                  <ul className="space-y-4">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                        <span className="text-base text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Animate>
    </section>
  );
}
