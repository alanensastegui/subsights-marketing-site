import { NextResponse } from "next/server";
import { z } from "zod";
import { EmailMyDemoSchema } from "@/app/(site)/email-my-demo/sections/form-schema";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = EmailMyDemoSchema.safeParse(json);
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      return NextResponse.json({ ok: false, errors: tree }, { status: 400 });
    }

    const data = result.data;

    // TODO: Integrate with email service, CRM, or queue
    // For now, just log minimal info (avoid logging PII broadly in production)
    console.log("email-my-demo submission", {
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      website: data.website,
      marketingOptIn: data.marketingOptIn,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}
