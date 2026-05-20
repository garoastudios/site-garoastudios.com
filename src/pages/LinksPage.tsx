import { useEffect } from 'react';
import { useLocale } from '@/i18n/useLocale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SteamIcon, ItchIcon, NuuvemIcon } from '@/components/PlatformIcons';
import {
  SiBluesky, SiDiscord, SiFacebook, SiInstagram,
  SiLinkedin, SiTelegram, SiTiktok, SiTwitch, SiX, SiYoutube,
} from '@/components/SocialIcons';

const stores = [
  { Icon: SteamIcon, url: 'https://store.steampowered.com/publisher/garoastudios', label: 'Steam' },
  { Icon: ItchIcon, url: 'https://garoa.itch.io/', label: 'itch.io' },
  { Icon: NuuvemIcon, url: 'https://www.nuuvem.com/br-pt/catalog/publishers/garoa-studios', label: 'Nuuvem' },
];

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

export default function LinksPage() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t.links.heading} — Garoa`;
  }, [t]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-16 flex-1">

        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-12">
            {t.links.heading}
          </h1>

          <h2 className="font-display text-xl sm:text-2xl text-muted-foreground mb-6">
            {t.links.stores}
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-14">
            {stores.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={`${url}?utm_source=garoastudios.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover-grow text-muted-foreground hover:text-accent transition-colors"
              >
                <Icon className={label === 'Nuuvem' ? 'w-[57px] h-[57px]' : 'w-[54px] h-[54px]'} />
              </a>
            ))}
          </div>

          <h2 className="font-display text-xl sm:text-2xl text-muted-foreground mb-6">
            {t.links.socials}
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={`${url}?utm_source=garoastudios.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover-grow text-muted-foreground hover:text-accent transition-colors"
              >
                <Icon className="w-9 h-9" />
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
