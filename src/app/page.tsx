import Link from "next/link";
import { ButtonLink, ArrowLink } from "@/components/Button";
import { Illustration } from "@/components/Illustration";
import { ArrowRight, ArrowUpRight } from "@/components/Icons";
import { CategoryGrid, ContactCta, ProcessSteps, SectionHeader } from "@/components/sections";
import { brands, categories } from "@/content/categories";
import { historyIntro, keyFacts, milestones } from "@/content/history";
import { shopUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  description:
    "Väskor efter era behov. Stockholms Etui- & Koffertfabrik Wolf AB erbjuder mjuka eller hårda väskor och etuier efter era önskemål – och resväskor från välkända märken i webbutiken.",
  path: "/",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

export default function HomePage() {
  const featured = categories.filter((c) =>
    ["specialvaskor", "demovaskor", "resvaskor", "servicevaskor", "vinresvaskor", "watch-winders"].includes(c.slug),
  );

  return (
    <>
      {/* ---------------------------------------------------- Hero */}
      <section className="relative">
        <div className="container-page grid grid-cols-1 items-stretch gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
          <div className="flex flex-col justify-center lg:col-span-6 lg:py-10">
            <p className="eyebrow leading-relaxed" data-reveal>
              Stockholms Etui- &amp; Koffertfabrik Wolf AB
            </p>
            <h1
              className="mt-6 text-[3rem] leading-[1.02] sm:text-[4.25rem] lg:text-[4.75rem] xl:text-[5.5rem]"
              data-reveal
              style={delay(80)}
            >
              Väskor efter era behov.{" "}
              <em className="font-medium text-leather">Erfarenhet sedan generationer.</em>
            </h1>
            <p className="lede mt-8 max-w-xl" data-reveal style={delay(160)}>
              Vi tar fram mjuka eller hårda väskor och etuier efter era önskemål – med mångårig erfarenhet och
              ett nätverk av pålitliga underleverantörer. I vår webbutik finner ni även resväskor från välkända
              märken.
            </p>
            <div className="mt-10 flex flex-wrap gap-4" data-reveal style={delay(240)}>
              <ButtonLink href="/specialtillverkade-vaskor">Utforska våra lösningar</ButtonLink>
              <ButtonLink href={shopUrl()} variant="secondary" external>
                Besök webbutiken
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal style={delay(200)}>
            <div className="on-dark relative flex aspect-[4/3.4] h-full items-center justify-center overflow-hidden bg-navy sm:aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]">
              <div className="absolute inset-5 border border-ivory/15 sm:inset-7" aria-hidden="true" />
              <Illustration
                name="hardcase"
                strokeWidth={1.1}
                className="relative w-[82%] max-w-[34rem] text-leather-light"
              />
              <p className="absolute left-9 top-9 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-ivory/60 sm:left-12 sm:top-12">
                Etuier · Skrin · Väskor
              </p>
              <p className="absolute bottom-9 right-9 text-right font-serif text-[1.25rem] italic leading-tight text-ivory/85 sm:bottom-12 sm:right-12 sm:text-[1.5rem]">
                I Stockholm
                <br />
                sedan 1936
              </p>
            </div>
          </div>
        </div>

        {/* Nyckeltal */}
        <div className="border-y border-line">
          <dl className="container-page grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {keyFacts.map((f, i) => (
              <div
                key={f.label}
                className="flex items-baseline gap-4 py-6 sm:flex-col sm:gap-1 sm:px-8 sm:py-8 sm:first:pl-0"
                data-reveal
                style={delay(i * 90)}
              >
                <dt className="order-2 text-[0.9375rem] text-muted">{f.label}</dt>
                <dd className="order-1 font-serif text-[2.5rem] leading-none text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------------------------------------- Två vägar in */}
      <section aria-labelledby="vagar-in" className="py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader
            id="vagar-in"
            eyebrow="Två vägar in"
            title="Vad söker ni?"
            intro="En väska som är framtagen för just er uppgift – eller en resväska från ett välkänt märke. Välj den väg som passar."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <Link
              href="/specialtillverkade-vaskor"
              className="group relative flex flex-col overflow-hidden bg-bone"
              data-reveal
            >
              <div className="relative flex aspect-[16/10] items-center justify-center border-b border-line">
                <Illustration
                  name="demo"
                  className="w-[58%] text-navy/75 transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <p className="eyebrow">För företag och privatpersoner</p>
                <h3 className="mt-4 text-[2.25rem] sm:text-[2.5rem]">Specialtillverkade väskor</h3>
                <p className="mt-4 max-w-md leading-relaxed text-muted">
                  För er som behöver en väska eller ett etui anpassat efter specifika krav – mjukt eller hårt,
                  med inredning efter innehållet.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-navy">
                  <span className="link-underline">Om specialtillverkning</span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none" />
                </span>
              </div>
            </Link>

            <a
              href={shopUrl()}
              className="on-dark group relative flex flex-col overflow-hidden bg-navy text-ivory"
              data-reveal
              style={delay(120)}
            >
              <div className="relative flex aspect-[16/10] items-center justify-center border-b border-ivory/15">
                <Illustration
                  name="suitcase"
                  className="w-[58%] text-leather-light transition-transform duration-700 group-hover:scale-[1.04] motion-reduce:transform-none"
                />
              </div>
              <div className="flex flex-1 flex-col p-8 sm:p-10">
                <p className="eyebrow text-leather-light">Webbutik</p>
                <h3 className="mt-4 text-[2.25rem] text-ivory sm:text-[2.5rem]">Väskor från välkända varumärken</h3>
                <p className="mt-4 max-w-md leading-relaxed text-ivory/75">
                  Resväskor, tillbehör, serviceväskor, klockuppdragare och mer i vår befintliga webbutik.
                </p>
                <p className="mt-6 text-[0.875rem] tracking-wide text-ivory/85">
                  <span className="sr-only">Varumärken i sortimentet: </span>
                  {brands.join(" · ")}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-medium text-ivory">
                  <span className="link-underline">Besök webbutiken</span>
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none" />
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------- Erfarenhet & historia */}
      <section aria-labelledby="historia" className="border-y border-line bg-bone py-20 sm:py-28">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div data-reveal>
              <p className="eyebrow">Ett familjeföretag</p>
              <h2 id="historia" className="mt-4 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]">
                Hantverk som gått i arv i över 180 år
              </h2>
            </div>
            <p className="lede mt-6" data-reveal style={delay(80)}>
              {historyIntro}
            </p>
            <div className="mt-8" data-reveal style={delay(140)}>
              <ArrowLink href="/om-oss" className="text-navy">
                Läs om familjen Wolf
              </ArrowLink>
            </div>
          </div>

          <ol className="grid self-end border-t border-line sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {milestones.slice(1).map((m, i) => (
              <li
                key={m.when}
                className="border-b border-line py-7 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                data-reveal
                style={delay(i * 90)}
              >
                <p className="font-serif text-[2.75rem] leading-none text-leather">{m.when}</p>
                <p className="mt-3 font-medium text-navy">{m.title}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------ Våra lösningar */}
      <section aria-labelledby="losningar" className="py-20 sm:py-28">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeader
              id="losningar"
              eyebrow="Våra lösningar"
              title="Från demoväska till resväska"
              intro="Ett urval av det vi arbetar med. Specialväskor tas fram efter era behov – övriga kategorier finns i webbutiken."
            />
            <div data-reveal>
              <ArrowLink href="/sortiment" className="shrink-0 text-navy">
                Hela sortimentet
              </ArrowLink>
            </div>
          </div>
          <div className="mt-14">
            <CategoryGrid items={featured} />
          </div>
        </div>
      </section>

      {/* -------------------------------------- Så fungerar det */}
      <section aria-labelledby="process" className="border-t border-line bg-bone py-20 sm:py-28">
        <div className="container-page">
          <SectionHeader
            id="process"
            eyebrow="Specialbeställningar"
            title="Så går en förfrågan till"
            intro="Varje uppdrag är olika. Vi börjar alltid med att förstå vad väskan ska klara av."
          />
          <div className="mt-14">
            <ProcessSteps />
          </div>
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center" data-reveal>
            <ButtonLink href="/kontakt?amne=specialbestallning">Skicka en förfrågan</ButtonLink>
            <p className="max-w-md text-[0.9375rem] text-muted">
              Vilka lösningar som är möjliga beror på produkt, specifikation och antal – det går vi igenom
              tillsammans.
            </p>
          </div>
        </div>
      </section>

      <ContactCta />
    </>
  );
}
