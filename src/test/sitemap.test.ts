import { readFileSync } from "node:fs";
import { createElement } from "react";
import { act, render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import SEO from "@/components/SEO";
import {
  LOCALES,
  isOpenJob,
  renderSitemap,
  sitemapLocs,
} from "../../supabase/functions/sitemap/xml";

const TODAY = "2026-11-19";

function locs(jobs: { code: string; lastmod: string }[] = []) {
  return sitemapLocs(renderSitemap(TODAY, jobs));
}

describe("sitemap", () => {
  it("includes the site root and the games catalog and jobs index for every locale", () => {
    const urls = locs();

    expect(urls).toContain("https://garoastudios.com/");
    for (const locale of LOCALES) {
      expect(urls).toContain(`https://garoastudios.com/${locale}`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games/rhythmania`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games/cartomante`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games/stand-by-me`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games/cat-leather-jackets`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/games/astro-pig`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/press`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/jobs`);
      expect(urls).toContain(`https://garoastudios.com/${locale}/links`);
    }
  });

  it("adds live job postings per locale and skips admin URLs", () => {
    const urls = locs([{ code: "2026-01", lastmod: "2026-09-16" }]);

    for (const locale of LOCALES) {
      expect(urls).toContain(`https://garoastudios.com/${locale}/jobs/2026-01`);
    }
    expect(urls.some((url) => url.includes("/admin"))).toBe(false);
  });

  it("drops a posting once its close time has passed", () => {
    expect(isOpenJob(null, Date.parse("2026-11-19T00:00:00Z"))).toBe(true);
    expect(isOpenJob("2026-12-01T00:00:00Z", Date.parse("2026-11-19T00:00:00Z"))).toBe(true);
    expect(isOpenJob("2026-11-01T00:00:00Z", Date.parse("2026-11-19T00:00:00Z"))).toBe(false);
  });
});

describe("search console meta", () => {
  it("is a real tag in index.html, not an HTML comment", () => {
    const html = readFileSync("index.html", "utf8");
    const withoutComments = html.replace(/<!--[\s\S]*?-->/g, "");
    expect(withoutComments).toContain(
      '<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />',
    );
  });

  it("is left in place when Helmet applies route tags", async () => {
    const meta = document.createElement("meta");
    meta.setAttribute("name", "google-site-verification");
    meta.setAttribute("content", "YOUR_VERIFICATION_CODE");
    document.head.appendChild(meta);

    await act(async () => {
      render(
        createElement(
          HelmetProvider,
          null,
          createElement(SEO, {
            locale: "en",
            title: "Garoa Studios",
            description: "Indie games from Rio de Janeiro.",
          }),
        ),
      );
    });
    // Helmet defers DOM updates to the next frame, with a 100ms fallback.
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 150));
    });

    const tags = document.head.querySelectorAll('meta[name="google-site-verification"]');
    expect(Array.from(tags).map((tag) => tag.getAttribute("content"))).toEqual([
      "YOUR_VERIFICATION_CODE",
    ]);
    meta.remove();
  });
});
