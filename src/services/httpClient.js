import { runtimeConfig } from '../config/runtime';

const buildUrl = (path) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const base = runtimeConfig.apiBaseUrl.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const requestJson = async (path, options = {}) => {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), runtimeConfig.apiTimeoutMs);

  try {
    const response = await fetch(buildUrl(path), {
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers
      },
      ...options,
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }

    return response.json();
  } finally {
    window.clearTimeout(timeoutId);
  }
};
