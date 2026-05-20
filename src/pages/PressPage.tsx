import { useEffect } from 'react';
import { useLocale } from '@/i18n/useLocale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PressPage() {
  const { t } = useLocale();

  useEffect(() => {
    document.title = `${t.press.heading} — Garoa Studios`;
  }, [t]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="pt-16 flex-1">

        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground mb-4">
            {t.press.heading}
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            {t.press.subtitle}
          </p>

          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <h2 className="font-display text-2xl text-accent mb-4">{t.press.pressKit}</h2>
            <p className="text-muted-foreground mb-6">{t.press.pressKitDesc}</p>
            <p className="text-foreground/70 italic text-sm">{t.press.comingSoon}</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="font-display text-2xl text-accent mb-4">{t.press.mediaMentions}</h2>
            <p className="text-foreground/70 italic text-sm">{t.press.comingSoon}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
