import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import styles from './HowWeWork.module.css';

const impact = [
  {
    number: '01',
    audience: 'For your customers',
    result: 'A clearer path from discovery to action.',
    detail: 'Make it easier for people to find you, understand your offer and connect.'
  },
  {
    number: '02',
    audience: 'For your business',
    result: 'Less friction in the work that matters.',
    detail: 'Turn repetitive steps into simpler workflows that support your team.'
  }
] as const;

/**
 * The first editorial section beneath the technology tape.
 * This component is intentionally server-rendered: the illustration is a
 * lightweight, standalone SVG and no new client-side animation is needed.
 */
export default function HowWeWork() {
  return (
    <section className={styles.section} aria-labelledby="how-we-work-title" id="how-we-work">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} aria-hidden="true" />
            Our approach
          </div>
          <h2 className={styles.heading} id="how-we-work-title">
            We build for your customers.
            <span> And the people behind your business.</span>
          </h2>
          <p className={styles.intro}>
            Great technology starts with understanding real people. We listen,
            uncover what is slowing you down, and create digital experiences
            that make everyday interactions easier.
          </p>

          <div className={styles.impactList}>
            {impact.map(item => (
              <div className={styles.impactRow} key={item.number}>
                <span className={styles.impactNumber}>{item.number}</span>
                <div>
                  <span className={styles.impactAudience}>{item.audience}</span>
                  <h3 className={styles.impactTitle}>{item.result}</h3>
                  <p className={styles.impactDetail}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <Link href="/about" className={styles.primaryAction}>
              How we work <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/contact" className={styles.secondaryAction}>
              Start a project <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualGlow} aria-hidden="true" />
          <Image
            src="/illustrations/rcentz-connected-work.svg"
            alt="Illustration of Rcentz connecting business goals to thoughtful design, useful systems and a better customer experience"
            width={720}
            height={570}
            className={styles.illustration}
            unoptimized
            priority={false}
          />
          <p className={styles.visualCaption}>
            <span className={styles.captionMarker} aria-hidden="true" />
            Thoughtful process. Useful outcomes.
          </p>
        </div>
      </div>
    </section>
  );
}
