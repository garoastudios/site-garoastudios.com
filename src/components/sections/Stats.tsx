import { useLocale } from '@/i18n/useLocale';
import { Sparkles, Trophy, ThumbsUp } from 'lucide-react';
import {
  SiBluesky, SiDiscord, SiFacebook, SiInstagram,
  SiLinkedin, SiTelegram, SiTiktok, SiTwitch, SiX, SiYoutube,
} from '@/components/SocialIcons';
import { SteamIcon, ItchIcon, NuuvemIcon } from '@/components/PlatformIcons';

const storeLinks = [
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

export default function StatsSection() {
  const { t } = useLocale();

  const stats = [
    { icon: <Sparkles className="w-8 h-8 text-accent" />, label: t.stats.consistentCreation },
    { icon: <Trophy className="w-8 h-8 text-accent" />, label: t.stats.awards },
    { icon: <ThumbsUp className="w-8 h-8 text-accent" />, label: t.stats.positiveRating },
  ];

  return (
    <section id="stats" className="snap-section flex flex-col items-center md:justify-center px-4 pt-7 pb-3.5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
          {t.stats.heading}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 whitespace-pre-line">
          {t.stats.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3"
            >
              {stat.icon}
              <span className="font-display text-lg text-foreground">{stat.label}</span>
            </div>
          ))}
        </div>

        <h3 className="font-display text-xl sm:text-2xl text-muted-foreground mb-4">
          {t.stats.wishlist}
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
          {storeLinks.map(({ Icon, url, label }) => (
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

        <h3 className="font-display text-xl sm:text-2xl text-muted-foreground mb-4">
          {t.stats.followUs}
        </h3>
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
    </section>
  );
}
