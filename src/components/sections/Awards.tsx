import { useLocale } from '@/i18n/useLocale';

export default function AwardsSection() {
  const { t } = useLocale();

  const awards = [
    'Official Selection 2023',
    'Panorama Brasil Festival',
    'SBGames Exhibitor',
    'Perifacon 2024',
    'Gramado',
    'Jogatorio Arts Festival 2024',
    'Gamescom Latam 2021',
    'Gamer Perifa',
  ];

  return (
    <section className="snap-section flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto w-full text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10">
          {t.awards.heading}
        </h2>

        {/* Award badges as styled cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {awards.map((award) => (
            <div
              key={award}
              className="bg-card border border-border rounded-lg px-6 py-4 text-foreground font-display text-sm"
            >
              {award}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
