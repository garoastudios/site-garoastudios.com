import { useState } from 'react';
import { useLocale } from '@/i18n/useLocale';
import { toast } from 'sonner';

export default function ContactSection() {
  const { t } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const mailtoUrl = `mailto:contact@garoastudios.com?subject=${encodeURIComponent(
        `[Website] ${form.subject}`
      )}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      )}`;
      window.open(mailtoUrl, '_blank');
      toast.success(t.contact.success);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error(t.contact.error);
    }
  };

  return (
    <section id="contact" className="snap-section flex flex-col items-center md:justify-center px-4 pt-7 pb-14">
      <div className="max-w-xl mx-auto w-full">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-foreground mb-10 text-center">
          {t.contact.heading}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder={t.contact.name}
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="email"
            placeholder={t.contact.email}
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <input
            type="text"
            placeholder={t.contact.subject}
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <textarea
            placeholder={t.contact.message}
            required
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-card border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <button
            type="submit"
            className="hover-grow bg-accent text-accent-foreground font-display text-lg py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            {t.contact.send}
          </button>
        </form>
      </div>
    </section>
  );
}
