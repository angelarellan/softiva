import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import { SITE_NAME } from "@/lib/site";

const TITLE = "Contacto | Softiva";
const DESCRIPTION =
  "Contanos sobre tu proyecto y recibí una propuesta a medida de Softiva.";

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
