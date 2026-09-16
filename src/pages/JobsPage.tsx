import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import { JOB_POSTINGS } from '@/data/jobPostings';
import SEO from '@/components/SEO';
import { SEO as SEO_DATA } from '@/i18n/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

import {
  SiBluesky, SiDiscord, SiFacebook, SiInstagram,
  SiLinkedin, SiTelegram, SiTiktok, SiTwitch, SiX, SiYoutube,
} from '@/components/SocialIcons';

const socials = [
  { Icon: SiBluesky, url: 'https://bsky.app/profile/garoastudios.com', label: 'Bluesky' },
  { Icon: SiDiscord, url: 'https://discord.com/invite/hBdTNPgfx4', label: 'Discord' },
  { Icon: SiFacebook, url: 'https://www.facebook.com/garoastudios/', label: 'Facebook' },
  { Icon: SiInstagram, url: 'https://instagram.com/garoastudios', label: 'Instagram' },
  { Icon: SiLinkedin, url: 'https://www.linkedin.com/company/garoastudios', label: 'LinkedIn' },
  { Icon: SiTelegram, url: 'https://t.me/garoastudios', label: 'Telegram' },
  { Icon: SiTiktok, url: 'https://tiktok.com/@garoastudios', label: 'TikTok' },
  { Icon: SiTwitch, url: 'https://www.twitch.tv/garoastudios', label: 'Twitch' },
  { Icon: SiX, url: 'https://x.com/garoastudios', label: 'X' },
  { Icon: SiYoutube, url: 'https://youtube.com/@garoastudios', label: 'YouTube' },
];

export default function JobsPage() {
  const { locale, t } = useLocale();
  const seo = SEO_DATA[locale];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO locale={locale} title={seo.jobs.title} description={seo.jobs.description} path="/jobs" />
      <Header />
      <main className="pt-16 flex-1">
        <Reveal>
          <div className="max-w-3xl mx-auto px-4 py-20">
            <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-10 text-center">
              {t.jobs.heading}
            </h1>

            {JOB_POSTINGS.length > 0 ? (
              <div className="space-y-4">
                {JOB_POSTINGS.map((posting) => {
                  const copy = posting.copy[locale];
                  return (
                    <Link
                      key={posting.slug}
                      to={`/${locale}/jobs/${posting.slug}`}
                      className="group flex min-h-24 items-center justify-between gap-5 rounded-md border border-foreground/20 bg-card/70 px-6 py-5 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-accent hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <h2 className="normal-case font-display text-xl sm:text-2xl leading-snug">
                        {copy.title}
                      </h2>
                      <ArrowRight className="h-6 w-6 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                  {t.jobs.noOpenings}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {socials.map(({ Icon, url, label }) => (
                    <a
                      key={label}
                      href={`${url}?utm_source=garoastudios.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
