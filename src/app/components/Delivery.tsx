// app/components/Delivery.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PALETTE } from "@/lib/site";

export default function Delivery() {
  const cardBase =
    "flex h-24 sm:h-28 w-full items-center justify-center rounded-2xl border bg-white shadow-sm transition-all";
  const cardBorder = { borderColor: `${PALETTE.orange}66` };
  const hover = {
    whileHover: { scale: 1.05, boxShadow: "0 10px 28px rgba(0,0,0,0.15)" },
    whileTap: { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 280, damping: 22 },
  };

  return (
    <section
      className="mx-auto w-full max-w-7xl px-4 md:px-6 py-10"
      aria-labelledby="delivery-apps-heading"
    >
      <h2
        id="delivery-apps-heading"
        className="text-center text-2xl sm:text-3xl font-extrabold tracking-tight"
        style={{ color: PALETTE.orange }}
      >
        Order on Your Favourite Apps
      </h2>

      <div className="mt-6 grid grid-cols-3 items-center gap-4">
        {/* Deliveroo */}
        <motion.a
          href="https://deliveroo.co.uk/menu/manchester/altrincham/shere-khan-kitchen-2-peter-street?utm_campaign=organic&utm_medium=referrer&utm_source=menu_share"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on Deliveroo"
          className={cardBase}
          style={cardBorder}
          whileHover={hover.whileHover}
          whileTap={hover.whileTap}
          transition={hover.transition}
        >
          <Image
            src="/delivero.jpeg"
            alt="Deliveroo"
            width={220}
            height={64}
            className="h-14 w-auto sm:h-16"
            sizes="(max-width: 640px) 33vw, 220px"
            priority={false}
          />
        </motion.a>

        {/* Just Eat */}
        <motion.a
          href="https://www.just-eat.co.uk/restaurants-shere-khan-kitchen-altrincham-wa14/menu#category_3bcff09d-d020-47ae-a9ba-dec7c2639c2b"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on Just Eat"
          className={cardBase}
          style={cardBorder}
          whileHover={hover.whileHover}
          whileTap={hover.whileTap}
          transition={hover.transition}
        >
          <Image
            src="/eat.png"
            alt="Just Eat"
            width={220}
            height={64}
            className="h-14 w-auto sm:h-16"
            sizes="(max-width: 640px) 33vw, 220px"
            priority={false}
          />
        </motion.a>

        {/* Uber Eats – same design & animations, no link yet */}
        <motion.div
          role="link"
          aria-label="Uber Eats (link coming soon)"
          title="Uber Eats (coming soon)"
          className={cardBase}
          style={cardBorder}
          whileHover={hover.whileHover}
          whileTap={hover.whileTap}
          transition={hover.transition}
        >
          <Image
            src="/uber.png"
            alt="Uber Eats"
            width={220}
            height={64}
            className="h-14 w-auto sm:h-16"
            sizes="(max-width: 640px) 33vw, 220px"
            priority={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
