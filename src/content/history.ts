/**
 * Familjens historia enligt www.wolf.se/om-oss/.
 * Lägg inte till årtal eller påståenden som inte finns i originalkällan.
 */
export type Milestone = {
  /** Årtal eller kort tidsangivelse. */
  when: string;
  title: string;
  text: string;
};

export const historyIntro =
  "Familjen Wolf har över 180 års erfarenhet av att tillverka etuier, skrin och väskor. Kunnandet har gått i arv från generation till generation – från en silversmedja i Tyskland till dagens verksamhet i Stockholmsområdet.";

export const milestones: Milestone[] = [
  {
    when: "Början",
    title: "Silversmeden i Hanau",
    text: "Den tyska silversmeden Philip Wolf upptäckte att hans silverbestick sålde bättre när de presenterades i vackra etuier. När han sålde fler etuier än bestick började han i stället utveckla etuidesignen och startade företag i Hanau. Han tillverkade även smyckeskrin som både var vackra och skyddade juvelerna.",
  },
  {
    when: "1896",
    title: "Skandinaviska Etuifabriken i Malmö",
    text: "Philip Wolf II, som gått i lära hos Philip Wolf, flyttade efter en sommar i Sydsverige till Malmö och startade den egna verkstaden Skandinaviska Etuifabriken. Vid industri- och hantverksutställningen i Malmö 1896 fick firman ett särskilt pris för sitt hantverk.",
  },
  {
    when: "1936",
    title: "Stockholms Etui- och koffertfabrik AB",
    text: "Ernst Wolf flyttade till Stockholm och grundade Stockholms Etui- och koffertfabrik AB, med inriktning på demonstrationsväskor och koffertar. Brodern Philip Wolf III förde familjens etuier ut på nya marknader och reste efter andra världskriget till USA för att sälja etuier för klockor och smycken.",
  },
  {
    when: "1977",
    title: "Nästa generation tar över",
    text: "Bröderna Lennart och Robert Wolf tog över företaget och förde verksamheten vidare.",
  },
  {
    when: "1986",
    title: "Butiken på Atlasgatan",
    text: "Lennart och Robert öppnade butiken på Atlasgatan 4 i Stockholm. Även Roberts son Christopher har kommit in i verksamheten – ännu en generation Wolf.",
  },
];

/** Korta, verifierade nyckeltal för startsidan. */
export const keyFacts = [
  { value: "180+", label: "års erfarenhet i familjen Wolf" },
  { value: "1936", label: "grundades företaget i Stockholm" },
  { value: "60+", label: "år av demo- och säljväskor" },
];
