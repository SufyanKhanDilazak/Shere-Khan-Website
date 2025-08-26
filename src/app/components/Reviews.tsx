// components/Reviews.tsx
'use client';

import { memo, useCallback } from 'react';
import Script from 'next/script';
import { BIZ, PALETTE } from '@/lib/site'; // ✅ import PALETTE for brand colors

type ElfsightWindow = Window & {
  elfsight?: { refresh?: () => void };
  __ELFSIGHT_LOADED__?: boolean;
};

const WIDGET_ID =
  process.env.NEXT_PUBLIC_ELFSIGHT_WIDGET_ID ??
  '1c6c2d3b-b4e1-4084-b1bf-95b3610e487a';

export const Reviews = memo(function Reviews() {
  const handleLoad = useCallback(() => {
    try {
      (window as ElfsightWindow).__ELFSIGHT_LOADED__ = true;
      (window as ElfsightWindow).elfsight?.refresh?.();
    } catch {
      // no-op
    }
  }, []);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="mx-auto w-full max-w-7xl px-4 md:px-6 py-14"
    >
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
        onReady={handleLoad}
      />

      <h2
        id="reviews-heading"
        className="mb-2 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold"
        style={{ color: PALETTE.orange }} // ✅ orange like logo
      >
        Guest Reviews
      </h2>

      {(BIZ.gmbRating ?? 0) > 0 && (
        <p
          className="mb-6 text-center text-sm"
          style={{ color: PALETTE.orange }} // ✅ also orange
        >
          ⭐ {BIZ.gmbRating.toFixed(1)} based on{' '}
          {Intl.NumberFormat().format(BIZ.gmbReviews ?? 0)} Google reviews
        </p>
      )}

      <div
        className={`elfsight-app-${WIDGET_ID}`}
        data-elfsight-app-lazy
        aria-label="Google reviews widget"
      />

      <p className="mt-4 text-center text-xs text-neutral-600">
        Powered by Google Reviews via Elfsight.
      </p>
    </section>
  );
});
