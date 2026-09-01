import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { SITE_NAME } from "@/lib/site";

// Página 100% estática (SSG): el formulario en sí es un componente
// cliente que lee ?plan= con window.location en un useEffect, no server-
// side, así que la página no depende de headers()/cookies()/searchParams
// en el render y se puede pre-renderizar en build time.
export const dynamic = "force-static";
export const revalidate = false;

const PAGE_TITLE = "Contacto";
const TITLE = "Contacto | Softiva Studio";
const DESCRIPTION =
  "Contanos sobre tu proyecto y recibí una propuesta a medida de Softiva Studio.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        title={
          <>
            Hablemos de tu{" "}
            <span className="gradient-text">próximo proyecto</span>
          </>
        }
        description="Completá el formulario y te respondemos a la brevedad con una propuesta a medida para tu marca o negocio."
      />
      <Contact />
    </>
  );
}
