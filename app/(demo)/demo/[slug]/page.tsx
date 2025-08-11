import DemoPageClient from "@/components/demo/demo-client-page";

export const dynamic = "force-dynamic"; // put this on the server page

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <DemoPageClient slug={slug} />;
}
