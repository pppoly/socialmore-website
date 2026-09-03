<template>
  <div class="landing-home">
    <section
      id="service"
      class="landing-hero"
      :class="heroSectionClass"
      @mouseenter="pauseHeroRotation"
      @mouseleave="resumeHeroRotation"
    >
      <div class="landing-hero-slider">
        <article
          class="landing-hero-slide landing-hero-slide--partner"
          :class="heroSlideClass(0)"
          :aria-hidden="activeHeroMessageIndex === 0 ? 'false' : 'true'"
        >
          <img class="landing-hero-backdrop" :src="partnerHeroImageSrc" alt="" loading="eager" />
          <div class="landing-hero-inner">
            <div class="landing-hero-copy">
              <p class="landing-hero-kicker">SOCIALMORE CONNECT</p>
              <h1 class="landing-hero-title">
                <span class="landing-hero-title-set landing-hero-title-set--desktop">
                  <span class="landing-hero-title-line">企業とコミュニティが、</span>
                  <span class="landing-hero-title-line">自然につながる</span>
                  <span class="landing-hero-title-line">入口をつくる。</span>
                </span>
                <span class="landing-hero-title-set landing-hero-title-set--mobile">
                  <span class="landing-hero-title-line">企業と</span>
                  <span class="landing-hero-title-line">コミュニティが、</span>
                  <span class="landing-hero-title-line">自然につながる</span>
                  <span class="landing-hero-title-line">入口をつくる。</span>
                </span>
              </h1>
              <p class="landing-hero-body">
                <span class="landing-hero-body-set landing-hero-body-set--desktop">
                  <span class="landing-hero-body-line">活動を続けたいコミュニティと、</span>
                  <span class="landing-hero-body-line">その活動を支えたい企業・団体が出会える関係づくりへ。</span>
                </span>
                <span class="landing-hero-body-set landing-hero-body-set--mobile">
                  <span class="landing-hero-body-line">活動を続けたいコミュニティと、</span>
                  <span class="landing-hero-body-line">その活動を支えたい企業・団体が、</span>
                  <span class="landing-hero-body-line">出会える関係づくりへ。</span>
                </span>
              </p>
              <div class="landing-hero-tags">
                <span class="landing-tag-row">
                  <span class="landing-tag landing-tag-line">
                    <span class="landing-tag-dot"></span>
                    共創・連携に取り組む
                  </span>
                </span>
                <span class="landing-tag">コミュニティ紹介</span>
                <span class="landing-tag">企業・団体連携</span>
                <span class="landing-tag">一緒につくる企画</span>
              </div>
              <div class="landing-hero-actions">
                <RouterLink class="landing-hero-primary" to="/partners">連携について見る</RouterLink>
                <RouterLink class="landing-hero-secondary" to="/contact">相談する</RouterLink>
              </div>
            </div>
          </div>
        </article>

        <article
          class="landing-hero-slide landing-hero-slide--product"
          :class="heroSlideClass(1)"
          :aria-hidden="activeHeroMessageIndex === 1 ? 'false' : 'true'"
        >
          <img class="landing-hero-backdrop" :src="productHeroImageSrc" alt="" loading="eager" />
          <div class="landing-hero-inner">
            <div class="landing-hero-copy">
              <p class="landing-hero-kicker">MORE LINE MINI APP</p>
              <h2 class="landing-hero-title">
                <span class="landing-hero-title-set landing-hero-title-set--desktop">
                  <span class="landing-hero-title-line">コミュニティーを続ける</span>
                  <span class="landing-hero-title-line">ための仕組みを、</span>
                  <span class="landing-hero-title-line">LINEの中に。</span>
                </span>
                <span class="landing-hero-title-set landing-hero-title-set--mobile">
                  <span class="landing-hero-title-line">コミュニティーを</span>
                  <span class="landing-hero-title-line">続けるための</span>
                  <span class="landing-hero-title-line">仕組みを、</span>
                  <span class="landing-hero-title-line">LINEの中に。</span>
                </span>
              </h2>
              <p class="landing-hero-body">
                <span class="landing-hero-body-set landing-hero-body-set--desktop">
                  <span class="landing-hero-body-line">メンバーを集め、イベントを動かし、売上を確認する。</span>
                  <span class="landing-hero-body-line">コミュニティの経営に必要なことを、LINEひとつにまとめました。</span>
                </span>
                <span class="landing-hero-body-set landing-hero-body-set--mobile">
                  <span class="landing-hero-body-line">メンバーを集め、イベントを動かし、</span>
                  <span class="landing-hero-body-line">売上を確認する。</span>
                  <span class="landing-hero-body-line">コミュニティの経営に必要なことを、</span>
                  <span class="landing-hero-body-line">LINEひとつにまとめました。</span>
                </span>
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
              <div class="landing-hero-actions">
                <a class="landing-hero-primary" href="#line-mini">MOREを見る</a>
                <RouterLink class="landing-hero-secondary" to="/contact">相談する</RouterLink>
              </div>
            </div>
          </div>
        </article>

        <div class="landing-hero-message-indicator" aria-label="導入メッセージを切り替える">
          <button
            v-for="(label, index) in heroMessageLabels"
            :key="label"
            type="button"
            class="landing-hero-message-indicator-btn"
            :class="{ 'is-active': activeHeroMessageIndex === index }"
            :aria-label="label"
            :aria-pressed="activeHeroMessageIndex === index"
            @click="selectHeroMessage(index)"
          ></button>
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

    <section id="partners" class="landing-sec landing-sec--wide landing-partners">
      <div class="landing-partner-head">
        <div>
          <h2 class="landing-h2">共創・連携パートナー</h2>
          <p class="landing-lead">
            コミュニティの声や活動の背景に共感してくれる企業・団体と、場が続くための関係づくりを進めています。
          </p>
        </div>
        <RouterLink class="landing-partner-directory-link" to="/partners/companies">
          つながりを見る
        </RouterLink>
      </div>

      <div
        class="landing-partner-rail"
        :class="{ 'is-static': !hasPartnerCarousel }"
        aria-label="共創・連携パートナー一覧"
      >
        <div class="landing-partner-track">
          <RouterLink
            v-for="(partner, index) in displayedPartnerItems"
            :key="`${partner.slug}-${index}`"
            class="landing-partner-card"
            :to="partner.detailPath"
            :style="partner.backgroundImage ? { '--partner-card-image': `url(${partner.backgroundImage})` } : null"
            :aria-label="`${partner.name}のパートナー詳細を見る`"
          >
            <span class="landing-partner-visual" aria-hidden="true"></span>
            <span class="landing-partner-card-head">
              <span class="landing-partner-type-list">
                <span
                  v-for="tag in partner.tags?.length ? partner.tags : [partner.type]"
                  :key="tag"
                  class="landing-partner-type"
                >
                  {{ tag }}
                </span>
              </span>
              <span class="landing-partner-name">{{ partner.name }}</span>
              <span class="landing-partner-tagline">{{ partner.tagline }}</span>
            </span>
            <span class="landing-partner-summary">{{ partner.body }}</span>
            <span class="landing-partner-card-foot">
              <span class="landing-partner-cta">つながりを見る</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section id="activities" class="landing-sec landing-sec--wide landing-activities">
      <div class="landing-activity-head">
        <div>
          <h2 class="landing-h2">地域とつながるイベント</h2>
          <p class="landing-lead">
            地域・企業・クリエイターとともに、場が続いていくためのイベントを少しずつ形にしています。
          </p>
        </div>
        <a class="landing-activity-directory-link" href="/event.html">イベントを見る</a>
      </div>

      <div class="landing-activity-rail" aria-label="地域とつながるイベント">
        <a
          v-for="activity in communityActivities"
          :key="activity.title"
          class="landing-activity-card"
          :href="activity.href"
        >
          <span class="landing-activity-visual">
            <img class="landing-activity-image" :src="activity.image" :alt="activity.imageAlt" />
          </span>
          <span class="landing-activity-body">
            <span class="landing-activity-meta">
              <span class="landing-activity-status" :class="`is-${activity.statusTone}`">
                {{ activity.status }}
              </span>
              <span class="landing-activity-date">{{ activity.date }}</span>
            </span>
            <span class="landing-activity-title">{{ activity.title }}</span>
            <span class="landing-activity-copy">{{ activity.copy }}</span>
          </span>
        </a>
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
import { RouterLink } from 'vue-router';
import { partnerCompanies } from '../data/partners';

const heroMessageLabels = [
  '企業とコミュニティのメッセージを表示',
  'LINEミニアプリのメッセージを表示'
];
const partnerHeroImageSrc = '/socialmore-assets/hero/partner-connection-hero.png';
const productHeroImageSrc = '/socialmore-assets/hero/more-line-mini-hero.png';
const heroMessageIntervalMs = 9000;
let heroRotationTimer = null;

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
    src: null,
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

const communityActivities = [
  {
    status: '実施中',
    statusTone: 'active',
    date: '実施期間：2026年9月1日 - 9月15日',
    title: 'Viivii コミュニティPR動画制作キャンペーン 第2期',
    copy: '活動や作品の魅力を、AI動画でより多くの人へ届ける制作支援キャンペーンです。',
    image: '/socialmore-assets/partners/viivii-campaign-02-poster.png',
    imageAlt: 'Viivii コミュニティPR動画制作キャンペーン第2期の告知ポスター',
    href: '/event.html'
  },
  {
    status: '開催予定',
    statusTone: 'upcoming',
    date: '開催日時：2026年9月13日（日）15:00 - 16:00',
    title: '『魔法使いちゃんは素直になれやしない』第2回試写会',
    copy: '第1回の感想も踏まえながら、地域の声とともに作品を磨いていく試写会です。',
    image: '/socialmore-assets/events/mahotsuka-screening-02.png',
    imageAlt: '映画『魔法使いちゃんは素直になれやしない』第2回試写会のチラシ',
    href: '/event.html'
  },
  {
    status: '実施済み',
    statusTone: 'past',
    date: '開催日：2026年5月30日（土）',
    title: 'くもりときどきミートボール 野外上映会',
    copy: '三鷹を拠点に活動する地域コミュニティとともに、ご家族やご友人と楽しめる野外上映会を開催しました。',
    image: '/socialmore-assets/events/kumori-meatballs-poster.jpg',
    imageAlt: 'くもりときどきミートボール 野外上映会ポスター',
    href: '/event.html'
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
const activeHeroMessageIndex = ref(0);
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

const heroSectionClass = computed(() => ({
  'is-partner-slide': activeHeroMessageIndex.value === 0,
  'is-product-slide': activeHeroMessageIndex.value === 1
}));
const pricedPlans = computed(() =>
  basePlans.map((plan) => ({
    ...plan,
    ...billingMap[billingPeriod.value][plan.id]
  }))
);
const partnerCarouselItems = computed(() => {
  if (!partnerCompanies.length) return [];
  const minimumCards = 6;
  const repeatCount = Math.max(2, Math.ceil(minimumCards / partnerCompanies.length));
  return Array.from({ length: repeatCount }, () => partnerCompanies).flat();
});
const hasPartnerCarousel = computed(() => partnerCompanies.length > 1);
const displayedPartnerItems = computed(() =>
  hasPartnerCarousel.value ? partnerCarouselItems.value : partnerCompanies
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

const shouldReduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const stopHeroRotation = () => {
  if (heroRotationTimer === null) return;
  window.clearInterval(heroRotationTimer);
  heroRotationTimer = null;
};

const startHeroRotation = () => {
  if (typeof window === 'undefined' || shouldReduceMotion()) return;
  stopHeroRotation();
  heroRotationTimer = window.setInterval(() => {
    activeHeroMessageIndex.value = (activeHeroMessageIndex.value + 1) % heroMessageLabels.length;
  }, heroMessageIntervalMs);
};

const restartHeroRotation = () => {
  stopHeroRotation();
  startHeroRotation();
};

const selectHeroMessage = (index) => {
  activeHeroMessageIndex.value = Math.max(0, Math.min(index, heroMessageLabels.length - 1));
  restartHeroRotation();
};

const pauseHeroRotation = () => {
  stopHeroRotation();
};

const resumeHeroRotation = () => {
  startHeroRotation();
};

const heroSlideClass = (index) => ({
  'is-active': index === activeHeroMessageIndex.value,
  'is-inactive': index !== activeHeroMessageIndex.value
});

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

onMounted(async () => {
  supportsHover.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  startHeroRotation();
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
  stopHeroRotation();
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
  letter-spacing: 0;
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
  width: min(1440px, calc(100% - 28px));
  margin: 0 auto;
  overflow: hidden;
  --hero-surface-start: rgba(248, 251, 255, 0.96);
  --hero-surface-mid: rgba(232, 241, 251, 0.72);
  --hero-surface-end: rgba(255, 255, 255, 0.48);
  --hero-accent: #0f8ad7;
  --hero-accent-soft: rgba(15, 138, 215, 0.12);
  --hero-kicker-height: 14px;
  --hero-title-height: 3.42em;
  --hero-body-height: 62px;
  --hero-actions-height: 42px;
  --hero-tags-height: 72px;
  transition: background-color 0.45s ease;
}

.landing-hero.is-product-slide {
  --hero-surface-start: rgba(247, 253, 250, 0.98);
  --hero-surface-mid: rgba(230, 247, 238, 0.78);
  --hero-surface-end: rgba(238, 248, 255, 0.5);
  --hero-accent: #06c755;
  --hero-accent-soft: rgba(6, 199, 85, 0.14);
}

.landing-hero::before {
  content: '';
  position: absolute;
  inset: 14px;
  border-radius: 34px;
  background: linear-gradient(
    135deg,
    var(--hero-surface-start),
    var(--hero-surface-mid) 58%,
    var(--hero-surface-end)
  );
  pointer-events: none;
  transition: background 0.45s ease;
}

.landing-hero-slider {
  position: relative;
  z-index: 1;
  min-height: 584px;
  isolation: isolate;
}

.landing-hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  min-height: 600px;
  padding: 86px clamp(38px, 5.2vw, 86px) 100px;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transform: translate3d(28px, 0, 0);
  visibility: hidden;
  will-change: opacity, transform;
  transition:
    opacity 0.34s ease,
    transform 0.72s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s linear 0.34s;
}

.landing-hero-slide::before {
  content: '';
  position: absolute;
  right: clamp(38px, 5.2vw, 86px);
  bottom: 62px;
  left: clamp(38px, 5.2vw, 86px);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--hero-accent-soft), transparent);
  z-index: 4;
  pointer-events: none;
}

.landing-hero-slide::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    rgba(248, 251, 255, 0.98) 0%,
    rgba(248, 251, 255, 0.94) 32%,
    rgba(248, 251, 255, 0.54) 50%,
    rgba(248, 251, 255, 0.04) 78%,
    rgba(248, 251, 255, 0) 100%
  );
  pointer-events: none;
}

.landing-hero-slide--product::after {
  background: linear-gradient(
    90deg,
    rgba(247, 253, 250, 0.98) 0%,
    rgba(247, 253, 250, 0.94) 32%,
    rgba(247, 253, 250, 0.5) 50%,
    rgba(247, 253, 250, 0.04) 78%,
    rgba(247, 253, 250, 0) 100%
  );
}

.landing-hero-slide.is-active {
  position: relative;
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(0, 0, 0);
  visibility: visible;
  z-index: 2;
  transition:
    opacity 0.5s ease 0.08s,
    transform 0.78s cubic-bezier(0.22, 1, 0.36, 1),
    visibility 0s;
}

.landing-hero-slide.is-inactive {
  z-index: 1;
}

.landing-hero-inner {
  position: relative;
  z-index: 2;
  display: block;
  width: min(100%, 620px);
  align-self: center;
}

.landing-hero-copy {
  max-width: 620px;
  min-width: 0;
}

.landing-hero-backdrop {
  position: absolute;
  z-index: 0;
  top: 57%;
  right: clamp(-130px, -6vw, -64px);
  width: min(82%, 1060px);
  height: 124%;
  object-fit: contain;
  object-position: center right;
  opacity: 1;
  mix-blend-mode: multiply;
  filter: saturate(1.08) contrast(1.02) drop-shadow(0 20px 34px rgba(15, 73, 128, 0.08));
  transform: translate3d(0, -50%, 0);
  -webkit-mask-image: radial-gradient(
    ellipse at 62% 54%,
    #000 0%,
    #000 54%,
    rgba(0, 0, 0, 0.72) 66%,
    transparent 84%
  );
  mask-image: radial-gradient(
    ellipse at 62% 54%,
    #000 0%,
    #000 54%,
    rgba(0, 0, 0, 0.72) 66%,
    transparent 84%
  );
  pointer-events: none;
  user-select: none;
}

.landing-hero-slide--partner .landing-hero-backdrop {
  top: 58%;
  right: clamp(-150px, -7vw, -78px);
  width: min(80%, 1040px);
  transform: translate3d(0, -50%, 0);
}

.landing-hero-slide--product .landing-hero-backdrop {
  top: 57%;
  right: clamp(-142px, -6.4vw, -72px);
  width: min(84%, 1080px);
  transform: translate3d(0, -50%, 0);
}

.landing-hero-message-indicator {
  position: absolute;
  left: clamp(38px, 5.2vw, 86px);
  bottom: 58px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 7px;
}

.landing-hero-message-indicator-btn {
  appearance: none;
  width: 24px;
  height: 5px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: var(--hero-accent);
  opacity: 0.22;
  transform-origin: left center;
  transform: scaleX(0.72);
  cursor: pointer;
  transition: background 0.3s ease, opacity 0.2s ease, transform 0.2s ease;
}

.landing-hero-message-indicator-btn.is-active {
  opacity: 0.95;
  transform: scaleX(1);
}

.landing-hero-message-indicator-btn:hover,
.landing-hero-message-indicator-btn:focus-visible {
  opacity: 0.68;
  outline: none;
}

.landing-hero-message-indicator-btn:focus-visible {
  box-shadow: 0 0 0 4px var(--hero-accent-soft);
}

.landing-hero-title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 13.8em;
  height: var(--hero-title-height);
  margin: 0 0 20px;
  font-size: clamp(40px, 3.45vw, 48px);
  font-weight: 800;
  line-height: 1.14;
  letter-spacing: 0;
  text-wrap: balance;
}

.landing-hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: var(--hero-kicker-height);
  margin: 0 0 18px;
  color: #1a5fa8;
  font-size: 12px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.12em;
}

.landing-hero-kicker::before {
  content: '';
  width: 34px;
  height: 2px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.42;
}

.landing-hero-slide--product .landing-hero-kicker {
  color: #098348;
}

.landing-hero-title-line,
.landing-hero-body-line {
  display: block;
}

.landing-hero-title-line {
  white-space: nowrap;
}

.landing-hero-title-set,
.landing-hero-body-set {
  display: block;
}

.landing-hero-title-set--mobile,
.landing-hero-body-set--mobile {
  display: none;
}

.landing-hero-title-line,
.landing-hero-body-line,
.landing-hero-kicker,
.landing-hero-actions,
.landing-hero-tags,
.landing-hero-visual {
  animation: landing-hero-rise 0.78s cubic-bezier(0.2, 0.78, 0.2, 1) both;
}

.landing-hero-title-line:nth-child(2) {
  animation-delay: 0.08s;
}

.landing-hero-body-line:nth-child(1) {
  animation-delay: 0.18s;
}

.landing-hero-body-line:nth-child(2) {
  animation-delay: 0.26s;
}

.landing-hero-tags {
  animation-delay: 0.42s;
}

.landing-hero-actions {
  animation-delay: 0.32s;
}

.landing-hero-visual {
  animation-delay: 0.18s;
}

.landing-hero-body {
  max-width: 32em;
  height: var(--hero-body-height);
  margin: 0 0 24px;
  font-size: 15.5px;
  line-height: 1.95;
  color: var(--landing-muted);
}

.landing-hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 10px;
  min-height: var(--hero-actions-height);
  margin: 0;
}

.landing-hero-primary,
.landing-hero-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 800;
  line-height: 1;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.landing-hero-primary {
  background: #1a1a1a;
  color: #ffffff;
  box-shadow: 0 14px 30px rgba(17, 31, 46, 0.18);
}

.landing-hero-secondary {
  border: 1px solid rgba(26, 95, 168, 0.18);
  background: rgba(255, 255, 255, 0.64);
  color: #1a1a1a;
}

.landing-hero-primary:hover,
.landing-hero-secondary:hover,
.landing-hero-primary:focus-visible,
.landing-hero-secondary:focus-visible {
  outline: none;
  transform: translateY(-1px);
}

.landing-hero-tags {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 8px;
  max-width: 520px;
  min-height: var(--hero-tags-height);
  margin: 0 0 18px;
}

.landing-tag-row {
  flex: 0 0 100%;
  display: flex;
}

.landing-tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 13px;
  border: 1px solid rgba(15, 138, 215, 0.18);
  border-radius: 999px;
  background: linear-gradient(135deg, #edf8ff, #f5fbff);
  box-shadow: 0 10px 22px rgba(26, 95, 168, 0.08);
  font-size: 11.5px;
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
  min-height: 450px;
  display: grid;
  align-items: center;
  overflow: visible;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
  isolation: isolate;
}

.landing-hero-visual--product {
  border-color: transparent;
}

.landing-hero-visual::before {
  content: '';
  position: absolute;
  inset: 6% 0 7% 9%;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 36px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.2)),
    linear-gradient(160deg, rgba(232, 241, 251, 0.92), rgba(248, 251, 255, 0.42));
  box-shadow: 0 28px 70px rgba(15, 73, 128, 0.12);
  z-index: 0;
  pointer-events: none;
}

.landing-hero-visual--product::before {
  border-color: rgba(6, 199, 85, 0.12);
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.24)),
    linear-gradient(160deg, rgba(230, 247, 238, 0.96), rgba(238, 248, 255, 0.5));
  box-shadow: 0 28px 70px rgba(6, 105, 90, 0.12);
}

.landing-hero-visual::after {
  display: none;
}

.landing-hero-image {
  position: relative;
  z-index: 1;
  display: block;
  width: min(108%, 760px);
  height: clamp(390px, 39vw, 520px);
  justify-self: center;
  object-fit: contain;
  object-position: center;
  mix-blend-mode: multiply;
  filter: drop-shadow(0 24px 30px rgba(15, 73, 128, 0.1));
}

.landing-hero-visual-label {
  position: absolute;
  right: clamp(10px, 2.2vw, 32px);
  bottom: clamp(8px, 2vw, 30px);
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 42px;
  padding: 0 14px;
  border: 1px solid rgba(26, 95, 168, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 12px 26px rgba(15, 73, 128, 0.1);
  backdrop-filter: blur(8px);
  display: none;
}

.landing-hero-visual-label span {
  color: #1a5fa8;
  font-size: 11px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.landing-hero-visual-label strong {
  color: #1a1a1a;
  font-size: 12px;
  font-weight: 800;
  line-height: 1.4;
  white-space: nowrap;
}

.landing-hero-visual--product .landing-hero-visual-label span {
  color: #098348;
}

.landing-visual-window {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 18px;
  width: 100%;
  min-height: 336px;
  padding: 18px;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 22px 46px rgba(15, 73, 128, 0.12);
  backdrop-filter: blur(8px);
}

.landing-visual-window--product {
  border-color: rgba(6, 199, 85, 0.16);
}

.landing-visual-window-head,
.landing-visual-window-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.landing-visual-window-head {
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(26, 95, 168, 0.1);
}

.landing-visual-window-head span {
  color: #6a7e92;
  font-size: 12px;
  font-weight: 800;
}

.landing-visual-window-foot {
  padding-top: 12px;
  border-top: 1px solid rgba(26, 95, 168, 0.1);
}

.landing-visual-window-foot p {
  max-width: 18em;
  margin: 0;
  color: #506579;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.7;
  text-align: right;
}

.landing-hero-visual-kicker {
  margin: 0;
  color: #1a5fa8;
  font-size: 12px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.12em;
}

.landing-connection-map {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 0.96fr) minmax(0, 1.08fr) minmax(0, 0.96fr);
  gap: 14px;
  align-items: center;
  min-height: 190px;
}

.landing-connection-map::before {
  content: '';
  position: absolute;
  right: 9%;
  left: 9%;
  top: 50%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(26, 95, 168, 0.08),
    rgba(15, 138, 215, 0.46),
    rgba(26, 95, 168, 0.08)
  );
  transform: translateY(-50%);
}

.landing-connection-node {
  position: relative;
  z-index: 1;
  display: grid;
  align-content: center;
  gap: 9px;
  min-height: 132px;
  padding: 18px 16px;
  border: 1px solid rgba(26, 95, 168, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 16px 32px rgba(15, 73, 128, 0.11);
}

.landing-connection-node--socialmore {
  min-height: 164px;
  border-color: rgba(6, 199, 85, 0.22);
  background: #ffffff;
  box-shadow: 0 22px 42px rgba(6, 74, 120, 0.14);
}

.landing-connection-node span {
  color: #6a7e92;
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.06em;
}

.landing-connection-node strong {
  color: #1a1a1a;
  font-size: clamp(15px, 1.35vw, 17px);
  font-weight: 800;
  line-height: 1.55;
  letter-spacing: 0;
}

.landing-connection-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.landing-connection-chips span {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border: 1px solid rgba(15, 138, 215, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.76);
  color: #25536f;
  font-size: 12px;
  font-weight: 800;
}

.landing-product-visual {
  display: grid;
  grid-template-columns: minmax(150px, 0.7fr) minmax(0, 1fr);
  gap: clamp(16px, 2.4vw, 26px);
  align-items: center;
}

.landing-phone-frame {
  display: grid;
  gap: 10px;
  width: min(100%, 190px);
  min-height: 292px;
  padding: 14px;
  justify-self: center;
  border: 1px solid rgba(26, 95, 168, 0.16);
  border-radius: 28px;
  background: #ffffff;
  box-shadow: 0 22px 42px rgba(15, 73, 128, 0.16);
}

.landing-phone-status {
  width: 42px;
  height: 5px;
  margin: 0 auto 2px;
  border-radius: 999px;
  background: #d8e4ef;
}

.landing-phone-header {
  display: grid;
  gap: 3px;
  padding: 12px;
  border-radius: 16px;
  background: #06c755;
  color: #ffffff;
}

.landing-phone-header span,
.landing-phone-card span,
.landing-console-head span,
.landing-console-row span {
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.04em;
}

.landing-phone-header strong,
.landing-phone-card strong {
  font-size: 14px;
  font-weight: 800;
  line-height: 1.45;
}

.landing-phone-card {
  display: grid;
  gap: 5px;
  padding: 12px;
  border: 1px solid rgba(26, 95, 168, 0.1);
  border-radius: 16px;
  background: #f7fbff;
}

.landing-phone-card span {
  color: #6a7e92;
}

.landing-phone-card strong {
  color: #1a1a1a;
}

.landing-phone-card.is-primary {
  border-color: rgba(15, 138, 215, 0.2);
  background: #e8f1fb;
}

.landing-console-panel {
  display: grid;
  gap: 10px;
  min-width: 0;
  padding: clamp(16px, 2.2vw, 22px);
  border: 1px solid rgba(26, 95, 168, 0.13);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 34px rgba(15, 73, 128, 0.12);
}

.landing-console-head,
.landing-console-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.landing-console-head {
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(26, 95, 168, 0.12);
  color: #1a5fa8;
}

.landing-console-head strong {
  font-size: 18px;
  font-weight: 900;
}

.landing-console-row {
  min-height: 52px;
  padding: 0 14px;
  border: 1px solid rgba(26, 95, 168, 0.09);
  border-radius: 16px;
  background: #ffffff;
}

.landing-console-row span {
  color: #6a7e92;
}

.landing-console-row strong {
  color: #1a1a1a;
  font-size: 19px;
  font-weight: 900;
  white-space: nowrap;
}

@keyframes landing-hero-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .landing-hero-title-line,
  .landing-hero-body-line,
  .landing-hero-tags,
  .landing-hero-visual,
  .landing-hero-message,
  .landing-hero-visual-panel,
  .landing-hero-message-indicator-btn {
    animation: none;
    transition: none;
  }

  .landing-hero-message {
    opacity: 0;
    transform: none;
    visibility: hidden;
  }

  .landing-hero-message.is-active {
    opacity: 1;
    visibility: visible;
  }

  .landing-hero-message.is-preview {
    opacity: 0;
    visibility: hidden;
  }

  .landing-hero-visual-panel {
    opacity: 0;
    transform: none;
    visibility: hidden;
  }

  .landing-hero-visual-panel.is-active {
    opacity: 1;
    visibility: visible;
  }
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

  .landing-hero-message-viewport {
    --landing-hero-preview-x: 104%;
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
  border-radius: var(--landing-radius-md);
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
  border-radius: var(--landing-radius-md);
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
  letter-spacing: 0;
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
  border-radius: var(--landing-radius-md);
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

.landing-partners {
  padding-top: 32px;
  padding-bottom: 32px;
}

.landing-partner-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.landing-partner-head .landing-lead {
  max-width: 560px;
  margin-bottom: 0;
}

.landing-partner-directory-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 38px;
  margin-top: 2px;
  padding: 0 14px;
  border: 1px solid var(--landing-border);
  border-radius: 999px;
  background: var(--landing-bg);
  color: var(--landing-text);
  font-size: 13px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.landing-partner-directory-link:hover {
  border-color: var(--landing-border-strong);
  background: var(--landing-bg2);
}

.landing-partner-rail {
  position: relative;
  min-width: 0;
  overflow: hidden;
  padding: 0;
}

.landing-partner-rail::before,
.landing-partner-rail::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 2;
  width: 70px;
  pointer-events: none;
}

.landing-partner-rail::before {
  left: 0;
  background: linear-gradient(90deg, #fff, rgba(255, 255, 255, 0));
}

.landing-partner-rail::after {
  right: 0;
  background: linear-gradient(270deg, #fff, rgba(255, 255, 255, 0));
}

.landing-partner-track {
  display: flex;
  width: max-content;
  gap: 16px;
  animation: landingPartnerScroll 28s linear infinite;
}

.landing-partner-rail:hover .landing-partner-track {
  animation-play-state: paused;
}

.landing-partner-rail.is-static::before,
.landing-partner-rail.is-static::after {
  display: none;
}

.landing-partner-rail.is-static .landing-partner-track {
  width: 100%;
  justify-content: flex-start;
  animation: none;
}

.landing-partner-rail.is-static .landing-partner-card {
  width: min(100%, 310px);
}

@keyframes landingPartnerScroll {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50% - 8px));
  }
}

.landing-partner-card {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  width: clamp(260px, 24vw, 310px);
  min-height: 250px;
  padding: 0;
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-md);
  background: #fff;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.landing-partner-visual {
  grid-area: visual;
  display: block;
  height: 92px;
  background-image: var(--partner-card-image);
  background-position: center top;
  background-size: cover;
  border-bottom: 1px solid var(--landing-border);
}

.landing-partner-card:hover {
  border-color: var(--landing-border-strong);
  transform: translateY(-2px);
}

.landing-partner-card-head {
  grid-area: head;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 0;
  padding: 14px 16px 12px;
  border-bottom: 1px solid var(--landing-border);
}

.landing-partner-type-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0 0 8px;
}

.landing-partner-type {
  display: inline-flex;
  width: fit-content;
  min-height: 22px;
  align-items: center;
  margin: 0;
  padding: 0 8px;
  border: 1px solid rgba(26, 95, 168, 0.22);
  border-radius: 999px;
  background: var(--landing-info-bg);
  color: var(--landing-info-text);
  font-size: 11px;
  font-weight: 800;
}

.landing-partner-name {
  display: block;
  margin: 0 0 6px;
  color: var(--landing-text);
  font-size: 24px;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0;
}

.landing-partner-tagline {
  display: block;
  margin: 0;
  color: #27394a;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.55;
}

.landing-partner-summary {
  grid-area: summary;
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

.landing-partner-card-foot {
  grid-area: foot;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: auto;
  padding: 12px 16px 16px;
}

.landing-partner-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 30px;
  padding: 0 11px;
  border: 1px solid rgba(26, 95, 168, 0.18);
  border-radius: 999px;
  background: #fff;
  color: var(--landing-text);
  font-size: 12px;
  font-weight: 700;
}

.landing-partner-cta::after {
  content: '';
  width: 8px;
  height: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.landing-activities {
  padding-top: 34px;
  padding-bottom: 34px;
}

.landing-activity-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 22px;
}

.landing-activity-head .landing-lead {
  max-width: 610px;
  margin-bottom: 0;
}

.landing-activity-directory-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  min-height: 38px;
  margin-top: 2px;
  padding: 0 14px;
  border: 1px solid var(--landing-border);
  border-radius: 999px;
  background: var(--landing-bg);
  color: var(--landing-text);
  font-size: 13px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
}

.landing-activity-directory-link:hover,
.landing-activity-directory-link:focus-visible {
  border-color: var(--landing-border-strong);
  background: var(--landing-bg2);
  outline: none;
}

.landing-activity-directory-link::after {
  content: '';
  width: 8px;
  height: 8px;
  margin-left: 8px;
  border-top: 1.5px solid currentColor;
  border-right: 1.5px solid currentColor;
  transform: rotate(45deg);
}

.landing-activity-rail {
  display: flex;
  gap: 16px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 2px 2px 16px;
  margin: -2px -2px -14px;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 2px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(26, 95, 168, 0.24) transparent;
}

.landing-activity-rail::-webkit-scrollbar {
  height: 6px;
}

.landing-activity-rail::-webkit-scrollbar-track {
  background: transparent;
}

.landing-activity-rail::-webkit-scrollbar-thumb {
  border-radius: 999px;
  background: rgba(26, 95, 168, 0.22);
}

.landing-activity-card {
  display: grid;
  flex: 0 0 min(352px, calc(100vw - 56px));
  grid-template-columns: 118px minmax(0, 1fr);
  min-height: 220px;
  overflow: hidden;
  border: 1px solid var(--landing-border);
  border-radius: var(--landing-radius-md);
  background: #fff;
  color: var(--landing-text);
  scroll-snap-align: start;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;
}

.landing-activity-card:hover,
.landing-activity-card:focus-visible {
  border-color: var(--landing-border-strong);
  outline: none;
  transform: translateY(-2px);
}

.landing-activity-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 100%;
  padding: 0;
  border-right: 1px solid var(--landing-border);
  background: #fff;
}

.landing-activity-image {
  width: 100%;
  height: 100%;
  min-height: 220px;
  object-fit: cover;
  object-position: center;
}

.landing-activity-body {
  display: flex;
  min-width: 0;
  flex-direction: column;
  justify-content: center;
  gap: 9px;
  padding: 16px 16px 15px;
}

.landing-activity-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;
}

.landing-activity-status {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 9px;
  border-radius: 999px;
  background: var(--landing-info-bg);
  color: var(--landing-info-text);
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
}

.landing-activity-status.is-open {
  background: var(--landing-success-bg);
  color: var(--landing-success-text);
}

.landing-activity-status.is-active {
  background: var(--landing-info-bg);
  color: var(--landing-info-text);
}

.landing-activity-status.is-upcoming {
  background: #fff3d8;
  color: #825900;
}

.landing-activity-status.is-past {
  background: rgba(0, 0, 0, 0.06);
  color: #555;
}

.landing-activity-date {
  color: var(--landing-muted);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.45;
}

.landing-activity-title {
  display: block;
  color: var(--landing-text);
  font-size: 17px;
  font-weight: 800;
  line-height: 1.35;
  overflow-wrap: anywhere;
  word-break: normal;
}

.landing-activity-copy {
  display: -webkit-box;
  overflow: hidden;
  color: var(--landing-muted);
  font-size: 12px;
  line-height: 1.75;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
  border-radius: var(--landing-radius-md);
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
  border-radius: var(--landing-radius-md);
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
    padding: 0;
  }

  .landing-hero::before {
    inset: 10px;
    border-radius: 30px;
  }

  .landing-hero-slider,
  .landing-hero-slide {
    min-height: 568px;
  }

  .landing-hero-slide {
    padding: 68px 32px 88px;
  }

  .landing-hero-slide::after {
    background: linear-gradient(
      90deg,
      rgba(248, 251, 255, 0.99) 0%,
      rgba(248, 251, 255, 0.95) 42%,
      rgba(248, 251, 255, 0.58) 63%,
      rgba(248, 251, 255, 0.1) 82%,
      rgba(248, 251, 255, 0) 100%
    );
  }

  .landing-hero-slide--product::after {
    background: linear-gradient(
      90deg,
      rgba(247, 253, 250, 0.99) 0%,
      rgba(247, 253, 250, 0.95) 42%,
      rgba(247, 253, 250, 0.56) 63%,
      rgba(247, 253, 250, 0.1) 82%,
      rgba(247, 253, 250, 0) 100%
    );
  }

  .landing-hero-inner {
    width: min(100%, 560px);
  }

  .landing-hero-copy {
    max-width: none;
  }

  .landing-hero-title {
    max-width: 13.4em;
    font-size: clamp(34px, 4.7vw, 42px);
  }

  .landing-hero-body {
    max-width: 34em;
  }

  .landing-hero-backdrop {
    top: 57%;
    right: -96px;
    width: min(118%, 980px);
    height: 136%;
    opacity: 0.62;
    filter: saturate(0.92) contrast(0.92) brightness(1.04) drop-shadow(0 18px 28px rgba(15, 73, 128, 0.04));
    -webkit-mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.12) 28%,
      rgba(0, 0, 0, 0.82) 52%,
      rgba(0, 0, 0, 0.66) 78%,
      transparent 100%
    );
    mask-image: linear-gradient(
      90deg,
      transparent 0%,
      rgba(0, 0, 0, 0.12) 28%,
      rgba(0, 0, 0, 0.82) 52%,
      rgba(0, 0, 0, 0.66) 78%,
      transparent 100%
    );
  }

  .landing-hero-slide--partner .landing-hero-backdrop {
    top: 58%;
    right: -92px;
    width: min(116%, 960px);
  }

  .landing-hero-slide--product .landing-hero-backdrop {
    top: 57%;
    right: -104px;
    width: min(122%, 1000px);
  }

  .landing-hero-message-indicator {
    left: 32px;
    bottom: 42px;
  }

  .landing-hero-visual {
    min-height: 326px;
  }

  .landing-hero-visual::before {
    inset: 8% 4% 7% 10%;
  }

  .landing-hero-image {
    height: 326px;
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
    width: min(100%, 358px);
    max-width: 358px;
    margin-right: 0;
    margin-left: 16px;
    padding: 24px 0;
  }

  .landing-hero {
    width: min(100%, 358px);
    max-width: 358px;
    margin-right: 0;
    margin-left: 16px;
    padding: 0;
    --hero-title-height: 4.72em;
    --hero-body-height: 114px;
    --hero-tags-height: 112px;
  }

  .landing-hero::before {
    inset: 0;
    border-radius: 24px;
  }

  .landing-hero-inner {
    gap: 22px;
  }

  .landing-hero-title {
    max-width: 11em;
    font-size: 32px;
    line-height: 1.18;
  }

  .landing-hero-title-set--desktop,
  .landing-hero-body-set--desktop {
    display: none;
  }

  .landing-hero-title-set--mobile,
  .landing-hero-body-set--mobile {
    display: block;
  }

  .landing-hero-body {
    max-width: none;
    margin-bottom: 20px;
    font-size: 15px;
    line-height: 1.9;
    overflow-wrap: anywhere;
    word-break: normal;
    line-break: strict;
  }

  .landing-hero-slide {
    padding: 46px 20px 68px;
  }

  .landing-hero-slider,
  .landing-hero-slide {
    min-height: 628px;
  }

  .landing-hero-slide::after {
    background: linear-gradient(
      180deg,
      rgba(248, 251, 255, 0.99) 0%,
      rgba(248, 251, 255, 0.95) 46%,
      rgba(248, 251, 255, 0.76) 68%,
      rgba(248, 251, 255, 0.42) 100%
    );
  }

  .landing-hero-slide--product::after {
    background: linear-gradient(
      180deg,
      rgba(247, 253, 250, 0.99) 0%,
      rgba(247, 253, 250, 0.95) 46%,
      rgba(247, 253, 250, 0.76) 68%,
      rgba(247, 253, 250, 0.42) 100%
    );
  }

  .landing-hero-backdrop,
  .landing-hero-slide--partner .landing-hero-backdrop,
  .landing-hero-slide--product .landing-hero-backdrop {
    top: auto;
    right: -238px;
    bottom: 36px;
    width: 178%;
    height: 360px;
    opacity: 0.24;
    transform: none;
    -webkit-mask-image: radial-gradient(
      ellipse at 64% 50%,
      #000 0%,
      #000 44%,
      rgba(0, 0, 0, 0.62) 64%,
      transparent 86%
    );
    mask-image: radial-gradient(
      ellipse at 64% 50%,
      #000 0%,
      #000 44%,
      rgba(0, 0, 0, 0.62) 64%,
      transparent 86%
    );
  }

  .landing-hero-message-indicator {
    left: 20px;
    bottom: 36px;
  }

  .landing-hero-actions {
    gap: 8px;
    margin-bottom: 18px;
  }

  .landing-hero-primary,
  .landing-hero-secondary {
    min-height: 38px;
    padding: 0 14px;
    font-size: 12px;
  }

  .landing-hero-tags,
  .landing-tag-row {
    width: 100%;
    max-width: 100%;
  }

  .landing-tag {
    max-width: 100%;
    white-space: normal;
  }

  .landing-hero-visual {
    min-height: 252px;
  }

  .landing-hero-visual::before {
    inset: 8% 0 7% 8%;
    border-radius: 24px;
  }

  .landing-hero-image {
    height: 252px;
    filter: drop-shadow(0 18px 26px rgba(15, 73, 128, 0.12));
  }

  .landing-hero-visual-label {
    right: 12px;
    bottom: 2px;
    min-height: 34px;
    padding: 0 10px;
  }

  .landing-hero-visual-label strong {
    display: none;
  }

  .landing-line-mini-grid,
  .landing-diff-grid,
  .landing-target-grid {
    grid-template-columns: 1fr;
  }

  .landing-partner-rail::before,
  .landing-partner-rail::after {
    width: 36px;
  }

  .landing-partner-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .landing-partner-head .landing-lead {
    max-width: none;
  }

  .landing-partner-directory-link {
    width: 100%;
  }

  .landing-activity-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;
  }

  .landing-activity-head .landing-lead {
    max-width: none;
  }

  .landing-activity-directory-link {
    width: 100%;
  }

  .landing-activity-card {
    flex-basis: min(342px, calc(100vw - 42px));
    grid-template-columns: 96px minmax(0, 1fr);
    min-height: 196px;
  }

  .landing-activity-image {
    min-height: 196px;
  }

  .landing-activity-body {
    gap: 7px;
    padding: 13px 13px 12px;
  }

  .landing-activity-title {
    font-size: 15px;
    line-height: 1.35;
  }

  .landing-activity-date,
  .landing-activity-copy {
    font-size: 11px;
  }

  .landing-partner-rail.is-static .landing-partner-card {
    display: flex;
    width: 100%;
    min-height: 0;
  }

  .landing-partner-rail.is-static .landing-partner-visual {
    height: 92px;
    min-height: 0;
    border-bottom: 1px solid var(--landing-border);
  }

  .landing-partner-card {
    width: 260px;
    min-height: 250px;
    padding: 0;
  }

  .landing-partner-card-head {
    justify-content: flex-start;
    padding: 14px 16px 12px;
  }

  .landing-partner-name {
    font-size: 24px;
  }

  .landing-partner-summary {
    padding: 12px 16px 0;
    -webkit-line-clamp: 2;
  }

  .landing-partner-card-foot {
    margin-top: auto;
    padding: 12px 16px 16px;
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
