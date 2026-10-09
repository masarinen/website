import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { CategoryGrid, ContactCta, PageHero } from "@/components/sections";
import { brands, categories } from "@/content/categories";
import { shopUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Sortiment",
  description:
    "Resväskor, demoväskor, specialväskor, vinresväskor, serviceväskor, watch winders, smyckeskrin, portföljer och shoppingvagnar – från bland annat Samsonite, Antler, Wolf1834, Parat, Rolser och Andersen.",
  path: "/sortiment",
});

export default function AssortmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Sortiment"
        title="Väskor för resan, arbetet och vardagen"
        intro="Här är våra produktkategorier. Specialväskor tar vi fram efter era behov – övriga produkter finns i webbutiken, där ni ser aktuellt utbud."
      >
        <ButtonLink href={shopUrl()} external>
          Gå till webbutiken
        </ButtonLink>
        <ButtonLink href="/specialtillverkade-vaskor" variant="secondary">
          Specialtillverkning
        </ButtonLink>
      </PageHero>

      <section aria-label="Produktkategorier" className="py-16 sm:py-24">
        <div className="container-page">
          {categories.length > 0 ? (
            <CategoryGrid items={categories} headingLevel={2} />
          ) : (
            <p className="border border-line bg-bone p-10 text-center text-muted">
              Sortimentet uppdateras. Besök{" "}
              <a href={shopUrl()} className="link-underline text-navy">
                webbutiken
              </a>{" "}
              för aktuellt utbud.
            </p>
          )}
        </div>
      </section>

      <section aria-labelledby="varumarken" className="border-y border-line bg-bone py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="eyebrow">Varumärken</p>
            <h2 id="varumarken" className="mt-4 text-[2.25rem] sm:text-[2.5rem]">
              Välkända märken i sortimentet
            </h2>
          </div>
          <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:col-span-8" data-reveal>
            {brands.map((b) => (
              <li
                key={b}
                className="flex h-24 items-center justify-center border-b border-r border-line font-serif text-[1.5rem] text-navy"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="service" className="py-16 sm:py-24">
        <div className="container-page grid gap-10 md:grid-cols-2 lg:gap-16">
          <div data-reveal>
            <h2 id="service" className="text-[2rem]">
              Leverans inom Norden
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Alla produkter kan levereras till adresser i hela Norden. Ring eller mejla oss för mer
              information.
            </p>
          </div>
          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <h2 className="text-[2rem]">Reparationer</h2>
            <p className="mt-3 leading-relaxed text-muted">
              Vi utför även reparationer av väskor, till exempel flygskador på Samsonite-väskor.{" "}
              <Link href="/kontakt?amne=reparation" className="link-underline text-navy">
                Kontakta oss
              </Link>{" "}
              och beskriv skadan, så berättar vi hur ni går vidare.
            </p>
          </div>
        </div>
      </section>

      <ContactCta
        title="Hittar ni inte det ni söker?"
        text="Kontakta oss så hjälper vi er vidare – eller diskuterar en väska som tas fram efter era behov."
      />
    </>
  );
}
