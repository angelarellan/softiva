import "server-only";
import { notFound } from "next/navigation";
import { lang as getLangRootParam } from "next/root-params";
import { hasLocale, type Locale } from "@/lib/i18n";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

const dictionaries = { es, en };

export type Dictionary = typeof es;

async function resolveLocale(): Promise<Locale> {
  const locale = await getLangRootParam();
  if (!locale || !hasLocale(locale)) notFound();
  return locale;
}

// Se lee el segmento [lang] con next/root-params en vez de recibirlo por
// props en cada componente -- así Hero, Footer, Navbar, etc. llaman
// getDictionary() directo (siguen siendo Server Components async, cero JS
// nuevo en el cliente) sin necesidad de reenviar `lang` manualmente por
// cada capa del árbol.
export async function getDictionary(): Promise<Dictionary> {
  const locale = await resolveLocale();
  return dictionaries[locale];
}

export async function getLocale(): Promise<Locale> {
  return resolveLocale();
}
