"use client";

import { motion } from "framer-motion";

const MARQUEE_TEXT = "SOFTIVA STUDIO • SOLUCIONES DIGITALES • DESARROLLO WEB • ";

export default function FooterMarquee() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex select-none items-center overflow-hidden whitespace-nowrap"
    >
      <motion.div
        className="flex shrink-0"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 55, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="px-4 text-[3rem] font-extrabold uppercase leading-none tracking-tight text-background/[0.035] sm:text-[4.25rem] lg:text-[5.5rem]"
          >
            {MARQUEE_TEXT.repeat(4)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
