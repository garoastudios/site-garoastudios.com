import type { Locale } from './config';

// Eagerly import all capsule images
const capsules = import.meta.glob('/src/assets/games/*_capsule_*.jpg', { eager: true, import: 'default' }) as Record<string, string>;

export function getGameCapsule(slug: string, locale: Locale): string {
  const key = `/src/assets/games/${slug}_capsule_${locale}.jpg`;
  return capsules[key] || capsules[`/src/assets/games/${slug}_capsule_en.jpg`] || '';
}
