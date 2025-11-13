<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div>
        <h4>{{ footer.company }}</h4>
        <p>{{ footer.rights }}</p>
      </div>
      <div class="footer-links">
        <a href="#">{{ footer.privacy }}</a>
        <a href="#">{{ footer.terms }}</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from '../composables/useI18n';

const { dictionary } = useI18n();
const footer = computed(() => dictionary.value.footer);
</script>

<style scoped>
.app-footer {
  background: #0b1c2c;
  color: #eff4ff;
  padding: 2.5rem 1.5rem;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  color: #c8d7ff;
  font-weight: 500;
}
</style>
