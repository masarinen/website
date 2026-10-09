import { ButtonLink } from "@/components/Button";
import { CheckIcon } from "@/components/Icons";
import { Illustration, type IllustrationName } from "@/components/Illustration";
import { ContactCta, PageHero, ProcessSteps, SectionHeader } from "@/components/sections";
import { inquiryChecklist, offering, strengths, useCases } from "@/content/custom";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Specialtillverkade väskor",
  description:
    "Mjuka eller hårda väskor och etuier efter era behov och önskemål – demoväskor, skyddande väskor, etuier och serviceväskor. Berätta om ert behov så diskuterar vi lösningen.",
  path: "/specialtillverkade-vaskor",
});

const useCaseArt: IllustrationName[] = ["demo", "hardcase", "jewelry", "toolcase"];

export default function CustomPage() {
  return (
    <>
      <PageHero
        eyebrow="Specialtillverkade väskor"
        title="Väskor och etuier, utformade efter uppgiften"
        intro="För företag och kunder som behöver mer än en standardväska. Vi tar fram mjuka eller hårda väskor efter era behov – från en enstaka specialväska till väskor för en hel säljkår."
      >
        <ButtonLink href="/kontakt?amne=specialbestallning">Berätta om ert behov</ButtonLink>
        <ButtonLink href="#sa-gar-det-till" variant="secondary">
          Så går det till
        </ButtonLink>
      </PageHero>

      {/* Erbjudandet */}
      <section aria-labelledby="erbjudande" className="py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6" data-reveal>
            <h2 id="erbjudande" className="sr-only">
              Vårt erbjudande
            </h2>
            <blockquote className="border-l-2 border-leather pl-6 sm:pl-8">
              <p className="font-serif text-[1.75rem] italic leading-snug text-navy sm:text-[2.25rem]">
                ”{offering}”
              </p>
            </blockquote>
          </div>
          <ul className="divide-y divide-line border-y border-line lg:col-span-5 lg:col-start-8">
            {strengths.map((s, i) => (
              <li
                key={s.title}
                className="py-7"
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
              >
                <h3 className="text-[1.5rem]">{s.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Användningsområden */}
      <section aria-labelledby="anvandning" className="border-y border-line bg-bone py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader
            id="anvandning"
            eyebrow="Användningsområden"
            title="Väskor för nästan allt som går att bära"
            intro="Några exempel på vad vi tar fram. Har ni ett behov som inte syns här är ni välkomna att fråga."
          />
          <ul className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {useCases.map((u, i) => (
              <li
                key={u.title}
                className="flex flex-col gap-6 bg-bone p-8 sm:p-10 md:flex-row md:items-center"
                data-reveal
                style={{ "--reveal-delay": `${(i % 2) * 100}ms` } as React.CSSProperties}
              >
                <Illustration name={useCaseArt[i]} className="w-32 shrink-0 text-navy/70 md:w-36" />
                <div>
                  <h3 className="text-[1.625rem]">{u.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{u.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="sa-gar-det-till-rubrik" id="sa-gar-det-till" className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader
            id="sa-gar-det-till-rubrik"
            eyebrow="Så går det till"
            title="Från behov till lösning"
            intro="Vi utgår från era krav och undersöker vad som är möjligt. Vilka utföranden som går att ta fram beror på produkt, specifikation och antal."
          />
          <div className="mt-14">
            <ProcessSteps tone="bone" />
          </div>

          <div className="mt-20 grid gap-10 border-t border-line pt-14 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="text-[2rem]">Inför er förfrågan</h3>
              <p className="mt-3 text-muted">
                Ju mer vi vet från början, desto lättare blir det att bedöma vad som passar. Det här är bra att
                berätta:
              </p>
              <div className="mt-8">
                <ButtonLink href="/kontakt?amne=specialbestallning">Skicka en förfrågan</ButtonLink>
              </div>
            </div>
            <ul className="space-y-4 lg:col-span-6 lg:col-start-7" data-reveal>
              {inquiryChecklist.map((item) => (
                <li key={item} className="flex gap-4 border-b border-line pb-4">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-leather" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactCta
        title="Låt oss diskutera ert behov"
        text="Beskriv vad väskan eller etuiet ska användas till, så återkommer vi för att diskutera möjliga lösningar."
      />
    </>
  );
}
