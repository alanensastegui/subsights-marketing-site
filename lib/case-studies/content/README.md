# Case Studies Management

This directory contains all case studies in Markdown format with YAML front matter for metadata.

## File Structure

Each case study should be a `.md` file with the following structure:

```markdown
---
slug: company-name
company: Company Name
logo: /images/client-logos/logo.avif
industry: Industry Name
website: https://company-website.com
overview:
  challenge: Brief description of the challenge
  solution: Brief description of the solution
  keyResults:
    - Result 1
    - Result 2
    - Result 3
  metrics:
    - label: Metric Name
      value: Metric Value
      change: Change (+/-%)
---

# Full Case Study Title

## The Challenge

Detailed challenge description...

## The Solution

Detailed solution description...

## Results & Impact

Detailed results...

## Customer Testimonial

> "Customer quote here"
> 
> **— Customer Name, Title, Company**

## Technical Implementation

Technical details...

## Looking Forward

Future plans...
```

## Adding a New Case Study

1. **Create a new `.md` file** in this directory
2. **Use the slug format**: `company-name.md` (lowercase, hyphens for spaces)
3. **Add the logo image** to `/public/images/client-logos/`
4. **Fill in the front matter** with company details and overview
5. **Write the full case study** in Markdown format
6. **Save the file** - it will automatically appear on the case studies page

## Editing Existing Case Studies

1. **Open the `.md` file** directly
2. **Edit the content** using any Markdown editor
3. **Update front matter** if company details change
4. **Save the file** - changes appear immediately

## Front Matter Fields

- **slug**: URL-friendly identifier (e.g., "intrust-bank")
- **company**: Company name for display
- **logo**: Path to company logo image
- **industry**: Business industry/sector
- **website**: Company website URL
- **overview**: Summary data for the overview page
  - **challenge**: Brief challenge description
  - **solution**: Brief solution description
  - **keyResults**: Array of key results
  - **metrics**: Array of performance metrics

## Content Guidelines

- **Use clear headings** (H1, H2, H3) for structure
- **Include customer testimonials** in quote format
- **Add specific metrics** and results
- **Use bullet points** for lists
- **Keep content engaging** and informative
- **Include technical details** when relevant

## SEO Benefits

- **Full content** is crawlable by search engines
- **Structured data** from front matter
- **Clean URLs** with descriptive slugs
- **Rich content** for better search rankings
- **Internal linking** between overview and individual pages

## File Naming Convention

- Use lowercase letters
- Replace spaces with hyphens
- Use descriptive names (e.g., `intrust-bank.md`, `vsv-tours.md`)
- Avoid special characters except hyphens

## Automatic Updates

- **Overview page** automatically shows all case studies
- **Individual pages** are generated for each case study
- **Navigation links** are automatically created
- **Metrics aggregation** is calculated dynamically
- **SEO metadata** is generated automatically
