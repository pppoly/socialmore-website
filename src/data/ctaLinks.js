const env = import.meta.env || {};

export const ctaLinks = {
  lineMiniApp: env.VITE_LINE_MINI_APP_URL || 'https://test.socialmore.jp/experience',
  plannerRoutes: {
    firstPlan: env.VITE_PLANNER_START_PATH || '/planner/start',
    organizePlan: env.VITE_PLANNER_ORGANIZE_PATH || '/planner/organize',
    diagnoseDraft: env.VITE_PLANNER_DIAGNOSE_PATH || '/planner/diagnose'
  }
};
