<template>
  <div class="section">
    <div class="container about-page">
      <div class="section-heading">
        <p class="eyebrow">SOCIALMORE</p>
        <h1 class="section-title">{{ t('about.title') }}</h1>
      </div>
      <section class="about-card vision">
        <h2>{{ t('about.visionTitle') }}</h2>
        <p>{{ t('about.visionText') }}</p>
      </section>
      <section class="about-card">
        <h2>{{ t('about.missionTitle') }}</h2>
        <div class="card-grid">
          <article v-for="value in aboutContent.values" :key="value.title" class="card mini-card">
            <h3>{{ value.title }}</h3>
            <p>{{ value.body }}</p>
          </article>
        </div>
      </section>
      <section class="about-card timeline">
        <h2>{{ t('about.timelineTitle') }}</h2>
        <ol>
          <li v-for="item in aboutContent.timeline" :key="item.year">
            <div class="year">{{ item.year }}</div>
            <p>{{ item.text }}</p>
          </li>
        </ol>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { t, dictionary } = useI18n();
const aboutContent = computed(() => dictionary.value.about);
</script>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.about-card {
  background: #fff;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 30px 60px rgba(15, 138, 215, 0.08);
}

.vision {
  background: radial-gradient(circle at top left, rgba(246, 195, 67, 0.25), rgba(255, 255, 255, 0.95));
}

.timeline ol {
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline li {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.timeline li:last-child {
  border-bottom: none;
}

.year {
  min-width: 70px;
  font-weight: 700;
  color: var(--color-primary);
}

.mini-card {
  min-height: 180px;
}
</style>
