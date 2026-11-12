export type NavigationLink = { label: string; href: string; description?: string };
export type NavigationItem = { label: string; href: string; description?: string; items?: NavigationLink[] };

export const navigationItems: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Company', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Products', href: '/products' }
];

export const navigationActions = {
  primary: { label: 'Start a project', href: '/contact' },
  secondary: { label: 'Contact', href: '/contact' }
};

export const brandStatus = { label: 'Rcentz Digital Solutions' };
