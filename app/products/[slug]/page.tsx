import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Layers3 } from 'lucide-react';
import { productOverviews } from '@/config/rcentz-product-details';
import styles from './ProductOverview.module.css';

type PageProps = { params: Promise<{ slug: string }> };

// export const dynamicParams = false;

export function generateStaticParams() {
  return productOverviews.map(product => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productOverviews.find(item => item.slug === slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: `${product.name} | Rcentz Products`,
    description: product.description
  };
}

/** A lightweight, informational detail page for each product in the homepage rail. */
export default async function ProductOverviewPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productOverviews.find(item => item.slug === slug);
  if (!product) notFound();

  return (
    <main>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <Link className={styles.back} href="/#rcentz-products">
            <ArrowLeft size={16} aria-hidden="true" /> Back to products
          </Link>
          <div className={styles.heroGrid}>
            <div className={styles.copy}>
              <p className={styles.eyebrow}>
                RCENTZ PRODUCTS <span>/</span> {product.category}
              </p>
              <h1>
                {product.name}
                <span>.</span>
              </h1>
              <h2>{product.headline}</h2>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.actions}>
                <Link href="/products" className={styles.primaryAction}>
                  Browse all products <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/contact" className={styles.secondaryAction}>
                  Talk to Rcentz <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className={styles.visual} aria-label={`${product.name} areas of focus`}>
              <div className={styles.visualHeader}>
                <span>
                  <i aria-hidden="true" /> RCENTZ / {product.name.toUpperCase()}
                </span>
                <Layers3 size={17} aria-hidden="true" />
              </div>
              <div className={styles.visualBody}>
                <div className={styles.visualKicker}>PRODUCT DIRECTION</div>
                <h3>{product.headline}</h3>
                <div className={styles.flow}>
                  {product.priorities.map((point, index) => (
                    <div className={styles.flowStep} key={point.title}>
                      <div className={styles.stepIndex}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <strong>{point.title}</strong>
                      <span>
                        <Check size={14} aria-hidden="true" />
                      </span>
                    </div>
                  ))}
                </div>
                <p className={styles.visualFooter}>
                  Useful technology. Made with purpose.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.details} aria-labelledby="product-focus-heading">
        <div className={styles.shell}>
          <div className={styles.detailsIntro}>
            <p className={styles.eyebrow}>WHAT IT AIMS TO SIMPLIFY</p>
            <h2 id="product-focus-heading">Thoughtful tools for real needs.</h2>
          </div>
          <div className={styles.focusGrid}>
            {product.priorities.map((point, index) => (
              <article className={styles.focusCard} key={point.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
