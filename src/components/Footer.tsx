"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL } from "@/lib/site";
import FooterMarquee from "@/components/FooterMarquee";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/softivastudio/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594213251129", Icon: FacebookIcon },
];

const SERVICE_LINKS = [
  { label: "Branding & Presencia Digital", href: "/servicios#branding" },
  { label: "Desarrollo Web & Ecommerce", href: "/servicios#desarrollo-web-ecommerce" },
  { label: "Marketing Digital & Ads", href: "/servicios#marketing-performance" },
  { label: "Contenido & Redes Sociales", href: "/servicios#contenido-redes" },
  { label: "Formación & Capacitación", href: "/servicios#formacion" },
];

const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Portafolio", href: "/portafolio" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const WHATSAPP_MESSAGE = "Hola Softiva Studio, quiero iniciar un proyecto 🚀";

export default function Footer() {
  const pathname = usePathname();

  function handleHomeClick(e: MouseEvent<HTMLAnchorElement>) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-background/10 bg-foreground text-background">
      <FooterMarquee />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-y-12 text-center lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-x-8 lg:text-left">
          <div>
            <Link
              href="/"
              onClick={handleHomeClick}
              className="text-xl font-bold tracking-tight text-background"
            >
              Softiva <span className="gradient-text">Studio</span>
            </Link>
            <p className="mx-auto mt-4 max-w-xs text-sm text-background/80 lg:mx-0">
              Desarrollo web y diseño digital de alto nivel para marcas que
              quieren destacar.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-background/70 transition-all duration-200 hover:scale-[1.08] hover:border-accent-violet/60 hover:text-background"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Servicios
            </h3>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/75 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Navegación
            </h3>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={link.href === "/" ? handleHomeClick : undefined}
                    className="text-sm text-background/75 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              Contacto
            </h3>
            <div className="mt-4 rounded-2xl border border-accent-violet/30 bg-background/[0.04] p-5">
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="flex items-center justify-center gap-2 text-sm text-background/80 transition-colors hover:text-background lg:justify-start"
                  >
                    <Mail size={16} className="shrink-0 text-accent-violet" />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppLink(WHATSAPP_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-sm text-background/80 transition-colors hover:text-background lg:justify-start"
                  >
                    <MessageCircle size={16} className="shrink-0 text-accent-mint" />
                    +54 3543635504
                  </a>
                </li>
                <li className="flex flex-col items-center gap-1.5 text-center text-sm text-background/80 lg:flex-row lg:items-start lg:gap-2 lg:text-left">
                  <MapPin size={16} className="shrink-0 text-accent-blue" />
                  <span>Atención personalizada para proyectos globales.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-background/10 pt-8 text-center">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Softiva Studio. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
