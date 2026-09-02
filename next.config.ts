import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Default de Next.js 16 es solo webp; se suma avif (más liviano en
    // pantallas mobile) como primera opción, con webp de fallback para
    // navegadores que no soportan avif.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/robot.txt",
        destination: "/robots.txt",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Se aplica a toda ruta del sitio (páginas, API, assets).
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Assets propios de public/ (imágenes, video, favicons, fuentes):
        // son archivos con nombre fijo, no hasheado por build, así que un
        // cambio de contenido implica subir un archivo nuevo o cambiar el
        // nombre -- cachearlos como immutable por 1 año es seguro.
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|webp|avif|svg|mp4|webm|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
