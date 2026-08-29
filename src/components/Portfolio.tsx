import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import Reveal from "@/components/Reveal";

export default function Portfolio() {
  const featured = projects.slice(0, 3);

  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-violet">
              Portafolio
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Proyectos que <span className="gradient-text">hablan por sí solos</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.1}>
              <Link
                href="/portafolio"
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/45" />

                <div className="relative flex h-full flex-col justify-end p-6">
                  <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                      Ver proyecto <ExternalLink size={12} />
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/85">{project.category}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-accent-violet/60 hover:bg-surface-2"
          >
            Ver portafolio completo
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
