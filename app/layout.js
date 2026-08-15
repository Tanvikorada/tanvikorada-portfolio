import './globals.css';

export const metadata = {
  title: 'Korada Tanvi — Full-Stack AI Engineer',
  description: 'B.Tech CSE student at SRMIST building full-stack AI-native web products. React, Next.js, Node.js, LLM APIs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
