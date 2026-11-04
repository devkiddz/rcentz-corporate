import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import Navbar from '@/components/navigation/Navbar';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap'
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Rcentz | Digital Solutions',
  description: 'Rcentz builds modern digital systems, products, and solutions for businesses.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={`${geist.variable} ${geistMono.variable} min-h-full flex flex-col bg-background font-sans text-foreground antialiased`}>
        <Navbar />

        <main className="flex-1 pb-16 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
