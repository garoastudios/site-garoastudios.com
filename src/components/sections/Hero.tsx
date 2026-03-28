import { useLocale } from '@/i18n/useLocale';

export default function HeroSection() {
  const { t } = useLocale();

  return (
    <section id="hero" className="snap-section relative flex items-end justify-center pb-16 px-4 overflow-hidden">
      {/* Gradient background mimicking the dark space scene */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--accent)/0.08),transparent_70%)]" />

      {/* Dialogue box */}
      <div className="relative z-10 w-full max-w-2xl">
        <div className="bg-card/90 backdrop-blur-sm border border-border rounded-lg p-6">
          <p className="text-accent font-display text-sm mb-2">{t.hero.speaker}</p>
          <p className="text-foreground/90 text-base leading-relaxed">
            {t.hero.dialogue}
          </p>
        </div>
      </div>
    </section>
  );
}
