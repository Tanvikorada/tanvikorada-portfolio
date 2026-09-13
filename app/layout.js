import { Syne, Manrope, Space_Mono, Caveat } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-serif', 
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://portfolio-ks-projects-477f2cd9.vercel.app'),
  title: 'Korada Tanvi - Full-Stack AI Engineer',
  description: 'Portfolio of Korada Tanvi, a passionate Full-Stack AI Engineer specializing in Next.js, React, Node.js, and GenAI integrations.',
  openGraph: {
    title: 'Korada Tanvi - Full-Stack AI Engineer',
    description: 'Portfolio of Korada Tanvi, specializing in Next.js, React, Node.js, and GenAI integrations.',
    url: 'https://portfolio-ks-projects-477f2cd9.vercel.app',
    siteName: 'Korada Tanvi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${syne.variable} ${manrope.variable} ${spaceMono.variable} ${caveat.variable} night`} suppressHydrationWarning>
        <div id="grain-overlay"></div>
        {children}
      </body>
    </html>
  );
}
