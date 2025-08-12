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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Netlify

This project is configured for Netlify deployment with:

- Security headers via `netlify.toml`
- Automatic HTTPS redirects
- Demo system optimization for production

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
