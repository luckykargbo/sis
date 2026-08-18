import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Standards International School | Nos Educamus Mentem',
  description:
    'Standards International School (S.I.S.) — A premier academic institution offering BECE and WASSCE preparatory programs across Science, Arts, and Commercial streams. Apply now for JSS 1–3 and SSS 1–3.',
  keywords: [
    'Standards International School',
    'SIS',
    'BECE',
    'WASSCE',
    'International School',
    'JSS',
    'SSS',
    'Science',
    'Arts',
    'Commercial',
    'Admissions',
  ],
  openGraph: {
    title: 'Standards International School',
    description: 'Nos Educamus Mentem — We Educate the Mind',
    type: 'website',
  },
};

import ConvexClientProvider from '@/components/ConvexClientProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-white text-[var(--sis-dark)] antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
