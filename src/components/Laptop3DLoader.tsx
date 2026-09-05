"use client";

import dynamic from "next/dynamic";

// ssr:false es obligatorio acá (a diferencia del video plano que
// reemplaza): un <Canvas> de WebGL no existe en Node, no hay forma de
// server-renderizarlo. Por eso este wrapper cliente existe aparte de
// page.tsx (Server Component): "ssr: false" en next/dynamic solo está
// permitido dentro de un Client Component.
const Laptop3D = dynamic(() => import("@/components/Laptop3D"), {
  ssr: false,
  loading: () => (
    <section className="py-8 md:pt-12 md:pb-12">
      <div className="aspect-video w-full animate-pulse bg-slate-900" />
    </section>
  ),
});

export default function Laptop3DLoader() {
  return <Laptop3D />;
}
