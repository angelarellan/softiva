import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import CTASection from "@/components/CTASection";

// Se carga con next/dynamic para separar su JS (play/pause, mute,
// fullscreen) del bundle principal. Se mantiene ssr:true (el default):
// desactivarlo dejaría el poster y el <video> afuera del HTML inicial,
// generando el mismo hueco en blanco que se busca eliminar. El video en
// sí ya se descarga de forma diferida vía IntersectionObserver dentro
// del propio componente.
const PromoVideo = dynamic(() => import("@/components/PromoVideo"));

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
