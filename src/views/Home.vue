<template>
  <div>
    <section class="section hero" :style="heroBackgroundStyle">
      <!-- hero-main.svg: 現在は開発用のビジュアル。最終素材が届いたら差し替えてください。 -->
      <div class="hero-overlay-shapes" :style="heroOverlayStyle" aria-hidden="true"></div>
      <!-- hero-overlay-shapes.svg: ロゴをモチーフにした抽象ライン。透明背景でヒーローセクションに重ねる。 -->
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ heroContent.eyebrow }}</p>
          <h1>{{ t('home.hero.title') }}</h1>
          <p class="subtitle">{{ t('home.hero.subtitle') }}</p>
          <div class="cta-row">
            <RouterLink to="/services" class="btn btn-primary cta-primary">
              <span>{{ t('home.hero.primaryCta') }}</span>
              <img :src="heroCtaArrow" alt="" aria-hidden="true" />
            </RouterLink>
            <RouterLink to="/contact" class="btn btn-secondary">{{ t('home.hero.secondaryCta') }}</RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="dashboard-card">
            <div class="card-header">
              <div class="pill">{{ heroDashboard.focusTag }}</div>
              <div class="status">{{ heroDashboard.statusLabel }}</div>
            </div>
            <div class="stats">
              <div class="stat" v-for="item in heroStats" :key="item.label">
                <span class="label">{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
                <small>{{ item.note }}</small>
              </div>
            </div>
            <div class="chart">
              <span v-for="n in 6" :key="n" :style="{ height: 15 + n * 10 + 'px' }"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-heading">
          <h2 class="section-title">{{ currentHome.valuesTitle }}</h2>
          <p class="section-description">
            {{ currentHome.valuesDescription }}
          </p>
        </div>
        <div class="card-grid value-grid">
          <article v-for="value in currentHome.values" :key="value.title" class="card value-card">
            <div class="icon-circle"></div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section highlight">
      <div class="container">
        <div class="section-heading">
          <h2 class="section-title">{{ currentHome.highlightsTitle }}</h2>
          <p class="section-description">
            {{ currentHome.highlightsDescription }}
          </p>
        </div>
        <div class="card-grid">
          <article v-for="item in currentHome.productHighlights" :key="item.title" class="card highlight-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
            <button class="text-link">{{ t('buttons.learnMore') }} →</button>
          </article>
        </div>
      </div>
    </section>

    <section class="section news-teaser">
      <div class="container">
        <div class="section-heading">
          <h2 class="section-title">{{ currentHome.newsTitle }}</h2>
          <p class="section-description">{{ currentHome.newsDescription }}</p>
        </div>
        <div class="card-grid">
          <article v-for="item in latestNews" :key="item.id" class="card news-card">
            <div class="news-thumb" :style="newsCoverStyle" aria-hidden="true"></div>
            <!-- news-default.svg: デフォルトのニュースサムネイル。必要に応じて各記事個別の画像に差し替えます。 -->
            <p class="news-date">{{ formatDate(item.date) }}</p>
            <h3>{{ item.title[currentLocale] }}</h3>
            <p>{{ item.summary[currentLocale] }}</p>
            <RouterLink to="/news" class="text-link">{{ t('buttons.readMore') }} →</RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import heroMainVisual from '../assets/hero/hero-main.svg';
import heroOverlayShapes from '../assets/hero/hero-overlay-shapes.svg';
import heroCtaArrow from '../assets/hero/hero-cta-arrow.svg';
import newsDefaultCover from '../assets/news/news-default.svg';
import { newsItems } from '../data/news';

const { t, dictionary, currentLocale } = useI18n();
const heroContent = computed(() => dictionary.value.home.hero);
const heroDashboard = computed(() => heroContent.value.dashboard ?? { focusTag: '', statusLabel: '', stats: [] });

const heroPhotoUrl = `${import.meta.env.BASE_URL}hero/hero-main.jpg`;
const heroBackgroundStyle = computed(() => ({
  backgroundImage:
    `linear-gradient(135deg, rgba(11, 28, 46, 0.92), rgba(15, 138, 215, 0.35)), url('${heroPhotoUrl}'), url('${heroMainVisual}')`
}));

const heroOverlayStyle = computed(() => ({
  backgroundImage: `url('${heroOverlayShapes}')`
}));

const newsCoverStyle = computed(() => ({
  backgroundImage: `linear-gradient(135deg, rgba(15, 138, 215, 0.15), rgba(246, 195, 67, 0.15)), url('${newsDefaultCover}')`
}));

const heroStats = computed(() => heroDashboard.value?.stats ?? []);

const currentHome = computed(() => dictionary.value.home);
const latestNews = computed(() => newsItems.slice(0, 3));

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return currentLocale.value === 'ja'
    ? `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
</script>

<style scoped>
.hero {
  position: relative;
  padding-top: 5rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  color: #fff;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(11, 28, 46, 0.75), rgba(15, 138, 215, 0.35));
  z-index: 0;
}

.hero-overlay-shapes {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: min(1200px, 90%);
  opacity: 0.35;
  mix-blend-mode: screen;
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-copy {
  position: relative;
  z-index: 1;
  color: #fff;
}

.hero-copy h1 {
  font-size: clamp(2.4rem, 4vw, 3rem);
  margin-bottom: 1rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
}

.hero .eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  font-size: 0.8rem;
  color: var(--color-accent);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.dashboard-card {
  width: min(360px, 100%);
  background: rgba(4, 12, 24, 0.82);
  color: #fff;
  border-radius: 28px;
  padding: 1.5rem;
  box-shadow: 0 30px 60px rgba(3, 12, 23, 0.65);
  backdrop-filter: blur(12px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.pill {
  background: rgba(255, 255, 255, 0.15);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.status {
  color: var(--color-accent);
  font-weight: 600;
}

.stats {
  display: grid;
  gap: 0.75rem;
}

.stat {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 0.75rem 1rem;
}

.stat .label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.stat strong {
  display: block;
  font-size: 1.7rem;
  margin-top: 0.35rem;
}

.stat small {
  color: rgba(255, 255, 255, 0.65);
}

.chart {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.chart span {
  flex: 1;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(37, 183, 176, 0.8));
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-image: linear-gradient(120deg, #0f8ad7, #25b7b0, #ffc65a);
  box-shadow: 0 18px 35px rgba(37, 183, 176, 0.35);
}

.cta-primary img {
  width: 20px;
  height: auto;
}

.section-heading {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 2.5rem;
}

.value-grid .value-card {
  text-align: left;
}

.value-card .icon-circle {
  width: 50px;
  height: 50px;
  border-radius: 18px;
  background-image: var(--gradient-primary);
  margin-bottom: 1rem;
}

.highlight {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(247, 251, 255, 0.85)),
    url('../assets/backgrounds/bg-section-light.svg');
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 32px;
  padding: 3rem 0;
  /* bg-section-light.svg: 紙質感のテクスチャ。 */
}

.highlight-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.text-link {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.news-teaser {
  background: #0d1c2e;
  color: #fff;
}

.news-teaser .card {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.news-thumb {
  width: 100%;
  padding-top: 56%;
  border-radius: 18px;
  background-size: cover;
  background-position: center;
  margin-bottom: 1rem;
}

.news-date {
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .cta-row {
    flex-direction: column;
  }

  .hero {
    padding-top: 4rem;
  }
}
</style>
