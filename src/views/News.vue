<template>
  <section class="section news-page">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">Updates</p>
        <h1 class="section-title">{{ t('news.title') }}</h1>
        <p class="section-description">{{ t('news.intro') }}</p>
      </div>
      <div class="card-grid">
        <article v-for="item in newsItems" :key="item.id" class="card news-card">
          <p class="news-date">{{ formatDate(item.date) }}</p>
          <h3>{{ item.title[currentLocale] }}</h3>
          <p>{{ item.summary[currentLocale] }}</p>
          <a :href="item.link" class="text-link">{{ t('buttons.readMore') }} →</a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from '../composables/useI18n';
import { newsItems } from '../data/news';

const { t, currentLocale } = useI18n();

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return currentLocale.value === 'ja'
    ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.news-date {
  font-size: 0.9rem;
  color: var(--color-muted);
  letter-spacing: 0.1em;
}
</style>
