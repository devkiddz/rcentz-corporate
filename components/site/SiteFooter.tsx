import Link from 'next/link';
const links = [
  { label: 'Company', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' }
];

export default function SiteFooter() {
  return (
    <footer className="relative border-t border-[#dbe5ef] bg-white">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 py-14 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
        <div>
          <Link href="/" className="font-rcentz text-3xl text-[#15243b]">rcentz</Link>
          <p className="mt-4 max-w-sm text-sm leading-7 text-muted-foreground">
            Thoughtful software, connected systems and purposeful digital products.
          </p>
          <p className="mt-7 text-xs text-[#72839b]">© 2026 Rcentz. All rights reserved.</p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-7 gap-y-4">
          {links.map(item => (
            <Link key={item.href} href={item.href}
              className="text-sm text-[#536780] transition-colors hover:text-[#0058d6]">{item.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
