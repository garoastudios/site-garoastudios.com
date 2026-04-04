import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import garoaLogoMain from '@/assets/logos/garoa_logo_main.png';
import garoaLogoJa from '@/assets/logos/garoa_logo_ja.png';
import garoaLogoZh from '@/assets/logos/garoa_logo_zh.png';
import { type Locale } from '@/i18n/config';

import photo1 from '@/assets/photos/clj_gamescom_latam_2024.jpg';
import photo2 from '@/assets/photos/popular_choice_gamescom_latam_2024.jpg';
import photo3 from '@/assets/photos/rhythmania_showcase_riofilme.jpg';
import photo4 from '@/assets/photos/astro_pig_sbgames_2019.jpg';
import photo5 from '@/assets/photos/astro_pig_gamethon.jpg';
import photo6 from '@/assets/photos/rhythmania_brazil_direct_2025.png';
import photo7 from '@/assets/photos/rhythmania_jogatorio_2025.jpg';
import photo8 from '@/assets/photos/clj_artists_alley_big_2023.jpg';

const PHOTOS = [
  { src: photo1, caption: 'Cat Leather Jackets official selection exhibit at gamescom latam 2024' },
  { src: photo2, caption: 'Astro Pig winning Popular Choice at gamescom latam 2024' },
  { src: photo3, caption: 'Rhythmania showcase at Rio de Janeiro Film and Games Commission 2025' },
  { src: photo4, caption: 'Astro Pig prototype winning Popular Choice at SBGames 2019' },
  { src: photo5, caption: 'Astro Pig prototype winning first place at Gamethon 2019' },
  { src: photo6, caption: 'Rhythmania on Brazil Direct finals at gamescom latam 2025' },
  { src: photo7, caption: 'RhythMania on Jogatório Festival 2025 official selection' },
  { src: photo8, caption: "Cat Leather Jackets lead artist Kuating's booth at BIG Festival 2023 Artists' Alley" },
];

const logoByLocale: Record<Locale, string> = {
  br: garoaLogoMain,
  en: garoaLogoMain,
  es: garoaLogoMain,
  ja: garoaLogoJa,
  zh: garoaLogoZh,
};

const AUTO_INTERVAL = 4000;
const PAUSE_AFTER_INTERACTION = 10000;

function ValuesCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = useCallback((dir: 1 | -1) => {
    setCurrent(prev => (prev + dir + PHOTOS.length) % PHOTOS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => advance(1), AUTO_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, advance]);

  const handleManual = (dir: 1 | -1) => {
    advance(dir);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), PAUSE_AFTER_INTERACTION);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {PHOTOS.map((photo, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <img
            src={photo.src}
            alt={photo.caption}
            className="w-full h-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
            <p className="text-foreground text-sm leading-snug">{photo.caption}</p>
          </div>
        </div>
      ))}

      <button
        onClick={() => handleManual(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleManual(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true); if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current); pauseTimerRef.current = setTimeout(() => setPaused(false), PAUSE_AFTER_INTERACTION); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-accent w-4' : 'bg-foreground/40'}`}
            aria-label={`Photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutSection() {
  const { locale, t } = useLocale();

  return (
    <section id="about" className="snap-section flex flex-col justify-center px-4 py-14">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-center">
          {t.about.heading}
        </h2>

        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 mb-12 flex items-center gap-8">
          <img
            src={logoByLocale[locale]}
            alt="Garoa Studios"
            className="w-36 sm:w-44 shrink-0 rounded-xl"
          />
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-accent mb-6">
              {t.about.welcome}
            </h3>
            <p className="text-foreground/90 text-lg leading-relaxed mb-4">
              {t.about.p1}
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed">
              {t.about.p2}
            </p>
          </div>
        </div>

        {/* Our Values */}
        <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-8 text-center">
          {t.values.heading}
        </h3>
        <div className="flex flex-col gap-8">
          {/* Photo Carousel */}
          <div className="w-full aspect-[21/9] rounded-xl overflow-hidden">
            <ValuesCarousel />
          </div>

          {/* Value tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(['transparency', 'community', 'global', 'dataInformed', 'scalable'] as const).map((key) => (
              <div key={key} className="bg-card border border-border rounded-xl p-5">
                <h4 className="font-display text-lg text-accent mb-2">
                  {t.values[key].title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.values[key].description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}