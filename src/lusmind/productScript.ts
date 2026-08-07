/* eslint-disable @typescript-eslint/no-explicit-any */
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
    "royal-heat": {
      index: "01",
      name: "Royal Heat",
      family: "Heat-stick portfolio",
      headline: "Two formats. One unmistakable ritual.",
      lede: "A coordinated slim-and-classic heat-stick range designed to give premium adult channels a coherent shelf story from single pack to master carton.",
      accent: "#d4a351",
      accentRgb: "212, 163, 81",
      layout: "left",
      campaign: "/assets/campaign/royal-heat-hero.webp",
      campaignAlt: "Lusmind Royal Heat slim and classic products arranged in a black and gold hospitality setting",
      board: "/assets/products/royal-slim.webp",
      boardAlt: "Royal Heat slim product board showing formats, packout and principal features",
      boardPosition: "center",
      facts: [
        ["Format range", "Slim + Classic", "One premium design language"],
        ["Retail pack", "20 sticks", "Distributor carton options"],
        ["Ready time", "Approx. 20 sec", "Draft platform target"],
        ["Program", "Brand / OEM", "Market-specific configuration"]
      ],
      intro: {
        eyebrow: "Portfolio logic / 01",
        title: "A premium language that scales across formats.",
        copy: "Royal Heat turns a fragmented heat-stick shelf into a disciplined family. The visual system, finish hierarchy and pack architecture are designed to remain legible across retail, display and wholesale carton formats."
      },
      features: [
        ["Consistent heat", "A controlled substrate structure supports stable, even heating through the session."],
        ["Fast readiness", "The proposed system target is a ready state in approximately twenty seconds."],
        ["Premium taste delivery", "Blend and airflow development are tuned for a smooth, composed sensory profile."],
        ["Scalable pack system", "Single packs, inner cartons and master cartons share one recognizable trade language."]
      ],
      specs: [
        ["Product class", "Heated consumable"],
        ["Format options", "Slim / Classic"],
        ["Pack configuration", "20-stick retail pack; 200-stick carton"],
        ["Color direction", "Carbon, champagne, burgundy, graphite"],
        ["Customization", "Blend, foil, pack and master carton"],
        ["Status", "Pre-production specification"]
      ],
      context: {
        eyebrow: "Channel context / 02",
        title: "Composed for elevated adult retail.",
        copy: "The black-and-gold system is designed for premium tobacconists, hospitality-led adult channels and distributors building a more considered heat portfolio.",
        points: ["Premium tobacconist", "Travel retail", "Hospitality channel", "Curated convenience"]
      },
      options: [
        { title: "Royal Slim", note: "Five finish directions", image: "/assets/products/royal-slim.webp", alt: "Royal Slim finish family and packaging", position: "27% center" },
        { title: "Royal Classic", note: "Classic format system", image: "/assets/products/royal-classic.webp", alt: "Royal Classic product and red packaging in a yacht setting", position: "28% center" }
      ],
      optionTitle: "One family, two shelf strategies.",
      optionCopy: "Launch a focused hero format or coordinate Slim and Classic as one market family. Packaging compliance panels are adapted at artwork stage.",
      palette: [
        ["Carbon", "#161817", "Slim"],
        ["Champagne", "#b38a4b", "Slim"],
        ["Burgundy", "#55272d", "Slim"],
        ["Royal Red", "#8d1721", "Classic"]
      ],
      trade: {
        moq: "50 cartons / SKU",
        samples: "12–18 days",
        lead: "30–40 days",
        customization: "Blend + full pack system"
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
        ["Interface", "Hybrid", "Pod + selected heat-stick formats"],
        ["Battery", "650 mAh", "Draft development target"],
        ["Charging", "USB-C", "Bottom-mounted port"],
        ["Body", "Aluminum", "Five finish directions"]
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
        ["Battery target", "650 mAh rechargeable"],
        ["Pod capacity", "2.5 mL nominal; market dependent"],
        ["Charging", "USB-C"],
        ["Materials", "Aluminum body / polymer pod"],
        ["Status", "Engineering concept; validation required"]
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
        ["Battery", "1,000 mAh", "Draft platform target"],
        ["Pod", "3.0 mL", "Regional configuration"],
        ["Coils", "0.6 / 0.8 Ω", "Proposed pod options"],
        ["Finishes", "Metal + wrap", "Five core colorways"]
      ],
      intro: {
        eyebrow: "Industrial design / 01",
        title: "A refillable designed to be recognized at a glance.",
        copy: "Arc Pod S uses a continuous curve to connect mouthpiece, viewing window and body. The result is compact in hand, strong in a line-up and adaptable across metallic and tactile finish programs."
      },
      features: [
        ["Curved viewing window", "The side opening makes liquid level checking quick while giving the silhouette a distinct signature."],
        ["Mesh pod platform", "Proposed 0.6-ohm and 0.8-ohm directions support configurable delivery and repeatable replacement."],
        ["Draw-led simplicity", "A minimal interaction model removes unnecessary controls for a clean everyday experience."],
        ["Two material families", "Choose a precise metallic shell or a warmer tactile wrap without changing the platform geometry."]
      ],
      specs: [
        ["Product class", "Refillable pod system"],
        ["Battery target", "1,000 mAh rechargeable"],
        ["Pod capacity", "3.0 mL nominal"],
        ["Coil options", "0.6 / 0.8 Ω mesh"],
        ["Charging", "USB-C"],
        ["Activation", "Draw activated"]
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
        ["Capacity target", "22 mL", "Market-dependent configuration"],
        ["Modes", "Eco + Boost", "Selectable output behavior"],
        ["Status", "Battery + liquid", "High-contrast digital readout"],
        ["Battery", "850 mAh", "USB-C rechargeable"]
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
        ["Capacity target", "22 mL; market dependent"],
        ["Battery target", "850 mAh rechargeable"],
        ["Output modes", "Eco / Boost"],
        ["Charging", "USB-C"],
        ["Display", "Battery / liquid / mode status"]
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
      next: "royal-heat"
    }
  };

  const PRODUCT_PATHS: any = {
    "royal-heat": "/products/royal-heat",
    "fusion-one": "/products/fusion-one",
    "arc-pod-s": "/products/arc-pod-s",
    "core-20": "/products/core-20",
    "ai-pulse": "/products/ai-pulse"
  };

  const currentId = productId;
  const product = PRODUCTS[currentId];

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
      <img src="${image}" alt="${alt}" loading="lazy" style="object-position:${position || "center"}" />
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

  productMain.innerHTML = `
    <section class="product-hero product-hero--${product.layout}" id="overview" aria-labelledby="product-title">
      <img class="product-hero__media" src="${product.campaign}" alt="${product.campaignAlt}" fetchpriority="high" />
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
            <img src="${product.board}" alt="${product.boardAlt}" loading="lazy" style="object-position:${product.boardPosition || "center"}" />
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

    <section class="context-stage context-stage--${product.layout}" aria-labelledby="context-title">
      <img src="${product.campaign}" alt="" loading="lazy" aria-hidden="true" />
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
      <img src="${nextProduct.campaign}" alt="" loading="lazy" />
      <div class="next-product__inner page-width">
        <div>
          <p class="eyebrow">Next platform / ${nextProduct.index}</p>
          <h2>${nextProduct.name}</h2>
        </div>
        <span class="next-product__arrow" aria-hidden="true">↗</span>
      </div>
    </a>
  `;

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
      <img src="/assets/brand/lusmind-logo.webp" alt="Lusmind" width="260" height="57" />
      <p class="eyebrow">Access restricted</p>
      <h1>This site is not available to you.</h1>
      <p>You must be of legal smoking age in your jurisdiction to view information about these products.</p>
      <a class="button button--line" href="https://www.google.com/">Leave website</a>
    `;
  });

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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

  const schema = {
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
    scope.dispose();
    schemaScript.remove();
    globalThis.document.body.classList.remove("is-locked");
  };
}
