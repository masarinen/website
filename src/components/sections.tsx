import Image from "next/image";
import { ButtonLink, ArrowLink } from "./Button";
import { Illustration } from "./Illustration";
import type { Category } from "@/content/categories";
import type { Milestone } from "@/content/history";
import { processSteps } from "@/content/custom";
import { company } from "@/content/site";
import { MailIcon, PhoneIcon } from "./Icons";

/* ---------------------------------------------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} data-reveal>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-4 text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]">
        {title}
      </h2>
      {intro && <p className="lede mt-5">{intro}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- */

/** Rubriksektion för undersidor. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-page pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
        <p className="eyebrow" data-reveal>
          {eyebrow}
        </p>
        <h1
          className="mt-5 max-w-4xl text-[2.75rem] sm:text-[3.75rem] lg:text-[4.5rem]"
          data-reveal
          style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
        >
          {title}
        </h1>
        <p
          className="lede mt-7 max-w-2xl"
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          {intro}
        </p>
        {children && (
          <div
            className="mt-10 flex flex-wrap gap-4"
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */

/** Bild för en kategori – företagets foto om det finns, annars illustration. */
export function CategoryVisual({ category, className = "" }: { category: Category; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-bone ${className}`}>
      {category.image ? (
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      ) : (
        <Illustration
          name={category.illustration}
          className="absolute inset-0 m-auto h-[72%] w-[72%] text-navy/70 transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
        />
      )}
    </div>
  );
}

export function CategoryGrid({ items, headingLevel = 3 }: { items: Category[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c, i) => {
        const external = !c.custom;
        return (
          <li
            key={c.slug}
            id={c.slug}
            className="group relative flex flex-col border-b border-r border-line bg-ivory transition-colors duration-500 hover:bg-[#fbf9f5]"
            data-reveal
            style={{ "--reveal-delay": `${(i % 3) * 90}ms` } as React.CSSProperties}
          >
            <CategoryVisual category={c} className="aspect-[4/3]" />
            <div className="flex flex-1 flex-col p-7 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <Heading className="text-[1.75rem]">
                  {/* Hela ytan blir klickbar via ::after */}
                  <a
                    href={c.href}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {c.name}
                  </a>
                </Heading>
                <span className="shrink-0 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-leather">
                  {c.custom ? "Specialtillverkning" : "Webbutik"}
                </span>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{c.summary}</p>
              {c.brands && (
                <p className="mt-4 text-[0.8125rem] tracking-wide text-ink">
                  <span className="sr-only">Varumärken: </span>
                  {c.brands.join(" · ")}
                </p>
              )}
              <span
                className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.875rem] font-medium text-navy"
                aria-hidden="true"
              >
                <span className="link-underline">{external ? "Se i webbutiken" : "Läs mer"}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                  {external ? "↗" : "→"}
                </span>
              </span>
            </div>
            {/* Fokusram för hela kortet vid tangentbordsnavigering */}
            <span className="pointer-events-none absolute inset-0 hidden outline-2 -outline-offset-4 outline-leather group-has-[a:focus-visible]:block" />
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------------------------------------------------------- */

export function ProcessSteps({ tone = "light" }: { tone?: "light" | "bone" }) {
  return (
    <ol className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
      {processSteps.map((step, i) => (
        <li
          key={step.title}
          className={`flex flex-col p-8 sm:p-10 ${tone === "bone" ? "bg-bone" : "bg-ivory"}`}
          data-reveal
          style={{ "--reveal-delay": `${i * 110}ms` } as React.CSSProperties}
        >
          <span className="font-serif text-[3.5rem] leading-none text-leather" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-[1.75rem]">
            <span className="sr-only">Steg {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */

export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative border-l border-line pl-8 sm:pl-12">
      {items.map((m, i) => (
        <li
          key={m.title}
          className="relative pb-14 last:pb-0"
          data-reveal
          style={{ "--reveal-delay": `${i * 60}ms` } as React.CSSProperties}
        >
          <span
            className="absolute -left-[calc(2rem+4.5px)] top-3 size-2.5 rounded-full border border-leather bg-ivory sm:-left-[calc(3rem+4.5px)]"
            aria-hidden="true"
          />
          <p className="font-serif text-[2rem] leading-none text-leather">{m.when}</p>
          <h3 className="mt-3 text-[1.75rem]">{m.title}</h3>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{m.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------- */

/** Avslutande kontaktsektion som används på flera sidor. */
export function ContactCta({
  title = "Har ni ett projekt i åtanke?",
  text = "Berätta om vad som ska förvaras, bäras eller presenteras. Kontakta oss så diskuterar vi väskor och etuier anpassade efter era behov.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="kontakt-cta" className="on-dark relative overflow-hidden bg-navy text-ivory">
      <Illustration
        name="hardcase"
        strokeWidth={0.9}
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[44rem] -translate-y-1/2 text-ivory/10 lg:block"
      />
      <div className="container-page relative py-20 sm:py-28">
        <div className="max-w-2xl" data-reveal>
          <p className="eyebrow text-leather-light">Förfrågningar</p>
          <h2 id="kontakt-cta" className="mt-5 text-[2.5rem] text-ivory sm:text-[3.25rem] lg:text-[3.75rem]">
            {title}
          </h2>
          <p className="mt-6 text-[1.125rem] leading-relaxed text-ivory/75">{text}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href="/kontakt" variant="light">
              Kontakta oss
            </ButtonLink>
            <a href={company.phone.href} className="inline-flex items-center gap-3 text-ivory/85 hover:text-ivory">
              <PhoneIcon className="size-5 text-leather-light" />
              <span className="link-underline">{company.phone.display}</span>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="inline-flex items-center gap-3 text-ivory/85 hover:text-ivory"
            >
              <MailIcon className="size-5 text-leather-light" />
              <span className="link-underline">{company.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { ArrowLink };
