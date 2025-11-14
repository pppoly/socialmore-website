import { reactive, computed } from 'vue';

export const supportedLocales = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' }
];

const SUPPORTED_LOCALES = supportedLocales.map((locale) => locale.code);
const DEFAULT_LOCALE = 'ja';
const STORAGE_KEY = 'sm_locale';
const FALLBACK_LOCALES = ['ja', 'en'];

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
        secondaryCta: 'お問い合わせ',
        eyebrow: 'SOCIAL + SaaS',
        dashboard: {
          focusTag: 'コミュニティ',
          statusLabel: '稼働中',
          stats: [
            { label: '登録コミュニティ', value: '128', note: '各地域で展開' },
            { label: '外国人メンバー', value: '12k', note: '月間アクティブ' },
            { label: '企業パートナー', value: '54', note: '導入済み' }
          ]
        }
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
      eyebrow: 'SOCIALMORE',
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
      galleryDescription: 'オフィスやイベントの写真を通して、SOCIALMOREの雰囲気を伝えます。',
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
      eyebrow: 'プラットフォーム',
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
      eyebrow: '最新情報',
      title: 'ニュース',
      intro: '最新のリリース情報やコミュニティ連携事例をチェックしてください。'
    },
    contact: {
      eyebrow: 'お問い合わせ',
      title: 'お問い合わせ',
      intro: '導入やパートナーシップに関するご相談を受け付けています。',
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        organization: '所属（任意）',
        inquiryType: 'お問い合わせ種別',
        message: 'メッセージ',
        submit: '送信する',
        success: 'お問い合わせありがとうございました。（このフォームはデモであり、実際には送信されません。）',
        validation: {
          required: '必須項目です',
          email: '正しいメールアドレスを入力してください'
        }
      },
      inquiryOptions: ['コミュニティSaaSについて', '企業向け研修・採用支援', 'パートナーシップ', 'その他'],
      info: {
        company: '株式会社創翔モア SOCIALMORE',
        location: '東京都三鷹市',
        email: 'info@socialmore.jp',
        encouragement: '自治体・企業・コミュニティ・個人の皆さまからのお問い合わせをお待ちしています。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（株式会社創翔モア）',
        address: '東京都三鷹市を拠点に事業を展開しています。',
        registration: '法人番号などの登録情報はお問い合わせに応じて開示いたします。'
      },
      contact: {
        title: 'お問い合わせ',
        emailLabel: 'メール',
        email: 'info@socialmore.jp',
        phoneLabel: '電話',
        phone: '050-0000-0000',
        hours: '平日 10:00-18:00（祝日を除く）'
      },
      links: {
        title: 'リーガル',
        privacy: 'プライバシーポリシー',
        terms: '利用規約'
      },
      copyright: '© 2024 SOCIALMORE Inc. All rights reserved.'
    },
    legal: {
      privacy: {
        title: 'プライバシーポリシー',
        updated: '最終更新日：2024年4月1日',
        intro:
          'SOCIALMORE（以下、「当社」）は、サービスを安全かつ継続的に提供するために、個人情報の適切な管理に努めます。本ポリシーは、当社が取得する情報の種類と利用方法について説明するものです。',
        sections: [
          {
            title: '1. 収集する情報',
            body: [
              '当社はサービスの提供、改善、および安全な運営のために必要な範囲で個人情報を収集します。',
              '主に次の情報が含まれます。'
            ],
            bullets: [
              'アカウント登録情報（氏名、メールアドレス、所属団体、希望言語など）',
              '利用状況データ（アクセスログ、ブラウザ種別、デバイス情報、閲覧履歴など）',
              'お問い合わせ内容やサポート履歴',
              '決済に必要な情報（決済代行事業者を通じて取得し、クレジットカード番号等は保存しません）'
            ]
          },
          {
            title: '2. 利用目的',
            body: ['収集した情報は、サービス提供、本人確認、不正防止、機能改善、重要なお知らせやサポート連絡のために利用します。']
          },
          {
            title: '3. 第三者提供・委託',
            body: [
              '当社は、決済処理、インフラ運用、分析ツールなど信頼できる業務委託先と必要な範囲で情報を共有することがあります。',
              '委託先は契約に基づき、当社の指示範囲でのみ情報を取り扱います。'
            ]
          },
          {
            title: '4. 保管と安全管理',
            body: [
              'データは日本国内または適切な保護水準が認められた地域のサーバーに保管されます。',
              'アクセス制御、暗号化、監査ログ等の安全管理措置を講じ、紛失・漏えいの防止に努めます。'
            ]
          },
          {
            title: '5. 利用者の権利',
            body: [
              'ご本人からの請求に応じ、法令の範囲で保有個人データの開示、訂正、削除等に対応します。',
              'これらの手続きを希望される場合は下記お問い合わせ窓口までご連絡ください。'
            ]
          },
          {
            title: '6. クッキー等',
            body: [
              '当社サイトでは、言語設定の保持や利用状況の把握のためにクッキーや類似技術を使用することがあります。',
              'ブラウザの設定でクッキーを無効化できますが、一部機能に制限が生じる場合があります。'
            ]
          },
          {
            title: '7. ポリシーの更新',
            body: [
              '本ポリシーの内容は、法令の改正やサービス変更に伴い改訂されることがあります。',
              '重要な変更がある場合は、本ページで周知するとともに適切な方法で通知します。'
            ]
          },
          {
            title: '8. お問い合わせ',
            body: ['プライバシーに関するご質問は info@socialmore.jp までお寄せください。']
          }
        ]
      },
      terms: {
        title: '利用規約',
        updated: '最終更新日：2024年4月1日',
        intro: '本利用規約（以下、「本規約」）は、当社が提供するウェブサイトおよび関連サービスの利用条件を定めるものです。利用者は本規約に同意した上でサービスをご利用ください。',
        sections: [
          { title: '1. 適用範囲', body: ['本規約は、当社が提供するすべてのオンラインサービスに適用されます。'] },
          {
            title: '2. アカウント管理',
            body: [
              '利用者は登録情報を最新かつ正確に保つ責任を負います。',
              'アカウントの不正利用が疑われる場合は速やかに当社へ連絡してください。'
            ]
          },
          {
            title: '3. 禁止事項',
            body: [
              '法令違反、ハラスメント、知的財産権侵害、不正アクセスなど、他者や当社の権利を侵害する行為は禁止します。'
            ]
          },
          {
            title: '4. サービス変更・停止',
            body: ['当社は事前の予告なく、サービス内容の変更、一時停止、提供終了を行うことがあります。']
          },
          {
            title: '5. 免責事項',
            body: [
              '当社は、サービスが常に無停止で提供されること、特定の目的への適合性などを保証しません。',
              '利用者が被った損害について、当社の故意または重過失がない限り責任を負いません。',
              'やむを得ず責任を負う場合も、直接かつ通常の損害に限り、過去12か月間に利用者が支払った金額を上限とします。'
            ]
          },
          {
            title: '6. 知的財産',
            body: ['本サービスに関するすべての知的財産権は当社または正当な権利者に帰属します。']
          },
          {
            title: '7. 準拠法と管轄',
            body: ['本規約は日本法を準拠法とし、紛争が生じた場合は東京地方裁判所を第一審の専属管轄裁判所とします。']
          },
          {
            title: '8. 連絡先',
            body: ['本規約に関するお問い合わせは info@socialmore.jp までご連絡ください。']
          }
        ]
      }
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
      viewServices: 'View services',
      contactUs: 'Contact us',
      learnMore: 'Learn more',
      readMore: 'Read more'
    },
    home: {
      hero: {
        title: 'A friendly tech platform connecting foreign residents and local communities',
        subtitle:
          'We unify community engagement and SaaS tools so foreign workers in Japan can live and work confidently while cities, NPOs, and companies collaborate seamlessly.',
        primaryCta: 'View services',
        secondaryCta: 'Contact us',
        eyebrow: 'SOCIAL + SaaS',
        dashboard: {
          focusTag: 'Community',
          statusLabel: 'Live',
          stats: [
            { label: 'Communities', value: '128', note: 'active cities' },
            { label: 'Members', value: '12k', note: 'monthly active' },
            { label: 'Partners', value: '54', note: 'deployments' }
          ]
        }
      },
      valuesTitle: 'Focus areas',
      valuesDescription: 'Three pillars that blend SaaS workflows with community trust building.',
      values: [
        {
          title: 'Community and events',
          description: 'Local organizers host multilingual events so foreign residents can join with confidence.'
        },
        {
          title: 'Membership SaaS',
          description: 'Manage members and payments in the cloud with automated notifications and reports.'
        },
        {
          title: 'Support for workers',
          description: 'Career coaching and skill programs help foreign professionals thrive in Japan.'
        }
      ],
      highlightsTitle: 'Product highlights',
      highlightsDescription: 'Modern modules that let cities, communities, and companies share the same view.',
      productHighlights: [
        {
          title: 'Simple event operations',
          body: 'Drag-and-drop scheduling, QR check-in, and real-time attendance tracking.'
        },
        {
          title: 'Online payments',
          body: 'Collect dues and event fees in multiple languages with automatic receipts.'
        },
        {
          title: 'Multilingual support',
          body: 'Templates that cover Japanese, English, Vietnamese, and more community languages.'
        }
      ],
      newsTitle: 'Latest news',
      newsDescription: 'Updates about the platform, partnerships, and field projects.'
    },
    about: {
      eyebrow: 'SOCIALMORE',
      title: 'About us',
      visionTitle: 'Vision',
      visionText: 'Through technology we help foreign residents work, live, and stay connected to local communities.',
      missionTitle: 'Mission & values',
      values: [
        { title: 'Trust', body: 'Operate transparently with data and long-term support for every stakeholder.' },
        { title: 'Inclusion', body: 'Bridge languages and cultures so conversations stay open and respectful.' },
        { title: 'Local partnerships', body: 'Enable cities, NPOs, and companies to collaborate seamlessly.' },
        { title: 'Learning', body: 'Listen to community feedback and keep improving the service.' }
      ],
      timelineTitle: 'Milestones',
      timeline: [
        { year: '2022', text: 'Founded in Mitaka, Tokyo and started with multicultural events.' },
        { year: '2023', text: 'Released the beta SaaS for communities and ran PoC projects with cities.' },
        { year: '2024', text: 'Launched corporate support modules for foreign talent and expanded partnerships.' }
      ],
      galleryTitle: 'Field snapshots',
      galleryDescription: 'A glimpse of our office, events, and team moments.',
      galleryPhotos: [
        { file: 'photo-office-01.jpg', caption: 'photo-office-01.jpg | Collaboration in the office' },
        { file: 'photo-event-01.jpg', caption: 'photo-event-01.jpg | Community event scene' },
        { file: 'photo-team-portrait.jpg', caption: 'photo-team-portrait.jpg | Team portrait' }
      ]
    },
    services: {
      eyebrow: 'Platform',
      title: 'Products & services',
      communityTitle: 'For community organizers',
      companyTitle: 'For companies',
      iconHighlights: [
        {
          title: 'Membership SaaS',
          description: 'Core dashboard for dues, passes, and consolidated member records.',
          iconKey: 'membership'
        },
        {
          title: 'Community support',
          description: 'Icon set inspired by help desks and neighborhood meetups.',
          iconKey: 'community'
        },
        {
          title: 'AI skill programs',
          description: 'Chip-and-arrow icon showing career upskilling journeys.',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'Membership cloud',
          bullets: ['Member database', 'Automated payment reminders', 'Activity reports']
        },
        {
          title: 'Events & RSVP',
          bullets: ['Multilingual event pages', 'QR check-in', 'Waitlist tools']
        },
        {
          title: 'Communication hub',
          bullets: ['Template messages', 'Notes with translation', 'Local updates']
        }
      ],
      companyCards: [
        {
          title: 'Skill training',
          bullets: ['Japanese & business etiquette', 'Mentor network', 'Online lessons']
        },
        {
          title: 'Talent matching',
          bullets: ['Skill tags', 'Job posting management', 'Interview scheduling']
        },
        {
          title: 'Onboarding support',
          bullets: ['Life guide', 'Culture briefings', 'FAQ chatbot']
        }
      ],
      plansTitle: 'Sample plans',
      plans: [
        { name: 'Starter', description: 'For small teams', bullets: ['Up to 500 members', '3 events', 'Email support'] },
        { name: 'Pro', description: 'Most popular', bullets: ['Unlimited events', 'Multi-site admin', 'Dedicated CS'] },
        { name: 'Enterprise', description: 'For large orgs', bullets: ['API access', 'SSO', '24/7 support'] }
      ]
    },
    news: {
      eyebrow: 'Updates',
      title: 'News',
      intro: 'Platform releases, pilots, and stories from the field.'
    },
    contact: {
      eyebrow: 'Get in touch',
      title: 'Contact',
      intro: 'We welcome chats about adoption, pilots, and partnerships.',
      form: {
        name: 'Name',
        email: 'Email',
        organization: 'Organization (optional)',
        inquiryType: 'Inquiry type',
        message: 'Message',
        submit: 'Send message',
        success: 'Thank you for reaching out. (This form is a demo and does not actually send emails.)',
        validation: {
          required: 'This field is required',
          email: 'Please enter a valid email'
        }
      },
      inquiryOptions: ['Community SaaS', 'Corporate training & hiring', 'Partnership', 'Other'],
      info: {
        company: 'SOCIALMORE Inc.',
        location: 'Mitaka, Tokyo, Japan',
        email: 'info@socialmore.jp',
        encouragement: 'Cities, companies, community leaders, and individuals are all welcome to reach out.'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE Inc.',
        address: 'Based in Mitaka, Tokyo, Japan.',
        registration: 'Registration details are available upon request.'
      },
      contact: {
        title: 'Contact',
        emailLabel: 'Email',
        email: 'info@socialmore.jp',
        phoneLabel: 'Phone',
        phone: '+81-50-0000-0000',
        hours: 'Weekdays 10:00-18:00 JST'
      },
      links: {
        title: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use'
      },
      copyright: '© 2024 SOCIALMORE Inc. All rights reserved.'
    },
    legal: {
      privacy: {
        title: 'Privacy Policy',
        updated: 'Last updated: April 1, 2024',
        intro:
          'SOCIALMORE (“we”) is committed to protecting personal data so we can deliver a safe and reliable service. This policy explains what data we collect and how we use it.',
        sections: [
          {
            title: '1. Information we collect',
            body: ['We only collect the information needed to provide, secure, and improve the service.'],
            bullets: [
              'Account details such as name, email, organization, preferred language',
              'Usage data (access logs, browser type, device info, pages viewed)',
              'Inquiry and support history',
              'Payment information handled by trusted payment processors (we do not store card numbers)'
            ]
          },
          {
            title: '2. Purpose of use',
            body: ['We use the data for service delivery, identity verification, fraud prevention, improvements, and important notices.']
          },
          {
            title: '3. Third-party sharing',
            body: [
              'We may share limited data with vetted service providers such as payment processors, hosting, and analytics partners.',
              'Vendors are contractually obligated to handle data only within the agreed scope.'
            ]
          },
          {
            title: '4. Storage & security',
            body: [
              'Data is stored in Japan or regions with adequate protection.',
              'We apply access controls, encryption, and monitoring to prevent loss or leaks.'
            ]
          },
          {
            title: '5. User rights',
            body: [
              'You may request disclosure, correction, or deletion of your data as permitted by law.',
              'Contact us via the address below for such requests.'
            ]
          },
          {
            title: '6. Cookies',
            body: [
              'We use cookies to remember language choices and understand usage patterns.',
              'You can disable cookies in your browser, but some features may not work.'
            ]
          },
          {
            title: '7. Updates',
            body: ['We will update this policy when laws or services change and notify users of material updates.']
          },
          {
            title: '8. Contact',
            body: ['Questions about privacy? Email info@socialmore.jp.']
          }
        ]
      },
      terms: {
        title: 'Terms of Use',
        updated: 'Last updated: April 1, 2024',
        intro:
          'These Terms govern your use of the SOCIALMORE website and related services. Please read them carefully before using the service.',
        sections: [
          { title: '1. Scope', body: ['The Terms apply to all online services provided by SOCIALMORE.'] },
          {
            title: '2. Accounts',
            body: [
              'You are responsible for keeping registration details accurate.',
              'Notify us promptly if you suspect unauthorized use.'
            ]
          },
          {
            title: '3. Prohibited actions',
            body: ['No illegal, harassing, infringing, or unauthorized access activities.']
          },
          {
            title: '4. Service changes',
            body: ['We may change, suspend, or terminate the service without prior notice.']
          },
          {
            title: '5. Disclaimer',
            body: [
              'The service is provided “as is” without guarantees of uninterrupted availability.',
              'We are not liable for damages unless caused by our intentional or grossly negligent acts.',
              'If liability arises, it is limited to the amount you paid in the past 12 months for the service.'
            ]
          },
          {
            title: '6. Intellectual property',
            body: ['All IP related to the service belongs to SOCIALMORE or its licensors.']
          },
          {
            title: '7. Governing law',
            body: ['Japanese law governs these Terms. The Tokyo District Court has exclusive jurisdiction.']
          },
          {
            title: '8. Contact',
            body: ['Reach us at info@socialmore.jp for questions about these Terms.']
          }
        ]
      }
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于我们',
      services: '服务',
      news: '新闻',
      contact: '联系'
    },
    buttons: {
      viewServices: '查看服务',
      contactUs: '联系我们',
      learnMore: '了解更多',
      readMore: '阅读更多'
    },
    home: {
      hero: {
        title: '连接在日社群与地方伙伴的友好科技平台',
        subtitle: 'SOCIALMORE 将社群活动与 SaaS 工具结合，让在日外国人更安心地工作与生活，同时帮助自治体、企业与社区顺畅协作。',
        primaryCta: '查看服务',
        secondaryCta: '立即联系',
        eyebrow: 'SOCIAL + SaaS',
        dashboard: {
          focusTag: '社群',
          statusLabel: '运行中',
          stats: [
            { label: '合作社群', value: '128', note: '覆盖多地' },
            { label: '活跃成员', value: '12k', note: '月活' },
            { label: '合作伙伴', value: '54', note: '企业与机构' }
          ]
        }
      },
      valuesTitle: '重点方向',
      valuesDescription: '结合 SaaS 与社群陪伴的三大支柱。',
      values: [
        { title: '社群与活动', description: '帮助各地社群多语言运营活动，让参与者轻松加入。' },
        { title: '会员管理 SaaS', description: '在云端管理成员与费用，自动发送通知和报表。' },
        { title: '外国人支持', description: '提供职业咨询与技能课程，协助在日生活与成长。' }
      ],
      highlightsTitle: '产品亮点',
      highlightsDescription: '让自治体、企业、社群共享同一视角的轻量模块。',
      productHighlights: [
        { title: '活动管理', body: '拖拽式排期、QR 签到、实时参与统计。' },
        { title: '在线支付', body: '多语言界面收取费用并自动寄送收据。' },
        { title: '多语言沟通', body: '涵盖中日英等语言的沟通模板，快速回应。' }
      ],
      newsTitle: '最新动态',
      newsDescription: '平台更新、合作案例与现场故事。'
    },
    about: {
      eyebrow: 'SOCIALMORE',
      title: '关于我们',
      visionTitle: '愿景',
      visionText: '以科技为桥梁，让在日外国人与地方社会安心共生。',
      missionTitle: '使命与价值观',
      values: [
        { title: '信任', body: '以透明的数据与长期陪伴获得伙伴信赖。' },
        { title: '包容', body: '跨越语言文化差异，搭建顺畅沟通。' },
        { title: '区域协作', body: '帮助自治体、NPO 与企业无缝合作。' },
        { title: '持续学习', body: '倾听现场声音，持续优化服务。' }
      ],
      timelineTitle: '发展历程',
      timeline: [
        { year: '2022', text: '在东京三鹰成立，从多文化活动起步。' },
        { year: '2023', text: '推出社区版 SaaS β，展开多地验证。' },
        { year: '2024', text: '上线企业端模块，拓展协作伙伴。' }
      ],
      galleryTitle: '现场一瞥',
      galleryDescription: '透过办公室与活动照片，感受 SOCIALMORE 的氛围。',
      galleryPhotos: [
        { file: 'photo-office-01.jpg', caption: 'photo-office-01.jpg｜办公室协作' },
        { file: 'photo-event-01.jpg', caption: 'photo-event-01.jpg｜社群活动' },
        { file: 'photo-team-portrait.jpg', caption: 'photo-team-portrait.jpg｜团队合影' }
      ]
    },
    services: {
      eyebrow: '平台服务',
      title: '产品与方案',
      communityTitle: '面向社群主理人',
      companyTitle: '面向企业与机构',
      iconHighlights: [
        { title: '会员管理 SaaS', description: '将会员、费用与通行证整合在一个面板。', iconKey: 'membership' },
        { title: '社群支援', description: '象征社区咨询与活动合作的对话气泡图示。', iconKey: 'community' },
        { title: 'AI 技能成长', description: '芯片与箭头图示，代表学习与进阶。', iconKey: 'ai' }
      ],
      communityCards: [
        { title: '会员云', bullets: ['成员数据库', '自动缴费提醒', '运营报告'] },
        { title: '活动 & 报名', bullets: ['多语言活动页', 'QR 签到', '候补名单管理'] },
        { title: '沟通枢纽', bullets: ['模板讯息', '自动翻译备注', '在地资讯分享'] }
      ],
      companyCards: [
        { title: '技能培训', bullets: ['日语与商务礼仪', '导师配对', '线上教材'] },
        { title: '人才对接', bullets: ['技能标签搜索', '职位发布管理', '面谈排程'] },
        { title: '入职支持', bullets: ['生活资讯手册', '文化培训', 'FAQ 聊天机器人'] }
      ],
      plansTitle: '方案示例',
      plans: [
        { name: '入门版', description: '适合小型团队', bullets: ['最多 500 名成员', '最多 3 场活动', '邮件支持'] },
        { name: '专业版', description: '常用首选方案', bullets: ['不限活动数量', '多据点管理', '专属成功经理'] },
        { name: '企业版', description: '大型机构', bullets: ['API 整合', 'SSO 单点登录', '24/7 支持'] }
      ]
    },
    news: {
      eyebrow: '新闻',
      title: '新闻与更新',
      intro: '关注平台版本更新、合作项目与社群故事。'
    },
    contact: {
      eyebrow: '联系我们',
      title: '联系',
      intro: '欢迎就导入、合作或社群支援等议题与我们交流。',
      form: {
        name: '姓名',
        email: '邮箱',
        organization: '组织 / 团体（选填）',
        inquiryType: '咨询类型',
        message: '留言',
        submit: '提交',
        success: '感谢您的联系。（本表单仅为示范，并不会真正发送邮件。）',
        validation: {
          required: '此栏必填',
          email: '请输入有效的邮箱地址'
        }
      },
      inquiryOptions: ['关于社区 SaaS', '企业培训 / 招聘', '合作提案', '其他'],
      info: {
        company: 'SOCIALMORE（创翔莫尔株式会社）',
        location: '日本东京三鹰',
        email: 'info@socialmore.jp',
        encouragement: '欢迎自治体、企业、社群伙伴与个人来信。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（创翔莫尔株式会社）',
        address: '在日本东京三鹰开展业务。',
        registration: '如有需要，可提供公司的登记与注册信息。'
      },
      contact: {
        title: '联系 SOCIALMORE',
        emailLabel: '邮箱',
        email: 'info@socialmore.jp',
        phoneLabel: '电话',
        phone: '+81-50-0000-0000',
        hours: '服务时间：工作日 10:00-18:00（日本时间）'
      },
      links: {
        title: '法律信息',
        privacy: '隐私政策',
        terms: '使用条款'
      },
      copyright: '© 2024 SOCIALMORE Inc. 保留所有权利。'
    },
    legal: {
      privacy: {
        title: '隐私政策',
        updated: '最后更新：2024年4月1日',
        intro: 'SOCIALMORE（以下简称“本公司”）致力于以安全、持续的方式提供服务，并妥善管理用户信息。本政策说明我们收集的信息类型与使用方式。',
        sections: [
          {
            title: '1. 收集的信息',
            body: ['我们仅收集提供、改进及保障服务所需的数据，主要包含：'],
            bullets: ['账户注册信息（姓名、邮箱、所属组织、偏好语言等）', '使用数据（访问日志、浏览器与设备信息、浏览记录）', '咨询内容与支持记录', '通过可信支付服务获取的付款信息（不保存信用卡号码）']
          },
          {
            title: '2. 使用目的',
            body: ['用于提供服务、身份验证、防止滥用、功能改进以及发布重要通知与支持联系。']
          },
          {
            title: '3. 第三方共享',
            body: ['我们可能与可信赖的合作伙伴（如支付、基础设施、分析服务）在必要范围内共享信息，合作方仅能在合约约定范围内使用。']
          },
          {
            title: '4. 存储与安全',
            body: ['数据存储在日本或具备充分保护水准的地区服务器，并采用存取控制、加密、稽核记录等措施，防止遗失或泄漏。']
          },
          {
            title: '5. 用户权利',
            body: ['您可在法令允许范围内申请查阅、修正或删除个人数据，请联系本政策底部的窗口。']
          },
          {
            title: '6. Cookies',
            body: ['本站可能使用 Cookies 以记忆语言偏好并了解使用状况，您可在浏览器中停用，但部分功能可能受限。']
          },
          {
            title: '7. 政策更新',
            body: ['若因法令或服务调整需要更新本政策，我们会在本页面公告并适时通知用户。']
          },
          {
            title: '8. 联系方式',
            body: ['关于隐私问题，请寄信至 info@socialmore.jp。']
          }
        ]
      },
      terms: {
        title: '使用条款',
        updated: '最后更新：2024年4月1日',
        intro: '本条款规范您使用 SOCIALMORE 网站与相关服务的条件，请在使用前仔细阅读。',
        sections: [
          { title: '1. 适用范围', body: ['适用于 SOCIALMORE 提供的所有线上服务。'] },
          {
            title: '2. 帐号管理',
            body: ['用户须维持注册资讯的准确性，如发现未经授权的使用请立即联络我们。']
          },
          {
            title: '3. 禁止行为',
            body: ['禁止任何违法、骚扰、侵权或未经授权存取等行为。']
          },
          {
            title: '4. 服务变更',
            body: ['我们可能在未事先通知的情况下调整、暂停或终止服务。']
          },
          {
            title: '5. 免责声明',
            body: ['本服务按“现状”提供，不保证不中断或满足特定目的；除非因故意或重大过失，否则本公司不对损失承担责任，必要时赔偿金额以过去12个月支付的费用为上限。']
          },
          {
            title: '6. 知识产权',
            body: ['与本服务相关的所有知识产权归本公司或合法权利人所有。']
          },
          {
            title: '7. 准据法与管辖',
            body: ['本条款受日本法律管辖，若产生争议，以东京地方裁判所为第一审专属管辖法院。']
          },
          {
            title: '8. 联系方式',
            body: ['条款相关问题请联络 info@socialmore.jp。']
          }
        ]
      }
    }
  }
};

const readStoredLocale = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LOCALE;
  }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LOCALES.includes(saved)) {
      return saved;
    }
  } catch (error) {
    // ignore storage errors
  }
  return DEFAULT_LOCALE;
};

const persistLocale = (locale) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch (error) {
    // ignore storage errors
  }
};

const updateDocumentLang = (locale) => {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', locale);
  }
};

const state = reactive({
  locale: readStoredLocale()
});

updateDocumentLang(state.locale);

export function useI18n() {
  const currentLocale = computed(() => state.locale);
  const dictionary = computed(() => messages[state.locale] ?? messages[DEFAULT_LOCALE]);

  const setLocale = (locale) => {
    if (!SUPPORTED_LOCALES.includes(locale)) {
      return;
    }
    state.locale = locale;
    persistLocale(locale);
    updateDocumentLang(locale);
  };

  const t = (path) => {
    const localesToTry = [state.locale, ...FALLBACK_LOCALES];
    const visited = new Set();
    for (const locale of localesToTry) {
      if (!locale || visited.has(locale)) {
        continue;
      }
      visited.add(locale);
      const value = getValueByPath(messages[locale], path);
      if (value !== undefined) {
        return value;
      }
    }
    return path;
  };

  return {
    currentLocale,
    dictionary,
    setLocale,
    t
  };
}
