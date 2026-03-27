<template>
  <div class="home">
    <section class="section hero" :style="heroBackgroundStyle">
      <div class="hero-overlay-shapes" :style="heroOverlayStyle" aria-hidden="true"></div>
      <div class="container hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">{{ hero.eyebrow }}</p>
          <h1>{{ hero.title }}</h1>
          <p class="subtitle">{{ hero.subtitle }}</p>
          <p class="core-message">{{ hero.coreMessage }}</p>
          <p class="stance">{{ hero.stance }}</p>
          <div class="cta-row">
            <a
              :href="links.lineMiniApp"
              class="btn btn-primary cta-primary"
              :target="linkTarget(links.lineMiniApp)"
              :rel="linkRel(links.lineMiniApp)"
            >
              <span>{{ hero.primaryCta }}</span>
              <img :src="heroCtaArrow" alt="" aria-hidden="true" />
            </a>
            <RouterLink :to="plannerRouteFor('firstPlan')" class="btn btn-secondary">
              {{ hero.secondaryCta }}
            </RouterLink>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-product-shell">
            <div class="hero-product-glow" aria-hidden="true"></div>
            <img class="hero-product-image" :src="heroShowcase.src" :alt="heroShowcase.alt" />
          </div>
          <div class="hero-results">
            <article v-for="item in heroResults" :key="item.label" class="result-card">
              <p class="result-label">{{ item.label }}</p>
              <p class="result-value">{{ item.value }}</p>
              <p class="result-note">{{ item.note }}</p>
            </article>
          </div>
        </div>
      </div>
      <div class="container line-mini-strip">
        <article v-for="item in lineMiniItems" :key="item.title" class="line-mini-card">
          <div class="line-mini-thumb-shell">
            <img class="line-mini-thumb" :src="item.src" :alt="item.alt" />
          </div>
          <div class="line-mini-content">
            <p class="line-mini-title">{{ item.title }}</p>
            <p class="line-mini-body">{{ item.body }}</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section dense-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ features.eyebrow }}</p>
          <h2 class="section-title">{{ features.title }}</h2>
          <p class="section-description">{{ features.lead }}</p>
        </div>
        <div class="card-grid why-grid">
          <article v-for="point in featureCards" :key="point.title" class="card why-card why-card-visual">
            <div class="why-visuals">
              <figure class="why-visual-frame">
                <span class="why-visual-label">{{ beforeLabel }}</span>
                <img :src="point.visual.problemSrc" :alt="point.visual.problemAlt" />
              </figure>
              <figure class="why-visual-frame why-visual-frame-solution">
                <span class="why-visual-label">{{ afterLabel }}</span>
                <img :src="point.visual.solutionSrc" :alt="point.visual.solutionAlt" />
              </figure>
            </div>
            <div class="why-card-copy">
              <h3>{{ point.title }}</h3>
              <p>{{ point.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section value-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ valueSection.eyebrow }}</p>
          <h2 class="section-title">{{ valueSection.title }}</h2>
          <p class="section-description">{{ valueSection.lead }}</p>
        </div>
        <div class="value-story-grid">
          <article v-for="story in valueStories" :key="story.title" class="value-story-card">
            <div class="value-story-media">
              <img :src="story.src" :alt="story.alt" />
            </div>
            <div class="value-story-copy">
              <p class="value-story-kicker">{{ story.kicker }}</p>
              <h3>{{ story.title }}</h3>
              <p>{{ story.body }}</p>
            </div>
          </article>
        </div>
        <div class="card-grid why-grid">
          <article v-for="point in valueItems" :key="point.title" class="card why-card">
            <h3>{{ point.title }}</h3>
            <p>{{ point.body }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section proof-section">
      <div class="container">
        <div class="section-heading">
          <p class="eyebrow">{{ proof.eyebrow }}</p>
          <h2 class="section-title">{{ proof.title }}</h2>
          <p class="section-description">{{ proof.lead }}</p>
        </div>
        <div class="card-grid proof-grid">
          <article v-for="metric in proofCards" :key="metric.title" class="card proof-card">
            <div class="proof-card-media">
              <img :src="metric.visual.src" :alt="metric.visual.alt" />
            </div>
            <div class="proof-card-copy">
              <p class="metric-title">{{ metric.title }}</p>
              <p class="metric-value">{{ metric.value }}</p>
              <p class="metric-note">{{ metric.note }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section dense-section cta-section">
      <div class="container cta-shell">
        <div class="cta-copy">
          <p class="eyebrow">{{ cta.eyebrow }}</p>
          <h2 class="section-title">{{ cta.title }}</h2>
          <p class="section-description">{{ cta.body }}</p>
        </div>
        <div class="cta-actions">
          <RouterLink
            v-for="action in ctaActions"
            :key="action.routeKey"
            :to="plannerRouteFor(action.routeKey)"
            class="btn"
            :class="buttonClass(action.variant)"
          >
            {{ action.label }}
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import { useI18n } from '../composables/useI18n';
import { ctaLinks } from '../data/ctaLinks';
import heroOverlayShapes from '../assets/hero/hero-overlay-shapes.svg';
import heroCtaArrow from '../assets/hero/hero-cta-arrow.svg';

const { currentLocale, dictionary } = useI18n();

const links = ctaLinks;
const isExternalLink = (href) => /^https?:\/\//.test(href);
const linkTarget = (href) => (isExternalLink(href) ? '_blank' : null);
const linkRel = (href) => (isExternalLink(href) ? 'noopener' : null);
const plannerRouteFor = (routeKey) => links.plannerRoutes?.[routeKey] ?? '/';
const localeText = (messages) => messages[currentLocale.value] ?? messages.ja ?? messages.en ?? messages.zh ?? '';

const buttonClass = (variant) => {
  if (variant === 'secondary') return 'btn-secondary';
  if (variant === 'ghost') return 'btn-ghost';
  return 'btn-primary';
};

const lineMiniCatalog = [
  {
    src: '/socialmore-assets/line-mini/no-install.png',
    title: {
      ja: 'インストール不要',
      en: 'No app install required',
      zh: '无需安装 App'
    },
    body: {
      ja: 'LINEを開くだけで参加導線に入れます。新規アプリ導入による離脱を抑えます。',
      en: 'Participants enter directly from LINE without being forced into a separate app install.',
      zh: '参与者直接从 LINE 进入，无需额外下载 App，减少第一步流失。'
    },
    alt: {
      ja: 'インストール不要で利用できる画面イメージ',
      en: 'Illustration of using the service without a separate app install',
      zh: '无需额外安装即可使用的界面示意'
    }
  },
  {
    src: '/socialmore-assets/line-mini/familiar-line.png',
    title: {
      ja: '使い慣れたLINE導線',
      en: 'A familiar LINE-native flow',
      zh: '基于熟悉的 LINE 流程'
    },
    body: {
      ja: '普段使っているLINEの体験上で案内できるので、説明コストを抑えられます。',
      en: 'Operational guidance stays inside a channel users already know, reducing explanation overhead.',
      zh: '在用户已习惯的 LINE 里完成引导，减少额外说明成本。'
    },
    alt: {
      ja: '使い慣れたLINEの画面で使えるイメージ',
      en: 'Illustration of using the service in a familiar LINE interface',
      zh: '在熟悉的 LINE 界面中使用的示意'
    }
  },
  {
    src: '/socialmore-assets/line-mini/in-line-flow.png',
    title: {
      ja: 'LINE内で完結',
      en: 'Complete the flow inside LINE',
      zh: '流程在 LINE 内闭环'
    },
    body: {
      ja: '申込から案内、当日の連絡までを同じ導線でつなぎ、途中離脱を減らします。',
      en: 'Registration, reminders, and day-of communication stay connected in one operational path.',
      zh: '从报名到提醒再到当天通知，全部保持在同一条路径里，降低中途流失。'
    },
    alt: {
      ja: 'LINE内で一連の流れが完結するイメージ',
      en: 'Illustration of a complete workflow that stays inside LINE',
      zh: '流程在 LINE 内完整闭环的示意'
    }
  }
];

const featureVisualCatalog = [
  {
    problemSrc: '/socialmore-assets/pain/management-problem.png',
    solutionSrc: '/socialmore-assets/pain/management-solution.png',
    problemAlt: {
      ja: '複数ツールに分散した運営のイメージ',
      en: 'Illustration of fragmented operations across multiple tools',
      zh: '运营分散在多个工具中的示意'
    },
    solutionAlt: {
      ja: 'MOREで一元管理された運営のイメージ',
      en: 'Illustration of unified operations managed in MORE',
      zh: '通过 MORE 统一管理运营的示意'
    }
  },
  {
    problemSrc: '/socialmore-assets/pain/payment-problem.png',
    solutionSrc: '/socialmore-assets/pain/payment-solution.png',
    problemAlt: {
      ja: '入金確認に手間がかかるイメージ',
      en: 'Illustration of time-consuming payment confirmation work',
      zh: '收款确认繁琐的示意'
    },
    solutionAlt: {
      ja: '支払い状況をまとめて確認できるイメージ',
      en: 'Illustration of consolidated payment status tracking',
      zh: '统一查看支付状态的示意'
    }
  },
  {
    problemSrc: '/socialmore-assets/pain/dropoff-problem.png',
    solutionSrc: '/socialmore-assets/pain/dropoff-solution.png',
    problemAlt: {
      ja: '外部サービスへの移動で離脱するイメージ',
      en: 'Illustration of user drop-off when leaving for external services',
      zh: '跳转外部服务导致流失的示意'
    },
    solutionAlt: {
      ja: 'LINE内で完結して離脱を防ぐイメージ',
      en: 'Illustration of reducing drop-off by keeping the flow inside LINE',
      zh: '在 LINE 内完成流程以降低流失的示意'
    }
  },
  {
    problemSrc: '/socialmore-assets/pain/attendance-problem.png',
    solutionSrc: '/socialmore-assets/pain/attendance-solution.png',
    problemAlt: {
      ja: '当日の参加人数が見えにくいイメージ',
      en: 'Illustration of low visibility into day-of attendance',
      zh: '活动当天到场情况不清晰的示意'
    },
    solutionAlt: {
      ja: '参加状況を把握して準備しやすくなるイメージ',
      en: 'Illustration of clearer attendance visibility for better preparation',
      zh: '更清晰掌握到场情况、便于准备的示意'
    }
  }
];

const proofVisualCatalog = [
  {
    src: '/socialmore-assets/diff/line-only.png',
    alt: {
      ja: 'LINEだけで完結する導線のイメージ',
      en: 'Illustration of a workflow that runs entirely inside LINE',
      zh: '流程完全在 LINE 内完成的示意'
    }
  },
  {
    src: '/socialmore-assets/diff/event-coverage.png',
    alt: {
      ja: '幅広いイベント運営に対応するイメージ',
      en: 'Illustration of support across different event operation patterns',
      zh: '适用于多种活动运营场景的示意'
    }
  },
  {
    src: '/socialmore-assets/diff/fee-comparison.png',
    alt: {
      ja: '運営コスト比較のイメージ',
      en: 'Illustration of operational cost comparison',
      zh: '运营成本对比的示意'
    }
  },
  {
    src: '/socialmore-assets/diff/checkin-flow.png',
    alt: {
      ja: '受付導線をLINEで整えるイメージ',
      en: 'Illustration of a smoother LINE-based check-in flow',
      zh: '用 LINE 整理签到流程的示意'
    }
  }
];

const home = computed(() => dictionary.value.home ?? {});
const hero = computed(() => home.value.hero ?? {});
const heroResults = computed(() => (Array.isArray(hero.value.results) ? hero.value.results : []));
const features = computed(() => home.value.features ?? home.value.why ?? {});
const featureItems = computed(() => (Array.isArray(features.value.points) ? features.value.points : []));
const valueSection = computed(() => home.value.value ?? home.value.steps ?? {});
const valueItems = computed(() => {
  if (Array.isArray(valueSection.value.points)) return valueSection.value.points;
  if (Array.isArray(valueSection.value.items)) return valueSection.value.items;
  return [];
});
const proof = computed(() => home.value.proof ?? {});
const proofMetrics = computed(() => (Array.isArray(proof.value.metrics) ? proof.value.metrics : []));
const cta = computed(() => home.value.cta ?? {});
const ctaActions = computed(() => (Array.isArray(cta.value.actions) ? cta.value.actions : []));

const beforeLabel = computed(() =>
  localeText({
    ja: 'Before',
    en: 'Before',
    zh: 'Before'
  })
);

const afterLabel = computed(() =>
  localeText({
    ja: 'After',
    en: 'After',
    zh: 'After'
  })
);

const heroShowcase = computed(() => ({
  src: '/socialmore-assets/hero/home-hero-app.png',
  alt: localeText({
    ja: 'MOREのアプリ画面イメージ',
    en: 'Product mockup for the MORE LINE Mini App experience',
    zh: 'MORE LINE Mini App 产品界面示意'
  })
}));

const lineMiniItems = computed(() =>
  lineMiniCatalog.map((item) => ({
    src: item.src,
    title: localeText(item.title),
    body: localeText(item.body),
    alt: localeText(item.alt)
  }))
);

const featureCards = computed(() =>
  featureItems.value.map((point, index) => {
    const visual = featureVisualCatalog[index % featureVisualCatalog.length];
    return {
      ...point,
      visual: {
        problemSrc: visual.problemSrc,
        solutionSrc: visual.solutionSrc,
        problemAlt: localeText(visual.problemAlt),
        solutionAlt: localeText(visual.solutionAlt)
      }
    };
  })
);

const valueStories = computed(() => [
  {
    src: '/socialmore-assets/community/social-community.png',
    kicker: localeText({
      ja: 'Community',
      en: 'Community',
      zh: 'Community'
    }),
    title: localeText({
      ja: '単発参加で終わらない関係を育てる',
      en: 'Turn one-time attendance into an ongoing relationship',
      zh: '把一次参加，变成持续回来的关系'
    }),
    body: localeText({
      ja: '参加後フォローから次回案内までをつなげ、自然に戻ってきやすい導線をつくります。',
      en: 'Connect follow-up, reminders, and the next invitation so people have a clear reason to return.',
      zh: '把活动后的跟进、提醒和下一次邀请连起来，让参与者更自然地再次回来。'
    }),
    alt: localeText({
      ja: '継続参加が生まれるコミュニティのイメージ',
      en: 'Illustration of a community that keeps participants engaged over time',
      zh: '持续回流型社区关系的示意'
    })
  },
  {
    src: '/socialmore-assets/value/frequent-organizer.png',
    kicker: localeText({
      ja: 'Organizer',
      en: 'Organizer',
      zh: 'Organizer'
    }),
    title: localeText({
      ja: '繰り返し開催する主催者の運営基盤になる',
      en: 'Give repeat organizers an operating base they can reuse',
      zh: '为高频举办活动的主办方提供可复用的运营基盘'
    }),
    body: localeText({
      ja: '毎回ゼロから組み直さず、同じ流れで募集から通知、当日運営まで回せます。',
      en: 'Run recruitment, messaging, and day-of coordination through one repeatable operating pattern.',
      zh: '无需每次从零重搭流程，用同一套方式完成招募、通知和当天执行。'
    }),
    alt: localeText({
      ja: '定期開催する主催者の運営イメージ',
      en: 'Illustration of a repeat organizer running events on a steady system',
      zh: '高频主办方稳定运营活动的示意'
    })
  }
]);

const proofCards = computed(() =>
  proofMetrics.value.map((metric, index) => {
    const visual = proofVisualCatalog[index % proofVisualCatalog.length];
    return {
      ...metric,
      visual: {
        src: visual.src,
        alt: localeText(visual.alt)
      }
    };
  })
);

const heroBackgroundStyle = computed(() => ({
  backgroundImage: [
    'linear-gradient(140deg, rgba(5, 15, 30, 0.96), rgba(14, 79, 128, 0.9))',
    'radial-gradient(circle at 18% 20%, rgba(37, 183, 176, 0.24), transparent 34%)',
    'radial-gradient(circle at 80% 12%, rgba(255, 198, 90, 0.18), transparent 28%)'
  ].join(', ')
}));

const heroOverlayStyle = computed(() => ({
  backgroundImage: `url('${heroOverlayShapes}')`
}));

const seoTitle = computed(() => hero.value.title || 'SocialMore');
const seoDescription = computed(() => hero.value.subtitle || '');
const siteUrl = computed(() => (import.meta.env.VITE_SITE_URL || 'https://example.com').replace(/\/+$/, ''));
const pageUrl = computed(() => `${siteUrl.value}/`);

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
  document.title = seoTitle.value;
  upsertMeta('name', 'description', seoDescription.value);
  upsertMeta('property', 'og:title', seoTitle.value);
  upsertMeta('property', 'og:description', seoDescription.value);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:url', pageUrl.value);
};

watch([seoTitle, seoDescription, pageUrl], applySeo, { immediate: true });
</script>

<style scoped>
.hero {
  position: relative;
  padding-top: 4.5rem;
  padding-bottom: 2.75rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  color: #fff;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, rgba(11, 28, 46, 0.46), rgba(15, 138, 215, 0.18));
  z-index: 0;
}

.hero-overlay-shapes {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: min(1200px, 90%);
  opacity: 0.28;
  mix-blend-mode: screen;
  pointer-events: none;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.25rem;
  align-items: center;
  position: relative;
  z-index: 1;
  margin-bottom: 2rem;
}

.hero-grid > * {
  min-width: 0;
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 4vw, 3.1rem);
  margin-bottom: 1rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.core-message,
.stance {
  margin: 0 0 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  line-height: 1.6;
}

.stance {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.75);
}

.hero .eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.75rem;
  color: var(--color-accent);
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.hero-visual {
  display: grid;
  gap: 1rem;
  justify-items: flex-start;
}

.hero-product-shell {
  position: relative;
  width: min(520px, 100%);
  padding: 1rem;
  border-radius: 30px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 32px 80px rgba(3, 12, 23, 0.42);
  overflow: hidden;
}

.hero-product-glow {
  position: absolute;
  inset: auto 6% -12% 6%;
  height: 52%;
  background: radial-gradient(circle, rgba(37, 183, 176, 0.42), transparent 68%);
  filter: blur(18px);
  pointer-events: none;
}

.hero-product-image {
  position: relative;
  z-index: 1;
  width: 100%;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(7, 16, 31, 0.8);
}

.hero-results {
  width: min(430px, 100%);
  display: grid;
  gap: 0.9rem;
}

.result-card {
  background: rgba(4, 12, 24, 0.82);
  color: #fff;
  border-radius: 18px;
  padding: 1rem 1.1rem;
  box-shadow: 0 30px 60px rgba(3, 12, 23, 0.6);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.result-label {
  margin: 0;
  color: rgba(255, 255, 255, 0.68);
  letter-spacing: 0.08em;
  font-size: 0.78rem;
  text-transform: uppercase;
}

.result-value {
  margin: 0.25rem 0 0;
  font-size: 1.4rem;
  font-weight: 700;
}

.result-note {
  margin: 0.2rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.45;
  font-size: 0.86rem;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-image: linear-gradient(120deg, #0f8ad7, #25b7b0, #ffc65a);
  box-shadow: 0 18px 35px rgba(37, 183, 176, 0.35);
  text-align: center;
}

.cta-primary img {
  width: 20px;
  height: auto;
}

.line-mini-strip {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.line-mini-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 1rem;
  backdrop-filter: blur(12px);
  box-shadow: 0 24px 48px rgba(3, 12, 23, 0.28);
}

.line-mini-thumb-shell {
  margin-bottom: 0.9rem;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
}

.line-mini-thumb {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}

.line-mini-title {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  font-weight: 700;
}

.line-mini-body {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.6;
  font-size: 0.92rem;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 2rem;
  text-align: left;
}

.dense-section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

.why-grid,
.proof-grid {
  align-items: stretch;
}

.why-card-visual {
  display: grid;
  gap: 1rem;
}

.why-visuals {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.why-visual-frame {
  margin: 0;
  display: grid;
  gap: 0.55rem;
  padding: 0.75rem;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(15, 138, 215, 0.08), rgba(15, 138, 215, 0.02));
}

.why-visual-frame-solution {
  background: linear-gradient(180deg, rgba(37, 183, 176, 0.12), rgba(37, 183, 176, 0.04));
}

.why-visual-label {
  color: var(--color-primary);
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.why-visual-frame img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 14px;
}

.why-card-copy {
  display: grid;
  gap: 0.5rem;
}

.why-card h3 {
  margin: 0;
}

.why-card p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.value-section {
  background: linear-gradient(180deg, rgba(15, 138, 215, 0.04), rgba(37, 183, 176, 0.06));
}

.value-story-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
  margin-bottom: 1.5rem;
}

.value-story-card {
  display: grid;
  gap: 1rem;
  padding: 1rem;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 138, 215, 0.08);
  box-shadow: 0 20px 48px rgba(15, 138, 215, 0.08);
}

.value-story-media {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(15, 138, 215, 0.06);
}

.value-story-media img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.value-story-kicker {
  margin: 0 0 0.35rem;
  color: var(--color-primary);
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 700;
}

.value-story-copy h3 {
  margin: 0 0 0.5rem;
}

.value-story-copy p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.6;
}

.proof-section {
  background: #0d1c2e;
  color: #fff;
}

.proof-section .section-description {
  color: rgba(255, 255, 255, 0.7);
}

.proof-card {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border-radius: 18px;
  display: grid;
  gap: 1rem;
  overflow: hidden;
}

.proof-card-media {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.proof-card-media img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

.proof-card-copy {
  display: grid;
  gap: 0.2rem;
}

.metric-title {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.84rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.metric-value {
  margin: 0.45rem 0 0;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  font-weight: 700;
}

.metric-note {
  margin: 0.4rem 0 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.55;
}

.cta-section {
  background: linear-gradient(135deg, rgba(15, 138, 215, 0.08), rgba(37, 183, 176, 0.08));
}

.cta-shell {
  display: grid;
  gap: 1.5rem;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.btn-ghost {
  border: 1px solid rgba(15, 138, 215, 0.3);
  background: transparent;
  color: var(--color-primary);
}

@media (min-width: 960px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
  }

  .hero-visual {
    justify-items: center;
  }
}

@media (max-width: 900px) {
  .line-mini-strip,
  .value-story-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .why-visuals {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .hero {
    padding-top: 4rem;
    padding-bottom: 2.25rem;
  }

  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    font-size: clamp(2rem, 7vw, 2.5rem);
  }

  .hero-product-shell,
  .hero-results {
    width: 100%;
  }

  .result-card {
    padding: 1.25rem;
    border-radius: 16px;
  }

  .cta-row,
  .cta-actions {
    flex-direction: column;
  }

  .cta-row .btn,
  .cta-actions .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
