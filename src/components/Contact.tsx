"use client";

import { useEffect, useState, FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/SocialIcons";
import { CONTACT_EMAIL } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type ContactProps = {
  dict: Dictionary["contactForm"];
  whatsappMessage: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function Contact({ dict, whatsappMessage }: ContactProps) {
  const [status, setStatus] = useState<Status>("idle");
  // Arranca siempre en "" -- igual en el HTML pre-renderado (SSG) y en el
  // primer render del cliente -- para no arriesgar un hydration mismatch
  // en el <textarea>. Un lazy initializer que lea `window` acá se ve
  // "más directo" pero rompe justamente eso: el servidor jamás ve un
  // ?plan= real, así que si alguien entra con esa query el cliente
  // calcularía un valor distinto al que ya vino en el HTML.
  const [message, setMessage] = useState("");

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (!plan) return;
    // Depende de window.location: no hay forma de calcularlo antes de
    // montar sin repetir el mismatch de arriba.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(dict.planMessage.replace("{plan}", plan));
  }, [dict.planMessage]);

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
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative pb-10 md:pb-12">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent-violet/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
        <Reveal>
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance">
            {dict.title}
          </h2>
          <p className="mt-4 max-w-md text-muted">{dict.subtitle}</p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <Mail size={18} className="text-accent-violet" />
              </span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="transition-colors hover:text-foreground"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <a
              href={buildWhatsAppLink(whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface">
                <WhatsAppIcon size={18} className="text-accent-mint" />
              </span>
              +54 3543635504
            </a>
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
                {dict.nameLabel}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={dict.namePlaceholder}
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet focus-visible:ring-2 focus-visible:ring-accent-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-medium">
                {dict.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={dict.emailPlaceholder}
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet focus-visible:ring-2 focus-visible:ring-accent-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              />
            </div>

            <div>
              <label htmlFor="service" className="text-sm font-medium">
                {dict.serviceLabel}
              </label>
              <select
                id="service"
                name="service"
                className="mt-2 w-full rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet focus-visible:ring-2 focus-visible:ring-accent-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                {dict.services.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                {dict.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={dict.messagePlaceholder}
                className="mt-2 w-full resize-none rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm outline-none transition-colors focus:border-accent-violet focus-visible:ring-2 focus-visible:ring-accent-violet/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
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
                  {dict.submitting}
                </>
              ) : (
                <>
                  {dict.submit}
                  <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={16} />
                {dict.success}
              </p>
            )}
            {status === "error" && <p className="text-sm text-red-400">{dict.error}</p>}
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
