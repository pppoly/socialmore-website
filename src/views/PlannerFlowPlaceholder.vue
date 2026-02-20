<template>
  <section class="section planner-placeholder">
    <div class="container">
      <p class="eyebrow">{{ copy.eyebrow }}</p>
      <h1 class="section-title">{{ copy.title }}</h1>
      <p class="section-description">{{ copy.body }}</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const flowCopy = {
  'planner-start': {
    eyebrow: 'Planner',
    title: 'はじめて企画する',
    body: 'このページは企画相談フローの実装プレースホルダーです。'
  },
  'planner-organize': {
    eyebrow: 'Planner',
    title: '案を整理する',
    body: 'このページは構想整理フローの実装プレースホルダーです。'
  },
  'planner-diagnose': {
    eyebrow: 'Planner',
    title: '草案を診断する',
    body: 'このページは草案診断フローの実装プレースホルダーです。'
  }
};

const copy = computed(
  () =>
    flowCopy[route.name] ?? {
      eyebrow: 'Planner',
      title: '企画フロー',
      body: 'このページはプレースホルダーです。'
    }
);
</script>

<style scoped>
.planner-placeholder .container {
  max-width: 760px;
}
</style>
