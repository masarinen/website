import { ButtonLink } from "@/components/Button";
import { Illustration } from "@/components/Illustration";
import { ContactCta, PageHero, Timeline } from "@/components/sections";
import { historyIntro, keyFacts, milestones } from "@/content/history";
import { offering } from "@/content/custom";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Om oss",
  description:
    "Familjen Wolf har över 180 års erfarenhet av att tillverka etuier, skrin och väskor. Läs om vägen från Hanau via Malmö till Stockholms Etui- och koffertfabrik 1936.",
  path: "/om-oss",
});

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="Om oss" title="Familjen Wolf – etuier, skrin och väskor i generationer" intro={historyIntro} />

      <section aria-labelledby="nyckeltal" className="border-b border-line">
        <h2 id="nyckeltal" className="sr-only">
          I korthet
        </h2>
        <dl className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {keyFacts.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 py-8 sm:px-8 sm:first:pl-0" data-reveal>
              <dt className="order-2 text-[0.9375rem] text-muted">{f.label}</dt>
              <dd className="order-1 font-serif text-[2.75rem] leading-none text-navy">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="historien" className="py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32" data-reveal>
              <p className="eyebrow">Historien</p>
              <h2 id="historien" className="mt-4 text-[2.25rem] sm:text-[2.75rem]">
                Från silversmedja till koffertfabrik
              </h2>
              <Illustration name="jewelry" className="mt-10 hidden w-56 text-navy/60 lg:block" />
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Timeline items={milestones} />
          </div>
        </div>
      </section>

      <section aria-labelledby="idag" className="border-y border-line bg-bone py-20 sm:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <p className="eyebrow">I dag</p>
            <h2 id="idag" className="mt-4 text-[2.25rem] sm:text-[2.75rem]">
              Samma hantverkstradition, nya behov
            </h2>
          </div>
          <div className="prose-wolf leading-relaxed text-muted lg:col-span-6 lg:col-start-7" data-reveal>
            <p className="font-serif text-[1.5rem] italic leading-snug text-navy">{offering}</p>
            <p>
              I dag tar vi fram specialväskor och demoväskor efter kundens behov, och säljer resväskor,
              serviceväskor, klockuppdragare, smyckeskrin och mer från välkända märken. Vi utför även
              reparationer av väskor.
            </p>
            <p>
              Familjens etuitradition lever också vidare i varumärket Wolf1834, med etuier för klockor och
              smycken samt klockuppdragare – produkter som finns i vårt sortiment.
            </p>
            <div className="flex flex-wrap gap-4 pt-6">
              <ButtonLink href="/specialtillverkade-vaskor">Specialtillverkade väskor</ButtonLink>
              <ButtonLink href="/sortiment" variant="secondary">
                Se sortimentet
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
