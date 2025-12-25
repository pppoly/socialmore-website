const env = import.meta.env || {};

export const ctaLinks = {
  apply: env.VITE_ORGANIZER_APPLY_URL || 'https://test.socialmore.jp/organizer/apply',
  experience: env.VITE_EXPERIENCE_URL || 'https://test.socialmore.jp/experience',
  consult: env.VITE_CONSULT_URL || '#' // TODO: fill onboarding consultation URL or set VITE_CONSULT_URL
};
