import { useLocale } from '@/i18n/useLocale';
import {
  SiBluesky, SiDiscord, SiFacebook, SiInstagram,
  SiLinkedin, SiTelegram, SiTiktok, SiTwitch, SiX, SiYoutube,
} from './SocialIcons';
import { SteamIcon, ItchIcon } from './PlatformIcons';
import acjogosLogo from '@/assets/acjogos-rj.png';

const socials = [
  { Icon: SteamIcon, url: 'https://store.steampowered.com/publisher/garoastudios', label: 'Steam' },
  { Icon: ItchIcon, url: 'https://garoa.itch.io/', label: 'itch.io' },
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

export default function Footer() {
  const { t } = useLocale();

  return (
    <>
      <div className="flex justify-center py-8">
        <a
          href="https://rj.acjogos.com.br/?utm_source=garoastudios.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ACJOGOS-RJ"
          className="hover-grow inline-block"
        >
          <img src={acjogosLogo} alt="ACJOGOS-RJ" className="h-12 w-auto" />
        </a>
      </div>
      <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {socials.map(({ Icon, url, label }) => (
            <a
              key={label}
              href={`${url}?utm_source=garoastudios.com`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover-grow text-muted-foreground hover:text-accent transition-colors"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {t.footer.trademark}
        </p>
      </div>
      </footer>
    </>

  );
}
