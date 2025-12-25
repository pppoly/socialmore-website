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
        eyebrow: 'SocialMore 構造設計',
        title: '分裂は常態、協働は構造でしか続かない',
        subtitle:
          '主催者はコミュニティの運営主体として、イベントを通じて担い手を結び、運営責任を引き受ける存在です。個人から企業・団体・自治体・NPO まで含みます。',
        definition:
          'SocialMore は分裂が常態の世界に、合意に依存しない協働構造を設計し、コミュニティの現場で拡張性を検証する運用システムです。',
        stance: 'SocialMore は対立を消すのではなく、分裂した世界に協働可能な構造を提供します。',
        primaryCta: '主催者です',
        secondaryCta: '今すぐ体験',
        panelEyebrow: '構造の射程',
        panelTitle: '公開前に責任とルールを固定する',
        panelItems: [
          {
            title: 'ルール化された公開',
            body: '公開範囲、承認、キャンセル待ち、注意事項、返金条件を公開前に固定。'
          },
          {
            title: '責任とコストの可視化',
            body: '申込状況、決済、振込を追跡できる状態で運用。'
          },
          {
            title: '同一ルールの多言語提示',
            body: '日/英/中で同義の規則を提示し、責任の曖昧さを減らす。'
          }
        ]
      },
      why: {
        eyebrow: '課題',
        title: '主催者が最初に失うのは時間ではなく責任の境界',
        lead:
          '多言語対応、申込、決済、参加者管理、現場運営が同時に動くと、ルールの境界が曖昧になり責任が溶けます。',
        points: [
          {
            title: '構造不在は責任不在',
            body: '定員・申込条件・返金・注意事項が曖昧だと、誰が何を担うかが追跡不能になる。'
          },
          {
            title: '審査から運営へ、境界を固定',
            body: '主催者の審査を入口にし、運営画面で公開範囲と権限を規定する。'
          },
          {
            title: '記録がある協働だけが継続する',
            body: '申込状態、決済、同意内容が残るため、イベント後も運営が持続する。'
          }
        ]
      },
      how: {
        eyebrow: '流れ',
        title: '公開から精算まで、構造を途切れさせない',
        lead:
          '主催者の運営画面とモバイルの流れで、公開/申込/決済/ルール告知/振込を一続きの責任構造にする。',
        steps: [
          {
            title: '公開',
            body: 'カテゴリ、公開範囲、承認、キャンセル待ち、注意事項、返金ルールを設定。'
          },
          {
            title: '申込',
            body: '申込フォームの必須項目と同意を収集し、定員を追跡。'
          },
          {
            title: '決済',
            body: 'Stripe 連携を有効化し、参加費を回収。'
          },
          {
            title: 'ルール告知',
            body: 'リスク、返金、同意文を表示して責任を明文化。'
          },
          {
            title: '振込',
            body: '振込設定で収益の流れを確定。'
          }
        ]
      },
      what: {
        eyebrow: '構造能力',
        title: '三つの構造能力',
        lead: '機能の説明ではなく、責任とコストを固定する構造として実装しています。',
        items: [
          {
            title: 'イベントの構造',
            body: '公開範囲、承認、定員、返金、注意事項、必須項目を事前に固定する。',
            evidence: [
              'イベント作成フォームでルール/定員/申込条件を設定',
              '注意事項と返金条件を公開ページに表示',
              '申込状況と定員を可視化'
            ]
          },
          {
            title: 'コミュニティの構造',
            body: 'ポータルの公開範囲と情報設計で、外部に対する責任境界を作る。',
            evidence: [
              '公開/限定/非公開の範囲を選択',
              'ポータルの表示ブロックとテーマを設定',
              'ラベルと紹介文でコミュニティの責任範囲を明示'
            ]
          },
          {
            title: '決済と精算の構造',
            body: '決済と振込の設定を可視化し、コストと責任を追跡可能にする。',
            evidence: [
              'Stripe 連携で決済を開始',
              'プランと手数料を明示',
              '振込設定で精算フローを固定'
            ]
          }
        ]
      },
      ai: {
        eyebrow: 'AI 補助',
        title: 'AI は構造の実行補助として働く',
        items: [
          'AI が注意事項・リスク・返金・同意文の下書きを作成し、主催者が確認・確定',
          'AI が多言語の意味を揃え、同じルールを同じルールとして伝える',
          'AI が公開前に不足項目（定員/締切/返金/必須項目等）を指摘'
        ]
      },
      proof: {
        eyebrow: '運用事例',
        title: '公開事例',
        lead: '公開可能な事例は整理中です。',
        items: ['コミュニティポータルの公開事例', '決済/振込の運用事例', '多言語ルールの運用事例'],
        placeholder: '準備中'
      },
      cta: {
        eyebrow: '開始',
        title: '構造を先に決めてから動かす',
        body: '主催者として責任の境界線を引くか、まず体験して構造の流れを確かめてください。',
        primary: '主催者です',
        secondary: '今すぐ体験',
        tertiary: '導入相談を予約'
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
        eyebrow: 'SOCIALMORE STRUCTURE',
        title: 'Fracture is normal; collaboration only lasts with structure',
        subtitle:
          'An organizer is the community operator who connects actors through events and carries operational responsibility. Organizers can be individuals or organizations such as companies, institutions, local governments, or NPOs.',
        definition:
          'SocialMore designs collaboration structures that do not rely on consensus for a world where fracture is normal, and validates their scalability through community operations.',
        stance: 'SocialMore does not remove differences; it provides structures for collaboration in a fractured world.',
        primaryCta: "I'm an organizer",
        secondaryCta: 'Try now',
        panelEyebrow: 'Structure scope',
        panelTitle: 'Fix rules and responsibility before publishing',
        panelItems: [
          {
            title: 'Rule-bound publishing',
            body: 'Visibility, approvals, waitlists, notices, and refund terms are fixed before launch.'
          },
          {
            title: 'Responsibility and cost visibility',
            body: 'Registration status, payments, and payouts stay traceable.'
          },
          {
            title: 'Same rules across languages',
            body: 'JA/EN/ZH communicate identical rules to reduce ambiguity.'
          }
        ]
      },
      why: {
        eyebrow: 'Why',
        title: 'Organizers lose responsibility boundaries before they lose time',
        lead:
          'When multilingual outreach, registrations, payments, participant management, and onsite operations run in parallel, rules blur and responsibility dissolves.',
        points: [
          {
            title: 'No structure means no responsibility',
            body: 'Without clear capacity, conditions, refunds, and notices, accountability becomes untraceable.'
          },
          {
            title: 'Review → operations fix boundaries',
            body: 'Organizer review defines visibility and permissions before operations begin.'
          },
          {
            title: 'Recorded collaboration is the only durable one',
            body: 'Registration status, payments, and consent stay recorded after the event ends.'
          }
        ]
      },
      how: {
        eyebrow: 'How',
        title: 'Keep structure continuous from publish to payout',
        lead:
          'Organizer operations and mobile flows connect publishing, registration, payment, rule notices, and payout into one responsibility chain.',
        steps: [
          {
            title: 'Publish',
            body: 'Set category, visibility, approvals, waitlists, notices, and refund rules.'
          },
          {
            title: 'Registration',
            body: 'Collect required fields and consent while tracking capacity.'
          },
          {
            title: 'Payment',
            body: 'Enable Stripe and collect participation fees.'
          },
          {
            title: 'Rule notice',
            body: 'Present risks, refunds, and consent text to make responsibility explicit.'
          },
          {
            title: 'Payout',
            body: 'Fix payout settings to confirm settlement flow.'
          }
        ]
      },
      what: {
        eyebrow: 'What',
        title: 'Three structural capabilities',
        lead: 'These are not “features” but structures that fix responsibility and cost.',
        items: [
          {
            title: 'Event structure',
            body: 'Fix visibility, approvals, capacity, refunds, notices, and required fields in advance.',
            evidence: [
              'Event form defines rules, capacity, and registration conditions',
              'Notices and refund terms show on the public flow',
              'Registration status and capacity remain visible'
            ]
          },
          {
            title: 'Community structure',
            body: 'Portal visibility and information design create an external responsibility boundary.',
            evidence: [
              'Choose public/limited/private visibility',
              'Configure portal blocks and themes',
              'Labels and descriptions define community scope'
            ]
          },
          {
            title: 'Payment & settlement structure',
            body: 'Make collection and payout settings traceable for cost and responsibility.',
            evidence: [
              'Stripe onboarding opens collection',
              'Plans and fees are explicit',
              'Payout settings fix settlement flow'
            ]
          }
        ]
      },
      ai: {
        eyebrow: 'AI Co-Pilot',
        title: 'AI only reduces friction in executing structure',
        items: [
          'AI drafts notices, risk, refund, and consent text, and organizers confirm and finalize',
          'AI aligns meanings across languages so the same rules stay the same rules',
          'AI flags missing items before publishing (capacity, deadline, refunds, required fields)'
        ]
      },
      proof: {
        eyebrow: 'Proof',
        title: 'Operational cases',
        lead: 'Public case materials are in preparation.',
        items: ['Community portal releases', 'Collection/payout operations', 'Multilingual rule operations'],
        placeholder: 'In preparation'
      },
      cta: {
        eyebrow: 'Start',
        title: 'Fix the structure before you move',
        body: 'Start as an organizer to define responsibility boundaries, or try the flow first to validate the structure.',
        primary: "I'm an organizer",
        secondary: 'Try now',
        tertiary: 'Book a consult'
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
        eyebrow: 'SOCIALMORE STRUCTURE',
        title: '分裂是常态，协作必须靠结构',
        subtitle:
          '主理人是社群的组织者，通过活动连接行动者并承担运营责任。主理人可以是个人或组织（企业、机构、政府部门、NPO 等）。',
        definition:
          'SocialMore 是为分裂常态的世界设计不依赖共识的协作结构，并用社群场景验证其可扩展性的运行系统。',
        stance: 'SocialMore 不是在消除分歧，而是在为分裂的世界，提供可协作的结构。',
        primaryCta: '我是主理人',
        secondaryCta: '立即体验',
        panelEyebrow: '结构边界',
        panelTitle: '在公开前固定责任与规则',
        panelItems: [
          {
            title: '规则化发布',
            body: '公开范围、审批、候补、注意事项、退款条件在发布前固定。'
          },
          {
            title: '责任与成本可视化',
            body: '报名状态、收款与打款保持可追溯。'
          },
          {
            title: '同一规则的多语言表达',
            body: '日/英/中传达同一规则，降低责任歧义。'
          }
        ]
      },
      why: {
        eyebrow: 'Why',
        title: '主理人最先失去的不是时间，而是责任边界',
        lead:
          '多语言、报名、收款、参与者管理与现场运营并行时，规则边界会迅速模糊，责任被稀释。',
        points: [
          {
            title: '没有结构就没有责任',
            body: '定员、报名条件、退款与注意事项不清晰时，责任无法追溯。'
          },
          {
            title: '审查 → 运用先定边界',
            body: '主理人审查作为入口，明确公开范围与权限。'
          },
          {
            title: '有记录的协作才可持续',
            body: '报名状态、支付与同意记录留存，活动结束后仍可追溯。'
          }
        ]
      },
      how: {
        eyebrow: 'How',
        title: '从发布到结算，结构不断链',
        lead:
          '主理人运用画面与移动端流程把发布/报名/收款/规则告知/结算串成责任链路。',
        steps: [
          {
            title: '发布',
            body: '设置分类、公开范围、审批、候补、注意事项与退款规则。'
          },
          {
            title: '报名',
            body: '收集必填信息与同意项，并追踪定员。'
          },
          {
            title: '收款',
            body: '开通 Stripe 收款并收取参与费用。'
          },
          {
            title: '规则告知',
            body: '展示风险、退款、同意文，明确责任边界。'
          },
          {
            title: '结算',
            body: '配置打款设置，固定结算流程。'
          }
        ]
      },
      what: {
        eyebrow: 'What',
        title: '三类结构能力',
        lead: '不是功能堆叠，而是责任与成本的结构化。',
        items: [
          {
            title: '活动结构',
            body: '在发布前固定公开范围、审批、定员、退款、注意事项与必填项。',
            evidence: [
              '活动表单定义规则、定员与报名条件',
              '注意事项与退款条款在公开流程中呈现',
              '报名状态与定员保持可视化'
            ]
          },
          {
            title: '社群结构',
            body: '通过门户公开范围与信息架构，建立对外责任边界。',
            evidence: [
              '公开/限定/非公开范围选择',
              '门户区块与主题配置',
              '标签与介绍定义社群范围'
            ]
          },
          {
            title: '收款与结算结构',
            body: '收款与打款设置可追溯，成本与责任清晰。',
            evidence: [
              'Stripe 入驻开通收款',
              '方案与手续费明确',
              '打款设置固定结算流程'
            ]
          }
        ]
      },
      ai: {
        eyebrow: 'AI 协作',
        title: 'AI 仅用于降低结构执行摩擦',
        items: [
          'AI 起草注意事项、风险、退款、同意文，由主理人确认与定稿',
          'AI 保持多语言含义一致，让同一规则仍是同一规则',
          'AI 在发布前指出缺失项（定员/截止/退款/必填项等）'
        ]
      },
      proof: {
        eyebrow: 'Proof',
        title: '运用案例',
        lead: '公开案例整理中。',
        items: ['社群门户公开案例', '收款/结算运用案例', '多语言规则运用案例'],
        placeholder: '准备中'
      },
      cta: {
        eyebrow: 'Start',
        title: '先把结构定下来',
        body: '作为主理人明确运营责任线，或先体验流程确认结构。',
        primary: '我是主理人',
        secondary: '立即体验',
        tertiary: '预约导入咨询'
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
