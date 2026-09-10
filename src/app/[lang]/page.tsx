import { preload } from "react-dom";
import nextDynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import CTASection from "@/components/CTASection";

// Página 100% estática: sin headers()/cookies() ni fetch sin cache en el
// render, así que se pre-renderiza en build time (SSG) y Vercel la sirve
// desde el edge/CDN en cada visita, sin ejecutar SSR por request.
export const dynamic = "force-static";
export const revalidate = false;

// Se carga con next/dynamic (renombrado a nextDynamic para no chocar con
// el export "dynamic" de arriba) solo para separar su JS del bundle
// principal. Se mantiene ssr:true (el default): con ssr:false el
// <video poster="..."> recién se monta después de hidratar, así que el
// navegador no puede empezar a descargar el poster hasta ese momento --
// eso es lo que causaba el bloque en blanco/gris reportado en mobile. Con
// ssr:true el <video> con su poster ya está en el HTML inicial, así que
// el poster se pinta apenas llega el HTML, sin esperar a React. El video
// en sí sigue sin descargarse hasta que entra en viewport (IntersectionObserver
// dentro del propio componente).
const PromoVideo = nextDynamic(() => import("@/components/PromoVideo"));

export default function Home() {
  // Hero no tiene imágenes (solo texto): el candidato real a LCP en
  // mobile es el poster del video, que carga vía el atributo nativo
  // "poster" de <video> (no pasa por next/image, así que no acepta
  // preload/priority ahí). react-dom.preload() es la API de bajo nivel
  // que next/image usa internamente para su prop preload -- llamarla acá
  // hace que React inserte el <link rel="preload"> directo en el <head>
  // del documento (a diferencia de renderizar el <link> como JSX, que
  // solo lo deja en el punto del <body> donde se llama). Así el
  // navegador arranca la descarga del poster desde el primer byte de
  // HTML, antes de llegar al <video> en el <body>.
  preload("/promo-poster.webp", { as: "image", fetchPriority: "high" });

  return (
    <>
      <Hero />
      <PromoVideo />
      <Services />
      <WhyUs />
      <Portfolio />
      <CTASection />
    </>
  );
}
