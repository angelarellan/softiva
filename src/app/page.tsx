import Hero from "@/components/Hero";
import PromoVideoLoader from "@/components/PromoVideoLoader";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import CTASection from "@/components/CTASection";

// Página 100% estática: sin headers()/cookies() ni fetch sin cache en el
// render, así que se pre-renderiza en build time (SSG) y Vercel la sirve
// desde el edge/CDN en cada visita, sin ejecutar SSR por request.
export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <>
      <Hero />
      <PromoVideoLoader />
      <Services />
      <WhyUs />
      <Portfolio />
      <CTASection />
    </>
  );
}
