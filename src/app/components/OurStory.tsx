// components/OurStory.tsx
'use client';

import { memo, type ReactElement } from 'react';
import Image from 'next/image';
import { BIZ } from '@/lib/site';

export const OurStory = memo(function OurStory(): ReactElement {
  return (
    <section
      aria-labelledby="our-story-heading"
      className="mx-auto w-full max-w-7xl px-4 md:px-6 py-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <h2
            id="our-story-heading"
            className="text-2xl sm:text-3xl font-extrabold text-[#DC2626]"
          >
            Our Story
          </h2>

          <p className="mt-4 leading-relaxed text-neutral-800 text-sm sm:text-base">
            From a humble tandoor to a lively kitchen, <strong>{BIZ.name}</strong> celebrates bold spice
            and slow-cooked comfort. We grind spices in-house, simmer gravies slow, and glaze every kebab
            right off the skewer. Whether it’s biryani for the weekend or a quick naanwitch, we serve
            Altrincham with warmth and speed.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-neutral-900">
            <li>• Family recipes, modern service</li>
            <li>• Halal ingredients</li>
            <li>• Pickup &amp; delivery</li>
            <li>• Fresh chutneys &amp; marinades</li>
          </ul>

          <address className="mt-5 not-italic text-xs text-neutral-500">
            {BIZ.address}
          </address>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 flex justify-center">
          {/* Change aspect ratio here to control height */}
          <figure className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
            <Image
              src="/perry1.jpg"
              alt="Shere Khan Kitchen interior"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="rounded-2xl border-2 border-[#F15A24] object-cover shadow-lg"
              priority={false}
            />
          </figure>
        </div>
      </div>
    </section>
  );
});
