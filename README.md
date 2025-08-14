# Subsights Marketing Site

A modern marketing website built with Next.js, featuring a sophisticated demo system for showcasing Subsights chatbot integration capabilities.

## Features

- **Marketing Pages**: Home, About, Pricing, FAQ
- **Demo System**: Multi-level fallback demo system with comprehensive analytics
- **Admin Dashboard**: Real-time demo performance monitoring
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Animation**: Smooth animations powered by Framer Motion

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo System

This site includes a sophisticated demo system that allows prospects to see Subsights chatbot integration in action. For detailed documentation on how the demo system works, see [DEMO_SYSTEM.md](./DEMO_SYSTEM.md).

### Quick Demo Access

- Visit `/demo/[slug]` to see a demo in action
- Access `/admin` (password: `subsights2025!`) to monitor demo performance
- Check the demo system documentation for configuration and troubleshooting

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - Reusable UI components
- `lib/` - Utility functions and demo system logic
- `styles/` - Global CSS and theme configuration

## Editing Pages and Sections

This project uses an AI agent ("vibe coding") to help you modify the marketing site content. Here's how to get the best results when working with the AI:

### How to Work with the AI Agent

The AI agent understands the structure of your marketing site and can help you:
- **Add new sections** to existing pages
- **Modify existing content** (text, images, buttons)
- **Change layouts** and styling
- **Add animations** and interactive elements
- **Create new pages** with multiple sections

### Best Practices for AI Requests

**Be specific about what you want:**
✅ **Good**: "Add a dark hero section with a blue button to the pricing page"
✅ **Good**: "Change the hero title to 'AI-Powered Meeting Notes' and make the background dark"
❌ **Vague**: "Make it look better"

**Specify the page and location:**
✅ **Good**: "Add a testimonials section after the hero on the home page"
✅ **Good**: "Insert a pricing table section between the features and CTA on the pricing page"
❌ **Unclear**: "Add a new section somewhere"

**Describe the content you want:**
✅ **Good**: "Create a section with three feature cards showing: 1) Fast setup, 2) Easy integration, 3) 24/7 support"
✅ **Good**: "Add a section with customer logos and the text 'Trusted by 500+ companies'"
❌ **Minimal**: "Add a features section"

### Common Request Examples

**Adding new sections:**
- "Add a dark hero with parallax to the pricing page"
- "Create a testimonials section with customer quotes on the home page"
- "Add a FAQ section to the about page"

**Modifying existing content:**
- "Change the hero title to 'Transform Your Business with AI'"
- "Update the CTA button to say 'Start Free Trial' and link to /signup"
- "Change the background color of the trusted-by section to dark"

**Layout and styling changes:**
- "Make the buttons larger and use brand colors"
- "Change the grid to 3 columns instead of 2"
- "Add more spacing between elements"

**Adding animations:**
- "Make the hero image fade in when the page loads"
- "Add a slide-up animation to the feature cards on scroll"
- "Make the CTA button bounce on hover"

### What the AI Will Ask You

The AI follows a structured approach and will ask clarifying questions to ensure it delivers exactly what you want:

**For content:**
- "What should the main headline say?"
- "What should the button text be?"
- "Where should this link to?"

**For design:**
- "What color scheme should I use? (e.g., 'brand colors', 'neutral', 'specific colors')"
- "How many columns should this have? (e.g., '2 columns', '3 columns')"
- "How much space between elements? (e.g., 'tight', 'comfortable', 'generous')"

**For animations:**
- "What animation effect? (e.g., 'fade in', 'slide up', 'bounce')"
- "How fast should it animate? (e.g., 'quick', 'medium', 'slow')"
- "When should it animate? (e.g., 'on page load', 'on scroll', 'on hover')"

### How the AI Makes Changes

The AI follows different "change tiers" depending on what you request:

**Tier 1: Copy-only changes** - Just updates text content
**Tier 2: Visual changes** - Modifies styling, colors, spacing, layout
**Tier 3: Behavioral changes** - Adds animations, interactions, or new UI components
**Tier 4: Structural changes** - Adds new fields or completely changes the section layout

### What the AI Can't Do

The AI agent has some limitations for security and consistency:
- ❌ Cannot access external websites or APIs
- ❌ Cannot run custom JavaScript code
- ❌ Cannot modify the core site functionality
- ❌ Cannot change the demo system or admin features

**What it CAN do:**
- ✅ Modify page content and copy
- ✅ Change layouts and styling
- ✅ Add animations and interactions
- ✅ Create new sections and pages
- ✅ Update images and links
- ✅ Adjust colors and typography
- ✅ Install new UI components when needed

### Getting Started

1. **Start with a clear request** describing what you want to change
2. **Answer any clarifying questions** the AI asks (it will ask specific questions to get the details right)
3. **Review the changes** the AI makes
4. **Ask for adjustments** if something isn't quite right

**Example conversation:**
```
You: "Add a testimonials section to the home page"
AI: "I'll add a testimonials section. What should the main headline say?"
You: "Customer Success Stories"
AI: "Great! What should the subtext below the headline say?"
You: "See how our customers are transforming their businesses"
AI: "Perfect! How many testimonials should I include?"
You: "Three would be good"
AI: "Excellent! I'll create a testimonials section with three customer quotes and the headline 'Customer Success Stories' with supporting text."
```

### Pro Tips

- **The AI will add TODO comments** if it needs clarification on specific details
- **It follows design standards** to keep your site looking professional and consistent
- **It can install new UI components** automatically if needed for your request
- **It maintains accessibility** by following best practices for screen readers and keyboard navigation

The AI will handle all the technical details while you focus on the content and design you want!

## Deploy on Netlify

This project is configured for Netlify deployment with:

- Security headers via `netlify.toml`
- Automatic HTTPS redirects
- Demo system optimization for production

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
