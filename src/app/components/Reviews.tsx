// components/Reviews.tsx
'use client';

import { memo, useCallback } from 'react';
import Script from 'next/script';
import { BIZ } from '@/lib/site';

type ElfsightWindow = Window & {
  elfsight?: { refresh?: () => void };
  __ELFSIGHT_LOADED__?: boolean;
};

/**
 * If you prefer an env var, set NEXT_PUBLIC_ELFSIGHT_WIDGET_ID in .env
 * Otherwise it falls back to the provided ID.
 */
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
      {/* Load Elfsight platform (safe to include once per app). If you already load it in layout, leave this here—Next dedupes by id. */}
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="afterInteractive"
        onLoad={handleLoad}
        onReady={handleLoad}
      />

      <h2
        id="reviews-heading"
        className="mb-2 text-center text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#DC2626]"
      >
        Guest Reviews
      </h2>

      {/* Optional rating summary from your site.ts */}
      {(BIZ.gmbRating ?? 0) > 0 && (
        <p className="mb-6 text-center text-sm text-neutral-700">
          ⭐ {BIZ.gmbRating.toFixed(1)} based on{' '}
          {Intl.NumberFormat().format(BIZ.gmbReviews ?? 0)} Google reviews
        </p>
      )}

      {/* Widget container — Elfsight finds this by class name */}
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
