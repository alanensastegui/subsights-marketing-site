import { NextResponse } from 'next/server';
import { z } from 'zod';
import { EmailMyDemoSchema } from '@/app/(site)/email-my-demo/sections/form-schema';
import { getEnvVar, isProd } from '@/lib/env';

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request' },
      { status: 400 }
    );
  }
  const result = EmailMyDemoSchema.safeParse(json);
  if (!result.success)
    return NextResponse.json(
      { ok: false, errors: z.treeifyError(result.error) },
      { status: 400 }
    );

  const webhookUrl = getEnvVar('DISCORD_WEBHOOK_URL_EMAIL_MY_DEMO');
  if (!webhookUrl)
    return NextResponse.json(
      { ok: false, error: 'Request delivery unavailable' },
      { status: 503 }
    );

  const data = result.data;
  const content = [
    isProd ? 'New website question:' : 'Test website question (ignore):',
    `• Name: ${data.firstName} ${data.lastName}`,
    `• Email: ${data.email}`,
    `• Company: ${data.company || 'Not provided'}`,
    `• Website: ${data.website || 'Not provided'}`,
    `• Industry: ${data.industry || 'Not provided'}`,
    `• Marketing Opt-In: ${data.marketingOptIn ? 'Yes' : 'No'}`,
    `• Visitor question: ${data.customerQuestion || 'Not provided'}`,
  ].join('\n');

  try {
    const delivered = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!delivered.ok) throw new Error('Delivery failed');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Request delivery unavailable' },
      { status: 503 }
    );
  }
}
