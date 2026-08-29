import { Zap, Gem, Code } from "lucide-react";
import Reveal from "@/components/Reveal";

const BENEFITS = [
  {
    icon: Zap,
    title: "Velocidad Extrema",
    description:
      "Sitios optimizados que cargan en segundos, mejorando la experiencia de usuario y tu posicionamiento en buscadores.",
    accent: "text-accent-blue",
  },
  {
    icon: Gem,
    title: "Diseño Exclusivo",
    description:
      "Nada de plantillas genéricas. Cada proyecto se diseña a medida para reflejar la identidad única de tu marca.",
    accent: "text-accent-violet",
  },
  {
    icon: Code,
    title: "Código Limpio",
    description:
      "Desarrollamos con buenas prácticas y arquitectura escalable, pensando en el crecimiento futuro de tu negocio.",
    accent: "text-accent-mint",
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
              Por qué elegir Softiva
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              Resultados que se{" "}
              <span className="gradient-text">notan desde el primer día</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {BENEFITS.map(({ icon: Icon, title, description, accent }, index) => (
            <Reveal key={title} delay={index * 0.1} className="h-full">
              <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-accent-blue/40 hover:shadow-lg">
                <div
                  className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 ${accent}`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
