import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-violet">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Todo lo que tu marca necesita para{" "}
            <span className="gradient-text">destacar online</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map(({ slug, icon: Icon, title, summary }) => (
            <div
              key={slug}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-accent-violet/40 hover:shadow-[0_20px_45px_-15px_rgba(155,123,234,0.3)]"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-blue to-accent-violet text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Icon size={26} />
              </div>

              <h3 className="relative text-xl font-semibold">{title}</h3>
              <p className="relative mt-3 text-muted">{summary}</p>

              <Link
                href="/servicios"
                className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-blue transition-colors hover:text-accent-violet"
              >
                Ver más
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold shadow-sm transition-colors hover:border-accent-violet/60 hover:bg-surface-2"
          >
            Ver todos los servicios
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
