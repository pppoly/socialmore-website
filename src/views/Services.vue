<template>
  <div class="section">
    <div class="container services-page">
      <div class="section-heading">
        <p class="eyebrow">Platform</p>
        <h1 class="section-title">{{ t('services.title') }}</h1>
      </div>
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

const { t, dictionary } = useI18n();
const services = computed(() => dictionary.value.services);
</script>

<style scoped>
.services-page {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
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
