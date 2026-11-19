import { writeFileSync } from "node:fs";
import path from "node:path";
import { loadEnv, type Plugin } from "vite";
import { isOpenJob, renderSitemap, type SitemapJob } from "../supabase/functions/sitemap/xml";

interface JobRow {
  code: string;
  closes_at: string | null;
  updated_at: string | null;
}

/**
 * Live postings are public via the publishable key (the jobs page uses the same
 * access). Closed or past-due rows are left out, matching the edge function.
 */
async function fetchLiveJobs(supabaseUrl: string, publishableKey: string): Promise<SitemapJob[]> {
  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "sitemap: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are required so live job URLs stay in the sitemap",
    );
  }

  const endpoint = new URL("/rest/v1/job_postings", supabaseUrl);
  endpoint.searchParams.set("status", "eq.live");
  endpoint.searchParams.set("select", "code,closes_at,updated_at");
  endpoint.searchParams.set("order", "code.desc");

  const headers: Record<string, string> = {
    apikey: publishableKey,
    Accept: "application/json",
  };
  // Opaque Supabase keys are not bearer JWTs. Legacy JWT anon keys still are.
  if (!publishableKey.startsWith("sb_publishable_") && !publishableKey.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${publishableKey}`;
  }

  const response = await fetch(endpoint, { headers });
  if (!response.ok) {
    throw new Error(`sitemap: job postings request failed (${response.status})`);
  }

  const rows = (await response.json()) as JobRow[];
  const now = Date.now();
  return rows
    .filter((row) => row.code && isOpenJob(row.closes_at, now))
    .map((row) => ({
      code: row.code,
      lastmod: (row.updated_at ?? new Date().toISOString()).slice(0, 10),
    }));
}

/** Writes dist/sitemap.xml from the shared route list during `vite build`. */
export function sitemapPlugin(): Plugin {
  let outDir = path.resolve(process.cwd(), "dist");

  return {
    name: "sitemap-xml",
    apply: "build",
    configResolved(config) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      const env = loadEnv("production", process.cwd(), "VITE_");
      const jobs = await fetchLiveJobs(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY);
      const today = new Date().toISOString().slice(0, 10);
      const xml = renderSitemap(today, jobs);
      writeFileSync(path.join(outDir, "sitemap.xml"), xml);
    },
  };
}
