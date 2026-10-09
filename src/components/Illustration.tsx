/**
 * Linjeillustrationer i ett gemensamt formspråk. De används som
 * bildersättning tills företagets egna produktfotografier finns på plats
 * (se `image` i src/content/categories.ts). Illustrationerna är dekorativa
 * och döljs därför för skärmläsare.
 */

export type IllustrationName =
  | "hardcase"
  | "demo"
  | "suitcase"
  | "wine"
  | "toolcase"
  | "winder"
  | "jewelry"
  | "briefcase"
  | "trolley";

const drawings: Record<IllustrationName, React.ReactNode> = {
  hardcase: (
    <>
      {/* Öppet lock med äggkartongsskum */}
      <path d="M100 20v-6h40v6" />
      <path d="M40 92 52 20h136l12 72" />
      <path d="M58 30h124l10 56H48z" opacity=".55" />
      <path d="M58 44c9-5 17 5 26 0s17 5 26 0 17 5 26 0 17 5 26 0 17 5 24 0" opacity=".45" />
      <path d="M55 58c9-5 17 5 26 0s17 5 26 0 17 5 26 0 17 5 26 0 17 5 28 0" opacity=".45" />
      <path d="M52 72c9-5 17 5 26 0s17 5 26 0 17 5 26 0 17 5 26 0 17 5 32 0" opacity=".45" />
      {/* Underdel sedd uppifrån med utskuren inredning */}
      <path d="M40 92h160l20 54H20z" />
      <path d="M54 102h60l5 34H46z" />
      <ellipse cx="148" cy="119" rx="15" ry="10" />
      <ellipse cx="148" cy="119" rx="6" ry="4" opacity=".55" />
      <path d="M176 101h16l8 35h-18z" />
      <rect x="20" y="146" width="200" height="16" rx="3" />
      <rect x="62" y="149" width="16" height="10" rx="1.5" />
      <rect x="162" y="149" width="16" height="10" rx="1.5" />
    </>
  ),
  demo: (
    <>
      <path d="M96 62V44c0-7 5-12 12-12h24c7 0 12 5 12 12v18" />
      <rect x="38" y="62" width="164" height="96" rx="12" />
      <rect x="46" y="70" width="148" height="80" rx="8" strokeDasharray="2 4" opacity=".5" />
      <path d="M38 76c0-8 6-14 14-14h136c8 0 14 6 14 14v24c-28 9-54 13-82 13s-54-4-82-13z" />
      <rect x="112" y="104" width="16" height="16" rx="2" />
      <path d="M120 113v6" />
    </>
  ),
  suitcase: (
    <>
      <path d="M106 54V22M134 54V22" />
      <rect x="100" y="12" width="40" height="10" rx="4" />
      <rect x="76" y="54" width="88" height="106" rx="12" />
      <path d="M96 64v86M120 64v86M144 64v86" opacity=".5" />
      <path d="M76 98h-4v24h4" />
      <circle cx="88" cy="166" r="5" />
      <circle cx="152" cy="166" r="5" />
    </>
  ),
  wine: (
    <>
      <path d="M104 30v-8c0-3 2-5 5-5h22c3 0 5 2 5 5v8" />
      <rect x="64" y="30" width="112" height="132" rx="14" />
      <rect x="74" y="40" width="92" height="112" rx="8" opacity=".5" />
      {[0, 1, 2].map((c) =>
        [0, 1, 2, 3].map((r) => (
          <g key={`${c}-${r}`}>
            <circle cx={94 + c * 26} cy={58 + r * 26} r="10" />
            <circle cx={94 + c * 26} cy={58 + r * 26} r="3.5" opacity=".6" />
          </g>
        )),
      )}
      <circle cx="82" cy="168" r="4" />
      <circle cx="158" cy="168" r="4" />
    </>
  ),
  toolcase: (
    <>
      <path d="M70 80c0-30 22-46 50-46s50 16 50 46" />
      <path d="M40 80h160l-14 78H54z" />
      <path d="M48 96h144" opacity=".5" />
      <rect x="64" y="108" width="34" height="34" rx="3" />
      <rect x="104" y="108" width="34" height="34" rx="3" />
      <rect x="144" y="108" width="34" height="34" rx="3" />
      <path d="M78 80V58M78 58l-4-8h8z" />
      <path d="M150 80V62c0-5 8-5 8 0v18" />
      <path d="M118 80V66" />
      <circle cx="118" cy="62" r="5" />
    </>
  ),
  winder: (
    <>
      <rect x="48" y="36" width="144" height="118" rx="6" />
      <rect x="58" y="46" width="124" height="98" rx="3" opacity=".5" />
      <circle cx="120" cy="95" r="36" />
      <path d="M107 63h26M107 127h26" opacity=".6" />
      <circle cx="120" cy="95" r="19" />
      <path d="M120 84v11l7 5" />
      <path d="M163 70a50 50 0 0 1 2 46" opacity=".6" />
      <path d="M162 112l3 5 5-3" opacity=".6" />
    </>
  ),
  jewelry: (
    <>
      <path d="M52 86 60 30h120l8 56" />
      <path d="M68 40h104l5 38H63z" opacity=".5" />
      <rect x="48" y="86" width="144" height="70" rx="5" />
      <rect x="58" y="96" width="124" height="50" rx="2" opacity=".5" />
      <path d="M100 96v50M140 96v50" opacity=".5" />
      <circle cx="79" cy="121" r="9" />
      <path d="M79 112l-3-4h6z" />
      <path d="M110 112c6 6 14 6 20 0M110 124c6 6 14 6 20 0M110 136c6 6 14 6 20 0" />
      <circle cx="161" cy="121" r="4" />
      <circle cx="161" cy="121" r="12" opacity=".5" />
    </>
  ),
  briefcase: (
    <>
      <path d="M98 58V46c0-5 4-9 9-9h26c5 0 9 4 9 9v12" />
      <rect x="38" y="58" width="164" height="100" rx="6" />
      <path d="M38 88h164" opacity=".55" />
      <rect x="70" y="82" width="16" height="12" rx="2" />
      <rect x="154" y="82" width="16" height="12" rx="2" />
      <path d="M50 66h140" opacity=".35" />
    </>
  ),
  trolley: (
    <>
      <path d="M150 14h14M157 14v146" />
      <rect x="90" y="44" width="62" height="104" rx="14" />
      <path d="M90 66h62" opacity=".5" />
      <path d="M100 44c0-9 6-14 21-14s21 5 21 14" opacity=".6" />
      <circle cx="104" cy="160" r="10" />
      <circle cx="104" cy="160" r="3" />
      <path d="M114 160h43" />
      <path d="M157 160l10 6" />
    </>
  ),
};

type Props = {
  name: IllustrationName;
  className?: string;
  strokeWidth?: number;
};

export function Illustration({ name, className, strokeWidth = 1.25 }: Props) {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {drawings[name]}
    </svg>
  );
}
