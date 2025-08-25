// app/contact/page.tsx
'use client';

import { BIZ, PALETTE } from '@/lib/site';

type BizWithPhone = typeof BIZ & { phone?: string };

// Safely read optional phone (works even if not present in lib/site.ts)
const PHONE: string | undefined = (BIZ as BizWithPhone).phone;

const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'info@sherekhan.example';

export default function ContactPage() {
  const telHref: string | undefined = PHONE
    ? `tel:${PHONE.replace(/[()\s-]/g, '')}`
    : undefined;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10">
      <header className="mb-8 text-center">
        <h1
          className="text-3xl sm:text-4xl font-extrabold"
          style={{ color: PALETTE.red }}
        >
          Contact Us
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-700">
          We’d love to hear from you. {BIZ.tagline}
        </p>
      </header>

      {/* Info + Quick Actions */}
      <section
        className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
        style={{ borderColor: PALETTE.orange }}
      >
        <h2 className="text-xl font-extrabold" style={{ color: PALETTE.red }}>
          {BIZ.name}
        </h2>

        <ul className="mt-3 space-y-2 text-sm text-neutral-800">
          <li>
            <strong>Address:</strong> {BIZ.address}
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

        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(`${BIZ.name}, ${BIZ.address}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold"
            style={{
              borderColor: PALETTE.maroon,
              color: PALETTE.maroon,
              backgroundColor: '#fff',
            }}
          >
            Get Directions
          </a>

          <a
            href={BIZ.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold text-white"
            style={{ borderColor: PALETTE.maroon, backgroundColor: PALETTE.orange }}
          >
            Order Online
          </a>

          {PHONE && telHref && (
            <a
              href={telHref}
              className="inline-flex items-center justify-center rounded-xl border-2 px-5 py-2 text-sm font-extrabold"
              style={{
                borderColor: PALETTE.orange,
                color: PALETTE.maroon,
                backgroundColor: '#fff',
              }}
            >
              Call Us
            </a>
          )}
        </div>

        {typeof BIZ.gmbRating === 'number' && (
          <p className="mt-4 text-sm text-neutral-700">
            ⭐ {BIZ.gmbRating.toFixed(1)}
            {typeof BIZ.gmbReviews === 'number' && (
              <>
                {' '}
                · {Intl.NumberFormat('en-GB').format(BIZ.gmbReviews)} reviews
              </>
            )}
          </p>
        )}
      </section>

      {/* Hours */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-lg font-extrabold mb-2" style={{ color: PALETTE.red }}>
            Pickup Hours
          </h3>
          <ul className="space-y-1 text-sm text-neutral-800">
            <li>Mon: 17:00 – 22:00</li>
            <li>Tue: 17:00 – 22:00</li>
            <li>Wed: 17:00 – 22:00</li>
            <li>Thu: 17:00 – 22:00</li>
            <li>Fri: 17:00 – 23:00</li>
            <li>Sat: 17:00 – 23:00</li>
            <li>Sun: 17:00 – 22:00</li>
          </ul>
        </div>

        <div
          className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
          style={{ borderColor: PALETTE.orange }}
        >
          <h3 className="text-lg font-extrabold mb-2" style={{ color: PALETTE.red }}>
            Delivery Hours
          </h3>
          <ul className="space-y-1 text-sm text-neutral-800">
            <li>Mon: 17:00 – 22:00</li>
            <li>Tue: 17:00 – 22:00</li>
            <li>Wed: 17:00 – 22:00</li>
            <li>Thu: 17:00 – 22:00</li>
            <li>Fri: 17:00 – 23:00</li>
            <li>Sat: 17:00 – 23:00</li>
            <li>Sun: 17:00 – 22:00</li>
          </ul>
        </div>
      </section>

      {/* Helpful info */}
      <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
          style={{ borderColor: PALETTE.orange }}
        >
          <h4 className="text-base font-extrabold mb-2" style={{ color: PALETTE.red }}>
            Parking
          </h4>
          <p className="text-sm text-neutral-800">
            Street parking nearby; check local signs for time limits. A short walk from Altrincham town centre.
          </p>
        </div>

        <div
          className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
          style={{ borderColor: PALETTE.orange }}
        >
          <h4 className="text-base font-extrabold mb-2" style={{ color: PALETTE.red }}>
            Allergy & Dietary
          </h4>
          <p className="text-sm text-neutral-800">
            Tell our team about allergies or dietary needs when ordering. We’ll guide you to safe choices.
          </p>
        </div>

        <div
          className="rounded-2xl border-2 bg-white p-5 shadow-2xl"
          style={{ borderColor: PALETTE.orange }}
        >
          <h4 className="text-base font-extrabold mb-2" style={{ color: PALETTE.red }}>
            Careers
          </h4>
          <p className="text-sm text-neutral-800">
            Email{' '}
            <a
              className="underline"
              style={{ color: PALETTE.maroon }}
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>{' '}
            with your CV and availability.
          </p>
        </div>
      </section>
    </main>
  );
}
