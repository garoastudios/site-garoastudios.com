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
  trailerWebm?: string;
}

const GAMES: GameDef[] = [
  { slug: 'rhythmania', key: 'rhythmania', asset: 'rhythmania', year: 'Coming Soon', platforms: ['steam', 'itch', 'spawnd'] },
  { slug: 'astro-pig', key: 'astroPig', asset: 'astro_pig', year: '2024', platforms: ['steam', 'itch'] },
  { slug: 'cat-leather-jackets', key: 'catLeatherJackets', asset: 'cat_leather_jackets', year: '2023', platforms: ['steam', 'itch'] },
  { slug: 'stand-by-me', key: 'standByMe', asset: 'stand_by_me', year: '2021', platforms: ['steam', 'itch'] },
  { slug: 'cartomante', key: 'cartomante', asset: 'cartomante', year: '2020', platforms: ['steam', 'itch'] },
];

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const cls = "w-7 h-7";
  switch (platform) {
    case 'steam': return <SteamIcon className={cls} />;
    case 'itch': return <ItchIcon className={cls} />;
    case 'spawnd': return <SpawndIcon className={cls} />;
  }
};

function GameCard({ game, locale, title, reverse }: { game: GameDef; locale: Locale; title: string; reverse?: boolean }) {
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

  const imageBlock = (
    <div className="relative w-56 sm:w-[308px] shrink-0 aspect-[460/215]">
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
  );

  const textBlock = (
    <div className={`flex-1 p-5 flex flex-col justify-center gap-1.5 ${reverse ? 'items-end text-right' : ''}`}>
      <h3 className="font-display text-lg sm:text-xl text-foreground">{title}</h3>
      <span className="font-display text-sm text-muted-foreground">{game.year}</span>
      <div className="flex items-center gap-2 text-foreground/70 mt-1">
        {game.platforms.map((p) => (
          <PlatformIcon key={p} platform={p} />
        ))}
      </div>
    </div>
  );

  return (
    <Link
      to={`/${locale}/games/${game.slug}`}
      className="group flex bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors h-[134px] sm:h-[154px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {reverse ? <>{textBlock}{imageBlock}</> : <>{imageBlock}{textBlock}</>}
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

        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {GAMES.map((game, i) => (
            <GameCard key={game.slug} game={game} locale={locale} title={t.games[game.key].title} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
