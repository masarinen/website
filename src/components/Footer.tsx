import Link from "next/link";
import { company, mainNav, shopUrl } from "@/content/site";
import { categories } from "@/content/categories";
import { Logo } from "./Logo";
import { ArrowUpRight } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  const shopCategories = categories.filter((c) => !c.custom);

  return (
    <footer className="on-dark bg-navy text-ivory/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-20">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ivory/70">
            Ett familjeföretag med över 180 års erfarenhet av etuier, skrin och väskor. Specialtillverkade
            lösningar och resväskor från välkända märken.
          </p>
        </div>

        <div className="lg:col-span-3">
          <h2 className="eyebrow text-leather-light">Kontakt</h2>
          <address className="mt-5 space-y-3 text-[0.9375rem] not-italic">
            <p>
              {company.name}
              <br />
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
            </p>
            <p>
              <a href={company.phone.href} className="link-underline text-ivory hover:text-ivory">
                {company.phone.display}
              </a>
              <br />
              <a href={`mailto:${company.email}`} className="link-underline text-ivory">
                {company.email}
              </a>
            </p>
          </address>
        </div>

        <nav aria-label="Snabblänkar" className="lg:col-span-2">
          <h2 className="eyebrow text-leather-light">Webbplatsen</h2>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem]">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Webbutikens kategorier" className="lg:col-span-3">
          <h2 className="eyebrow text-leather-light">Webbutik</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.9375rem] lg:grid-cols-1">
            {shopCategories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <a href={c.href} className="transition-colors hover:text-ivory">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={shopUrl()}
            className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ivory"
          >
            <span className="link-underline">Till webbutiken</span>
            <ArrowUpRight className="size-4" />
          </a>
        </nav>
      </div>

      <div className="border-t border-ivory/15">
        <div className="container-page flex flex-col gap-3 py-6 text-[0.8125rem] text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name} · Org.nr {company.orgNumber}
          </p>
          <ul className="flex gap-6">
            {company.social.map((s) => (
              <li key={s.href}>
                <a href={s.href} className="transition-colors hover:text-ivory" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
