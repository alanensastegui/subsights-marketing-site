'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { EmailMyDemoSchema } from './form-schema';

const fields = [
  {
    name: 'firstName',
    label: 'First name',
    required: true,
    type: 'text',
    autoComplete: 'given-name',
    maxLength: 80,
  },
  {
    name: 'lastName',
    label: 'Last name',
    required: true,
    type: 'text',
    autoComplete: 'family-name',
    maxLength: 80,
  },
  {
    name: 'email',
    label: 'Work email',
    required: true,
    type: 'email',
    autoComplete: 'email',
    maxLength: 254,
  },
  {
    name: 'company',
    label: 'Company',
    required: false,
    type: 'text',
    autoComplete: 'organization',
    maxLength: 160,
  },
  {
    name: 'website',
    label: 'Website',
    required: false,
    type: 'text',
    autoComplete: 'url',
    maxLength: 500,
  },
] as const;

type Field = (typeof fields)[number]['name'];
type Industry = '' | 'destinations' | 'lenders' | 'publishers' | 'other';
const industries = new Set(['destinations', 'lenders', 'publishers', 'other']);

export default function DemoRequestForm() {
  const params = useSearchParams();
  const requestedIndustry = params.get('industry') || '';
  const [industry, setIndustry] = useState<Industry>(
    industries.has(requestedIndustry) ? (requestedIndustry as Industry) : ''
  );
  const [values, setValues] = useState<Record<Field, string>>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    website: '',
  });
  const [customerQuestion, setCustomerQuestion] = useState('');
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [requestError, setRequestError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setRequestError('');
    const result = EmailMyDemoSchema.safeParse({
      ...values,
      industry: industry || undefined,
      customerQuestion,
      marketingOptIn,
    });
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues)
        nextErrors[String(issue.path[0])] = issue.message;
      setErrors(nextErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/email-my-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });
      if (!response.ok) throw new Error('Request was not delivered');
      setSubmitted(true);
    } catch {
      setRequestError(
        "We couldn't deliver your request. Please try again or email Lucas directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted)
    return (
      <div
        className="mt-8 rounded-2xl border border-border bg-card p-7"
        role="status"
      >
        <h2 className="text-2xl font-semibold">Your request is in.</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thanks for the context. Lucas will review it and reply to the email
          address you shared.
        </p>
        <Link
          href="/case-studies"
          className="mt-6 inline-block underline underline-offset-4"
        >
          Explore the customer examples →
        </Link>
      </div>
    );

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mt-8 space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className={
              field.name === 'firstName' || field.name === 'lastName'
                ? 'space-y-2'
                : 'space-y-2 sm:col-span-2'
            }
          >
            <label htmlFor={field.name} className="text-sm font-medium">
              {field.label}
              {field.required ? ' *' : ' (optional)'}
            </label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              maxLength={field.maxLength}
              required={field.required}
              value={values[field.name]}
              onChange={(event) =>
                setValues((previous) => ({
                  ...previous,
                  [field.name]: event.target.value,
                }))
              }
              aria-invalid={Boolean(errors[field.name])}
              aria-describedby={
                errors[field.name] ? `${field.name}-error` : undefined
              }
            />
            {errors[field.name] && (
              <p
                id={`${field.name}-error`}
                className="text-sm text-destructive"
              >
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <label htmlFor="industry" className="text-sm font-medium">
          Industry (optional)
        </label>
        <select
          id="industry"
          name="industry"
          value={industry}
          onChange={(event) => setIndustry(event.target.value as Industry)}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-2 focus-visible:outline-ring"
        >
          <option value="">Choose an industry</option>
          <option value="destinations">Destination marketing</option>
          <option value="lenders">Private or hard money lending</option>
          <option value="publishers">
            Publisher, directory or affiliate website
          </option>
          <option value="other">Another kind of business</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="customerQuestion" className="text-sm font-medium">
          A question your visitors ask (optional)
        </label>
        <textarea
          id="customerQuestion"
          name="customerQuestion"
          rows={4}
          maxLength={600}
          value={customerQuestion}
          onChange={(event) => setCustomerQuestion(event.target.value)}
          className="w-full rounded-md border border-input bg-background p-3 text-sm focus-visible:outline-2 focus-visible:outline-ring"
          aria-invalid={Boolean(errors.customerQuestion)}
          aria-describedby="question-hint"
        />
        <p id="question-hint" className="text-xs text-muted-foreground">
          A realistic question helps us explore what would be useful on your
          site. Please leave out private customer information.
        </p>
        {errors.customerQuestion && (
          <p className="text-sm text-destructive">{errors.customerQuestion}</p>
        )}
      </div>
      <div className="flex items-start gap-3">
        <Checkbox
          id="marketingOptIn"
          checked={marketingOptIn}
          onCheckedChange={(checked) => setMarketingOptIn(checked === true)}
        />
        <label
          htmlFor="marketingOptIn"
          className="text-sm leading-relaxed text-muted-foreground"
        >
          Send me occasional Subsights updates too. Optional, and you can
          unsubscribe.
        </label>
      </div>
      {requestError && (
        <p role="alert" className="text-sm text-destructive">
          {requestError}
        </p>
      )}
      <Button
        type="submit"
        disabled={isSubmitting}
        data-analytics-id="email_my_demo_submit"
        data-analytics-name="Send Website Question"
        data-analytics-context={JSON.stringify({
          page: 'email_my_demo',
          industry,
        })}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? 'Sending...' : 'Send my website question'}
      </Button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Prefer a direct conversation?{' '}
        <a
          href="mailto:lucas@subsights.com"
          className="underline underline-offset-4"
        >
          Email lucas@subsights.com
        </a>{' '}
        or{' '}
        <a
          href="https://www.linkedin.com/in/lucascairns/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          find Lucas on LinkedIn ↗
        </a>
        .
      </p>
    </form>
  );
}
