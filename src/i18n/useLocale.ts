import { useParams, useNavigate } from 'react-router-dom';
import { type Locale, DEFAULT_LOCALE, isValidLocale } from './config';
import { getTranslations, type TranslationKeys } from './translations';

import garoaMain from '@/assets/logos/garoa-main.png';
import garoaJp from '@/assets/logos/garoa-jp.png';
import garoaZh from '@/assets/logos/garoa-zh.png';

export function useLocale() {
  const { locale: localeParam } = useParams<{ locale: string }>();
  const navigate = useNavigate();

  const locale: Locale = localeParam && isValidLocale(localeParam) ? localeParam : DEFAULT_LOCALE;
  const t: TranslationKeys = getTranslations(locale);

  const getLogo = () => {
    switch (locale) {
      case 'ja': return garoaJp;
      case 'zh': return garoaZh;
      default: return garoaMain;
    }
  };

  const switchLocale = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(`/${locale}`, '') || '/';
    navigate(`/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
  };

  return { locale, t, getLogo, switchLocale };
}
