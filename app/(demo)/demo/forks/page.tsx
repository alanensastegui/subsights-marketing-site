export { metadata, dynamic } from '../[slug]/page';
import { PrivateDemoPage } from '@/components/demo/private-demo-page';
export default function Page() { return <PrivateDemoPage slug="forks" />; }
