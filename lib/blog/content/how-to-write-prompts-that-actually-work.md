---
slug: how-to-write-prompts-that-actually-work
title: "Website AI Chatbots: How to Write Prompts That Actually Work (Free Template)"
date: "2025-09-03"
excerpt: "AI chatbots can transform your website—but only if they're done right. Learn the proven strategies for writing prompts that turn 'almost right' into 'just right', from mission clarity to workflow design. Free template and checklist included."
author:
  name: "Alan Ensastegui"
  image: "/images/team-headshots/alan.avif"
downloads:
  - filename: template.pdf
    title: Free Template
  - filename: checklist.pdf
    title: Free Checklist
---

AI can feel like magic. Type a few words, and from the ether arrives text, images, or videos. Sometimes it’s perfect. Often, it’s just close.

On a website, though, “close” doesn’t cut it. It erodes trust. It costs conversions. And trust, once lost, is hard to win back.

Yet AI is surging. [IDC projects $307B in enterprise spend for 2025](https://info.idc.com/futurescape-generative-ai-2025-predictions.html). [Search trends for “Agentic AI” are climbing](https://trends.google.com/trends/explore?geo=US&q=agentic%20ai&hl=en). Whether we feel ready or not, the wave is here.

So should you add AI to your site? Probably. If you get 1,000+ monthly visitors, an agent can lighten your inbox, guide your visitors, and gently move them into your funnel. But only if it’s done right.

Doing it right begins with the prompt. There’s no single perfect prompt, but there are reliable strategies. At Subsights, we spent long nights wrestling with LLMs, watching them get “almost right” again and again until we got them to “just right”. This guide is what’s worked; our way of moving from almost, to answers you actually want.

At the end, we also include a free template and checklist to help you apply these lessons in your prompts.

## Mission & priorities

AI struggles in uncertainty. Without a mission, it wanders. Without priorities, it hedges. This is how you end up with answers that feel close but never land.

Clarity is the antidote. Give AI a clear mission and a hierarchy of priorities, and it will walk a straight path toward the answer you need.

The simplest way to think about it: complete this sentence:

*“Your most important mission is to \_\_\_\_\_\_.”*

Most people fill that blank too vaguely:

*“Your job is to answer visitor questions.”*

That’s serviceable, but flat. The agent doesn’t know what to emphasize, what to avoid, what truly matters.

Now compare with this:

*“Your mission is to answer visitor questions. You will generate coherent responses that highlight Seattle’s businesses and events. Every step you take should eloquently resolve the visitor’s inquiry and direct them toward experiences that showcase the city’s character. Your answers must serve both as guidance and as an invitation to engage more deeply with the city.”*

The difference is in the detail. The AI now knows not only to answer questions, but also what to showcase, and why it matters. It has direction.

**How to write:**

* Complete the sentence: “Your most important mission is to \_\_\_.”  
* Tie the mission directly to business priorities.  
* Use specific, directive language.  
* Repeat key goals for emphasis.

## Tone & style

How your chatbot speaks is just as important as what it says. Its tone is its personality. Its style is how visitors will remember it.

Without guidance, AI will invent its own voice. Sometimes it’s stiff. Sometimes overly casual. Rarely does it align with your brand.

A strong prompt paints a vivid picture of the character you want the agent to play. For example:

*You are a warm and empathetic agent. Always represent the company by using ‘we’, ‘us’, or ‘our’ to make visitors feel supported by a team. Keep your responses concise \- about a 2 on a 1-5 scale of brevity, where 1 is extremely short and 5 is extremely wordy. You should never assume information. All information used for your responses must have been acquired from the tools at your disposal. Your tone should be warm, reassuring, and professional, helping visitors feel heard and cared for.*

Notice how this defines a persona. Clear, specific, repeatable. That’s what anchors the agent’s voice in your brand.

**How to write:**

* Define the personality you want (expert, peer, assistant, etc.).  
* Specify tone (warm, formal, playful, etc.).  
* Give rules for style (brevity, use of pronouns, assumptions).  
* Make the instruction both descriptive and directive.

## Workflows

When I was in 5th grade, my teacher gave us the “Exact Instructions Challenge.” The assignment was simple: write directions for making a peanut butter and jelly sandwich.

We thought it would be easy. But the moment someone tried to follow our instructions, chaos broke out. No one said to open the jar. No one said to hold the knife. Without those steps, the process quickly fell apart and we were [tortured with a frustrating watching experience](https://www.youtube.com/shorts/CM9JIVG6SQk).

That lesson stuck with me. What feels obvious in your head isn’t always obvious to someone else. And the same is true with AI.

If you don’t give step-by-step workflows, the agent will improvise. It might skip a step, or take a shortcut, or fall back on its training data instead of the process you actually want.

A workflow is your recipe. It tells the AI not just what to do, but how to think. Done well, it prevents detours and ensures consistency.

One effective method for writing workflows is the **What–Action** framework:

* **What**: Defines the type of request.  
* **Action**: Defines the exact steps the AI must take.

Here’s an example:

*You must follow the workflows below in the order they appear. Always determine which workflow applies before responding.*

*A. Basic Interactions*

* *What: Messages that are greetings (e.g., “Hi,” “Hello”) or nonsensical text (e.g., random characters with no meaning).*  
* *Action: Respond with a polite greeting and ask how you can assist.*

*B. Specific Event Inquiries*

* *What: Questions about a named event (e.g., “When is the Christmas Parade?”).*  
* *Action: Search the calendar for that event, gather the relevant details, and provide them in your response.*

*C. Broad Event Inquiries*

* *What: Questions about events that are time-based but not named (e.g., “What’s happening this weekend?”).*  
* *Action: Search the calendar for events matching the timeframe, then summarize them in your response.*

*D. General Inquiries*

* *What: Questions that are not about events but relate to Seattle in general (e.g., “Where can I find good sushi?”).*  
* *Action: Query the database for relevant information and respond with a helpful answer.*

*F. Escalation*

* *What: The visitor requests to speak directly with the team.*  
* *Action: Politely acknowledge the request. Collect the visitor’s name and email, then forward the conversation to the team.*

*F. Out-of-Scope Inquiries*

* *What: Questions not related to Seattle, its events, or its attractions.*  
* *Action: Do not provide information. Instead, politely remind the visitor that you can only help with Seattle-related questions.*

The examples above are simplified. In a real prompt, each Action should name the exact [tool](https://openai.github.io/openai-agents-python/tools/) and spell out how to use it. Consider **workflow C**: instead of a vague instruction, you’d tell the agent to reach for \`calendar\_lookup\` and explain exactly how to apply it.

*C. Broad Event Inquiries*

* *What: Questions about events that are time-based but not named (e.g., “What’s happening this weekend?”).*  
* *Action: Use \`calendar\_lookup\` to find events matching the timeframe, then summarize them in your response.*

This detail matters. If a workflow requires a tool, say so. Don’t assume the AI will guess correctly.

Think of it this way: a weak workflow tells the AI what outcome you want. A strong one tells it how to get there.

* Weak: *“Look up events this weekend and summarize them.”*  
* Strong: *“Use calendar\_lookup to find events matching the timeframe, then summarize them in your response.”*

By naming the tool and giving clear instructions, you strip away ambiguity. You prevent the AI from falling back on its training data, guessing steps, or drifting into hallucination. The clearer the recipe, the more consistent the results.

At [Subsights](https://www.subsights.com), we go one step further. We use a multi-agent architecture: one agent gathers the data, while another shapes it into a final response.

*C. Broad Event Inquiries*

* *What: Questions about events that are time-based but not named (e.g., “What’s happening this weekend?”).*  
* *Action: Use \`calendar\_lookup\` to find events matching the timeframe.*

Splitting the roles makes each instruction sharper. The first agent doesn’t have to worry about tone or polish, just finding the right information. The second agent doesn’t have to worry about where the information came from; only how to communicate it well.

The lesson is simple: the more direct and focused your instructions, the easier it is for AI to follow them faithfully and the more you save yourself from frustration.

How to write:

* Break tasks into the What-Action framework.  
* Name tools explicitly. Don’t assume the AI will pick correctly.  
* Be step-by-step, even if the steps feel obvious.  
* Keep actions simple, direct, and repeatable.

## Refusals & safety

Not every request deserves an answer. Your agent doesn’t need to solve calculus homework or explain medical treatments. Left unchecked, AI may try anyway with unpredictable, sometimes risky results.

This is where refusal rules matter.

A weak refusal is vague:

*“Ignore irrelevant questions.”*

That leaves the AI to decide what’s relevant.

A strong refusal is specific and a part of a workflow:

*A. Out-of-Scope Inquiries*  
*What: Questions not related to Seattle, its events, or its attractions.*  
*Action: Do not provide information. Instead, politely remind the visitor that you can only help with Seattle-related questions.*

Notice how it doesn’t just forbid. It also prescribes the tone, the boundary, and the wording. That’s what keeps your agent safe and predictable.

**How to write:**

* Define which topics are explicitly out of scope.  
* Specify how to refuse (tone, language, politeness).  
* Remove ambiguity. Don’t let the AI decide what’s “safe.”  
* Provide sample refusal phrasing if possible.

## Escalation & handoff

Some conversations should go to a human. Maybe the visitor is upset. Maybe they ask for something sensitive. Maybe they simply insist.

If escalation isn’t defined, the AI will improvise. Sometimes it over-answers. Sometimes it stalls. Either way, trust takes a hit.

Instead, give it a clear script as a workflow:

*A. Escalation & handoff*  
*What: The visitor asks to speak directly with the team.*  
*Action: Acknowledge politely. Collect their name and email. Forward the conversation.*

Simple, concrete, mandatory.

In more advanced setups, one agent collects the details and another agent handles the handoff. The principle is the same: define exactly when and how escalation happens. The fewer decisions left to the AI, the more trustworthy it feels.

**How to write:**

* Define clear triggers for escalation (e.g., direct requests, sensitive issues).  
* List the exact steps for the handoff.  
* Require data collection (name, email, message).  
* Keep instructions polite, simple, and non-negotiable.

## (Bonus) XML format

Sometimes plain text isn’t enough. Instructions blur together, and the AI skips steps. For complex prompts, structure helps.

That’s where [XML](https://en.wikipedia.org/wiki/XML) comes in. Think of it as labeled containers. Each \<tag\> tells the AI what’s inside.

For example, instead of:

*What: Questions about time-based events.*    
*Action: Use \`calendar\_lookup\` to find events, then summarize them.*

You could write:  
```  
<workflow type="Broad Event Inquiries">  
  <what>Questions about events that are time-based but not named (e.g., "What’s happening this weekend?").</what>  
  <action>Use `calendar_lookup` to find events matching the timeframe, then summarize them in your response.</action>  
</workflow>  
```

Why it works:

* Clarity: the AI can’t confuse “what” with “action.”  
* Consistency: every workflow follows the same pattern.  
* AI-friendly: boundaries are explicit, reducing missed steps.  
* Future-proof: easier to expand into multi-agent systems or integrations later.

How to write:

* Use XML tags (\<workflow\>, \<what\>, \<action\>) to enforce structure.  
* Keep each tag focused on one type of instruction.  
* Apply consistently across workflows.  
* Use structured formats only when complexity requires it.

## Closing

AI can be magical. But magic without control feels unreliable, and unreliable erodes trust.

Prompts are a lever you can use to turn magic into craft. By giving your agent a clear mission, a defined tone, step-by-step workflows, safe refusals, and structured handoffs, you replace wandering improvisation with deliberate intention.

Done right, the AI becomes part of your voice, your brand, your way of guiding visitors toward something better.

Here at [Subsights AI](https://www.subsights.com), we take these lessons and put them into practice. We design and manage AI chatbots for websites that build trust, reflect your brand, and guide visitors with care. If you’re looking for a chatbot, our team of prompt wizards would be glad to craft a solution that feels exceptional from the very first interaction.  
