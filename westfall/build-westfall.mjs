import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const version = "20260515c";
const baseUrl = "https://zacgibson.work";
const heroImage = `${baseUrl}/assets/westfall-BoOvYqP9.webp`;

const nav = [
  ["Case", "/westfall/"],
  ["Book", "/westfall/book/"],
  ["Read", "/westfall/read/"],
  ["Lore", "/westfall/lore/"],
  ["Timeline", "/westfall/timeline/"],
  ["Soundtrack", "/westfall/soundtrack/"],
  ["Game", "/westfall/game/"],
  ["Updates", "/westfall/updates/"]
];

const evidence = [
  {
    slug: "flash-drive",
    title: "The Flash Drive",
    level: "Public",
    what: "A source object Silas refuses to trust on any connected machine.",
    where: "The Splinter and the first proof-handling sequence.",
    proves: "Silas survives because restraint is part of his training, not because he guesses correctly.",
    endangers: "Silas, Hale's trail, and anyone tied to the source path."
  },
  {
    slug: "terminal-7",
    title: "Terminal 7",
    level: "Medium",
    what: "A neglected public-library Dell OptiPlex running Windows 10 with local access.",
    where: "Chapter 9, Handley Regional Library, Winchester, Virginia.",
    proves: "Owen's Branch 7 story cannot be true.",
    endangers: "Silas, Collin's trail, and anyone connected to the proof chain."
  },
  {
    slug: "branch-7",
    title: "The Roster",
    level: "Medium",
    what: "A roster fragment that turns a story into names, dates, and contradictions.",
    where: "Terminal 7 files and later Brellford records.",
    proves: "The official explanation is built around a false frame.",
    endangers: "The people on the list and the people who benefit from the list being misunderstood."
  },
  {
    slug: "collin-video",
    title: "Collin's Video",
    level: "Heavy",
    what: "A recorded testimony vector that keeps speaking after the source can no longer safely appear.",
    where: "The House and The Testimony.",
    proves: "The trail is bigger than Owen's version of events.",
    endangers: "Melanie, Marcus, Silas, and the people above the room."
  },
  {
    slug: "bakerton-cache",
    title: "Bakerton Cache",
    level: "Heavy",
    what: "Physical proof held away from the network and away from easy explanation.",
    where: "The Dive and Bakerton.",
    proves: "The case has a custody chain, not just suspicion.",
    endangers: "Everyone still trying to contain the chain quietly."
  },
  {
    slug: "the-feed",
    title: "The Feed",
    level: "Heavy",
    what: "A signal scan that resolves into a living witness.",
    where: "The Feed and Safe House 87 sequence.",
    proves: "The official story needed Melanie dead because her testimony changes the case from records to a person.",
    endangers: "Melanie, Silas, and whoever ordered containment."
  },
  {
    slug: "all-in",
    title: "ALL IN",
    level: "Heavy",
    what: "An emotional receipt disguised as a private object.",
    where: "Suspension, Owen's office, and the late Brellford return.",
    proves: "Trust was not incidental. It was managed.",
    endangers: "Owen's story and Silas's ability to keep the betrayal abstract."
  },
  {
    slug: "brellford-records",
    title: "Brellford Records",
    level: "Heavy",
    what: "Paper, access paths, rooms, and institutional residue that make the visible surface testify against itself.",
    where: "Late-book Brellford sequence.",
    proves: "The hidden program exists inside a respectable institutional shell.",
    endangers: "The chain above Owen."
  },
  {
    slug: "the-receipt",
    title: "The Receipt",
    level: "Heavy",
    what: "The proof object and final arrangement that survive the people trying to own the truth.",
    where: "Season One finale.",
    proves: "The architecture above the architecture is still moving.",
    endangers: "Everyone who thought the case ended with the room."
  }
];

const timeline = [
  ["the-chair", "The Chair", "Water, restraint, and the first image of a man who knows more than the room.", "cold open,capture,pressure"],
  ["mccarran-wynn", "McCarran / Wynn", "A cab from McCarran, a Wynn arrival, and the beginning of a welcome that is already false.", "Las Vegas,legend,handler frame"],
  ["the-conference-room", "The Conference Room", "Money meets money in a room where Silas changes the temperature without raising his voice.", "Wynn,social pressure,threat read"],
  ["level-b2", "Level B2", "Concrete, fluorescent light, and the first hard proof that Silas is not ordinary muscle.", "vehicle bay,kinetic,anomaly"],
  ["the-tahoe", "The Tahoe", "A pre-positioned vehicle, a handler frame, and the first shape of the program.", "Owen,debrief,false authority"],
  ["the-splinter", "The Splinter", "Silas carries a flash drive and refuses to burn it on a connected machine.", "flash drive,restraint,doubt"],
  ["the-wrong-side", "The Wrong Side", "Northern Virginia becomes a surveillance problem with the wrong story underneath it.", "Hale,NoVA,pattern of life"],
  ["suspension", "Suspension", "Owen's warmth withdraws, access closes, and ALL IN begins as a private object.", "Owen,ALL IN,restriction"],
  ["terminal-7", "The Library", "Handley Regional Library. Terminal 7. Everything he believed was wrong.", "Terminal 7,Handley,proof rupture"],
  ["levels", "Levels", "For one night, normal life almost holds.", "Wesley,Jessi,last okay"],
  ["the-rooftop", "The Rooftop", "A parking-structure rooftop, a person who believes him, and a truth that has not become survivable.", "Jessi,trust,risk"],
  ["the-watch", "The Watch", "Owen's private rituals and institutional control move in parallel.", "Owen,Marcus,Brellford"],
  ["the-house", "The House", "A grid coordinate points to Jefferson County and the trail becomes physical.", "Collin,MGRS,farmhouse"],
  ["the-testimony", "The Testimony", "A laptop turns a dead-end into a living witness.", "Collin video,Melanie,do not stop at Owen"],
  ["the-dive", "The Dive", "Bakerton's cold water hides a cache built for a man who might arrive too late.", "Bakerton,cache,receipt"],
  ["the-feed", "The Feed", "A signal scan resolves into the face the official story erased.", "IMSI,Melanie,Safe House 87"],
  ["scorched-earth", "Scorched Earth", "Containment stops being quiet.", "Owen,Naomi,kill order"],
  ["the-kitchen-floor", "The Kitchen Floor", "The cost moves from proof to people.", "Jessi,Marcus,human cost"],
  ["lost", "Lost", "Marcus finishes an operation and cannot finish the feeling.", "Marcus,Owen,fracture"],
  ["stand-down", "Stand Down", "A cache rifle, a safe house, and a rescue that begins with a fight.", "Melanie,safe house,rescue"],
  ["the-campfire", "The Campfire", "The witness speaks where the institution cannot reach the room.", "Melanie,testimony,mountains"],
  ["and-melanie", "And Melanie?", "Owen misreads silence because he has spent decades using it.", "Owen,Marcus,snap"],
  ["six-weeks", "Six Weeks", "Recovery becomes preparation. A route home is programmed before the final approach.", "Garmin,recovery,Black Hawk"],
  ["into-the-dark", "Into The Dark", "Music returns to one room while a final loadout is assembled in another.", "Yamaha,loadout,final prep"],
  ["go-home", "Go Home", "At Brellford, survival is handed over with keys to a black 1999 Jeep Cherokee XJ.", "Jeep,Brellford,Melanie"],
  ["up-on-the-ladder", "Up On The Ladder", "The entry is mechanical, wet, and practical. No badge scam. No clean way in.", "Brellford,fire egress,floor seven"],
  ["where-are-they", "Where Are They", "Owen is forced to answer inside the system he thought he controlled.", "interrogation,dead-man switch,Marcus"],
  ["all-in", "ALL IN", "The chip returns as proof of the relationship that made the lie work.", "Owen office,receipt,betrayal"],
  ["go-home-route", "Go Home", "A westbound drive carries grief, proof, and a waypoint across the continent.", "I-70,Colorado,Garmin"],
  ["the-receipt", "The Receipt", "After the credits, the architecture above the architecture moves.", "Ellison,unidentified figure,Season 2"]
].map(([slug, title, line, tags], index) => ({
  slug,
  chapter: index + 1,
  title,
  line,
  tags: tags.split(",")
}));

const dossiers = [
  {
    slug: "silas-westfall",
    title: "Silas Westfall",
    type: "Person",
    spoiler: "Public",
    confidence: "Locked",
    hook: "An active operator trained to disappear inside orders until the orders start pointing back at him.",
    locked: [
      "Silas is active, not retired, freelance, or ex-contractor.",
      "His training path is Army 18X -> 5th SFG -> ISA Bravo Troop -> DEVGRU cross-attach.",
      "His competence shows through stillness, route discipline, elicitation, interrogation resistance, and evidence handling.",
      "Terminal 7 matters because he knows what not to connect."
    ],
    matters: "His central fracture is trust. Owen's authority worked because it sounded legitimate.",
    connected: ["Terminal 7", "Owen Winters", "ALL IN", "Go Home"],
    doNot: ["retired or freelance framing", "tech-first identity", "rebellion without evidence discipline"]
  },
  {
    slug: "owen-winters",
    title: "Owen Winters",
    type: "Person",
    spoiler: "Medium",
    confidence: "Locked",
    hook: "The handler whose warmth makes the wrong order feel official.",
    locked: [
      "Owen is Silas's handler.",
      "Owen is the Brellford program lead.",
      "He manages Silas through father-coded authority, warmth, withdrawal, and false operational narratives.",
      "He frames Branch 7 and Collin Mathis as rogue."
    ],
    matters: "Owen should feel managerial before he feels monstrous; the betrayal lands because the authority was credible.",
    connected: ["Brellford", "Branch 7", "ALL IN", "Where Are They"],
    doNot: ["game NPC framing", "cartoon villain language", "public-program executive titles", "unconfirmed full corporate names"]
  },
  {
    slug: "brellford",
    title: "Brellford",
    type: "Institution",
    spoiler: "Medium",
    confidence: "Locked",
    hook: "The respectable surface that gives the lie a building, a budget, and a chain of command.",
    locked: [
      "Brellford is the visible institutional surface.",
      "Brellford HQ is a seven-story building at 13820 Sunrise Valley Drive, Reston, Virginia.",
      "Owen operates from Brellford authority.",
      "The Meridian is hidden inside Brellford, not advertised by it."
    ],
    matters: "Brellford makes every wrong order feel procedural, funded, and real.",
    connected: ["The Meridian", "Brellford Records", "Up On The Ladder", "Go Home"],
    doNot: ["secret lair", "faction shop", "public Meridian branding"]
  },
  {
    slug: "the-meridian",
    title: "The Meridian",
    type: "Institution",
    spoiler: "Heavy",
    confidence: "Locked",
    hook: "A hidden program inside Brellford, discovered through proof and paid for in people.",
    locked: [
      "The Meridian is not public-facing.",
      "It is not a library, company lobby, city district, or faction brand.",
      "Silas does not begin with full knowledge of it.",
      "The word earns meaning only after Terminal 7, Collin, Bakerton, Melanie, and Brellford records."
    ],
    matters: "Its horror is procedural: euphemism, money, tasking, containment, and deniability.",
    connected: ["Brellford", "Terminal 7", "Bakerton", "The Receipt"],
    doNot: ["public logo", "company lobby", "city district", "faction brand"]
  },
  {
    slug: "terminal-7",
    title: "Terminal 7",
    type: "Evidence",
    spoiler: "Medium",
    confidence: "Locked",
    hook: "A forgotten public computer that makes the official story impossible.",
    locked: [
      "Terminal 7 sits inside Handley Regional Library in Winchester, Virginia.",
      "It is a neglected Dell OptiPlex from the 2019 era.",
      "It runs Windows 10 with local access.",
      "It is isolated by neglect, not by elite security design.",
      "The files reveal a kill order, roster, MGRS lead, and blank seventh file."
    ],
    matters: "The scene is powerful because ordinary hardware breaks an extraordinary lie.",
    connected: ["Handley Regional Library", "Branch 7", "Collin Mathis", "The Roster"],
    doNot: ["remote breach", "secret terminal", "neon code spectacle"]
  },
  {
    slug: "handley-regional-library",
    title: "Handley Regional Library",
    type: "Location",
    spoiler: "Light",
    confidence: "Locked",
    hook: "A beautiful public building where the truth arrives through the least dramatic machine in the room.",
    locked: [
      "The Chapter 9 location is Handley Regional Library in Winchester, Virginia.",
      "The building carries old civic dignity and public trust.",
      "The contrast matters: normal public space, catastrophic evidence."
    ],
    matters: "The danger is not a spectacle. The danger is what Silas now knows.",
    connected: ["Terminal 7", "The Library", "Branch 7"],
    doNot: ["hidden-archive framing", "spectacle-first library danger", "named Handley staff"]
  },
  {
    slug: "branch-7",
    title: "Branch 7",
    type: "Evidence",
    spoiler: "Heavy",
    confidence: "Locked",
    hook: "The roster that turns a false story into a list of people.",
    locked: [
      "Owen frames Branch 7 and Collin Mathis as rogue.",
      "Terminal 7 undermines that frame.",
      "Branch 7 should be presented through records, dates, roster fragments, and contradiction."
    ],
    matters: "The cool factor is specificity: dates, names, missing files, and who benefits from the official story.",
    connected: ["Terminal 7", "Collin Mathis", "Owen Winters"],
    doNot: ["elite squad shop", "player faction", "generic rogue team"]
  },
  {
    slug: "collin-mathis",
    title: "Collin Mathis",
    type: "Person",
    spoiler: "Heavy",
    confidence: "Locked",
    hook: "The man on the other side of the lie, leaving proof for whoever survives long enough to read it.",
    locked: [
      "Collin is tied to the Branch 7 and Meridian trail.",
      "In Chapter 9, he is present through files, not as a library character.",
      "The Jefferson County house and laptop/video testimony carry his proof forward."
    ],
    matters: "Collin turns the case from an impossible suspicion into a chain of source material.",
    connected: ["The House", "The Testimony", "Melanie", "Bakerton"],
    doNot: ["boss collectible", "quest vendor", "easy exposition device"]
  },
  {
    slug: "melanie",
    title: "Melanie",
    type: "Person",
    spoiler: "Heavy",
    confidence: "Locked",
    hook: "The witness the official story needed dead.",
    locked: [
      "Melanie is not an early exposition device.",
      "Her reveal lands after the Terminal 7, Collin, and feed chain.",
      "She is connected to Safe House 87, the campfire testimony, Go Home, and the final route away from Brellford."
    ],
    matters: "Her survival changes the case from documents to living witness testimony.",
    connected: ["The Feed", "Safe House 87", "The Campfire", "Go Home"],
    doNot: ["early lore dump", "romanticized witness", "simple rescue trophy"]
  }
];

const compactDossiers = [
  ["hale", "Hale", "Person", "Medium", "An early rupture source whose trail proves the wrong story is already moving.", ["The Wrong Side", "The Splinter"]],
  ["jessi", "Jessi", "Person", "Heavy", "The person who makes trust feel possible before proof makes it dangerous.", ["Levels", "The Rooftop", "The Kitchen Floor"]],
  ["marcus", "Marcus", "Person", "Heavy", "An institutional hand that starts to fracture when the record stops matching the order.", ["The Watch", "Lost", "Where Are They"]],
  ["naomi", "Naomi", "Person", "Heavy", "Containment pressure with a name attached, not abstract institutional weather.", ["Scorched Earth", "Brellford Records"]],
  ["ellison", "Ellison", "Person", "Heavy", "A name at the ceiling of Owen's chain, visible only where the case file has earned it.", ["The Receipt", "The Watch"]],
  ["the-chair", "The Chair", "Chapter", "Public", "Water, restraint, and the first image of a man who knows more than the room.", ["Silas Westfall"]],
  ["mccarran-wynn", "McCarran / Wynn", "Location", "Light", "Arrival as false welcome: Las Vegas hospitality used as operational framing.", ["The Conference Room", "Owen Winters"]],
  ["the-conference-room", "The Conference Room", "Chapter", "Light", "A room where money meets money and Silas changes the pressure without raising his voice.", ["McCarran / Wynn", "Level B2"]],
  ["level-b2", "Level B2", "Location", "Medium", "Concrete, fluorescent light, and the first hard proof that Silas is not ordinary muscle.", ["The Tahoe", "Silas Westfall"]],
  ["the-tahoe", "The Tahoe", "Vehicle", "Medium", "A pre-positioned vehicle, a handler frame, and the first shape of the program.", ["Owen Winters", "Vehicles"]],
  ["the-splinter", "The Splinter", "Evidence", "Medium", "A flash drive becomes a test of restraint before it becomes a source of answers.", ["The Flash Drive", "Hale"]],
  ["the-wrong-side", "The Wrong Side", "Chapter", "Medium", "Northern Virginia becomes a surveillance problem with the wrong story underneath it.", ["Hale", "The Splinter"]],
  ["suspension", "Suspension", "Chapter", "Medium", "Access closes, warmth withdraws, and ALL IN begins as a private object.", ["Owen Winters", "ALL IN"]],
  ["levels", "Levels", "Chapter", "Light", "For one night, normal life almost holds.", ["Jessi", "The Rooftop"]],
  ["the-rooftop", "The Rooftop", "Location", "Heavy", "A parking-structure rooftop, a person who believes him, and a truth that has not become survivable.", ["Jessi", "The Kitchen Floor"]],
  ["the-watch", "The Watch", "Evidence", "Heavy", "Private ritual and institutional control moving in parallel.", ["Owen Winters", "Marcus"]],
  ["all-in", "ALL IN", "Evidence", "Heavy", "A chip becomes emotional evidence: trust managed like an operation.", ["Owen Winters", "Silas Westfall"]],
  ["the-house", "The House", "Location", "Heavy", "A grid coordinate becomes a door Silas cannot unopen.", ["Collin Mathis", "The Testimony"]],
  ["the-testimony", "The Testimony", "Evidence", "Heavy", "A laptop turns a dead-end into a living witness.", ["Collin Mathis", "Melanie"]],
  ["the-dive", "The Dive", "Chapter", "Heavy", "Cold water, a cache, and proof built for a man who might arrive too late.", ["Bakerton", "Bakerton Cache"]],
  ["bakerton", "Bakerton", "Location", "Heavy", "The place where proof survives below the surface.", ["The Dive", "The Feed"]],
  ["the-feed", "The Feed", "Evidence", "Heavy", "A signal resolves into the face the official story erased.", ["Melanie", "Safe House 87"]],
  ["scorched-earth", "Scorched Earth", "Chapter", "Heavy", "Containment stops being quiet.", ["Owen Winters", "Naomi"]],
  ["the-kitchen-floor", "The Kitchen Floor", "Chapter", "Heavy", "The cost moves from proof to people.", ["Jessi", "Marcus"]],
  ["lost", "Lost", "Chapter", "Heavy", "Marcus finishes an operation and cannot finish the feeling.", ["Marcus", "Owen Winters"]],
  ["stand-down", "Stand Down", "Chapter", "Heavy", "A cache rifle, a safe house, and a rescue that begins with a fight.", ["Melanie", "Safe House 87"]],
  ["safe-house-87", "Safe House 87", "Location", "Heavy", "The rescue dossier where living testimony stops being theoretical.", ["Stand Down", "Melanie"]],
  ["the-campfire", "The Campfire", "Chapter", "Heavy", "The witness speaks where the institution cannot reach the room.", ["Melanie", "Go Home"]],
  ["and-melanie", "And Melanie?", "Chapter", "Heavy", "Owen misreads silence because he has spent decades using it.", ["Owen Winters", "Marcus"]],
  ["six-weeks", "Six Weeks", "Chapter", "Heavy", "Recovery becomes preparation. A route home is programmed before the final approach.", ["Garmin", "Go Home"]],
  ["into-the-dark", "Into The Dark", "Chapter", "Heavy", "Music returns to one room while a final loadout is assembled in another.", ["Go Home", "Silas Westfall"]],
  ["go-home", "Go Home", "Chapter", "Heavy", "Keys, a Garmin waypoint, a black 1999 Jeep Cherokee XJ, and a westbound route.", ["Vehicles", "Melanie"]],
  ["up-on-the-ladder", "Up On The Ladder", "Chapter", "Heavy", "The Brellford entry is mechanical, wet, practical, and costly.", ["Brellford", "Where Are They"]],
  ["where-are-they", "Where Are They", "Chapter", "Heavy", "Owen is forced to answer inside the system he thought he controlled.", ["Owen Winters", "The Receipt"]],
  ["the-receipt", "The Receipt", "Evidence", "Heavy", "The final proof survives the room, and the architecture above the room starts moving.", ["Ellison", "ALL IN"]],
  ["vehicles", "Vehicles", "Index", "Light", "4Runner, Tahoe, Jeep, Range Rover: movement as evidence and pressure.", ["Go Home", "The Tahoe"]],
  ["evidence-glossary", "Evidence Glossary", "Index", "Progressive", "A proof-object index for files, routes, rooms, recordings, and objects that change the mission.", ["Terminal 7", "ALL IN"]]
].map(([slug, title, type, spoiler, hook, connected]) => ({
  slug,
  title,
  type,
  spoiler,
  confidence: "Canon-controlled",
  hook,
  locked: [
    `${title} belongs to the WESTFALL Season One evidence chain.`,
    "Public copy should keep the dossier tied to what it proves, not trivia.",
    "Spoiler weight should be labeled before late-book meaning is exposed."
  ],
  matters: hook,
  connected,
  doNot: ["no new faction framing", "no unsourced names", "no evidence-as-flavor treatment"]
}));

const allDossiers = [...dossiers, ...compactDossiers];

const locations = allDossiers.filter((item) => ["Location", "Institution"].includes(item.type));
const people = allDossiers.filter((item) => item.type === "Person");
const evidenceDossiers = allDossiers.filter((item) => ["Evidence", "Index"].includes(item.type));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function attr(value) {
  return escapeHtml(value);
}

function write(file, contents) {
  const fullPath = join(root, file);
  mkdirSync(dirname(fullPath), { recursive: true });
  writeFileSync(fullPath, contents, "utf8");
}

function navHtml(current) {
  return nav
    .map(([label, href]) => `<a href="${href}"${current === label ? ' aria-current="page"' : ""}>${label}</a>`)
    .join("\n          ");
}

function layout({ title, description, path, current, kicker, h1, deck, cta = ["Enter The Case File", "/westfall/case-file/"], body, schema = "" }) {
  const canonical = `${baseUrl}${path}`;
  const isHome = path === "/westfall/";
  const routeClass = `wf-route-${path.replace(/^\/westfall\/?/, "home").replace(/\/$/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase() || "home"}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${attr(description)}" />
  <meta property="og:title" content="${attr(title)}" />
  <meta property="og:description" content="${attr(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${heroImage}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="theme-color" content="#050607" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="${baseUrl}/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="${baseUrl}/favicon.png" />
  <link rel="apple-touch-icon" href="${baseUrl}/apple-touch-icon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="/westfall/styles.css?v=${version}" />
  ${schema}
</head>
<body class="westfall-page ${routeClass}">
  <a class="wf-skip" href="#main">Skip to case file</a>
  <div class="wf-shell">
    <header class="wf-topbar">
      <div class="wf-topbar__inner">
        <a class="wf-brand" href="/westfall/" aria-label="WESTFALL home"><span class="wf-brand__mark">W</span><span>WESTFALL</span></a>
        <button class="wf-menu-toggle" type="button" aria-expanded="false" aria-controls="wf-nav">Menu</button>
        <nav class="wf-nav" id="wf-nav" aria-label="WESTFALL navigation">
          ${navHtml(current)}
        </nav>
        <a class="wf-cta" href="${cta[1]}">${escapeHtml(cta[0])}</a>
      </div>
    </header>

    <main id="main">
      <section class="wf-hero${isHome ? "" : " wf-hero--plain"}">
        <div class="wf-hero__weather" aria-hidden="true"></div>
        ${isHome ? `<div class="wf-hero__case-rail" aria-hidden="true">
          <span class="wf-rail-label">BRELLFORD / PUBLIC BRIEF</span>
          <span>Terminal 7 contradicts the handler narrative.</span>
          <span>Branch 7 stops being a rumor and becomes a roster.</span>
          <span>ALL IN turns trust into evidence.</span>
        </div>` : ""}
        <div class="wf-hero__inner">
          <p class="wf-kicker">${escapeHtml(kicker)}</p>
          <h1${current === "Case" ? "" : ' class="wf-page-title"'}>${escapeHtml(h1)}</h1>
          <p class="wf-deck">${escapeHtml(deck)}</p>
          <div class="wf-hero__actions wf-hero__actions--lead">
            <a class="wf-button wf-button--solid" href="${cta[1]}">${escapeHtml(cta[0])}</a>
            ${isHome ? '<a class="wf-button" href="/westfall/lore/">Open Lore Dossiers</a>' : '<a class="wf-button" href="/westfall/">Back To WESTFALL</a>'}
          </div>
        </div>
      </section>
${body}
    </main>

    <footer class="wf-footer">
      <div class="wf-footer__inner">
        <div>
          <h2>WESTFALL</h2>
          <p>A modern conspiracy thriller by Zac Gibson.</p>
          <!-- Canon guardrail: Meridian is a hidden program inside Brellford, not a public brand. -->
        </div>
        <div>
          <h3>Explore</h3>
          <a href="/westfall/book/">Book</a>
          <a href="/westfall/read/">Read</a>
          <a href="/westfall/case-file/">Case File</a>
          <a href="/westfall/lore/">Lore</a>
        </div>
        <div>
          <h3>Follow</h3>
          <a href="/westfall/updates/">Updates</a>
          <a href="https://github.com/zgib89" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/zacharyjgibson" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <div>
          <h3>Legal</h3>
          <p>Copyright Zac Gibson. All rights reserved.</p>
          <a href="/">zacgibson.work</a>
        </div>
      </div>
    </footer>
  </div>
  <script src="/westfall/app.js?v=${version}" defer></script>
</body>
</html>
`;
}

function section(className, inner) {
  return `      <section class="wf-section ${className}">
        <div class="wf-section__inner">
${inner}
        </div>
      </section>`;
}

function cards(items, className = "wf-grid") {
  return `<div class="${className}">
${items.join("\n")}
          </div>`;
}

function card({ href, tag, title, text, extra = "" }) {
  const tagName = href ? "a" : "article";
  const hrefAttr = href ? ` href="${href}"` : "";
  return `            <${tagName} class="wf-panel"${hrefAttr}>
              <span class="wf-tagline">${escapeHtml(tag)}</span>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(text)}</p>
              ${extra}
            </${tagName}>`;
}

function rows(items) {
  return `<div class="wf-table">
${items.map(([label, text]) => `            <div class="wf-row"><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span></div>`).join("\n")}
          </div>`;
}

function dossierCard(item) {
  return `            <a class="wf-dossier-card" href="/westfall/lore/${item.slug}/" data-card data-category="${item.type.toLowerCase()} ${item.spoiler.toLowerCase().replace(" ", "-")}">
              <span class="wf-tagline">${escapeHtml(item.type)} / ${escapeHtml(item.spoiler)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.hook)}</p>
              <span class="wf-card-link">Open dossier</span>
            </a>`;
}

function slugForTitle(name) {
  const normalized = name.toLowerCase().replaceAll("&", "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const direct = allDossiers.find((item) => item.slug === normalized || item.title.toLowerCase() === name.toLowerCase());
  if (direct) return direct.slug;
  const aliases = {
    "the flash drive": "the-splinter",
    "the roster": "branch-7",
    "collin's video": "the-testimony",
    "bakerton cache": "bakerton",
    "brellford records": "brellford",
    "garmin": "go-home"
  };
  return aliases[name.toLowerCase()] || null;
}

function connectedCard(name) {
  const slug = slugForTitle(name);
  return card({
    href: slug ? `/westfall/lore/${slug}/` : undefined,
    tag: "Connected file",
    title: name,
    text: "Open this adjacent file when following the same branch of the case."
  });
}

function jsonLd(data) {
  return `<script type="application/ld+json">${JSON.stringify(data).replaceAll("</", "<\\/")}</script>`;
}

const bookSchema = jsonLd({
  "@context": "https://schema.org",
  "@type": "Book",
  name: "WESTFALL",
  author: { "@type": "Person", name: "Zac Gibson" },
  genre: "Modern conspiracy thriller",
  description: "An active operator joins Brellford under false authority and discovers that the orders were the trap.",
  url: `${baseUrl}/westfall/book/`
});

write("westfall/index.html", layout({
  title: "WESTFALL | A modern conspiracy thriller by Zac Gibson",
  description: "The orders were the trap. Explore the case-file world behind Zac Gibson's modern conspiracy thriller.",
  path: "/westfall/",
  current: "Case",
  kicker: "Book-first case-file thriller",
  h1: "WESTFALL",
  deck: "A modern conspiracy thriller about an active operator, a handler's false authority, and the proof that turns orders into evidence.",
  cta: ["Enter The Case File", "/westfall/case-file/"],
  schema: bookSchema,
  body: `
      <section class="wf-hero-extension">
        <div class="wf-section__inner">
          <div class="wf-proof-rail" aria-label="WESTFALL status row">
            <span><strong>Thriller</strong>Modern conspiracy</span>
            <span><strong>Evidence Chain</strong>Proof changes the mission</span>
            <span><strong>Active Operator</strong>Silas Westfall</span>
            <span><strong>Season One</strong>Novel in development</span>
            <span><strong>Case Open</strong>Public dossiers live</span>
          </div>
          <div class="wf-hero__actions">
            <a class="wf-button wf-button--solid" href="/westfall/book/">Read The Book Pitch</a>
            <a class="wf-button" href="/westfall/soundtrack/">Hear The Soundtrack</a>
            <a class="wf-button" href="/westfall/game/">Follow The Game Build</a>
          </div>
        </div>
      </section>
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Ordinary surfaces, catastrophic meaning</p>
              <h2 class="wf-heading">The lie is not a twist. It is a system.</h2>
              <div class="wf-copy">
                <p>Silas Westfall is trained to survive pressure, read rooms, and trust a chain of command that sounds legitimate until ordinary proof starts contradicting it.</p>
                <p>The story does not ask the reader to believe in a conspiracy because someone says the word. It builds the case through a public computer, a roster, a cache, a witness, and records that make the official version impossible.</p>
              </div>
              <blockquote class="wf-quote">The orders were the trap.</blockquote>
            </div>
            <div class="wf-terminal" aria-label="WESTFALL terminal-style evidence preview">
              <p class="dim">BRELLFORD / FIELD NOTE</p>
              <p>&gt; operator: SILAS WESTFALL</p>
              <p>&gt; handler: OWEN WINTERS</p>
              <p>&gt; public rupture: TERMINAL 7</p>
              <p>&gt; location: WINCHESTER, VIRGINIA</p>
              <p>&gt; signal: ORDERS BECOME EVIDENCE</p>
              <p class="dim">&gt; meridian: hidden compartment inside Brellford</p>
              <p>&gt; status: CASE FILE OPEN</p>
            </div>
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">The proof chain</p>
          <h2 class="wf-heading">The case opens in pieces.</h2>
          <p class="wf-copy">Every WESTFALL reveal is tied to a proof object. Nothing important should feel like trivia. A document, file, route, recording, vehicle, or witness has to change what Silas believes and who becomes unsafe because of it.</p>
          ${cards(evidence.slice(0, 6).map((item) => card({
            href: `/westfall/evidence/#${item.slug}`,
            tag: item.level,
            title: item.title,
            text: item.what
          })), "wf-grid wf-grid--three")}
          <details class="wf-spoiler">
            <summary>Show deeper case files</summary>
            <div class="wf-spoiler__body">
              ${cards(evidence.slice(6).map((item) => card({
                href: `/westfall/evidence/#${item.slug}`,
                tag: item.level,
                title: item.title,
                text: item.what
              })), "wf-grid wf-grid--three")}
            </div>
          </details>`)}
${section("", `
          <p class="wf-label">People in the machine</p>
          <h2 class="wf-heading">People are the pressure system.</h2>
          ${cards([
            card({ href: "/westfall/lore/silas-westfall/", tag: "Protagonist", title: "Silas Westfall", text: "Active operator. Controlled in public. Dangerous when the evidence is clear." }),
            card({ href: "/westfall/lore/owen-winters/", tag: "Handler", title: "Owen Winters", text: "Program lead. Father-coded authority with a kill chain behind it." }),
            card({ href: "/westfall/lore/collin-mathis/", tag: "Source", title: "Collin Mathis", text: "The source who leaves proof where a trained man can find it." }),
            card({ href: "/westfall/lore/melanie/", tag: "Witness", title: "Melanie", text: "The witness the official story needed dead." }),
            card({ href: "/westfall/lore/marcus/", tag: "Fracture", title: "Marcus", text: "The institutional hand that starts to fracture under proof." }),
            card({ href: "/westfall/lore/ellison/", tag: "Architecture", title: "Ellison", text: "A name at the ceiling of Owen's chain, visible only where the case file has earned it." })
          ], "wf-grid wf-grid--three")}
          <div class="wf-actions"><a class="wf-button wf-button--solid" href="/westfall/lore/">Open The Lore Dossiers</a></div>`)}
${section("wf-section--paper", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Soundtrack lab</p>
              <h2 class="wf-heading">Hear the case before it closes.</h2>
              <p class="wf-copy">The WESTFALL soundtrack lab collects scene cues, draft prompts, instrumentals, and mood tracks for Terminal 7, ALL IN, Go Home, and The Receipt.</p>
              <div class="wf-actions"><a class="wf-button wf-button--solid" href="/westfall/soundtrack/">Open The Soundtrack Lab</a></div>
            </div>
            <div class="wf-track-console" aria-label="WESTFALL soundtrack preview">
              <button class="wf-track-button is-active" type="button" data-track="Terminal 7">Terminal 7</button>
              <button class="wf-track-button" type="button" data-track="The Splinter">The Splinter</button>
              <button class="wf-track-button" type="button" data-track="ALL IN">ALL IN</button>
              <button class="wf-track-button" type="button" data-track="Go Home">Go Home</button>
              <p class="wf-status" data-track-status>Now cueing Terminal 7</p>
            </div>
          </div>`)}
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Game adaptation</p>
              <h2 class="wf-heading">The book is becoming a modern top-down thriller game.</h2>
              <p class="wf-copy">The WESTFALL game target is a gorgeous modern top-down action thriller: readable like GTA2, grounded like a real operation, and driven by evidence instead of generic mission markers.</p>
              <div class="wf-actions"><a class="wf-button wf-button--solid" href="/westfall/game/">See The Game Direction</a></div>
            </div>
            ${rows([
              ["Visual target", "Wet asphalt, Brellford floors, Terminal 7, health and injury states."],
              ["First slice", "Terminal 7 proves the story engine before the action escalates."],
              ["Rule", "Book canon leads the game. No invented Meridian locations."]
            ])}
          </div>`)}
${section("wf-section--tight", `
          <p class="wf-label">Final entry</p>
          <h2 class="wf-heading">Enter before the official story changes.</h2>
          <p class="wf-copy">Book updates, case-file drops, soundtrack drafts, and game build notes are collected under the WESTFALL updates route.</p>
          <div class="wf-actions">
            <a class="wf-button wf-button--solid" href="/westfall/updates/">Get WESTFALL Updates</a>
            <a class="wf-button" href="/westfall/press/">Open Press Kit</a>
          </div>`)}
`
}));

write("westfall/book/index.html", layout({
  title: "WESTFALL | The Book",
  description: "Read about WESTFALL, Zac Gibson's modern conspiracy thriller about an active operator, false authority, and proof that changes everything.",
  path: "/westfall/book/",
  current: "Book",
  kicker: "The book",
  h1: "WESTFALL",
  deck: "The orders were the trap.",
  cta: ["Read A Sample", "/westfall/read/"],
  schema: bookSchema,
  body: `
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Reader promise</p>
              <h2 class="wf-heading">A modern conspiracy thriller built from pressure, restraint, and proof.</h2>
              <div class="wf-copy">
                <p>Silas Westfall was trained to move through pressure, follow the mission, and trust the chain of command. Brellford gave him a handler, a purpose, and a story that made every order feel legitimate.</p>
                <p>Then Terminal 7 proves the story was built to aim him at the wrong people.</p>
              </div>
            </div>
            ${rows([
              ["Status", "In development"],
              ["Format", "Novel / Season One"],
              ["World", "WESTFALL"],
              ["Author", "Zac Gibson"]
            ])}
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">What kind of thriller is this?</p>
          ${cards([
            card({ tag: "Tradecraft", title: "No superhero fantasy", text: "Operator competence shows through restraint, routes, evidence handling, and pressure reads." }),
            card({ tag: "Betrayal", title: "No cartoon villains", text: "Institutional betrayal lands because the people and rooms feel plausible first." }),
            card({ tag: "Evidence", title: "Every reveal changes context", text: "Proof changes what earlier scenes meant instead of decorating the plot." }),
            card({ tag: "Handler", title: "Trust becomes leverage", text: "The relationship turns warmth, authority, and withdrawal into operational tools." }),
            card({ tag: "Program", title: "Hidden until proof forces it", text: "The Meridian is not a brand; it is a concealed program inside the visible surface." })
          ], "wf-grid wf-grid--three")}`)}
${section("", `
          <p class="wf-label">Start here</p>
          <h2 class="wf-heading">Clean hook first. Deeper files when you choose them.</h2>
          <div class="wf-actions">
            <a class="wf-button wf-button--solid" href="/westfall/read/">Read A Sample</a>
            <a class="wf-button" href="/westfall/case-file/">Enter The Case File</a>
            <a class="wf-button" href="/westfall/lore/">Open Dossiers</a>
          </div>`)}
`
}));

write("westfall/read/index.html", layout({
  title: "Read WESTFALL | Sample",
  description: "Start with pressure. Leave with questions. A controlled public reading route for WESTFALL by Zac Gibson.",
  path: "/westfall/read/",
  current: "Read",
  kicker: "Read / sample",
  h1: "Read WESTFALL",
  deck: "Start with pressure. Leave with questions.",
  cta: ["Enter The Case File", "/westfall/case-file/"],
  body: `
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Controlled preview</p>
              <h2 class="wf-heading">This route is ready for the sample without inventing manuscript text.</h2>
              <p class="wf-copy">The recommended public sample is Chapter 1, <strong>The Chair</strong>, because it introduces pressure, restraint, and the evidence-first shape of WESTFALL without explaining the whole machine. A later Terminal 7 preview can be added when you want the cleanest proof-engine hook public.</p>
            </div>
            <div class="wf-readbox">
              <span class="wf-tagline">Sample bay</span>
              <h3>The Chair</h3>
              <p>Public sample slot reserved. No fake excerpt, no unsourced prose, no late-book spoilers.</p>
              <div class="wf-actions"><a class="wf-button wf-button--solid" href="/westfall/case-file/">Enter The Case File</a></div>
            </div>
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">Reader controls</p>
          ${cards([
            card({ tag: "Sample", title: "The Chair", text: "Primary public sample. Pressure first, explanation later." }),
            card({ tag: "Preview", title: "Terminal 7", text: "Secondary controlled preview when the proof-engine chapter is ready." }),
            card({ tag: "Spoiler notes", title: "Protected by design", text: "Late-book truth stays behind labeled routes and dossier pages." }),
            card({ tag: "Updates", title: "Follow the build", text: "Book updates, case-file drops, soundtrack drafts, and game notes." })
          ], "wf-grid wf-grid--four")}`)}
`
}));

write("westfall/case-file/index.html", layout({
  title: "WESTFALL Case File | Evidence Chain",
  description: "The official story breaks one proof object at a time in WESTFALL.",
  path: "/westfall/case-file/",
  current: "Case",
  kicker: "Case file",
  h1: "The Case File",
  deck: "The official story breaks one proof object at a time.",
  cta: ["Open Timeline", "/westfall/timeline/"],
  body: `
${section("", `
          <p class="wf-label">Evidence drawer</p>
          <h2 class="wf-heading">Evidence is not collectible flavor. It is the story engine.</h2>
          <div class="wf-toolbar" data-filter-group data-filter-target=".wf-evidence-card">
            <button class="wf-pill" type="button" data-filter="all" aria-pressed="true">All</button>
            <button class="wf-pill" type="button" data-filter="public">Public</button>
            <button class="wf-pill" type="button" data-filter="medium">Medium</button>
            <button class="wf-pill" type="button" data-filter="heavy">Heavy</button>
          </div>
          <div class="wf-case-grid">
${evidence.map((item, index) => `            <article class="wf-evidence-card" id="${item.slug}" data-card data-category="${item.level.toLowerCase()}">
              <span class="wf-tagline">${String(index + 1).padStart(2, "0")} / ${escapeHtml(item.level)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              ${rows([
                ["What it is", item.what],
                ["Where it appears", item.where],
                ["What it proves", item.proves],
                ["Who it endangers", item.endangers]
              ])}
            </article>`).join("\n")}
          </div>`)}
${section("wf-section--paper", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Knowledge states</p>
              <h2 class="wf-heading">Every official answer becomes a liability.</h2>
              <p class="wf-copy">The case file is ordered so the reader can feel the story tightening: source object, public computer, roster, house, witness, records, receipt.</p>
            </div>
            ${rows([
              ["Public hook", "Silas trusts the mission because the structure tells him to."],
              ["Rupture", "Terminal 7 proves the story has an engineered weak point."],
              ["Receipt", "The final proof is not only factual. It is personal."]
            ])}
          </div>`)}
`
}));

write("westfall/timeline/index.html", layout({
  title: "WESTFALL Timeline | Season One",
  description: "Thirty chapters. One evidence chain. Every official answer becomes a liability.",
  path: "/westfall/timeline/",
  current: "Timeline",
  kicker: "Season One timeline",
  h1: "Season One Timeline",
  deck: "Thirty chapters. One evidence chain. Every official answer becomes a liability.",
  cta: ["Open Lore", "/westfall/lore/"],
  body: `
${section("", `
          <p class="wf-label">View controls</p>
          <div class="wf-toolbar" data-filter-group data-filter-target=".wf-timeline-entry">
            <button class="wf-pill" type="button" data-filter="all" aria-pressed="true">Narrative</button>
            <button class="wf-pill" type="button" data-filter="silas">Silas</button>
            <button class="wf-pill" type="button" data-filter="owen">Owen</button>
            <button class="wf-pill" type="button" data-filter="evidence">Evidence</button>
            <button class="wf-pill" type="button" data-filter="heavy">Spoilers</button>
          </div>
          <ol class="wf-timeline">
${timeline.map((item) => {
  const category = [
    item.tags.some((tag) => /Terminal|flash|video|cache|receipt|ALL IN|proof|Feed/i.test(tag)) ? "evidence" : "",
    item.tags.some((tag) => /Owen/i.test(tag)) ? "owen" : "",
    item.tags.some((tag) => /Silas|pressure|loadout|rescue|Brellford/i.test(tag)) ? "silas" : "",
    item.chapter > 12 ? "heavy" : ""
  ].join(" ");
  return `            <li class="wf-timeline-entry" data-card data-category="${category}">
              <a href="/westfall/lore/${item.slug === "go-home-route" ? "go-home" : item.slug}/">
                <span class="wf-timeline-index">${String(item.chapter).padStart(2, "0")}</span>
                <span><strong>${escapeHtml(item.title)}</strong>${escapeHtml(item.line)}</span>
                <em>${item.tags.map(escapeHtml).join(" / ")}</em>
              </a>
            </li>`;
}).join("\n")}
          </ol>`)}
`
}));

write("westfall/lore/index.html", layout({
  title: "WESTFALL Lore | Case Files and Dossiers",
  description: "People, places, proof objects, and institutional lies from WESTFALL Season One.",
  path: "/westfall/lore/",
  current: "Lore",
  kicker: "Lore dossiers",
  h1: "Lore Dossiers",
  deck: "People, places, proof objects, and institutional lies from WESTFALL Season One.",
  cta: ["Open Evidence", "/westfall/evidence/"],
  body: `
${section("", `
          <p class="wf-label">Spoiler-labeled index</p>
          <h2 class="wf-heading">Open the truth in the order you want it to break.</h2>
          <p class="wf-copy">Some dossiers reveal late-book truth. Use spoiler filters if you want the official story to break in order.</p>
          <div class="wf-toolbar" data-filter-group data-filter-target=".wf-dossier-card">
            <button class="wf-pill" type="button" data-filter="all" aria-pressed="true">All</button>
            <button class="wf-pill" type="button" data-filter="person">People</button>
            <button class="wf-pill" type="button" data-filter="institution">Institutions</button>
            <button class="wf-pill" type="button" data-filter="location">Locations</button>
            <button class="wf-pill" type="button" data-filter="evidence">Evidence</button>
            <button class="wf-pill" type="button" data-filter="light">Spoiler Light</button>
            <button class="wf-pill" type="button" data-filter="heavy">Deep Spoilers</button>
          </div>
          <div class="wf-dossier-grid">
${allDossiers.map(dossierCard).join("\n")}
          </div>`)}
`
}));

write("westfall/characters/index.html", layout({
  title: "WESTFALL Characters | People In The Machine",
  description: "Character dossiers for Silas Westfall, Owen Winters, Collin Mathis, Melanie, Marcus, Ellison, and the people under pressure.",
  path: "/westfall/characters/",
  current: "Lore",
  kicker: "Characters",
  h1: "People In The Machine",
  deck: "The conspiracy works because people make pressure feel personal.",
  body: section("", `
          <div class="wf-dossier-grid">
${people.map(dossierCard).join("\n")}
          </div>`)
}));

write("westfall/locations/index.html", layout({
  title: "WESTFALL Locations | Public Places, Private Pressure",
  description: "Location dossiers for Handley Regional Library, Brellford, Bakerton, Safe House 87, and other WESTFALL places.",
  path: "/westfall/locations/",
  current: "Lore",
  kicker: "Locations",
  h1: "Public Places, Private Pressure",
  deck: "WESTFALL turns ordinary surfaces into evidence-bearing rooms.",
  body: section("", `
          <div class="wf-dossier-grid">
${locations.map(dossierCard).join("\n")}
          </div>`)
}));

write("westfall/evidence/index.html", layout({
  title: "WESTFALL Evidence | Proof Object Index",
  description: "Proof objects, records, routes, files, and receipts from WESTFALL Season One.",
  path: "/westfall/evidence/",
  current: "Lore",
  kicker: "Evidence index",
  h1: "Proof Objects",
  deck: "The story changes only when an object, record, witness, or route proves it has to.",
  body: `
${section("", `
          <div class="wf-case-grid">
${evidence.map((item) => `            <article class="wf-evidence-card" id="${item.slug}">
              <span class="wf-tagline">${escapeHtml(item.level)}</span>
              <h3>${escapeHtml(item.title)}</h3>
              ${rows([
                ["What it is", item.what],
                ["What it proves", item.proves],
                ["Who it endangers", item.endangers]
              ])}
            </article>`).join("\n")}
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">Related dossiers</p>
          <div class="wf-dossier-grid">
${evidenceDossiers.map(dossierCard).join("\n")}
          </div>`)}
`
}));

write("westfall/soundtrack/index.html", layout({
  title: "WESTFALL Soundtrack Lab | Scene Cues and AI Music",
  description: "Scene cues, draft songs, prompt cards, rights notes, and soundtrack metadata for WESTFALL by Zac Gibson.",
  path: "/westfall/soundtrack/",
  current: "Soundtrack",
  kicker: "Soundtrack lab",
  h1: "Field Recordings",
  deck: "Scene cues, draft songs, instrumentals, and prompt cards for the moments that refuse to stay quiet.",
  cta: ["Suno Profile", "https://suno.com/@zgib89"],
  body: `
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Now playing</p>
              <h2 class="wf-heading">The music workspace is organized by scene, not by generic mood.</h2>
              <div class="wf-wave" aria-label="Decorative WESTFALL waveform">${Array.from({ length: 32 }, (_, i) => `<span style="height:${28 + ((i * 17) % 58)}%"></span>`).join("")}</div>
              <p class="wf-status" data-track-status>Now cueing Terminal 7</p>
            </div>
            <div class="wf-track-console">
              ${["Terminal 7", "The Splinter", "ALL IN", "Go Home", "Up On The Ladder", "The Receipt"].map((track, index) => `<button class="wf-track-button${index === 0 ? " is-active" : ""}" type="button" data-track="${track}">${track}</button>`).join("\n              ")}
            </div>
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">Rights rule</p>
          <h2 class="wf-heading">Publish only what is logged.</h2>
          <p class="wf-copy">Only publish or commercially use generated tracks if the generation account and plan grant the required rights. Log plan, prompt, generation date, track ID, and license state for every public song.</p>`)}
${section("", `
          <p class="wf-label">Track cards</p>
          ${cards([
            card({ tag: "78 BPM / Instrumental", title: "Terminal 7", text: "Quiet civic dread, winter light, ordinary hardware, and a low analog pulse." }),
            card({ tag: "64 BPM / Vocal option", title: "ALL IN", text: "A song for the object that proves trust can be handled like evidence." }),
            card({ tag: "68 BPM / Instrumental", title: "Bakerton Waterline", text: "The sound of a cache surfacing from water that does not care who survives." }),
            card({ tag: "62 BPM / Road cue", title: "Go Home", text: "Keys, a Garmin waypoint, and a westbound drive with one empty seat too many." }),
            card({ tag: "96 BPM / Action cue", title: "Up On The Ladder", text: "No clean way in. Just rain, service doors, and a floor above the answer." }),
            card({ tag: "70 BPM / Finale cue", title: "The Receipt", text: "The proof survives the room, and the architecture above the room starts moving." })
          ], "wf-grid wf-grid--three")}`)}
`
}));

write("westfall/game/index.html", layout({
  title: "WESTFALL Game | Modern Top-Down Thriller",
  description: "WESTFALL game preview: a modern top-down thriller adaptation where evidence drives the mission chain and Silas moves like an operator.",
  path: "/westfall/game/",
  current: "Game",
  kicker: "Game adaptation",
  h1: "WESTFALL: The Game",
  deck: "A modern top-down thriller adaptation where evidence drives the mission chain and Silas moves through the world like an operator.",
  cta: ["Follow Development", "/westfall/updates/"],
  body: `
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Visual target</p>
              <h2 class="wf-heading">Readable like GTA2. Lit like a prestige thriller. Grounded in WESTFALL canon.</h2>
              <p class="wf-copy">The game should adapt the book's evidence chain instead of inventing unrelated missions. The first vertical slice begins with Terminal 7 because it proves the story engine: a public space, an ordinary object, and proof that changes the mission.</p>
            </div>
            <div class="wf-terminal">
              <p class="dim">MISSION LADDER / PUBLIC PREVIEW</p>
              <p>01 / Terminal 7: evidence-first vertical slice</p>
              <p>02 / Brellford: public surface, restricted floors</p>
              <p>03 / Safe House 87: rescue pressure</p>
              <p>04 / Go Home: vehicle, route, consequence</p>
              <p class="dim">rule: book canon leads the game</p>
            </div>
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">Core systems</p>
          ${cards([
            card({ tag: "Player", title: "Control Silas", text: "Direct top-down movement, cover behavior, health, weapons, and pressure-aware traversal." }),
            card({ tag: "World", title: "Public spaces to Brellford floors", text: "Roads, offices, interiors, stairwells, service rooms, and rooms that matter because the book makes them matter." }),
            card({ tag: "Story", title: "Evidence drives missions", text: "Files, testimony, records, cache retrieval, and route decisions become objective logic." }),
            card({ tag: "Scope", title: "Terminal 7 first", text: "Start with the evidence rupture. Escalate later to Brellford, Safe House 87, and Go Home." })
          ], "wf-grid wf-grid--two")}`)}
${section("", `
          <p class="wf-label">Guardrails</p>
          <h2 class="wf-heading">Ambitious without hijacking the book site.</h2>
          ${rows([
            ["Do", "Frame the game as a top-down thriller adaptation of the book."],
            ["Do", "Show that Terminal 7 is evidence-first, not a disconnected tech gimmick."],
            ["Do", "Keep the mission chain grounded in Brellford, Safe House 87, Bakerton, and Go Home."],
            ["Do not", "Turn the page into a generic stealth arcade pitch or a game launcher."]
          ])}`)}
`
}));

write("westfall/updates/index.html", layout({
  title: "WESTFALL Updates | Book, Case Files, Soundtrack, Game",
  description: "Follow WESTFALL book development, case-file drops, soundtrack drafts, and game build notes.",
  path: "/westfall/updates/",
  current: "Updates",
  kicker: "Updates",
  h1: "Dispatches",
  deck: "Book development, case-file drops, soundtrack drafts, and game build notes.",
  cta: ["Open Press Kit", "/westfall/press/"],
  body: section("", `
          <div class="wf-grid wf-grid--three">
            ${card({ tag: "Book", title: "Novel development", text: "The public surface is now book-first and evidence-led. Next content drop should be sample prose only when the manuscript excerpt is approved." })}
            ${card({ tag: "Case files", title: "Dossier system live", text: "Lore routes are organized by spoiler level, canon confidence, connected evidence, and do-not-invent guardrails." })}
            ${card({ tag: "Game", title: "Adaptation lane", text: "The game direction stays grounded in the book's evidence chain instead of generic mission structure." })}
          </div>`)
}));

write("westfall/press/index.html", layout({
  title: "WESTFALL Press Kit | Zac Gibson",
  description: "Press kit for WESTFALL: logline, positioning, author bio, media kit notes, and contact paths.",
  path: "/westfall/press/",
  current: "Updates",
  kicker: "Press kit",
  h1: "WESTFALL Press Kit",
  deck: "Clean logline, positioning, author bio, and collaborator context.",
  cta: ["Author Page", "/westfall/author/"],
  body: `
${section("", `
          <p class="wf-label">Logline</p>
          <h2 class="wf-heading">An active operator joins Brellford under false authority and discovers that the orders were the trap.</h2>
          ${rows([
            ["Category", "Modern conspiracy thriller"],
            ["Audience", "Readers who like tradecraft, institutional betrayal, evidence puzzles, and emotionally costly reversals."],
            ["Comparable lane", "Prestige thriller energy, proof-object storytelling, and a transmedia-ready world with a disciplined public canon."],
            ["Contact", "Use the public Zac Gibson links on zacgibson.work for collaborator outreach."]
          ])}`)}
${section("wf-section--paper", `
          <p class="wf-label">Longer pitch</p>
          <p class="wf-copy"><strong>WESTFALL</strong> is a modern conspiracy thriller about Silas Westfall, a trained operator whose handler-led world collapses when a forgotten public-library computer reveals that the official story was built to aim him at the wrong people.</p>`)}
`
}));

write("westfall/author/index.html", layout({
  title: "Zac Gibson | WESTFALL Author",
  description: "Author page for Zac Gibson and the WESTFALL modern conspiracy thriller.",
  path: "/westfall/author/",
  current: "Updates",
  kicker: "Author",
  h1: "Zac Gibson",
  deck: "Identity and access by day. Apps, AI tools, and WESTFALL the rest of the time.",
  cta: ["Back To WESTFALL", "/westfall/"],
  body: section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Author note</p>
              <h2 class="wf-heading">WESTFALL is being built as a book-first world with a disciplined public surface.</h2>
              <p class="wf-copy">The site keeps the hook clean for new readers, labels deeper lore, and preserves canon guardrails so the story can expand into case files, soundtrack work, and game adaptation without losing the core novel.</p>
            </div>
            ${rows([
              ["Home", "zacgibson.work"],
              ["Project", "WESTFALL"],
              ["Focus", "Novel, case-file site, soundtrack lab, game prototype"],
              ["Rule", "Change the story once, and the right places update."]
            ])}
          </div>`)
}));

for (const item of allDossiers) {
  write(`westfall/lore/${item.slug}/index.html`, layout({
    title: `${item.title} | WESTFALL Dossier`,
    description: `${item.title} dossier for WESTFALL: ${item.hook}`,
    path: `/westfall/lore/${item.slug}/`,
    current: "Lore",
    kicker: `${item.type} dossier / ${item.spoiler}`,
    h1: item.title,
    deck: item.hook,
    cta: ["Lore Hub", "/westfall/lore/"],
    body: `
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Public hook</p>
              <h2 class="wf-heading">${escapeHtml(item.hook)}</h2>
              <p class="wf-copy">${escapeHtml(item.matters)}</p>
            </div>
            ${rows([
              ["Type", item.type],
              ["Spoiler level", item.spoiler],
              ["Canon confidence", item.confidence],
              ["Primary route", `/westfall/lore/${item.slug}/`]
            ])}
          </div>`)}
${section("wf-section--paper", `
          <p class="wf-label">What is locked</p>
          <ul class="wf-lock-list">
${item.locked.map((line) => `            <li>${escapeHtml(line)}</li>`).join("\n")}
          </ul>`)}
${section("", `
          <div class="wf-split">
            <div>
              <p class="wf-label">Connected evidence</p>
              ${cards(item.connected.map(connectedCard), "wf-grid wf-grid--two")}
            </div>
            <div>
              <p class="wf-label">Canon boundaries</p>
              <ul class="wf-lock-list">
${item.doNot.map((line) => `                <li>${escapeHtml(line)}</li>`).join("\n")}
              </ul>
            </div>
          </div>`)}
`
  }));
}

function redirectPage(target, title = "WESTFALL") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(title)}</title>
  <meta http-equiv="refresh" content="0; url=${target}" />
  <link rel="canonical" href="${baseUrl}${target}" />
</head>
<body>
  <p><a href="${target}">Continue to ${escapeHtml(title)}</a></p>
</body>
</html>
`;
}

const redirects = [
  ["work/westfall/index.html", "/westfall/"],
  ["westfall-site/index.html", "/westfall/lore/"],
  ["westfall-site/family/index.html", "/westfall/characters/"],
  ["westfall-site/firm/index.html", "/westfall/lore/brellford/"],
  ["westfall-site/receipts/index.html", "/westfall/lore/the-receipt/"]
];

for (const [file, target] of redirects) {
  write(file, redirectPage(target, "WESTFALL"));
}

const urls = [
  "/westfall/",
  "/westfall/book/",
  "/westfall/read/",
  "/westfall/case-file/",
  "/westfall/timeline/",
  "/westfall/characters/",
  "/westfall/locations/",
  "/westfall/evidence/",
  "/westfall/lore/",
  "/westfall/soundtrack/",
  "/westfall/game/",
  "/westfall/updates/",
  "/westfall/press/",
  "/westfall/author/",
  ...allDossiers.map((item) => `/westfall/lore/${item.slug}/`)
];

write("westfall/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${baseUrl}${url}</loc></url>`).join("\n")}
</urlset>
`);

write("westfall/app.js", `(() => {
  const menuToggle = document.querySelector(".wf-menu-toggle");
  const nav = document.querySelector(".wf-nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = menuToggle.getAttribute("aria-expanded") !== "true";
      menuToggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    });
  }

  document.querySelectorAll("[data-filter-group]").forEach((group) => {
    const selector = group.getAttribute("data-filter-target");
    if (!selector) return;
    const buttons = [...group.querySelectorAll("[data-filter]")];
    const cards = [...document.querySelectorAll(selector)];
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
        cards.forEach((card) => {
          const category = card.getAttribute("data-category") || "";
          const show = filter === "all" || category.includes(filter);
          card.toggleAttribute("hidden", !show);
        });
      });
    });
  });

  const status = document.querySelector("[data-track-status]");
  document.querySelectorAll("[data-track]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-track]").forEach((item) => item.classList.toggle("is-active", item === button));
      if (status) status.textContent = "Now cueing " + button.getAttribute("data-track");
    });
  });
})();
`);

write("westfall/styles.css", `:root {
  --wf-black: #050607;
  --wf-asphalt: #0b0f10;
  --wf-steel: #161b1d;
  --wf-panel: #101416;
  --wf-border: rgba(255, 255, 255, 0.12);
  --wf-border-strong: rgba(255, 255, 255, 0.24);
  --wf-text: #f5f2ec;
  --wf-muted: #a9aaa5;
  --wf-dim: #6f746f;
  --wf-limestone: #c6bca8;
  --wf-paper: #e7e0d3;
  --wf-amber: #ffd60a;
  --wf-signal: #6f9d60;
  --wf-cold-blue: #7d91a1;
  --wf-blood: #8f1d16;
  --wf-rain: #24313a;
  --wf-max: 1160px;
  --wf-sans: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  --wf-mono: "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

*, *::before, *::after { box-sizing: border-box; }

html {
  background: var(--wf-black);
  color: var(--wf-text);
  scroll-behavior: smooth;
}

body.westfall-page {
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  color: var(--wf-text);
  font-family: var(--wf-sans);
  font-size: 17px;
  line-height: 1.65;
  letter-spacing: 0;
  background:
    linear-gradient(180deg, rgba(5, 6, 7, 0.88), rgba(11, 15, 16, 0.98) 36%, #050607 100%),
    var(--wf-black);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

body.westfall-page::before {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 4px),
    linear-gradient(110deg, transparent 0 42%, rgba(198, 188, 168, 0.045) 48%, transparent 58% 100%);
  opacity: 0.32;
}

a { color: inherit; text-decoration: none; }
a:hover { color: var(--wf-amber); }
a:focus-visible, button:focus-visible, summary:focus-visible { outline: 2px solid var(--wf-amber); outline-offset: 4px; }
[hidden] { display: none !important; }

.wf-shell { position: relative; z-index: 1; }
.wf-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--wf-border);
  background: rgba(5, 6, 7, 0.9);
  backdrop-filter: blur(20px);
}

.wf-topbar__inner {
  width: min(var(--wf-max), calc(100% - 32px));
  min-height: 68px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.wf-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--wf-mono);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.wf-brand__mark {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--wf-border-strong);
  color: var(--wf-amber);
  background: #0a0d0e;
}

.wf-menu-toggle { display: none; }

.wf-nav {
  display: flex;
  align-items: center;
  gap: 17px;
  font-family: var(--wf-mono);
  font-size: 12px;
  color: var(--wf-muted);
}

.wf-nav a { padding: 9px 0; border-bottom: 1px solid transparent; }
.wf-nav a:hover, .wf-nav a[aria-current="page"] { color: var(--wf-text); border-bottom-color: var(--wf-amber); }

.wf-cta, .wf-button, .wf-pill, .wf-track-button, .wf-menu-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid var(--wf-border-strong);
  background: rgba(255, 214, 10, 0.08);
  color: var(--wf-text);
  font-family: var(--wf-mono);
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}

.wf-cta:hover, .wf-button:hover, .wf-pill:hover, .wf-track-button:hover, .wf-menu-toggle:hover,
.wf-pill[aria-pressed="true"], .wf-track-button.is-active {
  border-color: var(--wf-amber);
  background: rgba(255, 214, 10, 0.16);
  color: var(--wf-amber);
}

.wf-menu-toggle { display: none; }

.wf-button--solid {
  border-color: var(--wf-amber);
  background: var(--wf-amber);
  color: #080908;
}
.wf-button--solid:hover { background: #ffe46d; color: #080908; }

.wf-hero {
  position: relative;
  min-height: 78vh;
  display: grid;
  align-items: end;
  overflow: hidden;
  border-bottom: 1px solid var(--wf-border);
  background:
    linear-gradient(90deg, rgba(5, 6, 7, 0.98) 0%, rgba(5, 6, 7, 0.76) 46%, rgba(5, 6, 7, 0.28) 100%),
    linear-gradient(180deg, rgba(5, 6, 7, 0.02), rgba(5, 6, 7, 0.92)),
    url("${heroImage}") center right / min(62vw, 760px) no-repeat,
    linear-gradient(180deg, #0d1114, #050607);
}

.wf-hero--plain {
  min-height: 54vh;
  background:
    linear-gradient(110deg, rgba(5, 6, 7, 0.98) 0%, rgba(11, 15, 16, 0.9) 58%, rgba(36, 49, 58, 0.42) 100%),
    linear-gradient(180deg, #0d1114, #050607);
}

.wf-hero__inner, .wf-section__inner, .wf-footer__inner {
  width: min(var(--wf-max), calc(100% - 32px));
  margin: 0 auto;
}

.wf-hero__inner { padding: 118px 0 52px; }
.wf-hero-extension { padding: 0 0 44px; border-bottom: 1px solid var(--wf-border); }

.wf-kicker, .wf-label, .wf-meta, .wf-tagline {
  font-family: var(--wf-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--wf-muted);
}

.wf-kicker, .wf-tagline { color: var(--wf-limestone); }
.wf-tagline { color: var(--wf-amber); letter-spacing: 0.08em; }

.wf-hero h1, .wf-page-title {
  max-width: 910px;
  margin: 14px 0 18px;
  font-size: 96px;
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0;
}

.wf-deck {
  max-width: 760px;
  margin: 0;
  color: var(--wf-paper);
  font-size: 22px;
  line-height: 1.45;
}

.wf-hero__actions, .wf-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;
}

.wf-proof-rail {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  border: 1px solid var(--wf-border);
  background: rgba(16, 20, 22, 0.78);
}

.wf-proof-rail span {
  min-height: 72px;
  display: grid;
  align-content: center;
  gap: 4px;
  padding: 14px;
  border-right: 1px solid var(--wf-border);
  font-family: var(--wf-mono);
  font-size: 12px;
  color: var(--wf-muted);
}
.wf-proof-rail span:last-child { border-right: 0; }
.wf-proof-rail strong { color: var(--wf-text); font-family: var(--wf-sans); font-size: 15px; }

.wf-section { padding: 76px 0; border-bottom: 1px solid var(--wf-border); }
.wf-section--tight { padding: 48px 0; }
.wf-section--paper {
  color: #171512;
  background:
    linear-gradient(180deg, rgba(231, 224, 211, 0.96), rgba(198, 188, 168, 0.94)),
    var(--wf-paper);
}
.wf-section--paper .wf-label, .wf-section--paper .wf-meta, .wf-section--paper .wf-tagline { color: rgba(23, 21, 18, 0.62); }
.wf-section--paper .wf-copy, .wf-section--paper .wf-panel p, .wf-section--paper .wf-dossier-card p { color: #343029; }
.wf-section--paper .wf-panel, .wf-section--paper .wf-dossier-card { background: rgba(255, 255, 255, 0.36); border-color: rgba(23, 21, 18, 0.18); }

.wf-heading {
  max-width: 820px;
  margin: 0 0 30px;
  font-size: 40px;
  line-height: 1.08;
  letter-spacing: 0;
}

.wf-copy { max-width: 760px; color: var(--wf-muted); }
.wf-copy strong { color: var(--wf-text); }

.wf-grid, .wf-dossier-grid, .wf-case-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.wf-grid--two { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.wf-grid--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.wf-grid--four { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.wf-dossier-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.wf-case-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; }

.wf-panel, .wf-dossier-card, .wf-track, .wf-row, .wf-evidence-card, .wf-readbox {
  border: 1px solid var(--wf-border);
  background: rgba(16, 20, 22, 0.76);
}
.wf-panel, .wf-dossier-card, .wf-track, .wf-evidence-card, .wf-readbox { padding: 22px; }
.wf-panel:hover, .wf-dossier-card:hover { border-color: var(--wf-border-strong); color: inherit; }

.wf-panel h3, .wf-dossier-card h3, .wf-track h3, .wf-evidence-card h3, .wf-readbox h3 {
  margin: 8px 0 10px;
  font-size: 22px;
  line-height: 1.15;
  letter-spacing: 0;
}

.wf-panel p, .wf-dossier-card p, .wf-track p, .wf-evidence-card p, .wf-readbox p {
  margin: 0;
  color: var(--wf-muted);
  font-size: 15px;
}

.wf-card-link {
  display: inline-block;
  margin-top: 18px;
  color: var(--wf-amber);
  font-family: var(--wf-mono);
  font-size: 12px;
  text-transform: uppercase;
}

.wf-table { display: grid; border: 1px solid var(--wf-border); }
.wf-row {
  display: grid;
  grid-template-columns: 174px 1fr;
  gap: 18px;
  padding: 16px 18px;
  border-width: 0 0 1px;
}
.wf-row:last-child { border-bottom: 0; }
.wf-row strong { font-family: var(--wf-mono); font-size: 12px; color: var(--wf-limestone); text-transform: uppercase; }
.wf-row span { color: var(--wf-muted); }
.wf-section--paper .wf-row { background: rgba(255, 255, 255, 0.34); border-color: rgba(23, 21, 18, 0.16); }
.wf-section--paper .wf-row strong, .wf-section--paper .wf-row span { color: #29251f; }

.wf-spoiler { margin-top: 18px; border: 1px solid var(--wf-border); background: rgba(5, 6, 7, 0.52); }
.wf-spoiler summary { cursor: pointer; padding: 16px 18px; color: var(--wf-paper); font-family: var(--wf-mono); font-size: 12px; text-transform: uppercase; }
.wf-spoiler__body { padding: 0 18px 18px; color: var(--wf-muted); }

.wf-quote {
  margin: 34px 0 0;
  padding: 26px;
  border-left: 3px solid var(--wf-amber);
  background: rgba(255, 214, 10, 0.06);
  color: var(--wf-paper);
  font-size: 24px;
  line-height: 1.35;
}

.wf-split {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(300px, 0.95fr);
  gap: 32px;
  align-items: start;
}

.wf-terminal, .wf-track-console {
  min-height: 320px;
  padding: 22px;
  border: 1px solid rgba(111, 157, 96, 0.4);
  background:
    linear-gradient(180deg, rgba(111, 157, 96, 0.1), rgba(5, 6, 7, 0.2)),
    #07100a;
  color: #b8e0ac;
  font-family: var(--wf-mono);
  font-size: 13px;
  overflow: hidden;
}
.wf-terminal p { margin: 0 0 10px; }
.wf-terminal .dim { color: rgba(184, 224, 172, 0.55); }

.wf-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 0 22px;
}
.wf-pill { min-height: 36px; background: rgba(255, 255, 255, 0.04); }

.wf-wave {
  height: 92px;
  display: grid;
  grid-template-columns: repeat(32, 1fr);
  gap: 4px;
  align-items: end;
  margin: 18px 0;
}
.wf-wave span { display: block; min-height: 14px; background: linear-gradient(180deg, var(--wf-amber), rgba(111, 157, 96, 0.68)); }
.wf-track-console { display: grid; align-content: start; gap: 10px; }
.wf-track-button { justify-content: flex-start; width: 100%; }

.wf-status { display: inline-flex; align-items: center; gap: 8px; font-family: var(--wf-mono); font-size: 12px; color: var(--wf-muted); }
.wf-status::before { content: ""; width: 8px; height: 8px; background: var(--wf-signal); }

.wf-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
}
.wf-timeline-entry a {
  display: grid;
  grid-template-columns: 72px 1fr 220px;
  gap: 18px;
  align-items: start;
  padding: 18px;
  border: 1px solid var(--wf-border);
  background: rgba(16, 20, 22, 0.76);
}
.wf-timeline-index { color: var(--wf-amber); font-family: var(--wf-mono); }
.wf-timeline strong { display: block; color: var(--wf-text); font-size: 18px; }
.wf-timeline em { color: var(--wf-muted); font-family: var(--wf-mono); font-size: 12px; font-style: normal; text-transform: uppercase; }

.wf-lock-list {
  margin: 0;
  padding-left: 20px;
  color: inherit;
}
.wf-lock-list li + li { margin-top: 10px; }
.wf-mini { color: var(--wf-dim); font-family: var(--wf-mono); font-size: 11px; text-transform: uppercase; }

.wf-footer { padding: 54px 0; background: #040505; }
.wf-footer__inner { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 24px; }
.wf-footer h2, .wf-footer h3 { margin: 0 0 12px; font-size: 14px; letter-spacing: 0.08em; text-transform: uppercase; }
.wf-footer p, .wf-footer a { display: block; margin: 0 0 8px; color: var(--wf-muted); font-size: 14px; }

@media (max-width: 980px) {
  .wf-dossier-grid, .wf-grid--four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .wf-nav { gap: 12px; }
}

@media (max-width: 760px) {
  body.westfall-page { font-size: 16px; }
  .wf-topbar__inner { min-height: 60px; flex-wrap: wrap; padding: 14px 0; }
  .wf-menu-toggle { display: inline-flex; margin-left: auto; }
  .wf-nav {
    order: 3;
    width: 100%;
    display: none;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    padding-top: 12px;
  }
  .wf-nav.is-open { display: grid; }
  .wf-nav a {
    min-height: 42px;
    padding: 10px 12px;
    border: 1px solid var(--wf-border);
    background: rgba(255, 255, 255, 0.04);
  }
  .wf-cta { display: none; }
  .wf-hero {
    min-height: 76vh;
    background:
      linear-gradient(180deg, rgba(5, 6, 7, 0.7), rgba(5, 6, 7, 0.98) 60%),
      url("${heroImage}") top right / 520px auto no-repeat,
      linear-gradient(180deg, #0d1114, #050607);
  }
  .wf-hero__inner { padding-top: 204px; }
  .wf-hero h1, .wf-page-title { font-size: 58px; }
  .wf-deck { font-size: 18px; }
  .wf-proof-rail, .wf-grid, .wf-grid--two, .wf-grid--three, .wf-grid--four, .wf-dossier-grid, .wf-case-grid, .wf-split, .wf-footer__inner { grid-template-columns: 1fr; }
  .wf-proof-rail span { border-right: 0; border-bottom: 1px solid var(--wf-border); }
  .wf-proof-rail span:last-child { border-bottom: 0; }
  .wf-heading { font-size: 32px; }
  .wf-row { grid-template-columns: 1fr; gap: 6px; }
  .wf-timeline-entry a { grid-template-columns: 46px 1fr; }
  .wf-timeline em { grid-column: 2; }
}

@media (max-width: 440px) {
  .wf-hero h1, .wf-page-title { font-size: 46px; }
  .wf-section { padding: 54px 0; }
  .wf-panel, .wf-dossier-card, .wf-track, .wf-evidence-card, .wf-readbox { padding: 18px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  body.westfall-page::before { display: none; }
}

/* Premium polish pass: cinematic case-file surface, no new lore assumptions. */
.wf-skip {
  position: fixed;
  left: 16px;
  top: 16px;
  z-index: 100;
  transform: translateY(-180%);
  padding: 10px 14px;
  border: 1px solid var(--wf-amber);
  background: var(--wf-black);
  color: var(--wf-amber);
  font-family: var(--wf-mono);
  font-size: 12px;
  text-transform: uppercase;
}
.wf-skip:focus { transform: translateY(0); }

body.westfall-page {
  background:
    linear-gradient(180deg, rgba(5, 6, 7, 0.78), #050607 42%, #030404 100%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.018) 0 1px, transparent 1px 98px),
    var(--wf-black);
}

body.westfall-page::before {
  background:
    repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.026) 0 1px, transparent 1px 5px),
    linear-gradient(112deg, rgba(125, 145, 161, 0.08), transparent 31% 68%, rgba(255, 214, 10, 0.035));
  opacity: 0.44;
}

.wf-topbar {
  border-bottom-color: rgba(231, 224, 211, 0.14);
  background: rgba(3, 4, 4, 0.78);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.04), 0 18px 45px rgba(0, 0, 0, 0.34);
}

.wf-brand__mark {
  width: 34px;
  height: 34px;
  border-color: rgba(255, 214, 10, 0.44);
  background:
    linear-gradient(180deg, rgba(255, 214, 10, 0.13), rgba(255, 255, 255, 0.02)),
    #080a0a;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06), 0 0 24px rgba(255, 214, 10, 0.1);
}

.wf-nav a {
  position: relative;
  color: rgba(245, 242, 236, 0.64);
}
.wf-nav a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 4px;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 160ms ease;
}
.wf-nav a:hover::after, .wf-nav a[aria-current="page"]::after { transform: scaleX(1); }

.wf-cta, .wf-button, .wf-pill, .wf-track-button, .wf-menu-toggle {
  border-color: rgba(231, 224, 211, 0.26);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.015)),
    rgba(9, 12, 13, 0.84);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  transition: border-color 160ms ease, background 160ms ease, color 160ms ease, transform 160ms ease;
}
.wf-cta:hover, .wf-button:hover, .wf-pill:hover, .wf-track-button:hover, .wf-menu-toggle:hover {
  transform: translateY(-1px);
}
.wf-button--solid {
  border-color: rgba(255, 214, 10, 0.86);
  background:
    linear-gradient(180deg, #ffe16a, #ffd60a 54%, #c99c05),
    var(--wf-amber);
  color: #050607;
  box-shadow: 0 12px 38px rgba(255, 214, 10, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.42);
}

.wf-hero {
  min-height: calc(100svh - 0px);
  isolation: isolate;
  background:
    linear-gradient(90deg, rgba(3, 4, 4, 0.98) 0%, rgba(3, 4, 4, 0.82) 43%, rgba(3, 4, 4, 0.38) 100%),
    linear-gradient(180deg, rgba(5, 6, 7, 0.02), rgba(5, 6, 7, 0.94)),
    #050607;
}
.wf-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -3;
  background: url("${heroImage}") center right / min(76vw, 1040px) auto no-repeat;
  opacity: 0.72;
  filter: saturate(0.78) contrast(1.18) brightness(0.86);
}
.wf-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    linear-gradient(180deg, transparent 0 50%, rgba(5, 6, 7, 0.92) 92%),
    repeating-linear-gradient(90deg, transparent 0 119px, rgba(231, 224, 211, 0.055) 120px 121px),
    repeating-linear-gradient(180deg, transparent 0 79px, rgba(231, 224, 211, 0.035) 80px 81px);
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.2) 72%, transparent);
}
.wf-hero__weather {
  position: absolute;
  inset: -12% 0;
  z-index: -2;
  pointer-events: none;
  background:
    repeating-linear-gradient(106deg, transparent 0 28px, rgba(125, 145, 161, 0.16) 29px 30px, transparent 31px 88px);
  opacity: 0.22;
  transform: translate3d(0, 0, 0);
  animation: wfRain 12s linear infinite;
}
@keyframes wfRain {
  from { background-position: 0 0; }
  to { background-position: -180px 420px; }
}
.wf-hero__inner {
  position: relative;
  z-index: 2;
  padding-top: 138px;
  padding-bottom: 96px;
}
.wf-hero h1, .wf-page-title {
  max-width: 980px;
  margin: 16px 0 20px;
  font-size: 112px;
  font-weight: 720;
  line-height: 0.9;
  text-shadow: 0 18px 60px rgba(0, 0, 0, 0.76);
}
.wf-deck {
  max-width: 720px;
  color: rgba(245, 242, 236, 0.88);
  text-shadow: 0 14px 38px rgba(0, 0, 0, 0.88);
}
.wf-kicker, .wf-label, .wf-meta, .wf-tagline {
  color: rgba(255, 214, 10, 0.78);
}
.wf-hero__actions--lead { margin-top: 34px; }
.wf-hero__case-rail {
  position: absolute;
  right: max(24px, calc((100vw - var(--wf-max)) / 2));
  bottom: 64px;
  z-index: 3;
  width: min(420px, 34vw);
  display: grid;
  gap: 0;
  border: 1px solid rgba(231, 224, 211, 0.2);
  background:
    linear-gradient(180deg, rgba(11, 15, 16, 0.82), rgba(5, 6, 7, 0.9)),
    rgba(8, 11, 12, 0.86);
  backdrop-filter: blur(18px);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.42);
}
.wf-hero__case-rail span {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(231, 224, 211, 0.11);
  color: rgba(245, 242, 236, 0.74);
  font-family: var(--wf-mono);
  font-size: 12px;
  line-height: 1.45;
}
.wf-hero__case-rail span:last-child { border-bottom: 0; }
.wf-hero__case-rail .wf-rail-label {
  color: var(--wf-amber);
  background: rgba(255, 214, 10, 0.08);
}

.wf-hero-extension {
  padding: 0 0 56px;
  margin-top: -42px;
  position: relative;
  z-index: 4;
}
.wf-proof-rail {
  border-color: rgba(231, 224, 211, 0.18);
  background:
    linear-gradient(180deg, rgba(16, 20, 22, 0.92), rgba(8, 11, 12, 0.92)),
    rgba(16, 20, 22, 0.86);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.32);
}
.wf-proof-rail span {
  min-height: 90px;
  border-color: rgba(231, 224, 211, 0.11);
}

.wf-section {
  position: relative;
  border-bottom-color: rgba(231, 224, 211, 0.1);
}
.wf-section:not(.wf-section--paper) {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.012), transparent 42%),
    transparent;
}
.wf-section--paper {
  position: relative;
  background:
    linear-gradient(180deg, rgba(237, 231, 219, 0.98), rgba(198, 188, 168, 0.95)),
    repeating-linear-gradient(0deg, rgba(23, 21, 18, 0.03) 0 1px, transparent 1px 9px),
    var(--wf-paper);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.46), inset 0 -1px 0 rgba(0, 0, 0, 0.18);
}
.wf-heading {
  font-size: 46px;
  font-weight: 680;
}
.wf-copy {
  color: rgba(245, 242, 236, 0.7);
}

.wf-panel, .wf-dossier-card, .wf-track, .wf-evidence-card, .wf-readbox {
  position: relative;
  overflow: hidden;
  border-color: rgba(231, 224, 211, 0.14);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.015)),
    rgba(12, 16, 17, 0.82);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.045);
}
.wf-panel::before, .wf-dossier-card::before, .wf-evidence-card::before, .wf-readbox::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, var(--wf-amber), rgba(111, 157, 96, 0.62), transparent);
  opacity: 0.8;
}
.wf-panel:hover, .wf-dossier-card:hover, .wf-evidence-card:hover {
  border-color: rgba(255, 214, 10, 0.48);
  background:
    linear-gradient(180deg, rgba(255, 214, 10, 0.07), rgba(255, 255, 255, 0.018)),
    rgba(12, 16, 17, 0.9);
}
.wf-panel h3, .wf-dossier-card h3, .wf-track h3, .wf-evidence-card h3, .wf-readbox h3 {
  font-size: 24px;
  font-weight: 680;
}

.wf-table {
  border-color: rgba(231, 224, 211, 0.13);
  background: rgba(3, 4, 4, 0.18);
}
.wf-evidence-card .wf-table, .wf-panel .wf-table {
  border: 0;
  background: transparent;
}
.wf-evidence-card .wf-row, .wf-panel .wf-row {
  background: transparent;
  border-color: rgba(231, 224, 211, 0.1);
  padding-left: 0;
  padding-right: 0;
}
.wf-section--paper .wf-evidence-card .wf-row,
.wf-section--paper .wf-panel .wf-row {
  border-color: rgba(23, 21, 18, 0.14);
}

.wf-terminal, .wf-track-console {
  position: relative;
  border-color: rgba(111, 157, 96, 0.48);
  background:
    linear-gradient(180deg, rgba(111, 157, 96, 0.12), rgba(5, 6, 7, 0.34)),
    repeating-linear-gradient(0deg, rgba(184, 224, 172, 0.045) 0 1px, transparent 1px 18px),
    #06100a;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(184, 224, 172, 0.08);
}
.wf-terminal::after, .wf-track-console::after {
  content: "";
  position: absolute;
  right: 16px;
  top: 14px;
  width: 8px;
  height: 8px;
  background: var(--wf-signal);
  box-shadow: 0 0 18px rgba(111, 157, 96, 0.8);
}

.wf-timeline-entry a {
  border-color: rgba(231, 224, 211, 0.13);
  background:
    linear-gradient(90deg, rgba(255, 214, 10, 0.055), transparent 24%),
    rgba(16, 20, 22, 0.78);
}
.wf-timeline-index {
  display: inline-grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(255, 214, 10, 0.34);
  background: rgba(255, 214, 10, 0.08);
}

.wf-wave span {
  background: linear-gradient(180deg, #ffe16a, rgba(111, 157, 96, 0.86) 58%, rgba(125, 145, 161, 0.42));
  box-shadow: 0 0 18px rgba(255, 214, 10, 0.08);
  transform-origin: bottom;
  animation: wfPulse 1500ms ease-in-out infinite alternate;
}
.wf-wave span:nth-child(3n) { animation-delay: 140ms; }
.wf-wave span:nth-child(4n) { animation-delay: 320ms; }
@keyframes wfPulse {
  from { transform: scaleY(0.72); opacity: 0.62; }
  to { transform: scaleY(1); opacity: 1; }
}

.wf-footer {
  border-top: 1px solid rgba(231, 224, 211, 0.12);
  background:
    linear-gradient(180deg, #050607, #020303),
    #040505;
}

@media (max-width: 980px) {
  .wf-hero h1, .wf-page-title { font-size: 86px; }
  .wf-hero__case-rail { display: none; }
}

@media (max-width: 760px) {
  .wf-topbar__inner { width: min(var(--wf-max), calc(100% - 24px)); }
  .wf-nav a { min-height: 48px; }
  .wf-hero {
    min-height: min(760px, 88svh);
    align-items: end;
  }
  .wf-hero::before {
    background-position: top center;
    background-size: 520px auto;
    opacity: 0.48;
    mask-image: linear-gradient(180deg, black 0 46%, transparent 72%);
  }
  .wf-hero::after {
    mask-image: linear-gradient(180deg, black, transparent 78%);
  }
  .wf-hero__inner {
    padding-top: 232px;
    padding-bottom: 36px;
  }
  .wf-hero h1, .wf-page-title { font-size: 58px; }
  .wf-hero__actions--lead .wf-button { flex: 1 1 100%; }
  .wf-hero-extension {
    margin-top: 0;
    padding-bottom: 30px;
  }
  .wf-proof-rail {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .wf-proof-rail span {
    min-height: 86px;
    border-right: 1px solid rgba(231, 224, 211, 0.11);
  }
  .wf-proof-rail span:nth-child(2n) { border-right: 0; }
  .wf-proof-rail span:last-child {
    grid-column: 1 / -1;
    border-top: 1px solid rgba(231, 224, 211, 0.11);
  }
  .wf-heading { font-size: 34px; }
}

@media (max-width: 440px) {
  .wf-hero::before { background-size: 410px auto; }
  .wf-hero { min-height: min(720px, 86svh); }
  .wf-hero__inner { padding-top: 188px; }
  .wf-hero h1, .wf-page-title { font-size: 48px; }
  .wf-deck { font-size: 17px; }
  .wf-proof-rail { grid-template-columns: 1fr; }
  .wf-proof-rail span, .wf-proof-rail span:nth-child(2n) { border-right: 0; }
  .wf-proof-rail span:last-child { grid-column: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .wf-hero__weather, .wf-wave span { animation: none; }
  .wf-cta, .wf-button, .wf-pill, .wf-track-button, .wf-menu-toggle { transition: none; }
}
`);

console.log(`Generated ${urls.length} WESTFALL routes plus redirects.`);
