import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import IridescentRibbon from './IridescentRibbon';
import styles from './RibbonHero.module.css';

export default function RibbonHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.ribbon}><IridescentRibbon /></div>
      <div className={styles.container}>
        <div className={styles.topNote}>
          <span className={styles.rule} />
          Thoughtful software. Connected possibilities.
        </div>
        <div className={styles.content}>
          <p className={styles.eyebrow}>RCENTZ · DIGITAL SOLUTIONS</p>
          <h1 id="hero-title" className={styles.heading}>
            Building what&apos;s <span>next.</span>
          </h1>
          <p className={styles.description}>
            Websites, software and connected systems, designed to make business simpler and ideas possible.
          </p>
          <div className={styles.actions}>
            <Link href="/services" className={styles.primary}>
              Explore services <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
            <Link href="/about" className={styles.secondary}>Discover Rcentz</Link>
          </div>
        </div>
        <div className={styles.bottomNote} aria-hidden="true">DESIGN / ENGINEERING / PRODUCTS</div>
      </div>
    </section>
  );
}
