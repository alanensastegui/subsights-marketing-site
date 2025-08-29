"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

export default function Hero() {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <section className="px-6 py-12 max-w-3xl mx-auto text-center">
      <Animate name="fadeInStagger" trigger="onVisible">
        <h1 className="animate-item text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Get Demo
        </h1>
        <div className="animate-item mb-8">
          <Button
            asChild
            size="lg"
            data-analytics-id="get_demo_book"
            data-analytics-name="Book Demo (Get Demo)"
            data-analytics-context='{"source":"get_demo","section":"hero"}'
          >
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book demo
            </a>
          </Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="animate-item mx-auto max-w-sm space-y-4"
        >
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-destructive">*</span>
            </label>
            <Input id="email" type="email" required />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label htmlFor="website" className="text-sm font-medium">
              Your website url
            </label>
            <Input id="website" type="url" />
          </div>
          <Button
            type="submit"
            className="w-full"
            data-analytics-id="get_demo_submit"
            data-analytics-name="Submit (Get Demo)"
            data-analytics-context='{"source":"get_demo","section":"hero"}'
          >
            Submit
          </Button>
        </form>
      </Animate>
    </section>
  );
}

export const sectionId = "hero";
