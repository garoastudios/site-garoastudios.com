import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import { SITE_URL } from '@/i18n/seo';
import { getJobPosting } from '@/data/jobPostings';
import SEO from '@/components/SEO';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { Button } from '@/components/ui/button';

export default function JobPostingPage() {
  const { jobSlug } = useParams<{ jobSlug: string }>();
  const { locale } = useLocale();
  const posting = getJobPosting(jobSlug);

  if (!posting) {
    return <Navigate to={`/${locale}/jobs`} replace />;
  }

  const copy = posting.copy[locale];
  const pageUrl = `${SITE_URL}/${locale}/jobs/${posting.slug}`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: copy.title,
      description: copy.seoDescription,
      author: {
        '@type': 'Organization',
        name: 'Garoa Studios',
        sameAs: SITE_URL,
      },
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
        title={copy.seoTitle}
        description={copy.seoDescription}
        path={`/jobs/${posting.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <Header />
      <main className="flex-1 pt-24 pb-20 px-4">
        <Reveal>
          <article className="max-w-3xl mx-auto">
            <h1 className="normal-case font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 leading-tight">
              {copy.title}
            </h1>

            <div className="space-y-6 text-base sm:text-lg text-foreground/90 leading-relaxed">
              {copy.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

              <p className="font-bold text-accent text-lg sm:text-xl text-center py-3">
                {copy.targetLanguages}
              </p>

              {copy.sections.map((section, index) => (
                <section key={`${section.heading ?? 'section'}-${index}`} className="space-y-4">
                  {section.heading && (
                    <h2 className="font-display text-2xl sm:text-3xl text-foreground pt-4">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.bullets && (
                    <ul className="list-disc space-y-3 pl-6 marker:text-accent">
                      {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                  )}
                  {section.trailingParagraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}

              <p className="font-bold text-foreground">{copy.closing}</p>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center">
              <Button asChild size="lg" className="hover-grow bg-accent text-accent-foreground hover:bg-accent/90 text-base">
                <a href={posting.applicationUrl} target="_blank" rel="noopener noreferrer">
                  {copy.applyLabel}
                  <ExternalLink aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="hover-grow bg-transparent text-base">
                <Link to={`/${locale}/jobs`}>
                  <ArrowLeft aria-hidden="true" />
                  {copy.backLabel}
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
