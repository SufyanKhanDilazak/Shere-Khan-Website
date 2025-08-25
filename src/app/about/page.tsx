// app/about/page.tsx
'use client';
import Image from 'next/image';
import { BIZ, PALETTE } from '@/lib/site';

export default function AboutPage() {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${BIZ.name}, ${BIZ.address}`
  )}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 md:px-6">
      {/* push below fixed header */}
      <div className="mt-24" />

      {/* ============ HERO ============ */}
      <section
        className="relative overflow-hidden rounded-3xl border-2"
        style={{ borderColor: PALETTE.maroon }}
        aria-label={`About ${BIZ.name}`}
      >
        {/* background */}
        <div className="absolute inset-0">
          <Image
            src="/brick.jpg"
            alt={`${BIZ.name} ambience`}
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/60 to-black/80" />
        </div>

        <div className="relative z-10 px-6 sm:px-10 py-14 sm:py-16 text-center">
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] border"
            style={{
              color: '#fff',
              borderColor: 'rgba(255,255,255,.28)',
              background: 'rgba(0,0,0,.35)',
            }}
          >
            Legendary • Reimagined
          </div>

          <h1 className="mt-3 text-white font-extrabold leading-[1.05] text-[clamp(30px,5.5vw,60px)] drop-shadow-[0_8px_28px_rgba(0,0,0,0.45)]">
            About {BIZ.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-white/92 text-sm sm:text-base leading-relaxed">
            The tiger is back in Altrincham. Speciality kebabs, vibrant grills
            and biryanis — spices ground in-house, gravies simmered slow, and
            naan kissed by the tandoor.
          </p>

          <div className="mt-6 flex items-center justify-center">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold text-white"
              style={{
                borderColor: PALETTE.maroon,
                background: 'transparent',
                backdropFilter: 'blur(2px)',
              }}
            >
              📍 Find Us
            </a>
          </div>
        </div>
      </section>

      {/* ============ STORY + SOCIAL ============ */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="order-2 md:order-1">
          <h2
            className="text-center md:text-left text-2xl sm:text-3xl font-extrabold"
            style={{ color: PALETTE.red }}
          >
            Our Story
          </h2>

          <p className="mt-4 leading-relaxed text-neutral-800 text-sm sm:text-base text-center md:text-left">
            From a humble tandoor to a lively kitchen,{' '}
            <strong>{BIZ.name}</strong> celebrates bold spice and slow-cooked
            comfort. We glaze kebabs straight off the skewer and layer biryanis
            with saffron basmati the traditional way — comfort you can crave,
            served fast without compromise.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-neutral-900 max-w-lg mx-auto md:mx-0">
            <li>• Family recipes, modern service</li>
            <li>• Halal ingredients</li>
            <li>• Pickup &amp; delivery</li>
            <li>• House chutneys &amp; marinades</li>
          </ul>

          {/* full-color brand icons */}
          <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
            {/* Instagram */}
            <a
              href="https://instagram.com/your-handle"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-grid h-11 w-11 place-items-center rounded-full border bg-white shadow-md"
              style={{ borderColor: `${PALETTE.maroon}33` }}
            >
              {/* SVG code unchanged */}
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

            {/* Facebook */}
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

            {/* TikTok */}
            <a
              href="https://tiktok.com/@your-handle"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="inline-grid h-11 w-11 place-items-center rounded-full border bg-white shadow-md"
              style={{ borderColor: `${PALETTE.maroon}33` }}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                <path
                  fill="#121212"
                  d="M13 3v11.3a3.5 3.5 0 1 1-2.6-3.4V8.2c-3.7-.2-6.6 2.6-6.6 6.1 0 3.5 2.9 6.2 6.6 6.2 3.6 0 6.6-2.7 6.6-6.1V9.6c1 .8 2.3 1.3 3.7 1.4V8.6c-1.8-.2-3.5-1.1-4.6-2.4C14.5 5.3 13.9 4.2 13.7 3H13z"
                />
                <path
                  fill="#25F4EE"
                  d="M13 3v3.2c.2 1.2.8 2.3 1.6 3.2 1.1 1.3 2.8 2.2 4.6 2.4V9.6c-1.4-.1-2.7-.6-3.7-1.4V7c-.9-.7-1.6-1.7-1.9-2.8A9 9 0 0 1 13 3z"
                />
                <path
                  fill="#FE2C55"
                  d="M10.4 10.9v2c-1.5-.4-3.1.4-3.6 2-0.5 1.6.4 3.3 2 3.8 1.6.5 3.3-.4 3.8-2 .1-.3.2-.6.2-.9V6.6l4.6 1.2V5.2l-6.6-1.7v9.6c0 .3-.1.6-.2.9-.4 1.1-1.4 1.9-2.6 2"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* image */}
        <div className="order-1 md:order-2 flex justify-center">
          <figure className="relative w-full max-w-sm sm:max-w-md aspect-[3/4]">
            <Image
              src="/perry1.jpg"
              alt="Shere Khan Kitchen — grill & spice"
              fill
              className="rounded-2xl border-2 object-cover shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
              style={{ borderColor: PALETTE.orange }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </figure>
        </div>
      </section>

      {/* ============ HIGHLIGHTS ============ */}
      <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: 'Naanwitch', desc: 'Our cult-favourite — fresh, saucy, toasted.' },
          { title: 'Dum Biryani', desc: 'Aromatic, sealed, and slow-cooked.' },
          { title: 'Mixed Grill', desc: 'Seekh, tikka, prawns & veggie tandoor.' },
          { title: 'House Curries', desc: 'Makhani, rogan josh, korma & more.' },
        ].map((it) => (
          <article
            key={it.title}
            className="rounded-2xl border-2 bg-white p-5 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
            style={{ borderColor: PALETTE.orange }}
          >
            <h3
              className="text-base font-extrabold mb-1"
              style={{ color: PALETTE.red }}
            >
              {it.title}
            </h3>
            <p className="text-sm text-neutral-800">{it.desc}</p>
          </article>
        ))}
      </section>

      {/* ============ REVIEWS SNAPSHOT ============ */}
      <section
        className="mt-12 rounded-2xl border-2 bg-white p-6 text-center shadow-[0_22px_44px_rgba(0,0,0,0.12)]"
        style={{ borderColor: PALETTE.orange }}
      >
        <h2 className="text-xl font-extrabold mb-1" style={{ color: PALETTE.red }}>
          What guests say
        </h2>
        <p className="text-xs text-neutral-600 mb-3">
          Over {BIZ.gmbReviews?.toLocaleString('en-GB') ?? '5,017'} Google
          reviews and counting.
        </p>
        <ul className="text-sm text-neutral-800 space-y-3 max-w-2xl mx-auto">
          <li>
            <strong>Kiren:</strong> “The decor is stylish and welcoming, the
            service top-notch, and the food?”
          </li>
          <li>
            <strong>Jonathan Hanson:</strong> “From lamb, chicken, naans, rice,
            onion bhaji and my first naanwitch.”
          </li>
          <li>
            <strong>Wendy:</strong> “Brilliant new little takeaway with super
            friendly staff.”
          </li>
        </ul>
      </section>

      <div className="mb-12" />
    </main>
  );
}
