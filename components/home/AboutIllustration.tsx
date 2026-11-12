'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Globe2,
  Layers3,
  MessageCircle,
  MousePointer2,
  PackageCheck,
  Workflow
} from 'lucide-react';
import styles from './AboutIllustration.module.css';
import StaticHeroParticles from './StaticHeroParticles';

/**
 * M37: Reuses the motion concept from JobRcentz's HomeHero:
 * three overlapping previews, a 4.5-second active-card rotation,
 * hover/focus pause and manual selection. No analytics or invented figures.
 *
 * We use CSS transforms rather than adding Framer Motion to the corporate site.
 */
const stories = [
  {
    id: 'discover',
    label: '01 / Discover',
    focus: 'Help customers find you',
    description:
      'A clear digital presence turns an initial search into a confident first enquiry.',
    kind: 'discover'
  },
  {
    id: 'organize',
    label: '02 / Organize',
    focus: 'Make everyday work simpler',
    description:
      'Connected tools bring customer requests and team activity into one useful workflow.',
    kind: 'organize'
  },
  {
    id: 'deliver',
    label: '03 / Deliver',
    focus: 'Keep customers in the loop',
    description:
      'Thoughtful product experiences make progress, updates and delivery easier to follow.',
    kind: 'deliver'
  }
] as const;

type StoryKind = (typeof stories)[number]['kind'];

function Preview({ kind }: { kind: StoryKind }) {
  if (kind === 'discover') {
    return (
      <div className={styles.preview}>
        <div className={styles.previewEyebrow}>BUSINESS WEBSITE / DISCOVERY</div>
        <div className={styles.websiteHero}>
          <div className={styles.websiteCopy}>
            <span className={styles.eyebrowPill}>
              <Globe2 size={12} /> Digital storefront
            </span>
            <strong>Your business, easy to discover.</strong>
            <small>Give people a clear way to see what you offer and get in touch.</small>
            <span className={styles.demoCta}>
              Explore services <ArrowRight size={12} />
            </span>
          </div>
          <div className={styles.websiteArtwork} aria-hidden="true">
            <span className={styles.artCircle} />
            <span className={styles.artWindow}>
              <span />
              <span />
              <span />
            </span>
            <MousePointer2 size={21} className={styles.artCursor} />
          </div>
        </div>
        <div className={styles.serviceList}>
          <span>Services</span>
          <span>Product catalogue</span>
          <span>Contact</span>
        </div>
        <div className={styles.inlineResult}>
          <MessageCircle size={14} /> Enquiry ready to send <CheckCircle2 size={14} />
        </div>
      </div>
    );
  }

  if (kind === 'organize') {
    return (
      <div className={styles.preview}>
        <div className={styles.previewEyebrow}>BUSINESS SYSTEM / OPERATIONS</div>
        <div className={styles.workspaceTop}>
          <div>
            <strong>One place for the work.</strong>
            <small>Requests, handoffs and follow-ups — connected.</small>
          </div>
          <span className={styles.liveTag}>
            <span /> Workspace
          </span>
        </div>
        <div className={styles.requestList}>
          <div className={styles.requestRow}>
            <span className={styles.requestIcon}>
              <MessageCircle size={15} />
            </span>
            <span className={styles.requestText}>
              <strong>Customer request</strong>
              <small>New enquiry received</small>
            </span>
            <span className={styles.requestTag}>New</span>
          </div>
          <div className={styles.requestRow}>
            <span className={styles.requestIcon}>
              <Workflow size={15} />
            </span>
            <span className={styles.requestText}>
              <strong>Team follow-up</strong>
              <small>Assigned to the right person</small>
            </span>
            <CheckCircle2 size={16} className={styles.requestDone} />
          </div>
          <div className={styles.requestRow}>
            <span className={styles.requestIcon}>
              <ClipboardCheck size={15} />
            </span>
            <span className={styles.requestText}>
              <strong>Next action</strong>
              <small>Ready to proceed</small>
            </span>
            <CheckCircle2 size={16} className={styles.requestDone} />
          </div>
        </div>
        <div className={styles.inlineResult}>
          <Check size={14} /> Less manual chasing. More clarity.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.preview}>
      <div className={styles.previewEyebrow}>DIGITAL PRODUCT / CUSTOMER EXPERIENCE</div>
      <div className={styles.deliveryHeading}>
        <div>
          <strong>Make every step feel clear.</strong>
          <small>Customers know what&apos;s happening next.</small>
        </div>
        <span className={styles.deliveryIcon}>
          <PackageCheck size={22} />
        </span>
      </div>
      <div className={styles.deliveryStatus}>
        <span className={styles.statusSymbol}>
          <CheckCircle2 size={22} />
        </span>
        <span>
          <strong>Request confirmed</strong>
          <small>Your request is being taken care of.</small>
        </span>
      </div>
      <div className={styles.timeline}>
        <span className={styles.timelineStep}>
          <Check size={13} />
          <small>Received</small>
        </span>
        <span className={styles.timelineConnector} />
        <span className={styles.timelineStep}>
          <Clock3 size={13} />
          <small>In progress</small>
        </span>
        <span className={styles.timelineConnector} />
        <span className={styles.timelineStep}>
          <PackageCheck size={13} />
          <small>Delivery</small>
        </span>
      </div>
      <div className={styles.inlineResult}>
        <MessageCircle size={14} /> Updates that build confidence.
      </div>
    </div>
  );
}

export default function AboutIllustration() {
  const sceneRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener('change', syncMotion);

    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);

    const node = sceneRef.current;
    const observer = new IntersectionObserver(
      entries => setInView(entries[0]?.isIntersecting ?? false),
      { threshold: 0.2 }
    );
    if (node) observer.observe(node);

    return () => {
      media.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!inView || !tabVisible || paused || reducedMotion) return;

    // Mirrors JobRcentz's three-card, 4.5-second featured-card rotation.
    const interval = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % stories.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, [inView, tabVisible, paused, reducedMotion]);

  const activeStory = stories[activeIndex];

  return (
    <figure
      ref={sceneRef}
      className={styles.scene}
      aria-label="Illustrative Rcentz digital solutions showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null))
          setPaused(false);
      }}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.halo} aria-hidden="true" />
      <StaticHeroParticles />

      <div className={styles.heading}>
        <div>
          <div className={styles.eyebrow}>
            <span /> DIGITAL SOLUTIONS IN ACTION
          </div>
          <div className={styles.title}>From business need to better experiences.</div>
        </div>
        <span className={styles.cornerMark} aria-hidden="true">
          <Layers3 size={20} />
        </span>
      </div>

      <div className={styles.deck}>
        <div className={styles.orbit} aria-hidden="true" />
        <div className={styles.orbitInner} aria-hidden="true" />
        {stories.map((story, index) => {
          const position = (index - activeIndex + stories.length) % stories.length;
          return (
            <button
              type="button"
              key={story.id}
              data-position={position}
              className={styles.card}
              aria-label={`Show ${story.focus} concept`}
              aria-pressed={position === 0}
              tabIndex={position === 0 ? 0 : -1}
              onClick={() => setActiveIndex(index)}>
              <span className={styles.windowBar}>
                <span className={styles.windowDots} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.windowBrand}>
                  RCENTZ / <span>{story.id.toUpperCase()}</span>
                </span>
                <span className={styles.connection}>
                  <span /> Connected
                </span>
              </span>
              <Preview kind={story.kind} />
            </button>
          );
        })}
      </div>

      <div className={styles.storyInfo} aria-live="polite" aria-atomic="true">
        <span className={styles.storyNumber}>{activeStory.label}</span>
        <strong>{activeStory.focus}</strong>
        <p>{activeStory.description}</p>
      </div>

      <div className={styles.controls} aria-label="Choose a Rcentz workflow example">
        {stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${story.label}: ${story.focus}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`${styles.indicator} ${index === activeIndex ? styles.indicatorActive : ''}`}
          />
        ))}
      </div>
      <figcaption className={styles.caption}>
        Illustrative workflows — examples of the experiences Rcentz can build.
      </figcaption>
    </figure>
  );
}
