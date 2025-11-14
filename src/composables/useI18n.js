import { reactive, computed } from 'vue';

export const supportedLocales = [
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'my', label: 'မြန်မာ' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'fil', label: 'Filipino' }
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


/* --------------------------------------------------------
   JAPANESE (ja) — MASTER VERSION (DO NOT MODIFY)
-------------------------------------------------------- */
ja: {
  home: {
    hero: {
      title: "在日コミュニティ主催者を支える、やさしいテックサービス",
      subtitle: "SOCIALMORE は、コミュニティ主催者がイベントを開きやすくするための、軽量で実用的なテクノロジーサービスです。企画、募集、決済、多言語コミュニケーション、会場協力など、運営の負担を減らし、活動が続くための土台を整えます。活動を重ねることで、多文化コミュニティとの確かなネットワークが育ち、企業や自治体との協働にもつながります。",
      primaryCta: "サービスを見る",
      secondaryCta: "お問い合わせ"
    },
    focus: {
      title: "私たちが取り組んでいること",
      community: "在日コミュニティ主催者が、日々の活動を無理なく続けられるよう、募集・運営・会計・連絡をまとめて支える仕組みを提供します。",
      eventInfra: "イベント運営で最も負担の大きい「受付・決済・告知・会場探し」を軽量化し、主催者がコンテンツと参加者に集中できる環境を整えます。",
      multiCulture: "外国人労働者や留学生を中心とした多文化コミュニティとつながり、現場の声を丁寧に拾いながら、日本社会との協働を生み出します。"
    },
    highlights: {
      title: "主催者を支えるための実用的な機能",
      items: [
        "イベント募集と管理：多言語フォーム、人数管理、自動集計など、募集の手間を削減します。",
        "オンライン決済と簡易会計：参加費の回収・照合をスムーズにし、小規模イベントでも安心して運営できます。",
        "多言語コミュニケーション：日本語・中国語・英語ほか、多文化コミュニティに対応した連絡手段を提供します。",
        "運営リソース協力：会場、協力者、ゲスト、地域のつながりなど、コミュニティ運営に必要なリソースをご紹介できます。"
      ]
    },
    now: {
      title: "現在進行中の取り組み",
      items: [
        "三鷹エリアを中心に、地域コミュニティと共同でシステムを検証中",
        "外国人コミュニティの生活・学習支援イベントを運営",
        "企業・自治体との多文化協働の可能性を探るプロジェクトを開始",
        "主催者向けの運営ツール・リソース協力機能を改善中"
      ]
    }
  },
  about: {
    title: "SOCIALMORE について",
    body: "SOCIALMORE（株式会社創翔モア）は、東京・三鷹を拠点とするテックカンパニーです。私たちは長年、コミュニティイベントを自ら企画・運営してきた経験から、主催者が抱える課題や負担を深く理解してきました。テクノロジーは、運営の手間を減らすための道具であり、目的ではありません。主催者が安心して活動を続け、コミュニティが成長していくための「土台」をつくることを大切にしています。",
    vision: "多文化が共に暮らし、学び、つながる社会を、コミュニティの現場から支えていく。",
    values: [
      "現場主義：実際のコミュニティ現場で必要とされることから発想する。",
      "軽量なテクノロジー：複雑さを増やさず、運営負担を減らすための技術だけを磨く。",
      "多文化協働：在日外国人コミュニティと日本社会の橋渡しを目指す。",
      "長期的な伴走：コミュニティが続く限り、私たちもそばで支える。"
    ]
  },
  services: {
    platformTitle: "私たちのサービス",
    organizers: {
      title: "主催者の負担を軽くし、活動を続けやすくするために",
      cards: [
        "イベント運営ツール：募集・連絡・受付・データ管理を一つにまとめ、運営を効率化します。",
        "決済・会計サポート：参加費のオンライン決済と簡易会計で、煩雑な対面回収を軽減します。",
        "コミュニケーション：多言語対応の連絡手段により、参加者との意思疎通をスムーズにします。"
      ]
    },
    companies: {
      title: "多文化コミュニティとの協働をサポート",
      cards: [
        "コミュニティ連携：実際のコミュニティと協働して文化交流・ワークショップ・体験イベントを企画できます。",
        "現場のインサイト：多文化コミュニティの課題やニーズを、活動を通じて把握できます。",
        "協働プログラム：企業・自治体と共同でイベント・研修・支援プロジェクトを設計できます。"
      ]
    }
  },
  contact: {
    title: "お気軽にご相談ください",
    body: "コミュニティ運営やイベント支援、企業・自治体との協働、多文化コミュニティとのつながりづくりなど、小さな相談でも歓迎いたします。内容に応じて最適な担当者が対応します。"
  },
  news: {
    body: "コミュニティ連携の事例、プロジェクトの進捗、リリース情報などを発信していきます。"
  }
},


/* --------------------------------------------------------
   CHINESE (zh) — MASTER VERSION (DO NOT MODIFY)
-------------------------------------------------------- */
zh: {
  home: {
    hero: {
      title: "为在日社群主理人提供支持的轻量科技服务",
      subtitle: "SOCIALMORE 通过简单实用的技术工具，让社群主理人更轻松地举办活动。从策划、报名、费用、沟通，到场地协作，我们帮助降低运营成本，让社群可以长期持续。活动不断累积，多文化社群网络自然形成，也更容易与企业和机构展开合作。",
      primaryCta: "查看服务",
      secondaryCta: "联系我们"
    },
    focus: {
      title: "我们专注的方向",
      community: "支持社群主理人降低运营负担，让活动可持续推进。提供募集、管理、沟通与基础结算的一体化工具。",
      eventInfra: "简化活动中最繁琐的部分——报名、收费、通知、场地协作，让主理人能更专注内容与参与者。",
      multiCulture: "通过长期的活动运营，与多文化社群建立稳定连接，特别是外国劳动者与留学群体，为他们与日本社会之间搭建真实的桥梁。"
    },
    highlights: {
      title: "让活动变轻松的关键功能",
      items: [
        "活动募集与管理：多语言报名表、人数管理与自动汇总。",
        "在线支付与简单结算：轻松收取活动费用并自动记录。",
        "多语言沟通：支持中、日、英等语言，更适合多文化社区。",
        "运营资源协作：提供场地、合作方、嘉宾等活动资源对接。"
      ]
    },
    now: {
      title: "我们正在推进的项目",
      items: [
        "在三鹰与本地社群共同测试系统",
        "支持多文化社群的生活与学习类活动",
        "探索与企业、自治体的合作项目",
        "持续改进主理人工具与资源协作模块"
      ]
    }
  },
  about: {
    title: "关于 SOCIALMORE",
    body: "SOCIALMORE（株式会社創翔モア）是一家位于东京三鹰的科技公司。我们长期实践社区活动，对主理人面临的挑战与负担有深刻理解。技术是减少运营成本的工具，而非目的。我们致力于为社区创造一个可持续发展的运营基础。",
    vision: "从社群现场出发，支持多元文化共同生活、学习与交流的社会。",
    values: [
      "真实现场：从社区真实需求出发。",
      "轻量科技：技术只服务于减负，不增加复杂度。",
      "多文化协作：连接多文化社群与日本社会。",
      "长期陪伴：只要社区在，我们就在。"
    ]
  },
  services: {
    platformTitle: "我们的服务",
    organizers: {
      title: "减少主理人负担，让活动更容易持续",
      cards: [
        "活动工具：募集、沟通、签到、数据管理一体化完成。",
        "支付与结算：简单在线收费和记录，减轻对账难度。",
        "沟通工具：多语言沟通，让参与者交流更顺畅。"
      ]
    },
    companies: {
      title: "支持与多文化社群的合作",
      cards: [
        "社群协作：与真实社区共同打造文化交流、体验活动。",
        "现场洞察：了解多文化社群的真实需求与挑战。",
        "协作项目：与企业、自治体共同设计活动、培训、支持方案。"
      ]
    }
  },
  contact: {
    title: "欢迎与我们联系",
    body: "无论是社群运营、活动支持、合作项目，还是多文化社群相关的任何问题，都欢迎咨询。我们会根据内容安排合适的负责人。"
  },
  news: {
    body: "发布社区合作案例、项目进展和更新资讯。"
  }
},


/* --------------------------------------------------------
   The following languages MAY be optimized by Codex,
   but must strictly follow JA + ZH meaning & tone.
-------------------------------------------------------- */

en: {
  home: {
    hero: {
      title: "A gentle tech service that backs community organizers in Japan",
      subtitle: "SOCIALMORE is a lightweight, practical technology service that helps organizers host events with ease. By simplifying planning, recruitment, payments, multilingual communication, and venue coordination, we reduce operational load and build the foundation for ongoing activities. As gatherings continue, dependable networks with multicultural communities grow and open new doors for collaboration with companies and local governments.",
      primaryCta: "View services",
      secondaryCta: "Contact us"
    },
    focus: {
      title: "What we focus on",
      community: "We provide an all-in-one system that supports recruitment, operations, accounting, and communication so community organizers can keep their daily work sustainable.",
      eventInfra: "We streamline the heaviest parts of event management—registration, payments, promotion, and venue search—so organizers can focus on their content and participants.",
      multiCulture: "We stay connected with multicultural communities, especially foreign workers and students, and carefully listen to on-the-ground voices to spark collaboration with Japanese society."
    },
    highlights: {
      title: "Practical features that support organizers",
      items: [
        "Event recruitment & management: Multilingual forms, attendee tracking, and auto summaries cut down repetitive work.",
        "Online payments & simple bookkeeping: Smoothly collect and reconcile fees so even small events can run with confidence.",
        "Multilingual communication: Provide contact channels for Japanese, Chinese, English, and other community languages.",
        "Operational resource support: We can introduce venues, collaborators, guests, and local ties essential for community activities."
      ]
    },
    now: {
      title: "What we are working on now",
      items: [
        "Co-testing the system with local communities centered in Mitaka",
        "Operating lifestyle and learning support events for foreign communities",
        "Launching projects that explore multicultural collaboration with companies and municipalities",
        "Improving organizer tools and resource-sharing capabilities"
      ]
    }
  },
  about: {
    title: "About SOCIALMORE",
    body: "SOCIALMORE (Sosho More Inc.) is a tech company based in Mitaka, Tokyo. Years of planning and running community events ourselves helped us deeply understand the burdens organizers face. Technology is a tool to reduce that effort, not the goal itself. We care about building a stable foundation so organizers can continue their activities with peace of mind and communities can keep growing.",
    vision: "From the community frontlines, we support a society where multiple cultures live, learn, and connect together.",
    values: [
      "Field-first: Ideas come from what communities truly need on-site.",
      "Lightweight technology: We polish only the tools that lessen operational load without adding complexity.",
      "Multicultural collaboration: We aim to bridge foreign communities in Japan with wider society.",
      "Long-term partnership: As long as a community continues, we will stay by its side."
    ]
  },
  services: {
    platformTitle: "Our services",
    organizers: {
      title: "Lighten the load so organizers can keep going",
      cards: [
        "Event operations tools: Combine recruitment, messaging, reception, and data management to streamline work.",
        "Payments & accounting support: Online fee collection and light bookkeeping reduce tedious in-person handling.",
        "Communication: Multilingual contact methods keep conversations with participants smooth."
      ]
    },
    companies: {
      title: "Support for collaborating with multicultural communities",
      cards: [
        "Community partnerships: Co-design cultural exchanges, workshops, and experience events with real communities.",
        "On-the-ground insights: Understand the needs and challenges of multicultural groups through ongoing activity.",
        "Collaboration programs: Design events, training, and support projects together with companies and municipalities."
      ]
    }
  },
  contact: {
    title: "Talk with us",
    body: "We welcome any inquiry—community operations, event support, collaboration with companies or municipalities, or ways to connect with multicultural communities. The most suitable member will respond based on your needs."
  },
  news: {
    body: "We share community case studies, project updates, and release information."
  }
},

vi: {
  home: {
    hero: {
      title: "Dịch vụ công nghệ nhẹ nhàng dành cho người tổ chức cộng đồng tại Nhật Bản",
      subtitle: "SOCIALMORE là dịch vụ công nghệ gọn nhẹ và thực tế, giúp người tổ chức mở sự kiện dễ dàng hơn. Từ khâu lên ý tưởng, tuyển người tham gia, thu phí, giao tiếp đa ngôn ngữ đến kết nối địa điểm, chúng tôi giảm bớt gánh nặng vận hành và tạo nền tảng để hoạt động duy trì lâu dài. Khi sự kiện diễn ra đều đặn, mạng lưới cộng đồng đa văn hóa sẽ phát triển và mở ra cơ hội hợp tác với doanh nghiệp lẫn chính quyền.",
      primaryCta: "Xem dịch vụ",
      secondaryCta: "Liên hệ"
    },
    focus: {
      title: "Điều chúng tôi theo đuổi",
      community: "Cung cấp hệ thống hỗ trợ trọn gói tuyển thành viên, vận hành, kế toán và liên lạc để người tổ chức có thể duy trì hoạt động hằng ngày.",
      eventInfra: "Tinh gọn những phần vất vả nhất của việc tổ chức sự kiện—đăng ký, thanh toán, truyền thông và tìm địa điểm—để ban tổ chức tập trung vào nội dung và người tham gia.",
      multiCulture: "Kết nối với cộng đồng đa văn hóa, đặc biệt là lao động và du học sinh nước ngoài, lắng nghe nhu cầu thực tế và tạo cầu nối với xã hội Nhật Bản."
    },
    highlights: {
      title: "Tính năng thiết thực cho người tổ chức",
      items: [
        "Tuyển và quản lý sự kiện: biểu mẫu đa ngôn ngữ, quản lý số lượng và tổng hợp tự động.",
        "Thanh toán online & sổ sách đơn giản: thu và đối soát phí tham gia nhẹ nhàng, phù hợp cả sự kiện nhỏ.",
        "Giao tiếp đa ngôn ngữ: kênh liên lạc hỗ trợ tiếng Nhật, Trung, Anh và nhiều ngôn ngữ cộng đồng khác.",
        "Kết nối nguồn lực vận hành: giới thiệu địa điểm, cộng tác viên, khách mời và mạng lưới địa phương cần thiết cho cộng đồng."
      ]
    },
    now: {
      title: "Những hoạt động đang triển khai",
      items: [
        "Thử nghiệm hệ thống cùng các cộng đồng địa phương tại khu vực Mitaka",
        "Vận hành sự kiện hỗ trợ đời sống và học tập cho cộng đồng người nước ngoài",
        "Khởi động dự án tìm kiếm khả năng hợp tác đa văn hóa với doanh nghiệp và chính quyền",
        "Nâng cấp công cụ vận hành và tính năng chia sẻ nguồn lực cho ban tổ chức"
      ]
    }
  },
  about: {
    title: "Về SOCIALMORE",
    body: "SOCIALMORE (Công ty cổ phần Sōshō More) là công ty công nghệ đặt trụ sở tại Mitaka, Tokyo. Nhờ nhiều năm tự tổ chức sự kiện cộng đồng, chúng tôi hiểu rõ khó khăn và gánh nặng mà người tổ chức phải gánh. Công nghệ chỉ là công cụ để giảm sức người, không phải mục tiêu cuối cùng. Chúng tôi ưu tiên xây nền tảng vững chắc để ban tổ chức an tâm hoạt động và cộng đồng tiếp tục lớn mạnh.",
    vision: "Từ chính hiện trường cộng đồng, nâng đỡ một xã hội nơi nhiều nền văn hóa cùng sống, học và kết nối.",
    values: [
      "Lấy thực tế làm gốc: xuất phát từ nhu cầu thật sự tại cộng đồng.",
      "Công nghệ gọn nhẹ: chỉ trau chuốt những giải pháp giúp giảm gánh nặng, không làm mọi thứ phức tạp hơn.",
      "Hợp tác đa văn hóa: làm cầu nối giữa cộng đồng người nước ngoài tại Nhật và xã hội sở tại.",
      "Đồng hành dài lâu: còn cộng đồng thì chúng tôi còn ở bên hỗ trợ."
    ]
  },
  services: {
    platformTitle: "Dịch vụ của chúng tôi",
    organizers: {
      title: "Giảm tải để người tổ chức tiếp tục bước tới",
      cards: [
        "Công cụ vận hành sự kiện: gom tuyển người, liên lạc, tiếp đón và quản lý dữ liệu vào một nơi.",
        "Hỗ trợ thanh toán & kế toán: thu phí online và ghi chép tinh gọn, hạn chế xử lý thủ công.",
        "Giao tiếp: kênh liên lạc đa ngôn ngữ giúp trao đổi với người tham gia trôi chảy."
      ]
    },
    companies: {
      title: "Đồng hành cùng hợp tác đa văn hóa",
      cards: [
        "Liên kết cộng đồng: cùng cộng đồng thật thiết kế giao lưu văn hóa, workshop và sự kiện trải nghiệm.",
        "Hiểu biết thực tế: nắm bắt nhu cầu, thách thức của cộng đồng đa văn hóa thông qua hoạt động thường xuyên.",
        "Chương trình hợp tác: đồng thiết kế sự kiện, đào tạo và dự án hỗ trợ với doanh nghiệp, chính quyền."
      ]
    }
  },
  contact: {
    title: "Liên hệ với chúng tôi",
    body: "Chúng tôi sẵn sàng trao đổi về vận hành cộng đồng, hỗ trợ sự kiện, hợp tác với doanh nghiệp hoặc chính quyền, cũng như mọi câu hỏi liên quan đến cộng đồng đa văn hóa. Thành viên phù hợp nhất sẽ phản hồi theo nội dung yêu cầu."
  },
  news: {
    body: "Chia sẻ câu chuyện hợp tác cộng đồng, tiến độ dự án và thông tin phát hành mới."
  }
},

my: {
  home: {
    hero: {
      title: "ဂျပန်နိုင်ငံတွင် လုပ်ကိုင်နေသော အသိုင်းအဝိုင်းစီစဉ်သူများအတွက် သက်သာသောနည်းပညာဝန်ဆောင်မှု",
      subtitle: "SOCIALMORE သည် ပရိုဂရမ်ပြုလုပ်ခြင်း၊ စုစည်းခြင်း၊ ငွေပေးချေမှု၊ ဘာသာစကားစုံ ဆက်သွယ်မှုနှင့် နေရာညှိနှိုင်းမှုတို့ကို လွယ်ကူစေသည့် ပေါ့ပါးပြီး အသုံးဝင်သော နည်းပညာဝန်ဆောင်မှုဖြစ်သည်။ လည်ပတ်မှု၏ပင်ပန်းမှုကို လျှော့ချကာ လှုပ်ရှားမှုများကို ဆက်လက်လုပ်ဆောင်နိုင်စေသော အခြေခံကို တည်ဆောက်ပေးသည်။ လှုပ်ရှားမှုများ အဆက်မပြတ် ပြုလုပ်သည့်အခါ မတူညီသော ယဉ်ကျေးမှုအသိုင်းအဝိုင်းနှင့် ယုံကြည်စိတ်ချရသော ကွန်ရက်များ ဖွံ့ဖြိုးလာကာ ကုမ္ပဏီများနှင့် မြို့ပေါင်းစည်းရေးအဖွဲ့များအပေါ် ပူးပေါင်းဆောင်ရွက်မှုများ ဖွင့်လှစ်ပေးသည်။",
      primaryCta: "ဝန်ဆောင်မှုများကြည့်ရှုမည်",
      secondaryCta: "ဆက်သွယ်မည်"
    },
    focus: {
      title: "ကျွန်ုပ်တို့၏ ဦးစားပေးလုပ်ငန်းများ",
      community: "နေ့စဉ် လှုပ်ရှားမှုများကို သက်သာစွာ ဆက်လက်လုပ်ဆောင်နိုင်ရန် စုစည်းခြင်း၊ စီမံခန့်ခွဲမှု၊ စာရင်းကိုင်နှင့် ဆက်သွယ်မှုတို့ကို တစ်နေရာတည်းတွင် ထောက်ပံ့ပေးသည့် စနစ်ကို ပေးအပ်ပါသည်။",
      eventInfra: "လက်ခံရေး၊ ငွေပေးချေမှု၊ ကြေငြာခြင်း၊ နေရာရှာဖွေရေးကဲ့သို့ အလုပ်ပိုများသော အစိတ်အပိုင်းများကို ပေါ့ပါးစေပြီး အကြောင်းအရာနှင့် ပါဝင်သူများအပေါ် ဂရုပြုနိုင်စေပါသည်။",
      multiCulture: "နိုင်ငံခြားသားလုပ်သားများနှင့် ကျောင်းသားများ ပါဝင်သည့် မတူညီသော ယဉ်ကျေးမှုအသိုင်းအဝိုင်းများနှင့် ဆက်သွယ်ကာ မြေပြင်အသံများကို သေချာစွာ နားထောင်ပြီး ဂျပန်လူ့အဖွဲ့အစည်းနှင့် ပူးပေါင်းဆောင်ရွက်မှုကို ဖန်တီးပါသည်।"
    },
    highlights: {
      title: "စီစဉ်သူများအတွက် အသုံးဝင်သည့် လုပ်ဆောင်ချက်များ",
      items: [
        "ပြိုင်ပွဲခေါ်ယူခြင်းနှင့် စီမံခန့်ခွဲမှု: ဘာသာစကားစုံ ဖောင်များ၊ လူဦးရေ စောင့်ကြည့်မှုနှင့် အလိုအလျောက် စုစည်းမှုများဖြင့် အလုပ်ခွန်အား လျှော့ချပါ။",
        "အွန်လိုင်းငွေပေးချေမှုနှင့် ရိုးရှင်းသော စာရင်းကိုင်မှု: ပါဝင်ကြေးများကို လွယ်ကူစွာစုဆောင်းကာ သေးငယ်သည့် အစီအစဉ်များကိုမျှ ယုံကြည်စိတ်ချစွာ လုပ်ဆောင်နိုင်ပါသည်။",
        "ဘာသာစကားစုံ ဆက်သွယ်မှု: ဂျပန်၊ တရုတ်၊ အင်္ဂလိပ် အစရှိသည့် ဘာသာစကားများဖြင့် အသိုင်းအဝိုင်းလိုအပ်ချက်များကို ဖြည့်ဆည်းပေးသည့် ဆက်သွယ်ရေး လမ်းကြောင်းများ။",
        "လည်ပတ်ရေး အရင်းအမြစ်ပံ့ပိုးမှု: နေရာဒေသများ၊ ပူးပေါင်းလုပ်သူများ၊ ဧည့်သည်များနှင့် ဒေသခံချိတ်ဆက်မှုများကို မိမိ အသိုင်းအဝိုင်း လုပ်ငန်းများအတွက် မိတ်ဆက်ပေးနိုင်ပါသည်।"
      ]
    },
    now: {
      title: "လက်ရှိ ဆောင်ရွက်နေသော စီမံချက်များ",
      items: [
        "မိတာကဒေသရှိ ဒေသခံအသိုင်းအဝိုင်းများနှင့် ပူးပေါင်းကာ စနစ်ကို စမ်းသပ်နေခြင်း",
        "နိုင်ငံခြားသားအသိုင်းအဝိုင်းများအတွက် အသက်မွေးနှင့် ပညာရေးထောက်ပံ့ရေး အစီအစဉ်များ လည်ပတ်နေခြင်း",
        "ကုမ္ပဏီများနှင့် မြို့ပေါင်းစည်းရေးအဖွဲ့များနှင့် မတူယဉ်ကျေးမှု ပူးပေါင်းလုပ်ငန်းများ စတင်လေ့လာခြင်း",
        "စီစဉ်သူများအတွက် ကိရိယာများနှင့် အရင်းအမြစ်မျှဝေမှု လုပ်ဆောင်ချက်များ ပြုပြင်မွမ်းမံခြင်း"
      ]
    }
  },
  about: {
    title: "SOCIALMORE အကြောင်း",
    body: "SOCIALMORE (株式会社創翔モア) သည် တိုကျိုမြို့ မိတာကကို ဌာနချုပ်ထားသော နည်းပညာကုမ္ပဏီဖြစ်သည်။ အသိုင်းအဝိုင်းအဖြစ်အပျက်များကို ကိုယ်တိုင် စီစဉ်ကျင်းပလာသည့် အတွေ့အကြုံကြောင့် စီစဉ်သူများ၏ အခက်အခဲနှင့် ပင်ပန်းမှုများကို နက်နဲစွာ နားလည်လာခဲ့သည်။ နည်းပညာသည် လုပ်ငန်းခွန်အား လျှော့ချရန် အသုံးချသည့် ကိရိယာတစ်ခုသာ ဖြစ်ပြီး ရည်မှန်းချက် မဟုတ်ပါ။ အသိုင်းအဝိုင်းများ သက်သာစွာ ဆက်လက်တိုးတက်စေရန် အခြေခံတည်ဆောက်ပေးခြင်းကို အရေးကြီးအနေဖြင့် ထားရှိထားပါသည်။",
    vision: "အသိုင်းအဝိုင်း လက်ခုံများမှစ၍ မတူညီသော ယဉ်ကျေးမှုများ အတူတကွ နေထိုင်၊ လေ့လာ၊ ချိတ်ဆက်နိုင်သော လူ့အသိုင်းအဝိုင်းကို ထောက်ပံ့သည်။",
    values: [
      "မြေပြင်အခြေခံ：အသိုင်းအဝိုင်းမှ လိုအပ်ချက်များကို အခြေခံ၍ စိတ်ကူးအကြံပေးပါသည်။",
      "ပေါ့ပါးသည့် နည်းပညာ：လုပ်ငန်းခွန်အား လျှော့ချသည့် နည်းပညာများကိုသာ အာရုံစိုက်တိုးတက်စေသည်။",
      "များစွာသော ယဉ်ကျေးမှု ပူးပေါင်းခြင်း：ဂျပန်နိုင်ငံရှိ နိုင်ငံခြားသား အသိုင်းအဝိုင်းနှင့် လူ့အဖွဲ့အစည်းကြား ချိတ်ဆက်ပေးသည်။",
      "ရှည်လျားသော လက်တွဲမှု：အသိုင်းအဝိုင်း ရှိသရွေ့ ကျွန်ုပ်တို့လည်း အမြဲအနေဖြင့် အတူရှိနေပါမည်။"
    ]
  },
  services: {
    platformTitle: "ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ",
    organizers: {
      title: "စီစဉ်သူများ၏ ပင်ပန်းမှုကို လျှော့ချရန်",
      cards: [
        "ပြိုင်ပွဲစီမံခန့်ခွဲမှု ကိရိယာများ：စုစည်းခြင်း၊ ဆက်သွယ်ရေး၊ လက်ခံမှတ်တမ်းနှင့် ဒေတာစီမံခန့်ခွဲမှုကို တစ်နေရာတည်းတွင် ပြီးစီးစေသည်။",
        "ငွေရှင်းတမ်း ပံ့ပိုးမှု：အွန်လိုင်းဖြင့် ပါဝင်ကြေးများကို ရရှိကာ ရိုးရှင်းသော စာရင်းကိုင်မှုဖြင့် အချိန်ကုန်မှု လျှော့ချပေးသည်။",
        "ဆက်သွယ်ရေး：ဘာသာစကားစုံ လမ်းကြောင်းများဖြင့် ပါဝင်သူများနှင့် မပြတ်သားမှုမရှိစေသည်။"
      ]
    },
    companies: {
      title: "မတူယဉ်ကျေးမှုများနှင့် ပူးပေါင်းရန်",
      cards: [
        "အသိုင်းအဝိုင်း ပူးတွဲလုပ်ငန်း：ယဉ်ကျေးမှုဖလှယ်မှု၊ စမ်းသပ်ပင် နှင့် အတွေ့အကြုံအဆိုပါ အစီအစဉ်များကို အမှန်တကယ် အသိုင်းအဝိုင်းများနှင့် ပူးပေါင်းစီစဉ်သည်။",
        "မြေပြင်သိမြင်ချက်：မတူညီသော ယဉ်ကျေးမှုအသိုင်းအဝိုင်းများ၏ လိုအပ်ချက်နှင့် စိန်ခေါ်ချက်များကို လုပ်ငန်းမှတဆင့် နားလည်စေသည်။",
        "ပူးပေါင်း ပရိုဂရမ်များ：ကုမ္ပဏီများနှင့် မြို့ပေါင်းစည်းရေးအဖွဲ့များနှင့် အတူ သင်တန်း၊ ပံ့ပိုးရေး ပရိုဂရမ်များ တည်ဆောက်သည်။"
      ]
    }
  },
  contact: {
    title: "ဆက်သွယ်ပေးပါ",
    body: "အသိုင်းအဝိုင်း လည်ပတ်မှုများ၊ ပြိုင်ပွဲထောက်ပံ့ရေး၊ ကုမ္ပဏီများ သို့မဟုတ် မြို့ပေါင်းစည်းရေးအဖွဲ့များနှင့် ပူးပေါင်းရန်၊ မတူယဉ်ကျေးမှုအသိုင်းအဝိုင်းများနှင့် ဆက်သွယ်ရာတွင် မည်သည့် မေးမြန်းချက်မဆို ကြိုဆိုပါသည်။ သင့်လိုအပ်ချက်အလိုက် သင့်လျော်ဆုံး အဖွဲ့ဝင်မှ တုံ့ပြန်ပေးပါမည်။"
  },
  news: {
    body: "အသိုင်းအဝိုင်း ပူးပေါင်းမှု ဥပမာများ၊ ပရိုဂရမ်တိုးတက်မှုများနှင့် ထုတ်ပြန်သတင်းများကို မျှဝေပါမည်။"
  }
},

id: {
  home: {
    hero: {
      title: "Layanan teknologi ringan yang mendukung penyelenggara komunitas di Jepang",
      subtitle: "SOCIALMORE adalah layanan teknologi yang ringan dan praktis untuk membantu penyelenggara membuka acara dengan lebih mudah. Dari perencanaan, perekrutan peserta, pembayaran, komunikasi multibahasa, hingga kolaborasi tempat, kami mengurangi beban operasional dan menyiapkan fondasi agar kegiatan bisa berlanjut. Semakin banyak kegiatan berlangsung, jaringan komunitas multikultural semakin kuat dan memudahkan kolaborasi dengan perusahaan maupun pemerintah daerah.",
      primaryCta: "Lihat layanan",
      secondaryCta: "Hubungi kami"
    },
    focus: {
      title: "Fokus utama kami",
      community: "Menyediakan sistem terpadu untuk rekrutmen, operasional, pencatatan, dan komunikasi agar penyelenggara komunitas dapat menjalankan aktivitas harian secara berkelanjutan.",
      eventInfra: "Meringankan bagian paling berat dari operasional acara—pendaftaran, pembayaran, publikasi, dan pencarian tempat—agar penyelenggara bisa fokus pada konten dan peserta.",
      multiCulture: "Terhubung dengan komunitas multikultural, terutama pekerja asing dan pelajar, sambil menyimak suara lapangan untuk membuka kerja sama dengan masyarakat Jepang."
    },
    highlights: {
      title: "Fitur praktis bagi penyelenggara",
      items: [
        "Perekrutan & manajemen acara: formulir multibahasa, kontrol kuota, dan rekap otomatis.",
        "Pembayaran daring & pembukuan sederhana: mempermudah penarikan biaya dan pencocokan pembayaran, termasuk untuk acara kecil.",
        "Komunikasi multibahasa: saluran kontak dalam bahasa Jepang, Mandarin, Inggris, dan bahasa komunitas lainnya.",
        "Dukungan sumber daya operasional: memperkenalkan lokasi, kolaborator, tamu, dan jejaring lokal yang dibutuhkan komunitas."
      ]
    },
    now: {
      title: "Inisiatif yang sedang berjalan",
      items: [
        "Menguji sistem bersama komunitas lokal di sekitar Mitaka",
        "Menyelenggarakan acara dukungan hidup dan belajar bagi komunitas asing",
        "Memulai proyek untuk mengeksplorasi kolaborasi multikultural dengan perusahaan dan pemerintah daerah",
        "Meningkatkan alat bantu penyelenggara serta fitur kolaborasi sumber daya"
      ]
    }
  },
  about: {
    title: "Tentang SOCIALMORE",
    body: "SOCIALMORE (Sosho More Inc.) adalah perusahaan teknologi yang berbasis di Mitaka, Tokyo. Pengalaman bertahun-tahun menyelenggarakan acara komunitas membuat kami memahami secara mendalam tantangan dan beban para penyelenggara. Teknologi adalah alat untuk mengurangi pekerjaan, bukan tujuan akhir. Kami fokus membangun fondasi agar penyelenggara dapat terus berkegiatan dengan tenang dan komunitas dapat tumbuh.",
    vision: "Dari garis depan komunitas, kami menopang masyarakat di mana banyak budaya dapat hidup, belajar, dan terhubung bersama.",
    values: [
      "Berangkat dari lapangan: berawal dari kebutuhan nyata komunitas.",
      "Teknologi ringan: hanya mengasah solusi yang mengurangi beban tanpa menambah kerumitan.",
      "Kolaborasi multikultural: menjembatani komunitas asing di Jepang dengan masyarakat luas.",
      "Pendampingan jangka panjang: selama komunitas masih berjalan, kami tetap mendampingi."
    ]
  },
  services: {
    platformTitle: "Layanan kami",
    organizers: {
      title: "Meringankan beban agar kegiatan terus berjalan",
      cards: [
        "Perangkat operasional acara: satukan perekrutan, komunikasi, penerimaan, dan manajemen data.",
        "Dukungan pembayaran & pembukuan: penarikan biaya daring dan pencatatan sederhana menghemat waktu tatap muka.",
        "Komunikasi: saluran multibahasa menjaga percakapan dengan peserta tetap lancar."
      ]
    },
    companies: {
      title: "Bersama komunitas multikultural",
      cards: [
        "Kolaborasi komunitas: merancang pertukaran budaya, lokakarya, dan acara pengalaman dengan komunitas nyata.",
        "Wawasan lapangan: memahami kebutuhan dan tantangan komunitas multikultural melalui kegiatan nyata.",
        "Program kolaborasi: bersama perusahaan dan pemerintah daerah mendesain acara, pelatihan, dan proyek dukungan."
      ]
    }
  },
  contact: {
    title: "Hubungi kami",
    body: "Silakan ajukan pertanyaan mengenai pengelolaan komunitas, dukungan acara, kerja sama dengan perusahaan atau pemerintah, maupun cara terhubung dengan komunitas multikultural. Kami akan menghubungkan Anda dengan anggota tim yang paling sesuai."
  },
  news: {
    body: "Kami membagikan kisah kolaborasi komunitas, kemajuan proyek, dan informasi rilis."
  }
},

fil: {
  home: {
    hero: {
      title: "Magaan na tech service para sa mga tagapangasiwa ng komunidad sa Japan",
      subtitle: "Ang SOCIALMORE ay magaang at praktikal na teknolohiyang serbisyo na tumutulong sa mga organizer na magbukas ng mga kaganapan nang walang hirap. Mula sa pagbuo ng programa, pag-recruit ng kalahok, pagbabayad, multilingual na komunikasyon, hanggang sa koordinasyon ng venue, binabawasan namin ang bigat ng operasyon at naghahanda ng matibay na batayan para magpatuloy ang mga gawain. Habang dumarami ang mga aktibidad, mas tumitibay ang ugnayan sa mga multikultural na komunidad at mas bukas ang pakikipagtulungan sa mga kumpanya at pamahalaang lokal.",
      primaryCta: "Tingnan ang mga serbisyo",
      secondaryCta: "Makipag-ugnayan"
    },
    focus: {
      title: "Ang aming pinagtutuunan",
      community: "Nagbibigay kami ng sistemang sumasaklaw sa pagre-recruit, pagpapatakbo, accounting, at komunikasyon upang magawa ng mga organizer ang araw-araw na gawain nang hindi nabibigatan.",
      eventInfra: "Pinapagaan namin ang pinaka-mabigat na bahagi ng pag-oorganisa—pagpaparehistro, bayad, anunsyo, at paghahanap ng venue—para makatutok ang mga organizer sa nilalaman at mga kalahok.",
      multiCulture: "Patuloy kaming nakakonekta sa mga multikultural na komunidad, lalo na sa mga manggagawang dayuhan at mag-aaral, at maingat na pinakikinggan ang boses ng field upang makalikha ng pagtutulungan sa lipunang Hapon."
    },
    highlights: {
      title: "Mga kapaki-pakinabang na tampok para sa organizer",
      items: [
        "Pagre-recruit at pamamahala ng event: multilingual na form, kontrol sa bilang ng kalahok, at awtomatikong buod.",
        "Online na bayad at payak na bookkeeping: maayos na paglikom at pagtutugma ng bayarin, kahit para sa maliliit na event.",
        "Multilingual na komunikasyon: mga channel para sa Japanese, Chinese, English, at iba pang wika ng komunidad.",
        "Tulong sa mapagkukunang pang-operasyon: maipapakilala namin ang mga venue, katuwang, panauhin, at lokal na ugnayan na kailangan ng komunidad."
      ]
    },
    now: {
      title: "Mga proyektong isinasagawa ngayon",
      items: [
        "Sabay sinusubok ang sistema kasama ang lokal na komunidad sa paligid ng Mitaka",
        "Nagpapatakbo ng mga kaganapang sumusuporta sa pamumuhay at pag-aaral ng mga banyagang komunidad",
        "Naglulunsad ng mga proyektong sumusuri sa multikultural na kooperasyon kasama ang mga kumpanya at pamahalaang lokal",
        "Patuloy na pinapahusay ang mga tool ng organizer at kakayahang magbahagi ng mga mapagkukunan"
      ]
    }
  },
  about: {
    title: "Tungkol sa SOCIALMORE",
    body: "Ang SOCIALMORE (Sosho More Inc.) ay kompanyang teknolohiya na nakabase sa Mitaka, Tokyo. Dahil kami mismo ang nagplano at nagpatakbo ng mga kaganapan sa komunidad sa loob ng maraming taon, malalim naming naiintindihan ang mga hamon at bigat na pasan ng mga organizer. Ang teknolohiya ay kasangkapan para magaan ang operasyon, hindi ang layunin mismo. Pinahahalagahan namin ang pagbuo ng matatag na pundasyon upang makapagpatuloy nang may kapanatagan ang mga organizer at patuloy na lumago ang komunidad.",
    vision: "Mula sa frontlines ng komunidad, sinusuportahan namin ang lipunang magkakasamang namumuhay, nag-aaral, at nag-uugnay ang sari-saring kultura.",
    values: [
      "Nakaugat sa field: nagsisimula sa totoong pangangailangan ng komunidad.",
      "Magaan na teknolohiya: pinapanday lang ang mga solusyong nagpapagaan ng trabaho nang hindi nagpapakumplikado.",
      "Multikultural na pagtutulungan: tulay sa pagitan ng mga komunidad ng dayuhan sa Japan at ng mas malawak na lipunan.",
      "Pangmatagalang paggabay: hangga't may komunidad, nariyan kami upang sumuporta."
    ]
  },
  services: {
    platformTitle: "Aming mga serbisyo",
    organizers: {
      title: "Pagaanin ang gawain ng mga organizer",
      cards: [
        "Mga kasangkapan sa operasyon ng event: pinagsasama ang recruitment, komunikasyon, pagtanggap, at pamamahala ng data.",
        "Suporta sa bayad at accounting: online na koleksyon ng bayarin at simpleng bookkeeping para hindi na kailangang mano-manong magproseso.",
        "Komunikasyon: mga channel na may maraming wika para maging maayos ang usapan sa mga kalahok."
      ]
    },
    companies: {
      title: "Suporta sa pakikipagtulungan sa multikultural na komunidad",
      cards: [
        "Pakikipag-ugnay sa komunidad: magplano ng cultural exchange, workshop, at experiential events kasama ang tunay na komunidad.",
        "Mga insight mula sa field: maintindihan ang pangangailangan at hamon ng multikultural na komunidad sa pamamagitan ng aktwal na gawain.",
        "Mga programang kolaborasyon: magdisenyo ng mga event, pagsasanay, at proyekto ng suporta kasama ang mga kumpanya at pamahalaang lokal."
      ]
    }
  },
  contact: {
    title: "Kumontak sa amin",
    body: "Bukas kami sa mga tanong tungkol sa pagpapatakbo ng komunidad, suporta sa kaganapan, pakikipagtulungan sa mga kumpanya o pamahalaan, at anumang usapin tungkol sa multikultural na komunidad. Angkop na miyembro ng koponan ang tutugon ayon sa inyong pangangailangan."
  },
  news: {
    body: "Ibinabahagi namin ang mga halimbawa ng pakikipagtulungan, progreso ng proyekto, at mga balita sa paglabas ng serbisyo."
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
    const localesToTry = [state.locale, ...FALLBACK_LOCALES.filter((loc) => loc !== state.locale)];
    for (const locale of localesToTry) {
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
