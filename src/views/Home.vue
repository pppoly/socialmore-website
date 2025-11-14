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
            <RouterLink to="/contact" class="btn btn-secondary">
              {{ t('buttons.contactUs') }}
            </RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-panel">
            <p class="panel-eyebrow">{{ heroPanel.eyebrow }}</p>
            <h3>{{ heroPanel.title }}</h3>
            <p class="panel-description">{{ heroPanel.description }}</p>
            <div class="panel-timeline">
              <div class="timeline-item" v-for="(step, index) in heroPanel.steps" :key="`${step.title}-${index}`">
                <div class="timeline-marker">
                  <span>{{ String(index + 1).padStart(2, '0') }}</span>
                  <div v-if="index < heroPanel.steps.length - 1" class="timeline-connector"></div>
                </div>
                <div class="timeline-copy">
                  <p class="timeline-phase">{{ step.title }}</p>
                  <p class="timeline-text">{{ step.body }}</p>
                </div>
              </div>
            </div>
            <p v-if="heroPanel.note" class="panel-note">{{ heroPanel.note }}</p>
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
            <div class="value-icon" aria-hidden="true">
              <img :src="getValueIcon(value.iconKey)" alt="" />
            </div>
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

    <section class="section now-projects" v-if="nowProjects.length">
      <div class="container">
        <div class="section-heading">
          <h2 class="section-title">{{ homeNow.title }}</h2>
          <p class="section-description">
            {{ homeNow.description }}
          </p>
        </div>
        <ul class="now-list">
          <li v-for="project in nowProjects" :key="project">
            <span>{{ project }}</span>
          </li>
        </ul>
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
import heroMainPhoto from '../assets/hero/hero-main.jpg';
import heroMainVisual from '../assets/hero/hero-main.svg';
import heroOverlayShapes from '../assets/hero/hero-overlay-shapes.svg';
import heroCtaArrow from '../assets/hero/hero-cta-arrow.svg';
import newsDefaultCover from '../assets/news/news-default.svg';
import valueIconSupport from '../assets/icons/icon-support-hand.svg';
import valueIconInfra from '../assets/icons/icon-infra-flow.svg';
import valueIconConnection from '../assets/icons/icon-connection-bubbles.svg';
import { newsItems } from '../data/news';

const { t, dictionary, currentLocale } = useI18n();
const heroContent = computed(() => dictionary.value.home.hero);
const valueIconMap = {
  support: valueIconSupport,
  infra: valueIconInfra,
  connection: valueIconConnection
};
const getValueIcon = (key) => valueIconMap[key] ?? valueIconSupport;
const heroPanel = computed(() => {
  const panel = heroContent.value.panel ?? {};
  const steps = Array.isArray(panel.steps) ? panel.steps : [];
  return {
    eyebrow: panel.eyebrow ?? '',
    title: panel.title ?? '',
    description: panel.description ?? '',
    note: panel.note ?? '',
    steps
  };
});

const heroBackgroundStyle = computed(() => ({
  backgroundImage:
    `linear-gradient(135deg, rgba(11, 28, 46, 0.92), rgba(15, 138, 215, 0.35)), url('${heroMainPhoto}'), url('${heroMainVisual}')`
}));

const heroOverlayStyle = computed(() => ({
  backgroundImage: `url('${heroOverlayShapes}')`
}));

const newsCoverStyle = computed(() => ({
  backgroundImage: `linear-gradient(135deg, rgba(15, 138, 215, 0.15), rgba(246, 195, 67, 0.15)), url('${newsDefaultCover}')`
}));

const currentHome = computed(() => dictionary.value.home);
const homeNow = computed(() => currentHome.value.now ?? { title: '', description: '', projects: [] });
const nowProjects = computed(() => homeNow.value.projects ?? []);
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

.hero-panel {
  width: min(360px, 100%);
  background: rgba(4, 12, 24, 0.82);
  color: #fff;
  border-radius: 28px;
  padding: 1.35rem 1.5rem;
  box-shadow: 0 30px 60px rgba(3, 12, 23, 0.65);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.5rem;
}

.panel-description {
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.panel-timeline {
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.timeline-item {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.timeline-marker {
  width: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.timeline-marker span {
  width: 40px;
  height: 40px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(37, 183, 176, 0.25));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.timeline-connector {
  flex: 1;
  width: 2px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 999px;
}

.timeline-copy {
  flex: 1;
}

.timeline-phase {
  margin: 0;
  font-weight: 600;
  font-size: 0.95rem;
}

.timeline-text {
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
  font-size: 0.92rem;
}

.panel-note {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.95rem;
  line-height: 1.5;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-image: linear-gradient(120deg, #0f8ad7, #25b7b0, #ffc65a);
  box-shadow: 0 18px 35px rgba(37, 183, 176, 0.35);
  text-align: center;
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

.value-icon {
  width: 56px;
  height: 56px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(37, 183, 176, 0.12), rgba(15, 138, 215, 0.18));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.value-icon img {
  width: 36px;
  height: 36px;
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

.now-projects {
  background: linear-gradient(180deg, rgba(37, 183, 176, 0.08), rgba(15, 138, 215, 0.08));
  border-radius: 32px;
  padding: 2.5rem 0;
}

.now-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.now-list li {
  background: #fff;
  border-radius: 20px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 20px 40px rgba(15, 138, 215, 0.08);
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.5;
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
