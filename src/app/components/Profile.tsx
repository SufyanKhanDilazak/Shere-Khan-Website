// components/ProfileCard.tsx
'use client';

import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type CSSProperties,
} from 'react';
import Image from 'next/image';

export interface ProfileCardProps {
  /** e.g. "/menu.jpg" (do NOT include /public) */
  avatarUrl: string;

  /** Optional brand textures/tints */
  behindGradient?: string;
  innerGradient?: string;
  showBehindGradient?: boolean;

  /** Container className (margin, layout, etc.) */
  className?: string;

  /** Tilt controls */
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
}

/** Defaults tuned for a warm/cool brand blend (adjust to your palette) */
const DEFAULT_BEHIND_GRADIENT =
  'radial-gradient(600px 400px at var(--pointer-x) var(--pointer-y), rgba(255,191,0,0.22) 0%, rgba(255,191,0,0) 55%), radial-gradient(800px 620px at 90% 20%, rgba(180,38,38,0.18) 0%, rgba(180,38,38,0) 65%)';

const DEFAULT_INNER_GRADIENT =
  'linear-gradient(140deg, rgba(255,140,0,0.14) 0%, rgba(255,75,43,0.10) 100%)';

const ANIMATION = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 60,
  INITIAL_Y_OFFSET: 48,
  DEVICE_BETA_OFFSET: 20,
} as const;

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, p = 3) => parseFloat(v.toFixed(p));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUrl,
  behindGradient,
  innerGradient,
  showBehindGradient = true,
  className = '',
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateCardTransform = useCallback(
    (offsetX: number, offsetY: number, card: HTMLElement, wrap: HTMLElement) => {
      const width = card.clientWidth || 1;
      const height = card.clientHeight || 1;

      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      // Smooth but responsive tilt ranges
      const rotateX = round(-(centerY / 4));
      const rotateY = round(centerX / 4);

      wrap.style.setProperty('--pointer-x', `${percentX}%`);
      wrap.style.setProperty('--pointer-y', `${percentY}%`);
      wrap.style.setProperty('--rotate-x', `${rotateX}deg`);
      wrap.style.setProperty('--rotate-y', `${rotateY}deg`);
    },
    []
  );

  const animateToCenter = useCallback(
    (duration: number, startX: number, startY: number, card: HTMLElement, wrap: HTMLElement) => {
      const startTime = performance.now();
      const targetX = card.clientWidth / 2;
      const targetY = card.clientHeight / 2;

      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        const e = easeInOutCubic(t);
        const cx = lerp(startX, targetX, e);
        const cy = lerp(startY, targetY, e);
        updateCardTransform(cx, cy, card, wrap);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [updateCardTransform]
  );

  const cancelRaf = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !enableTilt) return;

      const rect = card.getBoundingClientRect();
      updateCardTransform(event.clientX - rect.left, event.clientY - rect.top, card, wrap);
    },
    [enableTilt, updateCardTransform]
  );

  const handlePointerEnter = useCallback(() => {
    cancelRaf();
  }, [cancelRaf]);

  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !enableTilt) return;
      animateToCenter(ANIMATION.SMOOTH_DURATION, event.offsetX, event.offsetY, card, wrap);
    },
    [animateToCenter, enableTilt]
  );

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (!enableTilt || !enableMobileTilt) return;
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap) return;

      const { beta, gamma } = event;
      if (beta == null || gamma == null) return;

      const x = card.clientWidth / 2 + gamma * mobileTiltSensitivity;
      const y =
        card.clientHeight / 2 +
        (beta - ANIMATION.DEVICE_BETA_OFFSET) * mobileTiltSensitivity;

      updateCardTransform(x, y, card, wrap);
    },
    [enableTilt, enableMobileTilt, mobileTiltSensitivity, updateCardTransform]
  );

  useEffect(() => {
    if (!enableTilt) return;

    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const onMove = handlePointerMove as EventListener;
    const onEnter = handlePointerEnter as EventListener;
    const onLeave = handlePointerLeave as EventListener;

    card.addEventListener('pointermove', onMove);
    card.addEventListener('pointerenter', onEnter);
    card.addEventListener('pointerleave', onLeave);

    // Initial gentle sweep
    const startX = (wrap.clientWidth || 300) - ANIMATION.INITIAL_X_OFFSET;
    const startY = ANIMATION.INITIAL_Y_OFFSET;
    updateCardTransform(startX, startY, card, wrap);
    animateToCenter(ANIMATION.INITIAL_DURATION, startX, startY, card, wrap);

    // Mobile tilt permission on first tap (iOS) — typed, no `any`
    const askPermission = () => {
      if (!enableMobileTilt || location.protocol !== 'https:') return;

      type OrientationPermissionClass = {
        requestPermission?: () => Promise<PermissionState | 'granted' | 'denied' | 'prompt'>;
      };

      const OrientationEventCtor = (window as Window & {
        DeviceOrientationEvent?: OrientationPermissionClass;
      }).DeviceOrientationEvent;

      if (OrientationEventCtor?.requestPermission) {
        OrientationEventCtor.requestPermission()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', handleDeviceOrientation as EventListener);
            }
          })
          .catch(() => {
            /* no-op */
          });
      } else {
        window.addEventListener('deviceorientation', handleDeviceOrientation as EventListener);
      }
      card.removeEventListener('click', askPermission);
    };
    card.addEventListener('click', askPermission);

    return () => {
      card.removeEventListener('pointermove', onMove);
      card.removeEventListener('pointerenter', onEnter);
      card.removeEventListener('pointerleave', onLeave);
      card.removeEventListener('click', askPermission);
      window.removeEventListener('deviceorientation', handleDeviceOrientation as EventListener);
      cancelRaf();
    };
  }, [
    enableTilt,
    enableMobileTilt,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
    handleDeviceOrientation,
    updateCardTransform,
    animateToCenter,
    cancelRaf,
  ]);

  const styleVars = useMemo(
    () =>
      ({
        // CSS variables used by inline styles
        '--behind-gradient': showBehindGradient
          ? (behindGradient ?? DEFAULT_BEHIND_GRADIENT)
          : 'none',
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
        '--rotate-x': '0deg',
        '--rotate-y': '0deg',
        '--pointer-x': '50%',
        '--pointer-y': '50%',
      }) as CSSProperties,
    [behindGradient, innerGradient, showBehindGradient]
  );

  return (
    <div
      ref={wrapRef}
      className={['relative', className].join(' ')}
      style={styleVars}
    >
      {/* Card */}
      <div
        ref={cardRef}
        className="
          group relative mx-auto w-full max-w-sm sm:max-w-md
          rounded-3xl overflow-hidden
          shadow-[0_24px_64px_rgba(0,0,0,0.25)]
          ring-1 ring-white/10
          will-change-transform
        "
        style={{
          transform:
            'perspective(900px) rotateX(var(--rotate-x)) rotateY(var(--rotate-y))',
          transition: 'transform 120ms ease-out',
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.28), rgba(0,0,0,0.28))',
        }}
        aria-label="Profile image card"
      >
        {/* Base image */}
        <div className="relative aspect-[4/5]">
          <Image
            src={avatarUrl}
            alt="Card image"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 480px"
          />
        </div>

        {/* Soft inner gradient to ensure COLOR & cohesion */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: 'var(--inner-gradient)' }}
        />

        {/* Brand glow following pointer (very subtle, adds color pop) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-90 md:opacity-100 mix-blend-color"
          style={{ background: 'var(--behind-gradient)' }}
        />

        {/* Gentle vignette for polish */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.18) 100%)',
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(ProfileCard);
