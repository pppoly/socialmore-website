const env = import.meta.env || {};

const numberFromEnv = (value, fallback) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const runtimeConfig = {
  siteUrl: (env.VITE_SITE_URL || 'https://www.socialmore.co.jp').replace(/\/+$/, ''),
  contentMode: env.VITE_CONTENT_MODE || 'local',
  apiBaseUrl: env.VITE_API_BASE_URL || '',
  apiTimeoutMs: numberFromEnv(env.VITE_API_TIMEOUT_MS, 8000),
  contactMode: env.VITE_CONTACT_MODE || 'mock',
  contactEndpoint: env.VITE_CONTACT_ENDPOINT || '/api/contact'
};

export const shouldUseApiContent = () =>
  runtimeConfig.contentMode === 'api' && Boolean(runtimeConfig.apiBaseUrl);

export const shouldSubmitContactToApi = () =>
  runtimeConfig.contactMode === 'api' && Boolean(runtimeConfig.apiBaseUrl);
