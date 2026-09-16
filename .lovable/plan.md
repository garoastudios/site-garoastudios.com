# New localized job opening and reusable posting template

## What will change

- Replace the current “no openings” state on the localized jobs index with a title-only, clickable opening card for the RitMania localization call.
- Add the localized detail route `/:locale/jobs/2026-01`, keeping the site’s existing language-prefixed URL convention.
- Present the full call as a readable article with its original sections, paragraphs, bullet lists, payment details, and a prominent Google Form application link at the end.
- Translate the complete posting into English, Spanish, Simplified Chinese, and Japanese; preserve the supplied Brazilian Portuguese as the source version.
- Keep the existing starry background, header, footer, typography, gold accent, subtle reveal motion, and responsive behavior.

## Reusable job-posting template

- Introduce a typed job-posting content model covering slug, localized title, introduction, section headings, paragraphs, bullet lists, compensation details, application label, and application URL.
- Build a reusable job preview card for the jobs index and a reusable detail-page layout, so future openings only require a new content entry and route registration rather than duplicated page markup.
- Make the entire title card keyboard-accessible and clickable, with the existing restrained card and hover treatment.
- When there are no active postings in the future, retain the existing localized empty-state message and social links as the fallback.

## Navigation, discovery, and metadata

- Add the new detail page to the app routes and include a localized “back to jobs” control matching the site’s existing outlined navigation buttons.
- Add localized page titles and descriptions, canonical URLs, language alternates, and breadcrumb metadata for the opening.
- Add all five localized job URLs to the sitemap with matching `hreflang` alternates.
- Append `?utm_source=garoastudios.com` to the supplied Google Form URL, following the project-wide external-link convention, and open it safely in a new tab.

## Validation

- Verify the jobs card opens the correct localized posting and that changing language preserves `/jobs/2026-01`.
- Check all five translations, external application links, keyboard focus, mobile/tablet wrapping, desktop layout, and reduced-motion behavior.
- Run the project’s automated checks and inspect the jobs index and detail page in desktop and mobile-sized previews.

## Technical details

- The current `/jobs` page is a localized empty-state screen with social links; it has no posting-card or job-detail structure yet.
- The new content structure will remain frontend-only and compatible with the existing GitHub/Netlify deployment; no backend or form handling is required.
- No application deadline or publication date will be invented because neither was supplied.
