import { useLocale } from '@/i18n/useLocale';

import big24BrazilGold from '@/assets/awards/big24_brazil_gold.png';
import big24FinalistSound from '@/assets/awards/big24_finalist_sound.png';
import ecraSelection from '@/assets/awards/9ecra_selection.avif';
import brasilDirectFinalist from '@/assets/awards/brasildirect_finalist_2025.avif';
import gamescomLatam from '@/assets/awards/gamescomlatam_2025_selection.avif';
import overcomeOfficial from '@/assets/awards/overcome_official_2025.avif';
import sbgamesBestAudio from '@/assets/awards/sbgames_bestaudio_2025.avif';
import indiexMostFun from '@/assets/awards/indiex2025_mostfun.avif';
import ecraWhite from '@/assets/awards/7ecra_en_white.png';
import big19Bizzart from '@/assets/awards/big19_bizzart_white.png';

const LAURELS = [
  big24BrazilGold,
  big24FinalistSound,
  ecraSelection,
  brasilDirectFinalist,
  gamescomLatam,
  overcomeOfficial,
  sbgamesBestAudio,
  indiexMostFun,
  ecraWhite,
  big19Bizzart,
];

export default function AwardsSection() {
  const { t } = useLocale();

  return (
    <section className="snap-section-auto flex flex-col items-center justify-center py-12 overflow-hidden">
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-8 text-center px-4">
        {t.awards.heading}
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="awards-scroll-track flex items-center gap-12 w-max">
          {/* Duplicate set for seamless loop */}
          {[...LAURELS, ...LAURELS].map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Award laurel"
              className="h-24 sm:h-28 w-auto object-contain shrink-0"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
