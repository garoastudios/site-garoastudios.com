import { useLocale } from '@/i18n/useLocale';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

export default function ContactSection() {
  const { t } = useLocale();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('contato@garoastudios.com');
      toast.success(t.contact.success);
    } catch {
      toast.error(t.contact.error);
    }
  };

  return (
    <section id="contact" className="snap-section-auto flex flex-col items-center px-4 pt-7 pb-14">
      <div className="max-w-xl mx-auto w-full text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10">
          {t.contact.heading}
        </h2>

        <div className="flex items-center justify-center gap-3">
          <a
            href="mailto:contato@garoastudios.com"
            className="text-lg sm:text-xl text-foreground hover:text-accent transition-colors"
          >
            contato@garoastudios.com
          </a>
          <button
            onClick={handleCopy}
            className="hover-grow p-2 rounded-lg bg-card border border-border text-foreground hover:text-accent transition-colors"
            aria-label="Copy email"
          >
            <Copy size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
