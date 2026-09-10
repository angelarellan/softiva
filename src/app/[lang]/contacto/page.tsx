import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { buildAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "../dictionaries";

// Página 100% estática (SSG): el formulario en sí es un componente
// cliente que lee ?plan= con window.location en un useEffect, no server-
// side, así que la página no depende de headers()/cookies()/searchParams
// en el render y se puede pre-renderizar en build time.
export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = await getDictionary();
  const { pageTitle, metaTitle, metaDescription } = dict.contactPage;
  const alternates = buildAlternates(locale, "/contacto", SITE_URL);

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

export default async function ContactoPage() {
  const dict = await getDictionary();

  return (
    <>
      <PageHeader
        title={
          <>
            {dict.contactPage.headerTitlePre}{" "}
            <span className="gradient-text">{dict.contactPage.headerTitleHighlight}</span>
          </>
        }
        description={dict.contactPage.headerDescription}
      />
      <Contact dict={dict.contactForm} whatsappMessage={dict.whatsapp.floatMessage} />
    </>
  );
}
