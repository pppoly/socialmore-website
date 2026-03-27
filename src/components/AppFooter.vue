<template>
  <footer class="app-footer">
    <div class="footer-inner container">
      <div class="footer-grid">
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
          <p>{{ company.address }}</p>
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
      <p class="footer-copy">{{ footerContent.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const footerContent = computed(() => {
  const value = t('footer');
  return value && typeof value === 'object' ? value : {};
});

const company = computed(() => footerContent.value.company ?? {});
const contact = computed(() => footerContent.value.contact ?? {});

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

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-bottom: 1.5rem;
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

.footer-link {
  color: #6b6b6b;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
  color: #1a1a1a;
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
</style>
