"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { localeHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/app/[lang]/dictionaries";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary["nav"];
  whatsappMessage: string;
};

export default function Navbar({ locale, dict, whatsappMessage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: localeHref(locale, "/"), path: "/", label: dict.inicio },
    { href: localeHref(locale, "/servicios"), path: "/servicios", label: dict.servicios },
    { href: localeHref(locale, "/portafolio"), path: "/portafolio", label: dict.portafolio },
    { href: localeHref(locale, "/nosotros"), path: "/nosotros", label: dict.nosotros },
    { href: localeHref(locale, "/contacto"), path: "/contacto", label: dict.contacto },
  ];

  // Cierra el menú mobile al cambiar de ruta. Se ajusta durante el render
  // (patrón "Adjusting state when a prop changes" de React) en vez de con
  // un useEffect, para no disparar un render de más solo para resetear
  // este estado.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href={localeHref(locale, "/")} className="text-xl font-bold tracking-tight">
          Softiva <span className="gradient-text">Studio</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const active =
              link.path === "/" ? pathname === link.href : pathname.startsWith(link.href);
            return (
              <li key={link.path}>
                <Link
                  href={link.href}
                  className={`text-sm transition-colors hover:text-foreground ${
                    active ? "font-semibold text-foreground" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher
            currentLocale={locale}
            ariaLabel={dict.seleccionarIdioma}
            ariaLabelOptions={dict.idiomasDisponibles}
          />
          <a
            href={buildWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg"
          >
            {dict.cotizar}
          </a>
        </div>

        <button
          className="text-foreground md:hidden"
          aria-label={open ? dict.cerrarMenu : dict.abrirMenu}
          aria-expanded={open}
          aria-controls="mobile-nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-nav-menu"
          className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.href}
                  className="block text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <LanguageSwitcher
                currentLocale={locale}
                ariaLabel={dict.seleccionarIdioma}
                ariaLabelOptions={dict.idiomasDisponibles}
                variant="inline"
              />
            </li>
            <li>
              <a
                href={buildWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-2 text-sm font-semibold text-white"
              >
                {dict.cotizar}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
