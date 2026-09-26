import Hero from "./sections/hero";
import IndustryRoutes from "./sections/industry-routes";
import StrategicAIPartner from "./sections/strategic-ai-partner/server";
import UseCases from "./sections/use-cases";
import ScaleReduceCosts from "./sections/scale-reduce-costs";
import TrustedBy from "./sections/trusted-by";
import CustomerQuote from "./sections/customer-quote";
import Stats from "./sections/stats";
import CallToAction from "./sections/call-to-action";

export default function Home() {
  const Sections = [Hero, IndustryRoutes, TrustedBy, ScaleReduceCosts, StrategicAIPartner, UseCases, CustomerQuote, Stats, CallToAction];

  return (
    <main className="min-h-screen">
      {Sections.map((S, i) => <S key={i} />)}
    </main>
  );
}
