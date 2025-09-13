---
slug: "two-tracks-one-outcome-dual-query-workflows"
title: "Two tracks, one outcome"
date: "2025-09-15"
excerpt: "How Subsights’ Dual-Query workflows resolve questions and recommend the next best action in the same turn—managed for you—with transparent daily and monthly reporting and a field example from All Allied Health Schools."
author:
  name: "Alan"
  image: "/images/team-headshots/alan.avif"
---

Organizationally, most website assistants drift to one of two extremes. They either over-assist—great answers, weak handoff—or over-sell—pushy, low trust. Helpful and commercial rarely coexist in a single turn.

We built a pattern that does: **Dual-Query**. Every message runs two jobs in parallel—one to resolve the question, one to surface the best next action—then decides what (if anything) to present. The result is an assistant that is genuinely useful while quietly improving lead quality and revenue.

Here’s how it works and how we manage it for you.

---

## What we shipped

**Dual-Query** is a deliberate workflow inside Subsights:

- **Help track** uses your approved sources to answer precisely.  
- **Commercial track** searches an offer graph—plans, APLs, tours, discounts, bookings—and scores candidates against intent, eligibility, seasonality, and priority.

A **decision layer** evaluates both results. If the visitor’s need is resolved *and* there’s a high-score match, the assistant adds a relevant suggestion (or a handoff) without derailing the conversation. If not, it falls back to the next-best eligible option—or stays quiet.

We built Dual-Query around three principles:  
1) **Help first.** Don’t sacrifice accuracy for a pitch.  
2) **Transparency.** Make reasoning and policy boundaries visible.  
3) **Control.** You own sources, offers, thresholds, and escalation.

---

## Better retrieval, deliberate models

Early versions with small, tightly scoped prompts handled straightforward cases. They faltered when important context lived outside the prompt.

Today the system is agentic. It assembles candidates (knowledge snippets + eligible offers), then asks a reasoning model to evaluate intent, resolve the question, and score offers against policy. That shift improved suggestion quality—especially on seasonal availability, eligibility constraints, and fuzzy intents—and made it easier to encode business guidance without brittle flows.

---

## Designing for trust and speed

Reasoning takes steps. We optimize for:

- **Responsiveness without noise.** Suggestions reuse your site’s visual language and are clearly marked as system-generated. If nothing meets the bar, nothing is shown.  
- **Visible guardrails.** Refusals, eligibility checks, and escalation triggers are explicit.  
- **Auditability.** Conversation summaries show which sources and offers drove a suggestion so you can tune thresholds and close content gaps.

---

## Workflows, not wiring

Dual-Query is best understood as a **derivative of your workflows**, not a tangle of ad-hoc logic. We use the same **What → Action** pattern from our prompt guide—only here, two workflows run in parallel and reconcile at a decision point. (See: [How to write prompts that actually work](https://subsights.com/blog/how-to-write-prompts-that-actually-work).)

**Compound workflow: Resolve & Recommend**

**What**: A visitor asks a product/program/itinerary question.  
**Action**:  
1) Run **Resolve** workflow: fetch approved facts, answer directly.  
2) Run **Recommend** workflow: retrieve eligible offers; score by intent fit, eligibility, seasonality, and priority.  
3) **Decide**:  
   - If score ≥ threshold and policy OK → show answer, then a single, contextually relevant suggestion or handoff.  
   - Else if a fallback exists → show answer, then the next-best alternative.  
   - Else → show answer only.  
4) **Escalate** when triggers fire (insistent request, sensitive topic, high-value lead).

**We build this for you.**  
You don’t need to implement these workflows yourself. Our team designs, configures, and maintains them—tuned to your content, offers, and policies—so the assistant behaves like part of your team from day one.

---

## Field example: All Allied Health Schools

Lead-gen platforms face a double mandate: help users navigate high-stakes decisions *and* guide them to relevant affiliate partner programs (APLs). All Allied Health Schools deployed Subsights as an expert advisor with a **mandatory Dual-Query** design—one track for factual guidance, one track that continuously surfaces best-fit APLs. The assistant stays helpful while reliably creating high-intent leads.

When no direct match exists, the system doesn’t stall. A **hierarchical APL fallback** selects the next-best alternative by job similarity and education level, turning potential dead ends into opportunities rather than exits. For nursing/CNA queries, it follows a **specialized pathway** to promote a sister site—an example of business-aware routing baked into the workflow.

In practice, this means handling complex questions 24/7 (e.g., localized school searches, credential validation, scholarships), switching languages when needed, and continuously nudging toward qualified program matches. The team also benefits from conversation analysis that exposes popular careers, friction points, and geographic demand—fuel for content and partnership strategy.

---

## Operational discipline (what we handle for you)

Behind every high-performing assistant is a set of operational guardrails. We maintain these for you so the system stays predictable and on-brand.

- We define the mission and priorities so the assistant always helps first, then suggests.  
- We catalog your offers with eligibility, seasonality, and priority so recommendations never drift.  
- We write refusal and escalation workflows word-for-word so sensitive topics and high-value leads are handled properly.  
- We set thresholds for when to recommend, when to fallback, and when to escalate—so every response follows your playbook.  
- We run weekly triage on conversation summaries to close gaps and keep performance improving.

You don’t need to run this checklist yourself—but seeing it gives you confidence that the system isn’t “AI improvisation.” It’s a managed workflow with clear boundaries.

---

## Visibility into outcomes (what you’ll see from us)

Rather than dropping numbers into a black box, we make the assistant’s activity visible through daily and monthly reporting. These reports are designed to give you confidence in what’s happening, and insight into how your visitors are engaging.

- **Daily reports** summarize every conversation: the visitor’s intent, the outcome, and the assistant’s response—useful for spotting high-value leads, sensitive topics, and emerging issues in near real time.  
- **Monthly reports** roll that activity up into aggregates: most common intents, most frequent user locations, and trending topics—useful for content planning and offer strategy.

The goal isn’t to drown you in metrics. It’s to make the assistant’s reasoning and behavior transparent—so you always know how it’s representing your brand, what demand it’s capturing, and where you might want to expand content or offers.

---

## Where it shines

- **DMOs / Tourism.** Seasonal priorities, private-experience upsells, multilingual logistics.  
- **Affiliate lead gen.** Informational guidance that also surfaces the right partner program.  
- **Specialized services.** In-scope qualification by location/asset, polite routing for the rest.

---

## What’s next

Automation will come with controls. If you trust certain suggestion types, you can opt in to have them applied automatically—attaching an offer, routing to a team, or collecting contact details—while keeping a full trace of what happened and why.

Each improvement compounds. The more the assistant resolves and routes, the cleaner your knowledge base becomes, the sharper your offer graph gets, and the more consistent your conversions are—without sacrificing help.

---

**The same workflows that power All Allied Health Schools and DMOs are available to you too—built to turn every conversation into an opportunity.**