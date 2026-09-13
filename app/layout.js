import { JetBrains_Mono, DM_Sans, Bricolage_Grotesque } from 'next/font/google';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-serif',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
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
      <body className={`${bricolage.variable} ${dmSans.variable} ${jetbrainsMono.variable} night`} suppressHydrationWarning>
        <div id="grain-overlay"></div>
        {children}
      </body>
    </html>
  );
}
