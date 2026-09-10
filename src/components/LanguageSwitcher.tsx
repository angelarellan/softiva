"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import { LOCALES, localeHref, type Locale } from "@/lib/i18n";

const LANGUAGE_LABELS: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

// El pathname que da usePathname() es el que ve el navegador (el proxy que
// reescribe "/" -> "/es" es invisible del lado del cliente), así que solo
// hay que despegar el prefijo "/en" para volver al path canónico.
function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

type LanguageSwitcherProps = {
  currentLocale: Locale;
  ariaLabel: string;
  ariaLabelOptions: string;
  // "dropdown": panel flotante hacia abajo, para la barra desktop.
  // "inline": se expande en el flujo normal del documento, para el menú
  // mobile (evita el dropdown flotante desalineado en un drawer angosto).
  // "circle": botón circular idéntico a los íconos sociales, para el
  // Footer -- el panel abre hacia arriba porque el footer ya está pegado
  // al borde inferior de la pantalla.
  variant?: "dropdown" | "inline" | "circle";
};

export default function LanguageSwitcher({
  currentLocale,
  ariaLabel,
  ariaLabelOptions,
  variant = "dropdown",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const canonicalPath = stripLocalePrefix(pathname);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (variant === "inline") return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, variant]);

  const currentLabel = currentLocale.toUpperCase();

  const options = LOCALES.map((code) => (
    <li key={code}>
      <Link
        href={localeHref(code, canonicalPath)}
        role="option"
        aria-selected={code === currentLocale}
        onClick={() => setOpen(false)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2 ${
          code === currentLocale ? "font-medium text-foreground" : "text-muted"
        }`}
      >
        {LANGUAGE_LABELS[code]}
        {code === currentLocale && (
          <Check size={14} className="shrink-0 text-accent-violet" aria-hidden="true" />
        )}
      </Link>
    </li>
  ));

  if (variant === "circle") {
    return (
      <div ref={wrapperRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-xs font-semibold text-background/70 transition-all duration-200 hover:scale-[1.08] hover:border-accent-violet/60 hover:text-background"
        >
          {currentLabel}
        </button>
        {open && (
          <ul
            role="listbox"
            aria-label={ariaLabelOptions}
            className="absolute bottom-full right-0 z-[60] mb-2 w-36 rounded-xl border border-border bg-surface p-1.5 text-left shadow-lg"
          >
            {options}
          </ul>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={ariaLabel}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-1.5 rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-accent-violet/60 hover:text-foreground"
        >
          <span className="inline-flex items-center gap-1.5">
            <Globe size={16} aria-hidden="true" />
            {currentLabel}
          </span>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <ul role="listbox" aria-label={ariaLabelOptions} className="mt-1 space-y-0.5">
            {options}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent-violet/60 hover:text-foreground"
      >
        <Globe size={16} aria-hidden="true" />
        {currentLabel}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabelOptions}
          className="absolute right-0 top-full z-[60] mt-2 w-40 rounded-xl border border-border bg-surface p-1.5 shadow-lg"
        >
          {options}
        </ul>
      )}
    </div>
  );
}
