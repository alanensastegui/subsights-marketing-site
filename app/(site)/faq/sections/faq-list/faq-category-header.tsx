import { Animate } from "@/components/ui/animate";
import { Badge } from "@/components/ui/badge";
import { getMeta } from "./meta";

interface FAQCategoryHeaderProps {
  category: string;
  faqCount: number;
  delay?: number;
  showBadge?: boolean;
}

export default function FAQCategoryHeader({
  category,
  faqCount,
  delay = 0,
  showBadge = true
}: FAQCategoryHeaderProps) {
  const meta = getMeta(category);

  return (
    <Animate name="fadeIn" trigger="onVisible" delay={delay}>
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2 rounded-lg ${meta.bgClass}`}>
          <meta.Icon className="w-4 h-4" />
        </div>
        <h3 className="text-2xl font-semibold text-white">{category}</h3>
        {showBadge && (
          <Badge variant="outline" className="ml-auto text-sm">
            {faqCount} question{faqCount !== 1 ? "s" : ""}
          </Badge>
        )}
      </div>
    </Animate>
  );
}
