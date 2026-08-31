import { ImageResponse } from "next/og";

export const alt = "Softiva Studio — Agencia de Desarrollo Web y Diseño UI/UX";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05050a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(79,125,255,0.35), transparent 45%), radial-gradient(circle at 75% 70%, rgba(162,89,255,0.35), transparent 45%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 26px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.75)",
            fontSize: 26,
          }}
        >
          Agencia de Desarrollo Web &amp; Diseño Digital
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -4,
            color: "#f5f5fa",
          }}
        >
          Soft
          <span style={{ color: "#a259ff" }}>iva</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "rgba(245,245,250,0.7)",
          }}
        >
          Sitios web, UI/UX y soluciones digitales de alto nivel
        </div>
      </div>
    ),
    { ...size }
  );
}
