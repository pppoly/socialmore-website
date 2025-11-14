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
        title: '在日コミュニティ主催者を支える軽量テックサービス',
        subtitle:
          'SOCIALMOREは、簡単に使えるテクノロジーツールでイベント主催の負担を軽くし、コミュニケーションを滑らかにし、必要なリソースにつながりやすくします。コミュニティから始まり、多様な在日コミュニティと日本の企業・機関を結び、持続的な協働エコシステムを築きます。',
        primaryCta: 'サービスを知る',
        secondaryCta: 'お問い合わせ',
        eyebrow: 'SOCIAL + SaaS',
        dashboard: {
          focusTag: 'コミュニティ',
          statusLabel: '稼働中',
          stats: [
            { label: '連携コミュニティ', value: '128', note: '各地域で展開' },
            { label: 'アクティブメンバー', value: '12k', note: '月間' },
            { label: '企業・機関', value: '54', note: '協働中' }
          ]
        }
      },
      valuesTitle: '私たちが注力する3つの領域',
      valuesDescription:
        '現場の声に寄り添い、コミュニティ主催者の運営・連携・成長を支える仕組みを整えています。',
      values: [
        {
          title: 'コミュニティ主催者支援',
          description: '在日コミュニティの主催者が、煩雑なフォームや調整に追われず活動できるよう伴走します。'
        },
        {
          title: 'イベント運営インフラ',
          description: '募集・通知・決済・当日の動線までを一体化した、軽量で信頼できる基盤を提供します。'
        },
        {
          title: '多文化コミュニティ連携',
          description: '外国人労働者、留学生、多文化住民のネットワークを活かし、企業や自治体との協働をつなぎます。'
        }
      ],
      highlightsTitle: 'コミュニティイベントを楽にする機能',
      highlightsDescription: '募集から当日運営、振り返りまでをひとつながりの体験に。',
      productHighlights: [
        {
          title: 'イベント募集と管理',
          body: '多言語フォーム、人数管理、自動集計をまとめて提供。'
        },
        {
          title: 'オンライン決済と費用整理',
          body: '参加費の受付や簡単な清算機能で、主催者の台帳作業を削減。'
        },
        {
          title: '参加者とのコミュニケーション',
          body: '日本語・中国語・英語などでの案内・リマインドをテンプレート化。'
        },
        {
          title: 'コミュニティ資源ネットワーク',
          body: '会場、登壇者、協力パートナーなど、必要なリソース探しを支援。'
        }
      ],
      now: {
        title: '現在進行中のプロジェクト',
        description: '実際のコミュニティと検証を重ね、サービスとネットワークを磨いています。',
        projects: [
          '東京都三鷹で地域コミュニティと協力し、イベント運営システムをテスト',
          '外国人労働者コミュニティ向けに生活情報とスキル講座をサポート',
          '日本企業と多文化コミュニティ協業の機会を共創',
          'コミュニティ主催者向けの運営ツールと資源協力モジュールを磨き込み'
        ]
      },
      newsTitle: '最新ニュース',
      newsDescription: 'サービスのアップデートやコミュニティ連携の様子を発信しています。'
    },
    about: {
      eyebrow: '会社紹介',
      title: 'SOCIALMOREについて',
      intro:
        'SOCIALMORE（創翔モア）は東京都三鷹で生まれたテックカンパニーです。コミュニティの現場でイベントを支援してきた経験から、主催者が直面する課題を肌で感じてきました。テクノロジーは目的ではなく、現場の負担を軽くするための道具だと考えています。',
      visionTitle: 'ビジョン',
      visionText: '在日多文化コミュニティが円滑に交流・協働し、コミュニティを支える人がよりよく支えられる社会をつくる。',
      missionTitle: '価値観',
      values: [
        { title: 'リアルな現場', body: '実際のイベントシーンと主催者の声からすべての機能を設計します。' },
        { title: '軽やかなテクノロジー', body: 'テクノロジーは負担を減らす手段であり、複雑さを増やさないことを大切にします。' },
        { title: '多文化協働', body: '在地の日本人と外国人住民の共同行動を支える橋渡し役を担います。' },
        { title: '長期的な伴走', body: 'コミュニティが続く限り、現場に寄り添いアップデートを続けます。' }
      ],
      timelineTitle: 'マイルストーン',
      timeline: [
        { year: '2022', text: '東京都三鷹で創業。多文化コミュニティと現場実証を開始。' },
        { year: '2023', text: '主催者向けの軽量ツール群をβ提供し、複数コミュニティと検証。' },
        { year: '2024', text: '企業・自治体との協働プログラムを拡張し、サービス基盤を刷新。' }
      ],
      galleryTitle: '現場の様子',
      galleryDescription: 'オフィスやイベントの瞬間から、SOCIALMOREの空気感をお伝えします。',
      galleryPhotos: [
        { file: 'photo-office-01.jpg', caption: 'photo-office-01.jpg｜オフィスでの協働風景' },
        { file: 'photo-event-01.jpg', caption: 'photo-event-01.jpg｜コミュニティイベントの様子' },
        { file: 'photo-team-portrait.jpg', caption: 'photo-team-portrait.jpg｜チーム集合写真' }
      ]
    },
    services: {
      eyebrow: 'プラットフォーム紹介',
      title: '私たちのサービス',
      subtitle: 'コミュニティ運営 × イベントテック × 多文化ネットワーク',
      communityTitle: 'コミュニティ主催者向け',
      companyTitle: '企業・自治体向け',
      iconHighlights: [
        {
          title: '主催者の伴走支援',
          description: '企画・募集・連絡を一貫してサポートする軽量ワークフロー。',
          iconKey: 'membership'
        },
        {
          title: 'イベント運営インフラ',
          description: '申込、決済、会場運営を統合した信頼性の高い基盤。',
          iconKey: 'community'
        },
        {
          title: '多文化ネットワーク',
          description: '在日コミュニティと企業を結び、現場の声を届ける連携網。',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'イベント運営ツール',
          bullets: ['多言語の募集フォーム', '参加枠・リマインド管理', 'チェックインとレポート']
        },
        {
          title: '費用と決済',
          bullets: ['オンライン決済と簡易精算', '入出金の整理', '領収書の自動送付']
        },
        {
          title: 'コミュニケーション',
          bullets: ['多言語テンプレート', '参加者への一斉連絡', '協力先との共有ノート']
        }
      ],
      companyCards: [
        {
          title: 'コミュニティ協働',
          bullets: ['実証イベントや体験企画', '多文化交流の設計', '現場スタッフの伴走']
        },
        {
          title: '現場インサイト',
          bullets: ['コミュニティからのフィードバック', '参加者データの要約', '課題と機会の共有']
        },
        {
          title: 'プログラム支援',
          bullets: ['技能講座や生活情報会', '自治体・企業との共同企画', '評価・改善レポート']
        }
      ],
      plansTitle: '伴走メニューの一例',
      plans: [
        {
          name: 'スターター',
          description: '小規模コミュニティや試行導入向け',
          bullets: ['最大500名のメンバー', '月3本のイベント', 'メールサポート']
        },
        {
          name: 'パートナー',
          description: '継続的な伴走と複数拠点運営に',
          bullets: ['無制限イベント', '多拠点・多言語対応', '専任カスタマーサクセス']
        },
        {
          name: 'エンタープライズ',
          description: '大規模プロジェクト・自治体連携向け',
          bullets: ['API連携', 'SSO / IAM連携', '24時間サポート']
        }
      ]
    },
    news: {
      eyebrow: '最新情報',
      title: 'ニュース',
      intro: 'リリース情報や連携事例、現場レポートをお届けします。'
    },
    contact: {
      eyebrow: 'お問い合わせ',
      title: 'お気軽にご相談ください',
      intro:
        'コミュニティイベントの運営支援、協業のご相談、プロジェクトへの参加など、内容を問わずお気軽にご連絡ください。内容に応じて最適なメンバーが対応します。',
      form: {
        name: 'お名前',
        email: 'メールアドレス',
        organization: '所属（任意）',
        inquiryType: 'お問い合わせ種別',
        message: 'メッセージ',
        submit: '送信する',
        success: 'お問い合わせありがとうございました。（本フォームはデモのため送信されません。）',
        validation: {
          required: '必須項目です',
          email: '正しいメールアドレスを入力してください'
        }
      },
      inquiryOptions: ['コミュニティ運営支援について', '企業・自治体との協業', '多文化プロジェクト', 'その他'],
      info: {
        company: 'SOCIALMORE（株式会社創翔モア）',
        location: '東京都三鷹市',
        email: 'info@socialmore.jp',
        encouragement: 'どなたからのご相談も歓迎しています。内容に合わせて伴走方法をご提案します。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（株式会社創翔モア）',
        address: '東京都三鷹市を拠点に、全国のコミュニティを支援しています。',
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
            body: ['法令違反、ハラスメント、知的財産権侵害、不正アクセスなど、他者や当社の権利を侵害する行為は禁止します。']
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
        title: 'Lightweight tech service for community organizers in Japan',
        subtitle:
          'SOCIALMORE combines simple tools and real field support so community organizers worry less about forms, coordination, and logistics. We start from the communities on the ground, then bridge them with Japanese companies and institutions to build a sustainable ecosystem.',
        primaryCta: 'Explore our services',
        secondaryCta: 'Get in touch',
        eyebrow: 'SOCIAL + SaaS',
        dashboard: {
          focusTag: 'Community',
          statusLabel: 'Live',
          stats: [
            { label: 'Partner communities', value: '128', note: 'across Japan' },
            { label: 'Active members', value: '12k', note: 'monthly' },
            { label: 'Partners', value: '54', note: 'companies & orgs' }
          ]
        }
      },
      valuesTitle: 'Three priorities we focus on',
      valuesDescription: 'Everything we build is rooted in real community operations, so organizers can keep events running smoothly.',
      values: [
        {
          title: 'Support for organizers',
          description: 'Help on-the-ground hosts run activities in Japan without drowning in forms, chats, or coordination work.'
        },
        {
          title: 'Event infrastructure',
          description: 'A lightweight stack that unifies sign-ups, notifications, payments, and onsite flows.'
        },
        {
          title: 'Multicultural connections',
          description: 'Link foreign workers, students, and residents with Japanese enterprises for real collaboration opportunities.'
        }
      ],
      highlightsTitle: 'Key features that make events easier',
      highlightsDescription: 'From recruitment to wrap-up, everything lives in a single workflow.',
      productHighlights: [
        {
          title: 'Event enrollment & management',
          body: 'Multilingual forms, capacity controls, and automatic summaries.'
        },
        {
          title: 'Online payments & reconciliation',
          body: 'Collect fees, sort expenses, and send receipts without extra spreadsheets.'
        },
        {
          title: 'Participant communications',
          body: 'Templates for Japanese, Chinese, English, and more to reduce misunderstandings.'
        },
        {
          title: 'Community resource network',
          body: 'Match organizers with venues, speakers, and collaboration partners.'
        }
      ],
      now: {
        title: 'What we are working on now',
        description: 'We co-create with communities to refine the service and the collaboration network.',
        projects: [
          'Testing the event operations system with neighborhood partners in Mitaka, Tokyo',
          'Providing life info and skill events for foreign worker communities',
          'Exploring multicultural collaboration opportunities with Japanese companies',
          'Polishing organizer tools plus the resource-collaboration modules'
        ]
      },
      newsTitle: 'Latest news',
      newsDescription: 'Updates about the platform, partnerships, and field projects.'
    },
    about: {
      eyebrow: 'Company',
      title: 'About SOCIALMORE',
      intro:
        'SOCIALMORE was founded in Mitaka, Tokyo. We have spent years hosting and supporting community events, so we deeply understand the obstacles organizers face. For us, technology is a tool to reduce workload, not a goal by itself.',
      visionTitle: 'Vision',
      visionText: 'Make it easier for multicultural communities in Japan to collaborate, communicate, and live together while caring for the people who support them.',
      missionTitle: 'Values',
      values: [
        { title: 'Real field insight', body: 'Start from real event scenes and organizer needs, then turn them into product updates.' },
        { title: 'Lightweight tech', body: 'Technology should remove friction and stay approachable.' },
        { title: 'Multicultural collaboration', body: 'Serve as a bridge between local Japanese groups and foreign residents.' },
        { title: 'Long-term partnership', body: 'Stay close to communities for as long as they exist and keep iterating together.' }
      ],
      timelineTitle: 'Milestones',
      timeline: [
        { year: '2022', text: 'Founded in Mitaka and started pilots with multicultural communities.' },
        { year: '2023', text: 'Released lightweight organizer tools in beta and tested with multiple groups.' },
        { year: '2024', text: 'Expanded corporate and municipal collaborations while refreshing the platform.' }
      ],
      galleryTitle: 'Field snapshots',
      galleryDescription: 'Moments from our office, events, and team collaborations.',
      galleryPhotos: [
        { file: 'photo-office-01.jpg', caption: 'photo-office-01.jpg | Office collaboration' },
        { file: 'photo-event-01.jpg', caption: 'photo-event-01.jpg | Community event scene' },
        { file: 'photo-team-portrait.jpg', caption: 'photo-team-portrait.jpg | Team portrait' }
      ]
    },
    services: {
      eyebrow: 'Platform overview',
      title: 'What we offer',
      subtitle: 'Community operations × Event technology × Multicultural connections',
      communityTitle: 'For community organizers',
      companyTitle: 'For companies & public partners',
      iconHighlights: [
        {
          title: 'Organizer support',
          description: 'One workflow that covers planning, sign-ups, communication, and wrap-up.',
          iconKey: 'membership'
        },
        {
          title: 'Event infrastructure',
          description: 'Reliable stack for applications, payments, and onsite logistics.',
          iconKey: 'community'
        },
        {
          title: 'Multicultural network',
          description: 'Bridge communities and enterprises so field insights travel both ways.',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'Event tools',
          bullets: ['Multilingual signup pages', 'Capacity & reminder management', 'Check-in plus summaries']
        },
        {
          title: 'Payments & costs',
          bullets: ['Online fee collection', 'Simple reconciliation', 'Automatic receipts']
        },
        {
          title: 'Communication',
          bullets: ['Templates across languages', 'Bulk updates to participants', 'Shared notes with partners']
        }
      ],
      companyCards: [
        {
          title: 'Community collaboration',
          bullets: ['Co-create cultural exchanges', 'Onsite experience programs', 'Field facilitation support']
        },
        {
          title: 'Insight from the field',
          bullets: ['Feedback from multicultural events', 'Participant data highlights', 'Shared challenges & opportunities']
        },
        {
          title: 'Program support',
          bullets: ['Skill sessions and life info workshops', 'Joint projects with cities & firms', 'Evaluation and improvement reports']
        }
      ],
      plansTitle: 'Sample engagement models',
      plans: [
        { name: 'Starter', description: 'For pilots and small teams', bullets: ['Up to 500 members', '3 events per month', 'Email support'] },
        { name: 'Partner', description: 'For ongoing operations', bullets: ['Unlimited events', 'Multi-location & multilingual care', 'Dedicated CS manager'] },
        { name: 'Enterprise', description: 'For large programs', bullets: ['API integrations', 'SSO / IAM', '24/7 support'] }
      ]
    },
    news: {
      eyebrow: 'Updates',
      title: 'News',
      intro: 'Platform releases, partnership pilots, and stories from the field.'
    },
    contact: {
      eyebrow: 'Contact',
      title: 'We would love to hear from you',
      intro:
        'Whether you need help running events, want to explore collaborations, or plan to join our community projects, feel free to reach out. We will connect you with the right teammate.',
      form: {
        name: 'Name',
        email: 'Email',
        organization: 'Organization (optional)',
        inquiryType: 'Inquiry type',
        message: 'Message',
        submit: 'Send message',
        success: 'Thank you for your note. (This form is a demo and will not actually send an email.)',
        validation: {
          required: 'This field is required',
          email: 'Please enter a valid email address'
        }
      },
      inquiryOptions: ['Community operations', 'Corporate / public partnerships', 'Multicultural programs', 'Other'],
      info: {
        company: 'SOCIALMORE Inc.',
        location: 'Mitaka, Tokyo',
        email: 'info@socialmore.jp',
        encouragement: 'We welcome conversations from organizers, companies, municipalities, and individuals alike.'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE Inc.',
        address: 'Based in Mitaka, Tokyo and supporting communities across Japan.',
        registration: 'Company registration details are available upon request.'
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
        privacy: 'Privacy policy',
        terms: 'Terms of use'
      },
      copyright: '© 2024 SOCIALMORE Inc. All rights reserved.'
    },
    legal: {
      privacy: {
        title: 'Privacy policy',
        updated: 'Last updated: April 1, 2024',
        intro:
          'SOCIALMORE (“we”) is committed to handling personal information appropriately so that we can deliver our services safely and continuously. This policy explains the types of data we collect and how we use it.',
        sections: [
          {
            title: '1. Information we collect',
            body: ['We collect only the data needed to deliver, improve, and secure our services. It mainly includes:'],
            bullets: [
              'Account details (name, email address, organization, preferred language)',
              'Usage data (access logs, browser and device information, browsing history)',
              'Inquiry content and support records',
              'Payment information processed via trusted providers (we do not store credit card numbers)'
            ]
          },
          {
            title: '2. Purpose of use',
            body: ['We use the information to provide the service, verify users, prevent abuse, improve features, and deliver important notices or support responses.']
          },
          {
            title: '3. Sharing with third parties',
            body: [
              'We may share data with trusted partners such as payment, infrastructure, or analytics providers within the necessary scope.',
              'Such partners only handle the data under contracts and our instructions.'
            ]
          },
          {
            title: '4. Storage & security',
            body: [
              'Data is stored in Japan or in regions with adequate protection levels.',
              'We apply access controls, encryption, and audit logs to prevent loss or leaks.'
            ]
          },
          {
            title: '5. User rights',
            body: ['You may request to view, correct, or delete your personal data within the limits of applicable laws. Please contact us to make such requests.']
          },
          {
            title: '6. Cookies',
            body: ['We may use cookies or similar technologies to remember language settings and understand usage. Disabling cookies may limit some functions.']
          },
          {
            title: '7. Policy updates',
            body: ['We may revise this policy when laws or services change. Significant changes will be announced on this page and communicated appropriately.']
          },
          {
            title: '8. Contact',
            body: ['Please contact info@socialmore.jp for privacy-related questions.']
          }
        ]
      },
      terms: {
        title: 'Terms of use',
        updated: 'Last updated: April 1, 2024',
        intro: 'These terms govern your use of the SOCIALMORE website and related services. By using the service you agree to the terms.',
        sections: [
          { title: '1. Scope', body: ['Applies to all online services we provide.'] },
          {
            title: '2. Account responsibility',
            body: ['Users must keep their registration details accurate and contact us immediately if unauthorized use is suspected.']
          },
          {
            title: '3. Prohibited actions',
            body: ['Any illegal activity, harassment, infringement, or unauthorized access is prohibited.']
          },
          {
            title: '4. Service changes',
            body: ['We may change, suspend, or terminate the service without prior notice.']
          },
          {
            title: '5. Disclaimer',
            body: [
              'The service is provided “as is” without guarantees of uninterrupted operation or fitness for a particular purpose.',
              'We are not liable for damages unless caused by our willful misconduct or gross negligence.',
              'If liability is unavoidable, it is limited to direct damages up to the amount paid by the user in the past 12 months.'
            ]
          },
          {
            title: '6. Intellectual property',
            body: ['All IP related to the service belongs to us or to the rightful owners.']
          },
          {
            title: '7. Governing law & jurisdiction',
            body: ['These terms are governed by Japanese law. Disputes are subject to the exclusive jurisdiction of the Tokyo District Court.']
          },
          {
            title: '8. Contact',
            body: ['Please reach out to info@socialmore.jp regarding these terms.']
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
      contact: '联系我们'
    },
    buttons: {
      viewServices: '了解服务',
      contactUs: '联系我们',
      learnMore: '进一步了解',
      readMore: '阅读更多'
    },
    home: {
      hero: {
        title: '支持在日社群主理人的轻量科技服务',
        subtitle:
          'SOCIALMORE 通过简单易用的技术工具，让活动主办更省心、沟通更顺畅、资源更容易找到。从社群出发，连结在日多元社区与日本企业、机构，形成可持续的活动与合作生态。',
        primaryCta: '了解我们的服务',
        secondaryCta: '联系我们',
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
      valuesTitle: '我们专注于三件事情',
      valuesDescription: '以真实社群需求为核心，让主办方的运营、沟通与连结更顺畅。',
      values: [
        {
          title: '社群主理人支援',
          description: '帮助在日社群主办方轻松开展活动，减少繁琐的表格、沟通与对接。'
        },
        {
          title: '活动运营基础设施',
          description: '提供「报名・通知・支付・会场协力」的一体化基础设施。'
        },
        {
          title: '多文化社区连结',
          description: '连结外国劳工、留学生与跨文化居民，为企业与机构带来真实可信的合作网络。'
        }
      ],
      highlightsTitle: '让社群活动变得轻松的关键功能',
      highlightsDescription: '围绕活动的每个关键节点，提供可立即上手的工具。',
      productHighlights: [
        { title: '活动募集与管理', body: '多语言报名表、人数管理、自动汇总，一次完成。' },
        { title: '在线支付与费用整理', body: '支持活动收费与简单结算，让主理人不再被对账困扰。' },
        { title: '参与者沟通与通知', body: '支持日语、中文、英文等多语言沟通，降低误解成本。' },
        { title: '社群资源协作网络', body: '协助主办方对接场地、嘉宾、合作方等活动资源。' }
      ],
      now: {
        title: '我们正在推动的工作',
        description: '与在地社群共同打磨产品与协作网络，确保每一步都贴近真实需求。',
        projects: [
          '在东京三鹰，与在地社群合作测试活动运营系统',
          '为外国劳工社群提供生活信息与技能活动支持',
          '与日本企业探索多文化社区合作机会',
          '打磨面向社群主理人的运营工具和资源协作模块'
        ]
      },
      newsTitle: '最新动态',
      newsDescription: '关注平台版本更新、合作项目与现场故事。'
    },
    about: {
      eyebrow: '公司简介',
      title: '关于 SOCIALMORE',
      intro:
        'SOCIALMORE（創翔モア）是一家在东京三鹰成立的科技公司。我们长期在社区现场举办活动、支持社群，深刻感受到主办方在运营中遇到的种种困难。技术对我们来说不是目的，而是减轻社群运营负担的工具。通过让活动变得更容易，我们希望让更多社群得以持续、成长、连接。',
      visionTitle: '愿景',
      visionText: '让在日多元社群更顺畅地交流、协作与共同生活，让支持社区的人，被更好地支持。',
      missionTitle: '价值观',
      values: [
        { title: '真实现场', body: '从真实的活动场景与主理人需求出发，持续倾听与反馈。' },
        { title: '轻量科技', body: '技术必须让运营减负，而不是增加复杂度。' },
        { title: '多文化协作', body: '连接在地日本人与外国居民，共同推动社区行动。' },
        { title: '长期陪伴', body: '社群持续存在，我们就在现场，与伙伴长期同行。' }
      ],
      timelineTitle: '发展里程碑',
      timeline: [
        { year: '2022', text: '在东京三鹰成立，与多文化社区开展活动与验证。' },
        { year: '2023', text: '推出面向主理人的轻量工具，和多地社群共同测试。' },
        { year: '2024', text: '扩展与企业、自治体的合作项目，并升级平台能力。' }
      ],
      galleryTitle: '现场一瞥',
      galleryDescription: '透过办公室与活动照片，感受 SOCIALMORE 的日常。',
      galleryPhotos: [
        { file: 'photo-office-01.jpg', caption: 'photo-office-01.jpg｜办公室协作' },
        { file: 'photo-event-01.jpg', caption: 'photo-event-01.jpg｜社群活动' },
        { file: 'photo-team-portrait.jpg', caption: 'photo-team-portrait.jpg｜团队合影' }
      ]
    },
    services: {
      eyebrow: '平台介绍',
      title: '我们提供的服务',
      subtitle: '社群运营 × 活动技术 × 多文化连结',
      communityTitle: '面向社群主理人（主办方）',
      companyTitle: '面向企业与机构（Partners）',
      iconHighlights: [
        { title: '主理人支援', description: '一条龙覆盖企划、报名、沟通与复盘。', iconKey: 'membership' },
        { title: '活动运营基础设施', description: '报名、支付、语言支持、会场协作一体化。', iconKey: 'community' },
        { title: '多文化连结网络', description: '连接社区与企业，让现场洞察快速流动。', iconKey: 'ai' }
      ],
      communityCards: [
        {
          title: '活动运营工具（Event Tools）',
          bullets: ['报名、通知、签到、数据管理一次完成', '多语言界面降低沟通负担', '活动模板可快速复用']
        },
        {
          title: '费用与支付（Payment）',
          bullets: ['支持线上收费与简单结算', '自动整理收支与凭证', '减少手动对账时间']
        },
        {
          title: '沟通与协作（Communication）',
          bullets: ['多语言沟通与提醒', '参与者与志愿者同步', '合作方共享关键资讯']
        }
      ],
      companyCards: [
        {
          title: '社区协作（Community Collaboration）',
          bullets: ['文化交流与体验项目', '真实社群现场活动', '主办端与企业端双向沟通']
        },
        {
          title: '现场信息洞察（Insight）',
          bullets: ['来自多文化活动的反馈', '参与者画像与需求摘要', '协助制定沟通策略']
        },
        {
          title: '合作项目支持（Programs）',
          bullets: ['与企业／自治体共同策划讲座或体验', '技能与生活信息课程', '评估与后续改进建议']
        }
      ],
      plansTitle: '合作模式示例',
      plans: [
        { name: '入门计划', description: '适合试点与小型团队', bullets: ['最多 500 名成员', '每月 3 场活动', '邮件支持'] },
        { name: '伙伴计划', description: '适合持续运营与多据点协作', bullets: ['不限活动数量', '多地点与多语言支持', '专属成功经理'] },
        { name: '企业计划', description: '面向大型项目或机构', bullets: ['API 集成', 'SSO / IAM', '24/7 支持'] }
      ]
    },
    news: {
      eyebrow: '新闻',
      title: '新闻与更新',
      intro: '关注平台版本更新、合作项目与社群故事。'
    },
    contact: {
      eyebrow: '联系我们',
      title: '欢迎与我们联系',
      intro:
        '无论是社群活动的运营支持、合作交流的机会，或是希望参与我们的社区项目，都欢迎随时联系我们。我们会根据内容安排最合适的成员与您对接。',
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
      inquiryOptions: ['社群运营支援', '企业 / 机构合作', '多文化项目', '其他'],
      info: {
        company: 'SOCIALMORE（创翔莫尔株式会社）',
        location: '日本东京三鹰',
        email: 'info@socialmore.jp',
        encouragement: '欢迎自治体、企业、社群伙伴与个人来信，我们会尽快回复。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（创翔莫尔株式会社）',
        address: '在日本东京三鹰开展业务，持续支持各地社群。',
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
            body: ['与本服务相关的所有知产权归本公司或合法权利人所有。']
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
