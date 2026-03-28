import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { type Locale } from '@/i18n/config';
import { getGameCapsule } from '@/i18n/assets';
import { SteamIcon, ItchIcon, SpawndIcon } from '@/components/PlatformIcons';

type Platform = 'steam' | 'itch' | 'spawnd';

interface GameDef {
  slug: string;
  key: 'rhythmania' | 'cartomante' | 'standByMe' | 'catLeatherJackets' | 'astroPig';
  asset: string;
  year: string;
  platforms: Platform[];
  trailerWebm?: string; // future: path to webm micro-trailer
}

const GAMES: GameDef[] = [
  { slug: 'rhythmania', key: 'rhythmania', asset: 'rhythmania', year: 'Coming Soon', platforms: ['steam', 'itch', 'spawnd'] },
  { slug: 'cartomante', key: 'cartomante', asset: 'cartomante', year: '2020', platforms: ['steam', 'itch'] },
  { slug: 'stand-by-me', key: 'standByMe', asset: 'stand_by_me', year: '2021', platforms: ['steam', 'itch'] },
  { slug: 'cat-leather-jackets', key: 'catLeatherJackets', asset: 'cat_leather_jackets', year: '2023', platforms: ['steam', 'itch'] },
  { slug: 'astro-pig', key: 'astroPig', asset: 'astro_pig', year: '2024', platforms: ['steam', 'itch'] },
];

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const cls = "w-5 h-5";
  switch (platform) {
    case 'steam': return <SteamIcon className={cls} />;
    case 'itch': return <ItchIcon className={cls} />;
    case 'spawnd': return <SpawndIcon className={cls} />;
  }
};

function GameCard({ game, locale, title }: { game: GameDef; locale: Locale; title: string }) {
  const [hovering, setHovering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (game.trailerWebm) {
      timerRef.current = setTimeout(() => {
        setHovering(true);
        videoRef.current?.play();
      }, 1500);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/${locale}/games/${game.slug}`}
      className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full aspect-[460/215]">
        <img
          src={getGameCapsule(game.asset, locale)}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovering ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
        {game.trailerWebm && (
          <video
            ref={videoRef}
            src={game.trailerWebm}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
          />
        )}
      </div>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-display text-base text-foreground">{title}</h3>
          <div className="flex items-center gap-1.5 text-foreground/70">
            {game.platforms.map((p) => (
              <PlatformIcon key={p} platform={p} />
            ))}
          </div>
        </div>
        <span className="font-display text-sm text-muted-foreground">{game.year}</span>
      </div>
    </Link>
  );
}

export default function GamesSection() {
  const { locale, t } = useLocale();

  return (
    <section id="games" className="snap-section flex flex-col justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 text-center">
          {t.games.heading}
        </h2>

        <div className="flex flex-col gap-6">
          {GAMES.map((game) => (
            <GameCard key={game.slug} game={game} locale={locale} title={t.games[game.key].title} />
          ))}
        </div>
      </div>
    </section>
  );
}
