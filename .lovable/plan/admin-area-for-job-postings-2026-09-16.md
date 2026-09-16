# Admin area for job postings

A private admin area at `/admin/login` where you sign in with a one-time code sent to contato@garoastudios.com, then create, edit, and close job postings without touching the site's source.

## Sign in

- `/admin/login`: enter the email, receive a 6-digit code, type it in. Codes expire in 5 minutes.
- Only contato@garoastudios.com can get in. Anyone else who tries is refused, and self-signup is off.
- All `/admin/*` pages require a valid session and redirect to the login page otherwise.
- The admin pages are not linked from the public site and are excluded from search engines.

## Postings list — `/admin/postings`

A table of every posting, newest first, showing: code (e.g. 2026-01), title, status (live / unlisted / scheduled to close), closing date if any, and per-language completeness with a "!" badge for each missing translation.

Actions per row: **edit**, **close** (makes it unlisted), **reopen**, and **view public page**.

## Create / edit — `/admin/postings/new` and `/admin/postings/<code>/edit`

- One tab per language: Brazilian Portuguese (required), English, Spanish, Chinese, Japanese. Tabs with missing content show a "!" badge.
- Per language: posting title, SEO title, SEO description, apply-button label, back-button label, and the body.
- The body uses a markdown editor with a live preview: headings, bold/italic, bullet lists, and links. Images are not supported for now. The existing 2026-01 posting reproduces exactly in this format.
- Apply button: you set its target link. It automatically gets the `?utm_source=garoastudios.com` tag like the rest of the site.
- Visibility: "stays up until I close it" or "closes automatically at a chosen date and time" (entered and displayed in Brasília time).
- Codes are assigned automatically on creation: current year plus a two-digit counter that always increases — 2026-01, 2026-02, and so on.

## Public side

- `/:locale/jobs` lists only live postings. Postings past their scheduled closing time count as closed.
- `/:locale/jobs/<code>` still works for a closed posting, but shows a banner at the top saying the posting has closed and is no longer accepting submissions, with the apply button disabled.
- Language fallback: if the visitor's language is missing, Brazilian Portuguese is used; if English exists, English is used instead.
- The "!" badge already on the Jobs nav button follows the live count — it disappears when nothing is live.
- The existing 2026-01 posting is imported into the admin system, and its hardcoded copy is removed from the source.

## Sitemap

`sitemap.xml` becomes generated automatically: all the fixed pages exactly as they are today, plus one entry per language for each live posting. Closed postings drop out immediately. No more hand-editing.

## Technical notes

- Enable Lovable Cloud (database, auth, functions).
- Tables: `job_postings` (code, apply_url, status, closes_at, timestamps) and `job_posting_translations` (posting id, locale, title, body markdown, labels, seo fields), plus a `user_roles` table with an `admin` role and a `has_role` security-definer function.
- Row-level security: public read limited to postings that are live or unlisted (list filtering happens in the query); all writes restricted to admins. Grants issued for `anon`, `authenticated`, and `service_role` per policy.
- Code allocation runs in a database function inside a transaction so two simultaneous creations can't collide.
- Auth: email OTP with a 5-minute expiry; an auth hook / trigger rejects any address other than contato@garoastudios.com; email signups disabled after the single user is provisioned.
- Editor: `@uiw/react-md-editor` (markdown source + preview) with `react-markdown` + `remark-gfm` for rendering, sanitized, links forced to `rel="noopener noreferrer"`. No raw HTML allowed.
- Scheduled closing is evaluated at read time (`closes_at <= now()`), so no cron job is needed.
- Sitemap: an edge function renders the XML with hreflang alternates; `public/_redirects` proxies `/sitemap.xml` to it with a 200 so the URL stays the same. `public/sitemap.xml` is removed.
- Times stored as UTC, entered/displayed as America/Sao_Paulo.
- New routes in `src/App.tsx`: `/admin/login`, `/admin`, `/admin/postings`, `/admin/postings/new`, `/admin/postings/:code/edit`, all behind a guard component.
- `src/data/jobPostings.ts` is replaced by data fetching (React Query) in `JobsPage.tsx` and `JobPostingPage.tsx`; the 2026-01 content is seeded into the database.
