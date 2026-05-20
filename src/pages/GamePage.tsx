import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { getGameCapsule } from '@/i18n/assets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import rhythmaniaTrailer from '@/assets/games/rhythmania_microtrailer.webm';
import astroPigTrailer from '@/assets/games/astro_pig_microtrailer.webm';
import catLeatherJacketsTrailer from '@/assets/games/cat_leather_jackets_microtrailer.webm';
import standByMeTrailer from '@/assets/games/stand_by_me_microtrailer.webm';
import cartomanteTrailer from '@/assets/games/cartomante_microtrailer.webm';

const SLUG_TO_TRAILER: Record<string, string> = {
  'rhythmania': rhythmaniaTrailer,
  'astro-pig': astroPigTrailer,
  'cat-leather-jackets': catLeatherJacketsTrailer,
  'stand-by-me': standByMeTrailer,
  'cartomante': cartomanteTrailer,
};

const SLUG_TO_ASSET: Record<string, string> = {
  'rhythmania': 'rhythmania',
  'cartomante': 'cartomante',
  'stand-by-me': 'stand_by_me',
  'cat-leather-jackets': 'cat_leather_jackets',
  'astro-pig': 'astro_pig',
};

const SLUG_TO_KEY: Record<string, string> = {
  'rhythmania': 'rhythmania',
  'cartomante': 'cartomante',
  'stand-by-me': 'standByMe',
  'cat-leather-jackets': 'catLeatherJackets',
  'astro-pig': 'astroPig',
};

const STEAM_WIDGETS: Record<string, string> = {
  'rhythmania': 'https://store.steampowered.com/widget/2322070/',
  'cartomante': 'https://store.steampowered.com/widget/1361760/',
  'stand-by-me': 'https://store.steampowered.com/widget/1484600/',
  'cat-leather-jackets': 'https://store.steampowered.com/widget/1673830/',
  'astro-pig': 'https://store.steampowered.com/widget/1800390/',
};

export default function GamePage() {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { locale, t } = useLocale();

  const key = SLUG_TO_KEY[gameSlug || ''] as keyof typeof t.games | undefined;
  const gameInfo = key ? (t.games[key] as { title: string; description: string }) : null;
  const assetSlug = SLUG_TO_ASSET[gameSlug || ''];
  const steamWidget = STEAM_WIDGETS[gameSlug || ''];
  const trailer = SLUG_TO_TRAILER[gameSlug || ''];
  const isRhythmania = gameSlug === 'rhythmania';

  useEffect(() => {
    if (gameInfo) {
      document.title = `${gameInfo.title} — Garoa`;
    }
  }, [gameInfo]);

  if (!gameInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground">Game not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="relative">
          {trailer ? (
            <video
              src={trailer}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-[50vh] object-cover"
            />
          ) : (
            <img
              src={getGameCapsule(assetSlug, locale)}
              alt={gameInfo.title}
              className="w-full h-[50vh] object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10 pb-20">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-6">
            {gameInfo.title}
          </h1>
          <p className="text-foreground/90 text-lg leading-relaxed mb-8">
            {gameInfo.description}
          </p>

          {/* Steam Widget */}
          {steamWidget && (
            <div className="mb-8 w-full max-w-[646px]">
              <iframe
                src={steamWidget}
                frameBorder="0"
                width="646"
                height="190"
                className="w-full rounded-lg"
                title={`${gameInfo.title} on Steam`}
              />
            </div>
          )}

          {/* Spawnd Playable Embed (RhythMania only) */}
          {isRhythmania && (
            <div className="mb-8 w-full max-w-[640px]">
              <iframe
                src="https://www.spawnd.gg/-/games/embed/26?description=false"
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; encrypted-media; clipboard-write; clipboard-read; web-share; cross-origin-isolated"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full rounded-lg"
                title="Play RhythMania on spawnd.gg"
              />
            </div>
          )}

          <Link
            to={`/${locale}/games`}
            className="hover-grow inline-flex items-center justify-center px-8 py-3 font-display text-lg border border-foreground/20 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            ← {t.games.backToGames}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
