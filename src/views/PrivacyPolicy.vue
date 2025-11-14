<template>
  <main class="section legal-page">
    <div class="container">
      <header class="legal-header">
        <p class="legal-updated">{{ privacy.updated }}</p>
        <h1>{{ privacy.title }}</h1>
        <p class="legal-intro">{{ privacy.intro }}</p>
      </header>
      <section
        v-for="(section, index) in privacy.sections"
        :key="`${section.title}-${index}`"
        class="legal-section"
      >
        <h2>{{ section.title }}</h2>
        <p v-for="(paragraph, paragraphIndex) in section.body" :key="`body-${index}-${paragraphIndex}`">
          {{ paragraph }}
        </p>
        <ul v-if="section.bullets && section.bullets.length" class="legal-list">
          <li v-for="(bullet, bulletIndex) in section.bullets" :key="`bullet-${index}-${bulletIndex}`">
            {{ bullet }}
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t } = useI18n();

const privacy = computed(() => {
  const value = t('legal.privacy');
  if (value && typeof value === 'object') {
    const sections = Array.isArray(value.sections)
      ? value.sections.map((section) => ({
          title: section.title ?? '',
          body: Array.isArray(section.body) ? section.body : [],
          bullets: Array.isArray(section.bullets) ? section.bullets : []
        }))
      : [];
    return {
      title: value.title ?? '',
      intro: value.intro ?? '',
      updated: value.updated ?? '',
      sections
    };
  }
  return { title: '', intro: '', updated: '', sections: [] };
});
</script>

<style scoped>
.legal-page {
  background: #f7f9fc;
  padding: 4rem 1.5rem;
}

.legal-header {
  max-width: 840px;
  margin: 0 auto 2.5rem;
  text-align: left;
}

.legal-header h1 {
  margin: 0.5rem 0;
}

.legal-updated {
  color: var(--color-muted, #4e5d78);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.legal-intro {
  color: #1a2b4b;
  line-height: 1.7;
}

.legal-section {
  background: #fff;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 30px 60px rgba(15, 138, 215, 0.08);
  margin-bottom: 1.5rem;
}

.legal-section h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.legal-section p {
  margin: 0.75rem 0;
  line-height: 1.7;
}

.legal-list {
  margin: 0.75rem 0 0;
  padding-left: 1.25rem;
  color: #1a2b4b;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .legal-section {
    padding: 1.5rem;
  }
}
</style>
