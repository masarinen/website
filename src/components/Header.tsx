"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { mainNav, shopNavItem, company } from "@/content/site";
import { Logo } from "./Logo";
import { ArrowUpRight, CloseIcon, MenuIcon, PhoneIcon } from "./Icons";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Stäng mobilmenyn vid sidbyte.
  if (open && openedAt !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Håll fokus inom menyn när den är öppen.
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      toggle?.focus();
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        open
          ? "border-line bg-ivory" // ingen backdrop-filter här – den skulle bli containing block för den fasta menypanelen
          : scrolled
            ? "border-line bg-ivory/95 backdrop-blur-sm"
            : "border-transparent bg-ivory"
      }`}
    >
      <a
        href="#innehall"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Hoppa till innehållet
      </a>

      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Huvudmeny" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.875rem] tracking-wide transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 ${
                      active
                        ? "text-navy after:scale-x-100"
                        : "text-muted hover:text-navy after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href={shopNavItem.href}
                className="group inline-flex items-center gap-2 rounded-full border border-navy px-5 py-2.5 text-[0.875rem] font-medium tracking-wide text-navy transition-colors duration-300 hover:bg-navy hover:text-ivory"
              >
                {shopNavItem.label}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                <span className="sr-only">(öppnar den befintliga webbutiken)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobilmeny"
          onClick={() => {
            setOpenedAt(pathname);
            setOpen((v) => !v);
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
          <span className="sr-only">{open ? "Stäng menyn" : "Öppna menyn"}</span>
        </button>
      </div>

      <div
        id="mobilmeny"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto border-t border-line bg-ivory lg:hidden"
      >
        <nav aria-label="Mobilmeny" className="container-page flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line border-b border-line">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-4 font-serif text-[1.75rem] ${
                      active ? "text-leather" : "text-navy"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={shopNavItem.href}
            className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 font-medium text-ivory"
          >
            Besök webbutiken
            <ArrowUpRight className="size-4" />
          </a>
          <a
            href={company.phone.href}
            className="mt-auto inline-flex items-center gap-3 pt-10 text-muted"
          >
            <PhoneIcon className="size-5 text-leather" />
            {company.phone.display}
          </a>
        </nav>
      </div>
    </header>
  );
}
