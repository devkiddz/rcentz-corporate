import type { Metadata } from 'next';
import { PageIntro, FeatureRows, ClosingCTA } from '@/components/site/Editorial';
export const metadata: Metadata = { title: 'Products' };
export default function ProductsPage() {
  return (
    <>
      <PageIntro eyebrow="Rcentz Products" title="Products designed to move ideas forward." description="Explore the digital product initiatives developed within the Rcentz ecosystem." />
      <FeatureRows items={[{ number: '01', eyebrow: 'Rcentz Products', title: 'Digital platforms', body: 'Useful products designed around distinct customer and business needs.', href: 'https://products.rcentz.cc', link: 'Visit product catalogue' },
{ number: '02', eyebrow: 'Rcentz Products', title: 'Connected experiences', body: 'Applications that can share a consistent identity and a coherent ecosystem.', href: 'https://products.rcentz.cc', link: 'Visit product catalogue' },
{ number: '03', eyebrow: 'Rcentz Products', title: 'Discover the catalogue', body: 'Visit the Rcentz Products destination to learn about current product offerings.', href: 'https://products.rcentz.cc', link: 'Visit product catalogue' }]} />
      <div className="mx-auto max-w-[1500px] px-6 py-12 sm:px-10 lg:px-16"><a href="https://products.rcentz.cc" className="text-sm font-semibold text-blue-100 underline underline-offset-4">Visit Rcentz Products ↗</a></div>
      <ClosingCTA />
    </>
  );
}
