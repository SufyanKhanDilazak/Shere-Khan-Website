'use client';
import Image from 'next/image';
import { BIZ, PALETTE } from '@/lib/site';

export default function AboutPage() {
  const directionsUrl = `https://maps.google.com/?q=${encodeURIComponent(
    `${BIZ.name}, ${BIZ.address}`
  )}`;

  const btnStyle =
    'inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-colors active:translate-y-[1px] bg-[#52f1e6] text-white hover:bg-[#3eddd3]';

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

          {/* ✅ keep this heading white */}
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
              className={btnStyle}
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
            style={{ color: PALETTE.orange }}
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

          {/* riksha1.jpg */}
          <div className="mt-5 flex items-center justify-center md:justify-start">
            <figure className="relative w-full max-w-[200px] aspect-[4/5]">
              <Image
                src="/riksha1.jpg"
                alt="Riksha aesthetic"
                fill
                className="rounded-xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
                sizes="(max-width: 640px) 180px, 200px"
                priority
              />
            </figure>
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
              style={{ color: PALETTE.orange }}
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
        <h2 className="text-xl font-extrabold mb-1" style={{ color: PALETTE.orange }}>
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
