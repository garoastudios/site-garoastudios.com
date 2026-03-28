import { useLocale } from '@/i18n/useLocale';

export default function AboutSection() {
  const { t } = useLocale();

  return (
    <section id="about" className="snap-section flex flex-col justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 text-center">
          {t.about.heading}
        </h2>

        <div className="bg-card border border-border rounded-xl p-8 sm:p-12 mb-12">
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

        {/* Core Values */}
        <h3 className="font-display text-2xl sm:text-3xl text-foreground mb-8 text-center">
          {t.values.heading}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(['transparency', 'community', 'global', 'dataInformed', 'scalable'] as const).map((key) => (
            <div key={key} className="bg-card border border-border rounded-xl p-6">
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
    </section>
  );
}
