/* eslint-disable @typescript-eslint/no-explicit-any */
import { eliquidMarkup, initEliquid } from "./eliquidSection";
import { ELIQUID_FLAVORS } from "./eliquidData";
// Adapted from the supplied Lusmind static site scripts.
// The `document` / `window` bindings below are scoped proxies that record
// listener registrations so the SPA can fully clean up on route changes.
function createScope() {
  const listeners: Array<[EventTarget, string, any, any]> = [];
  const wrap = (target: any) =>
    new Proxy(target, {
      get(t, prop) {
        if (prop === "addEventListener") {
          return (...args: any[]) => {
            listeners.push([target, args[0], args[1], args[2]]);
            target.addEventListener(...(args as [string, any, any]));
          };
        }
        const value = t[prop];
        return typeof value === "function" ? value.bind(t) : value;
      },
      set(t, prop, value) {
        t[prop] = value;
        return true;
      },
    });
  return {
    document: wrap(globalThis.document) as any,
    window: wrap(globalThis.window) as any,
    dispose() {
      listeners.forEach(([target, type, handler, options]) =>
        target.removeEventListener(type, handler, options)
      );
      listeners.length = 0;
    },
  };
}

export function initProduct(productId: string): () => void {
  const scope = createScope();
  const { document, window }: { document: any; window: any } = scope;

  const PRODUCTS: any = {
    "royal-slim": {
      index: "01A",
      name: "Royal Slim",
      family: "Cigarette-format electronic product",
      headline: "The slim proportion, precisely held.",
      lede: "A cigarette-referenced electronic format built around a 2.2 mL reservoir and a 250 mAh cell, presented in a disciplined black-and-champagne system.",
      accent: "#d4a351",
      accentRgb: "212, 163, 81",
      layout: "left",
      campaign: "/assets/campaign/royal-heat-hero.webp",
      campaignAlt: "Lusmind Royal Slim presented in a black and champagne hospitality setting",
      campaignPosition: "62% 45%",
      board: "/assets/products/royal-slim.webp",
      boardAlt: "Royal Slim finish family, packaging and format overview",
      boardPosition: "center",
      facts: [
        ["E-liquid", "2.2 mL", "Preliminary specification"],
        ["Battery", "250 mAh", "Preliminary specification"],
        ["Coil type", "1.0 / 1.5 Ω", "Selectable"],
        ["Nicotine", "2% / 5%", "Market dependent"]
      ],
      intro: {
        eyebrow: "Format logic / 01",
        title: "A slim body that reads as familiar, not novel.",
        copy: "Royal Slim keeps the silhouette close to a conventional cigarette so the shelf conversation stays simple. The largest reservoir in the Royal series sits inside that restrained proportion, supported by a selectable coil specification."
      },
      features: [
        ["Cigarette-referenced scale", "The body is dimensioned to read comparably to a conventional cigarette in hand and on shelf."],
        ["2.2 mL reservoir", "The slim format carries the larger Royal liquid volume without widening the silhouette."],
        ["Selectable coil", "1.0 Ω and 1.5 Ω options allow the delivery profile to be tuned per market."],
        ["Champagne finish system", "A black-and-champagne palette keeps the format premium across pack, display and carton."]
      ],
      specs: [
        ["Product class", "Cigarette-format electronic product"],
        ["E-liquid capacity", "2.2 mL"],
        ["Battery", "250 mAh"],
        ["Nicotine strength", "2% / 5%"],
        ["Coil type", "1.0 Ω / 1.5 Ω"],
        ["Size", "Comparable to a conventional cigarette"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Composed for elevated adult retail.",
        copy: "The slim format suits premium tobacconists and hospitality-led adult channels where a discreet, familiar proportion matters more than device presence.",
        points: ["Premium tobacconist", "Travel retail", "Hospitality channel", "Curated convenience"]
      },
      options: [
        { title: "Royal Slim", note: "Five finish directions", image: "/assets/products/royal-slim.webp", alt: "Royal Slim finish family and packaging", position: "27% center" }
      ],
      optionTitle: "One format, five finish directions.",
      optionCopy: "Finish, foil treatment and pack architecture are developed together. Compliance panels are adapted at artwork stage, market by market.",
      palette: [
        ["Carbon", "#161817", "Body"],
        ["Champagne", "#b38a4b", "Detail"],
        ["Burgundy", "#55272d", "Pack"],
        ["Ivory", "#e9e2d4", "Pack"]
      ],
      trade: {
        moq: "50 cartons / SKU",
        samples: "12–18 days",
        lead: "30–40 days",
        customization: "Liquid + full pack system"
      },
      next: "royal-classic"
    },
    "royal-classic": {
      index: "01B",
      name: "Royal Classic",
      family: "Cigarette-format electronic product",
      headline: "The classic proportion, kept intact.",
      lede: "A cigarette-referenced electronic format with a 1.8 mL reservoir and a 200 mAh cell, dressed in a royal red and warm ivory identity built for travel-led retail.",
      accent: "#8d1721",
      accentRgb: "141, 23, 33",
      layout: "right",
      campaign: "/assets/products/royal-classic.webp",
      campaignAlt: "Lusmind Royal Classic and its red packaging presented in a warm travel setting",
      campaignPosition: "50% 42%",
      board: "/assets/products/royal-classic.webp",
      boardAlt: "Royal Classic product, red packaging and format overview",
      boardPosition: "center",
      facts: [
        ["E-liquid", "1.8 mL", "Preliminary specification"],
        ["Battery", "200 mAh", "Preliminary specification"],
        ["Coil type", "1.0 / 1.5 Ω", "Selectable"],
        ["Nicotine", "2% / 5%", "Market dependent"]
      ],
      intro: {
        eyebrow: "Format logic / 01",
        title: "Familiar proportion, contemporary identity.",
        copy: "Royal Classic holds the fuller classic cigarette proportion that many adult consumers already recognise. The identity moves away from champagne restraint toward royal red and warm ivory, giving distributors a clearly separate shelf signal from Royal Slim."
      },
      features: [
        ["Classic cigarette proportion", "The fuller body is dimensioned to read comparably to a conventional cigarette format."],
        ["1.8 mL reservoir", "A measured liquid volume matched to the 200 mAh energy specification."],
        ["Selectable coil", "1.0 Ω and 1.5 Ω directions keep the delivery profile adjustable per market."],
        ["Red and ivory system", "A warmer identity separates Classic from Slim at shelf without breaking the Royal family."]
      ],
      specs: [
        ["Product class", "Cigarette-format electronic product"],
        ["E-liquid capacity", "1.8 mL"],
        ["Battery", "200 mAh"],
        ["Nicotine strength", "2% / 5%"],
        ["Coil type", "1.0 Ω / 1.5 Ω"],
        ["Size", "Comparable to a conventional cigarette"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Made for travel-led and gifting moments.",
        copy: "The red-and-ivory pack architecture photographs strongly in travel retail, duty-free style displays and hospitality settings where the pack itself carries the story.",
        points: ["Travel retail", "Duty-free style display", "Premium tobacconist", "Gifting programs"]
      },
      options: [
        { title: "Royal Classic", note: "Classic format system", image: "/assets/products/royal-classic.webp", alt: "Royal Classic product and red packaging in a travel setting", position: "28% center" }
      ],
      optionTitle: "A warmer register for the same family.",
      optionCopy: "Classic shares the Royal trade logic and carton language with Slim, so a distributor can run both formats through one operational program.",
      palette: [
        ["Royal Red", "#8d1721", "Pack"],
        ["Burgundy", "#55272d", "Detail"],
        ["Warm Ivory", "#e9e2d4", "Pack"],
        ["Carbon", "#161817", "Body"]
      ],
      trade: {
        moq: "50 cartons / SKU",
        samples: "12–18 days",
        lead: "30–40 days",
        customization: "Liquid + full pack system"
      },
      next: "fusion-one"
    },

    "fusion-one": {
      index: "02",
      name: "Fusion One",
      family: "Hybrid device platform",
      headline: "One body. Two experience paths.",
      lede: "A slim aluminum platform that brings a visible refillable pod and a centered heat-stick interface into one disciplined industrial form.",
      accent: "#c7ff19",
      accentRgb: "199, 255, 25",
      layout: "left",
      campaign: "/assets/campaign/fusion-one-hero.webp",
      campaignAlt: "Lusmind Fusion One devices in a dark precision materials laboratory",
      board: "/assets/products/fusion-one.webp",
      boardAlt: "Fusion One product board with device colors and component callouts",
      boardPosition: "center",
      facts: [
        ["Pod", "2 mL", "Replaceable cartridge"],
        ["Battery", "300 mAh", "USB-C rechargeable"],
        ["Coil type", "0.8 / 1.2 Ω", "Selectable"],
        ["Nicotine", "2% / 5%", "Market dependent"]
      ],
      intro: {
        eyebrow: "System architecture / 01",
        title: "Hybrid capability without hybrid visual clutter.",
        copy: "Fusion One keeps the interaction sequence legible: a visible chamber at the top, a simple status signal at the center and a durable aluminum energy module below. It is conceived for distributors testing adjacent categories with one compact platform."
      },
      features: [
        ["Dual-interface top", "The modular top architecture supports refillable-pod and validated heat-stick configurations."],
        ["Visible liquid chamber", "A smoked transparent reservoir makes the fill level immediately understandable."],
        ["Smart status signal", "A compact indicator communicates heating, battery and working states without a large screen."],
        ["Aluminum enclosure", "The slim metal body balances premium tactility, low weight and everyday durability."]
      ],
      specs: [
        ["Product class", "Hybrid vapor / heat platform"],
        ["Pod capacity", "2 mL"],
        ["Battery", "300 mAh rechargeable"],
        ["Nicotine strength", "2% / 5%"],
        ["Coil type", "0.8 Ω / 1.2 Ω"],
        ["Size", "Diameter 80–100 mm; height 100–120 mm (customizable)"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "A focused answer for mixed-category shelves.",
        copy: "Fusion One is intended for specialist vape stores and adult retailers that want a compact conversation piece without multiplying device silhouettes.",
        points: ["Specialist vape", "Adult convenience", "Distributor showcase", "New-category pilot"]
      },
      options: [
        { title: "Fusion Finish System", note: "Five anodized directions", image: "/assets/products/fusion-one.webp", alt: "Fusion One devices in navy, black, silver, violet and green", position: "24% center" }
      ],
      optionTitle: "A technical palette with one signal color.",
      optionCopy: "The platform pairs quiet anodized finishes with an acid-lime identity signal. Branding and status-light color can be aligned to a distributor program.",
      palette: [
        ["Midnight Navy", "#17233c", "Anodized"],
        ["Obsidian", "#111312", "Anodized"],
        ["Machine Silver", "#8f9290", "Anodized"],
        ["Forest", "#183a31", "Anodized"],
        ["Signal Lime", "#c7ff19", "Detail"]
      ],
      trade: {
        moq: "1,000 devices / color",
        samples: "18–25 days",
        lead: "35–45 days",
        customization: "Finish + interface + pack"
      },
      next: "arc-pod-s"
    },
    "arc-pod-s": {
      index: "03",
      name: "Arc Pod S",
      family: "Refillable pod system",
      headline: "Soft geometry. Serious shelf presence.",
      lede: "A compact refillable pod platform shaped around a curved liquid window, confident material choices and a finish system built for visual merchandising.",
      accent: "#75ead5",
      accentRgb: "117, 234, 213",
      layout: "right",
      campaign: "/assets/campaign/arc-pod-s-hero.webp",
      campaignAlt: "Teal and burgundy Lusmind Arc Pod S devices in a warm architectural design studio",
      board: "/assets/products/arc-metal.webp",
      boardAlt: "Arc Pod S metallic finish family on a white product board",
      boardPosition: "center",
      facts: [
        ["E-liquid", "2 mL + 10 mL", "Pod + refill reservoir"],
        ["Battery", "600 mAh", "USB-C rechargeable"],
        ["Coil type", "0.8 / 1.2 Ω", "Mesh options"],
        ["Power", "14 W", "Output target"]
      ],
      intro: {
        eyebrow: "Industrial design / 01",
        title: "A refillable designed to be recognized at a glance.",
        copy: "Arc Pod S uses a continuous curve to connect mouthpiece, viewing window and body. The result is compact in hand, strong in a line-up and adaptable across metallic and tactile finish programs."
      },
      features: [
        ["Curved viewing window", "The side opening makes liquid level checking quick while giving the silhouette a distinct signature."],
        ["Mesh pod platform", "Proposed 0.8-ohm and 1.2-ohm directions support configurable delivery and repeatable replacement."],
        ["Draw-led simplicity", "A minimal interaction model removes unnecessary controls for a clean everyday experience."],
        ["Two material families", "Choose a precise metallic shell or a warmer tactile wrap without changing the platform geometry."]
      ],
      specs: [
        ["Product class", "Refillable pod system"],
        ["E-liquid capacity", "2 mL + 10 mL"],
        ["Battery", "600 mAh rechargeable"],
        ["Nicotine strength", "2% / 5%"],
        ["Coil type", "0.8 Ω / 1.2 Ω"],
        ["Power", "14 W"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Material choice becomes a merchandising tool.",
        copy: "Use Arc Pod S as a compact color wall, a restrained executive edit or a private-label capsule. The product remains coherent while the finish tells the channel story.",
        points: ["Pod specialist", "Lifestyle retail", "Color-led display", "Private-label capsule"]
      },
      options: [
        { title: "Arc Metal", note: "Satin metallic shell", image: "/assets/products/arc-metal.webp", alt: "Arc Pod S metallic color options", position: "center" },
        { title: "Arc Tactile", note: "Textured wrap shell", image: "/assets/products/arc-leather.webp", alt: "Arc Pod S tactile wrap color options", position: "center" }
      ],
      optionTitle: "Choose precision or warmth.",
      optionCopy: "Both finish families share pods, pack dimensions and merchandising logic—giving distributors variety without operational fragmentation.",
      palette: [
        ["Machine Silver", "#aeb2b2", "Metal"],
        ["Signal Orange", "#d95b13", "Metal / wrap"],
        ["Deep Teal", "#174f4d", "Metal / wrap"],
        ["Wine", "#7c2534", "Metal / wrap"],
        ["Night Blue", "#243c5c", "Metal / wrap"]
      ],
      trade: {
        moq: "1,000 devices / finish",
        samples: "15–22 days",
        lead: "30–40 days",
        customization: "CMF + pod + packaging"
      },
      next: "core-20"
    },
    "core-20": {
      index: "04",
      name: "Core 20",
      family: "Smart heat-stick device",
      headline: "Heat control, made visible.",
      lede: "A compact heat-stick platform with an at-a-glance display, one-button operation and tactile side panels designed for confident daily use.",
      accent: "#c7ff19",
      accentRgb: "199, 255, 25",
      layout: "left",
      campaign: "/assets/campaign/core-20-hero.webp",
      campaignAlt: "Lusmind Core 20 heat-stick devices arranged in an executive night lounge",
      board: "/assets/products/core-20.webp",
      boardAlt: "Core 20 product board showing four finishes, display and internal heating architecture",
      boardPosition: "center",
      facts: [
        ["Battery", "1,200 mAh", "Draft development target"],
        ["Heat range", "200–320°C", "Configurable control window"],
        ["Display", "Dual status", "Temperature + battery"],
        ["Charging", "USB-C", "Bottom-mounted port"]
      ],
      intro: {
        eyebrow: "Control system / 01",
        title: "The important states stay on the surface.",
        copy: "Core 20 makes temperature and remaining battery visible without turning the device into a screen-first object. A dark central face carries the information while textured side panels add warmth and grip."
      },
      features: [
        ["Controlled heating", "The internal heating architecture is designed around a configurable temperature window and stable session profile."],
        ["At-a-glance display", "Temperature, battery and heating status remain visible on the high-contrast front face."],
        ["One-button sequence", "A single tactile control keeps operation easy to explain at retail and simple to repeat."],
        ["Tactile side panels", "Wrapped side surfaces soften the technical body and open a broad CMF customization route."]
      ],
      specs: [
        ["Product class", "Heat-stick device"],
        ["Battery target", "1,200 mAh rechargeable"],
        ["Temperature target", "200–320°C adjustable"],
        ["Session time", "Up to 300 seconds"],
        ["Charging", "USB-C"],
        ["Interface", "Button + status display"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Technical confidence with a quieter character.",
        copy: "Core 20 is positioned for adult retailers that want a demonstrable control story and a premium material cue in the same compact platform.",
        points: ["Heat specialist", "Premium convenience", "Distributor demo", "Executive edit"]
      },
      options: [
        { title: "Core Material Edit", note: "Four tactile directions", image: "/assets/products/core-20.webp", alt: "Core 20 devices in brown, green, burgundy and blue", position: "23% center" }
      ],
      optionTitle: "A controlled front. A tactile side story.",
      optionCopy: "Core 20 keeps the black display architecture consistent while side materials create market-specific warmth, color and grip.",
      palette: [
        ["Tobacco Brown", "#62452f", "Tactile"],
        ["Pine", "#164337", "Tactile"],
        ["Burgundy", "#6d2532", "Tactile"],
        ["Night Blue", "#263451", "Tactile"]
      ],
      trade: {
        moq: "800 devices / color",
        samples: "20–28 days",
        lead: "40–50 days",
        customization: "UI + temperature + CMF"
      },
      next: "ai-pulse"
    },
    "ai-pulse": {
      index: "05",
      name: "AI Pulse",
      family: "Smart display disposable",
      headline: "A disposable with a point of view.",
      lede: "A high-capacity platform that combines a full product face, dual operating modes and visible battery and liquid status in one unmistakable device.",
      accent: "#d5ff26",
      accentRgb: "213, 255, 38",
      layout: "left",
      campaign: "/assets/campaign/ai-pulse-hero.webp",
      campaignAlt: "Lusmind AI Pulse devices in an illuminated blue and acid-lime digital studio",
      board: "/assets/products/ai-pulse.webp",
      boardAlt: "AI Pulse product board showing three graphic treatments and digital status interface",
      boardPosition: "center",
      facts: [
        ["E-liquid", "2 mL + 10 mL", "Pod + refill reservoir"],
        ["Battery", "600 mAh", "USB-C rechargeable"],
        ["Coil type", "Dual mesh", "Balanced flavor delivery"],
        ["Power", "14–22 W", "Eco / Boost range"]
      ],
      intro: {
        eyebrow: "Interface system / 01",
        title: "Information, identity and mode control share one face.",
        copy: "AI Pulse treats the front panel as a complete communication surface. Graphic identity sits beside battery, liquid and mode information, creating a product that reads clearly in use and at shelf distance."
      },
      features: [
        ["Selectable output profile", "The proposed control logic switches output behavior around the selected Eco or Boost experience."],
        ["Dual-mode control", "Eco prioritizes endurance while Boost increases output for a more immediate sensory profile."],
        ["Visible status stack", "Battery and liquid readouts reduce ambiguity and give the interface a strong technical rhythm."],
        ["Full-face graphic system", "Large-format artwork creates room for flavor coding, private-label identity and collectible series."]
      ],
      specs: [
        ["Product class", "Rechargeable disposable"],
        ["E-liquid capacity", "2 mL + 10 mL"],
        ["Battery", "600 mAh rechargeable"],
        ["Nicotine strength", "2% / 5%"],
        ["Coil type", "Dual mesh"],
        ["Power", "14–22 W (Eco / Boost)"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Built to stop the scroll—and the aisle.",
        copy: "AI Pulse gives high-volume adult channels a strong launch canvas: a recognizable black chassis, bold flavor graphics and an interface story that works in photography, video and physical display.",
        points: ["High-volume vape", "Launch display", "Social campaign", "Flavor-led range"]
      },
      options: [
        { title: "Pulse Graphic System", note: "Three launch directions", image: "/assets/products/ai-pulse.webp", alt: "AI Pulse devices with three blue and acid-lime graphic designs", position: "center" }
      ],
      optionTitle: "The chassis stays fixed. The story can move.",
      optionCopy: "Flavor color, front-panel graphics and screen iconography can be developed as one coordinated range without losing the core Pulse silhouette.",
      palette: [
        ["Electric Lime", "#d5ff26", "Flavor code"],
        ["Deep Cobalt", "#14295b", "Graphic field"],
        ["Pulse Magenta", "#cf2caa", "Interface"],
        ["Gloss Black", "#090b0d", "Chassis"]
      ],
      trade: {
        moq: "3,000 devices / SKU",
        samples: "18–25 days",
        lead: "30–45 days",
        customization: "Flavor + UI + full-face art"
      },
      next: "e-liquid"
    },
    "e-liquid": {
      index: "06",
      name: "E-Liquid",
      family: "Flavor platform",
      headline: "Twenty-four flavors. One formulation discipline.",
      lede: "A market-adaptive e-liquid range for distributors and private-label partners, with nicotine configuration, VG/PG balance, bottle format and artwork defined per program.",
      accent: "#c7ff19",
      accentRgb: "199, 255, 25",
      layout: "left",
      campaign: "/assets/eliquid/hero.webp",
      campaignAlt: "Lusmind e-liquid bottle range presented as a still-life composition",
      trade: {
        moq: "On inquiry",
        samples: "On inquiry",
        lead: "Project dependent",
        customization: "Flavor + formulation + pack"
      },
      next: "royal-slim"
    }
  };

  const PRODUCT_PATHS: any = {
    "royal-heat": "/products/royal-heat",
    "royal-slim": "/products/royal-slim",
    "royal-classic": "/products/royal-classic",
    "fusion-one": "/products/fusion-one",
    "arc-pod-s": "/products/arc-pod-s",
    "core-20": "/products/core-20",
    "ai-pulse": "/products/ai-pulse",
    "e-liquid": "/products/e-liquid"
  };


  const SERIES: any = {
    index: "01",
    name: "Royal Heat",
    family: "Royal series overview",
    headline: "One series. Two cigarette-format products.",
    lede: "Royal Heat is a two-product series: Royal Slim and Royal Classic. Both are cigarette-referenced electronic formats sharing one trade language, separated by proportion, capacity and identity.",
    accent: "#d4a351",
    accentRgb: "212, 163, 81",
    layout: "left",
    campaign: "/assets/campaign/royal-heat-hero.webp",
    campaignAlt: "Lusmind Royal Heat series presented in a black and champagne setting",
    trade: {
      moq: "50 cartons / SKU",
      samples: "12–18 days",
      lead: "30–40 days",
      customization: "Liquid + full pack system"
    },
    members: [
      {
        id: "royal-slim",
        code: "01A",
        name: "Royal Slim",
        image: "/assets/products/royal-slim.webp",
        alt: "Royal Slim product, finishes and packaging",
        position: "27% center",
        positioning: "The slim proportion. The larger reservoir in the series, held inside a discreet cigarette-referenced body and a black-and-champagne identity.",
        specs: [
          ["E-liquid", "2.2 mL"],
          ["Battery", "250 mAh"],
          ["Nicotine", "2% / 5%"],
          ["Coil type", "1.0 Ω / 1.5 Ω"],
          ["Size", "Comparable to a conventional cigarette"]
        ]
      },
      {
        id: "royal-classic",
        code: "01B",
        name: "Royal Classic",
        image: "/assets/products/royal-classic.webp",
        alt: "Royal Classic product and red packaging in a travel setting",
        position: "28% center",
        positioning: "The familiar classic proportion, carried by a royal red and warm ivory pack system built for travel-led display.",
        specs: [
          ["E-liquid", "1.8 mL"],
          ["Battery", "200 mAh"],
          ["Nicotine", "2% / 5%"],
          ["Coil type", "1.0 Ω / 1.5 Ω"],
          ["Size", "Comparable to a conventional cigarette"]
        ]
      }
    ],
    next: "fusion-one"
  };

  const currentId = productId;
  const isSeries = currentId === "royal-heat";
  const isEliquid = currentId === "e-liquid";
  const product = isSeries ? SERIES : PRODUCTS[currentId];

  if (!product) {
    throw new Error(`Unknown Lusmind product page: ${currentId || "missing id"}`);
  }

  document.documentElement.style.setProperty("--accent", product.accent);
  document.documentElement.style.setProperty("--accent-rgb", product.accentRgb);

  const productMain = document.querySelector("#product-main");
  const nextProduct = PRODUCTS[product.next];
  const pageCount = String(Object.keys(PRODUCTS).length).padStart(2, "0");

  const makeFacts = () => product.facts.map(([label, value, note]) => `
    <article class="fact">
      <span>${label}</span>
      <strong>${value}</strong>
      <small>${note}</small>
    </article>
  `).join("");

  const makeFeatures = () => product.features.map(([title, copy], index) => `
    <article class="feature-row">
      <span class="feature-row__number">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${title}</h3><p>${copy}</p></div>
    </article>
  `).join("");

  const makeCallouts = () => product.features.map(([title]) => `<span class="visual-callout">${title}</span>`).join("");

  const makeSpecs = () => product.specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("");

  const makeOptions = () => product.options.map(({ title, note, image, alt, position }) => `
    <article class="option-card">
      <img src="${image}" alt="${alt}" loading="lazy" decoding="async" style="object-position:${position || "center"}" />
      <div class="option-card__label"><strong>${title}</strong><small>${note}</small></div>
    </article>
  `).join("");

  const makePalette = () => product.palette.map(([name, color, note]) => `
    <div class="palette__item">
      <span class="palette__swatch" style="--swatch:${color}" aria-hidden="true"></span>
      <span>${name}</span>
      <small>${note}</small>
    </div>
  `).join("");

  const makeTerms = () => Object.entries({
    "Opening MOQ": product.trade.moq,
    "Sample target": product.trade.samples,
    "Production target": product.trade.lead,
    "Program scope": product.trade.customization
  }).map(([label, value]) => `<div class="trade-term"><span>${label}</span><strong>${value}</strong></div>`).join("");

  const inquiryHref = `mailto:support@lusmind.com?subject=${encodeURIComponent(`Distributor inquiry — ${product.name}`)}&body=${encodeURIComponent(`Hello Lusmind team,\n\nI would like to discuss wholesale or customization options for ${product.name}.\n\nCompany:\nMarket:\nEstimated quantity:\nTarget launch date:\n`)}`;


  const makeSeriesPanels = () => SERIES.members.map((m: any) => `
    <article class="series-panel reveal">
      <a class="series-panel__media" href="/products/${m.id}" aria-label="Explore ${m.name}">
        <img src="${m.image}" alt="${m.alt}" loading="lazy" decoding="async" style="object-position:${m.position}" />
      </a>
      <div class="series-panel__body">
        <p class="eyebrow">Product ${m.code}</p>
        <h3>${m.name}</h3>
        <p class="series-panel__copy">${m.positioning}</p>
        <dl class="series-panel__specs">
          ${m.specs.map(([label, value]: any) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join("")}
        </dl>
        <a class="button button--accent" href="/products/${m.id}">Explore ${m.name} <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  `).join("");

  const seriesMarkup = () => `
    <section class="product-hero product-hero--series product-hero--left" id="overview" aria-labelledby="product-title">
      <img class="product-hero__media" src="${SERIES.campaign}" alt="${SERIES.campaignAlt}" fetchpriority="high" decoding="async" data-parallax />
      <div class="product-hero__shade" aria-hidden="true"></div>
      <div class="product-hero__grid" aria-hidden="true"></div>
      <div class="product-hero__inner">
        <div class="product-hero__copy">
          <a class="product-hero__crumb" href="/#collection"><span aria-hidden="true">←</span> Back to collection</a>
          <p class="eyebrow">${SERIES.family} / ${SERIES.index}</p>
          <h1 id="product-title">${SERIES.name} <span>${SERIES.headline}</span></h1>
          <p class="product-hero__lede">${SERIES.lede}</p>
          <div class="product-hero__actions">
            <a class="button button--accent" href="/products/royal-slim">Explore Royal Slim <span aria-hidden="true">↗</span></a>
            <a class="button button--line" href="/products/royal-classic">Explore Royal Classic <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="product-hero__index" aria-label="Series of two products">
          Series<br /><strong>02</strong>products
        </div>
      </div>
    </section>

    <nav class="anchor-rail" aria-label="Section navigation">
      <div class="anchor-rail__inner page-width">
        <a href="#overview">Overview</a>
        <a href="#details">Products</a>
        <a href="#context">Compare</a>
        <a href="#trade">Trade</a>
      </div>
    </nav>

    <section class="product-section product-section--paper" id="details">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Series structure / 01</p>
            <p class="section-head__copy">Royal Heat is not a single product page. Select the format that fits your channel; each product has its own specification, identity and page.</p>
          </div>
          <h2>Two formats, one trade language.</h2>
        </header>
        <div class="series-grid">${makeSeriesPanels()}</div>
      </div>
    </section>

    <section class="product-section product-section--dark" id="context">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Direct comparison / 02</p>
            <p class="section-head__copy">Specifications are preliminary and market dependent. Nicotine configuration and saleability are reviewed market by market.</p>
          </div>
          <h2>Slim or Classic — where they differ.</h2>
        </header>
        <div class="series-compare reveal" role="table" aria-label="Royal Slim and Royal Classic comparison">
          <div class="series-compare__row series-compare__row--head" role="row">
            <span role="columnheader">Specification</span><span role="columnheader">Royal Slim</span><span role="columnheader">Royal Classic</span>
          </div>
          ${["E-liquid","Battery","Nicotine","Coil type","Size"].map((label, i) => `
            <div class="series-compare__row" role="row">
              <span role="cell">${label}</span>
              <strong role="cell">${SERIES.members[0].specs[i][1]}</strong>
              <strong role="cell">${SERIES.members[1].specs[i][1]}</strong>
            </div>
          `).join("")}
        </div>
        <p class="data-note data-note--dark">Preliminary specification. Values are indicative for planning and are confirmed at sampling.</p>
      </div>
    </section>

    <section class="trade-section" id="trade" aria-labelledby="trade-title">
      <div class="trade-layout page-width">
        <div class="trade-copy reveal">
          <p class="eyebrow">Distributor program / 03</p>
          <h2 id="trade-title">One program across both formats.</h2>
          <p>Royal Slim and Royal Classic share carton logic and commercial terms, so both formats can run through a single distributor program. Indicative values below apply to the series.</p>
        </div>
        <aside class="trade-panel reveal" aria-label="Indicative commercial terms">
          <div class="trade-terms">${makeTerms()}</div>
          <a class="button button--accent" href="${inquiryHref}">Start a Royal Heat inquiry <span aria-hidden="true">↗</span></a>
          <small>Indicative development targets, not a binding quotation. Compliance, nicotine configuration and saleability are reviewed market by market.</small>
        </aside>
      </div>
    </section>

    <a class="next-product" href="/products/royal-slim" aria-label="View next product: Royal Slim">
      <img src="/assets/products/royal-slim.webp" alt="" loading="lazy" decoding="async" />
      <div class="next-product__inner page-width">
        <div>
          <p class="eyebrow">Next product / 01A</p>
          <h2>Royal Slim</h2>
        </div>
        <span class="next-product__arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  `;

  productMain.innerHTML = isEliquid ? eliquidMarkup(inquiryHref) : isSeries ? seriesMarkup() : `
    <section class="product-hero product-hero--${product.layout}" id="overview" aria-labelledby="product-title">
      <img class="product-hero__media" src="${product.campaign}" alt="${product.campaignAlt}" fetchpriority="high" decoding="async" style="object-position:${product.campaignPosition || "center"}" data-parallax />
      <div class="product-hero__shade" aria-hidden="true"></div>
      <div class="product-hero__grid" aria-hidden="true"></div>
      <div class="product-hero__inner">
        <div class="product-hero__copy">
          <a class="product-hero__crumb" href="/#collection"><span aria-hidden="true">←</span> Back to collection</a>
          <p class="eyebrow">${product.family} / ${product.index}</p>
          <h1 id="product-title">${product.name} <span>${product.headline}</span></h1>
          <p class="product-hero__lede">${product.lede}</p>
          <div class="product-hero__actions">
            <a class="button button--accent" href="${inquiryHref}">Request distributor pricing <span aria-hidden="true">↗</span></a>
            <a class="button button--line" href="#details">Explore the system <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div class="product-hero__index" aria-label="Product ${product.index} of ${pageCount}">
          Product<br /><strong>${product.index}</strong>of ${pageCount}
        </div>
      </div>
    </section>

    <nav class="anchor-rail" aria-label="Section navigation">
      <div class="anchor-rail__inner page-width">
        <a href="#overview">Overview</a>
        <a href="#details">Details</a>
        <a href="#context">Context</a>
        <a href="#options">Finishes</a>
        <a href="#trade">Trade</a>
      </div>
    </nav>

    <section class="facts-rail" aria-label="Key product facts">
      <div class="facts-rail__grid page-width">${makeFacts()}</div>
    </section>

    <section class="product-section product-section--paper" id="details">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">${product.intro.eyebrow}</p>
            <p class="section-head__copy">${product.intro.copy}</p>
          </div>
          <h2>${product.intro.title}</h2>
        </header>
        <div class="breakdown">
          <figure class="breakdown__visual reveal">
            <img src="${product.board}" alt="${product.boardAlt}" loading="lazy" decoding="async" style="object-position:${product.boardPosition || "center"}" />
            ${makeCallouts()}
          </figure>
          <div class="breakdown__content reveal">
            <div>${makeFeatures()}</div>
            <div class="spec-table">
              <h3>Working specification</h3>
              <dl>${makeSpecs()}</dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="context-stage context-stage--${product.layout}" id="context" aria-labelledby="context-title">
      <img src="${product.campaign}" alt="" loading="lazy" decoding="async" aria-hidden="true" data-parallax />
      <div class="context-stage__inner page-width">
        <div class="context-stage__copy reveal">
          <p class="eyebrow">${product.context.eyebrow}</p>
          <h2 id="context-title">${product.context.title}</h2>
          <p>${product.context.copy}</p>
          <div class="context-points" aria-label="Recommended channels">${product.context.points.map((point) => `<span>${point}</span>`).join("")}</div>
        </div>
      </div>
    </section>

    <section class="product-section product-section--dark" id="options">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Finish strategy / 03</p>
            <p class="section-head__copy">Standard launch directions are shown for planning. Final colors, substrates and regulatory artwork are approved through the sampling process.</p>
          </div>
          <h2>Build the right range for your channel.</h2>
        </header>
        <div class="options-layout">
          <div class="option-gallery reveal">${makeOptions()}</div>
          <aside class="palette-panel reveal" aria-label="Finish palette">
            <div>
              <p class="eyebrow">CMF direction</p>
              <h3>${product.optionTitle}</h3>
              <p>${product.optionCopy}</p>
            </div>
            <div class="palette">${makePalette()}</div>
          </aside>
        </div>
      </div>
    </section>

    <section class="trade-section" id="trade" aria-labelledby="trade-title">
      <div class="trade-layout page-width">
        <div class="trade-copy reveal">
          <p class="eyebrow">Distributor program / 04</p>
          <h2 id="trade-title">Built for volume, not a shopping cart.</h2>
          <p>Lusmind works with qualified distributors, wholesalers and private-label teams. Share your market, channel and volume target; our commercial team will return with the relevant configuration path.</p>
        </div>
        <aside class="trade-panel reveal" aria-label="Indicative commercial terms">
          <div class="trade-terms">${makeTerms()}</div>
          <a class="button button--accent" href="${inquiryHref}">Start a ${product.name} inquiry <span aria-hidden="true">↗</span></a>
          <small>Indicative development targets, not a binding quotation. Compliance, nicotine configuration and saleability are reviewed market by market.</small>
        </aside>
      </div>
    </section>

    <a class="next-product" href="${PRODUCT_PATHS[product.next]}" aria-label="View next product: ${nextProduct.name}">
      <img src="${nextProduct.campaign}" alt="" loading="lazy" decoding="async" />
      <div class="next-product__inner page-width">
        <div>
          <p class="eyebrow">Next platform / ${nextProduct.index}</p>
          <h2>${nextProduct.name}</h2>
        </div>
        <span class="next-product__arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  `;

  const disposeEliquid = isEliquid ? initEliquid(document, window) : null;



  document.querySelectorAll(`[data-product-link="${currentId}"]`).forEach((link) => {
    link.setAttribute("aria-current", "page");
  });

  document.querySelectorAll("[data-product-inquiry]").forEach((link) => {
    link.href = inquiryHref;
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("#mobile-menu");

  function setMobileMenu(open) {
    menuToggle?.setAttribute("aria-expanded", String(open));
    mobileMenu?.setAttribute("aria-hidden", String(!open));
    mobileMenu?.classList.toggle("is-open", open);
    document.body.classList.toggle("is-locked", open);
  }

  menuToggle?.addEventListener("click", () => {
    setMobileMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));

  const productsMenu = document.querySelector(".nav-products");
  const productsButton = document.querySelector("[data-products-toggle]");

  function setProductsMenu(open) {
    productsMenu?.classList.toggle("is-open", open);
    productsButton?.setAttribute("aria-expanded", String(open));
  }

  productsButton?.addEventListener("click", () => {
    setProductsMenu(productsButton.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", (event) => {
    if (productsMenu && !productsMenu.contains(event.target)) setProductsMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    setProductsMenu(false);
    setMobileMenu(false);
  });

  const header = document.querySelector("[data-header]");
  const progress = document.querySelector(".scroll-progress span");

  function updateScrollUI() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (progress) progress.style.width = `${ratio * 100}%`;
    header?.classList.toggle("is-compact", window.scrollY > 20);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  const ageGate = document.querySelector("#age-gate");
  const agePanel = ageGate?.querySelector(".age-gate__panel");

  function storageRead(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function storageWrite(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The page remains usable when storage is unavailable.
    }
  }

  function dismissAgeGate(remember = true) {
    if (remember) storageWrite("lusmind-age-verified-v1", "true");
    ageGate?.classList.add("is-leaving");
    document.body.classList.remove("is-locked");
    window.setTimeout(() => {
      if (ageGate) ageGate.hidden = true;
    }, 320);
  }

  if (storageRead("lusmind-age-verified-v1") === "true") {
    if (ageGate) ageGate.hidden = true;
  } else {
    document.body.classList.add("is-locked");
    document.querySelector("[data-age-confirm]")?.focus();
  }

  document.querySelector("[data-age-confirm]")?.addEventListener("click", () => dismissAgeGate(true));
  document.querySelector("[data-age-deny]")?.addEventListener("click", () => {
    if (!agePanel) return;
    agePanel.innerHTML = `
      <img src="/assets/brand/lusmind-logo-720.webp" alt="Lusmind" width="260" height="57" />
      <p class="eyebrow">Access restricted</p>
      <h1>This site is not available to you.</h1>
      <p>You must be of legal smoking age in your jurisdiction to view information about these products.</p>
      <a class="button button--line" href="https://www.google.com/">Leave website</a>
    `;
  });

  const revealItems = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Staggered reveal for feature rows and specification values.
  document.querySelectorAll(".feature-row").forEach((row, index) => {
    row.style.setProperty("--stagger", `${Math.min(index, 6) * 60}ms`);
  });
  document.querySelectorAll(".spec-table dl > div").forEach((row, index) => {
    row.style.setProperty("--stagger", `${Math.min(index, 6) * 45}ms`);
  });

  // Anchor rail active state.
  const railLinks = [...document.querySelectorAll(".anchor-rail a")];
  let railObserver: IntersectionObserver | null = null;
  if (railLinks.length && "IntersectionObserver" in window) {
    const targets = railLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    railObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-30% 0px -60%", threshold: 0 });
    targets.forEach((section) => railObserver.observe(section));
  }

  // Restrained rAF parallax for hero and context imagery (desktop, motion allowed).
  const parallaxNodes = [...document.querySelectorAll("[data-parallax]")];
  let parallaxFrame = 0;
  let parallaxTicking = false;
  const parallaxEnabled = !reduceMotion && window.matchMedia("(min-width: 900px)").matches;

  function runParallax() {
    parallaxTicking = false;
    parallaxNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      node.style.transform = `translate3d(0, ${(progress * -22).toFixed(2)}px, 0) scale(1.06)`;
    });
  }

  function onParallaxScroll() {
    if (parallaxTicking) return;
    parallaxTicking = true;
    parallaxFrame = window.requestAnimationFrame(runParallax);
  }

  if (parallaxEnabled && parallaxNodes.length) {
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    runParallax();
  }



  const schema: any = isEliquid ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lusmind E-Liquid range",
    description: product.lede,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: ELIQUID_FLAVORS.length,
      itemListElement: ELIQUID_FLAVORS.map((flavor, position) => ({
        "@type": "ListItem",
        position: position + 1,
        item: {
          "@type": "Product",
          name: `Lusmind ${flavor.name} E-Liquid`,
          category: "E-liquid",
          description: `Flavor notes: ${flavor.notes.join(", ")}. Nicotine configuration and formulation are market dependent.`,
          image: new URL(`/assets/eliquid/us/${flavor.slug}.webp`, window.location.href).href,
          brand: { "@type": "Brand", name: "Lusmind" }
        }
      }))
    }
  } : isSeries ? {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lusmind Royal Heat series",
    description: SERIES.lede,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SERIES.members.map((member: any, position: number) => ({
        "@type": "ListItem",
        position: position + 1,
        item: {
          "@type": "Product",
          name: `Lusmind ${member.name}`,
          category: "Cigarette-format electronic product",
          description: member.positioning,
          image: new URL(member.image, window.location.href).href,
          url: new URL(`/products/${member.id}`, window.location.href).href,
          brand: { "@type": "Brand", name: "Lusmind" }
        }
      }))
    }
  } : {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Lusmind ${product.name}`,
    category: product.family,
    description: product.lede,
    image: new URL(product.campaign, window.location.href).href,
    brand: { "@type": "Brand", name: "Lusmind" },
    audience: { "@type": "BusinessAudience", audienceType: "Qualified adult-product distributors and wholesalers" }
  };

  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.text = JSON.stringify(schema);
  globalThis.document.head.append(schemaScript);

  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());

  return () => {
    disposeEliquid?.();
    scope.dispose();
    railObserver?.disconnect();
    if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
    schemaScript.remove();
    globalThis.document.body.classList.remove("is-locked");
  };
}
