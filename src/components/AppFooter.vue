<template>
  <footer class="app-footer">
    <div class="footer-inner container">
      <div class="footer-grid">
        <div class="footer-column">
          <h4>{{ company.name }}</h4>
          <p>{{ company.address }}</p>
          <p>{{ company.registration }}</p>
        </div>
        <div class="footer-column">
          <h5>{{ contact.title }}</h5>
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
        <nav class="footer-column footer-links" aria-label="Legal links">
          <h5>{{ links.title }}</h5>
          <RouterLink class="footer-link" to="/privacy">{{ links.privacy }}</RouterLink>
          <RouterLink class="footer-link" to="/terms">{{ links.terms }}</RouterLink>
        </nav>
      </div>
      <p class="footer-copy">{{ footerContent.copyright }}</p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const footerContent = computed(() => {
  const value = t('footer');
  return value && typeof value === 'object' ? value : {};
});

const company = computed(() => footerContent.value.company ?? {});
const contact = computed(() => footerContent.value.contact ?? {});
const links = computed(() => footerContent.value.links ?? {});

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
  background: #0b1c2c;
  color: #eff4ff;
  padding: 3rem 1.5rem;
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

.footer-column h4,
.footer-column h5 {
  margin-bottom: 0.75rem;
  font-weight: 700;
}

.footer-column p {
  margin: 0.35rem 0;
  line-height: 1.5;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.footer-link {
  color: #c8d7ff;
  font-weight: 500;
}

.footer-link:hover {
  text-decoration: underline;
}

.contact-hours {
  color: rgba(239, 244, 255, 0.75);
  font-size: 0.9rem;
}

.footer-copy {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1rem;
  font-size: 0.9rem;
  color: rgba(239, 244, 255, 0.8);
}
</style>
