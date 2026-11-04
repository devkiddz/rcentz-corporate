
export type NavigationLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavigationItem = {
  label: string;
  href: string;
  description?: string;
  items?: NavigationLink[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Systems",
    href: "/systems",
    description: "Software systems engineered for businesses.",
    items: [
      {
        label: "Explore All Systems",
        href: "/systems",
        description: "Discover the Rcentz software ecosystem.",
      },
      {
        label: "Business Platforms",
        href: "/systems/business-platforms",
        description: "Integrated platforms for modern businesses.",
      },
      {
        label: "Enterprise Systems",
        href: "/systems/enterprise",
        description: "Scalable technology for growing organizations.",
      },
    ],
  },
  {
    label: "Products",
    href: "/products",
    description: "Digital products built to create possibilities.",
    items: [
      {
        label: "All Products",
        href: "/products",
        description: "Explore our complete product collection.",
      },
      {
        label: "Digital Products",
        href: "/products/digital",
        description: "Explore our digital product offerings.",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    description: "Technology solutions for business growth.",
    items: [
      {
        label: "All Solutions",
        href: "/solutions",
        description: "Discover how we solve business challenges.",
      },
      {
        label: "Software Development",
        href: "/solutions/software-development",
        description: "Custom software and application development.",
      },
      {
        label: "Digital Transformation",
        href: "/solutions/digital-transformation",
        description: "Modernize your business with technology.",
      },
      {
        label: "Business Automation",
        href: "/solutions/business-automation",
        description: "Simplify workflows and improve efficiency.",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    description: "Get to know the people and vision behind Rcentz.",
    items: [
      {
        label: "About Rcentz",
        href: "/about",
        description: "Who we are and what we stand for.",
      },
      {
        label: "Our Approach",
        href: "/about/approach",
        description: "How we turn ideas into possibilities.",
      },
      {
        label: "Contact Us",
        href: "/contact",
        description: "Let's build something meaningful together.",
      },
    ],
  },
];

export const navigationActions = {
  primary: {
    label: "Explore Systems",
    href: "/systems",
  },
  secondary: {
    label: "Get in Touch",
    href: "/contact",
  },
};

export const brandStatus = {
  label: "Under Development",
};
