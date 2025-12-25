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
          <p class="definition">{{ hero.definition }}</p>
          <p class="stance">{{ hero.stance }}</p>
          <div class="cta-row">
            <a
              :href="links.apply"
              class="btn btn-primary cta-primary"
              :target="linkTarget(links.apply)"
              :rel="linkRel(links.apply)"
            >
              <span>{{ hero.primaryCta }}</span>
              <img :src="heroCtaArrow" alt="" aria-hidden="true" />
            </a>
            <a
              :href="links.experience"
              class="btn btn-secondary"
              :target="linkTarget(links.experience)"
              :rel="linkRel(links.experience)"
            >
              {{ hero.secondaryCta }}
            </a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-panel">
            <p class="panel-eyebrow">{{ hero.panelEyebrow }}</p>
            <h3>{{ hero.panelTitle }}</h3>
            <ul class="panel-list">
              <li v-for="item in heroPanelItems" :key="item.title">
                <h4>{{ item.title }}</h4>
                <p>{{ item.body }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section dense-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ why.eyebrow }}</p>
          <h2 class="section-title">{{ why.title }}</h2>
          <p class="section-description">{{ why.lead }}</p>
        </div>
        <div class="card-grid why-grid">
          <article v-for="point in whyPoints" :key="point.title" class="card why-card">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section how-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ how.eyebrow }}</p>
          <h2 class="section-title">{{ how.title }}</h2>
          <p class="section-description">{{ how.lead }}</p>
        </div>
        <div class="how-grid">
          <ol class="how-steps">
            <li v-for="(step, index) in howSteps" :key="step.title" class="how-step">
              <div class="step-index">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="step-body">
                <h3>{{ step.title }}</h3>
                <p>{{ step.body }}</p>
              </div>
            </li>
          </ol>
          <aside class="card ai-card">
            <p class="eyebrow">{{ ai.eyebrow }}</p>
            <h3>{{ ai.title }}</h3>
            <ul class="ai-list">
              <li v-for="item in aiItems" :key="item">{{ item }}</li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="section dense-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ what.eyebrow }}</p>
          <h2 class="section-title">{{ what.title }}</h2>
          <p class="section-description">{{ what.lead }}</p>
        </div>
        <div class="card-grid what-grid">
          <article v-for="item in whatItems" :key="item.title" class="card what-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
            <ul class="evidence-list">
              <li v-for="evidence in item.evidence" :key="evidence">{{ evidence }}</li>
            </ul>
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
          <article v-for="item in proofItems" :key="item" class="card proof-card">
            <p>{{ item }}</p>
            <span class="proof-placeholder">{{ proof.placeholder }}</span>
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
          <a
            :href="links.apply"
            class="btn btn-primary"
            :target="linkTarget(links.apply)"
            :rel="linkRel(links.apply)"
          >
            {{ cta.primary }}
          </a>
          <a
            :href="links.experience"
            class="btn btn-secondary"
            :target="linkTarget(links.experience)"
            :rel="linkRel(links.experience)"
          >
            {{ cta.secondary }}
          </a>
          <a
            :href="links.consult"
            class="btn btn-ghost"
            :target="linkTarget(links.consult)"
            :rel="linkRel(links.consult)"
          >
            {{ cta.tertiary }}
          </a>
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

const home = computed(() => dictionary.value.home ?? {});
const hero = computed(() => home.value.hero ?? {});
const heroPanelItems = computed(() => (Array.isArray(hero.value.panelItems) ? hero.value.panelItems : []));
const why = computed(() => home.value.why ?? {});
const whyPoints = computed(() => (Array.isArray(why.value.points) ? why.value.points : []));
const how = computed(() => home.value.how ?? {});
const howSteps = computed(() => (Array.isArray(how.value.steps) ? how.value.steps : []));
const what = computed(() => home.value.what ?? {});
const whatItems = computed(() => (Array.isArray(what.value.items) ? what.value.items : []));
const ai = computed(() => home.value.ai ?? {});
const aiItems = computed(() => (Array.isArray(ai.value.items) ? ai.value.items : []));
const proof = computed(() => home.value.proof ?? {});
const proofItems = computed(() => (Array.isArray(proof.value.items) ? proof.value.items : []));
const cta = computed(() => home.value.cta ?? {});

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

.hero-grid > *,
.how-grid > * {
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

.definition,
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

.hero-panel {
  width: min(360px, 100%);
  background: rgba(4, 12, 24, 0.82);
  color: #fff;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 30px 60px rgba(3, 12, 23, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.65);
  margin-bottom: 0.5rem;
}

.panel-list {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.9rem;
}

.panel-list h4 {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
}

.panel-list p {
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.5;
  font-size: 0.9rem;
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

.how-section {
  background: linear-gradient(180deg, rgba(15, 138, 215, 0.06), rgba(246, 195, 67, 0.08));
}

.how-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

.how-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.how-step {
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

.ai-card {
  background: #0b1c2c;
  color: #eff4ff;
  border-radius: 22px;
  padding: 1.5rem;
  box-shadow: 0 20px 45px rgba(11, 28, 46, 0.25);
}

.ai-card .eyebrow {
  color: rgba(255, 255, 255, 0.7);
  letter-spacing: 0.25em;
}

.ai-card h3 {
  margin: 0 0 0.75rem;
}

.ai-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
  color: rgba(239, 244, 255, 0.8);
  line-height: 1.6;
}

.what-card h3 {
  margin-top: 0;
}

.evidence-list {
  list-style: none;
  padding: 0;
  margin: 0.9rem 0 0;
  display: grid;
  gap: 0.5rem;
  color: var(--color-muted);
  font-size: 0.92rem;
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

.proof-placeholder {
  display: inline-flex;
  margin-top: 0.6rem;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
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

  .how-grid {
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
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

  .hero-panel {
    padding: 1.25rem;
    border-radius: 20px;
  }

  .panel-list {
    gap: 0.75rem;
  }
}
</style>
