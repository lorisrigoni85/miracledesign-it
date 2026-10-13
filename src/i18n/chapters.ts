import { getCollection, type CollectionEntry } from 'astro:content';
import { chapterBase, type Lang } from './ui';

export type Chapter = CollectionEntry<'chapters'>;

export const chapterLang = (entry: Chapter) => entry.id.split('/')[0] as Lang;
export const chapterSlug = (entry: Chapter) => entry.id.split('/').slice(1).join('/');
export const chapterUrl = (entry: Chapter) => `${chapterBase[chapterLang(entry)]}${chapterSlug(entry)}/`;

export async function getChapters(lang: Lang) {
  const all = await getCollection('chapters', (entry) => chapterLang(entry) === lang);
  return all.sort((a, b) => a.data.order - b.data.order);
}

/** Lo stesso capitolo nell'altra lingua, se esiste. */
export async function getTwin(entry: Chapter) {
  const other: Lang = chapterLang(entry) === 'it' ? 'en' : 'it';
  const list = await getChapters(other);
  return list.find((c) => c.data.key === entry.data.key);
}
