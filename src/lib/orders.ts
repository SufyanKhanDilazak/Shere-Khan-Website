// lib/orders.ts
'use client';

import { BIZ } from './site';

export function useOrderNowSmart() {
  return () => {
    const anyWin = window as unknown as {
      DeliverectWidget?: { orderNow: () => void };
    };
    if (anyWin?.DeliverectWidget?.orderNow) {
      anyWin.DeliverectWidget.orderNow();
    } else {
      window.open(BIZ.orderUrl, '_blank', 'noopener,noreferrer');
    }
  };
}
