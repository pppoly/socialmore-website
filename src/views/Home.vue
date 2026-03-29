<template>
  <div class="landing-home">
    <section id="service" class="landing-hero">
      <div class="landing-hero-inner">
        <div class="landing-hero-copy">
          <h1 class="landing-hero-title">
            コミュニティーを続けるための仕組みを、
            <br />
            LINEの中に。
          </h1>
          <p class="landing-hero-body">
            メンバーを集め、イベントを動かし、売上を確認する。
            <br />
            コミュニティの経営に必要なことを、LINEひとつにまとめました。
          </p>
          <div class="landing-hero-tags">
            <span class="landing-tag-row">
              <span class="landing-tag landing-tag-line">
                <span class="landing-tag-dot"></span>
                LINEミニアプリで動く
              </span>
            </span>
            <span class="landing-tag">無料プランあり</span>
            <span class="landing-tag">アプリDL不要</span>
            <span class="landing-tag">手数料 最低2%</span>
            <span class="landing-tag">無料イベント対応</span>
          </div>
        </div>
        <div class="landing-hero-visual has-video">
          <video
            class="landing-hero-video"
            autoplay
            loop
            muted
            playsinline
            preload="auto"
            :poster="heroPosterSrc"
            aria-label="MOREの紹介動画"
          >
            <source :src="heroVideoSrc" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>

    <section id="line-mini" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">LINEミニアプリって何？</h2>
      <p class="landing-lead">
        月間1億人が使うLINE上で利用できる、インストール不要のWebアプリです。
      </p>
      <div class="landing-line-mini-grid">
        <article v-for="item in lineMiniItems" :key="item.title" class="landing-line-mini-card">
          <div class="landing-line-mini-figure">
            <img class="landing-line-mini-image" :src="item.src" :alt="item.alt" />
          </div>
          <div class="landing-line-mini-body">
            <h3 class="landing-point-title">{{ item.title }}</h3>
            <p class="landing-point-body">{{ item.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="pain" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">こんな悩み、ありますか？</h2>
      <p class="landing-lead">運営の細かな対応に追われ、本来の準備を後回しに。</p>

      <div class="landing-tab-row">
        <button
          v-for="(slide, index) in painSlides"
          :key="slide.title"
          type="button"
          class="landing-tab"
          :class="{ active: index === activePainIndex }"
          @click="selectPain(index)"
        >
          {{ slide.title }}
        </button>
      </div>

      <div class="landing-pain-wrap" :style="painWrapStyle">
        <button
          type="button"
          class="landing-panel-nav prev"
          aria-label="前の項目へ"
          :disabled="activePainIndex === 0"
          @click="changePainSlide(-1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 6.5L9 12l5.5 5.5" />
          </svg>
        </button>
        <button
          type="button"
          class="landing-panel-nav next"
          aria-label="次の項目へ"
          :disabled="activePainIndex === painSlides.length - 1"
          @click="changePainSlide(1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 6.5L15 12l-5.5 5.5" />
          </svg>
        </button>

        <article
          v-for="(slide, index) in painSlides"
          :key="slide.title"
          :ref="(el) => setPainPanelRef(el, index)"
          class="landing-pain-panel"
          :class="painPanelClass(index)"
          :aria-hidden="index === activePainIndex ? 'false' : 'true'"
        >
          <div class="landing-pain-card">
            <div class="landing-pain-copy">
              <h3 class="landing-pain-title">{{ slide.title }}</h3>
              <p class="landing-pain-body">{{ slide.problem }}</p>
            </div>
            <div class="landing-pain-media">
              <img class="landing-pain-image" :src="slide.problemSrc" :alt="slide.problemAlt" />
            </div>
          </div>
          <div class="landing-solve-card">
            <div class="landing-solve-copy">
              <p class="landing-solve-eyebrow">MOREなら</p>
              <p class="landing-solve-body">{{ slide.solution }}</p>
            </div>
            <div class="landing-pain-media">
              <img class="landing-pain-image" :src="slide.solutionSrc" :alt="slide.solutionAlt" />
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="feature" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">MOREでできること</h2>
      <p class="landing-lead">告知から申込、参加者管理まで、LINEの中でつながります。</p>

      <div class="landing-feature-accordion" @mouseleave="handleFeatureLeave">
        <div
          v-for="(step, index) in featureSteps"
          :key="step.title"
          class="landing-feature-row"
          @mouseenter="previewFeature(index)"
        >
          <div class="landing-feature-index">
            <div class="landing-tl-dot">{{ step.step }}</div>
          </div>
          <div class="landing-feature-card" :class="{ 'is-open': openFeatureIndex === index }">
            <div class="landing-feature-top">
              <button
                type="button"
                class="landing-feature-head"
                :aria-expanded="String(openFeatureIndex === index)"
                @click="toggleFeature(index)"
              >
                <span class="landing-feature-head-main">
                  <span class="landing-feature-step">Step {{ step.step }}</span>
                  <span class="landing-feature-title">{{ step.title }}</span>
                  <span class="landing-feature-summary">{{ step.summary }}</span>
                </span>
                <div class="landing-feature-peek">
                  <div class="landing-feature-preview-frame">
                    <img class="landing-feature-preview-image" :src="step.src" :alt="step.alt" />
                  </div>
                </div>
                <span class="landing-feature-chevron" aria-hidden="true"></span>
              </button>
            </div>
            <div class="landing-feature-body">
              <div class="landing-feature-full">
                <img class="landing-feature-full-image" :src="step.src" :alt="step.alt" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="diff" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">他のサービスと何が違うのか</h2>
      <p class="landing-lead">コミュニティの運営をスムーズにするためのツールです。</p>

      <div class="landing-diff-grid">
        <article v-for="item in diffCards" :key="item.title" class="landing-diff-card">
          <div class="landing-diff-figure">
            <img class="landing-diff-image" :src="item.src" :alt="item.alt" />
          </div>
          <h3 class="landing-diff-title">{{ item.title }}</h3>
          <p class="landing-diff-body">{{ item.body }}</p>
          <div class="landing-diff-rows">
            <div class="landing-diff-row">
              <div class="landing-tick">
                <svg viewBox="0 0 9 9" fill="none" aria-hidden="true">
                  <polyline points="1,4.5 3.5,7 8,2" stroke="#1a7a3c" stroke-width="1.6" />
                </svg>
              </div>
              <span><strong>MORE</strong>：{{ item.more }}</span>
            </div>
            <div class="landing-diff-row landing-diff-row-muted">
              <div class="landing-cross"></div>
              <span>{{ item.other }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section id="target" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">こんな主催者におすすめ</h2>

      <div class="landing-target-grid">
        <article v-for="item in targetCards" :key="item.name" class="landing-target-card">
          <div
            class="landing-target-image-shell"
            :class="[
              item.placeholderClass,
              { 'has-image': hasTargetImage(item), 'is-placeholder': !hasTargetImage(item) }
            ]"
          >
            <img
              v-if="hasTargetImage(item)"
              class="landing-target-image"
              :src="item.src"
              :alt="item.alt"
              @error="markBrokenTargetImage(item.src)"
            />
            <div v-else class="landing-target-illustration" aria-hidden="true">
              <div class="landing-target-illustration-aurora"></div>
              <div class="landing-target-illustration-group">
                <span class="landing-target-avatar large"></span>
                <span class="landing-target-avatar medium"></span>
                <span class="landing-target-avatar small"></span>
              </div>
              <span class="landing-target-illustration-label">{{ item.placeholder }}</span>
            </div>
          </div>
          <div class="landing-target-body">
            <h3 class="landing-target-name">{{ item.name }}</h3>
            <p class="landing-target-text">{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="pricing" class="landing-sec landing-sec--pricing">
      <h2 class="landing-h2">料金プラン</h2>
      <p class="landing-lead">まず無料で始められます。</p>

      <div class="landing-plan-toggle" role="tablist" aria-label="料金の表示切替">
        <button
          type="button"
          class="landing-plan-toggle-btn"
          :class="{ 'is-active': billingPeriod === 'monthly' }"
          :aria-selected="String(billingPeriod === 'monthly')"
          @click="setPlanBilling('monthly')"
        >
          月額
        </button>
        <button
          type="button"
          class="landing-plan-toggle-btn"
          :class="{ 'is-active': billingPeriod === 'yearly' }"
          :aria-selected="String(billingPeriod === 'yearly')"
          @click="setPlanBilling('yearly')"
        >
          年額
        </button>
      </div>

      <div class="landing-plan-wrap">
        <article
          v-for="plan in pricedPlans"
          :key="plan.id"
          class="landing-plan"
          :class="{ rec: plan.recommended }"
        >
          <div v-if="plan.recommended" class="landing-plan-badge">おすすめ</div>
          <div class="landing-plan-name">{{ plan.name }}</div>
          <div class="landing-plan-price">
            <span class="landing-plan-price-value">{{ plan.price }}</span>
            <span class="landing-plan-price-unit">{{ plan.unit }}</span>
          </div>
          <div class="landing-plan-fee">
            手数料 <b>{{ plan.fee }}</b>
          </div>
          <div class="landing-plan-rows">
            <div v-for="row in plan.rows" :key="row.label" class="landing-plan-row">
              <span class="k">{{ row.label }}</span>
              <span class="v">{{ row.value }}</span>
            </div>
          </div>
        </article>
      </div>

      <div class="landing-calc-trigger">
        <div class="landing-calc-trigger-copy">月間売上から最適なプランを試算できます。</div>
        <button type="button" class="landing-calc-trigger-btn" @click="openCalcModal">
          試算してみる
        </button>
      </div>
    </section>

    <section id="company" class="landing-sec landing-sec--wide">
      <h2 class="landing-h2">株式会社 SOCIALMORE</h2>
      <div class="landing-company-inner">
        <div class="landing-company-copy">
          <div class="landing-company-quote">
            「コミュニティを支える人が、
            <br />
            もっと本質的なことに時間を使える世界へ」
          </div>
          <div class="landing-company-body">
            イベント運営の現場には、まだ多くの手間が残っています。MOREは、その課題をLINE上でシンプルに整理し、主催者の運営を支えるツールです。
          </div>
        </div>
        <div class="landing-meta-table">
          <div v-for="item in companyFacts" :key="item.label" class="landing-meta-row">
            <span class="landing-meta-key">{{ item.label }}</span>
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>
    </section>

    <div
      v-if="isCalcModalOpen"
      class="landing-calc-modal"
      aria-hidden="false"
      @click.self="closeCalcModal"
    >
      <div class="landing-calc-dialog" role="dialog" aria-modal="true" aria-labelledby="calcModalTitle">
        <div class="landing-calc-head">
          <div id="calcModalTitle" class="landing-calc-title">料金試算</div>
          <button type="button" class="landing-calc-close" aria-label="閉じる" @click="closeCalcModal">
            ×
          </button>
        </div>
        <div class="landing-calc-body">
          <div class="landing-calc-label">月間売上（GMV）</div>
          <div class="landing-calc-form-row">
            <div class="landing-calc-stepper">
              <button type="button" class="landing-calc-step-btn" aria-label="1万円減らす" @click="adjustGMV(-10000)">
                −
              </button>
              <input
                ref="gmvInputRef"
                v-model="gmvInput"
                class="landing-calc-step-input"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                aria-label="月間売上（GMV）"
                @focus="handleGMVFocus"
                @input="sanitizeGMVInput"
                @blur="handleGMVBlur"
                @keydown.enter.prevent="calculateGMV"
              />
              <button type="button" class="landing-calc-step-btn" aria-label="1万円増やす" @click="adjustGMV(10000)">
                ＋
              </button>
            </div>
            <button type="button" class="landing-calc-submit" @click="calculateGMV">試算する</button>
          </div>

          <div v-if="hasCalculated" class="landing-calc-result">
            <div class="landing-calc-result-caption">各プランの月間コスト（月額＋手数料）</div>
            <div class="landing-calc-result-row" :class="{ recommended: recommendedPlans.includes('start') }">
              <span class="landing-calc-result-label">
                Start
                <span v-if="recommendedPlans.includes('start')" class="landing-calc-result-badge">おすすめ</span>
              </span>
              <span class="landing-calc-result-total">{{ formatJPY(calculatedTotals.start) }}</span>
            </div>
            <div class="landing-calc-result-row" :class="{ recommended: recommendedPlans.includes('pro') }">
              <span class="landing-calc-result-label">
                Pro
                <span v-if="recommendedPlans.includes('pro')" class="landing-calc-result-badge">おすすめ</span>
              </span>
              <span class="landing-calc-result-total">{{ formatJPY(calculatedTotals.pro) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const heroPosterSrc = '/socialmore-assets/hero/home-hero-app.png';
const heroVideoSrc = '/socialmore-assets/hero/community.mp4';

const lineMiniItems = [
  {
    src: '/socialmore-assets/line-mini/no-install.png',
    alt: 'インストール不要で使えるイメージ',
    title: 'インストール不要',
    body: 'LINEの中でそのまま開けます。参加者に新しいアプリを入れてもらう必要がありません。'
  },
  {
    src: '/socialmore-assets/line-mini/familiar-line.png',
    alt: '使い慣れたLINEで利用するイメージ',
    title: '使い慣れたLINEで使える',
    body: '月間1億人が使うLINE上で利用できるため、参加者にとって始めやすく、申込のハードルを下げられます。'
  },
  {
    src: '/socialmore-assets/line-mini/in-line-flow.png',
    alt: 'LINE内で完結する導線イメージ',
    title: 'LINE内で完結しやすい',
    body: '告知を見たあと、そのまま申込まで進みやすく、途中離脱を防ぎやすくなります。'
  }
];

const painSlides = [
  {
    title: '管理が複雑',
    problem: 'フォーム、スプレッドシート、メールなど、確認先が分かれていて、手間がかかります。',
    solution: '支払い状況・申込状況・チェックインをひとつにまとめて、スムーズに管理できます。',
    problemSrc: '/socialmore-assets/pain/management-problem.png',
    problemAlt: '複数ツールに分散した管理のイメージ',
    solutionSrc: '/socialmore-assets/pain/management-solution.png',
    solutionAlt: 'MOREで一元管理された運営のイメージ'
  },
  {
    title: '入金確認が手間',
    problem: '振込の確認や未払い対応に手間がかかり、準備に集中しづらくなります。',
    solution: '支払い状況や未入金の有無をまとめて確認でき、入金対応をスムーズに進められます。',
    problemSrc: '/socialmore-assets/pain/payment-problem.png',
    problemAlt: '入金確認に手間がかかるイメージ',
    solutionSrc: '/socialmore-assets/pain/payment-solution.png',
    solutionAlt: '支払い状況をまとめて確認できるイメージ'
  },
  {
    title: '参加者が途中で離脱する',
    problem: '別のサービスへ移動する間に、申込をやめてしまう人が出てきます。',
    solution: '告知から申込までLINE内で完結でき、離脱しにくい導線をつくれます。',
    problemSrc: '/socialmore-assets/pain/dropoff-problem.png',
    problemAlt: '外部サービスへの移動で離脱するイメージ',
    solutionSrc: '/socialmore-assets/pain/dropoff-solution.png',
    solutionAlt: 'LINE内で完結して離脱を防ぐイメージ'
  },
  {
    title: '当日の参加人数が読めない',
    problem: '告知はしても、当日どれくらい来るのか分からず、準備がしづらくなります。',
    solution: '申込者数・支払い済み人数・定員に対する申込状況をまとめて把握でき、準備を進めやすくなります。',
    problemSrc: '/socialmore-assets/pain/attendance-problem.png',
    problemAlt: '当日の参加人数が見えにくいイメージ',
    solutionSrc: '/socialmore-assets/pain/attendance-solution.png',
    solutionAlt: '参加状況を把握して準備しやすくなるイメージ'
  }
];

const featureSteps = [
  {
    step: '01',
    title: 'イベントページ作成',
    summary: '作成したページを、そのままLINEで告知できます。',
    src: '/feature-assets/event-page-user.png',
    alt: 'イベントページ作成'
  },
  {
    step: '02',
    title: '申込受付',
    summary: 'LINE上で申込から決済まで完結できます。',
    src: '/feature-assets/entry.jpg',
    alt: '申込受付'
  },
  {
    step: '03',
    title: '参加者管理',
    summary: '申込状況・支払い状況・チェックインをまとめて管理できます。',
    src: '/feature-assets/attendee.jpg',
    alt: '参加者管理'
  },
  {
    step: '04',
    title: '入金状況の確認',
    summary: '支払い状況や未入金の有無を把握できます。',
    src: '/feature-assets/payment.jpg',
    alt: '入金状況の確認'
  }
];

const diffCards = [
  {
    src: '/socialmore-assets/diff/line-only.png',
    alt: 'LINEだけで使える流れ',
    title: 'LINEだけで使える',
    body: '参加者に専用アプリをインストールしてもらう必要はありません。LINEがあれば、申込から参加までそのまま進められます。',
    more: 'LINEだけで利用できる',
    other: '従来のサービス：専用アプリが必要'
  },
  {
    src: '/socialmore-assets/diff/event-coverage.png',
    alt: '幅広いイベントに対応するイメージ',
    title: '幅広いイベントに対応',
    body: '勉強会、交流会、有料講座、地域イベントなど、ジャンルや参加費の有無を問わず開催できます。',
    more: '無料イベント・有料イベントの両方に対応',
    other: 'スキルシェア系サービス：有料講座中心'
  },
  {
    src: '/socialmore-assets/diff/fee-comparison.png',
    alt: '手数料比較のイメージ',
    title: '手数料を抑えられる',
    body: 'スキルシェア系サービスでは高い手数料がかかる場合があります。MOREはStartプランで2%、Proプランは0%です。',
    more: '最低2%（Proは0%）',
    other: 'スキルシェア系サービス：最大30%'
  },
  {
    src: '/socialmore-assets/diff/checkin-flow.png',
    alt: 'LINE受付のチェックイン導線',
    title: '当日の受付もLINEでスムーズ',
    body: '参加者はLINE上のチケットQRコードを提示するだけ。主催者はスキャンするだけで、受付と支払い確認をまとめて行えます。',
    more: 'QRスキャンで即確認',
    other: '従来のサービス：名簿での手作業確認'
  }
];

const targetCards = [
  {
    name: '大学サークル・学生コミュニティ',
    text: 'コストを抑えて、定期的なイベントを運営したい。',
    src: '/socialmore-assets/community/student-community.png',
    alt: '学生コミュニティのイメージ',
    placeholder: '学生サークル',
    placeholderClass: 'student'
  },
  {
    name: '小〜中規模の趣味コミュニティ',
    text: '趣味・勉強会・交流イベントを気軽に開きたい。',
    src: '/socialmore-assets/community/social-community.png',
    alt: '趣味コミュニティのイメージ',
    placeholder: '',
    placeholderClass: 'community'
  },
  {
    name: '定期的にイベントを開催する主催者',
    text: '開催回数が多いほど、手数料を抑えて継続的に運営したい。',
    src: '/socialmore-assets/value/frequent-organizer.png',
    alt: '定期開催する主催者のイメージ',
    placeholder: '',
    placeholderClass: 'organizer'
  }
];

const basePlans = [
  {
    id: 'free',
    name: 'Free',
    recommended: false,
    fee: '5%',
    rows: [
      { label: '月間公開', value: '2件' },
      { label: '月間申込', value: '200件' },
      { label: 'AI機能', value: '5回' },
      { label: 'CSV出力', value: '不可' },
      { label: '分析期間', value: '7日' }
    ]
  },
  {
    id: 'start',
    name: 'Start',
    recommended: true,
    fee: '2%',
    rows: [
      { label: '月間公開', value: '10件' },
      { label: '月間申込', value: '2,000件' },
      { label: 'AI機能', value: '30回' },
      { label: 'CSV出力', value: '可' },
      { label: '分析期間', value: '90日' }
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    recommended: false,
    fee: '0%',
    rows: [
      { label: '月間公開', value: '50件' },
      { label: '月間申込', value: '20,000件' },
      { label: 'AI機能', value: '150回' },
      { label: 'CSV出力', value: '可' },
      { label: '分析期間', value: '365日' }
    ]
  }
];

const billingMap = {
  monthly: {
    free: { price: '¥0', unit: '/月' },
    start: { price: '¥2,000', unit: '/月' },
    pro: { price: '¥9,000', unit: '/月' }
  },
  yearly: {
    free: { price: '¥0', unit: '/年' },
    start: { price: '¥24,000', unit: '/年' },
    pro: { price: '¥108,000', unit: '/年' }
  }
};

const companyFacts = [
  { label: '会社名', value: '株式会社創翔モア' },
  { label: '所在地', value: '東京都三鷹市' },
  { label: '設立', value: '2025年8月8日' },
  { label: '事業', value: 'LINEミニアプリ「MORE」の開発・運営' }
];

const activePainIndex = ref(0);
const openFeatureIndex = ref(null);
const billingPeriod = ref('monthly');
const isCalcModalOpen = ref(false);
const hasCalculated = ref(false);
const gmvInput = ref('100,000');
const gmvInputRef = ref(null);
const painPanelRefs = ref([]);
const painWrapHeight = ref(0);
const supportsHover = ref(false);
const brokenTargetImages = ref({});

const siteUrl = computed(() =>
  (import.meta.env.VITE_SITE_URL || 'https://www.socialmore.co.jp').replace(/\/+$/, '')
);
const pricedPlans = computed(() =>
  basePlans.map((plan) => ({
    ...plan,
    ...billingMap[billingPeriod.value][plan.id]
  }))
);
const parsedGMV = computed(() => {
  const raw = Number(String(gmvInput.value).replace(/[^\d]/g, ''));
  return Number.isFinite(raw) && raw >= 0 ? raw : 0;
});
const calculatedTotals = computed(() => ({
  start: 2000 + parsedGMV.value * 0.02,
  pro: 9000
}));
const recommendedPlans = computed(() => {
  if (!hasCalculated.value) return [];
  const totals = calculatedTotals.value;
  const minValue = Math.min(totals.start, totals.pro);
  return Object.entries(totals)
    .filter(([, value]) => value === minValue)
    .map(([key]) => key);
});
const painWrapStyle = computed(() =>
  painWrapHeight.value > 0 ? { height: `${painWrapHeight.value}px` } : {}
);

const selectPain = (index) => {
  activePainIndex.value = Math.max(0, Math.min(index, painSlides.length - 1));
};

const changePainSlide = (direction) => {
  selectPain(activePainIndex.value + direction);
};

const painPanelClass = (index) => ({
  active: index === activePainIndex.value,
  'is-prev': index === activePainIndex.value - 1,
  'is-next': index === activePainIndex.value + 1,
  'is-before': index < activePainIndex.value - 1,
  'is-after': index > activePainIndex.value + 1
});

const setPainPanelRef = (element, index) => {
  if (element) {
    painPanelRefs.value[index] = element;
  }
};

const syncPainWrapHeight = () => {
  const panel = painPanelRefs.value[activePainIndex.value];
  if (panel) {
    painWrapHeight.value = panel.offsetHeight;
  }
};

const previewFeature = (index) => {
  if (supportsHover.value) {
    openFeatureIndex.value = index;
  }
};

const handleFeatureLeave = () => {
  if (supportsHover.value) {
    openFeatureIndex.value = null;
  }
};

const toggleFeature = (index) => {
  openFeatureIndex.value = openFeatureIndex.value === index ? null : index;
};

const setPlanBilling = (period) => {
  billingPeriod.value = period === 'yearly' ? 'yearly' : 'monthly';
};

const hasTargetImage = (item) => Boolean(item.src) && !brokenTargetImages.value[item.src];

const markBrokenTargetImage = (src) => {
  if (!src || brokenTargetImages.value[src]) return;
  brokenTargetImages.value = {
    ...brokenTargetImages.value,
    [src]: true
  };
};

const formatJPY = (value) => `¥${Math.round(value).toLocaleString('ja-JP')}`;

const sanitizeGMVInput = () => {
  gmvInput.value = gmvInput.value.replace(/[^\d]/g, '');
};

const handleGMVFocus = (event) => {
  gmvInput.value = String(parsedGMV.value || 0);
  event.target.select();
};

const handleGMVBlur = () => {
  gmvInput.value = parsedGMV.value.toLocaleString('ja-JP');
};

const adjustGMV = (delta) => {
  const next = Math.max(0, parsedGMV.value + delta);
  gmvInput.value = next.toLocaleString('ja-JP');
};

const calculateGMV = () => {
  hasCalculated.value = true;
  gmvInput.value = parsedGMV.value.toLocaleString('ja-JP');
};

const openCalcModal = async () => {
  isCalcModalOpen.value = true;
  await nextTick();
  gmvInputRef.value?.focus();
  gmvInputRef.value?.select?.();
};

const closeCalcModal = () => {
  isCalcModalOpen.value = false;
};

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
  const title = 'SOCIALMORE - コミュニティーを続けるための仕組みを、LINEの中に。';
  const description =
    'メンバー募集、申込受付、参加者管理、売上確認まで。コミュニティ運営に必要な流れをLINEの中にまとめたMOREの紹介ページです。';
  const pageUrl = `${siteUrl.value}/`;
  document.title = title;
  upsertMeta('name', 'description', description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', pageUrl);
  upsertMeta('property', 'og:image', `${siteUrl.value}/socialmore-assets/hero/home-hero-app.png`);
};

const handleWindowResize = () => {
  syncPainWrapHeight();
};

const handleGlobalKeydown = (event) => {
  if (event.key === 'Escape' && isCalcModalOpen.value) {
    closeCalcModal();
  }
};

watch(activePainIndex, async () => {
  await nextTick();
  syncPainWrapHeight();
});

watch(isCalcModalOpen, (isOpen) => {
  if (typeof document === 'undefined') return;
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

watch(siteUrl, applySeo, { immediate: true });

onMounted(async () => {
  supportsHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  await nextTick();
  syncPainWrapHeight();
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    target?.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('resize', handleWindowResize);
  window.addEventListener('keydown', handleGlobalKeydown);
});

onBeforeUnmount(() => {
  document.body.style.overflow = '';
  window.removeEventListener('resize', handleWindowResize);
  window.removeEventListener('keydown', handleGlobalKeydown);
});
</script>

<style scoped>
.landing-home {
  --landing-bg: #ffffff;
  --landing-bg2: #f5f5f3;
  --landing-bg3: #eeede9;
  --landing-text: #1a1a1a;
  --landing-muted: #6b6b6b;
  --landing-hint: #a0a0a0;
  --landing-border: rgba(0, 0, 0, 0.09);
  --landing-border-strong: rgba(0, 0, 0, 0.16);
  --landing-info-bg: #e8f1fb;
  --landing-info-text: #1a5fa8;
  --landing-success-bg: #e6f4ec;
  --landing-success-text: #1a7a3c;
  --landing-radius-md: 8px;
  --landing-radius-lg: 14px;
  --landing-radius-xl: 20px;
  color: var(--landing-text);
}

.landing-hero,
.landing-sec {
  scroll-margin-top: 96px;
}

.landing-sec {
  width: min(900px, calc(100% - 40px));
  margin: 0 auto;
  padding: 32px 0;
}

.landing-sec--wide {
  width: min(1120px, calc(100% - 40px));
}

.landing-sec--pricing {
  width: min(1200px, calc(100% - 40px));
}

.landing-h2 {
  margin: 0 0 10px;
  font-size: 30px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.landing-lead {
  max-width: 560px;
  margin: 0 0 36px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--landing-muted);
}

.landing-hero {
  position: relative;
  width: min(1380px, calc(100% - 28px));
  margin: 0 auto;
  padding: 92px clamp(28px, 5vw, 72px) 64px;
  overflow: hidden;
}

.landing-hero::before {
  content: '';
  position: absolute;
  inset: 14px;
  border-radius: 34px;
  background: linear-gradient(
    135deg,
    rgba(245, 245, 243, 0.82),
    rgba(232, 241, 251, 0.46) 56%,
    rgba(255, 255, 255, 0.16)
  );
  pointer-events: none;
}

.landing-hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1.16fr) minmax(340px, 0.84fr);
  gap: clamp(42px, 6vw, 88px);
  align-items: center;
}

.landing-hero-copy {
  max-width: 700px;
}

.landing-hero-title {
  max-width: 14.2em;
  margin: 0 0 20px;
  font-size: clamp(38px, 3.9vw, 46px);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.landing-hero-body {
  max-width: 31em;
  margin: 0 0 30px;
  font-size: 16px;
  line-height: 1.95;
  color: var(--landing-muted);
}

.landing-hero-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-width: 560px;
}

.landing-tag-row {
  flex: 0 0 100%;
  display: flex;
}

.landing-tag {
  display: inline-flex;
  align-items: center;
  min-height: 36px;
  padding: 0 15px;
  border: 1px solid rgba(15, 138, 215, 0.18);
  border-radius: 999px;
  background: linear-gradient(135deg, #edf8ff, #f5fbff);
  box-shadow: 0 10px 22px rgba(26, 95, 168, 0.08);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.01em;
  color: #0f6fad;
}

.landing-tag-line {
  gap: 8px;
  border-color: rgba(6, 199, 85, 0.22);
  background: linear-gradient(135deg, #ecfff3, #f7fff9);
  box-shadow: 0 10px 24px rgba(6, 199, 85, 0.1);
  color: #098348;
}

.landing-tag-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #06c755;
  box-shadow: 0 0 0 5px rgba(6, 199, 85, 0.12);
}

.landing-hero-visual {
  position: relative;
  width: 100%;
  min-height: 368px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(26, 95, 168, 0.12);
  border-radius: 34px;
  background:
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.92) 0, rgba(255, 255, 255, 0) 32%),
    linear-gradient(160deg, #f4f9ff 0%, #e8f1fb 48%, #dbeaff 100%);
  box-shadow: 0 26px 58px rgba(26, 95, 168, 0.13);
}

.landing-hero-visual::before {
  content: '';
  position: absolute;
  top: 30px;
  right: 32px;
  bottom: 76px;
  left: 33%;
  border: 1px solid rgba(15, 138, 215, 0.16);
  border-radius: 26px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(244, 248, 255, 0.95));
  box-shadow: 0 22px 42px rgba(15, 73, 128, 0.14);
  z-index: 0;
}

.landing-hero-visual::after {
  content: '';
  position: absolute;
  left: 24px;
  top: 60%;
  width: 38%;
  height: 76px;
  transform: translateY(-50%);
  border: 1px solid rgba(15, 138, 215, 0.12);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(232, 241, 251, 0.92));
  box-shadow: 0 16px 30px rgba(15, 73, 128, 0.1);
  z-index: 0;
}

.landing-hero-visual.has-video::before,
.landing-hero-visual.has-video::after {
  display: none;
}

.landing-hero-visual.has-video {
  display: block;
  padding: 0;
  min-height: 0;
  background: transparent;
}

.landing-hero-video {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
  min-height: 0;
  max-height: none;
  object-fit: contain;
  border-radius: inherit;
  background: transparent;
}

@media (min-width: 1280px) {
  .landing-hero {
    width: min(1460px, calc(100% - 36px));
  }

  .landing-hero-inner {
    grid-template-columns: minmax(0, 0.98fr) minmax(460px, 1.08fr);
    gap: clamp(36px, 4.8vw, 72px);
  }

  .landing-hero-copy {
    max-width: 640px;
  }
}

.landing-line-mini-grid,
.landing-diff-grid,
.landing-target-grid {
  display: grid;
  gap: 16px;
  align-items: stretch;
}

.landing-line-mini-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.landing-line-mini-card,
.landing-target-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-xl);
  background: var(--landing-bg);
}

.landing-line-mini-figure,
.landing-target-image-shell {
  height: auto;
  aspect-ratio: 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  border-bottom: 0.5px solid var(--landing-border);
  background: var(--landing-bg2);
}

.landing-line-mini-image,
.landing-diff-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.landing-line-mini-body,
.landing-target-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  padding: 18px 18px 20px;
}

.landing-point-title,
.landing-target-name,
.landing-diff-title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
}

.landing-point-body,
.landing-target-text,
.landing-diff-body {
  margin: 0;
  font-size: 13px;
  line-height: 1.7;
  color: var(--landing-muted);
}

.landing-tab-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 36px;
}

.landing-tab {
  padding: 10px 19px;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 100px;
  background: linear-gradient(180deg, #f9fbfe, #f2f6fb);
  box-shadow: 0 8px 18px rgba(17, 31, 46, 0.05);
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.landing-tab.active {
  border-color: transparent;
  background: linear-gradient(135deg, #203244, #355772);
  box-shadow: 0 12px 24px rgba(17, 31, 46, 0.14);
  color: #fff;
}

.landing-pain-wrap {
  position: relative;
  min-height: 600px;
  overflow: hidden;
}

.landing-pain-wrap::before,
.landing-pain-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 112px;
  pointer-events: none;
  z-index: 4;
}

.landing-pain-wrap::before {
  left: 0;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.92) 26%, rgba(255, 255, 255, 0) 100%);
}

.landing-pain-wrap::after {
  right: 0;
  background: linear-gradient(270deg, #fff 0%, rgba(255, 255, 255, 0.92) 26%, rgba(255, 255, 255, 0) 100%);
}

.landing-panel-nav {
  position: absolute;
  top: 50%;
  z-index: 5;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 36px rgba(11, 28, 46, 0.1), 0 4px 10px rgba(11, 28, 46, 0.04);
  color: var(--landing-text);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    opacity 0.2s ease;
}

.landing-panel-nav.prev {
  left: max(8px, calc(50% - 432px));
}

.landing-panel-nav.next {
  right: max(8px, calc(50% - 432px));
}

.landing-panel-nav:disabled {
  opacity: 0.38;
  cursor: default;
  box-shadow: none;
}

.landing-panel-nav svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.landing-pain-panel {
  position: absolute;
  top: 0;
  left: 50%;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  width: min(736px, calc(100% - 172px));
  opacity: 0;
  pointer-events: none;
  filter: saturate(0.78);
  will-change: transform, opacity;
  transform: translateX(calc(-50% + 132%)) scale(0.9);
  transition:
    transform 0.48s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.32s ease,
    filter 0.32s ease;
}

.landing-pain-panel.active {
  opacity: 1;
  pointer-events: auto;
  filter: none;
  transform: translateX(-50%) scale(1);
  z-index: 3;
}

.landing-pain-panel.is-prev {
  opacity: 0.32;
  transform: translateX(calc(-50% - 78%)) scale(0.92);
  z-index: 2;
}

.landing-pain-panel.is-next {
  opacity: 0.32;
  transform: translateX(calc(-50% + 78%)) scale(0.92);
  z-index: 2;
}

.landing-pain-panel.is-before {
  opacity: 0;
  transform: translateX(calc(-50% - 136%)) scale(0.88);
  z-index: 1;
}

.landing-pain-panel.is-after {
  opacity: 0;
  transform: translateX(calc(-50% + 136%)) scale(0.88);
  z-index: 1;
}

.landing-pain-card,
.landing-solve-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-xl);
  background: #fff;
}

.landing-pain-copy,
.landing-solve-copy {
  flex-shrink: 0;
  padding: 22px 20px 20px;
  border-bottom: 1px solid var(--landing-border);
}

.landing-pain-title,
.landing-solve-eyebrow {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.landing-solve-eyebrow {
  color: var(--landing-info-text);
}

.landing-pain-body,
.landing-solve-body {
  margin: 0;
  font-size: 13px;
  line-height: 1.75;
}

.landing-pain-body {
  color: var(--landing-muted);
}

.landing-solve-body {
  color: var(--landing-text);
}

.landing-pain-media {
  flex: none;
  min-height: 0;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  background: var(--landing-bg3);
}

.landing-pain-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.landing-feature-accordion {
  display: flex;
  flex-direction: column;
}

.landing-feature-row {
  display: flex;
  align-items: stretch;
}

.landing-feature-index {
  position: relative;
  width: 48px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: 18px;
}

.landing-feature-row:not(:last-child) .landing-feature-index::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 53px;
  bottom: -14px;
  width: 1.5px;
  background: var(--landing-border);
  transform: translateX(-50%);
}

.landing-tl-dot {
  position: relative;
  z-index: 1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--landing-info-text);
  border-radius: 50%;
  background: var(--landing-info-bg);
  color: var(--landing-info-text);
  font-size: 11px;
  font-weight: 700;
}

.landing-feature-card {
  flex: 1;
  margin-left: 16px;
  margin-bottom: 10px;
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-lg);
  background: var(--landing-bg);
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.landing-feature-row:last-child .landing-feature-card {
  margin-bottom: 0;
}

.landing-feature-card.is-open {
  border-color: var(--landing-info-text);
  box-shadow: 0 10px 24px rgba(26, 95, 168, 0.08);
}

.landing-feature-top {
  padding: 18px 20px;
}

.landing-feature-head {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 0 26px 0 0;
  border: 0;
  background: transparent;
  text-align: left;
  font: inherit;
  cursor: pointer;
}

.landing-feature-head-main {
  flex: 1;
  min-width: 0;
}

.landing-feature-step {
  display: block;
  margin-bottom: 5px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--landing-hint);
}

.landing-feature-title {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: var(--landing-text);
}

.landing-feature-summary {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.65;
  color: var(--landing-muted);
}

.landing-feature-peek {
  width: 132px;
  min-width: 132px;
  height: 224px;
  flex-shrink: 0;
  overflow: hidden;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 10px 18px rgba(17, 31, 46, 0.08);
  transition:
    width 0.32s ease,
    min-width 0.32s ease,
    opacity 0.24s ease,
    transform 0.32s ease;
}

.landing-feature-card.is-open .landing-feature-peek {
  width: 0;
  min-width: 0;
  opacity: 0;
  transform: translateY(8px) scale(0.96);
}

.landing-feature-preview-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.landing-feature-preview-image,
.landing-feature-full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

.landing-feature-chevron {
  position: absolute;
  top: 4px;
  right: 0;
  width: 7px;
  height: 7px;
  border-right: 1.5px solid var(--landing-hint);
  border-bottom: 1.5px solid var(--landing-hint);
  transform: translateY(-2px) rotate(45deg);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.landing-feature-card.is-open .landing-feature-chevron {
  border-color: var(--landing-text);
  transform: translateY(1px) rotate(225deg);
}

.landing-feature-body {
  max-height: 0;
  overflow: hidden;
  transition:
    max-height 0.42s ease,
    opacity 0.28s ease,
    transform 0.36s ease;
  opacity: 0;
  transform: translateY(-10px);
}

.landing-feature-card.is-open .landing-feature-body {
  max-height: 760px;
  opacity: 1;
  transform: translateY(0);
}

.landing-feature-full {
  width: min(100%, 286px);
  aspect-ratio: 9 / 16;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 12px 22px rgba(17, 31, 46, 0.08);
}

.landing-feature-full-image {
  display: block;
}

.landing-diff-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 240px));
  justify-content: center;
}

.landing-diff-card {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: 24px 20px;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-xl);
  background: var(--landing-bg);
}

.landing-diff-figure {
  height: auto;
  aspect-ratio: 3 / 2;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  border: 0.5px solid var(--landing-border);
  border-radius: var(--landing-radius-lg);
  background: var(--landing-bg2);
}

.landing-diff-rows {
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-top: auto;
}

.landing-diff-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  line-height: 1.6;
}

.landing-diff-row-muted {
  color: #999;
}

.landing-tick,
.landing-cross {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  border-radius: 50%;
}

.landing-tick {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--landing-success-bg);
}

.landing-cross {
  border: 0.5px solid var(--landing-border-strong);
  background: var(--landing-bg2);
}

.landing-tick svg {
  width: 9px;
  height: 9px;
}

.landing-target-grid {
  grid-template-columns: repeat(3, minmax(220px, 240px));
  justify-content: center;
  margin-top: 24px;
}

.landing-target-image-shell.student {
  background:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.85), transparent 38%),
    linear-gradient(145deg, #eef5ff, #dceafb);
}

.landing-target-image-shell.community {
  background: linear-gradient(180deg, #f4f9ff 0%, #e6eef7 100%);
}

.landing-target-image-shell.organizer {
  background: linear-gradient(180deg, #f8fbff 0%, #edf3fa 100%);
}

.landing-target-image-shell.has-image {
  padding: 0;
}

.landing-target-image-shell.is-placeholder {
  padding: 0;
}

.landing-target-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.landing-target-illustration {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 16%, rgba(255, 255, 255, 0.82), transparent 34%),
    linear-gradient(145deg, #eff5ff 0%, #d9e7fb 52%, #c5dbf8 100%);
}

.landing-target-illustration-aurora {
  position: absolute;
  inset: 18px 20px auto auto;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0));
}

.landing-target-illustration-group {
  position: absolute;
  left: 50%;
  bottom: 20px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  transform: translateX(-50%);
}

.landing-target-avatar {
  position: relative;
  display: inline-flex;
  border-radius: 999px 999px 26px 26px;
  background: linear-gradient(180deg, #ffffff, #e8f0fb);
  box-shadow: 0 14px 30px rgba(24, 69, 119, 0.12);
}

.landing-target-avatar::before {
  content: '';
  position: absolute;
  top: -34px;
  left: 50%;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(180deg, #ffffff, #eef3fb);
  transform: translateX(-50%);
  box-shadow: 0 10px 20px rgba(24, 69, 119, 0.1);
}

.landing-target-avatar.large {
  width: 74px;
  height: 92px;
}

.landing-target-avatar.medium {
  width: 62px;
  height: 78px;
}

.landing-target-avatar.small {
  width: 54px;
  height: 66px;
}

.landing-target-illustration-label {
  position: absolute;
  top: 18px;
  left: 18px;
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border: 1px solid rgba(26, 95, 168, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  backdrop-filter: blur(10px);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #50708f;
}

.landing-target-placeholder {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--landing-hint);
}

.landing-plan-toggle {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
  margin-bottom: 18px;
  border: 1px solid var(--landing-border);
  border-radius: 999px;
  background: var(--landing-bg2);
}

.landing-plan-toggle-btn {
  min-height: 36px;
  padding: 0 16px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--landing-muted);
  font-size: 13px;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.landing-plan-toggle-btn.is-active {
  background: #fff;
  color: var(--landing-text);
  box-shadow: 0 8px 18px rgba(17, 31, 46, 0.08);
}

.landing-plan-wrap {
  display: flex;
  gap: 16px;
  margin-bottom: 14px;
}

.landing-plan {
  position: relative;
  flex: 1;
  min-width: 0;
  padding: 22px;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-xl);
  background: #fff;
}

.landing-plan.rec {
  border: 2px solid var(--landing-info-text);
  background: var(--landing-info-bg);
}

.landing-plan-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  background: var(--landing-info-text);
  color: #fff;
  font-size: 10px;
}

.landing-plan-name {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 700;
}

.landing-plan-price {
  display: inline-flex;
  align-items: flex-end;
  gap: 4px;
  min-width: 156px;
  margin-bottom: 4px;
  line-height: 1;
}

.landing-plan-price-value {
  font-size: 32px;
  font-weight: 800;
  white-space: nowrap;
}

.landing-plan-price-unit {
  padding-bottom: 3px;
  font-size: 13px;
  color: var(--landing-muted);
  white-space: nowrap;
}

.landing-plan-fee {
  margin-bottom: 18px;
  font-size: 12px;
  color: var(--landing-muted);
}

.landing-plan-fee b {
  color: var(--landing-text);
  font-weight: 700;
}

.landing-plan-rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 14px;
  border-top: 0.5px solid var(--landing-border);
}

.landing-plan-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 12px;
}

.landing-plan-row .k {
  color: var(--landing-muted);
}

.landing-plan-row .v {
  font-weight: 700;
}

.landing-calc-trigger {
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 18px 20px;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-lg);
  background: var(--landing-bg2);
}

.landing-calc-trigger-copy {
  font-size: 14px;
}

.landing-calc-trigger-btn,
.landing-calc-submit {
  padding: 10px 18px;
  border: none;
  border-radius: var(--landing-radius-md);
  background: var(--landing-info-text);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  white-space: nowrap;
}

.landing-company-inner {
  display: flex;
  gap: 48px;
  margin-top: 28px;
}

.landing-company-copy {
  flex: 2;
}

.landing-company-quote {
  margin-bottom: 16px;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.6;
}

.landing-company-body {
  font-size: 14px;
  line-height: 1.85;
  color: var(--landing-muted);
}

.landing-meta-table {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.landing-meta-row {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 0.5px solid var(--landing-border);
  font-size: 13px;
}

.landing-meta-row:last-child {
  border-bottom: none;
}

.landing-meta-key {
  width: 60px;
  flex-shrink: 0;
  color: var(--landing-muted);
}

.landing-calc-modal {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(18, 22, 29, 0.42);
}

.landing-calc-dialog {
  width: min(100%, 560px);
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-xl);
  background: #fff;
  box-shadow: 0 24px 70px rgba(18, 22, 29, 0.18);
}

.landing-calc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--landing-border);
  background: var(--landing-bg2);
}

.landing-calc-title {
  font-size: 15px;
  font-weight: 700;
}

.landing-calc-close {
  width: 34px;
  height: 34px;
  border: 1px solid var(--landing-border);
  border-radius: 999px;
  background: #fff;
  color: var(--landing-muted);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
}

.landing-calc-body {
  padding: 20px;
}

.landing-calc-label,
.landing-calc-result-caption {
  margin-bottom: 8px;
  font-size: 13px;
  color: var(--landing-muted);
}

.landing-calc-form-row {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.landing-calc-stepper {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid var(--landing-border-strong);
  border-radius: var(--landing-radius-md);
  background: #fff;
}

.landing-calc-step-btn {
  width: 48px;
  height: 46px;
  flex-shrink: 0;
  border: none;
  background: var(--landing-bg2);
  color: var(--landing-text);
  font-size: 20px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}

.landing-calc-step-input {
  flex: 1;
  min-width: 0;
  height: 46px;
  border: none;
  border-left: 1px solid var(--landing-border);
  border-right: 1px solid var(--landing-border);
  background: #fff;
  color: var(--landing-text);
  text-align: center;
  font-size: 16px;
  font-family: inherit;
}

.landing-calc-step-input:focus {
  outline: none;
}

.landing-calc-result {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.landing-calc-result-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-md);
  background: #fff;
  font-size: 13px;
}

.landing-calc-result-row.recommended {
  border-color: var(--landing-info-text);
  background: var(--landing-info-bg);
}

.landing-calc-result-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.landing-calc-result-badge {
  display: inline-flex;
  padding: 2px 8px;
  border-radius: 4px;
  background: var(--landing-info-text);
  color: #fff;
  font-size: 10px;
  font-weight: 600;
}

.landing-calc-result-total {
  font-weight: 600;
}

@media (max-width: 1040px) {
  .landing-pain-wrap::before,
  .landing-pain-wrap::after {
    width: 72px;
  }

  .landing-panel-nav {
    width: 48px;
    height: 48px;
  }

  .landing-panel-nav.prev {
    left: max(6px, calc(50% - 314px));
  }

  .landing-panel-nav.next {
    right: max(6px, calc(50% - 314px));
  }

  .landing-pain-panel {
    width: min(456px, calc(100% - 88px));
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .landing-pain-card,
  .landing-solve-card {
    min-height: unset;
  }

  .landing-pain-media {
    aspect-ratio: 1 / 1;
  }
}

@media (max-width: 920px) {
  .landing-hero {
    padding: 74px 32px 56px;
  }

  .landing-hero::before {
    inset: 10px;
    border-radius: 30px;
  }

  .landing-hero-inner {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .landing-hero-copy {
    max-width: none;
  }

  .landing-hero-visual {
    min-height: 318px;
  }

  .landing-hero-video {
    min-height: 318px;
  }

  .landing-hero-visual::before {
    left: 34%;
    bottom: 68px;
  }
}

@media (max-width: 720px) {
  .landing-feature-top {
    padding: 16px;
  }

  .landing-feature-head {
    align-items: flex-start;
  }

  .landing-feature-peek {
    width: 108px;
    min-width: 108px;
    height: 184px;
    border-radius: 20px;
  }

  .landing-feature-full {
    width: min(100%, 248px);
    margin-bottom: 16px;
  }
}

@media (max-width: 680px) {
  .landing-sec,
  .landing-sec--wide,
  .landing-sec--pricing {
    width: calc(100% - 40px);
    padding: 24px 0;
  }

  .landing-hero {
    width: calc(100% - 40px);
    padding: 46px 20px 38px;
  }

  .landing-hero::before {
    inset: 0;
    border-radius: 24px;
  }

  .landing-hero-inner {
    gap: 24px;
  }

  .landing-hero-title {
    max-width: 11em;
    font-size: 32px;
    line-height: 1.18;
  }

  .landing-hero-body {
    max-width: none;
    margin-bottom: 24px;
    font-size: 15px;
    line-height: 1.9;
  }

  .landing-hero-visual {
    min-height: 248px;
    height: 280px;
    padding: 20px;
    border-radius: 26px;
  }

  .landing-hero-visual.has-video {
    padding: 0;
  }

  .landing-hero-video {
    min-height: 280px;
  }

  .landing-hero-visual::before {
    top: 24px;
    right: 24px;
    bottom: 70px;
    left: 26%;
    border-radius: 22px;
  }

  .landing-hero-visual::after {
    left: 20px;
    width: 46%;
    height: 76px;
    border-radius: 18px;
  }

  .landing-line-mini-grid,
  .landing-diff-grid,
  .landing-target-grid {
    grid-template-columns: 1fr;
  }

  .landing-pain-wrap::before,
  .landing-pain-wrap::after {
    display: none;
  }

  .landing-panel-nav {
    width: 44px;
    height: 44px;
  }

  .landing-panel-nav.prev {
    left: 2px;
  }

  .landing-panel-nav.next {
    right: 2px;
  }

  .landing-pain-wrap {
    min-height: unset;
  }

  .landing-pain-panel {
    width: calc(100% - 24px);
  }

  .landing-pain-panel.is-prev,
  .landing-pain-panel.is-next,
  .landing-pain-panel.is-before,
  .landing-pain-panel.is-after {
    opacity: 0;
  }

  .landing-plan-toggle {
    display: flex;
    width: 100%;
  }

  .landing-plan-toggle-btn {
    flex: 1;
  }

  .landing-plan-wrap {
    flex-direction: column;
  }

  .landing-calc-trigger {
    flex-direction: column;
    align-items: flex-start;
  }

  .landing-calc-form-row,
  .landing-company-inner {
    flex-direction: column;
  }
}
</style>
