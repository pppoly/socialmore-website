import { runtimeConfig, shouldSubmitContactToApi } from '../config/runtime';
import { requestJson } from './httpClient';

const mockDelay = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

export const submitContactInquiry = async (payload) => {
  if (!shouldSubmitContactToApi()) {
    await mockDelay(450);
    return {
      ok: true,
      mode: 'mock'
    };
  }

  return requestJson(runtimeConfig.contactEndpoint, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
};
