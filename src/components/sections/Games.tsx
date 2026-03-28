import { Link } from 'react-router-dom';
import { useLocale } from '@/i18n/useLocale';
import { getGameCapsule } from '@/i18n/assets';

const GAMES = [
  { slug: 'rhythmania', key: 'rhythmania' as const },
  { slug: 'cartomante', key: 'cartomante' as const },
  { slug: 'stand-by-me', key: 'standByMe' as const },
  { slug: 'cat-leather-jackets', key: 'catLeatherJackets' as const },
  { slug: 'astro-pig', key: 'astroPig' as const },
];

// Map slug to asset filename
const SLUG_TO_ASSET: Record<string, string> = {
  'rhythmania': 'rhythmania',
  'cartomante': 'cartomante',
  'stand-by-me': 'stand_by_me',
  'cat-leather-jackets': 'cat_leather_jackets',
  'astro-pig': 'astro_pig',
};

export default function GamesSection() {
  const { locale, t } = useLocale();

  const featured = GAMES[0];
  const rest = GAMES.slice(1);

  const getGameInfo = (key: typeof GAMES[number]['key']) => t.games[key];

  return (
    <section id="games" className="snap-section flex flex-col justify-center px-4 py-20">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 text-center">
          {t.games.heading}
        </h2>

        {/* Featured game */}
        <Link
          to={`/${locale}/games/${featured.slug}`}
          className="group block mb-10"
        >
          <div className="flex flex-col md:flex-row gap-6 bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors">
            <div className="md:w-1/2">
              <img
                src={getGameCapsule(SLUG_TO_ASSET[featured.slug], locale)}
                alt={getGameInfo(featured.key).title}
                className="w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-2">
                {getGameInfo(featured.key).title}
              </h3>
              <p className="font-display text-accent text-sm mb-3">
                {getGameInfo(featured.key).subtitle}
              </p>
              <p className="text-muted-foreground mb-4">
                {getGameInfo(featured.key).description}
              </p>
              <span className="text-accent font-display text-sm group-hover:underline">
                {t.games.learnMore} →
              </span>
            </div>
          </div>
        </Link>

        {/* Game grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((game) => {
            const info = getGameInfo(game.key);
            return (
              <Link
                key={game.slug}
                to={`/${locale}/games/${game.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:border-accent/50 transition-colors"
              >
                <img
                  src={getGameCapsule(SLUG_TO_ASSET[game.slug], locale)}
                  alt={info.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-display text-lg text-foreground mb-1">{info.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">{info.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
