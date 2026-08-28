import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacto — Softiva",
  description:
    "Contanos sobre tu proyecto y recibí una propuesta a medida de Softiva.",
};

export default function ContactoPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contacto"
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
