import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const TITLE = "Softiva Studio | Desarrollo Web & Diseño Digital";
const DESCRIPTION =
  "Agencia especializada en desarrollo web de alto rendimiento, e-commerce, branding y marketing digital. Transformamos visitas en clientes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "desarrollo web",
    "diseño web",
    "e-commerce",
    "marketing digital",
    "landing pages",
    "agencia digital",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${jakarta.variable} h-full antialiased`}
      style={{ backgroundColor: "#f7f8fb" }}
    >
      <head>
        {/*
          next/font/google ya descarga y autohospeda Plus_Jakarta_Sans en
          build time: el navegador nunca llega a pedirle nada a Google en
          runtime. Estos hints quedan sin efecto real para esa fuente, pero
          se agregan igual (son inofensivos) por si en el futuro se suma
          algún recurso servido directo desde fonts.googleapis.com.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        style={{ backgroundColor: "#f7f8fb" }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
