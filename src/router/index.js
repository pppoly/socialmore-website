import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import { applySeo, socialmoreWebsiteSchema } from '../composables/useSeo';

const pageSeo = {
  home: {
    title: 'SOCIALMORE - コミュニティーを続けるための仕組みを、LINEの中に。',
    description:
      'メンバー募集、申込受付、参加者管理、売上確認まで。コミュニティ運営に必要な流れをLINEの中にまとめ、地域や企業との共創活動も紹介しています。',
    path: '/',
    image: '/socialmore-assets/hero/home-hero-app.png',
    jsonLd: socialmoreWebsiteSchema
  },
  about: {
    title: 'SOCIALMOREについて',
    description: 'SOCIALMOREが大切にしている考え方と、コミュニティの活動を支える姿勢を紹介します。',
    path: '/about'
  },
  services: {
    title: 'サービス',
    description:
      'コミュニティ運営、イベント受付、企業・地域との連携を支えるSOCIALMOREのサービスを紹介します。',
    path: '/services'
  },
  news: {
    title: 'ニュース',
    description: 'SOCIALMOREの会社情報、サービス更新、コミュニティ連携に関するお知らせを掲載しています。',
    path: '/news'
  },
  partners: {
    title: '共創・連携パートナー',
    description:
      'コミュニティの活動に共感する企業・団体と、無理のない関係を育てていくSOCIALMOREの連携ページです。',
    path: '/partners',
    image: '/socialmore-assets/hero/partner-connection-hero.png'
  },
  'partner-companies': {
    title: '連携先一覧',
    description: 'SOCIALMOREが紹介している企業・サービス・コミュニティを個別ページで確認できます。',
    path: '/partners/companies',
    image: '/socialmore-assets/hero/partner-connection-hero.png'
  },
  contact: {
    title: 'お問い合わせ',
    description: 'サービス導入、連携、コミュニティ運営、取材などについてSOCIALMOREへ相談できます。',
    path: '/contact'
  },
  privacy: {
    title: 'プライバシーポリシー',
    description: 'SOCIALMOREの個人情報の取り扱いについて掲載しています。',
    path: '/privacy'
  },
  terms: {
    title: '利用規約',
    description: 'SOCIALMOREのサービス利用規約を掲載しています。',
    path: '/terms'
  }
};

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
    { path: '/', alias: ['/socialmore'], name: 'home', component: Home, meta: { seo: pageSeo.home } },
    { path: '/about', name: 'about', component: () => import('../views/About.vue'), meta: { seo: pageSeo.about } },
    { path: '/services', name: 'services', component: () => import('../views/Services.vue'), meta: { seo: pageSeo.services } },
    { path: '/news', name: 'news', component: () => import('../views/News.vue'), meta: { seo: pageSeo.news } },
    { path: '/news/:id', name: 'news-detail', component: () => import('../views/NewsDetail.vue') },
    { path: '/partners', name: 'partners', component: () => import('../views/Partners.vue'), meta: { seo: pageSeo.partners } },
    {
      path: '/partners/companies',
      name: 'partner-companies',
      component: () => import('../views/PartnerCompanies.vue'),
      meta: { seo: pageSeo['partner-companies'] }
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
    { path: '/contact', name: 'contact', component: () => import('../views/Contact.vue'), meta: { seo: pageSeo.contact } },
    { path: '/privacy', name: 'privacy', component: () => import('../views/PrivacyPolicy.vue'), meta: { seo: pageSeo.privacy } },
    { path: '/terms', name: 'terms', component: () => import('../views/TermsOfUse.vue'), meta: { seo: pageSeo.terms } }
  ]
});

router.afterEach((to) => {
  if (to.meta?.seo) {
    applySeo(to.meta.seo);
  }
});

export default router;
