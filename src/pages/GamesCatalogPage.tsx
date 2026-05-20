import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { type Locale } from '@/i18n/config';
import { getGameCapsule } from '@/i18n/assets';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SteamIcon, ItchIcon, NuuvemIcon, SpawndIcon } from '@/components/PlatformIcons';

type Platform = 'steam' | 'itch' | 'nuuvem' | 'spawnd';

interface GameDef {
  slug: string;
  key: 'rhythmania' | 'cartomante' | 'standByMe' | 'catLeatherJackets' | 'astroPig';
  asset: string;
  year: string;
  platforms: Platform[];
}

const GAMES: GameDef[] = [
  { slug: 'rhythmania', key: 'rhythmania', asset: 'rhythmania', year: 'Coming Soon', platforms: ['steam', 'itch', 'spawnd'] },
  { slug: 'astro-pig', key: 'astroPig', asset: 'astro_pig', year: '2024', platforms: ['steam', 'itch', 'nuuvem'] },
  { slug: 'cat-leather-jackets', key: 'catLeatherJackets', asset: 'cat_leather_jackets', year: '2023', platforms: ['steam', 'itch', 'nuuvem'] },
  { slug: 'stand-by-me', key: 'standByMe', asset: 'stand_by_me', year: '2021', platforms: ['steam', 'itch', 'nuuvem'] },
  { slug: 'cartomante', key: 'cartomante', asset: 'cartomante', year: '2020', platforms: ['steam', 'itch', 'nuuvem'] },
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
  return (
    <Link
      to={`/${locale}/games/${game.slug}`}
      className="hover-grow group block overflow-hidden rounded-lg bg-card transition-all duration-300"
    >
      <div className="aspect-[460/215] overflow-hidden">
        <img
          src={getGameCapsule(game.asset, locale)}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="font-display text-base sm:text-lg text-foreground group-hover:text-accent transition-colors duration-300">
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

  return (
    <div className="min-h-screen bg-background">
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
