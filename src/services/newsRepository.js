import { newsItems } from '../data/news';
import { shouldUseApiContent } from '../config/runtime';
import { requestJson } from './httpClient';

const sortNews = (items) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const normalizeId = (id) => String(id);

export const fetchNewsItems = async () => {
  if (!shouldUseApiContent()) {
    return sortNews(newsItems);
  }

  const items = await requestJson('/api/news');
  return sortNews(Array.isArray(items) ? items : []);
};

export const fetchNewsItem = async (id) => {
  if (!shouldUseApiContent()) {
    return newsItems.find((item) => normalizeId(item.id) === normalizeId(id)) ?? null;
  }

  return requestJson(`/api/news/${encodeURIComponent(id)}`);
};
