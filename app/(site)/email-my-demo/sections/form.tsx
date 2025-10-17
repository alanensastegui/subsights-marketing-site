"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import Link from "next/link";
import { Animate } from "@/components/ui/animate";
import { EmailMyDemoSchema } from "./form-schema";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Copy = {
  title: string;
  sub: string;
  submittedTitle: string;
  submittedSub: string;
  submittedHint: string;
  submittedCta: { label: string; href: string };
};

export const sectionId = "form";

// ---- SECTION COPY REGION ----
const copy = {
  title: "Email My Demo",
  sub: "Share a few details and we’ll email you a personalized demo link",
  submittedTitle: "We'll email your demo shortly",
  submittedSub: "Keep an eye on your inbox — your personalized demo is on its way.",
  submittedHint: "In the meantime, explore how teams use Subsights to grow.",
  submittedCta: { label: "Explore Case Studies", href: "/case-studies" },
} satisfies Copy;
// ---- /SECTION COPY REGION ----

export default function Section() {
  const c = copy;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    company?: string;
    email?: string;
    website?: string;
  }>({});

  const formValues = { firstName, lastName, company, email, website, marketingOptIn };
  const isFormValid = EmailMyDemoSchema.safeParse(formValues).success;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const result = EmailMyDemoSchema.safeParse(formValues);
    if (!result.success) {
      const tree = z.treeifyError(result.error);
      setErrors({
        firstName: tree.properties?.firstName?.errors?.[0],
        lastName: tree.properties?.lastName?.errors?.[0],
        company: tree.properties?.company?.errors?.[0],
        email: tree.properties?.email?.errors?.[0],
        website: tree.properties?.website?.errors?.[0],
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/email-my-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const serverTree = body?.errors as { properties?: Record<string, { errors?: string[] }> } | undefined;
        if (serverTree?.properties) {
          setErrors({
            firstName: serverTree.properties.firstName?.errors?.[0],
            lastName: serverTree.properties.lastName?.errors?.[0],
            company: serverTree.properties.company?.errors?.[0],
            email: serverTree.properties.email?.errors?.[0],
            website: serverTree.properties.website?.errors?.[0],
          });
        }
        return;
      }
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id={sectionId} className={cn("relative isolate text-foreground py-12")}>
      <div className="mx-auto max-w-2xl px-0">
        <Animate name="fadeInStagger" trigger="onVisible">
          <Card className="animate-item">
            <CardHeader>
              <CardTitle className="text-2xl">{submitted ? c.submittedTitle : c.title}</CardTitle>
              <CardDescription>
                {submitted ? c.submittedSub : c.sub}
              </CardDescription>
            </CardHeader>

            {submitted ? (
              <>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.submittedHint}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    data-analytics-id="email_my_demo_explore"
                    data-analytics-name="Email My Demo - Explore Case Studies"
                    data-analytics-context='{"page":"email_my_demo","state":"submitted"}'
                  >
                    <Link href={c.submittedCta.href}>{c.submittedCta.label}</Link>
                  </Button>
                </CardFooter>
              </>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-6">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First name <span className="text-destructive" aria-hidden>*</span>
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        aria-required="true"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        aria-invalid={errors.firstName ? true : undefined}
                        aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      />
                      {errors.firstName && (
                        <p id="firstName-error" className="text-sm text-destructive">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last name <span className="text-destructive" aria-hidden>*</span>
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        aria-required="true"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Smith"
                        aria-invalid={errors.lastName ? true : undefined}
                        aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      />
                      {errors.lastName && (
                        <p id="lastName-error" className="text-sm text-destructive">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      aria-required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      aria-invalid={errors.company ? true : undefined}
                      aria-describedby={errors.company ? "company-error" : undefined}
                    />
                    {errors.company && (
                      <p id="company-error" className="text-sm text-destructive">
                        {errors.company}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium">
                      Website
                    </label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      inputMode="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      aria-invalid={errors.website ? true : undefined}
                      aria-describedby={errors.website ? "website-error" : undefined}
                    />
                    {errors.website && (
                      <p id="website-error" className="text-sm text-destructive">
                        {errors.website}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Checkbox
                        id="marketingOptIn"
                        name="marketingOptIn"
                        checked={marketingOptIn}
                        onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
                      />
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <label
                            htmlFor="marketingOptIn"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Marketing communications
                          </label>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          I&apos;d like to receive updates about Subsights features, case studies, and industry insights. You can unsubscribe at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    aria-disabled={isSubmitting || !isFormValid}
                    data-analytics-id="email_my_demo_submit"
                    data-analytics-name="Email My Demo - Submit"
                    data-analytics-context='{"page":"email_my_demo"}'
                    className="w-full sm:w-fit"
                  >
                    {isSubmitting ? "Submitting..." : "Email My Demo"}
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </Animate>
      </div>
    </section>
  );
}
