import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

// JSON-LD combinando Organization + ProfessionalService en una sola
// entidad (@type acepta un array): ProfessionalService ya extiende
// Organization en la jerarquía de schema.org, así que describe el mismo
// negocio dos veces sería redundante en vez de complementario.
export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/icon.png`,
    description:
      "Agencia especializada en desarrollo web de alto rendimiento, sistemas a medida, e-commerce y posicionamiento SEO.",
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Córdoba",
      addressCountry: "AR",
    },
    areaServed: "Worldwide",
    sameAs: [
      "https://www.instagram.com/softivastudio/",
      "https://www.facebook.com/profile.php?id=61594213251129",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify no sanitiza contra XSS por sí solo -- se escapa "<"
      // a su equivalente unicode, tal como recomienda la doc de Next.js.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
