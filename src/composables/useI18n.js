import { reactive, computed } from 'vue';

const getValueByPath = (obj, path) => {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return acc[key];
    }
    return undefined;
  }, obj);
};

export const messages = {
  ja: {
    nav: {
      home: 'ホーム',
      about: '会社紹介',
      services: 'サービス',
      news: 'ニュース',
      contact: 'お問い合わせ'
    },
    buttons: {
      viewServices: 'サービスを見る',
      contactUs: 'お問い合わせ',
      learnMore: '詳しく見る',
      readMore: '続きを読む'
    },
    home: {
      hero: {
        title: '外国人と地域をつなぐ、やさしいテックプラットフォーム',
        subtitle:
          'コミュニティイベントと会員管理SaaSを一体化し、在日外国人が安心して働き暮らせる仕組みを提供します。自治体・企業・コミュニティの協働を促進します。',
        primaryCta: 'サービスを見る',
        secondaryCta: 'お問い合わせ'
      },
      valuesTitle: '注力している領域',
      valuesDescription: 'SaaSとコミュニティ運営を組み合わせ、外国人と地域の信頼を育む3つの柱。',
      values: [
        {
          title: 'コミュニティとイベント',
          description: '地域のコミュニティが複数言語でイベントを開催し、外国人住民が参加しやすい場をつくります。'
        },
        {
          title: '会員管理SaaS',
          description: 'クラウド上でメンバーシップと決済を管理し、通知やレポートを自動化します。'
        },
        {
          title: '外国人労働者支援',
          description: 'キャリア相談やスキルアップ講座で、日本での生活と仕事を総合的にサポートします。'
        }
      ],
      highlightsTitle: 'プロダクトハイライト',
      highlightsDescription: '自治体・コミュニティ・企業のワークフローを1つの画面で見渡せる最新モジュール。',
      productHighlights: [
        {
          title: 'シンプルなイベント管理',
          body: 'ドラッグ＆ドロップで日程を作成し、QRチェックインやリアルタイム参加状況を表示。'
        },
        {
          title: 'オンライン決済と会費',
          body: '会費やイベント料金を多言語のUIでオンライン収納。領収書の自動送信も実装。'
        },
        {
          title: '多言語サポート',
          body: '日本語・英語・ベトナム語などを含むコミュニケーションテンプレートを提供。'
        }
      ],
      newsTitle: '最新ニュース',
      newsDescription: 'サービスのアップデートやイベントレポートをお届けします。'
    },
    about: {
      title: '会社紹介',
      visionTitle: 'ビジョン',
      visionText:
        'テクノロジーを通じて、在日外国人が安心して働き、暮らし、地域とつながる社会をつくります。',
      missionTitle: 'ミッションと価値観',
      values: [
        { title: '信頼', body: '透明性のあるデータ運用と伴走型サポートで、関係者すべてに信頼される存在に。' },
        { title: '包摂', body: '言語や文化の違いを越えたコミュニケーションの橋渡しをします。' },
        { title: '地域連携', body: '自治体・NPO・企業がシームレスに協働できる仕組みを構築します。' },
        { title: '学び', body: '利用者の声を機能改善に反映し、進化し続けるサービスを届けます。' }
      ],
      timelineTitle: 'マイルストーン',
      timeline: [
        { year: '2022', text: '東京都三鷹市で創業。多文化共生イベントからサービス開発を開始。' },
        { year: '2023', text: 'コミュニティ向けSaaS β版を提供。複数自治体とのPoCを実施。' },
        { year: '2024', text: '企業向け外国人材サポートモジュールをリリースし、提携社数が拡大。' }
      ],
      galleryTitle: '現場の様子',
      galleryDescription: 'オフィスやイベントの写真を通して、SOCIALMOREの雰囲気を伝える予定です。',
      galleryPhotos: [
        {
          file: 'photo-office-01.jpg',
          caption: 'photo-office-01.jpg｜オフィスでの協働風景'
        },
        {
          file: 'photo-event-01.jpg',
          caption: 'photo-event-01.jpg｜コミュニティイベントの模様'
        },
        {
          file: 'photo-team-portrait.jpg',
          caption: 'photo-team-portrait.jpg｜チーム集合写真'
        }
      ]
    },
    services: {
      title: 'サービス',
      communityTitle: 'コミュニティ向け',
      companyTitle: '企業向け',
      iconHighlights: [
        {
          title: '会員管理SaaS',
          description: '会費決済や会員証を一元管理し、主要ダッシュボードに表示する基幹モジュール。',
          iconKey: 'membership'
        },
        {
          title: 'コミュニティ／外国人支援',
          description: '地域の相談窓口やイベント連携を象徴する会話バブル型のアイコンを使用。',
          iconKey: 'community'
        },
        {
          title: '企業向けAIスキルアップ',
          description: '研修・学習の進捗を示すAIチップ＋矢印のアイコンで人材育成を表現。',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: '会員管理クラウド',
          bullets: ['会員データベース', '自動決済リマインド', '活動レポート作成']
        },
        {
          title: 'イベント＆RSVP',
          bullets: ['多言語イベントページ', 'QRチェックイン', 'キャンセル待ち管理']
        },
        {
          title: 'コミュニケーションハブ',
          bullets: ['テンプレートメッセージ', '自動翻訳メモ', '地域情報の共有']
        }
      ],
      companyCards: [
        {
          title: 'スキルトレーニング',
          bullets: ['日本語＆ビジネスマナー研修', 'メンター紹介', 'オンライン教材']
        },
        {
          title: '人材マッチング',
          bullets: ['スキルタグ検索', '求人投稿管理', '面談スケジューラー']
        },
        {
          title: 'オンボーディングサポート',
          bullets: ['生活情報ガイド', '社員向けカルチャー講座', 'FAQチャットボット']
        }
      ],
      plansTitle: 'プラン例',
      plans: [
        {
          name: 'スターター',
          description: '小規模団体や新規導入向け',
          bullets: ['最大500名の会員', 'イベント作成3本まで', 'メールサポート']
        },
        {
          name: 'プロ',
          description: '継続活用を想定した人気プラン',
          bullets: ['無制限イベント', '多拠点管理', '専任カスタマーサクセス']
        },
        {
          name: 'エンタープライズ',
          description: '大規模自治体・企業向け',
          bullets: ['API連携', 'SSO対応', '24時間サポート']
        }
      ]
    },
    news: {
      title: 'ニュース',
      intro: '最新のリリース情報やコミュニティ連携事例をチェックしてください。'
    },
    contact: {
      title: 'お問い合わせ',
      intro: '導入やパートナーシップに関するご相談を受け付けています。',
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        organization: '所属（任意）',
        inquiryType: 'お問い合わせ種別',
        message: 'メッセージ',
        submit: '送信する',
        success: 'お問い合わせありがとうございました。（このフォームはデモであり、実際には送信されません。）'
      },
      inquiryOptions: [
        'コミュニティSaaSについて',
        '企業向け研修・採用支援',
        'パートナーシップ',
        'その他'
      ],
      info: {
        company: '株式会社創翔モア SOCIALMORE',
        location: '東京都三鷹市',
        email: 'info@example.com',
        encouragement: '自治体・企業・コミュニティ・個人の皆さまからのお問い合わせをお待ちしています。'
      }
    },
    footer: {
      company: '株式会社創翔モア SOCIALMORE',
      rights: '© 2025 SOCIALMORE. All rights reserved.',
      privacy: 'プライバシーポリシー',
      terms: '利用規約'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      news: 'News',
      contact: 'Contact'
    },
    buttons: {
      viewServices: 'View Services',
      contactUs: 'Contact us',
      learnMore: 'Learn more',
      readMore: 'Read more'
    },
    home: {
      hero: {
        title: 'A friendly tech platform connecting foreign residents and local communities',
        subtitle:
          'We unify community engagement and SaaS tools so foreign workers in Japan can live and work confidently while cities, NPOs, and companies collaborate seamlessly.',
        primaryCta: 'View Services',
        secondaryCta: 'Contact us'
      },
      valuesTitle: 'Focus areas',
      valuesDescription: 'Three pillars that combine SaaS workflows with community trust building.',
      values: [
        {
          title: 'Community & Events',
          description: 'Local hosts design multilingual activities so residents from abroad can join and feel at home.'
        },
        {
          title: 'Membership SaaS',
          description: 'Manage memberships, payments, and reports in the cloud with automated reminders.'
        },
        {
          title: 'Worker Support',
          description: 'Career coaching and life-support content help foreign professionals thrive in Japan.'
        }
      ],
      highlightsTitle: 'Product highlights',
      highlightsDescription: 'A look at the modules that keep local governments, communities, and employers aligned.',
      productHighlights: [
        {
          title: 'Simple event management',
          body: 'Create schedules in minutes, track attendance live, and issue QR passes.'
        },
        {
          title: 'Online payment & dues',
          body: 'Collect membership fees securely with multilingual checkout and instant receipts.'
        },
        {
          title: 'Multilingual support',
          body: 'Templates and translation-ready tools for English, Japanese, Vietnamese, and more.'
        }
      ],
      newsTitle: 'Latest news',
      newsDescription: 'Updates on the platform, partnerships, and community stories.'
    },
    about: {
      title: 'About Us',
      visionTitle: 'Vision',
      visionText:
        'We use technology to help foreign residents in Japan work, live, and connect with local communities with confidence.',
      missionTitle: 'Mission & Values',
      values: [
        { title: 'Trust', body: 'Transparent data practices and guided onboarding build trust with every partner.' },
        { title: 'Inclusiveness', body: 'We bridge language and cultural gaps with warm, multilingual support.' },
        { title: 'Local Partnership', body: 'Municipalities, NPOs, and companies collaborate on one shared infrastructure.' },
        { title: 'Learning', body: 'Continuous feedback keeps the product evolving with the community.' }
      ],
      timelineTitle: 'Milestones',
      timeline: [
        { year: '2022', text: 'Founded in Mitaka, Tokyo after hosting multicultural community experiments.' },
        { year: '2023', text: 'Launched the beta SaaS for community organizers and completed municipal pilots.' },
        { year: '2024', text: 'Released enterprise modules for employers supporting international talent.' }
      ],
      galleryTitle: 'Scenes from our work',
      galleryDescription: 'Photos will showcase the office, training, and community events run by SOCIALMORE.',
      galleryPhotos: [
        {
          file: 'photo-office-01.jpg',
          caption: 'photo-office-01.jpg | Collaborating in our Tokyo workspace'
        },
        {
          file: 'photo-event-01.jpg',
          caption: 'photo-event-01.jpg | Community outreach event snapshot'
        },
        {
          file: 'photo-team-portrait.jpg',
          caption: 'photo-team-portrait.jpg | Core team portrait'
        }
      ]
    },
    services: {
      title: 'Products & Services',
      communityTitle: 'For community organizers',
      companyTitle: 'For companies & employers',
      iconHighlights: [
        {
          title: 'Membership SaaS',
          description: 'Core dashboard module that manages dues, IDs, and member analytics in one place.',
          iconKey: 'membership'
        },
        {
          title: 'Community & foreign resident support',
          description: 'Represents multilingual help desks and community care flows with dialogue bubbles.',
          iconKey: 'community'
        },
        {
          title: 'Corporate AI skill-up',
          description: 'Highlights AI training programs for employers with a chip + upward arrow motif.',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'Membership cloud',
          bullets: ['Unified member CRM', 'Automated payment reminders', 'Impact dashboards']
        },
        {
          title: 'Event + RSVP',
          bullets: ['Multilingual event pages', 'QR check-in', 'Waitlist control']
        },
        {
          title: 'Communication hub',
          bullets: ['Template messages', 'Auto-translation notes', 'Local info sharing']
        }
      ],
      companyCards: [
        {
          title: 'Skill training',
          bullets: ['Japanese & business etiquette', 'Mentor network', 'Online curriculum']
        },
        {
          title: 'Talent matching',
          bullets: ['Skill-tag search', 'Job posting manager', 'Interview scheduler']
        },
        {
          title: 'Onboarding support',
          bullets: ['Life info guides', 'Culture workshops', 'FAQ chatbot']
        }
      ],
      plansTitle: 'Sample plans',
      plans: [
        {
          name: 'Starter',
          description: 'Ideal for small teams getting started',
          bullets: ['Up to 500 members', 'Three active events', 'Email support']
        },
        {
          name: 'Pro',
          description: 'Popular plan for growing networks',
          bullets: ['Unlimited events', 'Multi-location admin', 'Dedicated success manager']
        },
        {
          name: 'Enterprise',
          description: 'For municipalities and large employers',
          bullets: ['API access', 'SSO ready', '24/7 support']
        }
      ]
    },
    news: {
      title: 'News',
      intro: 'Catch up on platform releases, pilots, and partner collaborations.'
    },
    contact: {
      title: 'Contact',
      intro: 'We welcome conversations about adoption, partnerships, and collaboration.',
      form: {
        name: 'Name',
        email: 'Email',
        organization: 'Organization (optional)',
        inquiryType: 'Type of inquiry',
        message: 'Message',
        submit: 'Send message',
        success: 'Thank you for your inquiry. (This form is a demo and does not actually send emails.)'
      },
      inquiryOptions: [
        'Community SaaS',
        'Corporate training & hiring',
        'Partnership',
        'Other'
      ],
      info: {
        company: 'SOCIALMORE Inc.',
        location: 'Mitaka, Tokyo',
        email: 'info@example.com',
        encouragement: 'Cities, companies, and community leaders are invited to reach out anytime.'
      }
    },
    footer: {
      company: 'SOCIALMORE Inc.',
      rights: '© 2025 SOCIALMORE. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use'
    }
  }
};

const state = reactive({
  locale: 'ja'
});

export function useI18n() {
  const currentLocale = computed(() => state.locale);
  const dictionary = computed(() => messages[state.locale]);

  const setLocale = (locale) => {
    if (messages[locale]) {
      state.locale = locale;
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('lang', locale);
      }
    }
  };

  const t = (path) => {
    const val = getValueByPath(messages[state.locale], path);
    if (val !== undefined) {
      return val;
    }
    const fallback = getValueByPath(messages.en, path);
    return fallback ?? path;
  };

  return {
    currentLocale,
    dictionary,
    setLocale,
    t
  };
}
