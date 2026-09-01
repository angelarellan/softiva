"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function PromoVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Solo empezamos a descargar/reproducir el video cuando entra en viewport,
  // sin importar que el <video> tenga autoPlay: sin <source> no hay nada
  // que reproducir hasta que el IntersectionObserver lo habilite. Esto
  // evita que el video pese en el LCP/FCP de la carga inicial.
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
      // reproducción manualmente tocando el video.
    });
  }, [shouldLoad]);

  // En pantalla completa (fullscreen API en desktop/Android, o el player
  // nativo de iOS vía webkitbeginfullscreen) pasamos de object-cover a
  // object-contain para que el video no se recorte contra el aspect ratio
  // de la pantalla del dispositivo.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === video);
    };
    const handleWebkitBegin = () => setIsFullscreen(true);
    const handleWebkitEnd = () => setIsFullscreen(false);

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    video.addEventListener("webkitbeginfullscreen", handleWebkitBegin);
    video.addEventListener("webkitendfullscreen", handleWebkitEnd);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      video.removeEventListener("webkitbeginfullscreen", handleWebkitBegin);
      video.removeEventListener("webkitendfullscreen", handleWebkitEnd);
    };
  }, []);

  function toggleMute() {
    const next = !muted;
    const video = videoRef.current;
    if (video) video.muted = next;
    setMuted(next);
  }

  return (
    <section className="py-10 md:py-12">
      <div ref={containerRef} className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-black shadow-sm">
            <video
              ref={videoRef}
              className={`aspect-video w-full ${
                isFullscreen ? "object-contain" : "object-cover"
              }`}
              poster="/video-promo-poster.jpg"
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="none"
            >
              {shouldLoad && <source src="/video-promo.mp4" type="video/mp4" />}
            </video>

            {shouldLoad && (
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Activar sonido" : "Silenciar"}
                className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-all duration-200 hover:scale-110 hover:bg-black/70"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
