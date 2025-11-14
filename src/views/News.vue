<template>
  <section class="section news-page">
    <div class="container">
      <div class="section-heading">
        <div class="heading-icon" aria-hidden="true"></div>
        <!-- icon-news.svg: ニュース一覧のラッパーで使用する通知ベル／メガホンのアイコン。 -->
        <p class="eyebrow">{{ t('news.eyebrow') }}</p>
        <h1 class="section-title">{{ t('news.title') }}</h1>
        <p class="section-description">{{ t('news.intro') }}</p>
      </div>
      <div class="card-grid">
        <article v-for="item in newsItems" :key="item.id" class="card news-card">
          <div class="news-card-thumb" :style="coverForItem(item)" aria-hidden="true"></div>
          <!-- news-default.svg: デフォルトのニュース画像。記事個別の画像があれば item.cover に設定します。 -->
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
import newsDefaultCover from '../assets/news/news-default.svg';

const { t, currentLocale } = useI18n();

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

.heading-icon {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  margin: 0 auto 1rem;
  background: rgba(15, 138, 215, 0.08);
  background-image: url('../assets/icons/icon-news.svg');
  background-size: 36px;
  background-repeat: no-repeat;
  background-position: center;
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
</style>
