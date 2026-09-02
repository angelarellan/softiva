"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Reveal from "@/components/Reveal";

const CONTROL_BUTTON_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/80";

export default function PromoVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
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
      // Autoplay bloqueado por el navegador: el usuario puede arrancar la
      // reproducción manualmente con el botón de play.
      setIsPlaying(false);
    });
  }, [shouldLoad]);

  // Mantiene el ícono de play/pausa sincronizado con el estado real del
  // video (por si se pausa/reanuda por fuera de nuestros propios botones).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

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

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;

    const next = !muted;
    video.muted = next;
    video.volume = 1.0;
    setMuted(next);

    // Si el navegador frena el audio por su política de autoplay, forzamos
    // un play() limpio (ya disparado por el propio click del usuario) para
    // que la reproducción con sonido siga sin cortes al desmutear.
    if (!next) {
      video.play().catch(() => {});
    }
  }

  return (
    <section className="py-8 md:pt-12 md:pb-12">
      <div ref={containerRef} className="w-full">
        <Reveal>
          <div className="relative w-full overflow-hidden bg-black">
            <video
              ref={videoRef}
              className={`aspect-video w-full ${
                isFullscreen ? "object-contain" : "object-cover"
              }`}
              poster="/promo-poster.webp"
              {...({ fetchpriority: "high" } as React.VideoHTMLAttributes<HTMLVideoElement>)}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="none"
            >
              {shouldLoad && <source src="/video-promo.mp4" type="video/mp4" />}
            </video>

            {shouldLoad && (
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar" : "Reproducir"}
                  className={CONTROL_BUTTON_CLASS}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={muted ? "Activar sonido" : "Silenciar"}
                  className={CONTROL_BUTTON_CLASS}
                >
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
