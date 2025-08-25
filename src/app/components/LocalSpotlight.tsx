'use client';

import { memo, useEffect } from 'react';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

const SPOTLIGHT = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1600&q=80&auto=format&fit=crop',
];

export const LocalSpotlight = memo(function LocalSpotlight() {
  const controls = useAnimation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return; // respect OS reduced-motion
    controls.start({
      x: ['0%', '-50%'],
      transition: { duration: 26, ease: 'linear', repeat: Infinity },
    });
    // No cleanup needed; framer handles it
  }, [controls, reduce]);

  const onEnter = () => {
    if (!reduce) controls.stop();
  };
  const onLeave = () => {
    if (!reduce)
      controls.start({
        x: ['0%', '-50%'],
        transition: { duration: 26, ease: 'linear', repeat: Infinity },
      });
  };

  // Duplicate the array so the marquee loops seamlessly
  const images = [...SPOTLIGHT, ...SPOTLIGHT];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8">
      <h3 className="mb-3 text-center text-xl sm:text-2xl font-extrabold text-[#DC2626]">
        Local Spotlight · Altrincham
      </h3>

      <div
        className="relative mx-auto w-full overflow-hidden border-y border-[#7A1D1D] bg-white/70 py-2 shadow"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        aria-label="Local scenery carousel, auto-scrolling horizontally"
      >
        {/* subtle edge fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white/70 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white/70 to-transparent" />

        <motion.div className="flex gap-2 px-2" animate={controls} initial={{ x: 0 }}>
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-28 w-44 sm:h-36 sm:w-64 shrink-0 overflow-hidden rounded-xl"
            >
              <Image
                src={src}
                alt="Altrincham highlight"
                fill
                sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 320px"
                className="object-cover"
                priority={false}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});
