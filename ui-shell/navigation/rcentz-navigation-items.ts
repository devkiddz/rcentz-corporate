/** Corporate navigation: publish only confirmed routes; future sections remain visible but inactive. */
export const rcentzNavigationItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Products',
    children: [
      { label: 'Explore products', href: 'https://products.rcentz.cc' }
    ]
  },
  { label: 'Services', href: '/services' },
  {
    label: 'Resources',
    children: [
      { label: 'About', href: '/about', group: 'Company' },
      { label: 'Contact', href: '/contact', group: 'Company' },
      { label: 'Tools', href: '/tools', group: 'Build' },
      { label: 'Remote Delivery', href: '/remote-delivery', group: 'Build' },
      { label: 'Blog', href: '/blog', group: 'Explore' },
      { label: 'Docs', href: '/docs', group: 'Explore' },
      { label: 'Marketplace', group: 'Explore', comingSoon: true },
      { label: 'Support & FAQ', group: 'Explore', comingSoon: true }
    ]
  }
] as const;
