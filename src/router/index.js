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
