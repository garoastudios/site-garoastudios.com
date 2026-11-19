import { createClient } from "npm:@supabase/supabase-js@2";
import { isOpenJob, renderSitemap, type SitemapJob } from "./xml.ts";

// Netlify serves the sitemap written at site build time from ./xml.ts
// (see scripts/sitemapPlugin.ts). This function uses the same URL list so a
// later deploy stays aligned if /sitemap.xml is pointed back at it.
// Do not deploy this function as part of the site preview: it updates production.

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: { "Access-Control-Allow-Origin": "*" } });
  }

  const today = new Date().toISOString().slice(0, 10);
  const jobs: SitemapJob[] = [];

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    );

    const { data, error } = await supabase
      .from("job_postings")
      .select("code, status, closes_at, updated_at")
      .eq("status", "live")
      .order("code", { ascending: false });

    if (error) throw error;

    const now = Date.now();
    for (const posting of data ?? []) {
      if (!isOpenJob(posting.closes_at, now)) continue;
      const lastmod = (posting.updated_at ?? new Date().toISOString()).slice(0, 10);
      jobs.push({ code: posting.code, lastmod });
    }
  } catch (error) {
    console.error("sitemap: could not load job postings", error);
  }

  const xml = renderSitemap(today, jobs);

  const headers = new Headers();
  headers.set("content-type", "application/xml; charset=utf-8");
  headers.set("cache-control", "public, max-age=600");
  headers.set("access-control-allow-origin", "*");

  return new Response(xml, { headers });
});
