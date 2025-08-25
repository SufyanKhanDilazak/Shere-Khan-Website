'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    DeliverectWidget?: { orderNow: () => void };
    DeliverectWidgetClient?: string;
  }
}

export default function OrderPage() {
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState('Loading Menu...');

  useEffect(() => {
    // 1) Set client ID BEFORE loading the script
    window.DeliverectWidgetClient = 'shere-khan-restaurants'; // ← confirm this slug

    // 2) Add the script once
    const existing = document.getElementById('deliverect-widget');
    if (!existing) {
      const s = document.createElement('script');
      s.id = 'deliverect-widget';
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://widget.deliverect.com/widget.v1.js';
      s.onload = () => {
        console.log('[Deliverect] widget script loaded');
      };
      s.onerror = (e) => {
        console.error('[Deliverect] widget script failed to load', e);
        setMsg('Failed to load widget script');
      };
      document.body.appendChild(s);
    }

    // 3) Poll until the widget is ready, with timeout + logs
    let attempts = 0;
    const maxAttempts = 60; // ~12s
    const timer = setInterval(() => {
      attempts++;
      if (window.DeliverectWidget?.orderNow) {
        console.log('[Deliverect] widget ready');
        setReady(true);
        try {
          window.DeliverectWidget.orderNow(); // auto-open
        } catch (err) {
          console.error('[Deliverect] orderNow threw', err);
        }
        clearInterval(timer);
      } else {
        if (attempts % 10 === 0) {
          console.log('[Deliverect] still waiting...', { attempts });
        }
        if (attempts >= maxAttempts) {
          clearInterval(timer);
          setMsg('Widget not ready (check domain/slug/CSP)');
          console.warn('[Deliverect] gave up waiting. Check allowed domains & slug.');
        }
      }
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const reopen = () => window.DeliverectWidget?.orderNow?.();

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 gap-4">
      <h1 className="text-3xl font-extrabold">Order Online</h1>
      <p className="text-neutral-600 text-center">Your full menu opens in a moment. If you closed it:</p>

      <button
        onClick={reopen}
        disabled={!ready}
        className={`rounded-xl border-2 px-6 py-3 font-semibold shadow
          ${ready ? 'bg-[var(--orange)] border-[var(--maroon)] text-white' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
      >
        {ready ? 'Open Menu' : msg}
      </button>

      <a
        href="https://shere-khan-restaurants.deliverectdirect.com"
        target="_blank" rel="noreferrer"
        className="rounded-xl border-2 border-[var(--maroon)] bg-white/95 px-6 py-3 font-semibold text-[var(--maroon)] shadow"
      >
        Open in New Tab
      </a>
    </main>
  );
}
