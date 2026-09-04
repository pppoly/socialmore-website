<template>
  <main class="partners-page">
    <div class="partners-shell">
      <header class="partners-hero">
        <h1 class="partners-page-title">
          <span>共創・連携</span><span>パートナー</span>
        </h1>
        <p class="partners-page-copy">
          <span class="partners-page-copy-line">コミュニティの活動が、必要な支えと出会いながら続いていくこと。</span>
          <span class="partners-page-copy-line">SOCIALMOREは、企業・団体との連携を、</span>
          <span class="partners-page-copy-line">人と地域の可能性をひらく関係として育てていきます。</span>
        </p>
      </header>

      <section class="partners-section partners-purpose">
        <div class="partners-section-head">
          <div class="partners-section-heading-stack">
            <h2 class="partners-section-title">連携で大切にしていること</h2>
            <p class="partners-section-note">
              企業の発信だけを目的にせず、<br />
              コミュニティに意味のある接点を考えます。
            </p>
          </div>
        </div>

        <div class="partners-line-list">
          <article v-for="(item, index) in purposeItems" :key="item.title" class="partners-line-row">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <h3>
                <span v-for="line in item.titleLines ?? [item.title]" :key="line">{{ line }}</span>
              </h3>
              <p>
                <span v-for="line in item.bodyLines ?? [item.body]" :key="line">{{ line }}</span>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="partners-section partners-formats">
        <div class="partners-section-head">
          <div class="partners-section-heading-stack">
            <h2 class="partners-section-title">連携のかたち</h2>
            <p class="partners-section-note">
              活動の背景に合わせて、<br />
              紹介・体験・共同企画などの形を選びます。
            </p>
          </div>
        </div>

        <div class="partners-line-list">
          <article v-for="mode in partnershipModes" :key="mode.title" class="partners-line-row">
            <span>{{ mode.index }}</span>
            <div>
              <h3>
                <span v-for="line in mode.titleLines ?? [mode.title]" :key="line">{{ line }}</span>
              </h3>
              <p>
                <span v-for="line in mode.bodyLines ?? [mode.body]" :key="line">{{ line }}</span>
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="partners-section partners-directory">
        <div class="partners-section-head">
          <div class="partners-section-heading-stack">
            <h2 class="partners-section-title">
              <RouterLink class="partners-section-title-link" to="/partners/companies">
                連携先一覧
              </RouterLink>
            </h2>
            <p class="partners-section-note">
              SOCIALMOREが紹介している企業・サービス・コミュニティを、<br />
              個別ページで確認できます。
            </p>
          </div>
        </div>

        <div class="partners-company-card-list">
          <RouterLink
            v-for="company in partnerCompanies"
            :key="company.slug"
            class="partners-company-card"
            :to="company.detailPath"
            :style="company.backgroundImage ? { '--partners-company-image': `url(${company.backgroundImage})` } : null"
            :aria-label="`${company.name}の紹介ページを見る`"
          >
            <span class="partners-company-visual" aria-hidden="true"></span>
            <span class="partners-company-main">
              <span class="partners-list-meta">
                <span v-if="company.disclosure?.badge" class="partners-list-disclosure">
                  {{ company.disclosure.badge }}
                </span>
                <span v-for="tag in company.tags?.length ? company.tags : [company.type]" :key="tag">
                  {{ tag }}
                </span>
              </span>
              <strong>{{ company.name }}</strong>
              <small>{{ company.tagline }}</small>
            </span>
            <span class="partners-company-summary">{{ company.body }}</span>
            <span class="partners-company-foot">
              <span>つながりを見る</span>
            </span>
          </RouterLink>
        </div>
      </section>

      <section class="partners-contact">
        <div class="partners-contact-copy">
          <span class="partners-contact-label">企業・団体・コミュニティの方へ</span>
          <h2>連携について相談する</h2>
          <p>
            企業・団体からの連携相談も、<br />
            コミュニティ側からの相談も受け付けています。<br />
            無理のない関わり方を一緒に考えます。
          </p>
          <span class="partners-contact-audience" aria-label="相談できる方">
            <span>企業・団体</span>
            <span>コミュニティ</span>
          </span>
        </div>
        <RouterLink class="partners-contact-link" :to="{ path: '/contact', query: { type: 'partnership' } }">
          <span>相談する</span>
        </RouterLink>
      </section>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { partnerCompanies } from '../data/partners';

const purposeItems = [
  {
    label: '続く',
    title: '場が続く力を増やす',
    body: '一度きりで終わらない、活動の土台をつくります。'
  },
  {
    label: 'ひらく',
    title: '必要な人に届く入口をつくる',
    titleLines: ['必要な人に届く', '入口をつくる'],
    body: 'コミュニティの中にある声を、外の力とつなげます。'
  },
  {
    label: '育つ',
    title: '地域に還る関係を育てる',
    body: '人と地域のあいだに循環をつくります。'
  }
];

const partnershipModes = [
  {
    index: '01',
    title: '活動を支える紹介',
    body: '必要な文脈の中で、役立つサービスを紹介します。',
    bodyLines: ['必要な文脈の中で、', '役立つサービスを紹介します。']
  },
  {
    index: '02',
    title: '体験から生まれる接点',
    body: '自然に知り、試せる機会をつくります。',
    bodyLines: ['自然に知り、', '試せる機会をつくります。']
  },
  {
    index: '03',
    title: '一緒につくる企画',
    body: '同じ目的に向かって、企画を一緒に育てます。',
    bodyLines: ['同じ目的に向かって、', '企画を一緒に育てます。']
  },
  {
    index: '04',
    title: '地域につながる取り組み',
    titleLines: ['地域につながる', '取り組み'],
    body: '暮らしに近い取り組みを、地域の連携へ広げます。',
    bodyLines: ['暮らしに近い取り組みを、', '地域の連携へ広げます。']
  }
];

onMounted(() => {
  document.title = '共創・連携パートナー | SOCIALMORE';
});
</script>

<style scoped>
.partners-page {
  --partners-bg: #ffffff;
  --partners-bg-soft: #f5f5f3;
  --partners-bg-blue: #f1f7fc;
  --partners-bg-green: #f4fbf7;
  --partners-text: #1a1a1a;
  --partners-muted: #6b6b6b;
  --partners-hint: #a0a0a0;
  --partners-border: rgba(0, 0, 0, 0.09);
  --partners-info: #1a5fa8;
  --partners-green: #098348;
  --partners-shadow: 0 18px 40px rgba(0, 0, 0, 0.04);

  position: relative;
  overflow: hidden;
  padding: 34px 0 64px;
  background:
    linear-gradient(180deg, #ffffff 0%, #f7fbff 42%, #f7f7f5 100%),
    #ffffff;
  color: var(--partners-text);
}

.partners-page::before {
  content: '';
  position: absolute;
  inset: 72px 0 auto;
  height: 360px;
  background:
    linear-gradient(90deg, rgba(26, 95, 168, 0.05), rgba(9, 131, 72, 0.05)),
    repeating-linear-gradient(
      90deg,
      rgba(26, 95, 168, 0.05) 0,
      rgba(26, 95, 168, 0.05) 1px,
      transparent 1px,
      transparent 72px
    );
  opacity: 0.8;
  pointer-events: none;
}

.partners-page :is(h1, h2, h3, p, a, span, strong) {
  max-width: 100%;
  overflow-wrap: break-word;
  word-break: normal;
}

.partners-shell {
  position: relative;
  z-index: 1;
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;
  min-width: 0;
}

.partners-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 32px;
  align-items: center;
  max-width: 1120px;
  min-height: 314px;
  margin-bottom: 38px;
  padding: 46px 52px;
  overflow: hidden;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 24px;
  background:
    linear-gradient(110deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 46%, rgba(241, 247, 252, 0.78) 100%),
    var(--partners-bg-blue);
  box-shadow: 0 20px 48px rgba(17, 31, 46, 0.055);
  min-width: 0;
}

.partners-hero::before {
  content: '';
  position: absolute;
  top: 36px;
  right: 44px;
  bottom: 36px;
  width: min(30vw, 330px);
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 255, 255, 0.42)),
    repeating-linear-gradient(
      180deg,
      rgba(26, 95, 168, 0.12) 0,
      rgba(26, 95, 168, 0.12) 1px,
      transparent 1px,
      transparent 58px
    );
  opacity: 0.72;
}

.partners-hero::after {
  content: '';
  position: absolute;
  right: 92px;
  bottom: 70px;
  width: 178px;
  height: 118px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(26, 95, 168, 0.14), rgba(9, 131, 72, 0.12)),
    linear-gradient(180deg, rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.25));
  box-shadow:
    28px -48px 0 -18px rgba(26, 95, 168, 0.16),
    -42px -28px 0 -20px rgba(9, 131, 72, 0.14);
  opacity: 0.8;
}

.partners-page-title {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--partners-text);
  font-size: clamp(38px, 4.3vw, 56px);
  line-height: 1.08;
  letter-spacing: 0;
}

.partners-page-title span {
  display: inline;
}

.partners-page-copy {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 34em;
  margin: 0;
  color: var(--partners-muted);
  font-size: 15px;
  line-height: 1.85;
}

.partners-section {
  display: grid;
  gap: 22px;
  max-width: 1120px;
  margin-bottom: 24px;
  min-width: 0;
}

.partners-purpose,
.partners-formats,
.partners-directory {
  position: relative;
  grid-template-columns: 270px minmax(0, 1fr);
  align-items: start;
  padding: 28px;
  border: 1px solid rgba(0, 0, 0, 0.075);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 18px 40px rgba(17, 31, 46, 0.045);
}

.partners-purpose {
  background:
    linear-gradient(135deg, rgba(241, 247, 252, 0.92), rgba(255, 255, 255, 0.8) 50%),
    #ffffff;
}

.partners-formats {
  background:
    linear-gradient(135deg, rgba(244, 251, 247, 0.94), rgba(255, 255, 255, 0.82) 54%),
    #ffffff;
}

.partners-directory {
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(241, 247, 252, 0.78)),
    #ffffff;
}

.partners-section-head {
  display: block;
  width: 100%;
  min-width: 0;
}

.partners-section-heading-stack {
  display: grid;
  flex: 1 1 0;
  gap: 12px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
}

.partners-section-title {
  margin: 0;
  color: var(--partners-text);
  font-size: 28px;
  line-height: 1.2;
  letter-spacing: 0;
}

.partners-section-title-link,
.partners-contact-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: inherit;
}

.partners-section-title-link::after,
.partners-contact-link::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid var(--partners-hint);
  border-right: 1.5px solid var(--partners-hint);
  transform: rotate(45deg);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.partners-section-title-link:hover::after,
.partners-contact-link:hover::after {
  border-color: var(--partners-text);
  transform: translateX(2px) rotate(45deg);
}

.partners-list-title {
  margin: 0;
  color: var(--partners-text);
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.partners-section-note {
  width: 100%;
  max-width: 34em;
  margin: 0;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.8;
}

.partners-list {
  display: grid;
  gap: 12px;
  max-width: 760px;
}

.partners-list-row {
  display: grid;
  grid-template-columns: 168px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid var(--partners-border);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--partners-shadow);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.partners-list-row:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 95, 168, 0.14);
  box-shadow: 0 22px 46px rgba(11, 28, 46, 0.08);
}

.partners-list-thumb {
  display: block;
  min-height: 132px;
  background:
    linear-gradient(180deg, rgba(17, 31, 46, 0.08), rgba(17, 31, 46, 0.24)),
    var(--partners-list-image),
    var(--partners-bg-soft);
  background-position: center top;
  background-size: cover;
}

.partners-list-body {
  display: grid;
  gap: 7px;
  min-width: 0;
  padding: 18px 20px;
}

.partners-list-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.partners-list-meta span {
  display: inline-flex;
  min-height: 22px;
  align-items: center;
  padding: 0 8px;
  border: 1px solid rgba(26, 95, 168, 0.22);
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partners-info);
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
}

.partners-list-meta .partners-list-disclosure {
  border-color: rgba(0, 0, 0, 0.08);
  background: #f4f4f2;
  color: var(--partners-muted);
}

.partners-company-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
}

.partners-company-card {
  position: relative;
  display: grid;
  flex: 1 1 520px;
  grid-template-columns: 236px minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  width: min(100%, 760px);
  min-height: 238px;
  overflow: hidden;
  border: 1px solid var(--partners-border);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(17, 31, 46, 0.08);
  color: inherit;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;
}

.partners-company-card:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 95, 168, 0.22);
  box-shadow: 0 14px 30px rgba(17, 31, 46, 0.08);
}

.partners-company-visual {
  grid-row: 1 / 4;
  display: block;
  min-height: 100%;
  border-right: 1px solid var(--partners-border);
  border-bottom: 0;
  background-color: var(--partners-bg-soft);
  background-image: var(--partners-company-image);
  background-position: center;
  background-size: cover;
}

.partners-company-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--partners-border);
}

.partners-company-main strong {
  display: block;
  margin-top: 2px;
  color: var(--partners-text);
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
}

.partners-company-main small {
  color: #27394a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.55;
}

.partners-company-summary {
  display: -webkit-box;
  flex: 1;
  margin: 0;
  padding: 12px 16px 0;
  overflow: hidden;
  color: #2f3f4f;
  font-size: 13px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.partners-company-foot {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
  padding: 12px 16px 16px;
}

.partners-company-foot > span {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  gap: 9px;
  padding: 0 11px;
  border: 1px solid rgba(26, 95, 168, 0.18);
  border-radius: 999px;
  background: #fff;
  color: var(--partners-text);
  font-size: 12px;
  font-weight: 700;
}

.partners-company-foot > span::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.partners-list-name {
  color: var(--partners-text);
  font-size: 18px;
  font-weight: 800;
  line-height: 1.35;
}

.partners-list-subtitle {
  color: var(--partners-text);
  font-size: 12px;
  font-weight: 700;
  line-height: 1.7;
}

.partners-list-summary {
  display: -webkit-box;
  overflow: hidden;
  color: var(--partners-muted);
  font-size: 13px;
  line-height: 1.7;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.partners-line-list {
  display: grid;
  gap: 16px;
  max-width: 100%;
}

.partners-purpose .partners-line-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.partners-formats .partners-line-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.partners-line-row {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  min-height: 170px;
  padding: 18px;
  border: 1px solid var(--partners-border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 28px rgba(17, 31, 46, 0.045);
  overflow: hidden;
}

.partners-line-row::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 4px;
  background: linear-gradient(90deg, rgba(26, 95, 168, 0.72), rgba(9, 131, 72, 0.42));
}

.partners-line-row > div {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  min-width: 0;
}

.partners-line-row > span {
  display: inline-flex;
  width: fit-content;
  min-width: 42px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partners-info);
  font-size: 12px;
  font-weight: 800;
}

.partners-line-row h3 {
  display: flex;
  min-height: 2.8em;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 8px;
  color: var(--partners-text);
  font-size: 19px;
  font-weight: 800;
  line-height: 1.4;
}

.partners-line-row h3 span,
.partners-line-row p span {
  display: block;
}

.partners-line-row p,
.partners-contact p {
  margin: 0;
  color: var(--partners-muted);
  font-size: 13px;
  line-height: 1.7;
}

.partners-line-row p {
  min-height: 3.4em;
}

.partners-purpose .partners-line-row p {
  min-height: 1.7em;
}

.partners-formats .partners-line-row {
  min-height: 188px;
}

.partners-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1120px;
  margin-top: 42px;
  padding: 28px 32px;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(26, 95, 168, 0.08), rgba(255, 255, 255, 0) 46%),
    rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(17, 31, 46, 0.075);
}

.partners-contact-copy {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.partners-contact-label {
  display: inline-flex;
  width: fit-content;
  min-height: 24px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partners-info);
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.partners-contact-audience {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.partners-contact-audience span {
  display: inline-flex;
  min-height: 28px;
  align-items: center;
  padding: 0 11px;
  border: 1px solid rgba(26, 95, 168, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  color: #27394a;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
}

.partners-contact h2 {
  margin: 0;
  color: var(--partners-text);
  font-size: clamp(30px, 3vw, 40px);
  line-height: 1.2;
  letter-spacing: 0;
}

.partners-contact-link {
  flex: 0 0 auto;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--partners-text);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(17, 31, 46, 0.14);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.partners-contact-link::after {
  border-color: currentColor;
}

.partners-contact-link:hover {
  transform: translateY(-1px);
  background: #0f2740;
  box-shadow: 0 14px 28px rgba(17, 31, 46, 0.16);
}

@media (max-width: 1080px) {
  .partners-purpose,
  .partners-formats,
  .partners-directory {
    grid-template-columns: 1fr;
  }

  .partners-section-note {
    max-width: 42em;
  }

  .partners-purpose .partners-line-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .partners-hero {
    grid-template-columns: 1fr;
    min-height: 0;
    padding: 34px 28px;
  }

  .partners-hero::before,
  .partners-hero::after {
    opacity: 0.28;
  }

  .partners-purpose,
  .partners-formats,
  .partners-directory {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .partners-purpose .partners-line-list,
  .partners-formats .partners-line-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .partners-list-row {
    grid-template-columns: 1fr;
  }

  .partners-list-thumb {
    min-height: 150px;
  }

  .partners-company-card {
    grid-template-columns: 1fr;
  }

  .partners-company-visual {
    grid-row: auto;
    min-height: 150px;
    border-right: 0;
    border-bottom: 1px solid var(--partners-border);
  }

  .partners-contact {
    align-items: flex-start;
    flex-direction: column;
    padding: 24px;
  }

  .partners-contact-link {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .partners-page {
    padding: 28px 0 48px;
    width: 100vw;
    max-width: 100vw;
    overflow-x: hidden;
  }

  .partners-shell {
    width: calc(100vw - 48px);
    max-width: none;
    margin-right: 0;
    margin-left: 24px;
  }

  .partners-hero,
  .partners-purpose,
  .partners-formats,
  .partners-directory,
  .partners-contact {
    border-radius: 18px;
  }

  .partners-page-title {
    font-size: 40px;
    line-height: 1.12;
  }

  .partners-page-title span {
    display: block;
  }

  .partners-page :is(h1, h2, h3, p, a, span, strong, small) {
    overflow-wrap: anywhere;
    word-break: break-all;
    line-break: anywhere;
  }

  .partners-page-copy,
  .partners-section-note,
  .partners-line-row p,
  .partners-contact p {
    display: block;
    width: 100%;
    max-width: 100% !important;
    font-size: 14px;
    line-height: 1.85;
    overflow-wrap: anywhere !important;
    word-break: break-all !important;
    line-break: anywhere !important;
    white-space: normal;
  }

  .partners-section-title,
  .partners-contact h2 {
    font-size: 26px;
  }

  .partners-list-thumb {
    min-height: 138px;
  }

  .partners-list-body {
    padding: 18px;
  }

  .partners-purpose .partners-line-list,
  .partners-formats .partners-line-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .partners-line-row {
    min-height: 0;
    gap: 10px;
    padding: 18px;
  }

  .partners-purpose .partners-line-row,
  .partners-formats .partners-line-row {
    min-height: 0;
  }

  .partners-line-row h3,
  .partners-line-row p,
  .partners-purpose .partners-line-row p {
    min-height: 0;
  }

  .partners-line-row > span {
    width: fit-content;
    padding: 0 12px;
  }

  .partners-company-card-list {
    width: 100%;
    max-width: 100%;
  }

  .partners-company-card {
    width: 100%;
    min-height: 0;
  }

  .partners-company-main {
    width: 100%;
  }
}

/* Refined independent-page layout */
.partners-page {
  --partners-bg: #fbfcfd;
  --partners-bg-soft: #f5f7f8;
  --partners-text: #171a1d;
  --partners-muted: #58616a;
  --partners-hint: #9aa5ae;
  --partners-border: rgba(23, 26, 29, 0.12);
  --partners-border-soft: rgba(23, 26, 29, 0.07);
  --partners-info: #17679e;
  --partners-green: #2a8b68;
  --partners-shadow: none;

  overflow: hidden;
  padding: 36px 0 68px;
  background:
    linear-gradient(180deg, #ffffff 0%, #fbfcfd 38%, #f5f7f8 100%),
    var(--partners-bg);
}

.partners-page::before {
  inset: 94px 0 auto;
  height: 520px;
  background:
    linear-gradient(90deg, rgba(23, 103, 158, 0.04), rgba(42, 139, 104, 0.035)),
    linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.72) 74%);
  opacity: 1;
}

.partners-shell {
  width: min(1120px, calc(100% - 40px));
}

.partners-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: clamp(32px, 6vw, 92px);
  align-items: end;
  min-height: 0;
  margin-bottom: 0;
  padding: 58px 0 54px;
  border: 0;
  border-bottom: 1px solid var(--partners-border);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-hero::before,
.partners-hero::after {
  display: none;
}

.partners-page-title {
  font-size: clamp(52px, 6.2vw, 82px);
  line-height: 1.02;
  letter-spacing: 0;
}

.partners-page-title span {
  display: block;
}

.partners-page-copy {
  max-width: 31em;
  padding-left: 22px;
  border-left: 3px solid rgba(23, 103, 158, 0.28);
  color: #414b54;
  font-size: 15px;
  line-height: 1.95;
}

.partners-section {
  grid-template-columns: minmax(190px, 248px) minmax(0, 1fr);
  gap: clamp(34px, 5vw, 72px);
  align-items: start;
  max-width: 1120px;
  margin-bottom: 0;
  padding: 48px 0;
  border-bottom: 1px solid var(--partners-border-soft);
}

.partners-purpose,
.partners-formats,
.partners-directory {
  padding: 48px 0;
  border: 0;
  border-bottom: 1px solid var(--partners-border-soft);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-section-head {
  position: relative;
  padding-top: 4px;
}

.partners-section-head::before {
  content: '';
  display: block;
  width: 42px;
  height: 2px;
  margin-bottom: 18px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--partners-info), var(--partners-green));
  opacity: 0.72;
}

.partners-section-heading-stack {
  gap: 14px;
}

.partners-section-title {
  font-size: clamp(25px, 2.4vw, 32px);
  line-height: 1.22;
}

.partners-section-note {
  max-width: 18em;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.9;
}

.partners-section-title-link {
  align-items: baseline;
}

.partners-line-list {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--partners-border);
}

.partners-purpose .partners-line-list,
.partners-formats .partners-line-list {
  grid-template-columns: 1fr;
}

.partners-line-row {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 28px;
  min-height: 0;
  padding: 24px 0;
  border: 0;
  border-bottom: 1px solid var(--partners-border-soft);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-line-row::before {
  display: none;
}

.partners-line-row > span {
  min-width: 0;
  min-height: 0;
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: var(--partners-info);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0;
}

.partners-line-row h3 {
  min-height: 0;
  margin: 0 0 8px;
  color: var(--partners-text);
  font-size: clamp(20px, 2vw, 26px);
  line-height: 1.35;
}

.partners-line-row p,
.partners-purpose .partners-line-row p,
.partners-formats .partners-line-row p {
  min-height: 0;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.85;
}

.partners-company-card-list {
  display: grid;
  gap: 0;
  max-width: 100%;
  border-top: 1px solid var(--partners-border);
}

.partners-company-card {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  grid-template-rows: auto 1fr auto;
  width: 100%;
  min-height: 246px;
  border: 0;
  border-bottom: 1px solid var(--partners-border-soft);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-company-card:hover {
  transform: none;
  border-color: var(--partners-border-soft);
  box-shadow: none;
}

.partners-company-visual {
  grid-row: 1 / 4;
  min-height: 246px;
  margin: 22px 28px 22px 0;
  border: 0;
  border-radius: 8px;
  background-position: center;
  background-size: cover;
}

.partners-company-main {
  gap: 10px;
  padding: 24px 0 14px;
  border-bottom: 0;
}

.partners-company-main strong {
  margin: 0;
  font-size: clamp(30px, 3vw, 42px);
  line-height: 1;
}

.partners-company-main small {
  max-width: 32em;
  color: #29333c;
  font-size: 14px;
  line-height: 1.75;
}

.partners-company-summary {
  padding: 0;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.85;
  -webkit-line-clamp: 3;
}

.partners-company-foot {
  padding: 18px 0 24px;
}

.partners-company-foot > span {
  min-height: 38px;
  padding: 0 14px;
  border-color: rgba(23, 26, 29, 0.16);
  background: #ffffff;
  color: var(--partners-text);
}

.partners-contact {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 28px;
  align-items: end;
  max-width: 1120px;
  margin-top: 54px;
  padding: 36px 0 0;
  border: 0;
  border-top: 1px solid var(--partners-border);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-contact-copy {
  gap: 12px;
}

.partners-contact-label {
  min-height: 0;
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: var(--partners-info);
  font-size: 12px;
  letter-spacing: 0.06em;
}

.partners-contact h2 {
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1.12;
}

.partners-contact p {
  max-width: 37em;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.9;
}

.partners-contact-audience span {
  min-height: 30px;
  border-color: rgba(23, 103, 158, 0.16);
  background: #ffffff;
}

.partners-contact-link {
  min-height: 46px;
  border-radius: 999px;
  background: var(--partners-text);
  box-shadow: none;
}

.partners-contact-link:hover {
  transform: translateY(-1px);
  box-shadow: none;
}

@media (max-width: 980px) {
  .partners-hero {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 48px 0 42px;
  }

  .partners-page-copy {
    max-width: 38em;
  }

  .partners-section,
  .partners-purpose,
  .partners-formats,
  .partners-directory {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 38px 0;
  }

  .partners-section-note {
    max-width: 42em;
  }

  .partners-company-card {
    grid-template-columns: 220px minmax(0, 1fr);
  }

  .partners-company-visual {
    min-height: 210px;
  }
}

@media (max-width: 680px) {
  .partners-page {
    width: 100vw;
    max-width: 100vw;
    padding: 24px 0 52px;
  }

  .partners-shell {
    width: calc(100vw - 40px);
    margin-left: 20px;
  }

  .partners-page-title {
    font-size: 42px;
  }

  .partners-page-copy {
    padding-left: 16px;
    font-size: 14px;
  }

  .partners-page :is(h1, h2, h3, p, a, span, strong, small) {
    overflow-wrap: anywhere;
    word-break: normal;
    line-break: strict;
  }

  .partners-line-row {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 20px 0;
  }

  .partners-line-row h3 {
    font-size: 22px;
  }

  .partners-company-card {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .partners-company-visual {
    grid-row: auto;
    min-height: 160px;
    margin: 20px 0 0;
  }

  .partners-company-main {
    padding-top: 18px;
  }

  .partners-company-main strong {
    font-size: 32px;
  }

  .partners-contact {
    grid-template-columns: 1fr;
    align-items: start;
  }

  .partners-contact-link {
    width: fit-content;
  }
}

/* Restore the previous simple layout */
.partners-page {
  --partners-bg: #ffffff;
  --partners-bg-soft: #f5f5f3;
  --partners-text: #1a1a1a;
  --partners-muted: #6b6b6b;
  --partners-hint: #a0a0a0;
  --partners-border: rgba(0, 0, 0, 0.09);
  --partners-info: #1a5fa8;
  --partners-shadow: 0 18px 40px rgba(0, 0, 0, 0.04);

  padding: 34px 0 64px;
  background: linear-gradient(180deg, #ffffff, #f7f7f5 78%);
  color: var(--partners-text);
}

.partners-page::before,
.partners-hero::before,
.partners-hero::after,
.partners-section-head::before,
.partners-line-row::before {
  display: none;
}

.partners-shell {
  width: min(1240px, calc(100% - 40px));
  margin: 0 auto;
}

.partners-hero {
  display: grid;
  grid-template-columns: none;
  gap: 18px;
  align-items: initial;
  max-width: 720px;
  min-height: 0;
  margin-bottom: 28px;
  padding: 0;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-page-title {
  margin: 0;
  color: var(--partners-text);
  font-size: clamp(38px, 4.3vw, 56px);
  line-height: 1.08;
}

.partners-page-title span {
  display: inline;
}

.partners-page-copy {
  width: 100%;
  max-width: 34em;
  margin: 0;
  padding-left: 0;
  border-left: 0;
  color: var(--partners-muted);
  font-size: 15px;
  line-height: 1.85;
}

.partners-section {
  display: grid;
  grid-template-columns: none;
  gap: 18px;
  max-width: 1120px;
  margin-bottom: 34px;
  padding: 0;
  border: 0;
  background: transparent;
}

.partners-purpose,
.partners-formats,
.partners-directory {
  grid-template-columns: none;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
}

.partners-section-heading-stack {
  display: grid;
  flex: 1 1 0;
  gap: 6px;
  width: 100%;
}

.partners-section-title {
  margin: 0;
  color: var(--partners-text);
  font-size: 28px;
  line-height: 1.2;
}

.partners-section-note {
  width: 100%;
  max-width: 34em;
  margin: 0;
  color: var(--partners-muted);
  font-size: 14px;
  line-height: 1.8;
}

.partners-line-list {
  display: grid;
  gap: 16px;
  max-width: 100%;
  border-top: 0;
}

.partners-purpose .partners-line-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.partners-formats .partners-line-list {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.partners-line-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  min-height: 170px;
  padding: 18px;
  border: 1px solid var(--partners-border);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 28px rgba(17, 31, 46, 0.045);
}

.partners-line-row > span {
  display: inline-flex;
  width: fit-content;
  min-width: 42px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partners-info);
  font-size: 12px;
  font-weight: 800;
}

.partners-line-row h3 {
  display: flex;
  min-height: 2.8em;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 8px;
  color: var(--partners-text);
  font-size: 19px;
  font-weight: 800;
  line-height: 1.4;
}

.partners-line-row p,
.partners-contact p {
  margin: 0;
  color: var(--partners-muted);
  font-size: 13px;
  line-height: 1.7;
}

.partners-line-row p {
  min-height: 3.4em;
}

.partners-purpose .partners-line-row p {
  min-height: 1.7em;
}

.partners-formats .partners-line-row {
  min-height: 188px;
}

.partners-company-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 760px;
  border-top: 0;
}

.partners-company-card {
  position: relative;
  display: flex;
  flex: 0 1 310px;
  flex-direction: column;
  width: min(100%, 310px);
  min-height: 250px;
  overflow: hidden;
  border: 1px solid var(--partners-border);
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 12px 28px rgba(17, 31, 46, 0.08);
  color: inherit;
}

.partners-company-card:hover {
  transform: translateY(-2px);
  border-color: rgba(26, 95, 168, 0.22);
  box-shadow: 0 14px 30px rgba(17, 31, 46, 0.08);
}

.partners-company-visual {
  display: block;
  height: 92px;
  min-height: 0;
  margin: 0;
  border-right: 0;
  border-bottom: 1px solid var(--partners-border);
  border-radius: 0;
  background-color: var(--partners-bg-soft);
  background-image: var(--partners-company-image);
  background-position: center top;
  background-size: cover;
}

.partners-company-main {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--partners-border);
}

.partners-company-main strong {
  display: block;
  margin-top: 2px;
  color: var(--partners-text);
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
}

.partners-company-main small {
  color: #27394a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.55;
}

.partners-company-summary {
  display: -webkit-box;
  flex: 1;
  margin: 0;
  padding: 12px 16px 0;
  overflow: hidden;
  color: #2f3f4f;
  font-size: 13px;
  line-height: 1.8;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.partners-company-foot {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
  padding: 12px 16px 16px;
}

.partners-company-foot > span {
  display: inline-flex;
  min-height: 30px;
  align-items: center;
  gap: 9px;
  padding: 0 11px;
  border: 1px solid rgba(26, 95, 168, 0.18);
  border-radius: 999px;
  background: #fff;
  color: var(--partners-text);
  font-size: 12px;
  font-weight: 700;
}

.partners-contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  max-width: 1120px;
  margin-top: 42px;
  padding: 28px 32px;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 22px;
  background:
    linear-gradient(135deg, rgba(26, 95, 168, 0.08), rgba(255, 255, 255, 0) 46%),
    rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(17, 31, 46, 0.075);
}

.partners-contact-label {
  display: inline-flex;
  width: fit-content;
  min-height: 24px;
  align-items: center;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.08);
  color: var(--partners-info);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
}

.partners-contact h2 {
  margin: 0;
  color: var(--partners-text);
  font-size: clamp(30px, 3vw, 40px);
  line-height: 1.2;
}

.partners-contact-link {
  flex: 0 0 auto;
  width: auto;
  min-height: 48px;
  padding: 0 18px;
  border-radius: 999px;
  background: var(--partners-text);
  color: #fff;
  font-size: 14px;
  font-weight: 800;
  box-shadow: 0 12px 24px rgba(17, 31, 46, 0.14);
}

@media (max-width: 760px) {
  .partners-purpose .partners-line-list,
  .partners-formats .partners-line-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .partners-contact {
    align-items: flex-start;
    flex-direction: column;
    padding: 24px;
  }

  .partners-contact-link {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .partners-page {
    width: 100vw;
    max-width: 100vw;
    padding: 28px 0 48px;
  }

  .partners-shell {
    width: calc(100vw - 48px);
    max-width: none;
    margin-right: 0;
    margin-left: 24px;
  }

  .partners-page-title {
    font-size: 40px;
    line-height: 1.12;
  }

  .partners-page-title span {
    display: block;
  }

  .partners-purpose .partners-line-list,
  .partners-formats .partners-line-list {
    grid-template-columns: minmax(0, 1fr);
  }

  .partners-line-row,
  .partners-purpose .partners-line-row,
  .partners-formats .partners-line-row {
    min-height: 0;
    gap: 10px;
    padding: 18px;
  }

  .partners-line-row h3,
  .partners-line-row p,
  .partners-purpose .partners-line-row p {
    min-height: 0;
  }

  .partners-company-card-list {
    width: 100%;
    max-width: 100%;
  }

  .partners-company-card {
    width: 100%;
    min-height: 0;
  }
}

/* Sub-home treatment above the directory section only */
.partners-page {
  background:
    linear-gradient(180deg, #ffffff 0%, #fbfbfa 48%, #f7f7f5 100%),
    #ffffff;
}

.partners-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(260px, 0.72fr);
  align-content: center;
  align-items: center;
  column-gap: clamp(28px, 4.8vw, 70px);
  row-gap: 22px;
  max-width: 1120px;
  min-height: clamp(384px, 35vw, 440px);
  margin-bottom: 0;
  padding: clamp(62px, 6vw, 82px) clamp(34px, 5vw, 64px) clamp(68px, 6vw, 84px);
  overflow: hidden;
  border: 0;
  border-radius: 0;
  background-color: #ffffff;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 250, 248, 0.94) 100%);
  box-shadow: none;
}

.partners-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  display: block;
  width: auto;
  border: 0;
  border-radius: 0;
  left: auto;
  top: clamp(18px, 3vw, 34px);
  right: clamp(8px, 1.8vw, 28px);
  bottom: clamp(18px, 3vw, 34px);
  width: min(54%, 620px);
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.76) 34%, rgba(255, 255, 255, 0.14) 68%, rgba(255, 255, 255, 0) 100%),
    linear-gradient(180deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.84) 100%),
    url('/socialmore-assets/hero/partner-connection-hero.png');
  background-position: center right;
  background-repeat: no-repeat;
  background-size: contain;
  opacity: 0.84;
  mix-blend-mode: multiply;
  filter: saturate(1.02) contrast(1.01);
  -webkit-mask-image: radial-gradient(
    ellipse at 65% 50%,
    #000 0%,
    #000 48%,
    rgba(0, 0, 0, 0.7) 64%,
    transparent 86%
  );
  mask-image: radial-gradient(
    ellipse at 65% 50%,
    #000 0%,
    #000 48%,
    rgba(0, 0, 0, 0.7) 64%,
    transparent 86%
  );
  box-shadow: none;
  pointer-events: none;
}

.partners-hero::after {
  content: '';
  position: absolute;
  right: clamp(24px, 5vw, 64px);
  bottom: 38px;
  left: clamp(24px, 5vw, 64px);
  display: block;
  width: auto;
  height: 1px;
  border: 0;
  border-radius: 0;
  background: linear-gradient(90deg, rgba(15, 138, 215, 0), rgba(15, 138, 215, 0.22), rgba(37, 183, 176, 0.22), rgba(15, 138, 215, 0));
  opacity: 1;
  box-shadow: none;
  pointer-events: none;
}

.partners-page-title,
.partners-page-copy {
  position: relative;
  grid-column: 1;
  z-index: 1;
}

.partners-page-title {
  max-width: 7.8em;
  margin: 0;
  font-size: clamp(44px, 5vw, 66px);
  line-height: 1.08;
  letter-spacing: 0;
}

.partners-page-title::before {
  content: 'SOCIALMORE CONNECT';
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px;
  color: #0f8ad7;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.12em;
}

.partners-page-title span {
  display: block;
}

.partners-page-copy {
  max-width: 32em;
  margin: 0;
  padding: 0;
  border: 0;
  color: #3e4851;
  font-size: 15px;
  line-height: 1.9;
}

.partners-page-copy-line {
  display: block;
}

.partners-purpose,
.partners-formats,
.partners-directory {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
  gap: clamp(32px, 5vw, 64px);
  align-items: start;
  max-width: 1120px;
  margin: 0;
  padding: 58px 0;
  border: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}

.partners-purpose {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

.partners-purpose .partners-section-head,
.partners-formats .partners-section-head,
.partners-directory .partners-section-head {
  position: sticky;
  top: 98px;
  display: block;
}

.partners-purpose .partners-section-head::before,
.partners-formats .partners-section-head::before,
.partners-directory .partners-section-head::before {
  content: '';
  display: block;
  width: 44px;
  height: 3px;
  margin-bottom: 20px;
  border-radius: 999px;
  background: linear-gradient(90deg, #0f8ad7, #25b7b0);
}

.partners-purpose .partners-section-heading-stack,
.partners-formats .partners-section-heading-stack,
.partners-directory .partners-section-heading-stack {
  gap: 14px;
}

.partners-purpose .partners-section-title,
.partners-formats .partners-section-title,
.partners-directory .partners-section-title {
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.2;
}

.partners-purpose .partners-section-note,
.partners-formats .partners-section-note,
.partners-directory .partners-section-note {
  max-width: 18em;
  font-size: 14px;
  line-height: 1.9;
}

.partners-purpose .partners-line-list,
.partners-formats .partners-line-list {
  display: grid;
  gap: 14px;
  max-width: 100%;
  border: 0;
}

.partners-purpose .partners-line-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.partners-formats .partners-line-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.partners-purpose .partners-line-row,
.partners-formats .partners-line-row {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 198px;
  padding: 22px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 32px rgba(17, 31, 46, 0.045);
}

.partners-purpose .partners-line-row::before,
.partners-formats .partners-line-row::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  display: block;
  height: 4px;
  background: linear-gradient(90deg, rgba(15, 138, 215, 0.64), rgba(37, 183, 176, 0.52));
}

.partners-purpose .partners-line-row > span,
.partners-formats .partners-line-row > span {
  display: inline-flex;
  width: fit-content;
  min-width: 42px;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(15, 138, 215, 0.08);
  color: #0f6fad;
  font-size: 12px;
  font-weight: 800;
}

.partners-purpose .partners-line-row h3,
.partners-formats .partners-line-row h3 {
  min-height: 2.8em;
  margin: 0 0 8px;
  font-size: 20px;
  line-height: 1.38;
}

.partners-purpose .partners-line-row p,
.partners-formats .partners-line-row p {
  min-height: 3.4em;
  font-size: 13px;
  line-height: 1.75;
}

.partners-directory {
  margin: 0;
}

@media (max-width: 1120px) {
  .partners-hero::before {
    right: 54px;
    width: min(62%, 620px);
    opacity: 0.56;
    filter: saturate(0.96) contrast(0.98);
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 28%, rgba(255, 255, 255, 0.36) 68%, rgba(255, 255, 255, 0.06) 100%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0) 44%, rgba(255, 255, 255, 0.92) 100%),
      url('/socialmore-assets/hero/partner-connection-hero.png');
  }

  .partners-purpose,
  .partners-formats,
  .partners-directory {
    grid-template-columns: 1fr;
    gap: 26px;
  }

  .partners-purpose .partners-section-head,
  .partners-formats .partners-section-head,
  .partners-directory .partners-section-head {
    position: static;
  }

  .partners-purpose .partners-section-note,
  .partners-formats .partners-section-note,
  .partners-directory .partners-section-note {
    max-width: 42em;
  }
}

@media (max-width: 980px) {
  .partners-hero {
    grid-template-columns: minmax(0, 0.96fr) minmax(210px, 0.54fr);
    min-height: 362px;
    padding: 58px 34px 62px;
  }

  .partners-hero::before {
    top: 24px;
    right: 42px;
    bottom: 24px;
    width: min(64%, 560px);
    opacity: 0.5;
    background:
      linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.92) 28%, rgba(255, 255, 255, 0.42) 68%, rgba(255, 255, 255, 0.08) 100%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 44%, rgba(255, 255, 255, 0.94) 100%),
      url('/socialmore-assets/hero/partner-connection-hero.png');
    background-position: center right;
    background-repeat: no-repeat;
    background-size: contain;
  }

  .partners-page-title {
    max-width: 7.6em;
    font-size: clamp(42px, 6.4vw, 56px);
  }

  .partners-page-copy {
    max-width: 31em;
  }

}

@media (max-width: 760px) {
  .partners-hero {
    grid-template-columns: 1fr;
    min-height: 0;
    padding: 48px 0 52px;
  }

  .partners-hero::before {
    top: 20px;
    right: -44%;
    bottom: 20px;
    width: 94%;
    opacity: 0.16;
  }

  .partners-page-title {
    font-size: 42px;
  }

  .partners-purpose .partners-line-list,
  .partners-formats .partners-line-list {
    grid-template-columns: 1fr;
  }

  .partners-purpose .partners-line-row,
  .partners-formats .partners-line-row {
    min-height: 0;
  }

  .partners-purpose .partners-line-row h3,
  .partners-formats .partners-line-row h3,
  .partners-purpose .partners-line-row p,
  .partners-formats .partners-line-row p {
    min-height: 0;
  }
}
</style>
