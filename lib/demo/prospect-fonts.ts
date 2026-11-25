import localFont from 'next/font/local';

// Jost from google/fonts, commit 6e4b84c976cadb3c49a40fd9a1c203e4f7fcf2da (OFL.txt beside the font).
// Bundle the font so production builds and visitors do not depend on a Google Fonts request.
export const jost = localFont({
  src: './fonts/Jost-Variable.ttf',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-prospect-heading',
});
