import type { Metadata } from 'next';
import { PageIntro, FeatureRows, ClosingCTA } from '@/components/site/Editorial';
export const metadata: Metadata = { title: 'Services' };
export default function ServicesPage() {
  return (
    <>
      <PageIntro eyebrow="Rcentz Systems" title="Digital services shaped around your business." description="From websites to custom applications and operational tools, we help organisations build useful technology." />
      <FeatureRows items={[{ number: '01', eyebrow: 'Rcentz Systems', title: 'Websites and experiences', body: 'Responsive, distinctive websites built to communicate clearly and earn trust.', href: '/contact', link: 'Discuss a project' },
{ number: '02', eyebrow: 'Rcentz Systems', title: 'Custom web applications', body: 'Client portals, internal tools and tailored software for real workflows.', href: '/contact', link: 'Discuss a project' },
{ number: '03', eyebrow: 'Rcentz Systems', title: 'Business systems', body: 'Connected operations, dashboards and practical automation.', href: '/contact', link: 'Discuss a project' }]} />
      <div className="mx-auto max-w-[1500px] px-6 py-12 sm:px-10 lg:px-16"><a href="https://systems.rcentz.cc" className="text-sm font-semibold text-[#0058d6] underline underline-offset-4">Visit Rcentz Systems ↗</a></div>
      <ClosingCTA />
    </>
  );
}
