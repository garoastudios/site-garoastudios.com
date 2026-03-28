import { useLocale } from '@/i18n/useLocale';
import { Sparkles, Trophy, ThumbsUp } from 'lucide-react';

export default function StatsSection() {
  const { t } = useLocale();

  const stats = [
    { icon: <Sparkles className="w-8 h-8 text-accent" />, label: t.stats.consistentCreation },
    { icon: <Trophy className="w-8 h-8 text-accent" />, label: t.stats.awards },
    { icon: <ThumbsUp className="w-8 h-8 text-accent" />, label: t.stats.positiveRating },
  ];

  return (
    <section className="snap-section flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6">
          {t.stats.heading}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 whitespace-pre-line">
          {t.stats.subtitle}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center gap-3"
            >
              {stat.icon}
              <span className="font-display text-lg text-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
