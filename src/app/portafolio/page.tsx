import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Portafolio — Softiva",
  description:
    "Proyectos de desarrollo web, e-commerce, dashboards y branding realizados por Softiva.",
};

export default function PortafolioPage() {
  return (
    <>
      <PageHeader
        eyebrow="Portafolio"
        title={
          <>
            Proyectos que{" "}
            <span className="gradient-text">hablan por sí solos</span>
          </>
        }
        description="Una selección de trabajos de demostración que muestran el estilo y la calidad con la que encaramos cada proyecto."
      />

      <section className="pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/85">{project.category}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm text-muted">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted">
            * Proyectos de demostración con fines ilustrativos.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
