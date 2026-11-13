/* eslint-disable @next/next/no-img-element -- Small brand SVGs from Devicon are rendered directly to avoid remote Next Image loader configuration. */
import { techStack } from '@/config/tech-stack';
import styles from './TechStackTape.module.css';

function Logos() {
  return (
    <div className={styles.group} aria-hidden="true">
      {techStack.map(tech => (
        <div className={styles.brand} key={tech.name}>
          <span className={styles.iconBox}>
            <img
              src={tech.logo}
              alt=""
              width={23}
              height={23}
              loading="lazy"
              decoding="async"
              className={tech.inverse ? styles.inverseLogo : styles.logo}
            />
          </span>
          <span>{tech.name}</span>
        </div>
      ))}
    </div>
  );
}

/** A compact, looping brand-logo tape — no JS animation and no page-wide banner. */
export default function TechStackTape() {
  return (
    <section aria-labelledby="tech-stack-title" className={styles.section}>
      <div className={styles.tape}>
        <div className={styles.label}>
          <span id="tech-stack-title">Tech stack</span>
          <span className={styles.labelSub}>OUR TOOLKIT</span>
        </div>
        <div className={styles.viewport}>
          <div className={styles.track} aria-hidden="true">
            <Logos />
            <Logos />
          </div>
          <ul className="sr-only">
            {techStack.map(tech => <li key={tech.name}>{tech.name}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
