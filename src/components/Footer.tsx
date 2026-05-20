import { useLocale } from '@/i18n/useLocale';
import acjogosLogo from '@/assets/acjogos-rj.png';

export default function Footer() {
  const { t } = useLocale();

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground">
            {t.footer.trademark}
          </p>
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
    </footer>
  );
}
