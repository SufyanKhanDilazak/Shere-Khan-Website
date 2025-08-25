// components/Footer.tsx
'use client';

import React, { memo, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
// Tip: keep the CSS import here so Turbopack bundles Leaflet styles

const BIZ = {
  name: 'Shere Khan Kitchen',
  orderUrl: 'https://shere-khan-restaurants.deliverectdirect.com',
  address: '2 Peter St, Altrincham WA14 2DS, United Kingdom',
  phone: '+44 161 000 0000',
  coords: { lat: 53.3879, lng: -2.3499 },
} as const;

const SocialIcon: React.FC<{ title: string; href: string; d: string }> = ({
  title,
  href,
  d,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={title}
    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#7A1D1D]/30 text-[#7A1D1D] hover:bg-[#F15A24]/10 transition"
  >
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  </a>
);

const Footer: React.FC = memo(function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let mapLocal: import('leaflet').Map | null = null;

    const elLocal = mapRef.current; // ✅ capture ref value once
    if (!elLocal) return;

    (async () => {
      const L = await import('leaflet');
      if (cancelled) return;

      // Clean any prior instance (fast-refresh safety)
      if (elLocal.dataset.mapInitialized === 'true' || elLocal.classList.contains('leaflet-container')) {
        elLocal.removeAttribute('data-map-initialized');
        elLocal.classList.remove('leaflet-container');
        elLocal.innerHTML = '';
      }

      // Create map (no invalid MapOptions)
      mapLocal = L.map(elLocal, {
        zoomControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
      }).setView([BIZ.coords.lat, BIZ.coords.lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 20,
      }).addTo(mapLocal);

      L.circleMarker([BIZ.coords.lat, BIZ.coords.lng], {
        radius: 10,
        color: '#7A1D1D',
        weight: 2,
        fillColor: '#F15A24',
        fillOpacity: 0.8,
      })
        .addTo(mapLocal)
        .bindPopup(BIZ.name);

      // ensure sizing once visible
      setTimeout(() => mapLocal && mapLocal.invalidateSize(), 0);

      elLocal.dataset.mapInitialized = 'true';
    })();

    // ✅ cleanup uses captured elements, not mapRef.current
    return () => {
      cancelled = true;
      if (mapLocal) {
        mapLocal.remove();
        mapLocal = null;
      }
      if (elLocal) {
        elLocal.removeAttribute('data-map-initialized');
        elLocal.classList.remove('leaflet-container');
        elLocal.innerHTML = '';
      }
    };
  }, []);

  const telHref = `tel:${BIZ.phone.replace(/[()\s-]/g, '')}`;

  return (
    <footer className="mt-16 border-t-4 border-[#F15A24]/70 bg-white/80 py-10">
      {/* Keep Leaflet UNDER overlays/menus */}
      <style jsx global>{`
        .footer-leaflet-wrap,
        .footer-leaflet-wrap .leaflet-container,
        .footer-leaflet-wrap .leaflet-pane,
        .footer-leaflet-wrap .leaflet-top,
        .footer-leaflet-wrap .leaflet-bottom {
          z-index: 0 !important;
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 md:px-6 lg:grid-cols-3">
        {/* Brand / Actions */}
        <div className="text-center lg:text-left">
          <p className="text-lg font-extrabold text-[#DC2626]">{BIZ.name}</p>
          <p className="mt-2 text-sm text-neutral-700">{BIZ.address}</p>

          <div className="mt-3 flex flex-col items-center lg:items-start gap-2">
            <a href={telHref} className="underline text-sm font-semibold text-[#7A1D1D]">
              Call store
            </a>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(`${BIZ.name}, ${BIZ.address}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-sm font-semibold text-[#7A1D1D]"
            >
              Get directions
            </a>
            <a
              href={BIZ.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-xl border-2 border-[#7A1D1D] bg-[#F15A24] px-5 py-2 text-white font-extrabold shadow"
            >
              Order Online
            </a>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 lg:justify-start">
            <SocialIcon
              title="Instagram"
              href="https://instagram.com"
              d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6-1a1 1 0 110 2 1 1 0 010-2z"
            />
            <SocialIcon
              title="Facebook"
              href="https://facebook.com"
              d="M15 3h-2a4 4 0 00-4 4v2H7v3h2v9h3v-9h2.3l.7-3H12V7a1 1 0 011-1h2V3z"
            />
            <SocialIcon
              title="TikTok"
              href="https://tiktok.com"
              d="M15 3c1 1.9 2.7 3.1 4.5 3.3V9c-1.7-.1-3.3-.7-4.5-1.7v6.8A5.6 5.6 0 119 8.7v3a2.6 2.6 0 102.4 2.6V3h3.6z"
            />
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            © {new Date().getFullYear()} Shere Khan Restaurants. All Rights Reserved.
          </p>
        </div>

        {/* Hours */}
        <div className="grid grid-cols-2 gap-6 text-center lg:text-left text-sm text-neutral-700">
          <div>
            <p className="text-lg font-bold text-[#DC2626]">Pickup Hours</p>
            <ul className="mt-2 space-y-1">
              <li>Mon: 17:00 – 22:00</li>
              <li>Tue: 17:00 – 22:00</li>
              <li>Wed: 17:00 – 22:00</li>
              <li>Thu: 17:00 – 22:00</li>
              <li>Fri: 17:00 – 23:00</li>
              <li>Sat: 17:00 – 23:00</li>
              <li>Sun: 17:00 – 22:00</li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold text-[#DC2626]">Delivery Hours</p>
            <ul className="mt-2 space-y-1">
              <li>Mon: 17:00 – 22:00</li>
              <li>Tue: 17:00 – 22:00</li>
              <li>Wed: 17:00 – 22:00</li>
              <li>Thu: 17:00 – 22:00</li>
              <li>Fri: 17:00 – 23:00</li>
              <li>Sat: 17:00 – 23:00</li>
              <li>Sun: 17:00 – 22:00</li>
            </ul>
          </div>
        </div>

        {/* Map (non-interactive; locked below UI) */}
        <div className="relative z-0 h-64 overflow-hidden rounded-2xl border-2 border-[#7A1D1D] shadow">
          <div
            ref={mapRef}
            className="footer-leaflet-wrap h-full w-full"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
