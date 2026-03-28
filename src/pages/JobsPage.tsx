import { useEffect } from 'react';
import { useLocale } from '@/i18n/useLocale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t.jobs.heading} — Garoa Studios`;
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-6">
            {t.jobs.heading}
          </h1>
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
      </main>
      <Footer />
    </div>
  );
}
