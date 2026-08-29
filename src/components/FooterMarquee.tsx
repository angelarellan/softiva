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
        transition={{ duration: 38, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="px-4 text-[2.25rem] font-extrabold uppercase leading-none tracking-tight text-background/[0.025] sm:text-[3.25rem] lg:text-[4.25rem]"
          >
            {MARQUEE_TEXT.repeat(4)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
