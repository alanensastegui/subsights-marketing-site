import Hero from './sections/hero';
import IndustryRoutes from './sections/industry-routes';
import TrustedBy from './sections/trusted-by';
import ManagedService from './sections/managed-service';
import ManagedPlans from './sections/managed-plans';
import Founder from './sections/founder';

export default function Home() {
  const Sections = [
    Hero,
    IndustryRoutes,
    TrustedBy,
    ManagedService,
    ManagedPlans,
    Founder,
  ];
  return (
    <main className="-mx-6">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
