'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CircleCheck,
  Clock3,
  Layers3,
  MessageCircle,
  Package,
  Search,
  Store,
  UsersRound
} from 'lucide-react';
import styles from './ProductsShowcase.module.css';
import { productDestinations } from '@/config/rcentz-product-details';

type ProductKind = 'waffi' | 'suite' | 'jobs' | 'inventory' | 'chat';
type Product = {
  kind: ProductKind;
  name: string;
  category: string;
  description: string;
  number: string;
};

/** Product concepts, not launch-status or customer-performance claims. */
const products: Product[] = [
  {
    kind: 'waffi',
    name: 'Waffi',
    category: 'Marketplace',
    description: 'A simpler way to discover businesses, browse their offers, and connect with sellers.',
    number: '01'
  },
  {
    kind: 'suite',
    name: 'Business Suite',
    category: 'Business tools',
    description: 'Keep daily tasks, customer requests, and business relationships in one useful workspace.',
    number: '02'
  },
  {
    kind: 'jobs',
    name: 'JobRcentz',
    category: 'Careers',
    description: 'Bring people and career opportunities together through a more focused experience.',
    number: '03'
  },
  {
    kind: 'inventory',
    name: 'Inventory Manager',
    category: 'Operations',
    description: 'Give growing businesses a clearer way to organize products and stock activities.',
    number: '04'
  },
  {
    kind: 'chat',
    name: 'Live Chat',
    category: 'Communication',
    description: 'Keep customer conversations close to the services and requests they relate to.',
    number: '05'
  }
];

function ProductIcon({ kind }: { kind: ProductKind }) {
  switch (kind) {
    case 'waffi':
      return <Store size={19} strokeWidth={1.8} />;
    case 'suite':
      return <BriefcaseBusiness size={19} strokeWidth={1.8} />;
    case 'jobs':
      return <UsersRound size={19} strokeWidth={1.8} />;
    case 'inventory':
      return <Package size={19} strokeWidth={1.8} />;
    case 'chat':
      return <MessageCircle size={19} strokeWidth={1.8} />;
  }
}

/** Small product-interface concepts: not screenshots of released applications. */
function ProductPreview({ kind }: { kind: ProductKind }) {
  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.previewWindow}>
        <div className={styles.browserBar}>
          <span className={styles.browserDots}><i /><i /><i /></span>
          <span className={styles.browserBrand}>rcentz / {kind === 'suite' ? 'business' : kind}</span>
          <span className={styles.browserAction}><Layers3 size={12} /></span>
        </div>

        {kind === 'waffi' && (
          <div className={styles.marketContent}>
            <div className={styles.marketSearch}><Search size={12} /> Discover what you need <span>⌘K</span></div>
            <div className={styles.marketHeading}>Find something great nearby.</div>
            <div className={styles.marketTiles}>
              <div><Store size={23} /><span>Stores</span></div>
              <div><Package size={23} /><span>Products</span></div>
              <div><UsersRound size={23} /><span>Services</span></div>
            </div>
          </div>
        )}

        {kind === 'suite' && (
          <div className={styles.suiteContent}>
            <div className={styles.microHeading}><span>YOUR WORKSPACE</span><span className={styles.microPill}>Today</span></div>
            <div className={styles.suiteHeadline}>Work, neatly organized.</div>
            <div className={styles.task}><span className={styles.taskIcon}><MessageCircle size={13} /></span><span>Customer enquiry</span><span className={styles.taskStatus}>New</span></div>
            <div className={styles.task}><span className={styles.taskIcon}><Check size={13} /></span><span>Task assigned</span><CircleCheck size={14} className={styles.taskCheck} /></div>
            <div className={styles.task}><span className={styles.taskIcon}><Clock3 size={13} /></span><span>Follow-up reminder</span><ArrowRight size={13} className={styles.taskCheck} /></div>
          </div>
        )}

        {kind === 'jobs' && (
          <div className={styles.jobsContent}>
            <div className={styles.microHeading}><span>OPPORTUNITY DISCOVERY</span><span className={styles.microPill}>Explore</span></div>
            <div className={styles.jobsTitle}>Find your next move.</div>
            <div className={styles.jobsSearch}><Search size={13} /> Search roles and skills</div>
            <div className={styles.roleTile}><div className={styles.roleSymbol}><BriefcaseBusiness size={18} /></div><div><strong>Discover opportunities</strong><small>Find roles that match your skills</small></div><ArrowUpRight size={14} /></div>
          </div>
        )}

        {kind === 'inventory' && (
          <div className={styles.inventoryContent}>
            <div className={styles.microHeading}><span>YOUR INVENTORY</span><span className={styles.microPill}>Organize</span></div>
            <div className={styles.inventoryTitle}>Know what you have.</div>
            <div className={styles.inventoryGrid}>
              <div><Package size={19} /><span>Products</span><i className={styles.inventoryLineLong} /></div>
              <div><Layers3 size={19} /><span>Categories</span><i className={styles.inventoryLineShort} /></div>
            </div>
            <div className={styles.inventoryFooter}><CircleCheck size={13} /> Keep stock records in order</div>
          </div>
        )}

        {kind === 'chat' && (
          <div className={styles.chatContent}>
            <div className={styles.microHeading}><span>CUSTOMER CONVERSATIONS</span><span className={styles.microPill}>Messages</span></div>
            <div className={styles.chatBubbleIncoming}>Hello! Can you help me?</div>
            <div className={styles.chatBubbleOutgoing}>Of course. What do you need?</div>
            <div className={styles.chatInput}>Write a message <ArrowUpRight size={13} /></div>
          </div>
        )}
      </div>
      <span className={styles.previewCorner} />
    </div>
  );
}

export default function ProductsShowcase() {
  const railRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ atStart: true, atEnd: false, progress: 0 });

  function updateScrollState() {
    const rail = railRef.current;
    if (!rail) return;
    const max = Math.max(0, rail.scrollWidth - rail.clientWidth);
    const position = Math.max(0, Math.min(max, rail.scrollLeft));
    setScrollState({
      atStart: position < 4,
      atEnd: max - position < 4,
      progress: max === 0 ? 1 : position / max
    });
  }

  function slide(direction: -1 | 1) {
    const rail = railRef.current;
    const card = rail?.querySelector<HTMLElement>('[data-product-card]');
    if (!rail || !card) return;
    const gap = Number.parseFloat(window.getComputedStyle(rail).columnGap) || 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    rail.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  }

  return (
    <section id="rcentz-products" aria-labelledby="rcentz-products-title" className={styles.section}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.intro}>
        <div className={styles.kicker}><span className={styles.kickerDot} />03 / RCENTZ PRODUCTS <span className={styles.kickerRule} /></div>
        <div className={styles.introGrid}>
          <h2 id="rcentz-products-title" className={styles.title}>
            Built for the ways <span>people work and live.</span>
          </h2>
          <div className={styles.introAside}>
            <p>From marketplaces to everyday business tools, we turn real needs into useful digital experiences.</p>
            <Link href="/products" className={styles.allProducts}>Explore all products <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      <div className={styles.carouselFrame}>
        <div ref={railRef} className={styles.rail} onScroll={updateScrollState} role="region" aria-label="Rcentz product showcase carousel" tabIndex={0}>
          {products.map(product => (
            <article data-product-card key={product.kind} className={styles.card} aria-label={`${product.name}, ${product.category}`}>
              <ProductPreview kind={product.kind} />
              <div className={styles.cardBody}>
                <div className={styles.cardEyebrow}><span className={styles.productIcon}><ProductIcon kind={product.kind} /></span><span>{product.category}</span><span className={styles.cardNumber}>{product.number} / 05</span></div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <Link
                  href={productDestinations[product.kind]}
                  className={styles.exploreButton}
                  aria-label={`Explore ${product.name}`}>
                  Explore <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p>Explore the products <span>· Swipe or use the arrows</span></p>
        <div className={styles.footerTools}>
          <div className={styles.progressTrack} aria-hidden="true"><span style={{ transform: `scaleX(${scrollState.progress})` }} /></div>
          <button type="button" className={styles.navButton} onClick={() => slide(-1)} disabled={scrollState.atStart} aria-label="Scroll products left"><ArrowLeft size={18} /></button>
          <button type="button" className={styles.navButton} onClick={() => slide(1)} disabled={scrollState.atEnd} aria-label="Scroll products right"><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
