import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { getGameCapsule } from '@/i18n/assets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default function GamePage() {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const { locale, t } = useLocale();

  const key = SLUG_TO_KEY[gameSlug || ''] as keyof typeof t.games | undefined;
  const gameInfo = key ? (t.games[key] as { title: string; subtitle: string; description: string }) : null;
  const assetSlug = SLUG_TO_ASSET[gameSlug || ''];

  useEffect(() => {
    if (gameInfo) {
      document.title = `${gameInfo.title} — Garoa Studios`;
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
          <img
            src={getGameCapsule(assetSlug, locale)}
            alt={gameInfo.title}
            className="w-full h-[50vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10 pb-20">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-2">
            {gameInfo.title}
          </h1>
          <p className="font-display text-accent text-lg mb-6">{gameInfo.subtitle}</p>
          <p className="text-foreground/90 text-lg leading-relaxed mb-8">
            {gameInfo.description}
          </p>
          <Link
            to={`/${locale}#games`}
            className="inline-block bg-accent text-accent-foreground font-display px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            ← {t.games.heading}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
