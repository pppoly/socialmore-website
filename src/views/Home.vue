<template>
  <div class="home">
    <section class="section hero" :style="heroBackgroundStyle">
      <!-- hero-main.svg: 現在は開発用のビジュアル。最終素材が届いたら差し替えてください。 -->
      <div class="hero-overlay-shapes" :style="heroOverlayStyle" aria-hidden="true"></div>
      <!-- hero-overlay-shapes.svg: ロゴをモチーフにした抽象ライン。透明背景でヒーローセクションに重ねる。 -->
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ hero.eyebrow }}</p>
          <h1>{{ hero.title }}</h1>
          <p class="subtitle">{{ hero.subtitle }}</p>
          <p class="core-message">{{ hero.coreMessage }}</p>
          <p class="stance">{{ hero.stance }}</p>
          <div class="cta-row">
            <a
              :href="links.lineMiniApp"
              class="btn btn-primary cta-primary"
              :target="linkTarget(links.lineMiniApp)"
              :rel="linkRel(links.lineMiniApp)"
            >
              <span>{{ hero.primaryCta }}</span>
              <img :src="heroCtaArrow" alt="" aria-hidden="true" />
            </a>
            <RouterLink :to="plannerRouteFor('firstPlan')" class="btn btn-secondary">
              {{ hero.secondaryCta }}
            </RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-results">
            <article v-for="item in heroResults" :key="item.label" class="result-card">
              <p class="result-label">{{ item.label }}</p>
              <p class="result-value">{{ item.value }}</p>
              <p class="result-note">{{ item.note }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section dense-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ features.eyebrow }}</p>
          <h2 class="section-title">{{ features.title }}</h2>
          <p class="section-description">{{ features.lead }}</p>
        </div>
        <div class="card-grid why-grid">
          <article v-for="point in featureItems" :key="point.title" class="card why-card">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ valueSection.eyebrow }}</p>
          <h2 class="section-title">{{ valueSection.title }}</h2>
          <p class="section-description">{{ valueSection.lead }}</p>
        </div>
        <div class="card-grid why-grid">
          <article v-for="point in valueItems" :key="point.title" class="card why-card">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section proof-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ proof.eyebrow }}</p>
          <h2 class="section-title">{{ proof.title }}</h2>
          <p class="section-description">{{ proof.lead }}</p>
        </div>
        <div class="card-grid proof-grid">
          <article v-for="metric in proofMetrics" :key="metric.title" class="card proof-card">
            <p class="metric-title">{{ metric.title }}</p>
            <p class="metric-value">{{ metric.value }}</p>
            <p class="metric-note">{{ metric.note }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section cta-section">
      <div class="container cta-shell">
        <div class="cta-copy">
          <p class="eyebrow">{{ cta.eyebrow }}</p>
          <h2 class="section-title">{{ cta.title }}</h2>
          <p class="section-description">{{ cta.body }}</p>
        </div>
        <div class="cta-actions">
          <RouterLink
            v-for="action in ctaActions"
            :key="action.routeKey"
            :to="plannerRouteFor(action.routeKey)"
            class="btn"
            :class="buttonClass(action.variant)"
          >
            {{ action.label }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useI18n } from '../composables/useI18n';
import { ctaLinks } from '../data/ctaLinks';
import heroMainPhoto from '../assets/hero/hero-main.jpg';
import heroMainVisual from '../assets/hero/hero-main.svg';
import heroOverlayShapes from '../assets/hero/hero-overlay-shapes.svg';
import heroCtaArrow from '../assets/hero/hero-cta-arrow.svg';

const { dictionary } = useI18n();

const links = ctaLinks;
const isExternalLink = (href) => /^https?:\/\//.test(href);
const linkTarget = (href) => (isExternalLink(href) ? '_blank' : null);
const linkRel = (href) => (isExternalLink(href) ? 'noopener' : null);
const plannerRouteFor = (routeKey) => links.plannerRoutes?.[routeKey] ?? '/';

const buttonClass = (variant) => {
  if (variant === 'secondary') return 'btn-secondary';
  if (variant === 'ghost') return 'btn-ghost';
  return 'btn-primary';
};

const home = computed(() => dictionary.value.home ?? {});
const hero = computed(() => home.value.hero ?? {});
const heroResults = computed(() => (Array.isArray(hero.value.results) ? hero.value.results : []));
const features = computed(() => home.value.features ?? home.value.why ?? {});
const featureItems = computed(() => (Array.isArray(features.value.points) ? features.value.points : []));
const valueSection = computed(() => home.value.value ?? home.value.steps ?? {});
const valueItems = computed(() => {
  if (Array.isArray(valueSection.value.points)) return valueSection.value.points;
  if (Array.isArray(valueSection.value.items)) return valueSection.value.items;
  return [];
});
const proof = computed(() => home.value.proof ?? {});
const proofMetrics = computed(() => (Array.isArray(proof.value.metrics) ? proof.value.metrics : []));
const cta = computed(() => home.value.cta ?? {});
const ctaActions = computed(() => (Array.isArray(cta.value.actions) ? cta.value.actions : []));

const heroBackgroundStyle = computed(() => ({
  backgroundImage:
    `linear-gradient(135deg, rgba(11, 28, 46, 0.92), rgba(15, 138, 215, 0.35)), url('${heroMainPhoto}'), url('${heroMainVisual}')`
}));

const heroOverlayStyle = computed(() => ({
  backgroundImage: `url('${heroOverlayShapes}')`
}));

const seoTitle = computed(() => hero.value.title || 'SocialMore');
const seoDescription = computed(() => hero.value.subtitle || '');
const siteUrl = computed(() => (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, ''));
const pageUrl = computed(() => `${siteUrl.value}/`);

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
.hero {
  position: relative;
  padding-top: 4.5rem;
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
  grid-template-columns: 1fr;
  gap: 2.25rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-grid > * {
  min-width: 0;
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 4vw, 3.1rem);
  margin-bottom: 1rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.core-message,
.stance {
  margin: 0 0 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  line-height: 1.6;
}

.stance {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
}

.hero .eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.75rem;
  color: var(--color-accent);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero-visual {
  display: flex;
  justify-content: flex-start;
}

.hero-results {
  width: min(420px, 100%);
  display: grid;
  gap: 0.9rem;
}

.result-card {
  background: rgba(4, 12, 24, 0.82);
  color: #fff;
  border-radius: 18px;
  padding: 1rem 1.1rem;
  box-shadow: 0 30px 60px rgba(3, 12, 23, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.result-label {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.result-value {
  margin: 0.25rem 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.result-note {
  margin: 0.2rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;
  font-size: 0.86rem;
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
  max-width: 760px;
  margin: 0 auto 2rem;
  text-align: left;
}

.dense-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.why-grid {
  align-items: stretch;
}

.why-card h3 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.why-card p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.scenarios-section {
  background: linear-gradient(180deg, rgba(15, 138, 215, 0.06), rgba(246, 195, 67, 0.08));
}

.scenario-grid {
  align-items: stretch;
}

.scenario-card h3 {
  margin: 0 0 0.8rem;
}

.scenario-specs {
  margin: 0;
  display: grid;
  gap: 0.7rem;
}

.scenario-row {
  display: grid;
  gap: 0.2rem;
}

.scenario-row dt {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.scenario-row dd {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.steps-section {
  background: #fff;
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.95rem;
}

.step-card {
  background: #fff;
  border-radius: 20px;
  padding: 1.1rem 1.25rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  box-shadow: 0 18px 40px rgba(15, 138, 215, 0.08);
}

.step-index {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(15, 138, 215, 0.12);
  color: var(--color-primary);
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
}

.step-body h3 {
  margin: 0 0 0.35rem;
  font-size: 1rem;
}

.step-body p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.proof-section {
  background: #0d1c2e;
  color: #fff;
}

.proof-section .section-description {
  color: rgba(255, 255, 255, 0.7);
}

.proof-card {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-radius: 18px;
}

.metric-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metric-value {
  margin: 0.45rem 0 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
}

.metric-note {
  margin: 0.4rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.55;
}

.trust-grid {
  align-items: stretch;
}

.trust-card h3 {
  margin: 0 0 0.6rem;
}

.trust-card p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.cta-section {
  background: linear-gradient(135deg, rgba(15, 138, 215, 0.08), rgba(37, 183, 176, 0.08));
}

.cta-shell {
  display: grid;
  gap: 1.5rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.btn-ghost {
  border: 1px solid rgba(15, 138, 215, 0.3);
  background: transparent;
  color: var(--color-primary);
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .hero-visual {
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .cta-row,
  .cta-actions {
    flex-direction: column;
  }

  .cta-row .btn,
  .cta-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .hero {
    padding-top: 4rem;
  }

  .hero-copy h1 {
    font-size: clamp(2rem, 7vw, 2.5rem);
  }

  .result-card {
    padding: 1.25rem;
    border-radius: 16px;
  }
}
</style>
