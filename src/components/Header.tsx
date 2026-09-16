import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLocale } from '@/i18n/useLocale';
import { LOCALE_ORDER, LOCALE_LABELS } from '@/i18n/config';
import { useOpenPostings } from '@/hooks/use-open-postings';
import garoaLogoIcon from '@/assets/logos/garoa_logo_icon.png';
import garoaLogoHorizontal from '@/assets/logos/garoa_logo_horizontal.png';

export default function Header() {
  const { locale, t, getLogo, switchLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isLandingPage = location.pathname === `/${locale}` || location.pathname === `/${locale}/`;
  const { data: openPostings } = useOpenPostings();
  const hasOpenJobs = (openPostings?.length ?? 0) > 0;

  const anchorHref = (hash: string) => isLandingPage ? `#${hash}` : `/${locale}#${hash}`;

  const navLinks = [
    { id: 'games', label: t.nav.games, href: isLandingPage ? anchorHref('games') : `/${locale}/games`, isAnchor: isLandingPage },
    { id: 'about', label: t.nav.aboutUs, href: anchorHref('about'), isAnchor: true },
    { id: 'press', label: t.nav.press, href: `/${locale}/press`, isAnchor: false },
    { id: 'jobs', label: t.nav.jobs, href: `/${locale}/jobs`, isAnchor: false },
    { id: 'links', label: t.nav.links, href: `/${locale}/links`, isAnchor: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          {/* Desktop logo: icon version */}
          <Link to={`/${locale}`} className="hidden lg:block flex-shrink-0 w-[72px]">
            <img src={garoaLogoIcon} alt="Garoa Studios" className="h-[72px] rounded-b-lg" />
          </Link>
          {/* Mobile/Tablet logo: horizontal version */}
          <Link to={`/${locale}`} className="lg:hidden flex-shrink-0">
            <img src={garoaLogoHorizontal} alt="Garoa Studios" className="h-[36px] w-auto" />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const showBadge = link.id === 'jobs' && hasOpenJobs;
            const badge = showBadge ? (
              <span className="absolute -top-1.5 -right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-none">
                !
              </span>
            ) : null;
            return link.isAnchor && isLandingPage ? (
              <a
                key={link.id}
                href={link.href}
                className="relative hover-grow font-display text-sm tracking-wide text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}{badge}
              </a>
            ) : (
              <Link
                key={link.id}
                to={link.href}
                className="relative hover-grow font-display text-sm tracking-wide text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}{badge}
              </Link>
            );
          })}
        </nav>

        {/* Desktop language switcher */}
        <div className="hidden lg:flex items-center gap-1">
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

        {/* Mobile/Tablet hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile/Tablet shelf menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-b border-border">
          {/* Language selectors */}
          <div className="flex items-center gap-1 px-4 pt-4 pb-2">
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


          {/* Navigation links */}
          <nav className="flex flex-col px-4 pb-4 gap-3">
            {navLinks.map((link) => {
              const showBadge = link.id === 'jobs' && hasOpenJobs;
              const badge = showBadge ? (
                <span className="absolute -top-1 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px] font-bold leading-none">
                  !
                </span>
              ) : null;
              return link.isAnchor && isLandingPage ? (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative hover-grow inline-block origin-left self-start font-display text-base text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.label}{badge}
                </a>
              ) : (
                <Link
                  key={link.id}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="relative hover-grow inline-block origin-left self-start font-display text-base text-foreground/80 hover:text-accent transition-colors"
                >
                  {link.label}{badge}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
