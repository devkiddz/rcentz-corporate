import type { Metadata } from 'next';
import CorporateHero from '@/components/corporate/CorporateHero';
import TechStackTape from '@/components/home/TechStackTape';
import WhoWeAre from '@/components/home/WhoWeAre';
import { CorporateCompanySection } from '@/components/corporate/CorporateCompanySection';
import { CorporateProductDirectionsSection } from '@/components/corporate/CorporateProductDirectionsSection';

export const metadata: Metadata = {
  title: 'Rcentz',
  description: 'Discover the Rcentz company, client solutions through Rcentz Systems and our original digital product ideas.',
};

export default function HomePage() {
  return (
    <>
      <CorporateHero />
      <TechStackTape />
      <WhoWeAre />
      <CorporateCompanySection />
      <CorporateProductDirectionsSection />
    </>
  );
}
