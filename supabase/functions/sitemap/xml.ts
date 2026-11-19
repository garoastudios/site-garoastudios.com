export const SITE_URL = "https://garoastudios.com";

export const LOCALES = ["en", "br", "es", "zh", "ja"] as const;

export const HREFLANG: Record<(typeof LOCALES)[number], string> = {
  en: "en",
  br: "pt-BR",
  es: "es",
  zh: "zh-Hans",
  ja: "ja",
};

export interface StaticPath {
  /** Path after the locale prefix. Empty string is the locale home. */
  path: string;
  priority: string;
  changefreq: "weekly" | "monthly";
}

/**
 * Public, locale-prefixed routes. Individual game pages are already listed for
 * every locale. `/games` is the catalog and `/jobs` is the postings index;
 * both were missing from the previous sitemap.
 */
export const STATIC_PATHS: StaticPath[] = [
  { path: "", priority: "1.0", changefreq: "weekly" },
  { path: "/games", priority: "0.9", changefreq: "weekly" },
  { path: "/games/rhythmania", priority: "0.9", changefreq: "weekly" },
  { path: "/games/cartomante", priority: "0.8", changefreq: "monthly" },
  { path: "/games/stand-by-me", priority: "0.8", changefreq: "monthly" },
  { path: "/games/cat-leather-jackets", priority: "0.8", changefreq: "monthly" },
  { path: "/games/astro-pig", priority: "0.8", changefreq: "monthly" },
  { path: "/press", priority: "0.7", changefreq: "monthly" },
  { path: "/jobs", priority: "0.7", changefreq: "weekly" },
  { path: "/links", priority: "0.6", changefreq: "monthly" },
];

export interface SitemapJob {
  /** Posting code, e.g. "2026-01". Emitted as `/jobs/<code>` in every locale. */
  code: string;
  /** YYYY-MM-DD */
  lastmod: string;
}

/** A live posting stays in the sitemap until its scheduled close time. */
export function isOpenJob(closesAt: string | null, now = Date.now()): boolean {
  if (!closesAt) return true;
  return new Date(closesAt).getTime() > now;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function localizedEntry(path: string, lastmod: string, changefreq: string, priority: string): string {
  const alternates = LOCALES.map(
    (loc) =>
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG[loc]}" href="${SITE_URL}/${loc}${path}"/>`,
  ).join("\n");

  return LOCALES.map(
    (loc) => `  <url>
    <loc>${SITE_URL}/${loc}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${path}"/>
  </url>`,
  ).join("\n");
}

/**
 * `/` is one URL, not a locale variant. It client-redirects to `/en`, and the
 * locale homes do not list it as an hreflang alternate, so it has no hreflang
 * block of its own.
 */
function rootEntry(lastmod: string): string {
  return `  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;
}

export function renderSitemap(today: string, jobs: SitemapJob[]): string {
  const blocks = [
    rootEntry(today),
    ...STATIC_PATHS.map((page) => localizedEntry(page.path, today, page.changefreq, page.priority)),
    ...jobs.map((job) =>
      localizedEntry(`/jobs/${escapeXml(job.code)}`, job.lastmod, "weekly", "0.7"),
    ),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${blocks.join("\n")}

</urlset>
`;
}

export function sitemapLocs(xml: string): string[] {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
}
