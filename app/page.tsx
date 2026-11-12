import Hero from '@/components/home/Hero';
import TechStackTape from '@/components/home/TechStackTape';
import WhoWeAre from '@/components/home/WhoWeAre';
import HowWeWork from '@/components/home/HowWeWork';

import ProductsShowcase from '@/components/home/ProductsShowcase';
/** Corporate homepage: sections follow the Hero in normal document flow. */
export default function HomePage() {
  return (
    <div className="bg-background">
      <Hero />
      <TechStackTape />
      <WhoWeAre />
      <HowWeWork />
      <ProductsShowcase />
    </div>
  );
}
