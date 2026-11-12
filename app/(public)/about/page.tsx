import type { Metadata } from 'next';
import { SystemsPurposeSection } from '@/features/systems/components/SystemsPurposeSection';
import { SystemsRemoteSection } from '@/features/systems/components/SystemsRemoteSection';

export const metadata: Metadata = {
  title: 'About Rcentz',
  description: 'Learn about Rcentz, how we approach technology and how we collaborate with businesses.',
};

export default function AboutPage() {
  return (
    <>
      <header className="rcentz-section border-b border-border pb-10 pt-10 sm:pb-14 sm:pt-16">
        <p className="text-xs font-medium uppercase tracking-widest text-theme-accent">About Rcentz</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Technology built around real people and real work.</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Rcentz builds software, websites and connected systems to help businesses serve customers and run their operations.</p>
      </header>
      <SystemsPurposeSection />
      <SystemsRemoteSection />
    </>
  );
}
