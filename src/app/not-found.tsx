import { ButtonLink } from "@/components/Button";
import { shopUrl } from "@/content/site";

export const metadata = { title: "Sidan hittades inte" };

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 max-w-3xl text-[2.75rem] sm:text-[3.75rem]">Sidan kunde inte hittas</h1>
      <p className="lede mt-6 max-w-xl">
        Sidan kan ha flyttats eller tagits bort. Gå tillbaka till startsidan, eller besök webbutiken om du letar
        efter en produkt.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <ButtonLink href="/">Till startsidan</ButtonLink>
        <ButtonLink href={shopUrl()} variant="secondary" external>
          Besök webbutiken
        </ButtonLink>
      </div>
    </section>
  );
}
