import Hero from '@/components/home/Hero';
import TechStackTape from '@/components/home/TechStackTape';
import WhoWeAre from '@/components/home/WhoWeAre';
import HowWeWork from '@/components/home/HowWeWork';
import styles from '@/components/home/HomeParallax.module.css';

/** M27: The hero stays visually behind opaque panels while the page scrolls. */
export default function HomePage() {
  return (
    <div className={styles.page}>
      <div className={styles.heroStage}>
        <Hero />
        <TechStackTape />
      </div>

      <div className={styles.contentStack}>
        <WhoWeAre />
        <HowWeWork />
        {/* A third editorial section will be added when its content is approved. */}
      </div>
    </div>
  );
}
