import { shopUrl } from "./site";
import type { IllustrationName } from "@/components/Illustration";

/**
 * Produktkategorier enligt sortimentsmenyn på www.wolf.se/butiken/.
 * Beskrivningar och varumärken är hämtade från respektive kategorisida.
 *
 * `image` kan sättas till en sökväg i /public (t.ex. "/images/resvaskor.jpg")
 * när företagets egna produktbilder finns på plats. Utan bild visas en
 * linjeillustration i samma formspråk som resten av webbplatsen.
 */
export type Category = {
  slug: string;
  name: string;
  summary: string;
  brands?: string[];
  /** Länk till kategorisidan i den befintliga webbutiken. */
  href: string;
  /** Visas som "Specialtillverkning" i stället för butikskategori. */
  custom?: boolean;
  illustration: IllustrationName;
  image?: { src: string; alt: string };
};

export const categories: Category[] = [
  {
    slug: "specialvaskor",
    name: "Specialväskor",
    summary:
      "Väskor för nästan allt som går att bära – även vattentäta och stöttåliga utföranden, mjuka eller hårda efter behov.",
    href: "/specialtillverkade-vaskor",
    custom: true,
    illustration: "hardcase",
  },
  {
    slug: "demovaskor",
    name: "Demoväskor",
    summary:
      "Kollektions-, försäljnings- och demoväskor för säljare. Vi har tillverkat dem i över 60 år, för allt från dammsugare till klockor och knivar.",
    href: shopUrl("/demovaskor/"),
    illustration: "demo",
  },
  {
    slug: "resvaskor",
    name: "Resväskor",
    summary:
      "Resväskor från välkända märken, samt tillbehör som nackkuddar, bagageremmar och klädväskor för resan.",
    brands: ["Samsonite", "Antler"],
    href: shopUrl("/resvaskor/"),
    illustration: "suitcase",
  },
  {
    slug: "vinresvaskor",
    name: "Vinresväskor",
    summary:
      "Resväska för tolv flaskor med skal i polypropylen, hjul, utdragbart handtag och kombinationslås.",
    brands: ["Samsonite"],
    href: shopUrl("/vinresvaskor/"),
    illustration: "wine",
  },
  {
    slug: "servicevaskor",
    name: "Serviceväskor",
    summary: "Ett brett urval av service- och verktygsväskor för tekniker och hantverkare.",
    brands: ["Parat"],
    href: shopUrl("/servicevaskor/"),
    illustration: "toolcase",
  },
  {
    slug: "watch-winders",
    name: "Watch winders",
    summary: "Klockuppdragare som håller automatiska armbandsur i gång när de inte bärs.",
    brands: ["Wolf1834"],
    href: shopUrl("/watch-winder/"),
    illustration: "winder",
  },
  {
    slug: "smyckeskrin",
    name: "Smyckeskrin",
    summary: "Skrin som både presenterar och skyddar smycken – en tradition som går tillbaka till familjens första verkstad.",
    brands: ["Wolf1834"],
    href: shopUrl("/smyckesskrin/"),
    illustration: "jewelry",
  },
  {
    slug: "portfoljer",
    name: "Portföljer",
    summary: "Portföljer för arbetsdagen och mötet. Se aktuellt utbud i webbutiken.",
    href: shopUrl(),
    illustration: "briefcase",
  },
  {
    slug: "shoppingvagnar",
    name: "Shoppingvagnar",
    summary: "Shoppingvagnar för vardagens inköp, från välkända tillverkare.",
    brands: ["Rolser", "Andersen"],
    href: shopUrl("/shoppingvagnar/"),
    illustration: "trolley",
  },
];

/** Varumärken som nämns i sortimentet på www.wolf.se. */
export const brands = ["Samsonite", "Antler", "Wolf1834", "Parat", "Rolser", "Andersen"];
