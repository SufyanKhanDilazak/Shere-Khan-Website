// app/contact/page.tsx
'use client';

import Image from 'next/image';
import { BIZ, PALETTE } from '@/lib/site';

type BizOptional = typeof BIZ & {
  phone?: string;
  tagline?: string;
  gmbRating?: number;
  gmbReviews?: number;
};

const biz: BizOptional = BIZ;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@sherekhan.example';

export default function ContactPage() {
  const PHONE: string | undefined = biz.phone;
  const telHref: string | undefined = PHONE
    ? `tel:${PHONE.replace(/[()\s-]/g, '')}`
    : undefined;

  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${biz.name}, ${biz.address}`
  )}`;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 md:px-6">
      {/* push below fixed header */}
      <div className="mt-24" />

      {/* ===== Hero ===== */}
      <section
        className="relative overflow-hidden rounded-3xl border-2"
        style={{ borderColor: PALETTE.maroon }}
        aria-label={`Contact ${biz.name}`}
      >
        {/* background */}
        <div className="absolute inset-0">
          <Image
            src="/shere.png"
            alt={`${biz.name} ambience`}
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, 1200px"
          />
        </div>

        {/* content */}
        <div className="relative z-10 px-6 sm:px-10 py-14 sm:py-16 text-center">
          <span
            className="mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] border"
            style={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,.28)',
              background: 'rgba(0,0,0,.35)',
            }}
          >
            Say hello
          </span>

          {/* heading kept white */}
          <h1 className="mt-3 text-white font-extrabold leading-[1.05] text-[clamp(30px,5.5vw,60px)] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            Contact {biz.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/92 text-sm sm:text-base leading-relaxed">
            We’re here for quick questions, catering enquiries, and anything in
            between{biz.tagline ? ` — ${biz.tagline}` : ''}.
          </p>

          {/* actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-colors bg-[#52f1e6] text-white hover:bg-[#3eddd3]"
            >
              📍 Get Directions
            </a>

            {telHref && (
              <a
                href={telHref}
                className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-colors bg-[#F15A24] text-white hover:bg-[#d54d1f]"
              >
                📞 Call Us
              </a>
            )}

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-colors bg-black/50 text-white hover:bg-black/70"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ===== Contact details ===== */}
      <section
        className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 bg-white p-6 text-center shadow"
        style={{ borderColor: PALETTE.orange }}
        aria-labelledby="contact-details-heading"
      >
        <h2
          id="contact-details-heading"
          className="text-xl font-extrabold"
          style={{ color: PALETTE.orange }}
        >
          Find Us
        </h2>

        <ul className="mt-3 space-y-2 text-sm text-neutral-800">
          <li>
            <strong>Address:</strong> {biz.address}
          </li>

          {PHONE && (
            <li>
              <strong>Phone:</strong>{' '}
              {telHref ? (
                <a className="underline" style={{ color: PALETTE.maroon }} href={telHref}>
                  {PHONE}
                </a>
              ) : (
                PHONE
              )}
            </li>
          )}

          <li>
            <strong>Email:</strong>{' '}
            <a
              className="underline"
              style={{ color: PALETTE.maroon }}
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
          </li>
        </ul>

        {typeof biz.gmbRating === 'number' && (
          <p className="mt-4 text-sm text-neutral-700">
            ⭐ {biz.gmbRating.toFixed(1)}
            {typeof biz.gmbReviews === 'number' && (
              <> · {Intl.NumberFormat('en-GB').format(biz.gmbReviews)} reviews</>
            )}
          </p>
        )}

        {/* Subtle riksha accent under the card content */}
        <div className="mt-6 flex justify-center">
          <figure className="relative w-40 sm:w-48 md:w-56 aspect-[3/4] rounded-2xl overflow-hidden bg-white/10 shadow-[0_18px_36px_rgba(0,0,0,0.12)]">
            <Image
              src="/riksha3.jpg"
              alt="Riksha accent"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 224px"
              priority={false}
            />
            {/* gentle brand glaze (no thick border) */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  `linear-gradient(140deg, ${PALETTE.orange}14, ${PALETTE.maroon}14)`,
                mixBlendMode: 'multiply',
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(0,200,190,0.14)' }}
            />
          </figure>
        </div>
      </section>

      {/* ===== Helpful notes ===== */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.orange }}>
            Parking
          </h3>
          <p className="text-sm text-neutral-800">
            Street parking nearby — check local signs for time limits. A short
            walk from Altrincham town centre.
          </p>
        </article>

        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.orange }}>
            Allergies & Dietary
          </h3>
          <p className="text-sm text-neutral-800">
            Tell us about any allergies when ordering. We’ll guide you to safe,
            delicious choices.
          </p>
        </article>

        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.orange }}>
            Catering & Large Orders
          </h3>
          <p className="text-sm text-neutral-800">
            Planning a group meal? Email us with your date & size and we’ll sort
            a smooth pickup time.
          </p>
        </article>
      </section>

      {/* (Removed the Follow Us section as requested) */}

      <div className="mb-12" />
    </main>
  );
}
