// components/Countup.tsx
'use client';

import { memo, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { BIZ } from '@/lib/site';

// Lazy load react-countup only on client
const CountUp = dynamic(() => import('react-countup'), { ssr: false });

type StatItem = Readonly<{
  label: 'Dishes Served' | 'Satisfied Customers' | 'Avg. Rating';
  end: number;
  suffix?: string;
  decimals?: number;
}>;

export const Countup = memo(function Countup() {
  const sectionRef = useRef<HTMLElement>(null);
  const [fire, setFire] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setFire(true);
            io.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    setFire(true);
  }, []);

  const rating = Number(BIZ.gmbRating ?? 0);
  const reviews = Number(BIZ.gmbReviews ?? 0);

  const items: StatItem[] = [
    { label: 'Dishes Served', end: 9677, suffix: '+' },
    { label: 'Satisfied Customers', end: reviews },
    { label: 'Avg. Rating', end: rating, decimals: 1 },
  ];

  return (
    <section
      id="countup"
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl px-3 sm:px-6 py-10 sm:py-14"
      aria-labelledby="countup-heading"
    >
      <h2 id="countup-heading" className="sr-only">
        Store Highlights
      </h2>

      <div className="grid grid-cols-3 rounded-xl border border-[#F15A24]/70 bg-white shadow-md overflow-hidden">
        {items.map((s, i) => {
          const isRating = s.label === 'Avg. Rating';
          return (
            <div
              key={s.label}
              className="relative flex flex-col items-center justify-center py-4 sm:py-6"
            >
              {i < items.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[#F15A24]/25 sm:block" />
              )}

              <span
                className="text-lg sm:text-2xl font-extrabold text-[#DC2626]"
                aria-live="polite"
                aria-atomic="true"
              >
                {isRating ? (
                  fire ? rating.toFixed(s.decimals ?? 0) : (0).toFixed(s.decimals ?? 0)
                ) : fire ? (
                  <CountUp
                    end={s.end}
                    duration={2.5} // faster
                    separator=","
                    suffix={s.suffix}
                  />
                ) : (
                  `0${s.suffix ?? ''}`
                )}
              </span>

              <span className="text-[9px] sm:text-xs text-neutral-700 tracking-wide">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
});
