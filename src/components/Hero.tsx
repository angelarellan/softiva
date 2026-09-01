import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden pt-16 md:min-h-screen">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-accent-blue/25 blur-[120px]" />
        <div className="animate-float-slower absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-accent-violet/25 blur-[120px]" />
        <div className="animate-float-slow absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-mint/20 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-8 text-center md:py-24">
        <Reveal>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Transformamos ideas en{" "}
            <span className="gradient-text">experiencias digitales</span>
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted sm:text-xl">
            En Softiva Studio creamos páginas web y diseños de alto nivel: rápidos,
            modernos y pensados para convertir. Llevamos tu marca al siguiente
            nivel con tecnología y diseño de punta.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contacto"
              className="btn-glow group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
            >
              Iniciar Proyecto
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/portafolio"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-8 py-3.5 text-base font-semibold text-foreground shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-accent-violet/60 hover:bg-surface-2"
            >
              Ver Portafolio
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
