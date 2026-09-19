import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const interSans = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://dimple-lin-projects.michael-tangminhan.chatgpt.site',
  ),
  title: 'Dimple Lin — Learning Experience Designer',
  description:
    'Dimple Lin turns real learning and performance gaps into evidence-driven experiences using research, learning science, AI, and data.',
  openGraph: {
    title: 'Dimple Lin — Learning Experience Designer',
    description:
      'Evidence-driven learning experiences, performance support, and AI-enabled tools.',
    url: '/',
    siteName: 'Dimple Lin Portfolio',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Dimple Lin portfolio',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dimple Lin — Learning Experience Designer',
    description:
      'Evidence-driven learning experiences, performance support, and AI-enabled tools.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
