export const LOCALES = ['en', 'br', 'es', 'zh', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  br: 'BR',
  es: 'ES',
  en: 'EN',
  zh: '中文',
  ja: '日本語',
};

/** Display order for locale switcher buttons */
export const LOCALE_ORDER: Locale[] = ['br', 'es', 'en', 'zh', 'ja'];

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
