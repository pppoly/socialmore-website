<template>
  <main class="section philosophy-page">
    <div class="container">
      <header class="philosophy-hero">
        <p class="eyebrow">{{ about.eyebrow }}</p>
        <h1 class="section-title">{{ about.title }}</h1>
        <p class="definition">{{ about.definition }}</p>
        <p class="stance">{{ about.stance }}</p>
      </header>

      <section v-for="section in sections" :key="section.title" class="philosophy-section">
        <h2>{{ section.title }}</h2>
        <p v-for="line in section.lines" :key="line">{{ line }}</p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useI18n } from '../composables/useI18n';

const { dictionary } = useI18n();
const about = computed(() => dictionary.value.about ?? {});
const sections = computed(() => (Array.isArray(about.value.sections) ? about.value.sections : []));

const seoTitle = computed(() => about.value.title || 'SocialMore');
const seoDescription = computed(() => about.value.definition || '');
const siteUrl = computed(() => (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, ''));
const pageUrl = computed(() => `${siteUrl.value}/about`);

const upsertMeta = (attr, key, content) => {
  if (typeof document === 'undefined') return;
  const selector = `meta[${attr}="${key}"]`;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const applySeo = () => {
  if (typeof document === 'undefined') return;
  document.title = seoTitle.value;
  upsertMeta('name', 'description', seoDescription.value);
  upsertMeta('property', 'og:title', seoTitle.value);
  upsertMeta('property', 'og:description', seoDescription.value);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', pageUrl.value);
};

watch([seoTitle, seoDescription, pageUrl], applySeo, { immediate: true });
</script>

<style scoped>
.philosophy-page {
  background: #f7f9fc;
  padding: 3rem 1.5rem;
}

.philosophy-hero {
  max-width: 900px;
  margin: 0 auto 2rem;
  display: grid;
  gap: 0.75rem;
}

.definition {
  font-weight: 600;
  line-height: 1.7;
}

.stance {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.7;
}

.philosophy-section {
  background: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(15, 138, 215, 0.08);
  margin-bottom: 1.25rem;
}

.philosophy-section h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.philosophy-section p {
  margin: 0.35rem 0;
  line-height: 1.7;
  color: #1a2b4b;
}

@media (max-width: 768px) {
  .philosophy-page {
    padding: 2.5rem 1rem;
  }

  .philosophy-hero {
    gap: 0.5rem;
  }

  .philosophy-section {
    padding: 1.2rem;
    border-radius: 18px;
  }
}
</style>
