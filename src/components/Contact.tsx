"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import Reveal from "@/components/Reveal";

const SERVICES = [
  "Desarrollo Web & Landing Pages",
  "Diseño UI/UX",
  "Mantenimiento Web",
  "Otro",
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      service: data.get("service"),
      message: data.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative pb-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent-violet/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">
            Nuestros datos de contacto
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Contanos qué necesitás y te respondemos a la brevedad con una
            propuesta a medida para tu marca o negocio.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <Mail size={18} className="text-accent-violet" />
              </span>
              hola@softiva.com
            </div>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <MapPin size={18} className="text-accent-violet" />
              </span>
              Atención personalizada para proyectos globales.
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-surface p-8 shadow-sm"
        >
          <div className="grid gap-5">
            <div>
              <label htmlFor="name" className="text-sm font-medium">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Tu nombre completo"
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet"
              />
            </div>

            <div>
              <label htmlFor="service" className="text-sm font-medium">
                Servicio de interés
              </label>
              <select
                id="service"
                name="service"
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet"
              >
                {SERVICES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Contanos sobre tu proyecto..."
                className="mt-2 w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-glow inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  Enviar Mensaje
                  <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} />
                ¡Mensaje enviado! Te responderemos pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">
                Ocurrió un error al enviar. Intentá nuevamente.
              </p>
            )}
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
