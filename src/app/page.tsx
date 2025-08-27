// app/page.tsx
'use client';

import { useEffect, memo } from 'react';
import type { PropsWithChildren } from 'react';
import { Banner } from './components/Banner';
import { Countup } from './components/Countup';
import { Menu } from './components/Menu';
import { Reviews } from './components/Reviews';
import { DeliveryHours } from './components/DeliveryHours';
import { PALETTE } from '@/lib/site';
import { LocalSpotlight } from './components/LocalSpotlight';
import ProfileCard from './components/Profile';
import Delivery from './components/Delivery';

/** Allow CSS custom properties like --orange, --teal, etc. */
type CSSVars = React.CSSProperties & {
  [key: `--${string}`]: string | number;
};

/* ---------- Theme wrappers ---------- */
const cssVars: CSSVars = {
  '--orange': PALETTE.orange,
  '--teal': PALETTE.teal,
  '--maroon': PALETTE.maroon,
  '--purple': PALETTE.purple,
  '--paper': PALETTE.paper,
  '--ink': PALETTE.ink,
  '--red': PALETTE.red,
};

const VarWrap = memo(function VarWrap({ children }: PropsWithChildren) {
  return (
    <div style={cssVars} className="bg-[var(--paper)] text-[var(--ink)]">
      {children}
    </div>
  );
});

const ThreeDRoot = memo(function ThreeDRoot({ children }: PropsWithChildren) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('main');
    if (!root) return;
    const move = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      root.style.setProperty('--mx', ((e.clientX - r.left) / Math.max(1, r.width)).toString());
      root.style.setProperty('--my', ((e.clientY - r.top) / Math.max(1, r.height)).toString());
    };
    const leave = () => {
      root.style.setProperty('--mx', '0.5');
      root.style.setProperty('--my', '0.5');
    };
    root.addEventListener('mousemove', move, { passive: true });
    root.addEventListener('mouseleave', leave);
    return () => {
      root.removeEventListener('mousemove', move);
      root.removeEventListener('mouseleave', leave);
    };
  }, []);
  return <>{children}</>;
});

/* ---------- Add icon to Deliverect launcher & keep it enabled ---------- */
function useEnhanceDeliverectLauncher() {
  useEffect(() => {
    let stopped = false;

    const inject = (btn: HTMLAnchorElement) => {
      btn.style.opacity = '1';
      btn.style.filter = 'none';
      btn.style.pointerEvents = 'auto';
      btn.style.backgroundImage = 'none';
      btn.style.display = 'inline-flex';
      btn.style.alignItems = 'center';
      btn.style.justifyContent = 'center';
      btn.style.position = 'relative';
      if (!btn.querySelector('.sk-cart-icon')) {
        const iconWrap = document.createElement('span');
        iconWrap.className =
          'sk-cart-icon pointer-events-none absolute inset-0 flex items-center justify-center';
        iconWrap.innerHTML = `
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white" aria-hidden="true">
            <path d="M7 7V6a5 5 0 0 1 10 0v1h2a1 1 0 0 1 1 1.1l-1.3 11A2 2 0 0 1 16.71 21H7.29a2 2 0 0 1-1.99-1.9L4 8.1A1 1 0 0 1 5 7h2zm2 0h6V6a3 3 0 0 0-6 0v1z"/>
          </svg>
        `;
        btn.appendChild(iconWrap);
      }
    };

    const tryFind = () => {
      if (stopped) return true;
      const btn = document.querySelector<HTMLAnchorElement>('a.launcher-button');
      if (btn) {
        inject(btn);
        return true;
      }
      return false;
    };

    let tries = 0;
    const int = setInterval(() => {
      if (tryFind() || ++tries > 80) clearInterval(int);
    }, 125);

    const mo = new MutationObserver(() => tryFind());
    mo.observe(document.documentElement, { childList: true, subtree: true });

    return () => {
      stopped = true;
      clearInterval(int);
      mo.disconnect();
    };
  }, []);
}

/* ---------- Small motif bar ---------- */
const MotifBar = memo(function MotifBar() {
  return (
    <div className="mx-auto my-8 h-[2px] w-full max-w-7xl bg-gradient-to-r from-[var(--orange)] via-[var(--purple)] to-[var(--teal)] px-4 md:px-6" />
  );
});

/* ---------- Page ---------- */
export default function Page() {
  useEnhanceDeliverectLauncher();

  return (
    <VarWrap>
      <ThreeDRoot>
        <main className="min-h-screen w-full overflow-x-hidden">
          <Banner />
          {/* promo ribbon */}
          <div className="w-full bg-white/90 py-2 shadow-sm ring-1 ring-[var(--maroon)]/10">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-1 px-4 text-[11px] font-semibold text-[var(--maroon)] sm:flex-row sm:justify-between sm:gap-3 sm:text-xs md:px-6">
              <span>🍛 100% Halal</span>
              <span>🚚 Delivery in 30–40 min</span>
            </div>
          </div>
          <MotifBar />
          <Countup />
          <Delivery/>
          <Menu />
          <LocalSpotlight />
          <Reviews />
          <DeliveryHours />
        </main>
      </ThreeDRoot>
    </VarWrap>
  );
}
