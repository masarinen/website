// Körs i WordPress blockredigerare (window.wp finns). Bygger alla mönster med
// createBlock och serialiserar dem, så att markeringen alltid är giltig.
// Returnerar { slug: { title, cats, blockTypes?, markup } }.
() => {
  const C = wp.blocks.createBlock;
  const H = (s) => s; // läsbarhet
  const sp = (v) => (v === "0" ? "0" : `var:preset|spacing|${v}`);
  const pad = (t = "60", b = t) => ({ spacing: { padding: { top: sp(t), bottom: sp(b) } } });
  const p = (content, a = {}) => C("core/paragraph", { content, ...a });
  const eyebrow = (t) => p(t, { className: "is-style-overrubrik" });
  const lede = (t, a = {}) => p(t, { fontSize: "lede", textColor: "muted", ...a });
  const small = (t, a = {}) => p(t, { fontSize: "small", textColor: "muted", ...a });
  const h = (level, content, a = {}) => C("core/heading", { level, content, ...a });
  const arrow = (label, url, a = {}) => p(`<a href="${url}">${label}</a>`, { className: "is-style-pil", ...a });
  const btn = (text, url, style) => C("core/button", style ? { text, url, className: `is-style-${style}` } : { text, url });
  const btns = (...b) => C("core/buttons", {}, b.filter(Boolean));
  const ill = (name, a = {}) => C("core/image", { url: `%%ILL:${name}%%`, alt: "", sizeSlug: "full", ...a });
  const group = (a, inner = []) => C("core/group", a, inner);
  const stack = (inner, a = {}) => group({ layout: { type: "flex", orientation: "vertical" }, ...a }, inner);
  const section = (cls, inner, { bg, t = "60", b = t, tag = "section" } = {}) =>
    group({ tagName: tag, align: "full", className: `wolf-sec ${cls}`.trim(), ...(bg ? { backgroundColor: bg } : {}), style: pad(t, b), layout: { type: "constrained" } }, inner);
  const wide = (inner, a = {}) => group({ align: "wide", layout: { type: "default" }, ...a }, inner);
  const grid = (cls, count, min, inner, gap) =>
    group({ align: "wide", className: cls, layout: { type: "grid", columnCount: count, minimumColumnWidth: min }, ...(gap !== undefined ? { style: { spacing: { blockGap: gap } } } : {}) }, inner);
  const cols = (inner, a = {}) => C("core/columns", { align: "wide", ...a }, inner);
  const col = (inner, width, a = {}) => C("core/column", width ? { width, ...a } : a, inner);
  const list = (items, a = {}) => C("core/list", a, items.map((t) => C("core/list-item", { content: t })));
  const U = (path) => `%%URL:${path}%%`;

  // ---------- Sektioner ----------
  const head = ({ eyebrow: e, heading, text, level = 2 }) => [e && eyebrow(e), h(level, heading), text && lede(text)].filter(Boolean);

  const hero = () => section("wolf-hero", [
    cols([
      col([
        eyebrow("Stockholms Etui- &amp; Koffertfabrik Wolf AB"),
        h(1, "Väskor efter era behov. <em>Erfarenhet sedan generationer.</em>", { fontSize: "hero", className: "wolf-hero__title" }),
        lede("Vi tar fram mjuka eller hårda väskor och etuier efter era önskemål – med mångårig erfarenhet och ett nätverk av pålitliga underleverantörer. I vår webbutik finner ni även vinresväskor, serviceväskor och klockuppdragare från välkända märken."),
        btns(btn("Utforska våra lösningar", U("/specialtillverkade-vaskor/")), btn("Se hela sortimentet", U("/sortiment/"), "outline")),
      ], "50%", { verticalAlignment: "center", className: "wolf-hero__text" }),
      col([
        C("core/cover", { overlayColor: "navy", isUserOverlayColor: true, dimRatio: 100, minHeight: 480, minHeightUnit: "px", contentPosition: "top left", className: "wolf-hero__media", isDark: true }, [
          p("Etuier · Skrin · Väskor", { className: "wolf-hero__label" }),
          ill("hardcase-ljus", { className: "wolf-hero__ill", align: "center" }),
          p("I Stockholm<br>sedan 1936", { className: "wolf-hero__caption" }),
        ]),
      ], "50%", { className: "wolf-hero__mediacol" }),
    ], { verticalAlignment: "stretch" }),
  ], { t: "40", b: "60" });

  const facts = () => section("wolf-facts-sec", [
    grid("wolf-facts", 3, "12rem", [
      ["180+", "års erfarenhet i familjen Wolf"], ["1936", "grundades företaget i Stockholm"], ["60+", "år av demo- och säljväskor"],
    ].map(([v, l]) => stack([p(v, { className: "wolf-fact__value" }), small(l)], { className: "wolf-fact", style: { spacing: { blockGap: "0.25rem" } } })), "0"),
  ], { t: "0", b: "0" });

  const path = ({ dark, image, eyebrow: e, heading, text, brands, label, link }) =>
    group({ className: "wolf-path", ...(dark ? { backgroundColor: "navy", textColor: "ivory" } : { backgroundColor: "bone" }), layout: { type: "flex", orientation: "vertical" }, style: { spacing: { blockGap: "0" } } }, [
      ill(image + (dark ? "-ljus" : ""), { className: "wolf-media wolf-media--wide" }),
      stack([eyebrow(e), h(3, heading), p(text, { className: "wolf-path__text" }), brands && small(brands, { className: "wolf-path__brands" }), arrow(label, link, { className: "is-style-pil wolf-push" })].filter(Boolean), { className: "wolf-path__body", style: { spacing: { blockGap: "1rem" } } }),
    ]);

  const paths = () => section("wolf-paths", [
    wide(head({ eyebrow: "Två vägar in", heading: "Vad söker ni?", text: "En väska som är framtagen för just er uppgift – eller en väska från ett välkänt märke. Välj den väg som passar." }), { className: "wolf-head" }),
    grid("wolf-paths__grid", 2, "22rem", [
      path({ dark: true, image: "demo", eyebrow: "För företag och privatpersoner", heading: "Specialtillverkade väskor", text: "För er som behöver en väska eller ett etui anpassat efter specifika krav – mjukt eller hårt, med inredning efter innehållet.", label: "Om specialtillverkning", link: U("/specialtillverkade-vaskor/") }),
      path({ image: "winder", eyebrow: "Webbutik", heading: "Väskor från välkända varumärken", text: "Vinresväskor, serviceväskor, klockuppdragare och smyckeskrin i vår webbutik.", brands: "Wolf1834 · Samsonite · Parat", label: "Se hela sortimentet", link: U("/sortiment/") }),
    ], "1.5rem"),
  ]);

  const history = () => section("wolf-history", [
    cols([
      col([eyebrow("Ett familjeföretag"), h(2, "Hantverk som gått i arv i över 180 år"),
        lede("Familjen Wolf har över 180 års erfarenhet av att tillverka etuier, skrin och väskor. Kunnandet har gått i arv från generation till generation – från en silversmedja i Tyskland till dagens verksamhet i Stockholmsområdet."),
        arrow("Läs om familjen Wolf", U("/om-oss/"))], "45%"),
      col([grid("wolf-milestones", 2, "12rem", [
        ["1896", "Skandinaviska Etuifabriken i Malmö"], ["1936", "Stockholms Etui- och koffertfabrik AB"], ["1977", "Nästa generation tar över"], ["1986", "Butiken på Atlasgatan"],
      ].map(([y, t]) => stack([p(y, { className: "wolf-year" }), p(t, { className: "wolf-milestone__title" })], { className: "wolf-milestone", style: { spacing: { blockGap: "0.75rem" } } })), "0")], "55%", { verticalAlignment: "bottom" }),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ], { bg: "bone" });

  const card = ({ title, tag, text, brands, image, link, label }) =>
    group({ className: "wolf-card", layout: { type: "flex", orientation: "vertical" }, style: { spacing: { blockGap: "0" } } }, [
      ill(image, { className: "wolf-media" }),
      stack([
        group({ className: "wolf-card__top", layout: { type: "flex", flexWrap: "wrap", justifyContent: "space-between", verticalAlignment: "bottom" }, style: { spacing: { blockGap: "0.25rem 1rem" } } }, [
          h(3, `<a href="${link}">${title}</a>`, { className: "wolf-card__title" }), tag && p(tag, { className: "wolf-card__tag" }),
        ].filter(Boolean)),
        small(text), brands && p(brands, { className: "wolf-card__brands" }),
        arrow(label, link, { className: "is-style-pil wolf-push wolf-card__more" }),
      ].filter(Boolean), { className: "wolf-card__body", style: { spacing: { blockGap: "0.75rem" } } }),
    ]);

  const CARDS = {
    special: { title: "Specialväskor", tag: "Specialtillverkning", text: "Väskor för nästan allt som går att bära – även vattentäta och stöttåliga utföranden, mjuka eller hårda efter behov.", image: "hardcase", link: U("/specialtillverkade-vaskor/"), label: "Läs mer" },
    demo: { title: "Demoväskor", tag: "Webbutik", text: "Kollektions-, försäljnings- och demoväskor för säljare. Vi har tillverkat dem i över 60 år, för allt från dammsugare till klockor och knivar.", image: "demo" },
    service: { title: "Serviceväskor", tag: "Webbutik", text: "Ett brett urval av service- och verktygsväskor för tekniker och hantverkare.", brands: "Parat", image: "toolcase" },
    wine: { title: "Vinresväskor", tag: "Webbutik", text: "Vinväska för tolv flaskor med skal i polypropylen, hjul, utdragbart handtag och kombinationslås.", brands: "Samsonite", image: "wine" },
    winders: { title: "Watch winders", tag: "Webbutik", text: "Klockuppdragare som håller automatiska armbandsur i gång när de inte bärs.", brands: "Wolf1834", image: "winder", link: U("/wolf/"), label: "Se produkterna" },
    jewelry: { title: "Smyckeskrin", tag: "Webbutik", text: "Skrin som både presenterar och skyddar smycken – en tradition som går tillbaka till familjens första verkstad.", brands: "Wolf1834", image: "jewelry", link: U("/wolf/"), label: "Se produkterna" },
    briefcase: { title: "Portföljer", tag: "Webbutik", text: "Portföljer för arbetsdagen och mötet. Kontakta oss för aktuellt utbud.", image: "briefcase" },
    samsonite: { title: "Samsonite", tag: "Rek. utpris", text: "Väskor från Samsonite. Priserna är rekommenderade utpriser – kontakta oss för uppdaterade priser.", brands: "Samsonite", image: "briefcase", link: U("/samsonite/"), label: "Se produkterna" },
  };
  const c = (k, o = {}) => ({ ...CARDS[k], ...o });

  const categories = ({ withHead = true, count = 3, items }) => section("wolf-categories", [
    withHead && group({ align: "wide", className: "wolf-head wolf-head--split", layout: { type: "flex", flexWrap: "wrap", justifyContent: "space-between", verticalAlignment: "bottom" } }, [
      stack(head({ eyebrow: "Våra lösningar", heading: "Från demoväska till klockuppdragare", text: "Ett urval av det vi arbetar med. Specialväskor tas fram efter era behov – övriga kategorier finns i vårt sortiment." }), { className: "wolf-head__text" }),
      arrow("Hela sortimentet", U("/sortiment/")),
    ]),
    grid("wolf-cards", count, count === 4 ? "14rem" : "17rem", items.map(card), "0"),
  ].filter(Boolean), withHead ? {} : { t: "40" });

  const steps = [
    ["Berätta om era behov", "Beskriv vad väskan ska innehålla, hur den ska användas och vilka önskemål ni har om exempelvis storlek, material och antal."],
    ["Vi diskuterar lösningen", "Vi går igenom era krav tillsammans för att förstå behovet och bedöma vilka utföranden som är rimliga."],
    ["En lösning utifrån era krav", "Vi undersöker möjligheterna tillsammans med våra underleverantörer utifrån den önskade produkten och specifikationen."],
  ];
  const process = ({ e, heading, text, bg, stepBg, anchor = "sa-gar-det-till", withButton = true }) => {
    const s = section("wolf-process", [
      wide(head({ eyebrow: e, heading, text }), { className: "wolf-head" }),
      grid("wolf-steps", 3, "16rem", steps.map(([t, x], i) =>
        stack([p(`0${i + 1}`, { className: "wolf-step__num" }), h(3, t), small(x)], { className: "wolf-step", backgroundColor: stepBg, style: { spacing: { blockGap: "0.75rem" } } })), "1px"),
      withButton && group({ align: "wide", className: "wolf-after-steps", layout: { type: "flex", flexWrap: "wrap", verticalAlignment: "center" }, style: { spacing: { blockGap: "1.5rem" } } }, [
        btns(btn("Skicka en förfrågan", U("/kontakt/?amne=Specialbeställning"))),
        small("Vilka lösningar som är möjliga beror på produkt, specifikation och antal – det går vi igenom tillsammans.", { className: "wolf-after-steps__note" }),
      ]),
    ].filter(Boolean), { bg });
    s.attributes.anchor = anchor;
    return s;
  };

  const cta = ({ e = "Förfrågningar", heading, text, art = true }) => section("wolf-cta", [
    art && ill("hardcase-ljus", { className: "wolf-cta__art" }),
    stack([eyebrow(e), h(2, heading, { textColor: "ivory" }), p(text, { className: "wolf-cta__text" }),
      group({ className: "wolf-cta__actions", layout: { type: "flex", flexWrap: "wrap", verticalAlignment: "center" }, style: { spacing: { blockGap: "1.25rem 2rem" } } }, [
        btns(btn("Kontakta oss", U("/kontakt/"), "ljus")),
        p('<a href="tel:+4687360855">08-736 08 55</a>', { className: "wolf-cta__phone" }),
      ]),
    ], { className: "wolf-cta__inner", style: { spacing: { blockGap: "1.25rem" } } }),
  ].filter(Boolean), { bg: "navy", tag: "section" });

  const pageHero = ({ e, heading, text, b1, b2 }) => section("wolf-pagehero", [
    stack([eyebrow(e), h(1, heading), text && lede(text), (b1 || b2) && btns(b1 && btn(b1[0], b1[1]), b2 && btn(b2[0], b2[1], "outline"))].filter(Boolean),
      { align: "wide", className: "wolf-pagehero__inner", style: { spacing: { blockGap: "1.5rem" } } }),
  ], { t: "50", b: "50", tag: "div" });

  const quoteList = () => section("wolf-quotelist", [
    cols([
      col([eyebrow("Vårt erbjudande"), p("”Vår mångåriga erfarenhet och vårt breda nät av duktiga och pålitliga underleverantörer ger oss unika möjligheter att erbjuda er mjuka eller hårda väskor helt efter era behov och önskemål.”", { className: "wolf-quote" })], "50%"),
      col([stack([
        ["Mångårig erfarenhet", "Etuier, skrin och väskor har varit familjen Wolfs hantverk i över 180 år. Den erfarenheten hjälper oss att förstå vad en väska behöver klara av."],
        ["Ett brett nätverk av underleverantörer", "Genom duktiga och pålitliga underleverantörer kan vi ta fram både mjuka och hårda väskor – och välja det utförande som passar uppgiften."],
        ["Utformat efter era behov", "Storlek, material, inredning och funktion utgår från det som ska bäras och hur väskan ska användas."],
      ].map(([t, x]) => stack([h(3, t, { fontSize: "large" }), small(x)], { className: "wolf-rule-item", style: { spacing: { blockGap: "0.5rem" } } })), { className: "wolf-rule-list", style: { spacing: { blockGap: "0" } } })], "50%"),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ]);

  const useCases = () => section("wolf-usecases-sec", [
    wide(head({ eyebrow: "Användningsområden", heading: "Väskor för nästan allt som går att bära", text: "Några exempel på vad vi tar fram. Har ni ett behov som inte syns här är ni välkomna att fråga." }), { className: "wolf-head" }),
    grid("wolf-usecases", 2, "22rem", [
      ["demo", "Demo- och säljväskor", "Kollektions- och demoväskor som låter säljare visa sina produkter på ett ordnat och representativt sätt – från dammsugare till klockor och knivar."],
      ["hardcase", "Skyddande väskor", "Vattentäta och stöttåliga väskor för känslig utrustning som ska transporteras säkert."],
      ["jewelry", "Etuier och skrin", "Etuier som presenterar och skyddar, i en tradition som sträcker sig tillbaka till familjens första verkstad."],
      ["toolcase", "Service- och verktygsväskor", "Väskor för tekniker och servicepersonal, där verktyg och reservdelar har sin givna plats."],
    ].map(([i, t, x]) => group({ className: "wolf-usecase", backgroundColor: "bone", layout: { type: "flex", flexWrap: "nowrap", verticalAlignment: "center" }, style: { spacing: { blockGap: "1.5rem" } } }, [
      ill(i, { className: "wolf-usecase__img", width: "8rem" }), stack([h(3, t, { fontSize: "large" }), small(x)], { style: { spacing: { blockGap: "0.5rem" } } }),
    ])), "1px"),
  ], { bg: "bone" });

  const checklist = () => section("wolf-checklist-sec", [
    cols([
      col([h(2, "Inför er förfrågan"), lede("Ju mer vi vet från början, desto lättare blir det att bedöma vad som passar. Det här är bra att berätta:"), btns(btn("Skicka en förfrågan", U("/kontakt/?amne=Specialbeställning")))], "45%"),
      col([list([
        "Vad ska väskan eller etuiet innehålla – gärna med mått och vikt",
        "Hur och var ska den användas, och hur ofta transporteras den",
        "Mjukt eller hårt utförande, och eventuella krav på skydd",
        "Önskad inredning, färg, märkning eller logotyp",
        "Ungefärligt antal och när ni behöver väskorna",
      ], { className: "wolf-checklist" })], "55%"),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ]);

  const brands = () => section("wolf-brands-sec", [
    wide(head({ eyebrow: "Varumärken", heading: "Välkända märken i sortimentet" }), { className: "wolf-head" }),
    grid("wolf-brands", 3, "10rem", ["Samsonite", "Wolf1834", "Parat"].map((n) => p(n, { className: "wolf-brand" })), "0"),
  ], { t: "0" });

  const textColumns = () => section("wolf-textcols", [
    grid("wolf-textcols__grid", 2, "20rem", [
      stack([h(2, "Leverans inom Norden", { fontSize: "large" }), p("Alla produkter kan levereras till adresser i hela Norden. Ring eller mejla oss för mer information.", { textColor: "muted" })]),
      stack([h(2, "Reparationer", { fontSize: "large" }), p(`Vi utför även reparationer av väskor, till exempel flygskador på Samsonite-väskor. <a href="${U("/kontakt/?amne=Reparation")}">Kontakta oss</a> och beskriv skadan, så berättar vi hur ni går vidare.`, { textColor: "muted" })]),
    ], "clamp(2.5rem, 5vw, 4rem)"),
  ], { bg: "bone" });

  const MILESTONES = [
    ["Början", "Silversmeden i Hanau", "Den tyska silversmeden Philip Wolf upptäckte att hans silverbestick sålde bättre när de presenterades i vackra etuier. När han sålde fler etuier än bestick började han i stället utveckla etuidesignen och startade företag i Hanau. Han tillverkade även smyckeskrin som både var vackra och skyddade juvelerna."],
    ["1896", "Skandinaviska Etuifabriken i Malmö", "Philip Wolf II, som gått i lära hos Philip Wolf, flyttade efter en sommar i Sydsverige till Malmö och startade den egna verkstaden Skandinaviska Etuifabriken. Vid industri- och hantverksutställningen i Malmö 1896 fick firman ett särskilt pris för sitt hantverk."],
    ["1936", "Stockholms Etui- och koffertfabrik AB", "Ernst Wolf flyttade till Stockholm och grundade Stockholms Etui- och koffertfabrik AB, med inriktning på demonstrationsväskor och koffertar. Brodern Philip Wolf III förde familjens etuier ut på nya marknader och reste efter andra världskriget till USA för att sälja etuier för klockor och smycken."],
    ["1977", "Nästa generation tar över", "Bröderna Lennart och Robert Wolf tog över företaget och förde verksamheten vidare."],
    ["1986", "Butiken på Atlasgatan", "Lennart och Robert öppnade butiken på Atlasgatan 4 i Stockholm. Även Roberts son Christopher har kommit in i verksamheten – ännu en generation Wolf."],
  ];
  const timeline = () => section("wolf-timeline-sec", [
    cols([
      col([stack([eyebrow("Historien"), h(2, "Från silversmedja till koffertfabrik"), ill("jewelry", { className: "wolf-media wolf-timeline__img" })], { className: "wolf-sticky", style: { spacing: { blockGap: "1.5rem" } } })], "40%"),
      col([stack(MILESTONES.map(([y, t, x]) => stack([p(y, { className: "wolf-year wolf-year--s" }), h(3, t), p(x, { textColor: "muted" })], { className: "wolf-timeline__item", style: { spacing: { blockGap: "0.75rem" } } })), { className: "wolf-timeline", style: { spacing: { blockGap: "3.5rem" } } })], "60%"),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ]);

  const today = () => section("wolf-today", [
    cols([
      col([eyebrow("I dag"), h(2, "Samma hantverkstradition, nya behov")], "45%"),
      col([
        lede("Vår mångåriga erfarenhet och vårt breda nät av duktiga och pålitliga underleverantörer ger oss unika möjligheter att erbjuda er mjuka eller hårda väskor helt efter era behov och önskemål."),
        p("I dag tar vi fram specialväskor och demoväskor efter kundens behov, och säljer vinresväskor, serviceväskor, klockuppdragare, smyckeskrin och mer från välkända märken. Vi utför även reparationer av väskor."),
        p("Familjens etuitradition lever också vidare i varumärket Wolf1834, med etuier för klockor och smycken samt klockuppdragare – produkter som finns i vårt sortiment."),
        btns(btn("Specialtillverkade väskor", U("/specialtillverkade-vaskor/")), btn("Se sortimentet", U("/sortiment/"), "outline")),
      ], "55%"),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ], { bg: "bone" });

  const contactItem = (label, value) => stack([p(label, { className: "wolf-contact__label" }), p(value, { className: "wolf-contact__value" })], { className: "wolf-contact__item", style: { spacing: { blockGap: "0.25rem" } } });
  const contact = () => section("wolf-contact", [
    cols([
      col([
        h(2, "Kontaktuppgifter", { fontSize: "large" }),
        stack([
          contactItem("Telefon", '<a href="tel:+4687360855">08-736 08 55</a>'),
          contactItem("E-post", '<a href="mailto:robert@wolf.se">robert@wolf.se</a>'),
          contactItem("Adress", "Stockholms Etui- &amp; Koffertfabrik Wolf AB<br>Roslagsvägen 120<br>184 91 Åkersberga"),
        ], { className: "wolf-contact__list", style: { spacing: { blockGap: "0" } } }),
        small(`Söker ni en produkt ur vårt sortiment? Se <a href="${U("/sortiment/")}">hela sortimentet</a>. Alla produkter kan levereras till adresser i hela Norden.`),
      ], "40%"),
      col([h(2, "Skicka ett meddelande", { fontSize: "large" }), small("Vi besvarar förfrågningar via e-post eller telefon."), C("core/shortcode", { text: "[wolf_kontaktformular]" })], "60%"),
    ], { style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 6rem)" } } } }),
  ], { t: "20" });

  const brandAbout = ({ image, heading, text, b1, b2 }) => section("wolf-brandabout", [
    cols([
      col([ill(image, { className: "wolf-media wolf-media--wide" })], "50%"),
      col([eyebrow("Om märket"), h(2, heading), ...text.map((t) => lede(t)), btns(btn(b1[0], b1[1], "outline"), btn(b2[0], b2[1]))], "50%", { verticalAlignment: "center" }),
    ], { verticalAlignment: "center", style: { spacing: { blockGap: { left: "clamp(2.5rem, 6vw, 4rem)" } } } }),
  ], { bg: "bone" });

  const products = (cat) => section("wolf-products", [
    group({ align: "wide", layout: { type: "default" } }, [C("core/shortcode", { text: `[wolf_produkter kategori="${cat}"]` })]),
  ], { t: "0" });

  // ---------- Sidhuvud och sidfot ----------
  const NL = (label, url) => C("core/navigation-link", { label, url, kind: "custom", isTopLevelLink: true });
  const header = () => group({ tagName: "div", className: "wolf-header", layout: { type: "constrained" }, style: { spacing: { padding: { top: "0", bottom: "0" } } } }, [
    group({ align: "wide", className: "wolf-header__inner", layout: { type: "flex", flexWrap: "nowrap", justifyContent: "space-between", verticalAlignment: "center" } }, [
      p(`<a href="${U("/")}">WOLF</a>`, { className: "wolf-logo" }),
      C("core/navigation", { overlayMenu: "mobile", className: "wolf-nav", layout: { type: "flex", justifyContent: "right" }, style: { spacing: { blockGap: "1.75rem" } } }, [
        NL("Startsida", U("/")),
        NL("Specialtillverkade väskor", U("/specialtillverkade-vaskor/")),
        C("core/navigation-submenu", { label: "Sortiment", url: U("/sortiment/"), kind: "custom" }, [
          C("core/navigation-link", { label: "WOLF", url: U("/wolf/"), kind: "custom" }),
          C("core/navigation-link", { label: "Samsonite", url: U("/samsonite/"), kind: "custom" }),
          C("core/navigation-link", { label: "Hela sortimentet", url: U("/sortiment/"), kind: "custom" }),
        ]),
        NL("Om oss", U("/om-oss/")),
        NL("Kontakt", U("/kontakt/")),
      ]),
    ]),
  ]);

  const flinks = (items) => list(items.map(([l, u]) => `<a href="${u}">${l}</a>`), { className: "wolf-footer__list" });
  const footer = () => group({ tagName: "div", className: "wolf-footer", backgroundColor: "navy", textColor: "ivory", layout: { type: "constrained" }, style: { spacing: { padding: { top: "0", bottom: "0" } } } }, [
    cols([
      col([p(`<a href="${U("/")}">WOLF</a>`, { className: "wolf-logo" }), p("Ett familjeföretag med över 180 års erfarenhet av etuier, skrin och väskor. Specialtillverkade lösningar och väskor från välkända märken.", { className: "wolf-footer__about" })], "36%"),
      col([h(2, "Kontakt", { className: "wolf-footer__h" }), p("Stockholms Etui- &amp; Koffertfabrik Wolf AB<br>Roslagsvägen 120<br>184 91 Åkersberga"), p('Tele: <a href="tel:+4687360855">08-736 08 55</a><br>E-post: <a href="mailto:robert@wolf.se">robert@wolf.se</a>')], "28%"),
      col([h(2, "Webbplatsen", { className: "wolf-footer__h" }), flinks([["Startsida", U("/")], ["Specialtillverkade väskor", U("/specialtillverkade-vaskor/")], ["Sortiment", U("/sortiment/")], ["Om oss", U("/om-oss/")], ["Kontakt", U("/kontakt/")]])], "18%"),
      col([h(2, "Sortiment", { className: "wolf-footer__h" }), flinks([["WOLF", U("/wolf/")], ["Samsonite", U("/samsonite/")], ["Hela sortimentet", U("/sortiment/")]])], "18%"),
    ], { className: "wolf-footer__grid", style: { spacing: { blockGap: { left: "2rem" } } } }),
    group({ align: "full", className: "wolf-footer__bottom", layout: { type: "constrained" } }, [
      group({ align: "wide", layout: { type: "flex", flexWrap: "wrap", justifyContent: "space-between" }, style: { spacing: { blockGap: "0.75rem 1.5rem" } } }, [
        p("© [wolf_ar] Stockholms Etui- &amp; Koffertfabrik Wolf AB · Org.nr 556136-8373"),
        p(`<a href="https://www.facebook.com/sthlmsetui/">Facebook</a> · <a href="${U("/integritetspolicy/")}">Integritetspolicy</a> · <a href="${U("/anvandarvillkor/")}">Användarvillkor</a> · <a href="${U("/rattsligt-meddelande/")}">Rättsligt meddelande</a>`),
      ]),
    ]),
  ]);

  const S = (b) => wp.blocks.serialize(Array.isArray(b) ? b : [b]);
  const sec = "wolf-sektioner", pg = "wolf-sidor";
  const out = {};
  const add = (slug, title, blocks, cats = [sec], extra = {}) => (out[slug] = { title, cats, markup: S(blocks), ...extra });

  // Sektioner (en standardversion var, för att infoga på valfri sida)
  add("hero", "Startsidans toppbild", hero());
  add("nyckeltal", "Nyckeltal", facts());
  add("tva-vagar", "Två vägar in", paths());
  add("historik", "Historik i korthet", history());
  add("kategorier", "Kategorikort", categories({ items: [c("special"), c("demo", { link: U("/sortiment/"), label: "Läs mer" }), c("service", { link: U("/sortiment/"), label: "Läs mer" })] }));
  add("process", "Så går det till (tre steg)", process({ e: "Specialbeställningar", heading: "Så går en förfrågan till", text: "Varje uppdrag är olika. Vi börjar alltid med att förstå vad väskan ska klara av.", bg: "bone", stepBg: "ivory" }));
  add("kontakt-cta", "Kontaktruta (mörk)", cta({ heading: "Har ni ett projekt i åtanke?", text: "Berätta om vad som ska förvaras, bäras eller presenteras. Kontakta oss så diskuterar vi väskor och etuier anpassade efter era behov." }));
  add("sidrubrik", "Sidans rubrik", pageHero({ e: "Överrubrik", heading: "Sidans rubrik", text: "En kort ingress som beskriver sidan." }));
  add("citat-lista", "Citat och lista", quoteList());
  add("anvandningsomraden", "Användningsområden", useCases());
  add("checklista", "Checklista", checklist());
  add("varumarken", "Varumärken", brands());
  add("textkolumner", "Två textkolumner", textColumns());
  add("tidslinje", "Tidslinje", timeline());
  add("i-dag", "Text i två spalter", today());
  add("kontakt", "Kontaktuppgifter och formulär", contact());
  add("produkter", "Produkter (WooCommerce)", products("wolf"));
  add("sidhuvud", "Sidhuvud", header(), [], { inserter: false });
  add("sidfot", "Sidfot", footer(), [], { inserter: false });

  // Hela sidor
  const page = (slug, title, blocks) => add(slug, title, blocks, [pg], { page: true });
  page("sida-startsida", "Startsida", [hero(), facts(), paths(), history(),
    categories({ items: [c("special"), c("demo", { link: U("/sortiment/"), label: "Läs mer" }), c("service", { link: U("/sortiment/"), label: "Läs mer" }), c("wine", { link: U("/sortiment/"), label: "Se i sortimentet" }), c("winders"), c("jewelry")] }),
    process({ e: "Specialbeställningar", heading: "Så går en förfrågan till", text: "Varje uppdrag är olika. Vi börjar alltid med att förstå vad väskan ska klara av.", bg: "bone", stepBg: "ivory" }),
    cta({ heading: "Har ni ett projekt i åtanke?", text: "Berätta om vad som ska förvaras, bäras eller presenteras. Kontakta oss så diskuterar vi väskor och etuier anpassade efter era behov." })]);
  page("sida-specialtillverkade-vaskor", "Specialtillverkade väskor", [
    pageHero({ e: "Specialtillverkade väskor", heading: "Väskor och etuier, utformade efter uppgiften", text: "För företag och kunder som behöver mer än en standardväska. Vi tar fram mjuka eller hårda väskor efter era behov – från en enstaka specialväska till väskor för en hel säljkår.", b1: ["Berätta om ert behov", U("/kontakt/?amne=Specialbeställning")], b2: ["Så går det till", "#sa-gar-det-till"] }),
    quoteList(), useCases(),
    process({ e: "Så går det till", heading: "Från behov till lösning", text: "Vi utgår från era krav och undersöker vad som är möjligt. Vilka utföranden som går att ta fram beror på produkt, specifikation och antal.", stepBg: "bone", withButton: false }),
    checklist(),
    cta({ heading: "Låt oss diskutera ert behov", text: "Beskriv vad väskan eller etuiet ska användas till, så återkommer vi för att diskutera möjliga lösningar." })]);
  const fraga = { link: U("/kontakt/?amne=Fråga om sortimentet"), label: "Fråga oss" };
  page("sida-sortiment", "Sortiment", [
    pageHero({ e: "Sortiment", heading: "Väskor och etuier för arbete, resa och förvaring", text: "Här är våra produktkategorier. Specialväskor tar vi fram efter era behov – övriga produkter beställer ni enkelt hos oss.", b2: ["Specialtillverkning", U("/specialtillverkade-vaskor/")] }),
    categories({ withHead: false, count: 4, items: [c("special"), c("demo", fraga), c("wine", fraga), c("service", fraga), c("winders"), c("jewelry"), c("briefcase", fraga), c("samsonite")] }),
    brands(), textColumns(),
    cta({ heading: "Hittar ni inte det ni söker?", text: "Kontakta oss så hjälper vi er vidare – eller diskuterar en väska som tas fram efter era behov." })]);
  page("sida-om-oss", "Om oss", [
    pageHero({ e: "Om oss", heading: "Familjen Wolf – etuier, skrin och väskor i generationer", text: "Familjen Wolf har över 180 års erfarenhet av att tillverka etuier, skrin och väskor. Kunnandet har gått i arv från generation till generation – från en silversmedja i Tyskland till dagens verksamhet i Stockholmsområdet." }),
    facts(), timeline(), today(),
    cta({ heading: "Har ni ett projekt i åtanke?", text: "Berätta om vad som ska förvaras, bäras eller presenteras. Kontakta oss så diskuterar vi väskor och etuier anpassade efter era behov." })]);
  page("sida-kontakt", "Kontakt", [
    pageHero({ e: "Kontakt", heading: "Välkommen att höra av er", text: "Har ni frågor om specialtillverkade väskor, vårt sortiment eller en reparation? Ring, mejla eller använd formuläret nedan." }),
    contact()]);
  page("sida-wolf", "WOLF (märkessida)", [
    pageHero({ e: "Märke", heading: "WOLF <em>sedan 1834</em>", text: "Watch winders, klocklådor och smyckeskrin från WOLF." }),
    products("wolf"),
    brandAbout({ image: "winder", heading: "WOLF <em>sedan 1834</em>", text: ["WOLF har sina rötter i samma familjetradition som vi – etuier och skrin som började med silversmeden Philip Wolf i Hanau. Under namnet WOLF tillverkas i dag etuier för klockor och smycken samt klockuppdragare (watch winders) för automatiska armbandsur.", "Hos oss hittar du ett urval av WOLFs smyckeskrin och watch winders. Söker du en modell som inte finns i sortimentet är du välkommen att kontakta oss."], b1: ["Läs om familjen Wolf", U("/om-oss/")], b2: ["Kontakta oss", U("/kontakt/?amne=Fråga om sortimentet")] }),
    cta({ e: "Rådgivning", heading: "Frågor om en WOLF-produkt?", text: "Vi hjälper dig gärna att hitta rätt watch winder eller smyckeskrin – eller beställa en modell som inte finns i sortimentet.", art: false })]);
  page("sida-samsonite", "Samsonite (märkessida)", [
    pageHero({ e: "Märke", heading: "Samsonite", text: "Priserna är Samsonites rekommenderade utpriser. Kontakta oss för uppdaterade priser." }),
    products("samsonite"),
    brandAbout({ image: "briefcase", heading: "Samsonite", text: ["Samsonite grundades 1910 i Denver, USA, och är i dag ett av världens mest kända märken för väskor och resetillbehör.", "Priserna på den här sidan är Samsonites rekommenderade utpriser. Kontakta oss för uppdaterade priser och tillgänglighet. Är ni företagskund med avtal kan ni logga in för att se era priser."], b1: ["Hela sortimentet", U("/sortiment/")], b2: ["Kontakta oss för pris", U("/kontakt/?amne=Fråga om sortimentet")] }),
    cta({ e: "Rådgivning", heading: "Vill du ha ett aktuellt pris?", text: "Priserna som visas är rekommenderade utpriser. Hör av dig så lämnar vi ett aktuellt pris – även för större beställningar till företag.", art: false })]);
  return out;
};
