<template>
  <section class="section news-detail">
    <div class="container" v-if="isLoading">
      <RouterLink to="/news" class="back-link">← {{ t('news.detail.back') }}</RouterLink>
      <p>{{ loadingText }}</p>
    </div>
    <div class="container" v-else-if="loadError">
      <RouterLink to="/news" class="back-link">← {{ t('news.detail.back') }}</RouterLink>
      <h1 class="section-title">{{ loadError }}</h1>
      <RouterLink to="/news" class="btn btn-secondary">{{ t('news.detail.back') }}</RouterLink>
    </div>
    <div class="container" v-else-if="article">
      <RouterLink to="/news" class="back-link">← {{ t('news.detail.back') }}</RouterLink>
      <p class="eyebrow">{{ t('news.eyebrow') }}</p>
      <h1 class="section-title">{{ localized(article.title) }}</h1>
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import { useSeo } from '../composables/useSeo';
import { fetchNewsItem } from '../services/newsRepository';

const route = useRoute();
const { t, currentLocale } = useI18n();
const article = ref(null);
const isLoading = ref(true);
const loadError = ref('');

const loadingText = computed(() => (currentLocale.value === 'ja' ? '読み込み中です。' : 'Loading article.'));

const loadArticle = async () => {
  isLoading.value = true;
  loadError.value = '';
  try {
    article.value = await fetchNewsItem(route.params.id);
  } catch (error) {
    article.value = null;
    loadError.value = currentLocale.value === 'ja'
      ? 'ニュースを読み込めませんでした。'
      : 'Could not load this article.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadArticle);
watch(() => route.params.id, loadArticle);

const articleBody = computed(() => {
  if (!article.value) {
    return [];
  }
  const locale = currentLocale.value;
  return article.value.content?.[locale] ?? article.value.content?.ja ?? [];
});

const localized = (value) => {
  if (!value || typeof value !== 'object') {
    return value ?? '';
  }
  return value[currentLocale.value] ?? value.ja ?? value.en ?? value.zh ?? '';
};

const seoTitle = computed(() =>
  article.value ? localized(article.value.title) : t('news.detail.notFoundTitle')
);
const seoDescription = computed(() =>
  article.value
    ? localized(article.value.summary)
    : t('news.detail.notFoundCopy')
);
const seoImage = computed(() => article.value?.cover || '/socialmore-assets/hero/home-hero-app.png');

useSeo(computed(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  path: `/news/${route.params.id}`,
  image: seoImage.value,
  type: article.value ? 'article' : 'website',
  robots: article.value ? 'index,follow' : 'noindex,follow',
  jsonLd: article.value
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: seoTitle.value,
        description: seoDescription.value,
        datePublished: article.value.date,
        dateModified: article.value.date,
        image: seoImage.value
      }
    : null
})));

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
