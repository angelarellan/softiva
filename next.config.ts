import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
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
