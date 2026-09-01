"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";

export default function PromoVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Solo empezamos a descargar/reproducir el video cuando entra en viewport,
  // sin importar que el <video> tenga autoPlay: sin <source> no hay nada
  // que reproducir hasta que el IntersectionObserver lo habilite.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    video.load();
    video.play().catch(() => {
      // Autoplay bloqueado por el navegador: el usuario puede iniciar la
      // reproducción manualmente con los controles nativos.
    });
  }, [shouldLoad]);

  return (
    <section className="py-10 md:py-12">
      <div ref={containerRef} className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border shadow-sm">
            <video
              ref={videoRef}
              className="aspect-video w-full object-cover"
              poster="/video-promo-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="none"
              controls
            >
              {shouldLoad && <source src="/video-promo.mp4" type="video/mp4" />}
            </video>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
