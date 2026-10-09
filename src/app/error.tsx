"use client";

import { company } from "@/content/site";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">Något gick fel</p>
      <h1 className="mt-5 max-w-3xl text-[2.75rem] sm:text-[3.5rem]">Sidan kunde inte visas</h1>
      <p className="lede mt-6 max-w-xl">
        Ett tillfälligt fel uppstod. Försök igen – eller kontakta oss på {company.phone.display}.
      </p>
      <div className="mt-10">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center rounded-full bg-navy px-7 py-3 font-medium text-ivory hover:bg-navy-soft"
        >
          Försök igen
        </button>
      </div>
    </section>
  );
}
