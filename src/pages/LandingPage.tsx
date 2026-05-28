import { useLocale } from '@/i18n/useLocale';
import SEO from '@/components/SEO';
import { SEO as SEO_DATA, SITE_URL } from '@/i18n/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import SectionIndicator from '@/components/SectionIndicator';
import Reveal from '@/components/Reveal';
import HeroSection from '@/components/sections/Hero';
import StatsSection from '@/components/sections/Stats';
import GamesSection from '@/components/sections/Games';
import AboutSection from '@/components/sections/About';
import AwardsSection from '@/components/sections/Awards';
import ContactSection from '@/components/sections/Contact';


export default function LandingPage() {
  const { locale } = useLocale();
  const seo = SEO_DATA[locale];

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/${locale}#collection`,
    url: `${SITE_URL}/${locale}`,
    name: seo.home.title,
    description: seo.home.description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
  };

  return (
    <div className="snap-container">
      <SEO
        locale={locale}
        title={seo.home.title}
        description={seo.home.description}
        path=""
        jsonLd={collectionJsonLd}
      />
      <Header />
      <SectionIndicator />
      <main className="pt-16">
        <HeroSection />
        <StatsSection />
        <GamesSection />
        <AboutSection />
        <ContactSection />
        <AwardsSection />

      </main>
      <Footer />
    </div>
  );
}
