import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { systemsOrigin } from './config/rcentz-apps';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /** Transitional guard. These workflows remain fully owned by Systems. */
  async redirects() {
    return [
      { source: '/pricing', destination: `${systemsOrigin}/pricing`, permanent: false },
      { source: '/login', destination: `${systemsOrigin}/login`, permanent: false },
      { source: '/register', destination: `${systemsOrigin}/register`, permanent: false },
      { source: '/start-project', destination: `${systemsOrigin}/start-project`, permanent: false },
      { source: '/start-project/:path*', destination: `${systemsOrigin}/start-project/:path*`, permanent: false },
      { source: '/workspace', destination: `${systemsOrigin}/workspace`, permanent: false },
      { source: '/dashboard/:path*', destination: `${systemsOrigin}/dashboard/:path*`, permanent: false },
      { source: '/admin/:path*', destination: `${systemsOrigin}/admin/:path*`, permanent: false },
      { source: '/services/:slug', destination: `${systemsOrigin}/services/:slug`, permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
