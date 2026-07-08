<template>
  <main class="partner-detail">
    <div v-if="partner" class="container partner-container">
      <RouterLink to="/partners/companies" class="partner-back">← 連携先一覧へ戻る</RouterLink>

      <header class="partner-hero">
        <div class="partner-hero-main">
          <div class="partner-meta">
            <span v-for="tag in partnerTags" :key="tag">
              {{ tag }}
            </span>
          </div>
          <h1 class="partner-name">{{ partner.name }}</h1>
          <p class="partner-tagline">{{ partner.tagline }}</p>
          <p v-if="partner.disclosure?.short" class="partner-pr-note">
            <span class="partner-pr-badge">{{ partner.disclosure.badge || 'PR' }}</span>
            <span>{{ partner.disclosure.short }}</span>
          </p>
          <p class="partner-lead">{{ partner.body }}</p>
          <p v-if="partner.relationshipNote" class="partner-context">{{ partner.relationshipNote }}</p>
          <div class="partner-actions">
            <a
              v-if="partner.websiteUrl"
              class="partner-button partner-button--primary"
              :href="partner.websiteUrl"
              target="_blank"
              rel="noopener"
            >
              {{ partner.websiteCtaLabel || '公式サイトを見る' }}
            </a>
            <a
              v-if="partner.ctaUrl"
              class="partner-button partner-button--secondary"
              :href="partner.ctaUrl"
              target="_blank"
              rel="noopener"
            >
              {{ partner.ctaLabel || 'サービスを見る' }}
            </a>
          </div>
        </div>

        <a
          v-if="partner.websiteUrl && partner.backgroundImage"
          class="partner-site-card"
          :href="partner.websiteUrl"
          target="_blank"
          rel="noopener"
          :aria-label="`${partner.name}の公式サイトを見る`"
        >
          <span
            class="partner-site-image"
            :style="{ '--partner-site-image': `url(${partner.backgroundImage})` }"
            aria-hidden="true"
          ></span>
          <span class="partner-site-card-foot">
            <span>{{ partner.websiteCtaLabel || '公式サイトを見る' }}</span>
          </span>
        </a>
      </header>

      <section v-if="overviewItems.length" class="partner-section partner-overview">
        <h2>どんな取り組みか</h2>
        <div class="partner-text-stack">
          <p v-for="paragraph in overviewItems" :key="paragraph">{{ paragraph }}</p>
        </div>
      </section>

      <section v-if="appealPoints.length" class="partner-section partner-contact-section">
        <div class="partner-section-head">
          <h2>コミュニティとの接点</h2>
        </div>
        <div class="partner-point-list">
          <article v-for="point in appealPoints" :key="point.title" class="partner-point-card">
            <span class="partner-point-index">{{ point.index }}</span>
            <h3>
              <span v-for="line in point.titleLines" :key="line">{{ line }}</span>
            </h3>
            <p>
              <span v-for="line in point.bodyLines" :key="line">{{ line }}</span>
            </p>
          </article>
        </div>
      </section>

      <section v-if="eventInfo" id="event" class="partner-section partner-event-section">
        <div class="partner-section-head">
          <h2>{{ eventInfo.label }}</h2>
        </div>
        <div class="partner-event-block">
          <div class="partner-event-head">
            <div class="partner-event-title-group">
              <div class="partner-event-meta-row">
                <span
                  v-if="eventStatus"
                  class="partner-event-status"
                  :class="`partner-event-status--${eventStatus.tone}`"
                >
                  {{ eventStatus.label }}
                </span>
                <span v-if="eventStatus?.periodLabel" class="partner-event-period">
                  {{ eventStatus.periodLabel }}
                </span>
              </div>
              <h2>{{ eventInfo.title }}</h2>
            </div>
          </div>
          <div class="partner-event-copy">
            <p>
              <span v-for="line in eventInfo.bodyLines" :key="line">{{ line }}</span>
            </p>
          </div>
          <div
            v-if="eventInfo.summaryNote || eventInfo.modalNote || eventInfo.modalTitle"
            class="partner-event-action-row"
          >
            <p v-if="eventInfo.summaryNote || eventInfo.modalNote" class="partner-event-summary-note">
              {{ eventInfo.summaryNote || eventInfo.modalNote }}
            </p>
            <button
              v-if="eventInfo.modalTitle"
              type="button"
              class="partner-event-detail-button"
              @click="openEventModal"
            >
              {{ eventInfo.modalButtonLabel || 'イベント詳細を見る' }}
            </button>
          </div>
        </div>
      </section>

      <aside v-if="partner.disclosure" class="partner-disclosure" aria-label="掲載情報">
        <p class="partner-disclosure-label">{{ partner.disclosure.label }}</p>
        <p class="partner-disclosure-body">{{ partner.disclosure.body }}</p>
      </aside>
    </div>

    <div v-else class="container partner-container partner-not-found">
      <RouterLink to="/partners/companies" class="partner-back">← 連携先一覧へ戻る</RouterLink>
      <h1>パートナー情報が見つかりませんでした</h1>
      <p>URLをご確認ください。</p>
    </div>

    <Teleport to="body">
      <div
        v-if="isEventModalOpen && eventInfo"
        class="partner-event-modal-backdrop"
        role="presentation"
        @click.self="closeEventModal"
      >
        <section
          class="partner-event-modal"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="eventModalTitleId"
        >
          <header class="partner-event-modal-head">
            <div>
              <div class="partner-event-modal-meta">
                <p class="partner-event-modal-label">{{ eventInfo.label }}</p>
                <span
                  v-if="eventStatus"
                  class="partner-event-status"
                  :class="`partner-event-status--${eventStatus.tone}`"
                >
                  {{ eventStatus.label }}
                </span>
              </div>
              <h2 :id="eventModalTitleId">{{ eventInfo.modalTitle || eventInfo.title }}</h2>
            </div>
            <button
              type="button"
              class="partner-event-modal-close"
              aria-label="閉じる"
              @click="closeEventModal"
            >
              ×
            </button>
          </header>

          <div class="partner-event-modal-body">
            <figure v-if="eventInfo.posterImage" class="partner-event-poster">
              <img :src="eventInfo.posterImage" :alt="eventInfo.posterAlt || eventInfo.title" />
            </figure>

            <div class="partner-event-modal-content">
              <p v-if="eventInfo.modalLead" class="partner-event-modal-lead">{{ eventInfo.modalLead }}</p>

              <dl v-if="eventInfo.detailRows?.length" class="partner-event-detail-list">
                <div v-for="row in eventInfo.detailRows" :key="row.label">
                  <dt>{{ row.label }}</dt>
                  <dd>{{ row.value }}</dd>
                </div>
              </dl>

              <p v-if="eventInfo.modalNote" class="partner-event-modal-note">{{ eventInfo.modalNote }}</p>

              <div v-if="eventInfo.qrImage" class="partner-event-qr">
                <div class="partner-event-qr-copy">
                  <h3>{{ eventInfo.qrTitle || '申込ページ' }}</h3>
                  <p>
                    <span v-for="line in eventInfo.qrTextLines" :key="line">{{ line }}</span>
                  </p>
                </div>
                <img :src="eventInfo.qrImage" :alt="eventInfo.qrAlt || `${eventInfo.title}の申込ページQRコード`" />
              </div>

              <section
                v-for="section in eventModalSections"
                :key="section.title"
                class="partner-event-modal-section"
              >
                <h3>{{ section.title }}</h3>
                <p v-if="section.bodyLines.length">
                  <span v-for="line in section.bodyLines" :key="line">{{ line }}</span>
                </p>
                <ol v-if="section.items?.length">
                  <li v-for="item in section.items" :key="item">{{ item }}</li>
                </ol>
              </section>
            </div>
          </div>
        </section>
      </div>
    </Teleport>
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { findPartnerBySlug } from '../data/partners';
import { useSeo } from '../composables/useSeo';

const route = useRoute();
const partner = computed(() => findPartnerBySlug(route.params.slug));
const isEventModalOpen = ref(false);
const eventModalTitleId = 'partnerEventModalTitle';
const partnerTags = computed(() => (partner.value?.tags?.length ? partner.value.tags : [partner.value?.type].filter(Boolean)));
const overviewItems = computed(() => partner.value?.overview ?? []);
const toLines = (value, fallback) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value || fallback ? [value || fallback] : [];
};
const eventInfo = computed(() => {
  if (!partner.value?.eventInfo) return null;
  return {
    ...partner.value.eventInfo,
    bodyLines: toLines(partner.value.eventInfo.bodyLines, partner.value.eventInfo.body),
    qrTextLines: toLines(
      partner.value.eventInfo.qrTextLines,
      partner.value.eventInfo.qrText || '詳細・お申し込みは申込ページから確認できます。'
    )
  };
});
const eventModalSections = computed(() =>
  (eventInfo.value?.modalSections ?? []).map((section) => ({
    ...section,
    bodyLines: toLines(section.bodyLines, section.body)
  }))
);
const getJapanDateKey = () => {
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  return formatter.format(new Date());
};
const formatScheduleDate = (dateKey, showYear = true) => {
  if (!dateKey) return '';
  const [year, month, day] = dateKey.split('-').map(Number);
  return showYear ? `${year}.${month}.${day}` : `${month}.${day}`;
};
const formatScheduleRange = (label, start, end) => {
  if (!start && !end) return '';
  if (!end) return `${label} ${formatScheduleDate(start)}`;
  if (!start) return `${label} ${formatScheduleDate(end)}`;

  const [startYear] = start.split('-');
  const [endYear] = end.split('-');
  return `${label} ${formatScheduleDate(start)} - ${formatScheduleDate(end, startYear !== endYear)}`;
};
const eventStatus = computed(() => {
  const schedule = eventInfo.value?.schedule;
  if (!schedule) return null;

  const today = getJapanDateKey();
  const {
    applicationStart,
    applicationEnd,
    eventStart,
    eventEnd,
    applicationLabel = '募集期間',
    eventLabel = '実施期間'
  } = schedule;
  const applicationPeriod = formatScheduleRange(applicationLabel, applicationStart, applicationEnd);
  const eventPeriod = formatScheduleRange(eventLabel, eventStart, eventEnd);

  if (applicationStart && today < applicationStart) {
    return { label: '募集前', tone: 'upcoming', periodLabel: applicationPeriod };
  }

  if (
    applicationEnd &&
    today <= applicationEnd &&
    (!applicationStart || today >= applicationStart)
  ) {
    return { label: '募集中', tone: 'open', periodLabel: applicationPeriod };
  }

  if (eventStart && today < eventStart) {
    return { label: '募集終了', tone: 'closed', periodLabel: eventPeriod || applicationPeriod };
  }

  if (eventEnd && today <= eventEnd && (!eventStart || today >= eventStart)) {
    return { label: '実施中', tone: 'active', periodLabel: eventPeriod };
  }

  return { label: '終了', tone: 'closed', periodLabel: eventPeriod || applicationPeriod };
});
const appealPoints = computed(() =>
  (partner.value?.appealPoints ?? []).map((point, index) => ({
    ...point,
    index: point.index ?? String(index + 1).padStart(2, '0'),
    titleLines: toLines(point.titleLines, point.title),
    bodyLines: toLines(point.bodyLines, point.body)
  }))
);

useSeo(computed(() => {
  if (!partner.value) {
    return {
      title: 'パートナー情報が見つかりませんでした',
      description: '指定されたパートナー情報は見つかりませんでした。',
      path: `/partners/${route.params.slug}`,
      robots: 'noindex,follow'
    };
  }

  return {
    title: `${partner.value.name} - 共創・連携パートナー`,
    description: partner.value.relationshipNote || partner.value.body,
    path: partner.value.detailPath || `/partners/${route.params.slug}`,
    image: partner.value.backgroundImage || '/socialmore-assets/hero/partner-connection-hero.png',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: partner.value.name,
      url: partner.value.websiteUrl,
      description: partner.value.body
    }
  };
}));

const openEventModal = () => {
  isEventModalOpen.value = true;
};

const closeEventModal = () => {
  isEventModalOpen.value = false;
};

const handleEventModalKeydown = (event) => {
  if (event.key === 'Escape') closeEventModal();
};

let previousBodyOverflow = '';

watch(isEventModalOpen, (isOpen) => {
  if (typeof document === 'undefined') return;

  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEventModalKeydown);
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  window.removeEventListener('keydown', handleEventModalKeydown);
});

watch(
  partner,
  () => {
    closeEventModal();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = previousBodyOverflow;
    window.removeEventListener('keydown', handleEventModalKeydown);
  }
});
</script>

<style scoped>
.partner-detail {
  --partner-bg-soft: #f7f7f5;
  --partner-text: #102033;
  --partner-muted: #5f6f82;
  --partner-info: #1a5fa8;
  --partner-border: rgba(0, 0, 0, 0.09);

  padding: 34px 0 64px;
  background: linear-gradient(180deg, #ffffff, var(--partner-bg-soft) 78%);
  color: var(--partner-text);
}

.partner-detail :is(h1, h2, h3, p, a, span, strong, small) {
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: normal;
}

.partner-container {
  width: min(1120px, calc(100% - 40px));
  max-width: none;
  min-width: 0;
  margin: 0 auto;
}

.partner-back {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 28px;
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 800;
}

.partner-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 460px);
  gap: 34px;
  align-items: start;
  margin-bottom: 44px;
}

.partner-hero-main {
  display: grid;
  gap: 14px;
  min-width: 0;
  padding-top: 6px;
}

.partner-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.partner-meta span {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  padding: 0 9px;
  border: 1px solid rgba(26, 95, 168, 0.22);
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partner-info);
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
}

.partner-name {
  margin: 0;
  color: var(--partner-text);
  font-size: clamp(56px, 8vw, 92px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: 0;
}

.partner-tagline {
  max-width: 620px;
  margin: 0;
  color: #27394a;
  font-size: clamp(18px, 2vw, 24px);
  font-weight: 800;
  line-height: 1.45;
}

.partner-pr-note {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: #5f6f82;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
}

.partner-pr-badge {
  display: inline-flex;
  min-height: 22px;
  align-items: center;
  justify-content: center;
  padding: 0 9px;
  border: 1px solid rgba(82, 97, 113, 0.24);
  border-radius: 999px;
  color: #526171;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0;
}

.partner-lead {
  max-width: 720px;
  margin: 0;
  color: var(--partner-muted);
  font-size: 15px;
  line-height: 1.8;
}

.partner-context {
  max-width: 720px;
  margin: 0;
  padding-left: 16px;
  border-left: 3px solid rgba(26, 95, 168, 0.2);
  color: #27394a;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.75;
}

.partner-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
  min-width: 0;
}

.partner-button {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
}

.partner-button::after,
.partner-site-card-foot span::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.partner-button--primary {
  background: var(--partner-text);
  color: #fff;
  box-shadow: 0 12px 24px rgba(17, 31, 46, 0.14);
}

.partner-button--secondary {
  border: 1px solid rgba(26, 95, 168, 0.18);
  background: #fff;
  color: var(--partner-text);
}

.partner-site-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--partner-border);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 18px 42px rgba(17, 31, 46, 0.08);
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.partner-site-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 48px rgba(17, 31, 46, 0.1);
}

.partner-site-image {
  display: block;
  min-height: 300px;
  background-color: #eef2f7;
  background-image: var(--partner-site-image);
  background-position: center top;
  background-size: cover;
}

.partner-site-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 56px;
  padding: 0 16px;
  border-top: 1px solid var(--partner-border);
}

.partner-site-card-foot span {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--partner-text);
  font-size: 13px;
  font-weight: 900;
}

.partner-section {
  display: grid;
  gap: 18px;
  max-width: 1000px;
  min-width: 0;
  padding: 30px 0;
  border-top: 1px solid var(--partner-border);
}

.partner-section:last-of-type {
  border-bottom: 1px solid var(--partner-border);
}

.partner-section {
  margin: 0;
}

.partner-section h2 {
  margin: 0;
  color: var(--partner-text);
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.2;
  letter-spacing: 0;
}

.partner-text-stack {
  display: grid;
  gap: 12px;
  max-width: 760px;
}

.partner-text-stack p {
  margin: 0;
  color: #27394a;
  font-size: 15px;
  line-height: 1.85;
}

.partner-event-section {
  max-width: 1000px;
}

.partner-event-block {
  display: grid;
  gap: 16px;
  align-items: start;
  padding: 24px;
  border: 1px solid var(--partner-border);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 26px rgba(17, 31, 46, 0.04);
}

.partner-event-head {
  display: grid;
  gap: 18px;
  min-width: 0;
}

.partner-event-title-group {
  display: grid;
  gap: 10px;
  min-width: 0;
}

.partner-event-meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  min-width: 0;
}

.partner-event-status,
.partner-event-period {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
}

.partner-event-status {
  padding: 0 11px;
  border: 1px solid rgba(16, 32, 51, 0.1);
  background: #eef2f6;
  color: #526171;
}

.partner-event-status--open {
  border-color: rgba(16, 123, 85, 0.22);
  background: rgba(16, 123, 85, 0.1);
  color: #0f6b4c;
}

.partner-event-status--active {
  border-color: rgba(26, 95, 168, 0.22);
  background: rgba(26, 95, 168, 0.09);
  color: var(--partner-info);
}

.partner-event-status--upcoming {
  border-color: rgba(146, 101, 24, 0.22);
  background: rgba(146, 101, 24, 0.1);
  color: #7a4f15;
}

.partner-event-status--closed {
  border-color: rgba(82, 97, 113, 0.18);
  background: rgba(82, 97, 113, 0.08);
  color: #526171;
}

.partner-event-period {
  padding: 0 2px;
  color: #687789;
}

.partner-event-title-group h2 {
  margin: 0;
  color: var(--partner-text);
  font-size: clamp(22px, 2.3vw, 28px);
  font-weight: 900;
  line-height: 1.35;
}

.partner-event-copy {
  display: grid;
  gap: 10px;
  max-width: 720px;
  min-width: 0;
}

.partner-event-copy p {
  margin: 0;
  color: #27394a;
  font-size: 14px;
  line-height: 1.8;
}

.partner-event-copy p span {
  display: block;
}

.partner-event-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(16, 32, 51, 0.08);
}

.partner-event-summary-note {
  margin: 0;
  color: #526171;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.7;
}

.partner-event-detail-button {
  display: inline-flex;
  flex: 0 0 auto;
  width: fit-content;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
  padding: 0 15px;
  border: 1px solid rgba(26, 95, 168, 0.18);
  border-radius: 999px;
  background: #fff;
  color: var(--partner-text);
  cursor: pointer;
  font: inherit;
  font-size: 13px;
  font-weight: 900;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.partner-event-detail-button::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.partner-event-detail-button:hover {
  transform: translateY(-1px);
  border-color: rgba(26, 95, 168, 0.32);
  box-shadow: 0 10px 22px rgba(17, 31, 46, 0.08);
}

.partner-event-modal-backdrop {
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 28px;
  background: rgba(16, 32, 51, 0.58);
  backdrop-filter: blur(8px);
}

.partner-event-modal {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(1080px, 100%);
  max-height: calc(100vh - 56px);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.42);
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 30px 80px rgba(5, 16, 29, 0.28);
}

.partner-event-modal-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
  padding: 20px 22px;
  border-bottom: 1px solid var(--partner-border);
}

.partner-event-modal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin: 0 0 8px;
}

.partner-event-modal-label {
  display: inline-flex;
  width: fit-content;
  min-height: 24px;
  align-items: center;
  margin: 0;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partner-info);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.partner-event-modal-head h2 {
  margin: 0;
  color: var(--partner-text);
  font-size: clamp(24px, 3vw, 34px);
  line-height: 1.24;
  letter-spacing: 0;
}

.partner-event-modal-close {
  display: inline-flex;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(16, 32, 51, 0.12);
  border-radius: 999px;
  background: #fff;
  color: var(--partner-text);
  cursor: pointer;
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
}

.partner-event-modal-body {
  display: grid;
  grid-template-columns: minmax(300px, 42%) minmax(0, 1fr);
  min-height: 0;
  overflow: auto;
}

.partner-event-poster {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-width: 0;
  margin: 0;
  padding: 20px;
  border-right: 1px solid var(--partner-border);
  background: #f5f9ff;
}

.partner-event-poster img {
  width: 100%;
  max-height: calc(100vh - 184px);
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 16px 42px rgba(17, 31, 46, 0.14);
}

.partner-event-modal-content {
  display: grid;
  align-content: start;
  gap: 16px;
  min-width: 0;
  padding: 22px;
}

.partner-event-modal-lead {
  margin: 0;
  color: #27394a;
  font-size: 15px;
  line-height: 1.8;
}

.partner-event-detail-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin: 0;
}

.partner-event-detail-list div {
  min-width: 0;
  padding: 12px;
  border: 1px solid rgba(16, 32, 51, 0.09);
  border-radius: 12px;
  background: #f8fafc;
}

.partner-event-detail-list dt {
  margin: 0 0 5px;
  color: #687789;
  font-size: 12px;
  font-weight: 800;
}

.partner-event-detail-list dd {
  margin: 0;
  color: var(--partner-text);
  font-size: 15px;
  font-weight: 900;
  line-height: 1.45;
}

.partner-event-modal-note {
  margin: 0;
  padding: 11px 12px;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 12px;
  background: rgba(26, 95, 168, 0.06);
  color: #38516a;
  font-size: 13px;
  font-weight: 800;
  line-height: 1.65;
}

.partner-event-qr {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 108px;
  gap: 14px;
  align-items: center;
  min-width: 0;
  padding: 14px;
  border: 1px solid rgba(16, 32, 51, 0.09);
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 10px 24px rgba(17, 31, 46, 0.05);
}

.partner-event-qr-copy {
  display: grid;
  gap: 5px;
  min-width: 0;
}

.partner-event-qr h3 {
  margin: 0;
  color: var(--partner-text);
  font-size: 15px;
  font-weight: 900;
  line-height: 1.4;
}

.partner-event-qr p {
  margin: 0;
  color: var(--partner-muted);
  font-size: 13px;
  line-height: 1.65;
}

.partner-event-qr p span {
  display: block;
}

.partner-event-qr img {
  display: block;
  width: 108px;
  height: 108px;
  padding: 6px;
  border: 1px solid rgba(16, 32, 51, 0.1);
  border-radius: 10px;
  background: #fff;
  object-fit: contain;
}

.partner-event-modal-section {
  display: grid;
  gap: 8px;
  min-width: 0;
  padding: 14px 0 0;
  border-top: 1px solid rgba(16, 32, 51, 0.09);
}

.partner-event-modal-section h3 {
  margin: 0;
  color: var(--partner-text);
  font-size: 16px;
  font-weight: 900;
  line-height: 1.45;
}

.partner-event-modal-section p {
  margin: 0;
  color: var(--partner-muted);
  font-size: 13px;
  line-height: 1.75;
}

.partner-event-modal-section p span {
  display: block;
}

.partner-event-modal-section ol {
  display: grid;
  gap: 6px;
  margin: 0;
  padding-left: 1.25em;
  color: var(--partner-muted);
  font-size: 13px;
  line-height: 1.65;
}

.partner-point-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  max-width: 1000px;
}

.partner-point-card {
  display: flex;
  height: 100%;
  min-height: 188px;
  min-width: 0;
  flex-direction: column;
  gap: 16px;
  padding: 18px;
  border: 1px solid var(--partner-border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 26px rgba(17, 31, 46, 0.045);
}

.partner-point-index {
  display: inline-flex;
  width: fit-content;
  min-width: 42px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partner-info);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.partner-point-list h3 {
  display: flex;
  min-height: 2.8em;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0;
  color: var(--partner-text);
  font-size: 19px;
  font-weight: 800;
  line-height: 1.4;
}

.partner-point-list h3 span,
.partner-point-list p span {
  display: block;
}

.partner-point-list p {
  min-height: 5.1em;
  margin: 0;
  color: var(--partner-muted);
  font-size: 13px;
  line-height: 1.7;
  word-break: normal;
}

.partner-disclosure {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 18px;
  max-width: 1000px;
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px solid rgba(12, 31, 51, 0.12);
}

.partner-disclosure-label {
  margin: 0;
  color: #526171;
  font-size: 12px;
  font-weight: 900;
  line-height: 1.4;
}

.partner-disclosure-body {
  margin: 0;
  color: #687789;
  font-size: 13px;
  line-height: 1.75;
}

.partner-not-found {
  min-height: 58vh;
}

@media (max-width: 900px) {
  .partner-hero {
    grid-template-columns: 1fr;
  }

  .partner-site-image {
    min-height: 240px;
  }

  .partner-point-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .partner-event-modal-backdrop {
    align-items: stretch;
    padding: 12px;
  }

  .partner-event-modal {
    max-height: calc(100vh - 24px);
    border-radius: 16px;
  }

  .partner-event-modal-head {
    padding: 16px;
  }

  .partner-event-modal-head h2 {
    font-size: 22px;
  }

  .partner-event-modal-body {
    grid-template-columns: 1fr;
  }

  .partner-event-poster {
    padding: 14px;
    border-right: 0;
    border-bottom: 1px solid var(--partner-border);
  }

  .partner-event-poster img {
    max-height: 58vh;
  }

  .partner-event-modal-content {
    padding: 18px;
  }

  .partner-event-detail-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .partner-detail {
    padding: 28px 24px 48px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
  }

  .partner-container {
    width: 100%;
    max-width: 100%;
    margin: 0;
    overflow-x: hidden;
  }

  .partner-container * {
    min-width: 0;
  }

  .partner-hero,
  .partner-hero-main,
  .partner-actions,
  .partner-disclosure,
  .partner-site-card,
  .partner-section,
  .partner-event-block,
  .partner-text-stack,
  .partner-point-list,
  .partner-point-list article {
    width: 100%;
    max-width: 100%;
  }

  .partner-site-card {
    overflow: hidden;
  }

  .partner-hero {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
    margin-bottom: 34px;
  }

  .partner-lead,
  .partner-context,
  .partner-text-stack,
  .partner-point-list,
  .partner-point-list article,
  .partner-disclosure-body {
    width: 100%;
    max-width: 100%;
  }

  .partner-point-list {
    grid-template-columns: 1fr;
  }

  .partner-event-block {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 18px;
  }

  .partner-event-action-row {
    align-items: stretch;
    flex-direction: column;
  }

  .partner-event-detail-button {
    width: 100%;
  }

  .partner-event-title-group h2 {
    font-size: 21px;
  }

  .partner-name {
    font-size: 54px;
    line-height: 1;
  }

  .partner-tagline {
    font-size: 18px;
  }

  .partner-pr-note {
    align-items: flex-start;
    width: 100%;
    font-size: 12px;
  }

  .partner-lead,
  .partner-context,
  .partner-text-stack p,
  .partner-event-copy p,
  .partner-point-list p,
  .partner-disclosure-body {
    font-size: 14px;
    line-height: 1.85;
    overflow-wrap: anywhere;
    word-break: normal;
    line-break: strict;
  }

  .partner-tagline,
  .partner-disclosure-label,
  .partner-section h2,
  .partner-point-list h3 {
    overflow-wrap: anywhere;
    word-break: normal;
    line-break: strict;
  }

  .partner-point-list h3 {
    min-height: 0;
  }

  .partner-site-image {
    min-height: 180px;
  }

  .partner-disclosure {
    grid-template-columns: 1fr;
    gap: 8px;
    margin-top: 22px;
  }

  .partner-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .partner-button {
    width: 100%;
    padding-right: 14px;
    padding-left: 14px;
  }
}
</style>
