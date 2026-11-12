/**
 * M43 product destinations and overview copy.
 * Internal routes are intentional: do not assume a product is publicly launched.
 * When an official destination is confirmed, update productDestinations.
 */
export const productDestinations = {
  waffi: '/products/waffi',
  suite: '/products/business-suite',
  jobs: '/products/jobrcentz',
  inventory: '/products/inventory-manager',
  chat: '/products/live-chat'
} as const;

type ProductId = keyof typeof productDestinations;

export type ProductOverview = {
  id: ProductId;
  slug: string;
  number: string;
  name: string;
  category: string;
  headline: string;
  description: string;
  priorities: readonly {
    title: string;
    description: string;
  }[];
};

export const productOverviews: readonly ProductOverview[] = [
  {
    id: 'waffi',
    slug: 'waffi',
    number: '01',
    name: 'Waffi',
    category: 'Marketplace',
    headline: 'Make local discovery feel effortless.',
    description: 'Waffi is a marketplace concept designed to bring businesses, products, and customers closer together in one discoverable experience.',
    priorities: [
      { title: 'Discover', description: 'Make it easier to find businesses and explore what they offer.' },
      { title: 'Browse', description: 'Present products and services with a clear, useful structure.' },
      { title: 'Connect', description: 'Help customers take the next step with a seller.' }
    ]
  },
  {
    id: 'suite',
    slug: 'business-suite',
    number: '02',
    name: 'Business Suite',
    category: 'Business tools',
    headline: 'Put everyday work in its place.',
    description: 'Business Suite brings the important moving pieces of a small business into a practical workspace, from customer relationships to reminders and tasks.',
    priorities: [
      { title: 'Organize', description: 'Keep tasks, notes, and work priorities easier to manage.' },
      { title: 'Respond', description: 'Maintain context around customers and their requests.' },
      { title: 'Follow through', description: 'Make routine operations feel more predictable.' }
    ]
  },
  {
    id: 'jobs',
    slug: 'jobrcentz',
    number: '03',
    name: 'JobRcentz',
    category: 'Careers',
    headline: 'Connect talent with the next opportunity.',
    description: 'JobRcentz is built around a focused experience for discovering roles and connecting job seekers with organizations looking for people.',
    priorities: [
      { title: 'Find roles', description: 'Make opportunities easier to explore.' },
      { title: 'Build a profile', description: 'Help candidates present their experience and skills.' },
      { title: 'Connect', description: 'Support a clearer path between applicants and employers.' }
    ]
  },
  {
    id: 'inventory',
    slug: 'inventory-manager',
    number: '04',
    name: 'Inventory Manager',
    category: 'Operations',
    headline: 'A clearer picture of what you carry.',
    description: 'An inventory-management product direction focused on making everyday product records and stock workflows easier to understand.',
    priorities: [
      { title: 'Catalog', description: 'Give stock items and categories a clear home.' },
      { title: 'Organize', description: 'Make changes and daily activity easier to follow.' },
      { title: 'Stay informed', description: 'Keep useful product information close to decisions.' }
    ]
  },
  {
    id: 'chat',
    slug: 'live-chat',
    number: '05',
    name: 'Live Chat',
    category: 'Communication',
    headline: 'Make every conversation easier to follow.',
    description: 'A communication product concept for keeping customer conversations connected to the businesses and requests they concern.',
    priorities: [
      { title: 'Start a conversation', description: 'Help customers reach the right point of contact.' },
      { title: 'Keep context', description: 'Bring messages and requests closer together.' },
      { title: 'Stay connected', description: 'Make follow-ups feel more natural.' }
    ]
  }
];
