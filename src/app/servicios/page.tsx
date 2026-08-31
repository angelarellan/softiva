import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { serviceCategories } from "@/data/services";
import { SITE_NAME } from "@/lib/site";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const TITLE = "Servicios | Softiva Studio";
const DESCRIPTION =
  "Branding, desarrollo web, marketing digital, contenido y formación: el catálogo completo de servicios de Softiva Studio.";

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

export default function ServiciosPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Todo lo que tu marca necesita para{" "}
            <span className="gradient-text">destacar online</span>
          </>
        }
        description="Desde la identidad de marca hasta la publicidad y la formación de tu equipo: un catálogo pensado para acompañar cada etapa de tu negocio."
      />

      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-28">
        {serviceCategories.map(
          ({ slug, icon: CategoryIcon, title, description, plans }, categoryIndex) => (
            <section key={slug} id={slug} className="scroll-mt-28">
              <Reveal delay={categoryIndex * 0.05}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet text-white">
                    <CategoryIcon size={26} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
                      {title}
                    </h2>
                    <p className="mt-1 max-w-2xl text-muted">{description}</p>
                  </div>
                </div>
              </Reveal>

              <div
                className={`mt-8 grid gap-6 ${
                  plans.length === 1
                    ? "max-w-xl"
                    : plans.length === 2
                    ? "sm:grid-cols-2"
                    : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {plans.map((plan, planIndex) => {
                  const whatsappHref = buildWhatsAppLink(
                    `Hola Softiva Studio, quiero consultar por el plan "${plan.title}" 🚀`
                  );
                  const contactHref = `/contacto?plan=${encodeURIComponent(plan.title)}`;

                  return (
                    <Reveal key={plan.slug} delay={planIndex * 0.1} className="h-full">
                      <div className="group relative flex h-full flex-col rounded-3xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-violet/40 hover:shadow-[0_20px_45px_-15px_rgba(155,123,234,0.3)]">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-xl font-bold leading-tight tracking-tight text-balance">
                            {plan.title}
                          </h3>
                          {plan.badge && (
                            <span className="shrink-0 rounded-full bg-accent-violet/15 px-3 py-1 text-xs font-semibold text-accent-violet">
                              {plan.badge}
                            </span>
                          )}
                        </div>

                        <p className="mt-3 text-sm text-muted">{plan.summary}</p>

                        <ul className="mt-6 flex-1 space-y-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-start gap-2 text-sm text-foreground"
                            >
                              <CheckCircle2
                                size={18}
                                className="mt-0.5 shrink-0 text-accent-mint"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-glow inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
                          >
                            <MessageCircle size={16} />
                            Consultar por WhatsApp
                          </a>
                          <Link
                            href={contactHref}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-surface-2 px-5 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent-violet/60 hover:bg-surface"
                          >
                            Cotizar Plan
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </section>
          )
        )}
      </div>

      <FAQ />

      <CTASection />
    </>
  );
}
