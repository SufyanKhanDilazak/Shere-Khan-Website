'use client';

import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BIZ, PALETTE } from '@/lib/site'; // ✅ use PALETTE for brand colors

type Category = {
  title: string;
  desc: string;
  src: string;
};

const MENU_CATEGORIES: Category[] = [
  {
    title: 'Naanwhich',
    desc: 'Traditional Shere khan Chicken seekh kabab made with Chicken mince, onions, chilli and spices, wrapped in a spiral naan, with Mozzarella cheese and served with, Red onion, Greek yoghurt and fiery ketchup',
    src: '/naann.jpg',
  },
  {
    title: 'Biryani',
    desc: 'SERVED WITH FRESH RAITA, MIXED PEPPERS, (ADD CURRY SAUCE)',
    src: '/biryani.jpg',
  },
  {
    title: 'Platters & Mixed Grills',
    desc: '2 lamb chops, 2 Tikki seikh kebabs, 4 chickent tikka.',
    src: '/platter.jpg',
  },
  {
    title: 'Curries',
    desc: 'Slow-simmered gravies—makhani, rogan josh, korma, and more.',
    src: '/curry.jpg',
  },
  {
    title: 'Loaded Fries',
    desc: 'MELTED CHEDDAR, SEEKH KEBAB, BANG BANG SAUCE, YOUGHURT SAUCE, FRIED ONIONS.',
    src: '/fries.jpg',
  },
  {
    title: 'Appetisers',
    desc: 'Fish, samosa chaats, and paneer tikka for a lively start.',
    src: '/samosa.jpg',
  },
];

export const Menu = memo(function Menu() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.menu-card', {
        y: 26,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
        },
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="menu"
      className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10 sm:py-14"
    >
      <header className="mb-6 text-center">
        {/* ✅ heading orange */}
        <h2
          className="mb-1 text-2xl sm:text-3xl lg:text-4xl font-extrabold"
          style={{ color: PALETTE.orange }}
        >
          Menu Highlights
        </h2>
        <p className="text-sm text-neutral-700">
          {BIZ.tagline} · {BIZ.address.split(',')[1]?.trim()}
        </p>
      </header>

      {/* ✅ 2 cols on mobile, 3 on md+ */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
      >
        {MENU_CATEGORIES.map((m) => (
          <motion.article
            key={m.title}
            className="menu-card group flex flex-col overflow-hidden rounded-2xl border border-[#F15A24] bg-white shadow-[0_18px_36px_rgba(0,0,0,0.12)]"
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            <figure className="relative aspect-[4/3] w-full">
              <Image
                src={m.src}
                alt={m.title}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 400px"
                className="object-cover"
              />
            </figure>

            {/* ✅ texts centered */}
            <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 text-center">
              <h3 className="text-sm sm:text-base font-extrabold text-[#DC2626] mb-1">
                {m.title}
              </h3>
              <p className="text-[12px] sm:text-sm leading-snug text-neutral-700 line-clamp-2">
                {m.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
});
