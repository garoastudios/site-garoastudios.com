import { Link, Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft, ExternalLink } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import { SITE_URL } from '@/i18n/seo';
import { fetchPostingByCode, isClosed, pickCopy, withUtm } from '@/lib/postings';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Markdown from '@/components/Markdown';
import { Button } from '@/components/ui/button';

export default function JobPostingPage() {
  const { jobSlug } = useParams<{ jobSlug: string }>();
  const { locale, t } = useLocale();

  const { data: posting, isLoading } = useQuery({
    queryKey: ['posting', jobSlug],
    queryFn: () => fetchPostingByCode(jobSlug as string),
    enabled: Boolean(jobSlug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24 pb-20 px-4" />
        <Footer />
      </div>
    );
  }

  if (!posting) {
    return <Navigate to={`/${locale}/jobs`} replace />;
  }

  const copy = pickCopy(posting, locale);
  if (!copy) {
    return <Navigate to={`/${locale}/jobs`} replace />;
  }

  const closed = isClosed(posting);
  const pageUrl = `${SITE_URL}/${locale}/jobs/${posting.code}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: copy.title,
      description: copy.seo_description,
      author: { '@type': 'Organization', name: 'Garoa Studios', sameAs: SITE_URL },
      url: pageUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Garoa Studios', item: `${SITE_URL}/${locale}` },
        { '@type': 'ListItem', position: 2, name: 'Jobs', item: `${SITE_URL}/${locale}/jobs` },
        { '@type': 'ListItem', position: 3, name: copy.title, item: pageUrl },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        locale={locale}
        title={copy.seo_title || copy.title}
        description={copy.seo_description}
        path={`/jobs/${posting.code}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-1 pt-24 pb-20 px-4">
        <Reveal>
          <article className="max-w-3xl mx-auto">
            {closed && (
              <div
                role="status"
                className="mb-10 flex items-start gap-3 rounded-md border border-accent/50 bg-accent/10 px-5 py-4 text-foreground"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-base leading-relaxed">{t.jobs.closedNotice}</p>
              </div>
            )}

            <h1 className="normal-case font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 leading-tight">
              {copy.title}
            </h1>

            <Markdown className="space-y-6 text-base sm:text-lg text-foreground/90 leading-relaxed">
              {copy.body_md}
            </Markdown>

            <div className="mt-12 flex flex-col sm:flex-row gap-8 sm:items-center">
              {closed ? (
                <Button
                  size="lg"
                  disabled
                  className="bg-accent/40 text-accent-foreground text-base cursor-not-allowed"
                >
                  {t.jobs.closedApplyLabel}
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="hover-grow origin-right bg-accent text-accent-foreground hover:bg-accent/90 text-base"
                >
                  <a href={withUtm(posting.apply_url)} target="_blank" rel="noopener noreferrer">
                    {copy.apply_label}
                    <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                size="lg"
                className="hover-grow origin-left bg-transparent text-base"
              >
                <Link to={`/${locale}/jobs`}>
                  <ArrowLeft aria-hidden="true" />
                  {copy.back_label}
                </Link>
              </Button>
            </div>
          </article>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
