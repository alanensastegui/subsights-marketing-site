import {
  Zap, Code, MessageCircle, CreditCard, Shield, BarChart3, HelpCircle,
} from "lucide-react";

export const categories = [
  "Getting Started",
  "Integration & Tools",
  "Features",
  "Pricing & Plans",
  "Security & Privacy",
  "Technical",
] as const;

export type Category = typeof categories[number];

type Meta = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badgeClass: string;
  bgClass: string;
};

export const categoryMeta: Record<Category, Meta> = {
  "Getting Started":     { Icon: Zap,         badgeClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",   bgClass: "bg-blue-500/10 text-blue-400" },
  "Integration & Tools": { Icon: Code,        badgeClass: "bg-green-500/10 text-green-400 border-green-500/20", bgClass: "bg-green-500/10 text-green-400" },
  "Features":            { Icon: MessageCircle,badgeClass: "bg-purple-500/10 text-purple-400 border-purple-500/20", bgClass: "bg-purple-500/10 text-purple-400" },
  "Pricing & Plans":     { Icon: CreditCard,  badgeClass: "bg-orange-500/10 text-orange-400 border-orange-500/20", bgClass: "bg-orange-500/10 text-orange-400" },
  "Security & Privacy":  { Icon: Shield,      badgeClass: "bg-red-500/10 text-red-400 border-red-500/20",      bgClass: "bg-red-500/10 text-red-400" },
  "Technical":           { Icon: BarChart3,   badgeClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", bgClass: "bg-indigo-500/10 text-indigo-400" },
};

export const getMeta = (c: string): Meta =>
  (categoryMeta as Record<string, Meta>)[c] ?? {
    Icon: HelpCircle,
    badgeClass: "bg-white/5 text-gray-400 border-white/10",
    bgClass: "bg-white/10 text-gray-300",
  };