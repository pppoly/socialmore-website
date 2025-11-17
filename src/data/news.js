import newsCoverIncorporation from '../assets/news/news1.png';
import newsCoverWebsite from '../assets/news/news2.png';

export const newsItems = [
  {
    id: 1,
    date: '2025-10-18',
    title: {
      ja: 'SOCIALMORE公式サイトを公開しました',
      en: 'SOCIALMORE launches its official website',
      zh: 'SOCIALMORE 官方网站全新上线'
    },
    summary: {
      ja: 'コミュニティとの共創をより丁寧に伝えるため、三言語（日本語・英語・中国語）サイトを公開しました。',
      en: 'We launched a trilingual (JA/EN/ZH) website to share our community work and service updates with more partners.',
      zh: '为了更细致传达与社群的共创，我们上线了日/英/中文三语网站。'
    },
    cover: newsCoverWebsite,
    content: {
      ja: [
        'SOCIALMOREの公式サイトが公開されました。トップページではコミュニティ主催者支援や多文化連携の取り組みをコンパクトにまとめ、ブログ形式で最新活動も追えるようになっています。三言語（日本語・英語・中国語）で情報をお届けします。',
        '今後はβテストのレポートや、現場の主催者による記事なども随時追加予定です。引き続き、三鷹を拠点に全国のコミュニティチームと協働していきます。'
      ],
      en: [
        'Our official site is now live. The trilingual experience highlights how we support community organizers and expanding multicultural partnerships, and the News section will act as a running blog for field stories and release notes.',
        'We will share beta learnings, organizer voices, and collaboration opportunities here. Stay tuned as we grow with partners across Japan.'
      ],
      zh: [
        'SOCIALMORE 正式网站上线，我们以日/英/中文三语介绍社群主理人支援、多文化连结等服务，并将新闻区打造成公司博客，持续分享社群实况与版本更新。',
        '未来也会刊载 β 测试心得与主理人专访，欢迎关注最新动态，一起为社群营运带来更好的工具。'
      ]
    }
  },
  {
    id: 2,
    date: '2025-08-08',
    title: {
      ja: 'SOCIALMORE株式会社を設立しました',
      en: 'SOCIALMORE Inc. is officially incorporated',
      zh: 'SOCIALMORE 株式会社正式成立'
    },
    summary: {
      ja: '2025年8月8日、三鷹市下連雀で法人登記を完了し、コミュニティ支援を加速させます。',
      en: 'On August 8, 2025 we incorporated in Mitaka, Tokyo to deepen our community-first mission.',
      zh: '我们于 2025 年 8 月 8 日在东京三鹰完成法人登记，加速在日社群支援。'
    },
    cover: newsCoverIncorporation,
    content: {
      ja: [
        'SOCIALMORE（株式会社創翔モア）は、2025年8月8日付で東京都三鷹市に登記を完了しました。住所は 〒181-0013 東京都三鷹市下連雀3丁目27番1号 三協ビル2階 です。',
        'これまでも現場のコミュニティと共にサービスを磨いてきましたが、法人化によってより多くの自治体・企業と継続的に連携し、在日コミュニティの運営負担を軽くする仕組みづくりを加速していきます。'
      ],
      en: [
        'SOCIALMORE Inc. (Sōshō More) completed its incorporation on August 8, 2025 in Mitaka, Tokyo. We operate out of 3-27-1 Sankyo Building 2F, Shimorenjaku.',
        'Formalizing the company structure lets us collaborate with municipalities and companies at a larger scale while staying rooted in the on-the-ground communities we serve.'
      ],
      zh: [
        'SOCIALMORE（創翔莫尔株式会社）已于 2025 年 8 月 8 日在东京三鹰正式登记，地址为 〒181-0013 东京都三鹰市下连雀3-27-1 三协大楼2层。',
        '法人化让我们能与更多自治体与企业长期合作，也更有资源深入服务在地社群。'
      ]
    }
  }
];
