import { useEffect } from 'react';
import { useLocale } from '@/i18n/useLocale';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionIndicator from '@/components/SectionIndicator';
import HeroSection from '@/components/sections/Hero';
import StatsSection from '@/components/sections/Stats';
import GamesSection from '@/components/sections/Games';
import AboutSection from '@/components/sections/About';
import AwardsSection from '@/components/sections/Awards';
import ContactSection from '@/components/sections/Contact';

export default function LandingPage() {
  const { locale, t } = useLocale();

  useEffect(() => {
    document.title = `Garoa Studios — ${t.stats.heading}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.stats.subtitle);
  }, [locale, t]);

  return (
    <div className="snap-container">
      <Header />
      <SectionIndicator />
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <GamesSection />
        <AboutSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
