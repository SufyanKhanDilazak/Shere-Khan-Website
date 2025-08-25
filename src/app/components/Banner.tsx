// components/Banner.tsx
'use client';

import { useEffect, useRef, useCallback, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useOrderNowSmart } from '@/lib/orders';

export const Banner = memo(function Banner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const orderNow = useOrderNowSmart();

  // Animate brand/cta on enter
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.from('.brand-wrap', {
        y: 14,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Ensure video autoplays + loops robustly
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.setAttribute('autoplay', '');
    v.setAttribute('loop', '');

    const safePlay = () => v.play().catch(() => {});

    const onLoaded = () => safePlay();
    const onEnded = () => {
      try {
        v.currentTime = 0;
      } catch {}
      safePlay();
    };

    v.addEventListener('loadedmetadata', onLoaded);
    v.addEventListener('canplaythrough', onLoaded);
    v.addEventListener('ended', onEnded);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && v.paused) safePlay();
    });

    safePlay();

    return () => {
      v.removeEventListener('loadedmetadata', onLoaded);
      v.removeEventListener('canplaythrough', onLoaded);
      v.removeEventListener('ended', onEnded);
    };
  }, []);

  // Optional parallax pointer effect
  const onPointerMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', String((e.clientX - rect.left) / rect.width));
    el.style.setProperty('--my', String((e.clientY - rect.top) / rect.height));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative w-full overflow-hidden
        mt-20 sm:mt-20 lg:mt-20
        min-h-[56vh] sm:min-h-[56vh] lg:min-h-[62vh]
        flex items-center
        [transform-style:preserve-3d]
      "
      aria-label="Hero"
      onMouseMove={onPointerMove}
      style={
        {
          '--mx': 0.5,
          '--my': 0.5,
        } as React.CSSProperties
      }
    >
      {/* background video */}
      <div
        className="absolute inset-0 -z-20 h-full"
        style={{
          transform:
            'translateZ(-180px) scale(1.18) rotateX(calc((var(--my)-0.5)*3deg)) rotateY(calc((0.5-var(--mx))*3deg))',
        }}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="metadata"
          poster="/gallery/hero-cover.jpg"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          aria-label="Restaurant ambience background video"
        >
          <source src="/vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
      </div>

      {/* BRAND */}
      <div
        className="
          brand-wrap relative z-10 mx-auto w-full max-w-7xl px-4 md:px-6
          flex flex-col items-center text-center
          [transform:translateZ(120px)]
        "
      >
        <div
          className="
            inline-flex flex-col items-center
            rounded-2xl border border-white/10 bg-black/35
            px-4 py-2 sm:px-5 sm:py-2.5
            backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.3)]
          "
        >
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-white/80 uppercase">
            Authentic Desi Kitchen
          </p>
        </div>

        <h1
          className="
            mt-3
            text-white font-extrabold leading-[1.05]
            text-[clamp(28px,6vw,56px)]
            drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]
          "
        >
          Shere Khan Restaurant
        </h1>

        <p className="mt-2 max-w-2xl text-white/85 text-sm sm:text-base leading-relaxed">
          Altrincham’s best desi flavours — fresh, fast, and unforgettable.
        </p>
      </div>

      {/* CTA */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hero-cta w-full max-w-xs sm:max-w-sm px-4">
        <button
          type="button"
          onClick={orderNow}
          className="w-full text-center border-2 border-[#7A1D1D] bg-[#F15A24] text-white rounded-xl px-6 py-3 font-extrabold shadow-lg active:translate-y-[1px] transition-transform"
          aria-label="Order now"
        >
          Order Now 🍴
        </button>
      </div>
    </section>
  );
});
