import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/site";

/**
 * Företagets logotyp.
 *
 * Den officiella logotypfilen kunde inte hämtas från www.wolf.se vid
 * utvecklingen. Lägg företagets logotyp i /public/brand/ och ange sökvägen
 * nedan, så ersätts den typografiska namnskylten automatiskt.
 */
const logo: { src: string; width: number; height: number } | null = null;

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-navy" : "text-ivory";
  const sub = tone === "dark" ? "text-muted" : "text-ivory/70";

  return (
    <Link href="/" className={`inline-flex items-center ${color}`} aria-label={`${company.name} – till startsidan`}>
      {logo ? (
        <Image src={logo.src} width={logo.width} height={logo.height} alt="" priority className="h-10 w-auto" />
      ) : (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[1.75rem] font-semibold tracking-[0.22em]">WOLF</span>
          <span className={`mt-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] ${sub}`}>
            Stockholms Etui- &amp; Koffertfabrik
          </span>
        </span>
      )}
    </Link>
  );
}
