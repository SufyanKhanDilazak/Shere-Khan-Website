// components/Countup.tsx
'use client';

import { memo, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { BIZ } from '@/lib/site';

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

  // Fire once when the section enters viewport (~80% from top)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // IntersectionObserver is more efficient than scroll handlers
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setFire(true);
              io.disconnect();
              break;
            }
          }
        },
        { root: null, rootMargin: '0px 0px -20% 0px', threshold: 0.15 }
      );
      io.observe(el);
      return () => io.disconnect();
    }

    // Fallback (old browsers): immediate fire
    setFire(true);
  }, []);

  // Coerce to numbers safely (in case env/config changes later)
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
      className="mx-auto w-full max-w-7xl px-4 md:px-6 py-16"
      aria-labelledby="countup-heading"
    >
      <h2 id="countup-heading" className="sr-only">
        Store Highlights
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 overflow-hidden rounded-2xl border-2 border-[#F15A24] bg-white shadow-2xl">
        {items.map((s, i) => {
          const isRating = s.label === 'Avg. Rating';
          return (
            <div
              key={s.label}
              className="relative flex flex-col items-center justify-center gap-1 p-5 sm:p-6"
            >
              {/* Divider on sm+ except the last */}
              {i < items.length - 1 && (
                <span className="hidden sm:block absolute right-0 top-1/2 h-10 w-px -translate-y-1/2 bg-[#F15A24]/25" />
              )}

              <span
                className="text-2xl sm:text-3xl font-extrabold text-[#DC2626]"
                aria-live="polite"
                aria-atomic="true"
              >
                {isRating ? (
                  fire ? rating.toFixed(s.decimals ?? 0) : (0).toFixed(s.decimals ?? 0)
                ) : fire ? (
                  <CountUp
                    end={s.end}
                    duration={3.5}
                    separator=","
                    suffix={s.suffix}
                  />
                ) : (
                  // initial placeholder mirrors final format
                  `${isFinite(s.end) ? '0' : '0'}${s.suffix ?? ''}`
                )}
              </span>

              <span className="text-[10px] sm:text-xs text-neutral-700">
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
});
