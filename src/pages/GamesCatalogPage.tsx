import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { type Locale } from '@/i18n/config';
import { getGameCapsule } from '@/i18n/assets';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import SEO from '@/components/SEO';
import { SEO as SEO_DATA, SITE_URL } from '@/i18n/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import rhythmaniaTrailer from '@/assets/games/rhythmania_microtrailer.webm';
import astroPigTrailer from '@/assets/games/astro_pig_microtrailer.webm';
import catLeatherJacketsTrailer from '@/assets/games/cat_leather_jackets_microtrailer.webm';
import standByMeTrailer from '@/assets/games/stand_by_me_microtrailer.webm';
import cartomanteTrailer from '@/assets/games/cartomante_microtrailer.webm';
import { SteamIcon, ItchIcon, NuuvemIcon, SpawndIcon } from '@/components/PlatformIcons';


type Platform = 'steam' | 'itch' | 'nuuvem' | 'spawnd';

interface GameDef {
  slug: string;
  key: 'rhythmania' | 'cartomante' | 'standByMe' | 'catLeatherJackets' | 'astroPig';
  asset: string;
  year: string;
  platforms: Platform[];
  trailerWebm?: string;
}

const GAMES: GameDef[] = [
  { slug: 'rhythmania', key: 'rhythmania', asset: 'rhythmania', year: 'Coming Soon', platforms: ['steam', 'itch', 'spawnd'], trailerWebm: rhythmaniaTrailer },
  { slug: 'astro-pig', key: 'astroPig', asset: 'astro_pig', year: '2024', platforms: ['steam', 'itch', 'nuuvem'], trailerWebm: astroPigTrailer },
  { slug: 'cat-leather-jackets', key: 'catLeatherJackets', asset: 'cat_leather_jackets', year: '2023', platforms: ['steam', 'itch', 'nuuvem'], trailerWebm: catLeatherJacketsTrailer },
  { slug: 'stand-by-me', key: 'standByMe', asset: 'stand_by_me', year: '2021', platforms: ['steam', 'itch', 'nuuvem'], trailerWebm: standByMeTrailer },
  { slug: 'cartomante', key: 'cartomante', asset: 'cartomante', year: '2020', platforms: ['steam', 'itch', 'nuuvem'], trailerWebm: cartomanteTrailer },
];

const PlatformIcon = ({ platform }: { platform: Platform }) => {
  const cls = platform === 'nuuvem' ? "w-[30px] h-[30px]" : "w-5 h-5";
  switch (platform) {
    case 'steam': return <SteamIcon className={cls} />;
    case 'itch': return <ItchIcon className={cls} />;
    case 'nuuvem': return <NuuvemIcon className={cls} />;
    case 'spawnd': return <SpawndIcon className={cls} />;
  }
};

function GameCard({ game, locale, title }: { game: GameDef; locale: Locale; title: string }) {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseEnter = () => {
    if (game.trailerWebm && !reducedMotion) {
      if (!videoSrc) setVideoSrc(game.trailerWebm);
      timerRef.current = setTimeout(() => {
        setVideoPlaying(true);
        videoRef.current?.play().catch(() => {});
      }, 500);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <Link
      to={`/${locale}/games/${game.slug}`}
      className="hover-grow group block overflow-hidden rounded-lg bg-card transition-all duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[460/215] overflow-hidden">
        <img
          src={getGameCapsule(game.asset, locale)}
          alt={title}
          className={`w-full h-full object-cover transition-[transform,opacity] duration-500 group-hover:scale-105 ${videoPlaying ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
        {game.trailerWebm && !reducedMotion && videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${videoPlaying ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
            preload="none"
          />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-base sm:text-lg normal-case text-foreground group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        <span className="font-display text-sm text-muted-foreground">{game.year}</span>
        <div className="flex items-center gap-2 text-foreground/70 mt-1.5">
          {game.platforms.map((p) => (
            <PlatformIcon key={p} platform={p} />
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function GamesCatalogPage() {
  const { locale, t } = useLocale();
  const seo = SEO_DATA[locale];

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: seo.games.title,
    description: seo.games.description,
    numberOfItems: GAMES.length,
    itemListElement: GAMES.map((game, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_URL}/${locale}/games/${game.slug}`,
      name: t.games[game.key].title,
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        locale={locale}
        title={seo.games.title}
        description={seo.games.description}
        path="/games"
        jsonLd={itemListJsonLd}
      />
      <Header />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 text-center">
            {t.games.heading}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAMES.map((game) => (
              <GameCard
                key={game.slug}
                game={game}
                locale={locale}
                title={t.games[game.key].title}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={`/${locale}`}
              className="hover-grow inline-flex items-center justify-center px-8 py-3 font-display text-lg border border-foreground/20 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
            >
              ← {t.games.backToHome}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

