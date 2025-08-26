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

  // Ensure video plays robustly
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

  // Parallax pointer effect
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
        {/* Badge */}
        <div
          className="
            inline-flex flex-col items-center
            rounded-full border border-white/30 bg-black/40
            px-5 py-1.5 sm:px-6 sm:py-2
            backdrop-blur-md
            shadow-[0_0_20px_rgba(0,0,0,0.5)]
          "
        >
          <p
            className="
              text-[11px] sm:text-xs tracking-[0.25em]
              uppercase font-extrabold
              text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]
            "
          >
            Est 1987
          </p>
        </div>

        {/* Heading */}
        <h1
          className="
            mt-3
            text-white font-extrabold leading-[1.05]
            text-[clamp(32px,6vw,60px)]
            drop-shadow-[0_4px_28px_rgba(0,0,0,0.6)]
          "
        >
          Shere Khan Kitchen
        </h1>

        {/* Tagline */}
        <p
          className="
            mt-2 max-w-2xl text-white font-bold
            text-sm sm:text-lg leading-relaxed
            drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]
          "
        >
          The Tiger Roars Again.
        </p>
      </div>

      {/* CTA */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hero-cta w-full max-w-xs sm:max-w-sm px-4">
        <button
          type="button"
          onClick={orderNow}
          className="
            w-full text-center
            bg-[#52f1e6] text-white
            rounded-md px-5 py-2
            text-sm sm:text-base font-semibold
            shadow-md transition-all
            hover:shadow-lg hover:brightness-110 active:scale-[0.98]
          "
          aria-label="Order now"
        >
          Order Now 🍴
        </button>
      </div>
    </section>
  );
});
