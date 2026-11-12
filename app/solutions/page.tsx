import type { Metadata } from 'next';
import { PageIntro, FeatureRows, ClosingCTA } from '@/components/site/Editorial';
export const metadata: Metadata = { title: 'Solutions' };
export default function SolutionsPage() {
  return (
    <>
      <PageIntro eyebrow="How we help" title="Practical answers to real digital challenges." description="The right solution is not always the largest system. We focus on clarity, scope and measurable usefulness." />
      <FeatureRows items={[{ number: '01', eyebrow: 'How we help', title: 'Establish a digital presence', body: 'Create a credible online destination for your business and customers.', href: '/contact', link: 'Discuss a project' },
{ number: '02', eyebrow: 'How we help', title: 'Improve operations', body: 'Replace manual processes with organised, maintainable digital workflows.', href: '/contact', link: 'Discuss a project' },
{ number: '03', eyebrow: 'How we help', title: 'Build new opportunities', body: 'Turn promising product ideas into thoughtful applications.', href: '/contact', link: 'Discuss a project' }]} />

      <ClosingCTA />
    </>
  );
}
