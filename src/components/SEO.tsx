import { Helmet } from 'react-helmet-async';
import { LOCALES, type Locale } from '@/i18n/config';
import { HTML_LANG, OG_LOCALE, SITE_URL } from '@/i18n/seo';

interface SEOProps {
  /** Current page locale */
  locale: Locale;
  /** Page title — should already include the brand suffix */
  title: string;
  /** Meta description (< 160 chars) */
  description: string;
  /**
   * Path within a locale, starting with "/", e.g. "/games" or "/games/rhythmania".
   * Use empty string for the locale home page.
   */
  path?: string;
  /** Absolute URL of the social image. Defaults to the site's OG image. */
  image?: string;
  /** OpenGraph type — defaults to "website". */
  ogType?: 'website' | 'article' | 'video.other' | 'product';
  /** Extra structured-data objects to attach to the page. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const DEFAULT_OG_IMAGE =
  'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5b1e0bbe-c985-44b4-bec8-0cf9a04b0720/id-preview-22a3f296--c926a280-6037-4cae-8150-9227ccb28113.lovable.app-1774735600082.png';

export default function SEO({
  locale,
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  ogType = 'website',
  jsonLd,
}: SEOProps) {
  const url = `${SITE_URL}/${locale}${path}`;
  const jsonLdArray = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang={HTML_LANG[locale]} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* hreflang alternates — one per supported locale + x-default */}
      {LOCALES.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={HTML_LANG[l]}
          href={`${SITE_URL}/${l}${path}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en${path}`} />

      {/* OpenGraph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Garoa Studios" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={OG_LOCALE[locale]} />
      {LOCALES.filter((l) => l !== locale).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@garoastudios" />
      <meta name="twitter:creator" content="@garoastudios" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLdArray.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}
