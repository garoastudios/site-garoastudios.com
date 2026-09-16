import { supabase } from '@/integrations/supabase/client';
import { LOCALES, type Locale } from '@/i18n/config';

export type PostingStatus = 'live' | 'unlisted';

export interface PostingTranslation {
  locale: Locale;
  title: string;
  body_md: string;
  apply_label: string;
  back_label: string;
  seo_title: string;
  seo_description: string;
}

export interface Posting {
  id: string;
  code: string;
  apply_url: string;
  status: PostingStatus;
  closes_at: string | null;
  created_at: string;
  translations: Partial<Record<Locale, PostingTranslation>>;
}

const UTM = 'utm_source=garoastudios.com';

/** Adds the site-wide UTM tag to an outgoing apply link. */
export function withUtm(url: string) {
  if (!url) return url;
  if (url.includes('utm_source=')) return url;
  return url + (url.includes('?') ? '&' : '?') + UTM;
}

/** A posting is closed when it is unlisted or its scheduled closing time has passed. */
export function isClosed(posting: Pick<Posting, 'status' | 'closes_at'>) {
  if (posting.status !== 'live') return true;
  if (posting.closes_at && new Date(posting.closes_at).getTime() <= Date.now()) return true;
  return false;
}

/** Requested locale, then English, then Brazilian Portuguese (always present). */
export function pickCopy(posting: Posting, locale: Locale): PostingTranslation | undefined {
  return posting.translations[locale] ?? posting.translations.en ?? posting.translations.br;
}

export function missingLocales(posting: Posting): Locale[] {
  return LOCALES.filter((loc) => !posting.translations[loc]?.title?.trim());
}

type Row = {
  id: string;
  code: string;
  apply_url: string;
  status: string;
  closes_at: string | null;
  created_at: string;
  job_posting_translations: PostingTranslation[] | null;
};

function toPosting(row: Row): Posting {
  const translations: Partial<Record<Locale, PostingTranslation>> = {};
  for (const tr of row.job_posting_translations ?? []) {
    translations[tr.locale] = tr;
  }
  return {
    id: row.id,
    code: row.code,
    apply_url: row.apply_url,
    status: row.status as PostingStatus,
    closes_at: row.closes_at,
    created_at: row.created_at,
    translations,
  };
}

const SELECT =
  'id, code, apply_url, status, closes_at, created_at, job_posting_translations(locale, title, body_md, apply_label, back_label, seo_title, seo_description)';

export async function fetchPostings(): Promise<Posting[]> {
  const { data, error } = await supabase
    .from('job_postings')
    .select(SELECT)
    .order('code', { ascending: false });
  if (error) throw error;
  return (data as unknown as Row[]).map(toPosting);
}

export async function fetchOpenPostings(): Promise<Posting[]> {
  const all = await fetchPostings();
  return all.filter((posting) => !isClosed(posting));
}

export async function fetchPostingByCode(code: string): Promise<Posting | null> {
  const { data, error } = await supabase
    .from('job_postings')
    .select(SELECT)
    .eq('code', code)
    .maybeSingle();
  if (error) throw error;
  return data ? toPosting(data as unknown as Row) : null;
}
