import { useLocale } from '@/i18n/useLocale';
import acjogosLogo from '@/assets/acjogos-rj.png';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-background/80 backdrop-blur-md border-t border-border py-8">
    <footer className="bg-background/80 backdrop-blur-md border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {t.footer.trademark}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t.footer.affiliateOf}
            </span>
            <a
              href="https://rj.acjogos.com.br/?utm_source=garoastudios.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ACJOGOS-RJ"
              className="hover-grow inline-block"
            >
              <img src={acjogosLogo} alt="ACJOGOS-RJ" className="h-6 w-auto" />
            </a>
          </div>
        </div>
      </div>
    </footer>
        </div>
      </div>
    </footer>
  );
}
