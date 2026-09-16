import { createClient } from 'npm:@supabase/supabase-js@2';

const SITE_URL = 'https://garoastudios.com';

const LOCALES = ['en', 'br', 'es', 'zh', 'ja'] as const;
const HREFLANG: Record<string, string> = {
  en: 'en',
  br: 'pt-BR',
  es: 'es',
  zh: 'zh-Hans',
  ja: 'ja',
};

/** Fixed pages, one entry per locale. */
const STATIC_PATHS: { path: string; priority: string; changefreq: string }[] = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/games/rhythmania', priority: '0.9', changefreq: 'weekly' },
  { path: '/games/cartomante', priority: '0.8', changefreq: 'monthly' },
  { path: '/games/stand-by-me', priority: '0.8', changefreq: 'monthly' },
  { path: '/games/cat-leather-jackets', priority: '0.8', changefreq: 'monthly' },
  { path: '/games/astro-pig', priority: '0.8', changefreq: 'monthly' },
  { path: '/press', priority: '0.7', changefreq: 'monthly' },
  { path: '/links', priority: '0.6', changefreq: 'monthly' },
];

function urlEntry(path: string, lastmod: string, changefreq: string, priority: string) {
  const alternates = LOCALES.map(
    (loc) =>
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG[loc]}" href="${SITE_URL}/${loc}${path}"/>`,
  ).join('\n');

  return LOCALES.map(
    (loc) => `  <url>
    <loc>${SITE_URL}/${loc}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/en${path}"/>
  </url>`,
  ).join('\n');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  const today = new Date().toISOString().slice(0, 10);
  const blocks: string[] = STATIC_PATHS.map((page) =>
    urlEntry(page.path, today, page.changefreq, page.priority),
  );

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    const { data, error } = await supabase
      .from('job_postings')
      .select('code, status, closes_at, updated_at')
      .eq('status', 'live')
      .order('code', { ascending: false });

    if (error) throw error;

    const now = Date.now();
    for (const posting of data ?? []) {
      if (posting.closes_at && new Date(posting.closes_at).getTime() <= now) continue;
      const lastmod = (posting.updated_at ?? new Date().toISOString()).slice(0, 10);
      blocks.push(urlEntry(`/jobs/${posting.code}`, lastmod, 'weekly', '0.7'));
    }
  } catch (error) {
    console.error('sitemap: could not load job postings', error);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

${blocks.join('\n')}

</urlset>
`;

  const headers = new Headers();
  headers.set('content-type', 'application/xml');
  headers.set('cache-control', 'public, max-age=600');
  headers.set('access-control-allow-origin', '*');

  return new Response(xml, { headers });
});
