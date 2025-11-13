<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/" class="logo">
        <img :src="headerLogo" alt="SOCIALMORE Logo" class="header-logo" />
        <div class="logo-text">
          <span class="jp">創翔モア</span>
          <span class="en">SOCIALMORE</span>
        </div>
      </RouterLink>
      <nav class="desktop-nav">
        <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link" @click="closeMenu">
          {{ link.label }}
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
            EN
          </button>
        </div>
        <RouterLink to="/contact" class="contact-pill">
          {{ t('buttons.contactUs') }}
        </RouterLink>
      </nav>
      <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle navigation">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>
    </div>
    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-nav">
        <div class="mobile-links">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link" @click="closeMenu">
            {{ link.label }}
          </RouterLink>
        </div>
        <div class="language-switch">
          <button class="lang-btn" :class="{ active: currentLocale === 'ja' }" @click="() => switchLanguage('ja')">
            日本語
          </button>
          <button class="lang-btn" :class="{ active: currentLocale === 'en' }" @click="() => switchLanguage('en')">
            EN
          </button>
        </div>
        <RouterLink to="/contact" class="contact-pill" @click="closeMenu">
          {{ t('buttons.contactUs') }}
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { computed, ref } from 'vue';
import { RouterLink } from 'vue-router';
import headerLogo from '@/assets/brand/logo.png';
import { useI18n } from '../composables/useI18n';

const { t, currentLocale, setLocale } = useI18n();
const isMenuOpen = ref(false);
const navLinks = computed(() => {
  const localeWatch = currentLocale.value;
  void localeWatch;
  return [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/news', label: t('nav.news') },
    { path: '/contact', label: t('nav.contact') }
  ];
});

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

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
  color: var(--color-dark);
}

.header-logo {
  height: 32px;
  width: auto;
  display: block;
}

.logo-text {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  line-height: 1.1;
}

.logo-text .jp {
  font-weight: 600;
}

.logo-text .en {
  letter-spacing: 0.15em;
  font-size: 0.7rem;
  color: var(--color-muted);
}

.desktop-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  color: var(--color-dark);
  font-weight: 500;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link.router-link-active {
  background: rgba(15, 138, 215, 0.08);
  color: var(--color-primary);
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

.contact-pill {
  padding: 0.45rem 1.25rem;
  border-radius: 999px;
  background-image: var(--gradient-primary);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 10px 25px rgba(37, 183, 176, 0.35);
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
  transition: transform 0.3s ease, opacity 0.3s ease;
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

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

@media (max-width: 960px) {
  .desktop-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }
}
</style>
