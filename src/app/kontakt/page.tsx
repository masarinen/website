import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { PageHero } from "@/components/sections";
import { company, shopUrl } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakta Stockholms Etui- & Koffertfabrik Wolf AB om specialtillverkade väskor och etuier eller frågor om sortimentet. Telefon 08-736 08 55.",
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Välkommen att höra av er"
        intro="Har ni frågor om specialtillverkade väskor, vårt sortiment eller en reparation? Ring, mejla eller använd formuläret nedan."
      />

      <section aria-label="Kontaktuppgifter och formulär" className="py-16 sm:py-24">
        <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4" data-reveal>
            <h2 className="text-[2rem]">Kontaktuppgifter</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              <li className="flex gap-4 py-6">
                <PhoneIcon className="mt-1 size-5 shrink-0 text-leather" />
                <div>
                  <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-muted">Telefon</p>
                  <a href={company.phone.href} className="link-underline mt-1 inline-block text-[1.125rem] text-navy">
                    {company.phone.display}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 py-6">
                <MailIcon className="mt-1 size-5 shrink-0 text-leather" />
                <div>
                  <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-muted">E-post</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="link-underline mt-1 inline-block text-[1.125rem] text-navy"
                  >
                    {company.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-4 py-6">
                <PinIcon className="mt-1 size-5 shrink-0 text-leather" />
                <div>
                  <p className="text-[0.8125rem] uppercase tracking-[0.14em] text-muted">Adress</p>
                  <address className="mt-1 not-italic text-ink">
                    {company.name}
                    <br />
                    {company.address.street}
                    <br />
                    {company.address.postalCode} {company.address.city}
                  </address>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-[0.9375rem] leading-relaxed text-muted">
              Söker ni en resväska eller annan produkt ur sortimentet? Besök{" "}
              <a href={shopUrl()} className="link-underline text-navy">
                webbutiken
              </a>
              . Alla produkter kan levereras till adresser i hela Norden.
            </p>
            <p className="mt-4 text-[0.9375rem] text-muted">
              Följ oss gärna på{" "}
              <a href={company.social[0].href} className="link-underline text-navy" rel="noopener noreferrer">
                Facebook
              </a>
              .
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
            <h2 className="text-[2rem]">Skicka ett meddelande</h2>
            <p className="mt-3 text-muted">Vi besvarar förfrågningar via e-post eller telefon.</p>
            <div className="mt-8">
              <Suspense fallback={<p className="text-muted">Laddar formuläret…</p>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
