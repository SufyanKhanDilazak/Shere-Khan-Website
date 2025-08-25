// app/components/OrderNowButton.tsx
'use client';

import { useEffect, useState, memo } from 'react';

// ✅ Extend window to know about Deliverect
declare global {
  interface Window {
    DeliverectWidget?: { orderNow: () => void };
  }
}

type Props = {
  label?: string;
  className?: string;
};

/**
 * Button to trigger Deliverect's order widget.
 * - Waits until the widget script is ready
 * - If not ready, disables button
 * - Fallback: opens Deliverect Direct URL in new tab
 */
function OrderNowButtonBase({
  label = 'Order Online',
  className = '',
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let frame: number;
    const interval: NodeJS.Timeout = setInterval(checkReady, 500); // ✅ const instead of let

    function checkReady() {
      if (window.DeliverectWidget?.orderNow) {
        setReady(true);
        cancelAnimationFrame(frame);
        clearInterval(interval);
      } else {
        frame = requestAnimationFrame(checkReady);
      }
    }

    checkReady(); // run once immediately

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  const handleClick = () => {
    if (ready && window.DeliverectWidget?.orderNow) {
      try {
        window.DeliverectWidget.orderNow();
      } catch (err) {
        console.error('[Deliverect] orderNow failed', err);
        window.open(
          'https://shere-khan-restaurants.deliverectdirect.com',
          '_blank'
        );
      }
    } else {
      // Fallback if widget script didn’t load
      window.open(
        'https://shere-khan-restaurants.deliverectdirect.com',
        '_blank'
      );
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!ready}
      aria-disabled={!ready}
      className={`inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold shadow transition
        ${
          ready
            ? 'bg-[var(--orange)] text-white border-2 border-[var(--maroon)] hover:scale-[1.02] active:translate-y-[1px]'
            : 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-600'
        }
        ${className}
      `}
    >
      {ready ? label : 'Loading…'}
    </button>
  );
}

export const OrderNowButton = memo(OrderNowButtonBase);
