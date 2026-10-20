# Wolf – Shopify-tema

Tema för Stockholms Etui- & Koffertfabrik Wolf AB. Samma design som den nya webbplatsen, men
byggt för Shopify så att allt innehåll kan ändras i Shopifys temaredigerare – utan kod.

## 1. Ladda upp temat

1. Shopify-admin → **Webbshop → Teman**.
2. Under *Temabibliotek*: **Lägg till tema → Ladda upp zip-fil** och välj `wolf-shopify-tema.zip`.
3. Temat hamnar i biblioteket (inte publicerat). Klicka **⋯ → Förhandsgranska** för att titta.

## 2. Skapa sidorna

**Innehåll → Sidor → Lägg till sida.** Skapa fyra sidor. Titeln ger adressen, och i rutan
*Temamall* (till höger) väljer du mallen:

| Sidtitel                    | Adress som ska bli                     | Temamall                      |
|-----------------------------|----------------------------------------|-------------------------------|
| Specialtillverkade väskor   | `/pages/specialtillverkade-vaskor`     | `specialtillverkade-vaskor`   |
| Sortiment                   | `/pages/sortiment`                     | `sortiment`                   |
| Om oss                      | `/pages/om-oss`                        | `om-oss`                      |
| Kontakt                     | `/pages/kontakt`                       | `kontakt`                     |

Lämna sidans brödtext tom – innehållet ligger i temats sektioner. Kontrollera under
*Sökmotorlistning* att adressen (handle) blir exakt som i tabellen, annars pekar knapparna fel.

## 3. Menyer

**Innehåll → Menyer**

- **Huvudmeny** (`main-menu`): Startsida, Specialtillverkade väskor, Sortiment, Om oss, Kontakt.
- **Sidfotsmeny** (`footer`): t.ex. länkar till era kollektioner (Resväskor, Demoväskor …).

Knappen ”Webbutik” i sidhuvudet ställs in under **Anpassa → Temainställningar → Webbutik**
(tom länk = alla produkter).

## 4. Kollektioner (webbutiken)

Kategorikorten på startsidan och sortimentssidan länkar till dessa adresser. Skapa kollektioner
med motsvarande handle, eller välj en kollektion direkt på varje kort i temaredigeraren:

`/collections/demovaskor`, `/collections/resvaskor`, `/collections/vinresvaskor`,
`/collections/servicevaskor`, `/collections/watch-winders`, `/collections/smyckeskrin`,
`/collections/portfoljer`, `/collections/shoppingvagnar`

## 5. Logotyp, bilder och uppgifter

**Webbshop → Teman → Anpassa**

- **Temainställningar → Logotyp:** ladda upp logotypen (mörk) och gärna en ljus variant för sidfoten.
- **Temainställningar → Företagsuppgifter:** adress, telefon, e-post och org.nr. Används överallt.
- **Varje sektion** har ett bildfält. Utan bild visas en linjeillustration.
- Sektioner kan flyttas, döljas, dupliceras och läggas till på alla sidor.

## Bygga och ändra layout själv

**Alla sektioner** har under rubriken *Layout* i sina inställningar:
avstånd ovanför och under, bakgrundsfärg, innehållets bredd, rubrikstorlek samt
"Dölj på mobil" / "Dölj på dator".

**Flexibel sektion** (Lägg till sektion → Flexibel sektion) byggs av block som
kan dras, tas bort och läggas i varandra:

| Block | Inställningar |
|---|---|
| Grupp | Rad eller kolumn, avstånd, justering, bredd, minsta höjd, bakgrund, inre marginal |
| Rubrik | Text, kursiv fortsättning, storlek, rubriknivå, justering, färg, bredd |
| Överrubrik | Text, justering, färg |
| Text | Formaterad text, storlek, radlängd, justering, färg, bredd |
| Bild | Bild, storlek i %, bildformat eller fast höjd, anpassning, rundade hörn, bildtext, länk |
| Knapp | Text, länk, stil (mörk, ram, ljus, textlänk), justering |
| Mellanrum | Höjd |
| Linje | Tjocklek, färg, bredd |

Färdiga startlägen: *Bild med text*, *Text och knapp*, *Tre kolumner*,
*Bild i full bredd* och *Tom sektion*. Lägg block bredvid varandra genom att
använda en Grupp med riktningen Rad och ge blocken en bredd (t.ex. 50 %).

**Hero (startsida)** har dessutom: visa/dölj bildrutan, bild till vänster/höger,
textens andel av bredden, bildens minsta höjd och om bilden ska fylla rutan.

## Produktsidor och menyn "Produkter"

**Egen sida per produktgrupp.** Varje kollektion i Shopify får automatiskt en
egen sida i Wolf-stil: brödsmula, rubrik, presentationstext (med "Läs mer"),
bild, snabbval, filter, sortering och produktrutnät.

1. Produkter → Kollektioner → Skapa kollektion, t.ex. *Wolf1834*, *Vinväskor*,
   *Watch winders*. Använd gärna "Automatiserad" med villkor som
   *Leverantör är lika med Wolf1834* eller *Produkttyp är lika med Watch winder*.
2. Skriv en presentation i beskrivningsfältet och ladda upp en bild.
3. Filter och snabbval: installera Shopifys gratisapp **Search & Discovery** och
   aktivera filter för Produkttyp, Pris (och t.ex. Färg).

**Rullgardinsmenyn.** Innehåll → Menyer → Huvudmeny: lägg till *Produkter*
(länk: Kollektioner → Alla kollektioner) och dra sedan in kollektionerna
*under* Produkter (dra dem lite åt höger). Då blir det en rullgardinsmeny på
dator och en utfällbar lista i mobilmenyn.

## 6. Kontaktformuläret

Fungerar direkt. Meddelanden skickas till butikens e-postadress
(**Inställningar → Butiksinformation → Kontakt-e-post**) – sätt den till robert@wolf.se.
Ämnena i rullistan ändras i sektionen *Kontaktformulär*.

## 7. Publicera

När allt ser bra ut: **⋯ → Publicera**. Koppla sedan domänen under
**Inställningar → Domäner**.

## Att kontrollera innan publicering

- Besöksadress: Roslagsvägen 120 (från wolf.se/kontakt) eller Atlasgatan 4?
- Fyll i butikens policyer (Inställningar → Policyer) – de länkas automatiskt i sidfoten.
