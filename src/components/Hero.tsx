import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-16">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-blue/25 blur-[120px]" />
        <div className="animate-float-slower absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-accent-violet/25 blur-[120px]" />
        <div className="animate-float-slow absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-mint/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5 text-sm text-muted shadow-sm backdrop-blur">
          <Sparkles size={14} className="text-accent-violet" />
          Agencia de desarrollo web &amp; diseño digital
        </div>

        <h1
          className="animate-fade-up text-4xl font-extrabold tracking-tight text-balance sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "0.1s" }}
        >
          Transformamos ideas en{" "}
          <span className="gradient-text">experiencias digitales</span>
        </h1>

        <p
          className="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl"
          style={{ animationDelay: "0.2s" }}
        >
          En Softiva creamos páginas web y diseños de alto nivel: rápidos,
          modernos y pensados para convertir. Llevamos tu marca al siguiente
          nivel con tecnología y diseño de punta.
        </p>

        <div
          className="animate-fade-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/contacto"
            className="btn-glow group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-8 py-3.5 text-base font-semibold text-white transition-transform hover:scale-105"
          >
            Iniciar Proyecto
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-8 py-3.5 text-base font-semibold text-foreground shadow-sm backdrop-blur transition-colors hover:border-accent-violet/60 hover:bg-surface-2"
          >
            Ver Portafolio
          </Link>
        </div>
      </div>
    </section>
  );
}
