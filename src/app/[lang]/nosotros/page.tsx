import type { Metadata } from "next";
import { Compass, HeartHandshake, LineChart, Sparkle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "../dictionaries";

// Página 100% estática (SSG): sin headers()/cookies() ni fetch sin
// cache en el render, se pre-renderiza en build time.
export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { pageTitle, metaTitle, metaDescription } = dict.aboutPage;
  const alternates = buildAlternates(locale, "/nosotros", SITE_URL);

  return {
    title: pageTitle,
    description: metaDescription,
    alternates,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
      siteName: SITE_NAME,
    },
  };
}

const VALUE_ICONS = [HeartHandshake, Sparkle, LineChart, Compass];
const VALUE_ACCENTS = ["text-accent-blue", "text-accent-violet", "text-accent-mint", "text-accent-blue"];

export default async function NosotrosPage() {
  const dict = await getDictionary();
  const { aboutPage } = dict;

  return (
    <>
      <PageHeader
        title={
          <>
            {aboutPage.headerTitlePre}{" "}
            <span className="gradient-text">{aboutPage.headerTitleHighlight}</span>
          </>
        }
        description={aboutPage.headerDescription}
      />

      <section className="pb-10 md:pb-12">
        <Reveal className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
            {aboutPage.philosophyTitle}
          </h2>
          <p className="mt-4 text-muted">{aboutPage.philosophyText}</p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 sm:grid-cols-2">
          {aboutPage.values.map(({ title, description }, index) => {
            const Icon = VALUE_ICONS[index];
            return (
              <Reveal key={title} delay={(index % 2) * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-2 ${VALUE_ACCENTS[index]}`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="relative pb-10 md:pb-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-surface to-transparent" />

        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-violet">
              {aboutPage.processEyebrow}
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-balance">
              {aboutPage.processTitle}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.process.map(({ title, description }, index) => (
              <Reveal key={title} delay={(index % 4) * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                  <span className="gradient-text text-3xl font-extrabold">
                    {String(index + 1).padStart(2, "0")}
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
