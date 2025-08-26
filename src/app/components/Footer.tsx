'use client';

import React, { memo, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

const BIZ = {
  name: 'Shere Khan Kitchen',
  orderUrl: 'https://shere-khan-restaurants.deliverectdirect.com',
  address: '2 Peter St, Altrincham WA14 2DS, United Kingdom',
  phone: '+44 161 000 0000',
  coords: { lat: 53.3879, lng: -2.3499 },
} as const;

const Footer: React.FC = memo(function Footer() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    let mapLocal: import('leaflet').Map | null = null;
    const elLocal = mapRef.current;
    if (!elLocal) return;

    (async () => {
      const L = await import('leaflet');
      if (cancelled) return;

      if (
        elLocal.dataset.mapInitialized === 'true' ||
        elLocal.classList.contains('leaflet-container')
      ) {
        elLocal.removeAttribute('data-map-initialized');
        elLocal.classList.remove('leaflet-container');
        elLocal.innerHTML = '';
      }

      mapLocal = L.map(elLocal, {
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        doubleClickZoom: true,
      }).setView([BIZ.coords.lat, BIZ.coords.lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
        maxZoom: 20,
      }).addTo(mapLocal);

      L.circleMarker([BIZ.coords.lat, BIZ.coords.lng], {
        radius: 9,
        color: '#7A1D1D',
        weight: 2,
        fillColor: '#F15A24',
        fillOpacity: 0.85,
      })
        .addTo(mapLocal)
        .bindPopup(BIZ.name);

      setTimeout(() => mapLocal?.invalidateSize(), 0);
      elLocal.dataset.mapInitialized = 'true';
    })();

    return () => {
      cancelled = true;
      if (mapLocal) {
        mapLocal.remove();
        mapLocal = null;
      }
    };
  }, []);

  const telHref = `tel:${BIZ.phone.replace(/[()\s-]/g, '')}`;

  return (
    <footer className="mt-10 border-t-2 border-[#52f1e6]/70 bg-white py-6">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 md:px-6 lg:grid-cols-3">
        {/* Info */}
        <div className="text-center lg:text-left space-y-1.5">
          <p className="text-base font-bold text-[#F15A24]">{BIZ.name}</p>
          <p className="text-xs text-neutral-700">{BIZ.address}</p>
          <a href={telHref} className="block text-xs underline text-[#7A1D1D]">
            {BIZ.phone}
          </a>

          {/* Social icons */}
          <div className="mt-2 flex justify-center lg:justify-start gap-3">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/thesherekhan_?igsh=MWQ0cXoybzl6ZjFxbA=="
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="h-8 w-8"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full rounded-full">
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
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="h-8 w-8"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full">
                <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
                <path
                  fill="#fff"
                  d="M15 8h-1.6c-.5 0-.9.4-.9.9V10H15l-.3 2h-1.9v6h-2.2v-6H8.8v-2h1.8V8.8A2.8 2.8 0 0 1 13.4 6H15v2z"
                />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="h-8 w-8"
            >
              <svg viewBox="0 0 24 24" className="h-full w-full">
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

          <p className="mt-2 text-[10px] text-neutral-600">
            © {new Date().getFullYear()} Shere Khan Kitchen
          </p>
        </div>

        {/* Hours */}
        <div className="text-center lg:text-left text-xs text-neutral-700 space-y-2">
          <p className="font-bold text-[#F15A24]">Hours</p>
          <p>Mon–Thu: 17:00–22:00</p>
          <p>Fri–Sat: 17:00–23:00</p>
          <p>Sun: 17:00–22:00</p>
        </div>

        {/* Map */}
        <div className="h-40 md:h-48 rounded-lg border border-[#7A1D1D] shadow">
          <div ref={mapRef} className="h-full w-full rounded-lg" />
        </div>
      </div>
    </footer>
  );
});

export default Footer;
