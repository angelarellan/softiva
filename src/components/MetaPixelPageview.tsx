"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// El script base del Pixel (en layout.tsx) ya dispara el primer
// "PageView" apenas se inicializa. Como el App Router navega entre
// rutas del lado del cliente sin recargar la página, ese script no
// vuelve a ejecutarse solo -- así que este componente dispara los
// PageView de las navegaciones siguientes, salteando el primer render
// para no duplicar el que ya cuenta el script base.
export default function MetaPixelPageview() {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
}
