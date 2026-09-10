import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import MetaPixelPageview from "@/components/MetaPixelPageview";
import OrganizationSchema from "@/components/OrganizationSchema";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES, buildAlternates } from "@/lib/i18n";
import { getDictionary, getLocale } from "./dictionaries";

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

// Ambos idiomas se generan 100% estáticos en build time (SSG real, no
// negociación de idioma en runtime): el español sigue en las URLs de
// siempre (sin prefijo, vía el rewrite de proxy.ts) y el inglés en /en/...
export async function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

const TITLES: Record<string, string> = {
  es: "Softiva Studio | Desarrollo Web & Diseño Digital",
  en: "Softiva Studio | Web Development & Digital Design",
};

const DESCRIPTIONS: Record<string, string> = {
  es: "Softiva Studio - Agencia de desarrollo web, e-commerce y software a medida. Transformamos ideas en experiencias digitales de alto nivel.",
  en: "Softiva Studio - Web development, e-commerce, and custom software agency. We turn ideas into high-end digital experiences.",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = TITLES[locale];
  const description = DESCRIPTIONS[locale];
  const alternates = buildAlternates(locale, "/", SITE_URL);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    alternates,
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
      title,
      description,
      url: alternates.canonical,
      siteName: SITE_NAME,
      locale: locale === "es" ? "es_AR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
}

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const locale = await getLocale();
  const dict = await getDictionary();

  return (
    <html
      lang={locale}
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
        <OrganizationSchema />
        <Navbar locale={locale} dict={dict.nav} whatsappMessage={dict.whatsapp.ctaMessage} />
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
