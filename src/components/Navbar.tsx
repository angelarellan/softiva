"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Softiva <span className="gradient-text">Studio</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
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

        <Link
          href="/contacto"
          className="btn-glow hidden rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-2 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg md:inline-block"
        >
          Iniciar Proyecto
        </Link>

        <button
          className="text-foreground md:hidden"
          aria-label="Abrir menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-4 backdrop-blur-lg md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contacto"
                className="mt-2 inline-block rounded-full bg-gradient-to-r from-accent-blue to-accent-violet px-5 py-2 text-sm font-semibold text-white"
              >
                Iniciar Proyecto
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
