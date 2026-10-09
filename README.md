# Stockholms Etui- & Koffertfabrik Wolf AB – webbplats

Ny webbplats för Stockholms Etui- & Koffertfabrik Wolf AB, byggd med **Next.js 16 (App Router), TypeScript och Tailwind CSS 4**.

## Kom igång

Kräver Node.js 20 eller senare.

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:3000
npm run build      # produktionsbygge
npm start          # kör produktionsbygget
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

Kopiera `.env.example` till `.env.local` och fyll i värdena (se nedan).

## Struktur

```
src/
  app/                       Sidor (App Router)
    page.tsx                 Startsida
    specialtillverkade-vaskor/
    sortiment/
    om-oss/
    kontakt/
    api/contact/route.ts     Serverendpoint för kontaktformuläret
    sitemap.ts, robots.ts, opengraph-image.tsx, icon.svg
  components/                Återanvändbara komponenter (Header, Footer, sektioner, formulär …)
  content/                   ALLT redigerbart innehåll
    site.ts                  Företagsuppgifter, navigation, webbutikens adress
    categories.ts            Produktkategorier, varumärken, bilder
    history.ts               Historik och nyckeltal
    custom.ts                Texter om specialtillverkning och processen
  lib/                       Metadata-hjälpare och formulärvalidering
```

Texter och fakta ändras i `src/content/` – komponenterna behöver normalt inte röras.

## Innehållets källor

Alla företagsuppgifter, kategorier, varumärken och historiska fakta kommer från den befintliga
webbplatsen www.wolf.se (startsidan, `/om-oss/`, `/kontakt/`, `/butiken/` och kategorisidorna).
Organisationsnumret är hämtat från Bolagsverkets register. Inga recensioner, kunder,
certifieringar, priser, lagerstatus eller leveranstider har lagts till.

## Kontaktformuläret

Formuläret valideras både i webbläsaren och på servern (`src/lib/contact.ts`).

- **Aktiverat:** sätt `RESEND_API_KEY`, `CONTACT_TO_EMAIL` och `CONTACT_FROM_EMAIL` i
  miljövariablerna. Meddelanden skickas då via [Resend](https://resend.com) från
  `src/app/api/contact/route.ts`. Nyckeln läses bara på servern. Avsändardomänen (t.ex. wolf.se)
  måste verifieras i Resend.
- **Inte aktiverat (standard):** formuläret visar tydligt att det inte skickar direkt, och knappen
  öppnar besökarens e-postprogram med meddelandet ifyllt till robert@wolf.se. Inget falskt
  ”meddelandet har skickats” visas någonsin – bekräftelsen visas bara när servern faktiskt har
  skickat e-postmeddelandet.

Vill ni hellre använda en annan e-posttjänst behöver bara `fetch`-anropet i `route.ts` bytas ut.

## Att komplettera innan publicering

1. **Logotyp.** Den officiella logotypen kunde inte hämtas under utvecklingen (www.wolf.se var inte
   nåbar från utvecklingsmiljön). Lägg logotypfilen i `public/brand/` och ange sökväg och mått i
   `src/components/Logo.tsx`. Tills dess visas företagsnamnet typografiskt.
2. **Produktbilder.** Av samma anledning används linjeillustrationer i stället för foton. Lägg
   företagets egna bilder i `public/images/` och ange dem i fältet `image` per kategori i
   `src/content/categories.ts` (bilderna optimeras automatiskt av `next/image`). Bilder till
   startsidans hero och de två ”vägarna in” byts i `src/app/page.tsx`.
3. **Webbutikens adress.** Alla butikslänkar pekar i dag på den befintliga butiken
   (`https://www.wolf.se/butiken/` och kategorisidorna). Om denna webbplats ska ersätta www.wolf.se
   måste den befintliga butiken flyttas till en egen adress (t.ex. `butik.wolf.se`) – uppdatera då
   `shop.base` i `src/content/site.ts`. Kategorin *Portföljer* länkar till butikens startsida
   eftersom dess egen adress inte kunde verifieras.
4. **Besöksadress och öppettider.** Kontaktsidan på www.wolf.se anger Roslagsvägen 120, Åkersberga.
   Historiken nämner butiken på Atlasgatan 4 (öppnad 1986). Bekräfta vilken adress som gäller för
   besök och om öppettider ska visas – lägg i så fall till dem i `src/content/site.ts`.
5. **Kontaktformulär:** se ovan.
6. **Juridiska sidor.** Integritetspolicy/cookieinformation saknas på den befintliga webbplatsen.
   Webbplatsen sätter inga cookies, men en integritetstext för formuläret rekommenderas.
7. **`NEXT_PUBLIC_SITE_URL`** ska sättas till den slutliga domänen (för canonical, sitemap och
   Open Graph).

## Tillgänglighet och prestanda

- Semantiska landmärken, ”Hoppa till innehållet”-länk, synliga fokusmarkeringar och
  tangentbordsstyrd mobilmeny (Escape stänger, fokus hålls i menyn).
- Färgkontraster uppfyller WCAG AA.
- Animationer stängs av vid `prefers-reduced-motion`, och innehållet syns även utan JavaScript.
- Typsnitt (Cormorant Garamond och Hanken Grotesk) är självhostade via Fontsource – inga
  externa anrop. Alla sidor utom formulärets API är statiskt genererade.
