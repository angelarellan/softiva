import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  id?: string;
};

/**
 * Entrance animation done in pure CSS (see .animate-reveal in globals.css)
 * instead of framer-motion's whileInView. Content is part of the initial
 * HTML and stays visible even if JS is slow to hydrate or fails to load —
 * only the transition itself depends on CSS, never on React mounting.
 */
export default function Reveal({ children, delay = 0, className, id }: RevealProps) {
  return (
    <div
      id={id}
      className={`animate-reveal${className ? ` ${className}` : ""}`}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
