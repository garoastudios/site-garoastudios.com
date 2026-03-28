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
import sbgamesWhite from '@/assets/awards/sbgames_white.png';
import sjeecWhite from '@/assets/awards/sjeec_white.png';
import strWhite from '@/assets/awards/str_white.png';
import big24White from '@/assets/awards/big24_white.png';
import dropsWhite from '@/assets/awards/drops_white.png';
import finalistLaurel2024 from '@/assets/awards/finalist_laurel_2024.png';
import gamescomLatam24Gold from '@/assets/awards/gamescomlatam24_gold.png';
import gamethonWhite from '@/assets/awards/gamethon_white.png';
import jogatorioWhite from '@/assets/awards/jogatorio_white.png';
import perifaconWhite from '@/assets/awards/perifacon_white.png';
import sbmSbgames from '@/assets/awards/sbm_sbgames.png';
import sbm6ecra from '@/assets/awards/sbm_6ecra.png';
import sbmLeblanc from '@/assets/awards/sbm_leblanc_2022.png';
import bestGameMusic from '@/assets/awards/best_game_music.png';
import cartomanteChainsaw from '@/assets/awards/cartomante_chainsaw.png';
import cljJogatorio from '@/assets/awards/clj_jogatorio.png';
import cljPerifacon24 from '@/assets/awards/clj_perifacon24.png';
import cljSbgamesArt from '@/assets/awards/clj_sbgames_art.png';
import finalistaMelhorBr from '@/assets/awards/finalista_melhorbr.png';
import officialSelection5ecra from '@/assets/awards/official_selection_5ecra.png';

const LAURELS = [
  big24BrazilGold,
  big24FinalistSound,
  gamescomLatam24Gold,
  finalistLaurel2024,
  perifaconWhite,
  ecraSelection,
  brasilDirectFinalist,
  gamescomLatam,
  overcomeOfficial,
  sbgamesBestAudio,
  indiexMostFun,
  ecraWhite,
  big19Bizzart,
  sbgamesWhite,
  sjeecWhite,
  strWhite,
  big24White,
  dropsWhite,
  gamethonWhite,
  jogatorioWhite,
  sbmSbgames,
  sbm6ecra,
  sbmLeblanc,
  bestGameMusic,
  cartomanteChainsaw,
  cljJogatorio,
  cljPerifacon24,
  cljSbgamesArt,
  finalistaMelhorBr,
  officialSelection5ecra,
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
