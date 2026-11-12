import type { Metadata } from 'next';
import { ServicesHero } from '@/features/services/components/hero/ServicesHero';
import { SystemsOverviewSections } from '@/features/systems/components/SystemsOverviewSections';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Website development, business software, connected workflows and project delivery from Rcentz.',
};

/** The original Systems homepage, moved as actual components—not redrawn. */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <SystemsOverviewSections />
    </>
  );
}
