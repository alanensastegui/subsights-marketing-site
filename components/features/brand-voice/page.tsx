import Placeholder from "./sections/placeholder";

export default function BrandPage() {
  // Custom page layout for brand feature
  const Sections = [
    Placeholder,
  ];

  return (
    <main className="min-h-screen">
      {Sections.map((Section, i) => (
        <Section key={i} />
      ))}
    </main>
  );
}
