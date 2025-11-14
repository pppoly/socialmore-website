<template>
  <section class="section news-detail">
    <div class="container" v-if="article">
      <RouterLink to="/news" class="back-link">← {{ t('news.detail.back') }}</RouterLink>
      <p class="eyebrow">{{ t('news.eyebrow') }}</p>
      <h1 class="section-title">{{ article.title[currentLocale] }}</h1>
      <p class="news-date">{{ formatDate(article.date) }}</p>
      <div class="detail-content">
        <p v-for="(paragraph, index) in articleBody" :key="`paragraph-${index}`">
          {{ paragraph }}
        </p>
      </div>
    </div>
    <div class="container" v-else>
      <RouterLink to="/news" class="back-link">← {{ t('news.detail.back') }}</RouterLink>
      <h1 class="section-title">{{ t('news.detail.notFoundTitle') }}</h1>
      <p>{{ t('news.detail.notFoundCopy') }}</p>
      <RouterLink to="/news" class="btn btn-secondary">{{ t('news.detail.back') }}</RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import { newsItems } from '../data/news';

const route = useRoute();
const { t, currentLocale } = useI18n();

const article = computed(() => {
  const id = Number(route.params.id);
  return newsItems.find((item) => item.id === id);
});

const articleBody = computed(() => {
  if (!article.value) {
    return [];
  }
  const locale = currentLocale.value;
  return article.value.content?.[locale] ?? article.value.content?.ja ?? [];
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return currentLocale.value === 'ja'
    ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.news-detail .container {
  max-width: 760px;
}

.back-link {
  display: inline-flex;
  gap: 0.25rem;
  color: var(--color-muted);
  font-weight: 500;
  margin-bottom: 1.5rem;
}

.news-date {
  color: var(--color-muted);
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  line-height: 1.8;
  color: var(--color-dark);
}

.btn {
  margin-top: 1rem;
}
</style>
