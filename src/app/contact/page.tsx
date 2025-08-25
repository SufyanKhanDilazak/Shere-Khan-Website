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

      {/* ===== Hero (premium, centered) ===== */}
      <section
        className="relative overflow-hidden rounded-3xl border-2"
        style={{ borderColor: PALETTE.maroon }}
        aria-label={`Contact ${biz.name}`}
      >
        {/* background (overlay removed) */}
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

          <h1 className="mt-3 text-white font-extrabold leading-[1.05] text-[clamp(30px,5.5vw,60px)] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            Contact {biz.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/92 text-sm sm:text-base leading-relaxed">
            We’re here for quick questions, catering enquiries, and anything in
            between{biz.tagline ? ` — ${biz.tagline}` : ''}.
          </p>

          {/* actions (no Order Now) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold text-white"
              style={{ borderColor: PALETTE.maroon, background: 'transparent' }}
            >
              📍 Get Directions
            </a>

            {telHref && (
              <a
                href={telHref}
                className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold"
                style={{
                  borderColor: PALETTE.orange,
                  color: '#fff',
                  background: PALETTE.orange,
                }}
              >
                📞 Call Us
              </a>
            )}

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold"
              style={{
                borderColor: 'rgba(255,255,255,0.4)',
                color: '#fff',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </section>

      {/* ===== Contact details (centered card) ===== */}
      <section
        className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 bg-white p-6 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
        style={{ borderColor: PALETTE.orange }}
        aria-labelledby="contact-details-heading"
      >
        <h2
          id="contact-details-heading"
          className="text-xl font-extrabold"
          style={{ color: PALETTE.red }}
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
                <a
                  className="underline"
                  style={{ color: PALETTE.maroon }}
                  href={telHref}
                >
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
              <>
                {' '}
                · {Intl.NumberFormat('en-GB').format(biz.gmbReviews)} reviews
              </>
            )}
          </p>
        )}
      </section>

      {/* ===== Helpful notes (premium, concise) ===== */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.red }}>
            Parking
          </h3>
          <p className="text-sm text-neutral-800">
            Street parking nearby — check local signs for time limits. A short
            walk from Altrincham town centre.
          </p>
        </article>

        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.red }}>
            Allergies & Dietary
          </h3>
          <p className="text-sm text-neutral-800">
            Tell us about any allergies when ordering. We’ll guide you to safe,
            delicious choices.
          </p>
        </article>

        <article
          className="rounded-2xl border-2 bg-white p-5 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-base font-extrabold mb-1" style={{ color: PALETTE.red }}>
            Catering & Large Orders
          </h3>
          <p className="text-sm text-neutral-800">
            Planning a group meal? Email us with your date & size and we’ll sort
            a smooth pickup time.
          </p>
        </article>
      </section>

      {/* ===== Social (full-color icons) ===== */}
      <section
        className="mx-auto mt-10 max-w-3xl rounded-2xl border-2 bg-white p-6 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
        style={{ borderColor: PALETTE.orange }}
        aria-labelledby="social-heading"
      >
        <h3
          id="social-heading"
          className="text-base font-extrabold"
          style={{ color: PALETTE.red }}
        >
          Follow Us
        </h3>

        <div className="mt-4 flex items-center justify-center gap-3">
          {/* Instagram (official gradient) */}
          <a
            href="https://instagram.com/your-handle"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="inline-grid h-11 w-11 place-items-center rounded-full border bg-white shadow-md"
            style={{ borderColor: `${PALETTE.maroon}33` }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <defs>
                <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F58529" />
                  <stop offset="50%" stopColor="#DD2A7B" />
                  <stop offset="100%" stopColor="#8134AF" />
                </linearGradient>
              </defs>
              <path
                fill="url(#ig)"
                d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6-1a1 1 0 100 2 1 1 0 000-2z"
              />
            </svg>
          </a>

          {/* Facebook (blue) */}
          <a
            href="https://facebook.com/your-handle"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="inline-grid h-11 w-11 place-items-center rounded-full border bg-white shadow-md"
            style={{ borderColor: `${PALETTE.maroon}33` }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
              <path
                fill="#fff"
                d="M15 8h-1.6c-.5 0-.9.4-.9.9V10H15l-.3 2h-1.9v6h-2.2v-6H8.8v-2h1.8V8.8A2.8 2.8 0 0 1 13.4 6H15v2z"
              />
            </svg>
          </a>

          {/* TikTok (brand colors) */}
          <a
            href="https://tiktok.com/@your-handle"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
            className="inline-grid h-11 w-11 place-items-center rounded-full border bg-white shadow-md"
            style={{ borderColor: `${PALETTE.maroon}33` }}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
              {/* black note */}
              <path
                fill="#121212"
                d="M13 3v11.3a3.5 3.5 0 1 1-2.6-3.4V8.2c-3.7-.2-6.6 2.6-6.6 6.1 0 3.5 2.9 6.2 6.6 6.2 3.6 0 6.6-2.7 6.6-6.1V9.6c1 .8 2.3 1.3 3.7 1.4V8.6c-1.8-.2-3.5-1.1-4.6-2.4C14.5 5.3 13.9 4.2 13.7 3H13z"
              />
              {/* cyan accent */}
              <path
                fill="#25F4EE"
                d="M13 3v3.2c.2 1.2.8 2.3 1.6 3.2 1.1 1.3 2.8 2.2 4.6 2.4V9.6c-1.4-.1-2.7-.6-3.7-1.4V7c-.9-.7-1.6-1.7-1.9-2.8A9 9 0 0 1 13 3z"
              />
              {/* pink accent */}
              <path
                fill="#FE2C55"
                d="M10.4 10.9v2c-1.5-.4-3.1.4-3.6 2-0.5 1.6.4 3.3 2 3.8 1.6.5 3.3-.4 3.8-2 .1-.3.2-.6.2-.9V6.6l4.6 1.2V5.2l-6.6-1.7v9.6c0 .3-.1.6-.2.9-.4 1.1-1.4 1.9-2.6 2"
              />
            </svg>
          </a>
        </div>
      </section>

      <div className="mb-12" />
    </main>
  );
}
