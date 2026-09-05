"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
  RoundedBox,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_SRC = "/video-promo.mp4";

// Dimensiones en unidades arbitrarias de Three.js (no hay .glb: todo se
// construye con primitivas). El "book cover" del lid se modela ya en su
// pose abierta (eje Y local = de la bisagra hacia arriba, cara +Z local =
// la pantalla mirando a cámara) en vez de simular una tapa cerrada que
// rota -- así el signo de la rotación es trivial de razonar: una
// inclinación negativa en X sobre el grupo de la bisagra empuja el borde
// superior de la pantalla hacia -Z (atrás), que es exactamente la
// reclinación natural de una laptop abierta.
const BASE_W = 3.4;
const BASE_D = 2.2;
const BASE_H = 0.12;
const LID_H = 0.08;
const LID_OPEN_TILT = -0.32; // ~-18°, reclinación natural del lid abierto

const SCREEN_W = 3.0;
const SCREEN_H = (SCREEN_W * 9) / 16; // el video real es 1280x720 (16:9)
const BEZEL_W = SCREEN_W + 0.12;
const BEZEL_H = SCREEN_H + 0.12;

function useVideoTexture(src: string) {
  const [texture, setTexture] = useState<THREE.VideoTexture | null>(null);

  useEffect(() => {
    // El <video> se crea en memoria, nunca se inserta en el DOM visible --
    // no hace falta: los navegadores decodifican y reproducen igual un
    // <video> desconectado del documento, y evitamos el truco de ocultarlo
    // con estilos (display:none puede pausar el video en algunos navegadores).
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play().catch(() => {});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    // El texture solo puede crearse acá (necesita el <video> del DOM, que
    // a su vez solo existe del lado del cliente): no hay forma de mover
    // esto a un lazy initializer de useState como en el caso de abajo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTexture(videoTexture);

    return () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      videoTexture.dispose();
    };
  }, [src]);

  return texture;
}

function LaptopModel({ videoTexture }: { videoTexture: THREE.VideoTexture | null }) {
  const bodyMaterial = (
    <meshPhysicalMaterial
      color="#2a2c33"
      metalness={0.75}
      roughness={0.35}
      clearcoat={0.25}
      clearcoatRoughness={0.3}
    />
  );

  return (
    <group>
      {/* Base / plataforma del teclado */}
      <RoundedBox
        args={[BASE_W, BASE_H, BASE_D]}
        radius={0.06}
        smoothness={4}
        position={[0, -BASE_H / 2, 0]}
        castShadow
        receiveShadow
      >
        {bodyMaterial}
      </RoundedBox>

      {/* Inserto oscuro sugiriendo el deck del teclado */}
      <RoundedBox
        args={[BASE_W - 0.4, 0.012, BASE_D - 0.6]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.006, -0.1]}
      >
        <meshStandardMaterial color="#17181c" metalness={0.3} roughness={0.7} />
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox
        args={[0.9, 0.008, 0.55]}
        radius={0.04}
        smoothness={3}
        position={[0, 0.007, 0.55]}
      >
        <meshStandardMaterial color="#3a3c42" metalness={0.5} roughness={0.4} />
      </RoundedBox>

      {/* Grupo de la bisagra: pivotea en el borde trasero de la base */}
      <group position={[0, 0, -BASE_D / 2]} rotation={[LID_OPEN_TILT, 0, 0]}>
        {/* Cilindro de la bisagra */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, BASE_W - 0.3, 16]} />
          <meshStandardMaterial color="#1c1d20" metalness={0.9} roughness={0.3} />
        </mesh>

        {/* Carcasa trasera + tapa del lid */}
        <RoundedBox
          args={[BASE_W, BASE_D, LID_H]}
          radius={0.06}
          smoothness={4}
          position={[0, BASE_D / 2, 0]}
          castShadow
        >
          {bodyMaterial}
        </RoundedBox>

        {/* Bisel metálico: el propio frente del lid queda visible como marco
            alrededor de la placa negra de pantalla (no hace falta una malla
            aparte para el "bisel", es el frente del lid asomando). */}

        {/* Placa negra de la pantalla */}
        <mesh position={[0, BASE_D / 2, LID_H / 2 + 0.006]}>
          <planeGeometry args={[BEZEL_W, BEZEL_H]} />
          <meshStandardMaterial color="#050505" metalness={0.2} roughness={0.6} />
        </mesh>

        {/* Pantalla: el video en loop */}
        <mesh position={[0, BASE_D / 2, LID_H / 2 + 0.012]}>
          <planeGeometry args={[SCREEN_W, SCREEN_H]} />
          {videoTexture ? (
            <meshBasicMaterial map={videoTexture} toneMapped={false} />
          ) : (
            <meshBasicMaterial color="#0a0a0f" />
          )}
        </mesh>
      </group>
    </group>
  );
}

function Scene({ sectionRef }: { sectionRef: React.RefObject<HTMLDivElement | null> }) {
  const rigRef = useRef<THREE.Group>(null);
  const videoTexture = useVideoTexture(VIDEO_SRC);

  // La rotación suave al hacer scroll va en el grupo exterior (el "rig"
  // completo: base + lid), nunca en el ángulo de apertura del lid --
  // scrub:true liga la rotación directo a la posición de scroll dentro
  // de la sección, no es un disparo único.
  useEffect(() => {
    if (!rigRef.current || !sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        rigRef.current!.rotation,
        { y: -0.5 },
        {
          y: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 4, 4]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <Environment preset="city" />

      <PresentationControls
        global
        polar={[-0.2, 0.15]}
        azimuth={[-0.6, 0.6]}
        damping={0.3}
      >
        <Float floatIntensity={0.6} rotationIntensity={0.25} speed={1.4}>
          <group ref={rigRef} position={[0, -0.2, 0]}>
            <LaptopModel videoTexture={videoTexture} />
          </group>
        </Float>
      </PresentationControls>

      <ContactShadows
        position={[0, -0.85, 0]}
        opacity={0.55}
        scale={6}
        blur={2.6}
        far={2}
      />
    </>
  );
}

export default function Laptop3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  // El fallback para navegadores sin IntersectionObserver se resuelve acá
  // (lazy initializer, se ejecuta durante el render) en vez de con un
  // setState dentro del efecto de abajo.
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  // Igual que el player de video plano que reemplaza: el bundle de
  // three/r3f/drei/gsap (pesado) no se pide ni se ejecuta hasta que la
  // sección entra cerca del viewport.
  useEffect(() => {
    if (shouldLoad) return;
    const node = sectionRef.current;
    if (!node) return;

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
  }, [shouldLoad]);

  return (
    <section ref={sectionRef} className="py-8 md:pt-12 md:pb-12">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {shouldLoad ? (
          <Canvas
            shadows
            dpr={[1, 2]}
            camera={{ position: [0, 0.6, 5], fov: 32 }}
            gl={{ antialias: true }}
          >
            <Scene sectionRef={sectionRef} />
          </Canvas>
        ) : (
          <div className="h-full w-full animate-pulse bg-slate-900" />
        )}
      </div>
    </section>
  );
}
