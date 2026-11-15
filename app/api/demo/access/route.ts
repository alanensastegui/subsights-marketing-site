import { NextRequest, NextResponse } from 'next/server';
import { PRIVATE_DEMO_IDENTITIES } from '@/lib/demo/config/private-identities';
import { getProspectDemo } from '@/lib/demo/config/prospects';
import { getCustomerDemoTarget } from '@/lib/demo/config/customer-targets';
import { getComparison } from '@/lib/demo/comparisons';
import { getDemoEngagement } from '@/lib/demo/engagement';
const API = process.env.SUBSIGHTS_BOT_API_URL || 'https://bot-api.subsights.com';
const headers = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer' };
export async function POST(request: NextRequest) {
  const unavailable = () => NextResponse.json({ message: 'Demo unavailable.' }, { status: 404, headers });
  const authorization = request.headers.get('authorization') || '';
  if (!/^Basic [A-Za-z0-9_-]{8,256}$/.test(authorization)) return unavailable();
  let slug: string;
  try { const body = await request.json(); slug = typeof body?.slug === 'string' ? body.slug : ''; } catch { return unavailable(); }
  const identity = Object.hasOwn(PRIVATE_DEMO_IDENTITIES, slug) ? PRIVATE_DEMO_IDENTITIES[slug] : null;
  if (!identity) return unavailable();
  try {
    const access = await fetch(`${API}/demo/access?bot=${encodeURIComponent(identity.bot)}`, {
      headers: { Authorization: authorization, Workspace: identity.workspace },
      cache: 'no-store', signal: AbortSignal.timeout(4000),
    });
    if (!access.ok) return unavailable();
    const verified = await access.json();
    if (verified.chatbot !== identity.bot || verified.workspace !== identity.workspace) return unavailable();
    const prospect = getProspectDemo(slug, authorization.slice(6));
    const target = getCustomerDemoTarget(slug);
    if (!prospect && !target) return unavailable();
    const widgetUrl = new URL('https://widget.subsights.com/index.html');
    widgetUrl.search = new URLSearchParams({ view: 'inline', workspace_id: identity.workspace }).toString();
    widgetUrl.hash = new URLSearchParams({ api_key: authorization.slice(6) }).toString();
    return NextResponse.json({
      prospect: prospect ? { ...prospect, widgetUrl: widgetUrl.href } : null,
      target: target ? { slug: target.slug, label: target.label, url: target.url } : null,
      widgetUrl: widgetUrl.href,
      comparison: prospect ? getComparison(slug) : null,
      measured: prospect ? await getDemoEngagement(slug, { authorization, workspace: identity.workspace }) : null,
    }, { headers });
  } catch { return unavailable(); }
}
