<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="logo" aria-label="SOCIALMORE home" @click="closeMenu">
        <span class="logo-mark">
          <img :src="headerLogo" alt="SOCIALMORE logomark" />
        </span>
        <div class="logo-text">
          <span class="jp">創翔モア</span>
          <span class="en">SOCIALMORE</span>
        </div>
      </RouterLink>

      <nav class="desktop-nav" aria-label="Primary">
        <div
          class="nav-item"
        >
          <RouterLink
            to="/"
            class="nav-link-main"
            :class="{ active: route.name === 'home' }"
            @click="closeMenu"
          >
            {{ homeLabel }}
          </RouterLink>
          <div class="nav-submenu">
            <RouterLink
              v-for="link in sectionLinks"
              :key="link.hash"
              :to="{ path: '/', hash: link.hash }"
              class="nav-submenu-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div
          class="nav-item"
        >
          <RouterLink
            to="/partners"
            class="nav-link-main"
            :class="{ active: route.name === 'partners' || route.name === 'partner-companies' || route.name === 'partner-detail' }"
            @click="closeMenu"
          >
            {{ partnerLabel }}
          </RouterLink>
          <div class="nav-submenu">
            <RouterLink
              v-for="link in partnerLinks"
              :key="link.label"
              :to="link.to"
              class="nav-submenu-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div
          class="nav-item"
        >
          <a href="/event.html" class="nav-link-main" @click="closeMenu">
            {{ eventLabel }}
          </a>
          <div class="nav-submenu">
            <a
              v-for="link in eventLinks"
              :key="link.href"
              :href="link.href"
              class="nav-submenu-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <div
          class="nav-item"
        >
          <RouterLink
            to="/news"
            class="nav-link-main"
            :class="{ active: route.name === 'news' || route.name === 'news-detail' }"
            @click="closeMenu"
          >
            {{ blogLabel }}
          </RouterLink>
          <div class="nav-submenu">
            <RouterLink
              v-for="link in blogLinks"
              :key="link.to"
              :to="link.to"
              class="nav-submenu-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <RouterLink to="/contact" class="nav-link-single" @click="closeMenu">
          {{ contactLabel }}
        </RouterLink>

      </nav>

      <button
        class="menu-toggle"
        :class="{ 'is-open': isMenuOpen }"
        type="button"
        :aria-expanded="String(isMenuOpen)"
        :aria-label="isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'"
        @click="toggleMenu"
      >
        <span class="menu-toggle-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>

    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-nav">
        <div class="mobile-section-group">
          <button
            type="button"
            class="nav-link-single mobile-home-link"
            :class="{ 'is-open': openMobileSection === 'home' }"
            @click="toggleMobileSection('home')"
          >
            {{ homeLabel }}
          </button>
          <div v-show="openMobileSection === 'home'" class="mobile-sub-links">
            <RouterLink
              v-for="link in homeMobileLinks"
              :key="link.label"
              :to="link.to"
              class="mobile-sub-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div class="mobile-section-group">
          <button
            type="button"
            class="nav-link-single mobile-home-link"
            :class="{ 'is-open': openMobileSection === 'partner' }"
            @click="toggleMobileSection('partner')"
          >
            {{ partnerLabel }}
          </button>
          <div v-show="openMobileSection === 'partner'" class="mobile-sub-links">
            <RouterLink
              v-for="link in partnerLinks"
              :key="link.label"
              :to="link.to"
              class="mobile-sub-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div class="mobile-section-group">
          <button
            type="button"
            class="nav-link-single mobile-home-link"
            :class="{ 'is-open': openMobileSection === 'event' }"
            @click="toggleMobileSection('event')"
          >
            {{ eventLabel }}
          </button>
          <div v-show="openMobileSection === 'event'" class="mobile-sub-links">
            <a
              v-for="link in eventMobileLinks"
              :key="link.href"
              :href="link.href"
              class="mobile-sub-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </a>
          </div>
        </div>

        <div class="mobile-section-group">
          <button
            type="button"
            class="nav-link-single mobile-home-link"
            :class="{ 'is-open': openMobileSection === 'blog' }"
            @click="toggleMobileSection('blog')"
          >
            {{ blogLabel }}
          </button>
          <div v-show="openMobileSection === 'blog'" class="mobile-sub-links">
            <RouterLink
              v-for="link in blogLinks"
              :key="link.to"
              :to="link.to"
              class="mobile-sub-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div class="mobile-links">
          <RouterLink to="/contact" class="nav-link-single" @click="closeMenu">
            {{ contactLabel }}
          </RouterLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useI18n } from '../composables/useI18n';

const headerLogo = '/brand/brand-logo-symbol.svg';
const route = useRoute();
const { currentLocale } = useI18n();
const isMenuOpen = ref(false);
const openMobileSection = ref(null);

const localePick = (messages) =>
  messages[currentLocale.value] ?? messages.ja ?? messages.en ?? messages.zh ?? '';

const homeLabel = computed(() =>
  localePick({
    ja: 'ホーム',
    en: 'Home',
    zh: '首页'
  })
);

const eventLabel = computed(() =>
  localePick({
    ja: 'イベント情報',
    en: 'Events',
    zh: '活动信息'
  })
);

const partnerLabel = computed(() =>
  localePick({
    ja: 'パートナー',
    en: 'Partners',
    zh: '合作伙伴'
  })
);

const blogLabel = computed(() =>
  localePick({
    ja: 'ブログ',
    en: 'Blog',
    zh: '博客'
  })
);

const contactLabel = computed(() =>
  localePick({
    ja: 'お問い合わせ',
    en: 'Contact',
    zh: '联系我们'
  })
);

const sectionLinks = computed(() => [
  {
    hash: '#line-mini',
    label: localePick({
      ja: 'LINEミニアプリとは',
      en: 'What Is LINE Mini App',
      zh: '什么是 LINE Mini App'
    })
  },
  {
    hash: '#pain',
    label: localePick({
      ja: '活用シーン',
      en: 'Use Cases',
      zh: '使用场景'
    })
  },
  {
    hash: '#feature',
    label: localePick({
      ja: 'できること',
      en: 'Features',
      zh: '功能内容'
    })
  },
  {
    hash: '#diff',
    label: localePick({
      ja: '他のサービスとの違い',
      en: 'Why It Is Different',
      zh: '与其他服务的区别'
    })
  },
  {
    hash: '#partners',
    label: localePick({
      ja: '共創・連携パートナー',
      en: 'Partners',
      zh: '共创・合作伙伴'
    })
  },
  {
    hash: '#pricing',
    label: localePick({
      ja: '料金プラン',
      en: 'Pricing',
      zh: '价格方案'
    })
  },
  {
    hash: '#company',
    label: localePick({
      ja: '会社情報',
      en: 'Company',
      zh: '公司信息'
    })
  }
]);

const homeMobileLinks = computed(() => [
  {
    to: '/',
    label: localePick({
      ja: 'トップ',
      en: 'Top',
      zh: '首页'
    })
  },
  ...sectionLinks.value.map((link) => ({
    to: { path: '/', hash: link.hash },
    label: link.label
  }))
]);

const eventLinks = computed(() => [
  {
    href: '/event-current.html',
    label: localePick({
      ja: '開催中',
      en: 'Current',
      zh: '进行中'
    })
  },
  {
    href: '/event-upcoming.html',
    label: localePick({
      ja: '近日開催',
      en: 'Upcoming',
      zh: '即将举办'
    })
  },
  {
    href: '/event-past.html',
    label: localePick({
      ja: '過去',
      en: 'Past Events',
      zh: '往期活动'
    })
  }
]);

const eventMobileLinks = computed(() => [
  {
    href: '/event.html',
    label: localePick({
      ja: 'イベント一覧',
      en: 'Event List',
      zh: '活动一览'
    })
  },
  ...eventLinks.value
]);

const partnerLinks = computed(() => [
  {
    to: '/partners',
    label: localePick({
      ja: '共創・連携について',
      en: 'Partnership Overview',
      zh: '共创合作说明'
    })
  },
  {
    to: '/partners/companies',
    label: localePick({
      ja: '連携先一覧',
      en: 'Connection Directory',
      zh: '合作对象列表'
    })
  }
]);

const blogLinks = computed(() => [
  {
    to: '/news',
    label: localePick({
      ja: '最新記事',
      en: 'Latest Posts',
      zh: '最新文章'
    })
  }
]);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  if (!isMenuOpen.value) {
    openMobileSection.value = null;
  }
};

const closeMenu = () => {
  isMenuOpen.value = false;
  openMobileSection.value = null;
};

const toggleMobileSection = (section) => {
  openMobileSection.value = openMobileSection.value === section ? null : section;
};

</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  overflow: visible;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(15, 138, 215, 0.08);
}

.header-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.header-inner > * {
  min-width: 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  font-weight: 600;
  color: var(--color-dark);
}

.logo-mark {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  background: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: none;
  border: none;
}

.logo-mark img {
  width: 26px;
  height: auto;
  display: block;
}

.logo-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  font-size: 0.85rem;
  line-height: 1.1;
}

.logo-text .jp {
  display: inline-block;
  font-weight: 600;
  letter-spacing: 0.28em;
}

.logo-text .en {
  letter-spacing: 0.15em;
  font-size: 0.7rem;
  color: var(--color-muted-strong, var(--color-muted));
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-item {
  flex: 0 0 auto;
  position: relative;
  --nav-submenu-width: 248px;
  --nav-submenu-left: 0px;
  --nav-submenu-right: auto;
}

.desktop-nav .nav-item:nth-child(1) {
  width: 76px;
}

.desktop-nav .nav-item:nth-child(2) {
  width: 104px;
}

.desktop-nav .nav-item:nth-child(3) {
  width: 118px;
}

.desktop-nav .nav-item:nth-child(4) {
  width: 76px;
  --nav-submenu-left: auto;
  --nav-submenu-right: 0px;
}

.nav-item::after {
  content: '';
  position: absolute;
  top: 100%;
  left: var(--nav-submenu-left);
  right: var(--nav-submenu-right);
  width: var(--nav-submenu-width);
  height: 22px;
}

.nav-link-main,
.nav-link-single {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--color-muted-strong, var(--color-muted));
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.nav-link-main {
  width: 100%;
  min-width: 0;
  padding-inline: 10px;
  gap: 0;
}

.desktop-nav > .nav-link-single {
  flex: 0 0 108px;
  width: 108px;
  min-width: 108px;
  padding-inline: 10px;
}

.nav-link-main::after {
  content: none;
  display: none;
}

.nav-link-single:hover,
.nav-link-single.router-link-active,
.nav-link-main:hover,
.nav-link-main.active,
.mobile-home-link.is-open,
.nav-item.is-desktop-open .nav-link-main,
.nav-item:hover .nav-link-main,
.nav-item:focus-within .nav-link-main {
  color: var(--color-dark);
  background: rgba(26, 95, 168, 0.06);
  border-color: rgba(26, 95, 168, 0.1);
  box-shadow: 0 8px 18px rgba(26, 95, 168, 0.08);
}

.nav-submenu {
  position: absolute;
  top: calc(100% + 8px);
  left: var(--nav-submenu-left);
  right: var(--nav-submenu-right);
  z-index: 70;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 226px;
  grid-auto-rows: 38px;
  align-items: stretch;
  justify-items: stretch;
  width: 248px;
  min-width: 248px;
  max-width: 248px;
  padding: 10px;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  box-shadow:
    0 20px 40px rgba(11, 28, 46, 0.1),
    0 4px 10px rgba(11, 28, 46, 0.04);
  opacity: 0;
  pointer-events: none;
  transform: none;
  transform-origin: top center;
  transition: opacity 0.16s ease;
}

.nav-submenu::before {
  content: none;
  display: none;
}

.nav-submenu-link {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0;
  flex: 0 0 226px;
  inline-size: 226px;
  width: 226px;
  min-width: 226px;
  max-width: 226px;
  height: 38px;
  min-height: 38px;
  max-height: 38px;
  margin: 0;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: var(--color-dark);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  text-decoration: none;
  transform: none;
  transition:
    background-color 0.16s ease,
    color 0.16s ease;
}

.nav-submenu-link::after {
  content: none;
  display: none;
}

.nav-submenu-link:hover {
  background: #f5f5f3;
}

.nav-item:hover .nav-submenu,
.nav-item.is-desktop-open .nav-submenu,
.nav-item:focus-within .nav-submenu {
  opacity: 1;
  pointer-events: auto;
  transform: none;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
}

.mobile-nav {
  background: #fff;
  box-shadow: 0 20px 40px rgba(15, 138, 215, 0.15);
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mobile-section-group {
  display: grid;
  gap: 0.85rem;
}

.mobile-home-link {
  justify-content: space-between;
  width: 100%;
  appearance: none;
}

.mobile-home-link::after {
  content: '';
  width: 7px;
  height: 7px;
  border-right: 1.5px solid #a0a0a0;
  border-bottom: 1.5px solid #a0a0a0;
  transform: translateY(-2px) rotate(45deg);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.mobile-home-link.is-open::after {
  border-color: var(--color-dark);
  transform: translateY(1px) rotate(225deg);
}

.mobile-sub-links {
  display: grid;
  gap: 0.55rem;
  padding-left: 0.75rem;
}

.mobile-sub-link {
  color: var(--color-muted-strong, var(--color-muted));
  font-size: 0.95rem;
  font-weight: 500;
}

.mobile-sub-link.router-link-active {
  color: var(--color-primary);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mobile-links .nav-link-single {
  justify-content: flex-start;
  width: 100%;
}

.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
}

@media (min-width: 961px) {
  .menu-toggle {
    display: none !important;
  }

  .app-header,
  .header-inner,
  .desktop-nav,
  .nav-item {
    overflow: visible !important;
  }

  .desktop-nav {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }

  .desktop-nav .nav-item {
    position: relative !important;
    flex: 0 0 auto !important;
    width: auto !important;
    --desktop-submenu-width: 248px;
    --desktop-submenu-row: 38px;
    --desktop-submenu-x: 0px;
  }

  .desktop-nav .nav-item:nth-child(1) {
    width: 76px !important;
  }

  .desktop-nav .nav-item:nth-child(2) {
    width: 104px !important;
  }

  .desktop-nav .nav-item:nth-child(3) {
    width: 118px !important;
  }

  .desktop-nav .nav-item:nth-child(4) {
    width: 76px !important;
    --desktop-submenu-x: calc(76px - var(--desktop-submenu-width));
  }

  .desktop-nav .nav-link-main {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    height: 40px !important;
    min-height: 40px !important;
    padding: 0 10px !important;
    gap: 0 !important;
    transform: none !important;
  }

  .desktop-nav .nav-link-main::after,
  .desktop-nav .nav-submenu::before,
  .desktop-nav .nav-submenu-link::after {
    content: none !important;
    display: none !important;
  }

  .desktop-nav .nav-item::after {
    content: '' !important;
    position: absolute !important;
    top: 100% !important;
    left: var(--desktop-submenu-x) !important;
    right: auto !important;
    width: var(--desktop-submenu-width) !important;
    height: 12px !important;
    display: block !important;
  }

  .desktop-nav .nav-submenu {
    position: absolute !important;
    top: calc(100% + 8px) !important;
    left: var(--desktop-submenu-x) !important;
    right: auto !important;
    z-index: 1000 !important;
    box-sizing: border-box !important;
    display: grid !important;
    grid-template-columns: 226px !important;
    grid-auto-rows: var(--desktop-submenu-row) !important;
    width: var(--desktop-submenu-width) !important;
    min-width: var(--desktop-submenu-width) !important;
    max-width: var(--desktop-submenu-width) !important;
    padding: 10px !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    transform: none !important;
    transition: opacity 0.12s ease, visibility 0s linear 0.12s !important;
  }

  .desktop-nav .nav-item:hover .nav-submenu,
  .desktop-nav .nav-item:focus-within .nav-submenu {
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: auto !important;
    transform: none !important;
    transition-delay: 0s !important;
  }

  .desktop-nav .nav-submenu-link {
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    width: 226px !important;
    min-width: 226px !important;
    max-width: 226px !important;
    height: var(--desktop-submenu-row) !important;
    min-height: var(--desktop-submenu-row) !important;
    max-height: var(--desktop-submenu-row) !important;
    margin: 0 !important;
    padding: 0 12px !important;
    text-align: left !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    transform: none !important;
  }
}

@media (max-width: 1100px) {
  .desktop-nav {
    gap: 8px;
  }

  .nav-link-main,
  .nav-link-single {
    padding: 0 12px;
  }
}

@media (max-width: 960px) {
  .app-header {
    width: 100%;
  }

  .header-inner {
    position: relative;
    width: 100%;
    max-width: 100%;
    gap: 0.75rem;
  }

  .desktop-nav {
    display: none;
  }

  .logo {
    flex: 1 1 auto;
    padding-right: 0;
  }

  .menu-toggle {
    display: inline-flex !important;
    position: fixed;
    top: 0.65rem;
    right: 1rem;
    left: auto;
    z-index: 120;
    flex: 0 0 42px;
    width: 42px;
    height: 42px;
    min-width: 42px;
    margin-left: 0;
    border: 1px solid rgba(12, 31, 51, 0.16);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 8px 20px rgba(12, 31, 51, 0.12);
    transform: none;
  }

  .menu-toggle-lines {
    display: inline-flex;
    flex-direction: column;
    gap: 4px;
    width: 18px;
    color: #0c1f33;
  }

  .menu-toggle-lines span {
    width: 18px;
    height: 1.5px;
    border-radius: 999px;
    background: currentColor;
    transform-origin: center;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .menu-toggle.is-open .menu-toggle-lines span:nth-child(1) {
    transform: translateY(5.5px) rotate(45deg);
  }

  .menu-toggle.is-open .menu-toggle-lines span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.is-open .menu-toggle-lines span:nth-child(3) {
    transform: translateY(-5.5px) rotate(-45deg);
  }
}

@media (max-width: 600px) {
  .header-inner {
    max-width: 100%;
    padding: 0.75rem 1rem;
  }

  .logo {
    max-width: calc(100% - 46px);
  }

  .logo-mark {
    width: 38px;
    height: 38px;
  }

  .logo-mark img {
    width: 24px;
  }

  .logo-text {
    overflow: hidden;
  }

  .logo-text .en {
    letter-spacing: 0.1em;
  }
}
</style>
