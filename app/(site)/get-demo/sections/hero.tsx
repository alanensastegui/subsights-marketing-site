'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Animate } from "@/components/ui/animate";
import { CALENDLY_URL } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative isolate px-6 py-12">
      <Animate name="fadeInStagger" trigger="onVisible">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="animate-item text-4xl md:text-5xl font-bold text-center tracking-tight">
            Get a Demo
          </h1>
          <div className="animate-item grid gap-8 md:grid-cols-2">
            <div className="flex justify-center">
              <Button
                asChild
                size="lg"
                data-analytics-id="get_demo_book_demo"
                data-analytics-name="Book Demo (Get Demo)"
                data-analytics-context='{"source":"get_demo","section":"hero"}'
              >
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                  Book Demo
                </a>
              </Button>
            </div>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col space-y-1">
                <label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </label>
                <Input id="email" type="email" required />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="website" className="text-sm font-medium">
                  Your website url
                </label>
                <Input id="website" type="url" />
              </div>
              <Button
                type="submit"
                size="lg"
                data-analytics-id="get_demo_form_submit"
                data-analytics-name="Submit (Get Demo)"
                data-analytics-context='{"source":"get_demo","section":"form"}'
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Animate>
    </section>
  )
}

export const sectionId = "hero";
