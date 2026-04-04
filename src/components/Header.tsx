import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import { LOCALE_ORDER, LOCALE_LABELS } from '@/i18n/config';
import garoaLogoIcon from '@/assets/logos/garoa_logo_icon.png';
import { SteamIcon, ItchIcon, NuuvemIcon } from '@/components/PlatformIcons';

const headerStores = [
  { Icon: SteamIcon, url: 'https://store.steampowered.com/publisher/garoastudios', label: 'Steam' },
  { Icon: ItchIcon, url: 'https://garoa.itch.io/', label: 'itch.io' },
  { Icon: NuuvemIcon, url: 'https://www.nuuvem.com/br-pt/catalog/publishers/garoa-studios', label: 'Nuuvem' },
];

export default function Header() {
  const { locale, t, getLogo, switchLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === `/${locale}` || location.pathname === `/${locale}/`;

  // If on landing page, use anchor links. Otherwise, navigate to landing page with hash.
  const anchorHref = (hash: string) => isLandingPage ? `#${hash}` : `/${locale}#${hash}`;

  const navLinks = [
    { label: t.nav.games, href: anchorHref('games'), isAnchor: true },
    { label: t.nav.aboutUs, href: anchorHref('about'), isAnchor: true },
    { label: t.nav.press, href: `/${locale}/press`, isAnchor: false },
    { label: t.nav.jobs, href: `/${locale}/jobs`, isAnchor: false },
    { label: t.nav.contact, href: anchorHref('contact'), isAnchor: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <Link to={`/${locale}`} className="flex-shrink-0 w-[60px] sm:w-[72px]">
            <img src={garoaLogoIcon} alt="Garoa Studios" className="h-[60px] sm:h-[72px] rounded-b-lg" />
          </Link>
          <div className="hidden sm:flex items-center gap-2">
            {headerStores.map(({ Icon, url, label }) => (
              <a
                key={label}
                href={`${url}?utm_source=garoastudios.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover-grow text-muted-foreground hover:text-accent transition-colors"
              >
                <Icon className={label === 'Nuuvem' ? 'w-6 h-6' : 'w-5 h-5'} />
              </a>
            ))}
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            link.isAnchor && isLandingPage ? (
              <a
                key={link.label}
                href={link.href}
                className="hover-grow font-display text-sm tracking-wide text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="hover-grow font-display text-sm tracking-wide text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* Language switcher */}
        <div className="hidden md:flex items-center gap-1">
          {LOCALE_ORDER.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`hover-grow px-2 py-1 text-xs font-bold rounded transition-colors ${
                loc === locale
                  ? 'bg-accent text-accent-foreground'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {LOCALE_LABELS[loc]}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navLinks.map((link) => (
              link.isAnchor && isLandingPage ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover-grow font-display text-base text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="hover-grow font-display text-base text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
          <div className="flex items-center gap-1 px-4 pb-4">
            {LOCALE_ORDER.map((loc) => (
              <button
                key={loc}
                onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                className={`hover-grow px-2 py-1 text-xs font-bold rounded transition-colors ${
                  loc === locale
                    ? 'bg-accent text-accent-foreground'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
