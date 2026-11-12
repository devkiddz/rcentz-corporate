/** Public information lives on Corporate. Transactional entry points live on Systems. */
export const rcentzNavigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: '/docs' },
  { label: 'Products', children: [
    { label: 'Explore products', href: 'https://products.rcentz.cc' },
  ] },
  { label: 'Resources', children: [
    { label: 'Resource library', href: '/resources', group: 'Learn' },
    { label: 'How we work', href: '/how-we-work', group: 'Learn' },
    { label: 'Our tools', href: '/tools', group: 'Build' },
    { label: 'Remote delivery', href: '/remote-delivery', group: 'Build' },
    { label: 'Products', href: 'https://products.rcentz.cc', group: 'Explore' },
  ] },
] as const;
