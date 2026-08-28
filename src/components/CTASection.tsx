import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 text-center">
          <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-violet/20 blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              ¿Listo para llevar tu marca al{" "}
              <span className="gradient-text">siguiente nivel</span>?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Contanos tu idea y te ayudamos a convertirla en una experiencia
              digital de alto nivel.
            </p>
            <Link
              href="/contacto"
              className="btn-glow group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-8 py-3.5 text-base font-semibold text-white transition-transform hover:scale-105"
            >
              Iniciar Proyecto
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
