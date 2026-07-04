import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    }
    return { top: 0 };
  },
  routes: [
    { path: '/', alias: ['/socialmore'], name: 'home', component: Home },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    { path: '/services', name: 'services', component: () => import('../views/Services.vue') },
    { path: '/news', name: 'news', component: () => import('../views/News.vue') },
    { path: '/news/:id', name: 'news-detail', component: () => import('../views/NewsDetail.vue') },
    { path: '/partners', name: 'partners', component: () => import('../views/Partners.vue') },
    {
      path: '/partners/companies',
      name: 'partner-companies',
      component: () => import('../views/PartnerCompanies.vue')
    },
    { path: '/partners/:slug', name: 'partner-detail', component: () => import('../views/PartnerDetail.vue') },
    { path: '/planner/start', name: 'planner-start', component: () => import('../views/PlannerFlowPlaceholder.vue') },
    {
      path: '/planner/organize',
      name: 'planner-organize',
      component: () => import('../views/PlannerFlowPlaceholder.vue')
    },
    {
      path: '/planner/diagnose',
      name: 'planner-diagnose',
      component: () => import('../views/PlannerFlowPlaceholder.vue')
    },
    { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue') },
    { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyPolicy.vue') },
    { path: '/terms', name: 'terms', component: () => import('../views/TermsOfUse.vue') }
  ]
});

export default router;
