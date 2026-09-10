import { Zap, Gem, Code } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/app/[lang]/dictionaries";

const ICONS = [Zap, Gem, Code];
const ACCENTS = ["text-accent-blue", "text-accent-violet", "text-accent-mint"];

export default async function WhyUs() {
  const dict = await getDictionary();
  const { eyebrow, titlePre, titleHighlight, benefits } = dict.home.whyUs;

  return (
    <section className="relative py-10 md:py-12 [content-visibility:auto] [contain-intrinsic-size:auto_800px]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-blue">
              {eyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
              {titlePre} <span className="gradient-text">{titleHighlight}</span>
            </h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {benefits.map(({ title, description }, index) => {
            const Icon = ICONS[index];
            return (
              <Reveal key={title} delay={index * 0.1} className="h-full">
                <div className="flex h-full flex-col items-center rounded-2xl border border-border bg-surface p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-accent-blue/40 hover:shadow-lg">
                  <div
                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 ${ACCENTS[index]}`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
