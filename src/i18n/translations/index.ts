import { en } from './en';
import { br } from './br';
import { es } from './es';
import { zh } from './zh';
import { ja } from './ja';
import type { Locale } from '../config';

export type TranslationKeys = typeof en;

const translations: Record<Locale, TranslationKeys> = { en, br, es, zh, ja };

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en;
}
