import Image from 'next/image';
import { rcentzTypography } from './rcentz-typography';

type RcentzBrandLockupProps = {
  className?: string;
};

export function RcentzBrandLockup({ className = '' }: RcentzBrandLockupProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap ${className}`}
      aria-label="Rcentz">
      <span className="relative block shrink-0">
        <Image
          src="/brand/rcentz-mark-light.svg"
          alt=""
          width={24}
          height={24}
          unoptimized
          className="object-contain dark:hidden"
        />
        <Image
          src="/brand/rcentz-mark-dark.svg"
          alt=""
          width={24}
          height={24}
          unoptimized
          className="hidden object-contain dark:block"
        />
      </span>
      <span
        className={`${rcentzTypography.className} text-[17px] font-bold tracking-[0.015em] text-foreground`}>
        Rcentz
      </span>
    </span>
  );
}
