<template>
  <section class="section news-page">
    <div class="container">
      <div class="section-heading">
        <p class="eyebrow">{{ t('news.eyebrow') }}</p>
        <h1 class="section-title">{{ t('news.title') }}</h1>
        <p class="section-description">{{ t('news.intro') }}</p>
      </div>
      <div v-if="isLoading" class="card state-card">
        <p>{{ loadingText }}</p>
      </div>
      <div v-else-if="loadError" class="card state-card error-state">
        <p>{{ loadError }}</p>
      </div>
      <div v-else class="card-grid">
        <article v-for="item in newsItems" :key="item.id" class="card news-card">
          <div class="news-card-thumb" :style="coverForItem(item)" aria-hidden="true"></div>
          <!-- news-default.svg: デフォルトのニュース画像。記事個別の画像があれば item.cover に設定します。 -->
          <p class="news-date">{{ formatDate(item.date) }}</p>
          <h3>{{ localized(item.title) }}</h3>
          <p>{{ localized(item.summary) }}</p>
          <RouterLink :to="`/news/${item.id}`" class="text-link">{{ t('buttons.readMore') }} →</RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import { fetchNewsItems } from '../services/newsRepository';
import newsDefaultCover from '../assets/news/news-default.svg';

const { t, currentLocale } = useI18n();
const newsItems = ref([]);
const isLoading = ref(true);
const loadError = ref('');

const loadingText = computed(() => (currentLocale.value === 'ja' ? '読み込み中です。' : 'Loading news.'));

const loadNews = async () => {
  isLoading.value = true;
  loadError.value = '';
  try {
    newsItems.value = await fetchNewsItems();
  } catch (error) {
    loadError.value = currentLocale.value === 'ja'
      ? 'ニュースを読み込めませんでした。時間をおいて再度お試しください。'
      : 'Could not load news. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadNews);

const localized = (value) => {
  if (!value || typeof value !== 'object') {
    return value ?? '';
  }
  return value[currentLocale.value] ?? value.ja ?? value.en ?? value.zh ?? '';
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return currentLocale.value === 'ja'
    ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const coverForItem = (item) => {
  const source = item.cover ?? newsDefaultCover;
  return {
    backgroundImage: `linear-gradient(135deg, rgba(15, 138, 215, 0.12), rgba(246, 195, 67, 0.12)), url('${source}')`
  };
};
</script>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.news-card-thumb {
  width: 100%;
  padding-top: 52%;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
}

.news-date {
  font-size: 0.9rem;
  color: var(--color-muted);
  letter-spacing: 0.1em;
}

.state-card {
  max-width: 720px;
}

.error-state {
  color: #d9534f;
}
</style>
