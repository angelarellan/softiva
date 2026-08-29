"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/Reveal";

const FAQS = [
  {
    question: "¿Cuánto tiempo tarda un proyecto?",
    answer:
      "Depende de la complejidad: una landing page suele estar lista en 1 a 2 semanas, mientras que un sitio corporativo o e-commerce puede llevar entre 3 y 6 semanas.",
  },
  {
    question: "¿Cómo es el proceso de diseño?",
    answer:
      "Empezamos con una etapa de descubrimiento para entender tu marca y objetivos, seguimos con wireframes y prototipos en Figma, y una vez aprobados pasamos al desarrollo.",
  },
  {
    question: "¿Los sitios están optimizados para celular?",
    answer:
      "Sí, todos nuestros desarrollos son responsive por defecto: se adaptan y funcionan perfectamente en celulares, tablets y notebooks.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-lg font-semibold uppercase tracking-widest text-accent-violet">
            Preguntas frecuentes
          </span>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
            Resolvemos tus{" "}
            <span className="gradient-text">principales dudas</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-4">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={item.question} delay={index * 0.05}>
                <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                  >
                    <span className="font-semibold">{item.question}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
