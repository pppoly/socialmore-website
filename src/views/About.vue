<template>
  <div class="section">
    <div class="container about-page">
      <div class="section-heading">
        <p class="eyebrow">{{ t('about.eyebrow') }}</p>
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
      <section class="about-card photo-gallery">
        <h2>{{ t('about.galleryTitle') }}</h2>
        <p>{{ t('about.galleryDescription') }}</p>
        <div class="photo-grid">
          <figure
            v-for="photo in aboutContent.galleryPhotos"
            :key="photo.file"
            class="photo-frame"
            :style="getPhotoStyle(photo.file)"
          >
            <figcaption>{{ photo.caption }}</figcaption>
          </figure>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';
import photoOffice from '../assets/photos/photo-office-01.svg';
import photoEvent from '../assets/photos/photo-event-01.svg';
import photoTeam from '../assets/photos/photo-team-portrait.svg';

const { t, dictionary } = useI18n();
const aboutContent = computed(() => dictionary.value.about);

const photoSources = {
  'photo-office-01.jpg': photoOffice,
  'photo-event-01.jpg': photoEvent,
  'photo-team-portrait.jpg': photoTeam
};

const defaultPhoto = photoOffice;

const getPhotoStyle = (fileName) => {
  const resolved = photoSources[fileName] ?? defaultPhoto;
  return {
    backgroundImage: `linear-gradient(135deg, rgba(11, 28, 46, 0.35), rgba(37, 183, 176, 0.15)), url('${resolved}')`
  };
};
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

.photo-gallery p {
  color: var(--color-muted);
  margin-bottom: 1.5rem;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
}

.photo-frame {
  border-radius: 24px;
  min-height: 220px;
  background-size: cover;
  background-position: center;
  color: #fff;
  display: flex;
  align-items: flex-end;
  padding: 1rem;
  box-shadow: 0 20px 40px rgba(11, 28, 46, 0.25);
  /* photo-*.svg: 現在はプレースホルダー。実写素材に差し替える場合は file 名を更新してください。 */
}

.photo-frame figcaption {
  font-size: 0.9rem;
  line-height: 1.3;
}
</style>
