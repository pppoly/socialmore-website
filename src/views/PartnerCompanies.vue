<template>
  <section class="section partner-directory-page">
    <div class="container partner-directory-shell">
      <header class="partner-directory-head">
        <RouterLink to="/partners" class="partner-directory-back">← 共創・連携パートナーへ戻る</RouterLink>
        <h1 class="section-title">連携先一覧</h1>
        <p class="section-description">
          SOCIALMOREが紹介する企業・サービスと、企業につなげていくコミュニティを分けて掲載します。
        </p>
        <div class="partner-directory-switch" aria-label="掲載カテゴリ">
          <a href="#company-connections">企業・サービス</a>
          <a href="#community-connections">コミュニティ</a>
        </div>
      </header>

      <section id="company-connections" class="partner-directory-section">
        <div class="partner-directory-section-head">
          <div>
            <h2>企業・サービス</h2>
          </div>
        </div>

        <div class="partner-directory-grid" aria-label="企業・サービスの連携先">
          <RouterLink
            v-for="partner in partnerCompanies"
            :key="partner.slug"
            class="partner-directory-card partner-directory-card--company"
            :to="partner.detailPath"
            :aria-label="`${partner.name}のパートナー詳細を見る`"
          >
            <span
              class="partner-directory-thumb"
              :style="partner.backgroundImage ? { '--partner-card-image': `url(${partner.backgroundImage})` } : null"
              aria-hidden="true"
            ></span>
            <span class="partner-directory-body">
              <span class="partner-directory-meta">
                <span v-for="tag in partner.tags?.length ? partner.tags : [partner.type]" :key="tag">
                  {{ tag }}
                </span>
              </span>
              <strong>{{ partner.name }}</strong>
              <small>{{ partner.tagline }}</small>
              <span class="partner-directory-copy">{{ partner.body }}</span>
              <span class="partner-directory-link">詳細を見る</span>
            </span>
          </RouterLink>
        </div>
      </section>

      <section id="community-connections" class="partner-directory-section">
        <div class="partner-directory-section-head">
          <div>
            <h2>コミュニティ</h2>
          </div>
        </div>

        <div v-if="partnerCommunities.length" class="partner-directory-grid" aria-label="コミュニティの連携先">
          <RouterLink
            v-for="community in partnerCommunities"
            :key="community.slug"
            class="partner-directory-card"
            :to="community.detailPath"
            :aria-label="`${community.name}の詳細を見る`"
          >
            <span
              class="partner-directory-thumb"
              :style="community.backgroundImage ? { '--partner-card-image': `url(${community.backgroundImage})` } : null"
              aria-hidden="true"
            ></span>
            <span class="partner-directory-body">
              <span class="partner-directory-meta">
                <span v-for="tag in community.tags?.length ? community.tags : [community.type]" :key="tag">
                  {{ tag }}
                </span>
              </span>
              <strong>{{ community.name }}</strong>
              <small>{{ community.tagline }}</small>
              <span class="partner-directory-copy">{{ community.body }}</span>
              <span class="partner-directory-link">詳細を見る</span>
            </span>
          </RouterLink>
        </div>

        <div v-else class="partner-directory-empty">
          <div>
            <p class="partner-directory-empty-label">準備中</p>
            <h3>紹介できるコミュニティを整えています</h3>
            <p>
              企業との接点づくりに関心のあるコミュニティや、コミュニティと連携したい企業・団体からの相談を受け付けています。
            </p>
          </div>
          <RouterLink class="partner-directory-empty-link" :to="{ path: '/contact', query: { type: 'partnership' } }">
            相談する
          </RouterLink>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { partnerCommunities, partnerCompanies } from '../data/partners';

onMounted(() => {
  document.title = '連携先一覧 | 共創・連携パートナー | SOCIALMORE';
});
</script>

<style scoped>
.partner-directory-page {
  padding-top: 3rem;
  background: linear-gradient(180deg, #ffffff, #f7f7f5 78%);
}

.partner-directory-page :is(h1, h2, h3, p, a, span, strong, small) {
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: normal;
}

.partner-directory-shell {
  display: grid;
  gap: 2.6rem;
  min-width: 0;
}

.partner-directory-head {
  display: grid;
  gap: 0.85rem;
  max-width: 760px;
}

.partner-directory-back {
  display: inline-flex;
  width: fit-content;
  color: var(--color-muted);
  font-size: 0.85rem;
  font-weight: 800;
}

.partner-directory-empty-label {
  margin: 0;
  color: var(--color-primary);
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0;
}

.partner-directory-head .section-title {
  margin-bottom: 0;
}

.partner-directory-head .section-description {
  max-width: 42rem;
  margin: 0;
}

.partner-directory-switch {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.25rem;
}

.partner-directory-switch a,
.partner-directory-empty-link {
  display: inline-flex;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 800;
}

.partner-directory-switch a {
  padding: 0 0.95rem;
  border: 1px solid rgba(26, 95, 168, 0.18);
  background: #fff;
  color: var(--color-dark);
}

.partner-directory-section {
  display: grid;
  gap: 1.2rem;
  min-width: 0;
}

.partner-directory-section-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  max-width: 1120px;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
}

.partner-directory-section-head > div {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
}

.partner-directory-section h2 {
  margin: 0;
  color: var(--color-dark);
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: 0;
}

.partner-directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 310px), 1fr));
  gap: 1.25rem;
  max-width: 1120px;
}

.partner-directory-card {
  display: flex;
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(17, 31, 46, 0.065);
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.partner-directory-card:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 95, 168, 0.22);
  box-shadow: 0 16px 34px rgba(17, 31, 46, 0.085);
}

.partner-directory-card--company {
  max-width: 760px;
}

.partner-directory-thumb {
  display: block;
  width: 190px;
  min-height: 190px;
  flex: 0 0 190px;
  background-color: #eef2f7;
  background-image:
    linear-gradient(135deg, rgba(17, 31, 46, 0.06), rgba(17, 31, 46, 0.14)),
    var(--partner-card-image);
  background-position: center top;
  background-size: cover;
}

.partner-directory-body {
  display: grid;
  flex: 1;
  gap: 0.55rem;
  min-width: 0;
  padding: 1.1rem 1.2rem;
}

.partner-directory-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.partner-directory-meta span {
  display: inline-flex;
  min-height: 24px;
  align-items: center;
  padding: 0 0.6rem;
  border: 1px solid rgba(26, 95, 168, 0.22);
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--color-primary);
  font-size: 0.7rem;
  font-weight: 900;
}

.partner-directory-body strong {
  color: var(--color-dark);
  font-size: 1.85rem;
  font-weight: 900;
  line-height: 1.08;
}

.partner-directory-body small {
  color: #27394a;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.5;
}

.partner-directory-copy {
  display: -webkit-box;
  overflow: hidden;
  color: var(--color-muted);
  font-size: 0.86rem;
  line-height: 1.75;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.partner-directory-link {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.15rem;
  color: var(--color-dark);
  font-size: 0.82rem;
  font-weight: 900;
}

.partner-directory-link::after,
.partner-directory-empty-link::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.partner-directory-empty {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  max-width: 1120px;
  padding: 1.5rem 1.6rem;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(26, 95, 168, 0.07), rgba(255, 255, 255, 0) 48%),
    rgba(255, 255, 255, 0.92);
  box-shadow: 0 14px 34px rgba(17, 31, 46, 0.055);
}

.partner-directory-empty > div {
  display: grid;
  gap: 0.45rem;
  min-width: 0;
}

.partner-directory-empty h3 {
  margin: 0;
  color: var(--color-dark);
  font-size: 1.3rem;
  line-height: 1.35;
}

.partner-directory-empty p:not(.partner-directory-empty-label) {
  max-width: 42rem;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  line-height: 1.8;
}

.partner-directory-empty-link {
  flex: 0 0 auto;
  gap: 0.55rem;
  min-height: 42px;
  padding: 0 1rem;
  background: var(--color-dark);
  color: #fff;
}

@media (max-width: 760px) {
  .partner-directory-card {
    flex-direction: column;
  }

  .partner-directory-card--company {
    max-width: none;
  }

  .partner-directory-thumb {
    width: 100%;
    min-height: 132px;
    flex-basis: auto;
  }

  .partner-directory-empty {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  .partner-directory-page {
    padding: 2rem 1rem 3.5rem;
  }

  .partner-directory-shell {
    width: min(100%, 358px);
    max-width: 358px;
    margin: 0;
    gap: 2.2rem;
  }

  .partner-directory-head,
  .partner-directory-section,
  .partner-directory-grid,
  .partner-directory-card,
  .partner-directory-empty {
    width: 100%;
    max-width: 100%;
  }

  .partner-directory-page .section-title {
    font-size: 2.25rem;
    line-height: 1.15;
  }

  .partner-directory-page .section-description,
  .partner-directory-copy,
  .partner-directory-empty p:not(.partner-directory-empty-label) {
    line-height: 1.85;
    overflow-wrap: anywhere;
    word-break: break-all;
    line-break: anywhere;
  }

  .partner-directory-section-head {
    align-items: flex-start;
  }

  .partner-directory-section h2 {
    font-size: 1.8rem;
  }

  .partner-directory-body {
    padding: 1rem;
  }

  .partner-directory-empty {
    padding: 1.25rem;
  }

  .partner-directory-empty-link {
    width: 100%;
  }
}
</style>
