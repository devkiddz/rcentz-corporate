import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import SiteFooter from '@/components/site/SiteFooter';
import './globals.css';

const geist = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://rcentz.cc'),
  title: { default: 'Rcentz | Software, Systems & Solutions', template: '%s | Rcentz' },
  description: 'Rcentz designs and builds modern websites, digital products, business systems and software solutions.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geist.variable} ${geistMono.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}>
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
