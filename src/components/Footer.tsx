import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { CONTACT_EMAIL } from "@/lib/site";
import { localeHref } from "@/lib/i18n";
import FooterMarquee from "@/components/FooterMarquee";
import ScrollTopLink from "@/components/ScrollTopLink";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import CookiePreferencesLink from "@/components/CookiePreferencesLink";
import { getDictionary, getLocale } from "@/app/[lang]/dictionaries";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/softivastudio/", Icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61594213251129", Icon: FacebookIcon },
];

export default async function Footer() {
  const locale = await getLocale();
  const dict = await getDictionary();

  const serviceLinks = [
    { label: dict.footer.serviceLinks.branding, href: "/servicios#branding" },
    { label: dict.footer.serviceLinks.desarrolloWeb, href: "/servicios#desarrollo-web-ecommerce" },
    { label: dict.footer.serviceLinks.marketing, href: "/servicios#marketing-performance" },
    { label: dict.footer.serviceLinks.contenido, href: "/servicios#contenido-redes" },
    { label: dict.footer.serviceLinks.formacion, href: "/servicios#formacion" },
  ];

  const navLinks = [
    { label: dict.nav.inicio, href: "/" },
    { label: dict.nav.servicios, href: "/servicios" },
    { label: dict.nav.portafolio, href: "/portafolio" },
    { label: dict.nav.nosotros, href: "/nosotros" },
    { label: dict.nav.contacto, href: "/contacto" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-background/10 bg-foreground text-background">
      <FooterMarquee />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-y-12 text-center lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-x-8 lg:text-left">
          <div>
            <ScrollTopLink
              href={localeHref(locale, "/")}
              className="text-xl font-bold tracking-tight text-background"
            >
              Softiva <span className="gradient-text">Studio</span>
            </ScrollTopLink>
            <p className="mx-auto mt-4 max-w-xs text-sm text-background/80 lg:mx-0">
              {dict.footer.tagline}
            </p>

            <div className="mt-6 flex items-center justify-center gap-3 lg:justify-start">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-background/15 text-background/70 transition-all duration-200 hover:scale-[1.08] hover:border-accent-violet/60 hover:text-background"
                >
                  <Icon size={16} />
                </a>
              ))}
              <LanguageSwitcher
                currentLocale={locale}
                ariaLabel={dict.nav.seleccionarIdioma}
                ariaLabelOptions={dict.nav.idiomasDisponibles}
                variant="circle"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              {dict.footer.serviciosTitle}
            </h3>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={localeHref(locale, link.href)}
                    className="text-sm text-background/75 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              {dict.footer.navegacionTitle}
            </h3>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href === "/" ? (
                    <ScrollTopLink
                      href={localeHref(locale, link.href)}
                      className="text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {link.label}
                    </ScrollTopLink>
                  ) : (
                    <Link
                      href={localeHref(locale, link.href)}
                      className="text-sm text-background/75 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">
              {dict.footer.contactoTitle}
            </h3>
            <ul className="mt-4 space-y-2 sm:space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="flex items-center justify-center gap-2 text-sm text-background/80 transition-colors hover:text-background lg:justify-start"
                >
                  <Mail size={16} className="shrink-0 text-accent-violet" />
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppLink(dict.whatsapp.ctaMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-background/80 transition-colors hover:text-background lg:justify-start"
                >
                  <MessageCircle size={16} className="shrink-0 text-accent-mint" />
                  +54 3543635504
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-background/10 pt-8 text-center sm:flex-row sm:justify-between">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Softiva Studio. {dict.footer.rights}
          </p>
          <CookiePreferencesLink
            label={dict.cookieBanner.preferencesLink}
            className="text-sm text-background/60 underline-offset-4 transition-colors hover:text-background hover:underline"
          />
        </div>
      </div>
    </footer>
  );
}
