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
        <div class="nav-item">
          <RouterLink
            to="/"
            class="nav-link-main"
            :class="{ active: route.path === '/' }"
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

        <RouterLink to="/news" class="nav-link-single" @click="closeMenu">
          {{ t('nav.news') }}
        </RouterLink>

        <RouterLink to="/contact" class="nav-link-single" @click="closeMenu">
          {{ t('nav.contact') }}
        </RouterLink>

        <div class="language-switch">
          <button
            class="lang-btn"
            :class="{ active: currentLocale === 'ja' }"
            @click="() => switchLanguage('ja')"
          >
            日本語
          </button>
          <button
            class="lang-btn"
            :class="{ active: currentLocale === 'en' }"
            @click="() => switchLanguage('en')"
          >
            English
          </button>
          <button
            class="lang-btn"
            :class="{ active: currentLocale === 'zh' }"
            @click="() => switchLanguage('zh')"
          >
            中文
          </button>
        </div>
      </nav>

      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle navigation">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </div>

    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-nav">
        <div class="mobile-section-group">
          <RouterLink to="/" class="nav-link-single mobile-home-link" @click="closeMenu">
            {{ homeLabel }}
          </RouterLink>
          <div class="mobile-sub-links">
            <RouterLink
              v-for="link in sectionLinks"
              :key="link.hash"
              :to="{ path: '/', hash: link.hash }"
              class="mobile-sub-link"
              @click="closeMenu"
            >
              {{ link.label }}
            </RouterLink>
          </div>
        </div>

        <div class="mobile-links">
          <RouterLink to="/news" class="nav-link-single" @click="closeMenu">
            {{ t('nav.news') }}
          </RouterLink>
          <RouterLink to="/contact" class="nav-link-single" @click="closeMenu">
            {{ t('nav.contact') }}
          </RouterLink>
        </div>

        <div class="language-switch mobile-language-switch">
          <button class="lang-btn" :class="{ active: currentLocale === 'ja' }" @click="() => switchLanguage('ja')">
            日本語
          </button>
          <button class="lang-btn" :class="{ active: currentLocale === 'en' }" @click="() => switchLanguage('en')">
            English
          </button>
          <button class="lang-btn" :class="{ active: currentLocale === 'zh' }" @click="() => switchLanguage('zh')">
            中文
          </button>
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
const { t, currentLocale, setLocale } = useI18n();
const isMenuOpen = ref(false);

const localePick = (messages) =>
  messages[currentLocale.value] ?? messages.ja ?? messages.en ?? messages.zh ?? '';

const homeLabel = computed(() =>
  localePick({
    ja: 'ホーム',
    en: 'Home',
    zh: '首页'
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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const switchLanguage = (locale) => {
  setLocale(locale);
  closeMenu();
};
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(15, 138, 215, 0.08);
}

.header-inner {
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
  position: relative;
}

.nav-item::after {
  content: '';
  position: absolute;
  top: 100%;
  left: -12px;
  right: -12px;
  height: 16px;
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
  color: var(--color-muted-strong, var(--color-muted));
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
  gap: 8px;
}

.nav-link-main::after {
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

.nav-link-single:hover,
.nav-link-single.router-link-active,
.nav-link-main:hover,
.nav-link-main.active,
.nav-item:hover .nav-link-main,
.nav-item:focus-within .nav-link-main {
  color: var(--color-dark);
  background: rgba(26, 95, 168, 0.06);
  border-color: rgba(26, 95, 168, 0.1);
  box-shadow: 0 8px 18px rgba(26, 95, 168, 0.08);
}

.nav-link-main:hover::after,
.nav-link-main.active::after,
.nav-item:hover .nav-link-main::after,
.nav-item:focus-within .nav-link-main::after {
  border-color: var(--color-dark);
  transform: translateY(1px) rotate(225deg);
}

.nav-submenu {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  min-width: 248px;
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
  transform: translateX(-50%) translateY(10px) scale(0.98);
  transform-origin: top center;
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.nav-submenu::before {
  content: '';
  position: absolute;
  top: -7px;
  left: 50%;
  width: 12px;
  height: 12px;
  background: rgba(255, 255, 255, 0.98);
  border-top: 1px solid rgba(26, 95, 168, 0.1);
  border-left: 1px solid rgba(26, 95, 168, 0.1);
  transform: translateX(-50%) rotate(45deg);
}

.nav-submenu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 12px;
  color: var(--color-dark);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  text-decoration: none;
}

.nav-submenu-link::after {
  content: '';
  width: 7px;
  height: 7px;
  border-top: 1.5px solid #a0a0a0;
  border-right: 1.5px solid #a0a0a0;
  transform: rotate(45deg);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.nav-submenu-link:hover {
  background: #f5f5f3;
}

.nav-submenu-link:hover::after {
  border-color: var(--color-dark);
  transform: translateX(2px) rotate(45deg);
}

.nav-item:hover .nav-submenu,
.nav-item:focus-within .nav-submenu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0) scale(1);
}

.language-switch {
  display: inline-flex;
  gap: 0.25rem;
  background: rgba(15, 138, 215, 0.08);
  padding: 0.25rem;
  border-radius: 999px;
}

.lang-btn {
  border: none;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  background: transparent;
  cursor: pointer;
  color: var(--color-muted);
}

.lang-btn.active {
  background: #fff;
  color: var(--color-primary);
  box-shadow: 0 6px 12px rgba(15, 138, 215, 0.18);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  width: 26px;
  height: 3px;
  background: var(--color-dark);
  border-radius: 999px;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.menu-toggle span.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}

.menu-toggle span.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
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
  justify-content: flex-start;
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
}

.mobile-language-switch {
  width: fit-content;
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
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}

@media (max-width: 600px) {
  .header-inner {
    padding: 0.75rem 1rem;
  }

  .logo-text .en {
    letter-spacing: 0.1em;
  }
}
</style>
