/**
 * Företagsuppgifter och globala inställningar.
 *
 * Alla uppgifter är hämtade från den befintliga webbplatsen www.wolf.se
 * (startsidan, /kontakt/, /om-oss/ och /butiken/). Uppgifter som inte finns
 * där har medvetet utelämnats – se README.md, avsnittet "Att komplettera".
 */

export const company = {
  name: "Stockholms Etui- & Koffertfabrik Wolf AB",
  shortName: "Wolf",
  tagline: "Väskor, etuier och koffertar – ett familjeföretag sedan generationer.",
  /** Organisationsnummer enligt Bolagsverket. */
  orgNumber: "556136-8373",
  address: {
    street: "Roslagsvägen 120",
    postalCode: "184 91",
    city: "Åkersberga",
    country: "SE",
  },
  phone: {
    display: "08-736 08 55",
    href: "tel:+4687360855",
  },
  email: "robert@wolf.se",
  social: [{ label: "Facebook", href: "https://www.facebook.com/sthlmsetui/" }],
} as const;

/**
 * Webbutiken/sortimentet på den befintliga webbplatsen.
 *
 * VIKTIGT inför publicering: om den här webbplatsen ersätter www.wolf.se måste
 * den befintliga butiken finnas kvar på en egen adress (t.ex. butik.wolf.se).
 * Uppdatera då endast `shop.base` – alla butikslänkar byggs från den.
 */
export const shop = {
  base: "https://www.wolf.se",
  home: "/butiken/",
} as const;

export function shopUrl(path: string = shop.home) {
  return `${shop.base}${path}`;
}

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wolf.se").replace(/\/$/, "");

export type NavItem = { label: string; href: string; external?: boolean };

export const mainNav: NavItem[] = [
  { label: "Startsida", href: "/" },
  { label: "Specialtillverkade väskor", href: "/specialtillverkade-vaskor" },
  { label: "Sortiment", href: "/sortiment" },
  { label: "Om oss", href: "/om-oss" },
  { label: "Kontakt", href: "/kontakt" },
];

export const shopNavItem: NavItem = { label: "Webbutik", href: shopUrl(), external: true };
