"use client";

import dynamic from "next/dynamic";

// `ssr: false` solo está permitido dentro de un Client Component: por eso
// este wrapper existe aparte de page.tsx (que es un Server Component). Así
// el HTML de Servicios/Portafolio/Footer se genera y pinta sin esperar a
// que el bundle del video se resuelva en el cliente.
const PromoVideo = dynamic(() => import("@/components/PromoVideo"), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full animate-pulse bg-slate-900" />
  ),
});

export default function PromoVideoLoader() {
  return <PromoVideo />;
}
