/* eslint-disable @typescript-eslint/no-explicit-any */
import { ELIQUID_FLAVORS, eliquidImage } from "./eliquidData";

const MARKET_KEY = "lusmind-eliquid-market-v1";

const MARKETS: Record<string, { label: string; short: string; note: string }> = {
  us: {
    label: "United States",
    short: "US",
    note: "US artwork direction. Nicotine warning panels, age statements and state-level requirements are applied at artwork stage.",
  },
  me: {
    label: "Middle East",
    short: "ME",
    note: "Middle East artwork direction. Language, warning panels and registration requirements are reviewed market by market before release.",
  },
};

const cardMarkup = (flavor: (typeof ELIQUID_FLAVORS)[number], market: string, index: number) => `
  <article class="elq-card reveal" data-flavor="${flavor.slug}" style="--stagger:${Math.min(index, 7) * 45}ms">
    <div class="elq-card__media">
      <img
        src="${eliquidImage(flavor.slug, market as "us" | "me")}"
        alt="Lusmind ${flavor.name} e-liquid bottle"
        width="900" height="1100"
        loading="lazy" decoding="async"
        data-flavor-image
      />
    </div>
    <div class="elq-card__body">
      <h3 tabindex="-1">${flavor.name}</h3>
      <ul class="elq-card__notes">${flavor.notes.map((note) => `<li>${note}</li>`).join("")}</ul>
    </div>
  </article>
`;

export function eliquidMarkup(inquiryHref: string): string {
  const initial = ELIQUID_FLAVORS.filter((flavor) => flavor.curated);

  return `
    <section class="product-hero product-hero--left product-hero--eliquid" id="overview" aria-labelledby="product-title">
      <img class="product-hero__media" src="/assets/eliquid/hero.webp" alt="Lusmind e-liquid bottle range presented as a still-life composition" fetchpriority="high" decoding="async" style="object-position:50% 46%" data-parallax />
      <div class="product-hero__shade" aria-hidden="true"></div>
      <div class="product-hero__grid" aria-hidden="true"></div>
      <div class="product-hero__inner">
        <div class="product-hero__copy">
          <a class="product-hero__crumb" href="/#collection"><span aria-hidden="true">←</span> Back to collection</a>
          <p class="eyebrow">Flavor platform / 06</p>
          <h1 id="product-title">E-Liquid <span>Twenty-four flavors. One formulation discipline.</span></h1>
          <p class="product-hero__lede">The Lusmind e-liquid range is a market-adaptive flavor platform developed for distributors and private-label partners. Nicotine configuration, VG/PG balance, bottle format and artwork are defined per program.</p>
          <div class="product-hero__actions">
            <a class="button button--accent" href="${inquiryHref}">Request the flavor list <span aria-hidden="true">↗</span></a>
            <a class="button button--line" href="#flavors">Browse the range <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div class="product-hero__index" aria-label="Twenty-four flavors in the range">
          Range<br /><strong>24</strong>flavors
        </div>
      </div>
    </section>

    <nav class="anchor-rail" aria-label="Section navigation">
      <div class="anchor-rail__inner page-width">
        <a href="#overview">Overview</a>
        <a href="#details">Formulation</a>
        <a href="#flavors">Flavors</a>
        <a href="#customization">Customization</a>
        <a href="#trade">Trade</a>
      </div>
    </nav>

    <section class="facts-rail" aria-label="Key range facts">
      <div class="facts-rail__grid page-width">
        <article class="fact"><span>Flavors</span><strong>24</strong><small>Current range</small></article>
        <article class="fact"><span>Nicotine</span><strong>On inquiry</strong><small>Market dependent</small></article>
        <article class="fact"><span>VG / PG</span><strong>Project dependent</strong><small>Tuned per device</small></article>
        <article class="fact"><span>Artwork</span><strong>US / ME</strong><small>Market-specific</small></article>
      </div>
    </section>

    <section class="product-section product-section--paper" id="details">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Formulation logic / 01</p>
            <p class="section-head__copy">Every flavor is built as a base profile that can be re-balanced for the device it will run in, the market it will ship to and the position the distributor needs it to hold on shelf.</p>
          </div>
          <h2>A flavor library, not a fixed catalogue.</h2>
        </header>
        <div class="breakdown">
          <figure class="breakdown__visual reveal">
            <img src="/assets/eliquid/range.webp" alt="Lusmind e-liquid bottles arranged as a range overview" loading="lazy" decoding="async" />
            <span class="visual-callout">Ingredient control</span>
            <span class="visual-callout">Batch documentation</span>
            <span class="visual-callout">Market artwork</span>
          </figure>
          <div class="breakdown__content reveal">
            <div>
              <article class="feature-row"><span class="feature-row__number">01</span><div><h3>Controlled inputs</h3><p>Flavor concentrates, nicotine and carrier bases are sourced against defined specifications and released with batch documentation.</p></div></article>
              <article class="feature-row"><span class="feature-row__number">02</span><div><h3>Profile families</h3><p>The range is organised into mint and ice, fruit, dessert and tobacco families so a distributor can build a balanced shelf rather than a flavor pile.</p></div></article>
              <article class="feature-row"><span class="feature-row__number">03</span><div><h3>Device-matched balance</h3><p>VG/PG balance and flavor loading are adjusted to the coil and airflow of the platform the liquid is paired with.</p></div></article>
              <article class="feature-row"><span class="feature-row__number">04</span><div><h3>Market-specific artwork</h3><p>Bottle art, language and warning panels are produced separately for each destination market.</p></div></article>
            </div>
            <div class="spec-table">
              <h3>Working specification</h3>
              <dl>
                <div><dt>Product class</dt><dd>E-liquid range</dd></div>
                <div><dt>Flavors</dt><dd>24 current profiles</dd></div>
                <div><dt>Nicotine strength</dt><dd>On inquiry — market dependent</dd></div>
                <div><dt>VG / PG</dt><dd>Project dependent</dd></div>
                <div><dt>Bottle format</dt><dd>Available — configured per program</dd></div>
                <div><dt>Artwork markets</dt><dd>US and Middle East directions</dd></div>
              </dl>
            </div>
          </div>
        </div>
        <p class="data-note">Formulation, nicotine configuration and packaging are defined per project. No fixed strength, ratio or format is implied by this page.</p>
      </div>
    </section>

    <section class="product-section product-section--dark elq-section" id="flavors">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Flavor catalogue / 02</p>
            <p class="section-head__copy">Artwork shown reflects the selected market direction. Availability of individual flavors is confirmed per market during registration review.</p>
          </div>
          <h2>Twenty-four profiles, two market directions.</h2>
        </header>

        <div class="elq-market reveal">
          <div class="elq-market__switch" role="group" aria-label="Select a market artwork direction">
            ${Object.entries(MARKETS).map(([id, market]) => `
              <button type="button" class="elq-market__button${id === "us" ? " is-active" : ""}" data-market="${id}" aria-pressed="${id === "us"}">
                <b>${market.short}</b><span>${market.label}</span>
              </button>
            `).join("")}
          </div>
          <p class="elq-market__note" data-market-note>${MARKETS.us.note}</p>
        </div>

        <div class="elq-grid" id="flavor-grid-extra" data-flavor-grid>
          ${initial.map((flavor, index) => cardMarkup(flavor, "us", index)).join("")}
        </div>

        <div class="elq-more">
          <button class="button button--accent" type="button" data-flavor-more aria-expanded="false" aria-controls="flavor-grid-extra">
            View all 24 flavors <span aria-hidden="true">↓</span>
          </button>
          <p class="data-note data-note--dark" id="flavor-grid-extra-note">Showing <span data-flavor-count>${initial.length}</span> of ${ELIQUID_FLAVORS.length} flavors.</p>
        </div>
      </div>
    </section>

    <section class="product-section product-section--paper" id="customization">
      <div class="page-width">
        <header class="section-head reveal">
          <div>
            <p class="eyebrow">Private label / 03</p>
            <p class="section-head__copy">The range can be delivered as Lusmind-branded stock or developed as a dedicated program under a partner brand.</p>
          </div>
          <h2>Build a range that belongs to your market.</h2>
        </header>
        <div class="elq-custom">
          <article class="elq-custom__item reveal"><span>01</span><h3>Flavor selection</h3><p>Choose from the existing 24 profiles or brief a new direction for development and sampling.</p></article>
          <article class="elq-custom__item reveal reveal--delay-1"><span>02</span><h3>Formulation</h3><p>Nicotine configuration, VG/PG balance and flavor loading are set against the target device and market.</p></article>
          <article class="elq-custom__item reveal reveal--delay-2"><span>03</span><h3>Bottle & pack</h3><p>Bottle format, closure, labelling and carton architecture are configured per program.</p></article>
          <article class="elq-custom__item reveal reveal--delay-3"><span>04</span><h3>Documentation</h3><p>Batch records and market documentation are prepared alongside production for the destination market.</p></article>
        </div>
      </div>
    </section>

    <section class="product-section product-section--dark elq-compliance" id="compliance">
      <div class="page-width">
        <div class="elq-compliance__layout">
          <div class="reveal">
            <p class="eyebrow">Compliance / 04</p>
            <h2>Availability is decided market by market.</h2>
            <p class="elq-compliance__copy">Nicotine-containing products are regulated differently in every destination. Flavor availability, permitted nicotine configuration, labelling and registration are reviewed before any program is confirmed. Lusmind supplies qualified adult-trade partners only.</p>
          </div>
          <aside class="elq-compliance__panel reveal" aria-label="Market notes">
            <div><span>United States</span><p>Adults 21+. Federal nicotine warning panels and state-level requirements applied at artwork stage.</p></div>
            <div><span>Middle East</span><p>Adults 18+ where permitted. Language, warning panels and registration requirements reviewed per country.</p></div>
            <div><span>Other regions</span><p>Reviewed on request. Availability depends on local registration and import rules.</p></div>
          </aside>
        </div>
        <p class="data-note data-note--dark">WARNING: Nicotine is an addictive chemical. This page is trade information for qualified adult-industry partners and is not a consumer offer.</p>
      </div>
    </section>

    <section class="trade-section" id="trade" aria-labelledby="trade-title">
      <div class="trade-layout page-width">
        <div class="trade-copy reveal">
          <p class="eyebrow">Distributor program / 05</p>
          <h2 id="trade-title">Start with a market, not a shopping cart.</h2>
          <p>Share your destination market, the devices the liquid needs to run in and the shelf position you are targeting. Our commercial team will return with the relevant flavor shortlist and formulation path.</p>
        </div>
        <aside class="trade-panel reveal" aria-label="Indicative commercial terms">
          <div class="trade-terms">
            <div class="trade-term"><span>Opening MOQ</span><strong>On inquiry</strong></div>
            <div class="trade-term"><span>Sample target</span><strong>On inquiry</strong></div>
            <div class="trade-term"><span>Production target</span><strong>Project dependent</strong></div>
            <div class="trade-term"><span>Program scope</span><strong>Flavor + formulation + pack</strong></div>
          </div>
          <a class="button button--accent" href="${inquiryHref}">Start an E-Liquid inquiry <span aria-hidden="true">↗</span></a>
          <small>Commercial values are confirmed per program. Compliance, nicotine configuration and saleability are reviewed market by market.</small>
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
}

/** Wires the market switch and the progressive "view all" reveal. */
export function initEliquid(document: any, window: any): () => void {
  let market = "us";
  try {
    const stored = window.localStorage.getItem(MARKET_KEY);
    if (stored && MARKETS[stored]) market = stored;
  } catch {
    // storage unavailable — default market is used
  }

  const grid = document.querySelector("[data-flavor-grid]");
  const note = document.querySelector("[data-market-note]");
  const counter = document.querySelector("[data-flavor-count]");
  const moreButton = document.querySelector("[data-flavor-more]");
  const buttons = [...document.querySelectorAll("[data-market]")];
  let expanded = false;

  const paintImages = () => {
    grid?.querySelectorAll("[data-flavor-image]").forEach((image: any) => {
      const slug = image.closest("[data-flavor]")?.getAttribute("data-flavor");
      if (!slug) return;
      const next = `/assets/eliquid/${market}/${slug}.webp`;
      if (!image.src.endsWith(next)) image.src = next;
    });
  };

  const setMarket = (next: string, persist = true) => {
    if (!MARKETS[next]) return;
    market = next;
    buttons.forEach((button: any) => {
      const active = button.getAttribute("data-market") === market;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    if (note) note.textContent = MARKETS[market].note;
    paintImages();
    if (!persist) return;
    try {
      window.localStorage.setItem(MARKET_KEY, market);
    } catch {
      // ignore
    }
  };

  buttons.forEach((button: any) => {
    button.addEventListener("click", () => setMarket(button.getAttribute("data-market")));
  });

  const setToggleLabel = () => {
    if (!moreButton) return;
    moreButton.innerHTML = expanded
      ? `Collapse flavor list <span aria-hidden="true">↑</span>`
      : `View all ${ELIQUID_FLAVORS.length} flavors <span aria-hidden="true">↓</span>`;
    moreButton.setAttribute("aria-expanded", String(expanded));
  };

  moreButton?.addEventListener("click", () => {
    if (!grid) return;

    if (expanded) {
      grid.querySelectorAll("[data-flavor-extra]").forEach((card: any) => card.remove());
      expanded = false;
      if (counter) counter.textContent = String(ELIQUID_FLAVORS.filter((f) => f.curated).length);
      setToggleLabel();
      moreButton.focus?.();
      return;
    }

    const rest = ELIQUID_FLAVORS.filter((flavor) => !flavor.curated);
    grid.insertAdjacentHTML(
      "beforeend",
      rest.map((flavor, index) => cardMarkup(flavor, market, index, true)).join("")
    );
    expanded = true;
    if (counter) counter.textContent = String(ELIQUID_FLAVORS.length);
    setToggleLabel();
    grid.querySelectorAll(".elq-card:not(.is-visible)").forEach((card: any) => card.classList.add("is-visible"));
    (grid.querySelector(`[data-flavor="${rest[0].slug}"] h3`) as HTMLElement | null)?.focus?.();
  });

  if (market !== "us") setMarket(market, false);

  return () => {
    // Listeners are registered through the scoped document proxy and are
    // removed by the caller's dispose().
  };
}
