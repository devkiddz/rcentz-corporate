'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { systemsLinks } from '@/config/rcentz-apps';

type AccountActionsProps = {
  mobile?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
};

/** Corporate never reads a customer session; login and projects belong to Systems. */
export function RcentzAccountActions({ mobile = false, compact = false, onNavigate }: AccountActionsProps) {
  const sizing = mobile ? 'min-h-11 px-4 text-sm' : compact ? 'h-8 px-3 text-xs' : 'h-9 px-3 text-xs';
  const focus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
  return (
    <div className={mobile ? 'grid min-w-0 grid-cols-2 gap-2' : 'flex shrink-0 items-center gap-2'}>
      <Link href={systemsLinks.login} onClick={onNavigate} className={['inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium hover:bg-surface-muted', sizing, focus].join(' ')}>Login</Link>
      <Link href={systemsLinks.startProject} onClick={onNavigate} className={['inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-foreground font-medium text-background hover:opacity-85', sizing, focus].join(' ')}>Start a project <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0" /></Link>
    </div>
  );
}
