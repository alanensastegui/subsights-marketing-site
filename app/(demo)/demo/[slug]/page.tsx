import DemoPageClient from "@/components/demo/demo-client-page";

export const dynamic = "force-dynamic"; // put this on the server page

export default function Page({ params }: { params: { slug: string } }) {
  return <DemoPageClient slug={params.slug} />;
}
