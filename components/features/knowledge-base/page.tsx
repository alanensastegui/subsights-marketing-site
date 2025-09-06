import Placeholder from "./sections/placeholder";

export default function KnowledgeBasePage() {
  // Custom page layout for knowledge base feature
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
