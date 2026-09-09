import { DM_Serif_Display, Plus_Jakarta_Sans, JetBrains_Mono, Dancing_Script } from 'next/font/google';
import './globals.css';

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-script',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://portfolio-ks-projects-477f2cd9.vercel.app'),
  title: 'Korada Tanvi — Full-Stack AI Engineer',
  description: 'B.Tech CSE student at SRMIST building full-stack AI-native web products. Specializing in React, Next.js, Node.js, and LLM pipelines.',
  openGraph: {
    title: 'Korada Tanvi — Full-Stack AI Engineer',
    description: 'B.Tech CSE student at SRMIST building full-stack AI-native web products.',
    url: 'https://portfolio-ks-projects-477f2cd9.vercel.app',
    siteName: 'Korada Tanvi Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Korada Tanvi - Full-Stack AI Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Korada Tanvi — Full-Stack AI Engineer',
    description: 'Building AI-native web products at the intersection of great engineering and real-world impact.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${plusJakarta.variable} ${jetBrainsMono.variable} ${dancingScript.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
