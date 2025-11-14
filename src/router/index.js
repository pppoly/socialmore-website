import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Services from '../views/Services.vue';
import News from '../views/News.vue';
import Contact from '../views/Contact.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import TermsOfUse from '../views/TermsOfUse.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/services', name: 'services', component: Services },
    { path: '/news', name: 'news', component: News },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/privacy', name: 'privacy', component: PrivacyPolicy },
    { path: '/terms', name: 'terms', component: TermsOfUse }
  ]
});

export default router;
