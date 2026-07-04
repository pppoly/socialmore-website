<template>
  <footer class="app-footer">
    <div class="footer-inner container">
      <div class="footer-layout">
        <div class="footer-company">
          <div class="footer-column">
            <div class="footer-brand" aria-label="SOCIALMORE">
              <span class="brand-mark">
                <img src="/brand/brand-logo-symbol.svg" alt="SOCIALMORE logomark">
              </span>
              <span class="brand-text">
                <span class="brand-jp">創翔モア</span>
                <span class="brand-en">SOCIALMORE</span>
              </span>
            </div>
            <p v-if="companyAddressLines.length" class="footer-address">
              <span v-for="line in companyAddressLines" :key="line">{{ line }}</span>
            </p>
          </div>
          <div class="footer-column">
            <p v-if="contact.email">
              <span>{{ contact.emailLabel }}:</span>
              <a class="footer-link" :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </p>
            <p v-if="contact.phone">
              <span>{{ contact.phoneLabel }}:</span>
              <a class="footer-link" :href="phoneHref">{{ contact.phone }}</a>
            </p>
            <p v-if="contact.hours" class="contact-hours">{{ contact.hours }}</p>
          </div>
        </div>
        <nav class="footer-nav" aria-label="フッターナビゲーション">
          <section v-for="group in footerNavGroups" :key="group.title" class="footer-nav-group">
            <h2 class="footer-nav-title">{{ group.title }}</h2>
            <ul class="footer-nav-list">
              <li v-for="link in group.links" :key="link.href">
                <a class="footer-nav-link" :href="link.href">{{ link.label }}</a>
              </li>
            </ul>
          </section>
        </nav>
      </div>
      <p class="footer-copy">{{ footerContent.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const footerNavGroups = [
  {
    title: 'サービス',
    links: [
      { label: 'LINEミニアプリとは', href: '/#line-mini' },
      { label: '活用シーン', href: '/#pain' },
      { label: 'できること', href: '/#feature' },
      { label: '他のサービスとの違い', href: '/#diff' },
      { label: '料金プラン', href: '/#pricing' },
    ],
  },
  {
    title: '連携',
    links: [
      { label: '共創・連携パートナー', href: '/#partners' },
      { label: '共創・連携について', href: '/partners' },
      { label: '連携先一覧', href: '/partners/companies' },
      { label: 'Viivii', href: '/partners/viivii' },
    ],
  },
  {
    title: 'イベント・発信',
    links: [
      { label: 'イベント情報', href: '/event.html' },
      { label: '開催中', href: '/event-current.html' },
      { label: '近日開催', href: '/event-upcoming.html' },
      { label: '過去のイベント', href: '/event-past.html' },
      { label: 'ブログ', href: '/blog.html' },
      { label: '最新記事', href: '/blog-latest.html' },
      { label: '過去の記事', href: '/blog-archive.html' },
    ],
  },
  {
    title: '会社・相談',
    links: [
      { label: '会社情報', href: '/#company' },
      { label: 'お問い合わせ', href: '/contact.html' },
      { label: '連携について相談する', href: '/contact.html?type=partner' },
    ],
  },
];

const footerContent = computed(() => {
  const value = t('footer');
  return value && typeof value === 'object' ? value : {};
});

const company = computed(() => footerContent.value.company ?? {});
const contact = computed(() => footerContent.value.contact ?? {});

const companyAddressLines = computed(() => {
  const address = company.value.address ?? '';
  if (!address) {
    return [];
  }

  if (address.includes('東京都三鷹市下連雀3-27-1')) {
    return ['181-0013', '東京都三鷹市下連雀3-27-1', '三協ビル2階'];
  }

  if (address.includes('Sankyo Bldg 2F')) {
    return ['3-27-1 Sankyo Bldg 2F', 'Shimorenjaku, Mitaka', 'Tokyo 181-0013'];
  }

  if (address.includes('东京都三鹰市下连雀3-27-1')) {
    return ['〒181-0013', '东京都三鹰市下连雀3-27-1', '三协大楼2层'];
  }

  return [address];
});

const phoneHref = computed(() => {
  if (!contact.value.phone) {
    return '';
  }
  const sanitized = contact.value.phone.replace(/[^+\d]/g, '');
  return `tel:${sanitized}`;
});
</script>

<style scoped>
.app-footer {
  background: linear-gradient(180deg, #eef4fb, #f8fbff);
  color: #1a1a1a;
  padding: 3rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-layout {
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.8fr);
  gap: clamp(2.25rem, 5vw, 4.5rem);
  align-items: start;
  margin-bottom: 1.85rem;
}

.footer-company {
  display: grid;
  align-content: start;
  gap: 1.25rem;
  min-width: 0;
  max-width: 360px;
}

.footer-column {
  display: grid;
  gap: 0.6rem;
}

.footer-brand {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.brand-mark {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.brand-mark img {
  width: 26px;
  height: auto;
  display: block;
}

.brand-text {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  line-height: 1.1;
  white-space: nowrap;
}

.brand-jp {
  display: inline-block;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: 0.28em;
}

.brand-en {
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: #6b6b6b;
}

.footer-column p {
  margin: 0.35rem 0;
  line-height: 1.5;
  color: #6b6b6b;
}

.footer-address {
  display: grid;
  gap: 0.12rem;
}

.footer-address span {
  display: block;
}

.footer-company .footer-column + .footer-column {
  gap: 0.45rem;
}

.footer-link {
  color: #6b6b6b;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
  color: #1a1a1a;
}

.footer-nav {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.5rem, 3vw, 2.65rem);
  min-width: 0;
  padding-top: 0.25rem;
}

.footer-nav-group {
  display: grid;
  align-content: start;
  gap: 0.75rem;
  min-width: 0;
}

.footer-nav-title {
  margin: 0;
  color: #1a1a1a;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0;
  line-height: 1.35;
}

.footer-nav-list {
  display: grid;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-nav-link {
  display: flex;
  align-items: flex-start;
  min-width: 0;
  color: #6b6b6b;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.55;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.footer-nav-link:hover {
  color: #1a1a1a;
  text-decoration: underline;
  text-underline-offset: 3px;
}

@media (min-width: 1100px) {
  .footer-nav {
    grid-template-columns:
      minmax(150px, 1.08fr)
      minmax(160px, 1fr)
      minmax(170px, 1.08fr)
      max-content;
  }

  .footer-nav-group:last-child .footer-nav-link {
    overflow-wrap: normal;
    white-space: nowrap;
  }
}

.contact-hours {
  color: #8a8a8a;
  font-size: 0.9rem;
}

.footer-copy {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #8a8a8a;
}

@media (max-width: 900px) {
  .footer-layout {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer-company {
    max-width: none;
  }

  .footer-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.75rem 1.5rem;
  }
}

@media (max-width: 520px) {
  .footer-nav {
    grid-template-columns: 1fr;
    gap: 1.4rem;
  }
}
</style>
