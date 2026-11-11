import { Jost } from 'next/font/google';

// Heading type a prospect demo may borrow from its own site. next/font serves it from our domain, so a visitor's
// browser makes no request to Google.
export const jost = Jost({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
  variable: '--font-prospect-heading',
});
