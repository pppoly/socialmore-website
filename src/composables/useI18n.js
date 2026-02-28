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
      about: '理念',
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
        eyebrow: 'Community Retention',
        title: '「来て終わり」を、「また来たくなる関係」へ。',
        subtitle: 'Socialmoreは、LINEミニアプリで参加後フォローから次回案内までをつなぐコミュニティ運営プラットフォームです。',
        coreMessage: '継続参加を増やし、通知を届け、運営の手間を減らします。',
        stance: '導入前後比較で、活動後継続率は平均+40%、通知開封率は平均70%以上、定型業務工数は最大80%削減。',
        primaryCta: 'LINEで体験する',
        secondaryCta: '活用イメージを見る',
        results: [
          {
            label: '活動後継続率',
            value: '平均 +40%',
            note: '導入前後比較'
          },
          {
            label: 'LINE通知開封率',
            value: '平均 70%+',
            note: '配信実績'
          },
          {
            label: '定型業務工数',
            value: '最大 -80%',
            note: '定型作業の削減効果'
          }
        ]
      },
      features: {
        eyebrow: 'Features',
        title: '継続参加を生む、4つの運営機能',
        lead: '一回きりで終わらせないために、準備からフォローまでをつなげます。',
        points: [
          {
            title: '継続参加の導線設計',
            body: '参加後フォローを仕組み化し、次回参加へ自然につなげる。'
          },
          {
            title: '届く案内設計',
            body: 'LINE中心の多言語・多チャネル配信で、見落としを減らす。'
          },
          {
            title: '参加者情報の一元化',
            body: '申込・参加・連絡履歴をまとめ、対応をスムーズにする。'
          },
          {
            title: '運営フローの統合',
            body: '申込から通知、管理までを一本化し、繰り返し作業を削減する。'
          }
        ]
      },
      value: {
        eyebrow: 'Value',
        title: '現場で実感できる運営価値',
        lead: '続く関係づくりと運営負荷の両方を改善します。',
        points: [
          {
            title: '続いて集まるコミュニティづくり',
            body: '単発で終わらない、継続して参加される関係を育てられる。'
          },
          {
            title: '企画と参加者対応に集中',
            body: '事務負担を抑え、主催者が本来の運営に時間を使える。'
          },
          {
            title: '次回施策の改善精度を向上',
            body: '履歴データが蓄積され、次回施策を見直しやすくなる。'
          }
        ]
      },
      proof: {
        eyebrow: 'Metrics',
        title: '導入効果を、数字で確認',
        lead: '実績にもとづく指標で、改善の手応えを把握できます。',
        metrics: [
          {
            title: '活動後の継続率',
            value: '平均 +40%',
            note: '導入前後比較'
          },
          {
            title: 'LINE通知開封率',
            value: '平均 70%以上',
            note: '配信実績'
          },
          {
            title: '定型業務の工数',
            value: '最大 80%削減',
            note: '定型作業の集計'
          },
          {
            title: 'モバイル申込率',
            value: '向上',
            note: '導線改善による離脱抑制'
          }
        ]
      },
      cta: {
        eyebrow: 'CTA',
        title: '3分でわかる資料を見る',
        body: 'まずは全体像を短時間で確認できます。',
        actions: [
          {
            label: '3分でわかる資料を見る',
            routeKey: 'firstPlan',
            variant: 'primary'
          }
        ]
      }
    },
    about: {
      eyebrow: '理念',
      title: '構造としての SocialMore',
      definition:
        'SocialMore は分裂が常態の世界に、合意に依存しない協働構造を設計し、コミュニティの現場で拡張性を検証する運用システムです。',
      stance: 'SocialMore は対立を消すのではなく、分裂した世界に協働可能な構造を提供します。',
      sections: [
        {
          title: '課題',
          lines: [
            '多言語・申込・決済・参加者管理が同時に進むと、ルールの境界が曖昧になる。',
            '定員・返金・注意事項が未確定のまま公開されると責任が追跡不能になる。',
            'だから公開前に規則と権限を固定し、申込と決済の記録を残す構造が必要。'
          ]
        },
        {
          title: '世界観',
          lines: [
            '分裂は常態で、共通の感情や物語では長期協働は続かない。',
            '協働を支えるのは、公開範囲・申込条件・決済/振込を追跡できる構造。',
            'SocialMore は公開→申込→決済→ルール告知→振込を一つの責任線にする。'
          ]
        },
        {
          title: 'なぜコミュニティか',
          lines: [
            'コミュニティは異質性が高く、ルールの欠落がすぐ失序として現れる。',
            'ポータルの公開範囲と申込条件を小さな単位で検証できる。',
            'そこで成立した構造だけが拡張の資格を持つ。'
          ]
        },
        {
          title: '何をするか',
          lines: [
            '主催者の運営画面で公開範囲、承認、定員、返金、注意事項を事前に固定する。',
            'モバイル申込で必須情報と同意を収集し、参加と責任を記録する。',
            '決済と振込設定でコストと責任の流れを可視化する。'
          ]
        },
        {
          title: '使命',
          lines: [
            '必然的に分裂する世界のために、合意に依存しない協働構造を設計する。',
            'その構造は公開/申込/決済/振込/ポータルに一貫して適用される。',
            '申込・決済・振込の記録が残る状態を成果とする。'
          ]
        },
        {
          title: '今なぜ必要か',
          lines: [
            '協働能力が拡散し、小規模なイベントでも決済と責任が伴うようになった。',
            '多言語参加が日常化し、同一ルールを提示する必要がある。',
            'だから今、規則とコストを追跡可能にする構造が不可欠。'
          ]
        }
      ]
    },
    services: {
      eyebrow: 'プラットフォーム紹介',
      title: 'サポート・コンテンツ',
      subtitle: 'コミュニティ運営 × イベントテック × 多文化ネットワーク',
      communityTitle: 'コミュニティ主催者向け',
      companyTitle: '企業・自治体向け',
      iconHighlights: [
        {
          title: '寄り添い支援',
          description: '企画・募集・連絡を一貫してサポートする軽量ワークフロー。',
          iconKey: 'membership'
        },
        {
          title: 'イベント運営インフラ',
          description: '申込、決済、会場運営を統合した信頼性の高い基盤。',
          iconKey: 'community'
        },
        {
          title: '多文化リレーション',
          description: '在留外国人コミュニティと企業を結び、現場の声を届けるネットワーク。',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'イベント運営ツール',
          iconKey: 'eventTools',
          bullets: ['多言語の募集フォーム', '参加枠・リマインド管理', 'チェックインとレポート']
        },
        {
          title: '費用と決済',
          iconKey: 'finance',
          bullets: ['オンライン決済と簡易精算', '入出金の整理', '領収書の自動送付']
        },
        {
          title: 'コミュニケーション',
          iconKey: 'communication',
          bullets: ['多言語テンプレート', '参加者への一斉連絡', '協力先との共有ノート']
        }
      ],
      companyCards: [
        {
          title: 'コミュニティ協働',
          iconKey: 'collaboration',
          bullets: ['実証イベントや体験企画', '多文化交流の設計', '現場スタッフの伴走']
        },
        {
          title: '現場のツボ',
          iconKey: 'insight',
          bullets: ['コミュニティからのフィードバック', '参加者データの要約', '課題と機会の共有']
        },
        {
          title: 'プログラム支援',
          iconKey: 'program',
          bullets: ['技能講座や生活情報会', '自治体・企業との共同企画', '評価・改善レポート']
        }
      ],
      plansTitle: '寄り添いプログラムの一例',
      plans: [
        {
          name: 'Starter',
          description: '小規模コミュニティや試行導入向け',
          bullets: ['最大500名のメンバー', '月3本のイベント', 'メールサポート']
        },
        {
          name: 'Partnership',
          description: '継続的な伴走と複数拠点運営に',
          bullets: ['無制限イベント', '多拠点・多言語対応', '専任カスタマーサクセス']
        },
        {
          name: 'Enterprise',
          description: '大規模プロジェクト・自治体連携向け',
          bullets: ['API連携', 'SSO / IAM連携', '24時間サポート']
        }
      ],
      planNote: '※上記は一例です。詳細はお問い合わせください。'
    },
    news: {
      eyebrow: 'SOCIALMORE blog',
      title: 'SOCIALMOREブログ',
      intro: '会社設立やサービスアップデート、現場のストーリーを綴る社内ブログです。',
      detail: {
        back: 'ニュース一覧に戻る',
        notFoundTitle: 'ニュースが見つかりませんでした',
        notFoundCopy: 'URLをご確認いただき、再度アクセスしてください。'
      }
    },
    contact: {
      eyebrow: 'お問い合わせ',
      title: 'お気軽にご相談ください',
      intro:
        'コミュニティイベントの運営支援、協業のご相談、プロジェクトへの参加など、内容を問わずお気軽にご連絡ください。内容に応じて最適なメンバーが対応します。尚、個人情報の保護に基づき、ご相談やいただいたメールアドレスなど等の個人情報は目的以外に使用しませんのでご安心ください。',
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
        email: 'admin@socialmore.co.jp',
        encouragement: 'どなたからのご相談も歓迎しています。内容に合わせて伴走方法をご提案します。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（株式会社創翔モア）',
        address: '181-0013 東京都三鷹市下連雀3-27-1 三協ビル2階'
      },
      contact: {
        title: 'お問い合わせ',
        emailLabel: 'メール',
        email: 'admin@socialmore.co.jp',
        phoneLabel: '電話',
        phone: '080-6567-1105',
        hours: '平日 10:00-18:00'
      },
      links: {
        title: 'リーガル',
        privacy: 'プライバシーポリシー',
        terms: '利用規約'
      },
      copyright: '© 2025 SOCIALMORE Inc.'
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
            body: ['プライバシーに関するご質問は admin@socialmore.co.jp までお寄せください。']
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
            body: ['本規約に関するお問い合わせは admin@socialmore.co.jp までご連絡ください。']
          }
        ]
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'Philosophy',
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
        eyebrow: 'MORE | Community Operating System',
        title: 'Give organizers a repeatable operating foundation on LINE',
        subtitle: 'Use directly on LINE Mini App. No app download for organizers or participants.',
        coreMessage: 'Run publishing, registration, payment, notifications, and settlement in one repeatable flow.',
        stance: 'Built for organizers who need predictable day-to-day operations.',
        primaryCta: 'Try on LINE now',
        secondaryCta: 'Start from scratch',
        results: [
          {
            label: 'Inquiry reduction',
            value: '-XX%',
            note: 'Fewer repetitive questions before event day'
          },
          {
            label: 'Day-of stability',
            value: '-XX%',
            note: 'Lower check-in and coordination issues'
          },
          {
            label: 'Settlement visibility',
            value: '-XX days',
            note: 'Faster close after each event'
          }
        ]
      },
      why: {
        eyebrow: 'Why',
        title: 'Operations still rely on one person carrying everything',
        lead: 'Organizers handle all tasks, repeat the same rule explanations, and still face unpredictable outcomes before launch.',
        points: [
          {
            title: 'One organizer carries the full load',
            body: 'Setup, attendee responses, payment checks, and day-of coordination stack onto one role.'
          },
          {
            title: 'Rules are explained repeatedly',
            body: 'Eligibility, notices, and refund terms are answered over and over across channels.'
          },
          {
            title: 'Operations remain unpredictable',
            body: 'Registration and payment status drift until the last minute.'
          }
        ]
      },
      scenarios: {
        eyebrow: 'Planning Assistant',
        title: 'Three planning scenarios',
        lead: 'Choose the entry that matches your current planning stage.',
        inputLabel: 'Input',
        outputLabel: 'Output',
        nextActionLabel: 'Next action',
        items: [
          {
            title: 'Planning consultation (from zero)',
            input: 'Your objective and target audience',
            output: 'A practical event outline and starting checklist',
            nextAction: 'Start from scratch',
            routeKey: 'firstPlan'
          },
          {
            title: 'Concept structuring (organize ambiguity)',
            input: 'Scattered notes and partial ideas',
            output: 'A prioritized and executable plan structure',
            nextAction: 'Organize my plan',
            routeKey: 'organizePlan'
          },
          {
            title: 'Draft diagnosis (gap check)',
            input: 'Your current draft',
            output: 'Missing items and revision guidance',
            nextAction: 'Diagnose my draft',
            routeKey: 'diagnoseDraft'
          }
        ]
      },
      steps: {
        eyebrow: '5-Step Operations',
        title: 'Standardize execution from launch to settlement',
        lead: 'Run each event with the same operational sequence and traceable records.',
        items: [
          {
            title: 'Rule setup',
            body: 'Define participation conditions, notices, and refund policy before publishing.'
          },
          {
            title: 'Registration management',
            body: 'Collect required fields and consent with live status tracking.'
          },
          {
            title: 'Payment traceability',
            body: 'Link payment records to registration records for faster verification.'
          },
          {
            title: 'Notification execution',
            body: 'Send reminders and updates through one reliable operational channel.'
          },
          {
            title: 'Settlement review',
            body: 'Close each event with clear records and carry learnings forward.'
          }
        ]
      },
      proof: {
        eyebrow: 'Proof',
        title: 'Operational impact by measurable metrics',
        lead: 'Track outcomes with operational numbers, not impressions.',
        metrics: [
          {
            title: 'Inquiry volume',
            value: '-XX%',
            note: 'Measured over the first 3 months after onboarding'
          },
          {
            title: 'Preparation effort',
            value: '-XX%',
            note: 'Compared against pre-adoption preparation workload'
          },
          {
            title: 'Time to settlement close',
            value: '-XX days',
            note: 'From event end date to settlement completion'
          }
        ]
      },
      trust: {
        eyebrow: 'Trust',
        title: 'What you can verify before adoption',
        lead: 'Clear operational conditions help teams decide quickly and safely.',
        items: [
          {
            title: 'What is required to start',
            body: 'A LINE account and basic event information are enough for initial setup.'
          },
          {
            title: 'Time to first use',
            body: 'You can start pilot operation on the same day after setup.'
          },
          {
            title: 'Payment and data policy',
            body: 'Registration and payment records stay linked for traceable operations.'
          },
          {
            title: 'Frequently asked questions',
            body: 'Pricing, onboarding, and workflow FAQs are available before rollout.'
          }
        ]
      },
      cta: {
        eyebrow: 'Start',
        title: 'Choose the right entry for your planning stage',
        body: 'Jump directly into the workflow that matches your current task.',
        actions: [
          {
            label: 'Start from scratch',
            routeKey: 'firstPlan',
            variant: 'primary'
          },
          {
            label: 'Organize my plan',
            routeKey: 'organizePlan',
            variant: 'secondary'
          },
          {
            label: 'Diagnose my draft',
            routeKey: 'diagnoseDraft',
            variant: 'ghost'
          }
        ]
      }
    },
    about: {
      eyebrow: 'Philosophy',
      title: 'SocialMore as structure',
      definition:
        'SocialMore designs collaboration structures that do not rely on consensus for a world where fracture is normal, and validates their scalability through community operations.',
      stance: 'SocialMore does not remove differences; it provides structures for collaboration in a fractured world.',
      sections: [
        {
          title: 'Problem',
          lines: [
            'When multilingual outreach, registration, payment, and participant management run in parallel, rule boundaries blur.',
            'If capacity, refunds, and notices are unclear at publishing, responsibility becomes untraceable.',
            'We need structure that fixes rules and permissions before publishing and keeps registration/payment records.'
          ]
        },
        {
          title: 'World View',
          lines: [
            'Fracture is the norm; shared emotion or narrative cannot sustain long-term collaboration.',
            'Structure that traces visibility, registration conditions, collection, and payouts is what sustains collaboration.',
            'SocialMore ties publish → registration → payment → rule notice → payout into one responsibility line.'
          ]
        },
        {
          title: 'Why Communities',
          lines: [
            'Communities are heterogeneous; rule gaps surface as disorder quickly.',
            'Portal visibility and registration conditions can be tested at a small scale.',
            'Only structures that survive here deserve to scale.'
          ]
        },
        {
          title: 'What We Do',
          lines: [
            'The organizer interface fixes visibility, approvals, capacity, refunds, and notices before publishing.',
            'Mobile registration collects required fields and consent, recording participation and responsibility.',
            'Collection and payout settings make cost and responsibility traceable.'
          ]
        },
        {
          title: 'Mission',
          lines: [
            'Design collaboration structures that do not rely on consensus for a fractured world.',
            'Apply those structures across publishing, registration, payment, payout, and portals.',
            'Success means records remain for registration, payment, and payout.'
          ]
        },
        {
          title: 'Why Now',
          lines: [
            'Collaboration ability spreads fast; even small events carry payment and responsibility.',
            'Multilingual participation is normal, so the same rules must be presented consistently.',
            'Now is the moment to make rules and costs traceable.'
          ]
        }
      ]
    },
    services: {
      eyebrow: 'Platform overview',
      title: 'Support & content',
      subtitle: 'Community operations × Event technology × Multicultural connections',
      communityTitle: 'For community organizers',
      companyTitle: 'For companies & public partners',
      iconHighlights: [
        {
          title: 'Support at your side',
          description: 'A workflow that stays close through planning, sign-ups, communication, and wrap-up.',
          iconKey: 'membership'
        },
        {
          title: 'Event infrastructure',
          description: 'Reliable stack for applications, payments, and onsite logistics.',
          iconKey: 'community'
        },
        {
          title: 'Multicultural relations',
          description: 'Connect foreign resident communities with companies so field insights reach the right teams.',
          iconKey: 'ai'
        }
      ],
      communityCards: [
        {
          title: 'Event tools',
          iconKey: 'eventTools',
          bullets: ['Multilingual signup pages', 'Capacity & reminder management', 'Check-in plus summaries']
        },
        {
          title: 'Payments & costs',
          iconKey: 'finance',
          bullets: ['Online fee collection', 'Simple reconciliation', 'Automatic receipts']
        },
        {
          title: 'Communication',
          iconKey: 'communication',
          bullets: ['Templates across languages', 'Bulk updates to participants', 'Shared notes with partners']
        }
      ],
      companyCards: [
        {
          title: 'Community collaboration',
          iconKey: 'collaboration',
          bullets: ['Co-create cultural exchanges', 'Onsite experience programs', 'Field facilitation support']
        },
        {
          title: 'Field essentials',
          iconKey: 'insight',
          bullets: ['Feedback from multicultural events', 'Participant data highlights', 'Shared challenges & opportunities']
        },
        {
          title: 'Program support',
          iconKey: 'program',
          bullets: ['Skill sessions and life info workshops', 'Joint projects with cities & firms', 'Evaluation and improvement reports']
        }
      ],
      plansTitle: 'Sample companion programs',
      plans: [
        { name: 'Starter', description: 'For pilots and small teams', bullets: ['Up to 500 members', '3 events per month', 'Email support'] },
        { name: 'Partnership', description: 'For ongoing operations', bullets: ['Unlimited events', 'Multi-location & multilingual care', 'Dedicated CS manager'] },
        { name: 'Enterprise', description: 'For large programs', bullets: ['API integrations', 'SSO / IAM', '24/7 support'] }
      ],
      planNote: 'Plans are illustrative. Contact us for a tailored scope.'
    },
    news: {
      eyebrow: 'SOCIALMORE Blog',
      title: 'SOCIALMORE Blog',
      intro: 'Stories about our incorporation, releases, and community collaborations.',
      detail: {
        back: 'Back to news',
        notFoundTitle: 'Article not found',
        notFoundCopy: 'Please check the link or return to the news list.'
      }
    },
    contact: {
      eyebrow: 'Contact',
      title: 'We would love to hear from you',
      intro:
        'Whether you need help running events, want to explore collaborations, or plan to join our community projects, feel free to reach out. We will connect you with the right teammate. We protect any personal information you share and only use it to respond to your inquiry.',
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
        email: 'admin@socialmore.co.jp',
        encouragement: 'We welcome conversations from organizers, companies, municipalities, and individuals alike.'
      }
    },
      footer: {
        company: {
          name: 'SOCIALMORE Inc.',
          address: '3-27-1 Sankyo Bldg 2F, Shimorenjaku, Mitaka, Tokyo 181-0013'
        },
        contact: {
          title: 'Contact',
          emailLabel: 'Email',
          email: 'admin@socialmore.co.jp',
          phoneLabel: 'Phone',
          phone: '080-6567-1105',
          hours: 'Weekdays 10:00-18:00 JST'
        },
      links: {
        title: 'Legal',
        privacy: 'Privacy policy',
        terms: 'Terms of use'
      },
      copyright: '© 2025 SOCIALMORE Inc.'
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
            body: ['Please contact admin@socialmore.co.jp for privacy-related questions.']
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
            body: ['Please reach out to admin@socialmore.co.jp regarding these terms.']
          }
        ]
      }
    }
  },
  zh: {
    nav: {
      home: '首页',
      about: '理念',
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
        eyebrow: 'MORE | Community Operating System',
        title: '主办方可以在 LINE 上拥有可复用的运营基盘',
        subtitle: '通过 LINE Mini App 直接使用，主办方和参与者都无需下载 App。',
        coreMessage: '把发布、报名、收款、通知、结算放进同一流程，运营可复制、可追踪。',
        stance: '面向主办方日常实务设计的运营OS。',
        primaryCta: '立即在 LINE 体验',
        secondaryCta: '从零开始企划',
        results: [
          {
            label: '咨询量下降',
            value: '-XX%',
            note: '减少重复问答，释放准备时间'
          },
          {
            label: '当日运作稳定',
            value: '-XX%',
            note: '降低签到与现场协调失误'
          },
          {
            label: '结算可预测',
            value: '-XX天',
            note: '缩短活动结束到结算完成时间'
          }
        ]
      },
      why: {
        eyebrow: 'Why',
        title: '主办方常常还在靠个人硬扛运营',
        lead: '一个人扛全部、规则反复解释、活动结果临近开始仍不可预测，是最常见的运营状态。',
        points: [
          {
            title: '主办方一个人扛全部',
            body: '从设置活动到回复问题、确认收款、现场协调都压在同一人身上。'
          },
          {
            title: '规则需要反复解释',
            body: '报名条件、注意事项、退款规则分散在不同对话中，反复沟通成本高。'
          },
          {
            title: '运营结果不可预测',
            body: '报名与收款状态不同步，导致活动前集中补救。'
          }
        ]
      },
      scenarios: {
        eyebrow: '企划助手',
        title: '三种企划场景',
        lead: '按当前阶段进入对应流程，快速拿到下一步。',
        inputLabel: '输入',
        outputLabel: '输出',
        nextActionLabel: '下一步',
        items: [
          {
            title: '企划咨询（从零开始）',
            input: '目标与受众',
            output: '可执行的企划骨架与清单',
            nextAction: '从零开始企划',
            routeKey: 'firstPlan'
          },
          {
            title: '构想整理（收敛模糊方案）',
            input: '分散笔记与零散需求',
            output: '结构化优先级与执行顺序',
            nextAction: '整理方案',
            routeKey: 'organizePlan'
          },
          {
            title: '草案诊断（查漏补缺）',
            input: '已有活动草案',
            output: '缺失项与修正建议',
            nextAction: '诊断草案',
            routeKey: 'diagnoseDraft'
          }
        ]
      },
      steps: {
        eyebrow: '5-Step Operations',
        title: '把运营流程标准化',
        lead: '将每场活动固定到同一套步骤，减少临时决策。',
        items: [
          {
            title: '规则设定',
            body: '上线前明确报名条件、注意事项与退款规则。'
          },
          {
            title: '报名管理',
            body: '统一收集信息与同意项，实时掌握报名状态。'
          },
          {
            title: '支付留痕',
            body: '支付记录关联报名记录，核对更快。'
          },
          {
            title: '通知执行',
            body: '提醒、变更、当日信息通过统一入口发送。'
          },
          {
            title: '结算复盘',
            body: '活动结束后快速结算，并沉淀下次可复用数据。'
          }
        ]
      },
      proof: {
        eyebrow: 'Proof',
        title: '可验证的运营指标',
        lead: '用可追踪数字评估运营改善效果。',
        metrics: [
          {
            title: '咨询件数',
            value: '-XX%',
            note: '统计周期：导入后3个月'
          },
          {
            title: '准备工时',
            value: '-XX%',
            note: '对比导入前后同规模活动'
          },
          {
            title: '结算完成时间',
            value: '-XX天',
            note: '从活动结束到结算完成的平均天数'
          }
        ]
      },
      trust: {
        eyebrow: '安心材料',
        title: '导入前可确认的信息',
        lead: '关键条件透明，便于团队快速判断。',
        items: [
          {
            title: '导入所需条件',
            body: '仅需 LINE 账号和基础活动信息，无需额外开发。'
          },
          {
            title: '开始使用所需时间',
            body: '完成初始设置后可在当天开始测试运作。'
          },
          {
            title: '支付与数据管理方针',
            body: '报名与支付记录关联管理，支持后续追溯与核对。'
          },
          {
            title: '常见问题',
            body: '提供费用、流程、实施方式等 FAQ 供导入前确认。'
          }
        ]
      },
      cta: {
        eyebrow: 'Start',
        title: '按你的企划阶段直接进入对应流程',
        body: '选择入口后，直接跳转到对应的企划助手流程。',
        actions: [
          {
            label: '从零开始企划',
            routeKey: 'firstPlan',
            variant: 'primary'
          },
          {
            label: '整理方案',
            routeKey: 'organizePlan',
            variant: 'secondary'
          },
          {
            label: '诊断草案',
            routeKey: 'diagnoseDraft',
            variant: 'ghost'
          }
        ]
      }
    },
    about: {
      eyebrow: '理念',
      title: '作为结构的 SocialMore',
      definition:
        'SocialMore 是为分裂常态的世界设计不依赖共识的协作结构，并用社群场景验证其可扩展性的运行系统。',
      stance: 'SocialMore 不是在消除分歧，而是在为分裂的世界，提供可协作的结构。',
      sections: [
        {
          title: 'Problem',
          lines: [
            '多语言发布、报名、支付与参与者管理并行时，规则边界会变模糊。',
            '定员、退款、注意事项未在发布前明确时，责任就无法追溯。',
            '因此需要在发布前固定规则与权限，并保留报名与收款记录。'
          ]
        },
        {
          title: 'World View',
          lines: [
            '分裂是常态，情绪与统一叙事无法支撑长期协作。',
            '可持续协作依赖于可追溯的公开范围、报名条件、收款与结算结构。',
            'SocialMore 把发布→报名→收款→规则告知→结算连成一条责任线。'
          ]
        },
        {
          title: 'Why Communities',
          lines: [
            '社群高度异质，规则缺口会迅速造成失序。',
            '通过门户公开范围与报名条件，可以在小尺度验证结构。',
            '只有在社群中跑通的结构才具备扩展资格。'
          ]
        },
        {
          title: 'What We Do',
          lines: [
            '主理人运用画面固定公开范围、审批、定员、退款与注意事项。',
            '移动端报名收集必填信息与同意，记录参与与责任。',
            '收款与结算设置让成本与责任流向可追溯。'
          ]
        },
        {
          title: 'Mission',
          lines: [
            '为必然分裂的世界设计不依赖共识的协作结构。',
            '这些结构覆盖发布、报名、收款、结算与门户。',
            '报名、收款与结算的记录可追溯即是成果。'
          ]
        },
        {
          title: 'Why Now',
          lines: [
            '协作能力扩散，小规模活动也伴随收款与责任。',
            '多语言参与成为日常，同一规则需要一致表达。',
            '现在必须把规则与成本做成可追溯结构。'
          ]
        }
      ]
    },
    services: {
      eyebrow: '平台介绍',
      title: '支援内容',
      subtitle: '社群运营 × 活动技术 × 多文化连结',
      communityTitle: '面向社群主理人（主办方）',
      companyTitle: '面向企业与机构（Partners）',
      iconHighlights: [
        { title: '贴身支援', description: '以一条完整流程，贴身陪伴企划、报名、沟通与复盘。', iconKey: 'membership' },
        { title: '活动运营基础设施', description: '报名、支付、语言支持、会场协作一体化。', iconKey: 'community' },
        { title: '多文化关系网络', description: '连结在留外国人社群与企业，把现场声音传递到正确团队。', iconKey: 'ai' }
      ],
      communityCards: [
        {
          title: '活动运营工具（Event Tools）',
          iconKey: 'eventTools',
          bullets: ['报名、通知、签到、数据管理一次完成', '多语言界面降低沟通负担', '活动模板可快速复用']
        },
        {
          title: '费用与支付（Payment）',
          iconKey: 'finance',
          bullets: ['支持线上收费与简单结算', '自动整理收支与凭证', '减少手动对账时间']
        },
        {
          title: '沟通与协作（Communication）',
          iconKey: 'communication',
          bullets: ['多语言沟通与提醒', '参与者与志愿者同步', '合作方共享关键资讯']
        }
      ],
      companyCards: [
        {
          title: '社区协作（Community Collaboration）',
          iconKey: 'collaboration',
          bullets: ['文化交流与体验项目', '真实社群现场活动', '主办端与企业端双向沟通']
        },
        {
          title: '现场要点（Insight）',
          iconKey: 'insight',
          bullets: ['来自多文化活动的反馈', '参与者画像与需求摘要', '协助制定沟通策略']
        },
        {
          title: '合作项目支持（Programs）',
          iconKey: 'program',
          bullets: ['与企业／自治体共同策划讲座或体验', '技能与生活信息课程', '评估与后续改进建议']
        }
      ],
      plansTitle: '贴身计划示例',
      plans: [
        { name: '入门计划', description: '适合试点与小型团队', bullets: ['最多 500 名成员', '每月 3 场活动', '邮件支持'] },
        { name: '伙伴计划', description: '适合持续运营与多据点协作', bullets: ['不限活动数量', '多地点与多语言支持', '专属成功经理'] },
        { name: '企业计划', description: '面向大型项目或机构', bullets: ['API 集成', 'SSO / IAM', '24/7 支持'] }
      ],
      planNote: '以上为示例方案，欢迎来信取得客制化内容。'
    },
    news: {
      eyebrow: 'SOCIALMORE 博客',
      title: 'SOCIALMORE 博客',
      intro: '记录公司成立、产品更新与社群故事的博客。',
      detail: {
        back: '返回新闻列表',
        notFoundTitle: '找不到相关新闻',
        notFoundCopy: '请确认连结是否正确，或返回新闻列表。'
      }
    },
    contact: {
      eyebrow: '联系我们',
      title: '欢迎与我们联系',
      intro:
        '无论是社群活动的运营支持、合作交流的机会，或是希望参与我们的社区项目，都欢迎随时联系我们。我们会根据内容安排最合适的成员与您对接。我们也会依照个人信息保护原则，仅为回应咨询而使用您提供的联络资讯，请放心。',
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
        email: 'admin@socialmore.co.jp',
        encouragement: '欢迎自治体、企业、社群伙伴与个人来信，我们会尽快回复。'
      }
    },
    footer: {
      company: {
        name: 'SOCIALMORE（创翔莫尔株式会社）',
        address: '〒181-0013 东京都三鹰市下连雀3-27-1 三协大楼2层'
      },
      contact: {
        title: '联系 SOCIALMORE',
        emailLabel: '邮箱',
        email: 'admin@socialmore.co.jp',
        phoneLabel: '电话',
        phone: '080-6567-1105',
        hours: '工作日 10:00-18:00（日本时间）'
      },
      links: {
        title: '法律信息',
        privacy: '隐私政策',
        terms: '使用条款'
      },
      copyright: '© 2025 SOCIALMORE Inc. 保留所有权利。'
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
            body: ['关于隐私问题，请寄信至 admin@socialmore.co.jp。']
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
            body: ['条款相关问题请联络 admin@socialmore.co.jp。']
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
