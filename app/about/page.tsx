import type { Metadata } from 'next';
import { PageIntro, FeatureRows, ClosingCTA } from '@/components/site/Editorial';
export const metadata: Metadata = { title: 'About Rcentz' };
export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="Who we are" title="We build technology with purpose." description="Rcentz brings software development, business systems and digital products together under one company." />
      <FeatureRows items={[{ number: '01', eyebrow: 'Who we are', title: 'Clarity first', body: 'We begin by understanding real problems and the people who need solutions.', href: '/contact', link: 'Discuss a project' },
{ number: '02', eyebrow: 'Who we are', title: 'Thoughtful engineering', body: 'Design, maintainability and useful outcomes guide what we build.', href: '/contact', link: 'Discuss a project' },
{ number: '03', eyebrow: 'Who we are', title: 'Connected possibilities', body: 'Our products and services have different roles but share the same direction.', href: '/contact', link: 'Discuss a project' }]} />

      <ClosingCTA />
    </>
  );
}
