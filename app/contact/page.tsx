import type { Metadata } from 'next';
import { PageIntro, FeatureRows, ClosingCTA } from '@/components/site/Editorial';
export const metadata: Metadata = { title: 'Contact' };
export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Work with Rcentz" title="Have something meaningful to build?" description="Tell us what you have in mind. Our services team is the starting point for project conversations." />
      <FeatureRows items={[{ number: '01', eyebrow: 'Work with Rcentz', title: 'Start a conversation', body: 'Bring your idea, challenge or business need to our delivery team.', href: '/contact', link: 'Discuss a project' },
{ number: '02', eyebrow: 'Work with Rcentz', title: 'Clarify the scope', body: 'Define priorities, milestones and a practical delivery direction.', href: '/contact', link: 'Discuss a project' },
{ number: '03', eyebrow: 'Work with Rcentz', title: 'Move with confidence', body: 'Build deliberately and iterate as your needs become clearer.', href: '/contact', link: 'Discuss a project' }]} />
      <div className="mx-auto max-w-[1500px] px-6 py-12 sm:px-10 lg:px-16"><a href="https://systems.rcentz.cc" className="text-sm font-semibold text-blue-100 underline underline-offset-4">Visit Rcentz Systems ↗</a></div>
      <ClosingCTA />
    </>
  );
}
