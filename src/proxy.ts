import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Esta versión de Next.js renombró "middleware.ts" a "proxy.ts" (deprecó
// el nombre viejo). Todas las rutas públicas viven en app/[lang]/..., pero
// el español (idioma por defecto) no debe llevar prefijo en la URL para no
// romper las rutas ya indexadas (/, /servicios, etc.). Este proxy reescribe
// internamente esas rutas a /es/... -- la URL que ve el usuario/Google no
// cambia. El inglés (/en/...) ya matchea el segmento [lang] directo, sin
// necesidad de reescritura.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(`/es${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Todo excepto _next, api, archivos estáticos/metadata y assets con
    // extensión (imágenes, video, fuentes, etc.).
    "/((?!_next|api|favicon.ico|icon.png|apple-icon.png|opengraph-image|robots.txt|sitemap.xml|llms.txt|.*\\.(?:png|jpg|jpeg|webp|avif|svg|ico|mp4|webm|woff2?)$).*)",
  ],
};
