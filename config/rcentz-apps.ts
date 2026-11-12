/** URLs for operational functionality that remains on Rcentz Systems. */
const configuredSystemsOrigin = process.env.NEXT_PUBLIC_RCENTZ_SYSTEMS_URL?.trim();
export const systemsOrigin = (configuredSystemsOrigin || 'https://systems.rcentz.cc').replace(/\/+$/, '');

export const systemsLinks = {
  login: `${systemsOrigin}/login`,
  register: `${systemsOrigin}/register`,
  pricing: `${systemsOrigin}/pricing`,
  startProject: `${systemsOrigin}/start-project`,
  serviceCatalogue: `${systemsOrigin}/services`,
  dashboard: `${systemsOrigin}/dashboard`,
  workspace: `${systemsOrigin}/workspace`,
} as const;
