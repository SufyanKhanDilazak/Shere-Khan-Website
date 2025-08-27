// app/order/page.tsx
'use client';

import { useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion, type Transition } from 'framer-motion';
import { PALETTE } from '@/lib/site';

declare global {
  interface Window {
    DeliverectWidget?: { orderNow: () => void };
    DeliverectWidgetClient?: string;
  }
}

/** Framer spring preset (typed) */
const SPRING: Transition = { type: 'spring', stiffness: 280, damping: 22 };

/** Shared card styles for partner apps */
const cardClass =
  'flex h-28 sm:h-32 items-center justify-center rounded-2xl border bg-white shadow-sm transition-transform';
const cardBorderStyle: React.CSSProperties = { borderColor: `${PALETTE.orange}66` };

/** Button palette (avoid inline literals sprinkled around) */
const buttonStyle: React.CSSProperties = {
  background: '#52f1e6',
  borderColor: PALETTE.maroon,
};

function OrderPageImpl() {
  // Ensure the correct client id for the Deliverect widget on this route too.
  useEffect(() => {
    window.DeliverectWidgetClient = 'shere-khan-restaurants';
  }, []);

  /** Open pickup via widget; fall back to direct URL if not available */
  const openPickup = useCallback(() => {
    try {
      const api = window.DeliverectWidget;
      if (api?.orderNow) {
        api.orderNow();
        return;
      }
    } catch {
      // ignore and fall through
    }
    window.open(
      'https://shere-khan-restaurants.deliverectdirect.com/?channel=pickup',
      '_blank',
      'noopener,noreferrer'
    );
  }, []);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10 sm:py-12">
      {/* ===== Heading ===== */}
      <header className="text-center">
        <span
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{
            borderColor: 'rgba(0,0,0,0.08)',
            background: 'rgba(0,0,0,0.04)',
            color: PALETTE.maroon,
          }}
        >
          Fresh • Fast • Secure
        </span>

        <h1
          className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ color: PALETTE.orange }}
        >
          Order for Pickup
        </h1>

        <p className="mt-2 text-sm text-neutral-700">
          Skip the queue — place your order and we’ll have it ready.
        </p>
      </header>

      {/* ===== Primary CTA ===== */}
      <section className="mt-6 flex justify-center">
        <motion.button
          type="button"
          onClick={openPickup}
          className="w-full max-w-sm inline-flex items-center justify-center rounded-xl border-2 px-6 py-3 text-base font-extrabold text-white shadow"
          style={buttonStyle}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={SPRING}
          aria-label="Order for pickup"
        >
          Order Now — Pickup
        </motion.button>
      </section>

      {/* ===== Divider ===== */}
      <hr
        className="mx-auto my-8 h-[2px] w-full max-w-7xl border-0"
        style={{
          background:
            'linear-gradient(90deg, var(--orange,#F15A24), #7E3FF2, #00C8BE)',
        }}
      />

      {/* ===== Partner apps ===== */}
      <section aria-labelledby="delivery-apps">
        <h2 id="delivery-apps" className="sr-only">
          Order on delivery apps
        </h2>

        <p className="mb-3 text-center text-sm text-neutral-700">
          Prefer delivery? Find us on your favourite app.
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {/* Deliveroo */}
          <motion.a
            href="https://deliveroo.co.uk/menu/manchester/altrincham/shere-khan-kitchen-2-peter-street?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Deliveroo"
            className={cardClass}
            style={cardBorderStyle}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
          >
            <Image
              src="/delivero.jpeg"
              alt="Deliveroo"
              width={300}
              height={110}
              className="h-20 w-auto sm:h-24"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 200px, 300px"
              priority={false}
            />
          </motion.a>

          {/* Just Eat */}
          <motion.a
            href="https://www.just-eat.co.uk/restaurants-shere-khan-kitchen-altrincham-wa14/menu#category_3bcff09d-d020-47ae-a9ba-dec7c2639c2b"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on Just Eat"
            className={cardClass}
            style={cardBorderStyle}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
          >
            <Image
              src="/eat.png"
              alt="Just Eat"
              width={300}
              height={110}
              className="h-20 w-auto sm:h-24"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 200px, 300px"
              priority={false}
            />
          </motion.a>

          {/* Uber Eats (link pending — same visual treatment) */}
          <motion.div
            role="link"
            aria-label="Uber Eats (link coming soon)"
            title="Uber Eats (link coming soon)"
            tabIndex={0}
            className={cardClass}
            style={cardBorderStyle}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') e.preventDefault();
            }}
          >
            <Image
              src="/uber.png"
              alt="Uber Eats"
              width={300}
              height={110}
              className="h-20 w-auto sm:h-24"
              sizes="(max-width: 640px) 33vw, (max-width: 1024px) 200px, 300px"
              priority={false}
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const OrderPage = memo(OrderPageImpl);
export default OrderPage;
