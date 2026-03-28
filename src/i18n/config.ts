export const LOCALES = ['en', 'br', 'es', 'zh', 'ja'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  br: 'PT',
  es: 'ES',
  zh: '中文',
  ja: '日本語',
};

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
