<template>
  <div class="section">
    <div class="container services-page">
      <div class="section-heading">
        <p class="eyebrow">Platform</p>
        <h1 class="section-title">{{ t('services.title') }}</h1>
      </div>
      <section class="service-icon-grid">
        <!-- icon-membership.svg: 会員管理SaaSの象徴となるダッシュボードアイコン。 -->
        <!-- icon-community.svg: コミュニティ／外国人支援を表す会話バブルアイコン。 -->
        <!-- icon-ai.svg: 企業向けAIスキルアップのチップ＋矢印アイコン。 -->
        <article v-for="item in iconHighlights" :key="item.title" class="icon-feature-card">
          <div class="icon-badge" :style="getIconStyle(item.iconKey)" role="img" :aria-label="item.title"></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </article>
      </section>
      <section class="service-section">
        <h2>{{ t('services.communityTitle') }}</h2>
        <div class="card-grid">
          <article v-for="card in services.communityCards" :key="card.title" class="card service-card">
            <div class="icon-circle"></div>
            <h3>{{ card.title }}</h3>
            <ul>
              <li v-for="feature in card.bullets" :key="feature">{{ feature }}</li>
            </ul>
          </article>
        </div>
      </section>
      <section class="service-section">
        <h2>{{ t('services.companyTitle') }}</h2>
        <div class="card-grid">
          <article v-for="card in services.companyCards" :key="card.title" class="card service-card">
            <div class="icon-circle warm"></div>
            <h3>{{ card.title }}</h3>
            <ul>
              <li v-for="feature in card.bullets" :key="feature">{{ feature }}</li>
            </ul>
          </article>
        </div>
      </section>
      <section class="plan-section">
        <h2>{{ t('services.plansTitle') }}</h2>
        <div class="card-grid">
          <article v-for="plan in services.plans" :key="plan.name" class="card plan-card">
            <h3>{{ plan.name }}</h3>
            <p>{{ plan.description }}</p>
            <ul>
              <li v-for="feature in plan.bullets" :key="feature">{{ feature }}</li>
            </ul>
            <RouterLink to="/contact" class="btn btn-primary">{{ t('buttons.contactUs') }}</RouterLink>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { useI18n } from '../composables/useI18n';
import iconMembership from '../assets/icons/icon-membership.svg';
import iconCommunity from '../assets/icons/icon-community.svg';
import iconAi from '../assets/icons/icon-ai.svg';

const { t, dictionary } = useI18n();
const services = computed(() => dictionary.value.services);
const iconHighlights = computed(() => services.value.iconHighlights ?? []);

const iconPaths = {
  membership: iconMembership,
  community: iconCommunity,
  ai: iconAi
};

const fallbackIcon = iconMembership;

const getIconStyle = (iconKey) => {
  const source = iconPaths[iconKey] ?? fallbackIcon;
  return {
    '--icon-src': `url('${source}')`
  };
};
</script>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.service-icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.icon-feature-card {
  background: #fff;
  border-radius: 24px;
  padding: 1.5rem;
  box-shadow: 0 20px 45px rgba(15, 138, 215, 0.12);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.icon-badge {
  width: 72px;
  height: 72px;
  border-radius: 24px;
  background: linear-gradient(135deg, rgba(37, 183, 176, 0.15), rgba(15, 138, 215, 0.15));
  position: relative;
  overflow: hidden;
}

.icon-badge::after {
  content: '';
  position: absolute;
  inset: 18px;
  background-image: var(--icon-src, none);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.85;
  /* icon SVG は後日アップロードされ、ここで使用されます。 */
}

.service-section h2,
.plan-section h2 {
  margin-bottom: 1rem;
}

.service-card ul,
.plan-card ul {
  padding-left: 1.25rem;
  color: var(--color-muted);
}

.service-card {
  min-height: 240px;
}

.icon-circle {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(135deg, #25b7b0, #0f8ad7);
  margin-bottom: 1rem;
}

.icon-circle.warm {
  background: linear-gradient(135deg, #f6c343, #ff8f52);
}

.plan-section {
  background: linear-gradient(180deg, rgba(15, 138, 215, 0.05), rgba(246, 195, 67, 0.08));
  padding: 2rem;
  border-radius: 32px;
}

.plan-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.plan-card .btn {
  align-self: flex-start;
}
</style>
