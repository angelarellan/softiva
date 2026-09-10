"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type ScrollTopLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

// Único motivo por el que Footer necesitaba ser un Client Component
// completo: el link al Home debe hacer scroll suave en vez de navegar si
// ya estamos ahí. Aislado acá, el resto del Footer (textos, links de
// servicios, contacto) queda como Server Component sin JS asociado.
// Compara contra el pathname actual en vez de contra "/" a secas porque el
// Home en inglés vive en "/en" (localeHref ya resuelve el href correcto).
export default function ScrollTopLink({ href, className, children }: ScrollTopLinkProps) {
  const pathname = usePathname();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (href === pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
