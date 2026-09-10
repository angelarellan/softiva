"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";
import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookies";

type CookieBannerProps = {
  title: string;
  description: string;
  acceptLabel: string;
  closeLabel: string;
};

export default function CookieBanner({
  title,
  description,
  acceptLabel,
  closeLabel,
}: CookieBannerProps) {
  // Arranca en false tanto en SSR como en el primer render del cliente --
  // localStorage no existe en el servidor, así que un chequeo sincrónico
  // acá adentro (incluso con un lazy initializer) reproduciría el mismo
  // hydration mismatch que ya se corrigió en PromoVideo/Contact hace poco.
  // La decisión real se toma recién en el efecto, después de hidratar:
  // para un visitante que ya aceptó, el banner nunca llega a aparecer
  // (sigue "devolviendo null" en la práctica), pero sin arriesgar el
  // render inicial.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) !== "true") {
        // Depende de localStorage, que no existe en el servidor: no hay
        // forma de calcular esto antes de montar sin repetir el mismatch
        // de hidratación que ya se corrigió en PromoVideo/Contact.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVisible(true);
      }
    } catch {
      // Modo privado agresivo / localStorage bloqueado: no rompemos nada,
      // simplemente no mostramos el banner.
    }
  }, []);

  function accept(method: "accept_button" | "dismiss") {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "true");
    } catch {
      // Igual que arriba: si no se puede persistir, al menos se oculta
      // por esta visita.
    }

    // Google Consent Mode v2: layout.tsx ya seteó el default en "denied"
    // antes de que GA4 se inicialice. Recién acá, cuando el usuario
    // interactúa con el banner, se actualiza a "granted" -- si sendGAEvent
    // no tiene efecto (GA4 no está activo: preview/local/build sin
    // VERCEL_ENV=production), no rompe nada, solo hace un console.warn.
    sendGAEvent("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    sendGAEvent("event", "cookie_consent", { method });

    // Meta Pixel: layout.tsx ya llama a fbq('consent','revoke') antes del
    // primer 'init', así que el pixel arranca sin trackear. window.fbq ya
    // encola cualquier llamada aunque fbevents.js todavía no haya
    // terminado de cargar, así que esto es seguro llamarlo apenas se
    // monta el bootstrap (y un no-op si GA4/Pixel no están activos:
    // preview/local).
    window.fbq?.("consent", "grant");

    // Push directo al dataLayer con la forma de "evento custom" (la que
    // entendería un GTM si alguna vez se suma) -- complementa, no
    // reemplaza, los sendGAEvent(...) de arriba (esos usan el formato de
    // argumentos de gtag.js, que es lo que la instancia de GA4 de este
    // sitio efectivamente procesa).
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "cookie_consent_update",
        consent_status: "granted",
      });
    }

    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/75 backdrop-blur-md">
      <div className="relative mx-auto max-w-4xl px-6 py-5">
        <button
          type="button"
          onClick={() => accept("dismiss")}
          aria-label={closeLabel}
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        <div className="flex flex-col items-center gap-4 pr-8 text-center sm:flex-row sm:justify-between sm:pr-10 sm:text-left">
          <div>
            <p className="text-sm font-semibold text-white">{title}</p>
            <p className="mt-1 max-w-xl text-xs leading-relaxed text-white/70">
              {description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => accept("accept_button")}
            className="btn-glow inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
          >
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
