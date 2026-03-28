import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Stats' },
  { id: 'games', label: 'Games' },
  { id: 'about', label: 'About' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionIndicator() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;

    const handleScroll = () => {
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;

      let closest = 0;
      let minDistance = Infinity;
      sections.forEach((section, i) => {
        const distance = Math.abs(section.offsetTop - scrollTop - viewportHeight * 0.3);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      });
      setActive(closest);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2 items-center">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => scrollTo(section.id)}
          aria-label={section.label}
          className={`rounded-full transition-all duration-300 ${
            i === active
              ? 'w-2 h-6 bg-accent'
              : 'w-2 h-2 bg-foreground/30 hover:bg-foreground/50'
          }`}
        />
      ))}
    </div>
  );
}
