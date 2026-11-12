import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = { title: 'Resources' };
const resources = [
  { name: 'How we work', description: 'Briefing, milestones, reviews and release planning.', href: '/how-we-work' },
  { name: 'Our tools', description: 'The technology and practices we choose for software delivery.', href: '/tools' },
  { name: 'Remote delivery', description: 'How we collaborate with clients and teams across locations.', href: '/remote-delivery' },
] as const;
export default function ResourcesPage() {
  return (
    <section className="rcentz-section py-12 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-widest text-theme-accent">Rcentz Resources</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Explore how we build.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Useful information from the original Rcentz Systems experience, now available at Rcentz.</p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {resources.map(resource => (
          <Link key={resource.href} href={resource.href} className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-theme-accent">
            <h2 className="flex items-center justify-between gap-2 text-lg font-semibold">{resource.name}<ArrowUpRight size={17} aria-hidden="true" className="text-muted-foreground group-hover:text-theme-accent" /></h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{resource.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
