'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUpRight, ChevronDown, Circle, Menu, X } from 'lucide-react';

import { navigationItems, navigationActions, brandStatus } from '@/config/navigation-items';

export default function Navbar() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();

    closeTimer.current = setTimeout(() => {
      setActiveDropdown(null);
      closeTimer.current = null;
    }, 220);
  }, [cancelClose]);

  const openDropdown = useCallback(
    (label: string) => {
      cancelClose();
      setActiveDropdown(label);
    },
    [cancelClose]
  );

  const closeNavigation = useCallback(() => {
    cancelClose();
    setActiveDropdown(null);
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [cancelClose]);

  const isActive = useCallback(
    (href: string) => {
      if (href === '/') return pathname === '/';

      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  const isGroupActive = useCallback(
    (href: string, items?: { href: string }[]) => {
      return isActive(href) || !!items?.some(item => isActive(item.href));
    },
    [isActive]
  );

  const toggleMobileGroup = (label: string) => {
    setExpandedMobile(current => (current === label ? null : label));
  };

  // Close menus on Escape and outside interaction.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeNavigation();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        closeNavigation();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeNavigation]);

  // Close menus after route changes.
  // useEffect(() => {
  //   closeNavigation();
  // }, [pathname, closeNavigation]);

  // Clean up any pending close timer.
  useEffect(() => {
    return () => cancelClose();
  }, [cancelClose]);

  return (
    <header
      ref={headerRef}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-background/85 backdrop-blur-2xl">
      {/* MAIN NAVIGATION BAR */}

      <div className="relative mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* BRAND */}

        <Link
          href="https://rcentz.cc"
          aria-label="Rcentz home"
          onClick={closeNavigation}
          className="group flex shrink-0 items-center gap-2.5">
          <Image
            src="https://api.rcentz.cc/brands/rcentz/rcentz-mark-dark.svg"
            alt=""
            width={36}
            height={36}
            priority
            className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105"
          />

          <span className="font-rcentz text-[25px] leading-none text-foreground">rcentz</span>
        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav aria-label="Main navigation" className="hidden h-full items-center gap-1 lg:flex">
          {navigationItems.map(item => {
            const hasChildren = !!item.items?.length;
            const active = isGroupActive(item.href, item.items);
            const opened = activeDropdown === item.label;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeNavigation}
                  aria-current={active ? 'page' : undefined}
                  className={`relative flex h-full items-center px-4 text-[13px] font-medium transition-colors ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}>
                  {item.label}

                  {active && (
                    <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-primary" />
                  )}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                aria-expanded={opened}
                aria-haspopup="true"
                onMouseEnter={() => openDropdown(item.label)}
                onFocus={() => openDropdown(item.label)}
                className={`flex h-full items-center gap-1.5 px-4 text-[13px] font-medium transition-colors ${
                  opened || active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}>
                {item.label}

                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${opened ? 'rotate-180 text-primary' : ''}`}
                />
              </button>
            );
          })}
        </nav>

        {/* DESKTOP ACTIONS */}

        <div className="hidden shrink-0 items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
            <Circle
              size={10}
              fill="currentColor"
              className="text-primary rotate-45 animate-[ping_5s_cubic-bezier(0,0,0.2,1)_infinite]"
            />
            {brandStatus.label}
          </div>

          <Link
            href={navigationActions.secondary.href}
            onClick={closeNavigation}
            className="text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">
            {navigationActions.secondary.label}
          </Link>

          <Link
            href={navigationActions.primary.href}
            onClick={closeNavigation}
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-[12px] font-semibold text-primary-foreground transition-all hover:bg-primary-hover">
            {navigationActions.primary.label}

            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            cancelClose();
            setMobileOpen(current => !current);
            setActiveDropdown(null);
          }}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-foreground transition-colors hover:bg-accent lg:hidden">
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* DESKTOP MEGA MENU */}

      {activeDropdown && (
        <>
          {navigationItems
            .filter(item => item.label === activeDropdown)
            .map(item => (
              <div
                key={item.label}
                className="absolute left-1/2 top-full z-50 w-[min(760px,calc(100vw-3rem))] -translate-x-1/2 pt-3">
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40">
                    <div className="grid grid-cols-[1fr_240px]">
                      {/* MENU LINKS */}

                      <div className="p-6">
                        <div className="mb-5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                            Explore
                          </p>

                          <h2 className="mt-2 text-lg font-semibold tracking-tight text-card-foreground">
                            {item.label}
                          </h2>

                          {item.description && (
                            <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          {item.items?.map(child => {
                            const childActive = isActive(child.href);

                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={closeNavigation}
                                aria-current={childActive ? 'page' : undefined}
                                className={`group rounded-lg p-3 transition-colors ${
                                  childActive ? 'bg-accent' : 'hover:bg-accent'
                                }`}>
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`text-[13px] font-semibold ${
                                      childActive ? 'text-primary' : 'text-card-foreground'
                                    }`}>
                                    {child.label}
                                  </span>

                                  <ArrowUpRight
                                    size={13}
                                    className="shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                                  />
                                </div>

                                {child.description && (
                                  <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                                    {child.description}
                                  </p>
                                )}
                              </Link>
                            );
                          })}
                        </div>

                        {/* VIEW ALL */}

                        <Link
                          href={item.href}
                          onClick={closeNavigation}
                          className="mt-5 inline-flex items-center gap-2 border-t border-border pt-4 text-[12px] font-semibold text-muted-foreground transition-colors hover:text-primary">
                          Explore all {item.label}
                          <ArrowUpRight size={13} />
                        </Link>
                      </div>

                      {/* FEATURED PANEL */}

                      <div className="flex flex-col justify-between border-l border-border bg-surface p-6">
                        <div>
                          <div className="mb-5 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                            <Circle size={12} fill="currentColor" className="text-primary" />
                          </div>

                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                            RCENTZ
                          </p>

                          <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                            Everything happens for me.
                          </h3>

                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            Building digital systems, products and solutions that move businesses forward.
                          </p>
                        </div>

                        <div className="mt-8 border-t border-border pt-4">
                          <div className="flex items-center gap-2 text-[10px] font-medium text-muted-foreground">
                            <Circle size={7} fill="currentColor" className="text-primary" />
                            {brandStatus.label}
                          </div>

                          <Link
                            href="https://rcentz.cc"
                            onClick={closeNavigation}
                            className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-foreground transition-colors hover:text-primary">
                            About Rcentz
                            <ArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      )}

      {/* MOBILE NAVIGATION */}

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full border-b border-border bg-background shadow-2xl shadow-black/30 lg:hidden">
          <div className="max-h-[calc(100dvh-68px)] overflow-y-auto px-5 pb-8 pt-5 sm:px-8">
            {/* BRAND STATUS */}

            <div className="mb-5 flex items-center justify-between rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Rcentz Digital Solutions
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">Everything happens for me.</p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-medium text-primary">
                <Circle size={7} fill="currentColor" />
                {brandStatus.label}
              </div>
            </div>

            {/* MOBILE LINKS */}

            <nav aria-label="Mobile navigation" className="space-y-1">
              {navigationItems.map(item => {
                const hasChildren = !!item.items?.length;
                const active = isGroupActive(item.href, item.items);
                const expanded = expandedMobile === item.label;

                if (!hasChildren) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeNavigation}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-lg px-4 py-3.5 text-[13px] font-medium transition-colors ${
                        active ? 'bg-accent text-primary' : 'text-foreground hover:bg-surface-elevated'
                      }`}>
                      {item.label}

                      {active && <Circle size={7} fill="currentColor" />}
                    </Link>
                  );
                }

                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      onClick={() => toggleMobileGroup(item.label)}
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3.5 text-[13px] font-medium transition-colors ${
                        expanded || active
                          ? 'bg-surface-elevated text-foreground'
                          : 'text-foreground hover:bg-surface-elevated'
                      }`}>
                      {item.label}

                      <ChevronDown
                        size={15}
                        className={`text-muted-foreground transition-transform duration-200 ${
                          expanded ? 'rotate-180 text-primary' : ''
                        }`}
                      />
                    </button>

                    {expanded && (
                      <div className="ml-3 mt-1 space-y-1 border-l border-border py-1 pl-3">
                        {item.description && (
                          <p className="px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        )}

                        {item.items?.map(child => {
                          const childActive = isActive(child.href);

                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={closeNavigation}
                              aria-current={childActive ? 'page' : undefined}
                              className={`block rounded-lg px-3 py-3 transition-colors ${
                                childActive
                                  ? 'bg-accent text-primary'
                                  : 'text-muted-foreground hover:bg-surface-elevated hover:text-foreground'
                              }`}>
                              <span className="block text-[12px] font-semibold">{child.label}</span>

                              {child.description && (
                                <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">
                                  {child.description}
                                </span>
                              )}
                            </Link>
                          );
                        })}

                        <Link
                          href={item.href}
                          onClick={closeNavigation}
                          className="inline-flex items-center gap-1 px-3 py-3 text-[11px] font-semibold text-primary">
                          Explore all {item.label}
                          <ArrowUpRight size={12} />
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* MOBILE ACTIONS */}

            <div className="mt-6 space-y-3 border-t border-border pt-5">
              <Link
                href={navigationActions.primary.href}
                onClick={closeNavigation}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3.5 text-[13px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover">
                {navigationActions.primary.label}
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href={navigationActions.secondary.href}
                onClick={closeNavigation}
                className="flex w-full items-center justify-center rounded-lg border border-border px-5 py-3.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground">
                {navigationActions.secondary.label}
              </Link>
            </div>

            <p className="mt-8 text-center text-[10px] tracking-wider text-muted-foreground">
              © {new Date().getFullYear()} RCENTZ. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
