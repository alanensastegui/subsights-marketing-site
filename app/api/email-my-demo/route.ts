import { NextResponse } from "next/server";
import { z } from "zod";
import { EmailMyDemoSchema } from "@/app/(site)/email-my-demo/sections/form-schema";
import { getEnvVar, isProd } from "@/lib/env";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = EmailMyDemoSchema.safeParse(json);
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return NextResponse.json({ ok: false, errors: tree }, { status: 400 });
    }

    const data = result.data;

    // Fire-and-forget: forward to Discord webhook if configured
    const webhookUrl = getEnvVar("DISCORD_WEBHOOK_URL_EMAIL_MY_DEMO");
    if (webhookUrl) {
      const contentParts: string[] = [
        "New demo request:",
        `• Name: ${data.firstName} ${data.lastName}`,
        `• Email: ${data.email}`,
        `• Company: ${data.company ?? "—"}`,
        `• Website: ${data.website ?? "—"}`,
        `• Marketing Opt-In: ${data.marketingOptIn ? "Yes" : "No"}`,
      ];
      if (!isProd) {
        contentParts.push("Test Request (ignore)");
      }
      const content = contentParts.join("\n");

      // Best-effort; do not block response on failures
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      }).then(() => console.log("Discord webhook sent")).catch((err) => {
        console.warn("Discord webhook failed:", err);
      });
    } else {
      console.warn("DISCORD_WEBHOOK_URL_EMAIL_MY_DEMO / DISCORD_WEBHOOK_URL not set; skipping Discord forwarding.");
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
