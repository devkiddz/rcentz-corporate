/**
 * Recognizable brand marks from the Devicon SVG library.
 * Source: https://github.com/devicons/devicon
 * Brand ownership remains with the respective companies.
 * Displaying a logo does not imply endorsement or partnership.
 */
export type TechStackItem = {
  name: string;
  category: 'frontend' | 'backend' | 'tooling';
  logo: string;
  inverse?: boolean;
};

export const techStack: readonly TechStackItem[] = [
  {
    name: 'Next.js',
    category: 'frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/nextjs/nextjs-original.svg',
    inverse: true
  },
  {
    name: 'React',
    category: 'frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/react/react-original.svg'
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/typescript/typescript-original.svg'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/tailwindcss/tailwindcss-original.svg'
  },
  {
    name: 'Node.js',
    category: 'backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/nodejs/nodejs-original.svg'
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/postgresql/postgresql-original.svg'
  },
  {
    name: 'Prisma',
    category: 'backend',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/prisma/prisma-original.svg',
    inverse: true
  },
  {
    name: 'GitHub',
    category: 'tooling',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/github/github-original.svg',
    inverse: true
  },
  {
    name: 'Vercel',
    category: 'tooling',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@master/icons/vercel/vercel-original.svg',
    inverse: true
  }
];
