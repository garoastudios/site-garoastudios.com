import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Eagerly import all screenshot images
const screenshotModules = import.meta.glob('/src/assets/screenshots/*.jpg', { eager: true, import: 'default' }) as Record<string, string>;
const screenshots = Object.values(screenshotModules);

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const AUTO_INTERVAL = 3000;
const PAUSE_AFTER_INTERACTION = 10000;

export default function HeroSection() {
  const [order] = useState(() => shuffleArray(screenshots));
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);

  const advance = useCallback((dir: 1 | -1) => {
    setCurrent(prev => (prev + dir + order.length) % order.length);
  }, [order.length]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      advance(1);
    }, AUTO_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, advance]);

  const handleManual = (dir: 1 | -1) => {
    advance(dir);
    setPaused(true);
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => setPaused(false), PAUSE_AFTER_INTERACTION);
  };

  return (
    <section id="hero" className="snap-section relative flex items-center justify-center overflow-hidden bg-background">
      {/* Images */}
      {order.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Arrows */}
      <button
        onClick={() => handleManual(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => handleManual(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/70 transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {order.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); handleManual(1); setCurrent(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-accent w-6' : 'bg-foreground/40'}`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
