import { computed, unref, watchEffect } from 'vue';
import { runtimeConfig } from '../config/runtime';

const DEFAULT_TITLE = 'SOCIALMORE - コミュニティーを続けるための仕組みを、LINEの中に。';
const DEFAULT_DESCRIPTION =
  'メンバー募集、申込受付、参加者管理、売上確認まで。コミュニティ運営に必要な流れをLINEの中にまとめたMOREの紹介ページです。';
const DEFAULT_IMAGE = '/socialmore-assets/hero/home-hero-app.png';

const absoluteUrl = (path = '/') => {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${runtimeConfig.siteUrl}${normalized}`;
};

const upsertMeta = (attr, key, content) => {
  if (typeof document === 'undefined' || !content) return;
  const selector = `meta[${attr}="${key}"]`;
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  if (typeof document === 'undefined' || !href) return;
  let tag = document.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute('href', href);
};

const upsertJsonLd = (id, data) => {
  if (typeof document === 'undefined') return;
  let tag = document.getElementById(id);
  if (!data) {
    tag?.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('script');
    tag.id = id;
    tag.type = 'application/ld+json';
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
};

export const buildTitle = (title) => {
  if (!title) return DEFAULT_TITLE;
  return title.includes('SOCIALMORE') ? title : `${title} | SOCIALMORE`;
};

export const applySeo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  type = 'website',
  robots = 'index,follow',
  jsonLd
} = {}) => {
  if (typeof document === 'undefined') return;

  const fullTitle = buildTitle(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  document.title = fullTitle;
  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', robots);
  upsertMeta('property', 'og:site_name', 'SOCIALMORE');
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:type', type);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('property', 'og:image', imageUrl);
  upsertMeta('property', 'og:locale', 'ja_JP');
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', imageUrl);
  upsertLink('canonical', canonicalUrl);
  upsertJsonLd('socialmore-page-schema', jsonLd);
};

export const useSeo = (seoSource) => {
  const seo = computed(() => unref(seoSource) || {});
  watchEffect(() => applySeo(seo.value));
};

export const socialmoreOrganizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SOCIALMORE',
  legalName: '株式会社創翔モア',
  url: runtimeConfig.siteUrl,
  email: 'admin@socialmore.co.jp',
  telephone: '+81-80-6567-1105',
  address: {
    '@type': 'PostalAddress',
    postalCode: '181-0013',
    addressRegion: '東京都',
    addressLocality: '三鷹市',
    streetAddress: '下連雀3-27-1 三協ビル2階',
    addressCountry: 'JP'
  }
};

export const socialmoreWebsiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SOCIALMORE',
  url: runtimeConfig.siteUrl,
  publisher: socialmoreOrganizationSchema
};
