"use client";

import { motion } from "framer-motion";

const TECH_TEXT = "NEXT.JS • TAILWIND CSS • TYPESCRIPT • FIGMA • VERCEL • REACT • ";

export default function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/60">
      <motion.div
        className="flex shrink-0 whitespace-nowrap py-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="px-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted"
          >
            {TECH_TEXT.repeat(3)}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
