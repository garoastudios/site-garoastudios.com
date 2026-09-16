-- Allowed admin emails (no public access)
CREATE TABLE public.admin_emails (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_emails TO service_role;
ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

INSERT INTO public.admin_emails (email) VALUES ('contato@garoastudios.com');

CREATE OR REPLACE FUNCTION public.is_site_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_emails
    WHERE lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Postings
CREATE TABLE public.job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  apply_url text NOT NULL,
  status text NOT NULL DEFAULT 'live',
  closes_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT job_postings_status_check CHECK (status IN ('live', 'unlisted'))
);

GRANT SELECT ON public.job_postings TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_postings TO authenticated;
GRANT ALL ON public.job_postings TO service_role;
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Postings are publicly readable"
  ON public.job_postings FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert postings"
  ON public.job_postings FOR INSERT TO authenticated
  WITH CHECK (public.is_site_admin());

CREATE POLICY "Admins can update postings"
  ON public.job_postings FOR UPDATE TO authenticated
  USING (public.is_site_admin())
  WITH CHECK (public.is_site_admin());

CREATE POLICY "Admins can delete postings"
  ON public.job_postings FOR DELETE TO authenticated
  USING (public.is_site_admin());

-- Translations
CREATE TABLE public.job_posting_translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  posting_id uuid NOT NULL REFERENCES public.job_postings(id) ON DELETE CASCADE,
  locale text NOT NULL,
  title text NOT NULL,
  body_md text NOT NULL DEFAULT '',
  apply_label text NOT NULL DEFAULT '',
  back_label text NOT NULL DEFAULT '',
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT job_posting_translations_locale_check CHECK (locale IN ('en','br','es','zh','ja')),
  CONSTRAINT job_posting_translations_unique UNIQUE (posting_id, locale)
);

GRANT SELECT ON public.job_posting_translations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.job_posting_translations TO authenticated;
GRANT ALL ON public.job_posting_translations TO service_role;
ALTER TABLE public.job_posting_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are publicly readable"
  ON public.job_posting_translations FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert translations"
  ON public.job_posting_translations FOR INSERT TO authenticated
  WITH CHECK (public.is_site_admin());

CREATE POLICY "Admins can update translations"
  ON public.job_posting_translations FOR UPDATE TO authenticated
  USING (public.is_site_admin())
  WITH CHECK (public.is_site_admin());

CREATE POLICY "Admins can delete translations"
  ON public.job_posting_translations FOR DELETE TO authenticated
  USING (public.is_site_admin());

-- updated_at maintenance
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER job_postings_touch
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER job_posting_translations_touch
  BEFORE UPDATE ON public.job_posting_translations
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Sequential YYYY-NN code allocation, admin only
CREATE OR REPLACE FUNCTION public.next_job_posting_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  yr text := to_char(now() AT TIME ZONE 'America/Sao_Paulo', 'YYYY');
  next_n int;
BEGIN
  IF NOT public.is_site_admin() THEN
    RAISE EXCEPTION 'not authorized';
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('job_posting_code_' || yr));

  SELECT coalesce(max((split_part(code, '-', 2))::int), 0) + 1
    INTO next_n
    FROM public.job_postings
   WHERE code LIKE yr || '-%'
     AND split_part(code, '-', 2) ~ '^[0-9]+$';

  RETURN yr || '-' || lpad(next_n::text, 2, '0');
END;
$$;

REVOKE ALL ON FUNCTION public.next_job_posting_code() FROM public;
GRANT EXECUTE ON FUNCTION public.next_job_posting_code() TO authenticated;
