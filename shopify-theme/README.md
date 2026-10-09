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
