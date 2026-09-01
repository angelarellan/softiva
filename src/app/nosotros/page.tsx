import type { Metadata } from "next";
import { Compass, HeartHandshake, LineChart, Sparkle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { SITE_NAME } from "@/lib/site";

// Página 100% estática (SSG): sin headers()/cookies() ni fetch sin
// cache en el render, se pre-renderiza en build time.
export const dynamic = "force-static";
export const revalidate = false;

const PAGE_TITLE = "Nosotros";
const TITLE = "Nosotros | Softiva Studio";
const DESCRIPTION =
  "Conocé la filosofía de Softiva Studio: una agencia enfocada en diseño de alto nivel, código limpio y resultados medibles.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
};

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Cercanía y transparencia",
    description:
      "Trabajamos codo a codo con cada cliente, con comunicación clara en todas las etapas del proyecto.",
    accent: "text-accent-blue",
  },
  {
    icon: Sparkle,
    title: "Obsesión por el detalle",
    description:
      "Cuidamos cada pixel y cada línea de código porque sabemos que ahí está la diferencia entre lo bueno y lo excelente.",
    accent: "text-accent-violet",
  },
  {
    icon: LineChart,
    title: "Resultados medibles",
    description:
      "Diseñamos y desarrollamos con objetivos de negocio claros: más visitas, más conversiones, más clientes.",
    accent: "text-accent-mint",
  },
  {
    icon: Compass,
    title: "Innovación constante",
    description:
      "Adoptamos las mejores herramientas y tecnologías del momento para mantener a tu marca a la vanguardia.",
    accent: "text-accent-blue",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Descubrimiento",
    description:
      "Escuchamos tus objetivos, tu marca y tu público para definir el alcance ideal del proyecto.",
  },
  {
    step: "02",
    title: "Diseño",
    description:
      "Creamos wireframes y prototipos en Figma hasta llegar a una propuesta visual que te represente.",
  },
  {
    step: "03",
    title: "Desarrollo",
    description:
      "Convertimos el diseño en un sitio real, rápido y robusto, con código limpio y buenas prácticas.",
  },
  {
    step: "04",
    title: "Lanzamiento & Soporte",
    description:
      "Publicamos el proyecto y seguimos acompañándote con mantenimiento, mejoras y soporte continuo.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Una agencia que piensa en{" "}
            <span className="gradient-text">resultados, no en plantillas</span>
          </>
        }
        description="Softiva Studio nace para acompañar a marcas y negocios que quieren una presencia digital de alto nivel, sin atajos ni soluciones genéricas."
      />

      <section className="pb-10 md:pb-12">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
            Nuestra filosofía
          </h2>
          <p className="mt-4 text-muted">
            Creemos que un buen sitio web es mucho más que una vidriera:
            es una herramienta de negocio. Por eso combinamos diseño
            cuidado, desarrollo sólido y una mirada estratégica en cada
            proyecto que encaramos, para que cada línea de código y cada
            decisión visual sumen a un mismo objetivo: hacer crecer tu
            marca.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, description, accent }, index) => (
            <Reveal key={title} delay={(index % 2) * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-2 ${accent}`}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative pb-10 md:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-violet">
              Cómo trabajamos
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance">
              Un proceso claro, de principio a fin
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map(({ step, title, description }, index) => (
              <Reveal key={step} delay={(index % 4) * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                  <span className="gradient-text text-3xl font-extrabold">
                    {step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
