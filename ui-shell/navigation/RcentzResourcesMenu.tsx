'use client';

import Image from 'next/image';

type ResourceItem = {
  readonly label: string;
  readonly href?: string;
  readonly group?: string;
  readonly comingSoon?: boolean;
};

type RcentzResourcesMenuProps = {
  readonly items: readonly ResourceItem[];
  readonly mobile?: boolean;
  readonly compact?: boolean;
  readonly onNavigate: () => void;
};

const categories = [
  { title: 'Company', group: 'Company' },
  { title: 'Build', group: 'Build' },
  { title: 'Explore', group: 'Explore' }
] as const;

/**
 * Compact Rcentz Resources mega menu. Existing page links open new tabs.
 * Marketplace and Support & FAQ are explicitly non-clickable until their
 * destinations exist; this avoids publishing broken links.
 */
export function RcentzResourcesMenu({
  items,
  mobile = false,
  compact = false,
  onNavigate
}: RcentzResourcesMenuProps) {
  return (
    <div
      className={
        mobile || compact
          ? 'grid grid-cols-2 gap-4 px-4 py-4'
          : 'grid grid-cols-[0.7fr_0.85fr_1.1fr_1.25fr] gap-5 px-6 py-6 xl:gap-7'
      }>
      {categories.map(category => (
        <div key={category.group} className="min-w-0">
          <p
            className={
              mobile || compact
                ? 'mb-2 text-xs text-muted-foreground'
                : 'mb-3 text-[13px] leading-5 text-muted-foreground'
            }>
            {category.title}
          </p>
          <ul className="space-y-1.5">
            {items
              .filter(item => item.group === category.group)
              .map(item => (
                <li key={item.label}>
                  {item.href && !item.comingSoon ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onNavigate}
                      className={[
                        'block rounded-sm font-medium tracking-[-0.025em] text-foreground',
                        'transition-colors hover:text-theme-accent',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        mobile || compact
                          ? 'py-1 text-[16px] leading-6'
                          : 'py-0.5 text-[19px] leading-[1.4]'
                      ].join(' ')}>
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    <div
                      aria-label={`${item.label}, coming soon`}
                      className={[
                        'flex flex-wrap items-baseline gap-x-1.5 rounded-sm text-muted-foreground',
                        mobile || compact
                          ? 'py-1 text-[16px] leading-6'
                          : 'py-0.5 text-[19px] leading-[1.4]'
                      ].join(' ')}>
                      <span>{item.label}</span>
                      <span className="text-[9px] tracking-normal text-theme-accent/80">Soon</span>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}

      {!mobile && !compact ? (
        <aside
          aria-label="Explore Rcentz resources"
          className="relative flex min-h-[234px] flex-col justify-end overflow-hidden rounded-lg border border-border/40 bg-surface-subtle">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(0,109,253,0.13),transparent_72%)]" />
          <div className="pointer-events-none relative flex flex-1 items-center justify-center px-2 pt-1">
            <Image
              src="/illustrations/rcentz-resources-mega.webp"
              alt=""
              width={750}
              height={501}
              priority={false}
              className="h-auto max-h-[195px] w-full object-contain"
            />
          </div>
          <div className="relative border-t border-border/40 px-4 pb-3 pt-2.5">
            <p className="text-xs font-semibold text-foreground">Everything in one place.</p>
            <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
              Discover tools, insights and ways to work with Rcentz.
            </p>
          </div>
        </aside>
      ) : null}
    </div>
  );
}
