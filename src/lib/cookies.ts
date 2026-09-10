// Única fuente de verdad para la key de localStorage que usan tanto
// CookieBanner (para guardar la decisión) como CookiePreferencesLink
// (para poder revocarla) -- evita que un typo en un string mágico
// desincronice a los dos componentes.
export const COOKIE_CONSENT_STORAGE_KEY = "cookies_accepted";
