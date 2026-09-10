"use client";

import { COOKIE_CONSENT_STORAGE_KEY } from "@/lib/cookies";

type CookiePreferencesLinkProps = {
  label: string;
  className?: string;
};

// Sin esto, una vez que alguien clickea "Aceptar" (o cierra con la X) no
// hay forma de volver a ver el banner ni de retirar el consentimiento --
// varias normativas de cookies piden justamente que sea igual de fácil
// retractarse que aceptar. Borra la key y recarga: CookieBanner ya vuelve
// a mostrarse solo porque su propio efecto de montaje no encuentra la key
// en localStorage (mismo mecanismo, sin necesitar estado compartido).
export default function CookiePreferencesLink({ label, className }: CookiePreferencesLinkProps) {
  function handleClick() {
    try {
      localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
    } catch {
      // Nada que hacer si localStorage está bloqueado.
    }
    window.location.reload();
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
