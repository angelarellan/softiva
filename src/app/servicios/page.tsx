import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Servicios | Softiva";
const DESCRIPTION =
  "Desarrollo web, diseño UI/UX y mantenimiento web de alto nivel para tu marca.";

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
        description="Desde el primer wireframe hasta el mantenimiento continuo, acompañamos cada etapa del ciclo de vida de tu producto digital."
      />

      <section className="pb-28">
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6">
          {services.map(({ slug, icon: Icon, title, description, features }, index) => (
            <Reveal key={slug} id={slug} delay={index * 0.1} className="scroll-mt-32">
              <div className="grid gap-8 rounded-3xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-lg sm:p-10 lg:grid-cols-[auto_1fr]">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue to-accent-violet text-white">
                  <Icon size={30} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance">{title}</h2>
                  <p className="mt-3 text-muted">{description}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {features.map((feature) => (
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
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <FAQ />

      <CTASection />
    </>
  );
}
