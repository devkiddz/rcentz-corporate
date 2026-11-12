import type { Metadata } from 'next';
import CorporateHero from '@/components/corporate/CorporateHero';
import { SystemsSolutionsSection } from '@/features/systems/components/SystemsSolutionsSection';
import { SystemsWorkspaceSection } from '@/features/systems/components/SystemsWorkspaceSection';
import { SystemsCallToActionSection } from '@/features/systems/components/SystemsCallToActionSection';

export const metadata: Metadata = {
  title: 'Rcentz',
  description: 'Websites, software and connected digital systems built for people and businesses.',
};

export default function HomePage() {
  return (
    <>
      <CorporateHero />
      <SystemsSolutionsSection />
      <SystemsWorkspaceSection />
      <SystemsCallToActionSection />
    </>
  );
}
