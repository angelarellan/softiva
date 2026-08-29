import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Portafolio | Softiva";
const DESCRIPTION =
  "Proyectos de desarrollo web, e-commerce, dashboards y branding realizados por Softiva.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function PortafolioPage() {
  return (
    <>
      <PageHeader
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
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 3) * 0.1} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
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

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm text-muted">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
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
              </Reveal>
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
