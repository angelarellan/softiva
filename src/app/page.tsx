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
// el export "dynamic" de arriba) para separar su JS (play/pause, mute,
// fullscreen) del bundle principal. Se mantiene ssr:true (el default):
// desactivarlo dejaría el poster y el <video> afuera del HTML inicial,
// generando el mismo hueco en blanco que se busca eliminar. El video en
// sí ya se descarga de forma diferida vía IntersectionObserver dentro
// del propio componente.
const PromoVideo = nextDynamic(() => import("@/components/PromoVideo"));

export default function Home() {
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
