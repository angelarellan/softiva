import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MetaPixelPageview from "@/components/MetaPixelPageview";
import { SITE_NAME, SITE_URL } from "@/lib/site";

// Igual que en robots.ts: solo el deployment de producción (dominio propio)
// tiene VERCEL_ENV=production. Así los previews de rama/PR y los builds
// locales no ensucian las métricas reales de GA4/Meta Pixel con tráfico
// de prueba.
const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

const META_PIXEL_ID = "2566221503897965";

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
  verification: {
    google: "t1Az1BV9Q_v1Q_P06ferjUbI9yuxxegtl25Cmbui0s4",
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
        {IS_PRODUCTION && (
          <>
            {/*
              strategy="afterInteractive": next/script lo carga después de
              que la página se vuelve interactiva, no bloquea el parseo del
              HTML ni retrasa el FCP/LCP -- mismo mecanismo que usa
              @next/third-parties por debajo para GoogleAnalytics.
            */}
            <Script id="meta-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${META_PIXEL_ID}');
                fbq('track', 'PageView');
              `}
            </Script>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element -- píxel de tracking de terceros, no un asset local optimizable */}
              <img
                height="1"
                width="1"
                alt=""
                style={{ display: "none" }}
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <MetaPixelPageview />
          </>
        )}
      </body>
      {IS_PRODUCTION && <GoogleAnalytics gaId="G-SPC5W4N45F" />}
    </html>
  );
}
