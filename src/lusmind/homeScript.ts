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

export function initHome(): () => void {
  const scope = createScope();
  const { document, window }: { document: any; window: any } = scope;

  const PRODUCT_DATA: any = {
    "royal-slim": {
      url: "/products/royal-slim",
      code: "RYL / 01A",
      category: "Cigarette format",
      kicker: "Royal Heat series · slim proportion",
      name: "Royal Slim",
      statement: "A cigarette-referenced electronic format holding the larger Royal reservoir inside a discreet slim body and a black-and-champagne identity.",
      moq: "50 cartons / SKU",
      image: "/assets/products/royal-slim.webp",
      alt: "Lusmind Royal Slim product range and packaging",
      position: "center",
      tone: "dark",
      specs: [
        ["E-liquid", "2.2 mL"],
        ["Battery", "250 mAh"],
        ["Nicotine", "2% / 5%"],
        ["Coil", "1.0 / 1.5 Ω"]
      ]
    },
    "royal-classic": {
      url: "/products/royal-classic",
      code: "RYL / 01B",
      category: "Cigarette format",
      kicker: "Royal Heat series · classic proportion",
      name: "Royal Classic",
      statement: "A cigarette-referenced electronic format in the familiar classic proportion, carried by a royal red and warm ivory pack system.",
      moq: "50 cartons / SKU",
      image: "/assets/products/royal-classic.webp",
      alt: "Lusmind Royal Classic product and red packaging",
      position: "center",
      tone: "light",
      specs: [
        ["E-liquid", "1.8 mL"],
        ["Battery", "200 mAh"],
        ["Nicotine", "2% / 5%"],
        ["Coil", "1.0 / 1.5 Ω"]
      ]
    },
    fusion: {
      url: "/products/fusion-one",
      code: "HYB / 02",
      category: "Hybrid device",
      kicker: "A bridge between two rituals",
      name: "Fusion One",
      statement: "A cylindrical hybrid concept combining a refillable oil-pod architecture with a central socket for selected heat-stick formats.",
      moq: "1,000 units / color",
      image: "/assets/products/fusion-one.webp",
      alt: "Lusmind Fusion One hybrid device in five finishes",
      position: "center",
      tone: "dark",
      specs: [
        ["Battery", "300 mAh"],
        ["Pod", "2 mL"],
        ["Nicotine", "2% / 5%"],
        ["Coil", "0.8 / 1.2 Ω"]
      ]
    },
    arc: {
      url: "/products/arc-pod-s",
      code: "POD / 03",
      category: "Refillable pod",
      kicker: "A compact platform with a material point of view",
      name: "Arc Pod S",
      statement: "A refillable pod system built around a generous battery, curved pocket geometry and coordinated metal or tactile wrap finishes.",
      moq: "1,000 units / finish",
      image: "/assets/products/arc-metal.webp",
      alt: "Lusmind Arc Pod S in five metallic colors",
      position: "center",
      tone: "light",
      variants: {
        metal: {
          label: "Metal",
          image: "/assets/products/arc-metal.webp",
          alt: "Lusmind Arc Pod S in five metallic colors",
          position: "center",
          tone: "light"
        },
        leather: {
          label: "Leather",
          image: "/assets/products/arc-leather.webp",
          alt: "Lusmind Arc Pod S in five leather wrap finishes",
          position: "center",
          tone: "light"
        }
      },
      specs: [
        ["Battery", "600 mAh"],
        ["E-liquid", "2 mL + 10 mL"],
        ["Coil", "0.8 / 1.2 Ω"],
        ["Power", "14 W"]
      ]
    },
    core: {
      url: "/products/core-20",
      code: "HNB / 04",
      category: "Heat-not-burn",
      kicker: "Session confidence, made visible",
      name: "Core 20",
      statement: "A wrapped heat-not-burn platform with a full status display, adjustable control logic and all-day session capacity.",
      moq: "800 units / color",
      image: "/assets/products/core-20.webp",
      alt: "Lusmind Core 20 heat-not-burn device in four finishes",
      position: "center",
      tone: "dark",
      specs: [
        ["Sessions", "Up to 20"],
        ["Preheat", "20 seconds"],
        ["Control", "200–320 °C"],
        ["Battery", "1,200 mAh"]
      ]
    },
    pulse: {
      url: "/products/ai-pulse",
      code: "DSP / 05",
      category: "AI disposable",
      kicker: "Adaptive flavor platform",
      name: "AI Pulse",
      statement: "A display-led disposable engineered to turn real-time status and selectable output into a stronger premium shelf story.",
      moq: "3,000 units / SKU",
      image: "/assets/products/ai-pulse.webp",
      alt: "Lusmind AI Pulse disposable product platform",
      position: "center",
      tone: "light",
      specs: [
        ["E-liquid", "2 mL + 10 mL"],
        ["Battery", "600 mAh"],
        ["Coil", "Dual mesh"],
        ["Power", "14–22 W"]
      ]
    },
    eliquid: {
      url: "/products/e-liquid",
      code: "LIQ / 06",
      category: "Flavor platform",
      kicker: "Market-adaptive e-liquid range",
      name: "E-Liquid",
      statement: "A 24-flavor library developed as a market-adaptive platform, with nicotine configuration, VG/PG balance, bottle format and artwork defined per program.",
      moq: "On inquiry",
      image: "/assets/eliquid/home-promo-2400.webp",
      alt: "Lusmind e-liquid bottle range",
      position: "center",
      tone: "dark",
      specs: [
        ["Flavors", "24 profiles"],
        ["Nicotine", "On inquiry"],
        ["VG / PG", "Project dependent"],
        ["Artwork", "US / ME"]
      ]
    }
  };

  const body = document.body;
  const siteShell = document.querySelector("#site-shell");
  const ageGate = document.querySelector("#age-gate");
  const ageConfirm = document.querySelector("[data-age-confirm]");
  const ageDeny = document.querySelector("[data-age-deny]");
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector("#mobile-menu");
  const scrollProgress = document.querySelector(".scroll-progress span");
  const productsToggle = document.querySelector("[data-products-toggle]");
  const productDropdown = document.querySelector("#product-dropdown");

  let currentProduct = "pulse";
  let currentVariant = null;
  let productSwapTimer;

  const deferredTimers: any[] = [];
  const observers: any[] = [];

  /** Run non-critical work when the main thread is free. */
  function whenIdle(fn, timeout = 1200) {
    if (typeof (globalThis.window as any).requestIdleCallback === "function") {
      (globalThis.window as any).requestIdleCallback(fn, { timeout });
      return;
    }
    deferredTimers.push(globalThis.window.setTimeout(fn, 200));
  }

  function later(fn, delay) {
    deferredTimers.push(globalThis.window.setTimeout(fn, delay));
  }

  /** Swap a deferred `data-src` image into a real request. */
  function hydrateImage(image) {
    if (!image || !image.dataset || !image.dataset.src) return;
    if (image.dataset.srcset) {
      image.srcset = image.dataset.srcset;
      delete image.dataset.srcset;
    }
    image.src = image.dataset.src;
    delete image.dataset.src;
  }

  function hydrateWithin(root) {
    if (!root) return;
    root.querySelectorAll("img[data-src]").forEach(hydrateImage);
  }

  function observeOnce(nodes, callback, rootMargin = "700px 0px") {
    const items = [...nodes];
    if (!items.length) return;
    if (typeof globalThis.window.IntersectionObserver !== "function") {
      items.forEach(callback);
      return;
    }
    const observer = new globalThis.window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          callback(entry.target);
        });
      },
      { rootMargin }
    );
    items.forEach((item) => observer.observe(item));
    observers.push(observer);
  }

  /** Below-the-fold imagery and section backdrops load only as they approach. */
  function initDeferredMedia() {
    const images = [...document.querySelectorAll("img[data-src]")].filter(
      (image) => !image.closest(".hero__slideshow") && !image.closest("#product-dropdown")
    );
    observeOnce(images, hydrateImage);

    const backdrops = document.querySelectorAll(
      ".positioning, .wholesale, .assurance, .faq, .contact"
    );
    observeOnce(backdrops, (section) => section.classList.add("is-bg-ready"), "900px 0px");

    const stage = document.querySelector("[data-product-stage]");
    if (stage) {
      observeOnce([stage], () => {
        productStageReady = true;
        hydrateWithin(stage);
      });
    }
  }

  function safelyReadStorage(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safelyWriteStorage(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // The experience still works when storage is unavailable.
    }
  }

  let ageSlidesScheduled = false;
  const ageSlideTimers: any[] = [];

  function ageGateDismissed() {
    return ageGate.hidden || ageGate.classList.contains("is-accepted");
  }

  function cancelAgeSlides() {
    ageSlideTimers.forEach((timer) => globalThis.window.clearTimeout(timer));
    ageSlideTimers.length = 0;
  }
  /** Age-gate backdrops beyond the first are fetched just before their turn. */
  function scheduleAgeSlides() {
    if (ageSlidesScheduled) return;
    ageSlidesScheduled = true;
    const slides = [...document.querySelectorAll(".age-gate__slide[data-age-image]")];
    slides.forEach((slide, index) => {
      ageSlideTimers.push(
        globalThis.window.setTimeout(() => {
          // Never fetch a backdrop the visitor will no longer see.
          if (ageGateDismissed()) return;
          const src = slide.dataset.ageImage;
          if (!src) return;
          slide.style.setProperty("--age-image", `url('${src}')`);
          delete slide.dataset.ageImage;
        }, 1400 + index * 2400)
      );
    });
  }

  function hydrateHeroSlides() {
    const slides = [...document.querySelectorAll(".hero__slide[data-src]")];
    const [first, ...rest] = slides;
    hydrateImage(first);
    rest.forEach((slide, index) => later(() => hydrateImage(slide), 400 + index * 350));
  }

  function unlockSite({ remember = false } = {}) {
    if (remember) safelyWriteStorage("lusmind-age-verified-v1", "true");
    ageGate.classList.add("is-accepted");
    ageGate.setAttribute("aria-hidden", "true");
    siteShell.setAttribute("aria-hidden", "false");
    body.classList.remove("is-locked");
    cancelAgeSlides();
    // The first hero frame is requested at once so it can paint during the exit.
    hydrateHeroSlides();
    initHeroSlideshow();
    window.setTimeout(() => {
      if (ageGate.classList.contains("is-accepted")) ageGate.hidden = true;
    }, 520);
    // Page media only becomes relevant once the visitor is past the gate.
    whenIdle(initDeferredMedia);
  }

  function initAgeGate() {
    body.classList.add("is-locked");

    if (safelyReadStorage("lusmind-age-verified-v1") === "true") {
      unlockSite();
      return;
    }

    scheduleAgeSlides();

    ageConfirm.addEventListener("click", () => unlockSite({ remember: true }));
    ageDeny.addEventListener("click", () => {
      const panel = ageGate.querySelector(".age-gate__panel");
      panel.innerHTML = `
        <img src="/assets/brand/lusmind-logo-720.webp" alt="Lusmind" width="360" height="79" />
        <p class="eyebrow">Access restricted</p>
        <h1>Not available.</h1>
        <p>You must be of legal smoking age in your jurisdiction to view this website.</p>
        <a class="button button--ghost" href="https://www.google.com/">Leave website</a>
      `;
    });
  }

  function setMenu(open) {
    if (open) setProductsMenu(false);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.setAttribute("aria-hidden", String(!open));
    mobileMenu.classList.toggle("is-open", open);
    body.classList.toggle("is-menu-open", open);
    if (open) body.classList.add("is-locked");
    else if (ageGate.hidden || ageGate.classList.contains("is-accepted")) body.classList.remove("is-locked");
  }

  function setProductsMenu(open) {
    if (!productsToggle || !productDropdown) return;
    productsToggle.setAttribute("aria-expanded", String(open));
    productDropdown.setAttribute("aria-hidden", String(!open));
    productDropdown.classList.toggle("is-open", open);
    if (open) hydrateWithin(productDropdown);
  }

  function initNavigation() {
    menuToggle.addEventListener("click", () => {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenu(false));
    });

    productsToggle?.addEventListener("click", () => {
      setProductsMenu(productsToggle.getAttribute("aria-expanded") !== "true");
    });

    productDropdown?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setProductsMenu(false));
    });

    document.addEventListener("pointerdown", (event) => {
      if (productsToggle?.getAttribute("aria-expanded") !== "true") return;
      if (!event.target.closest(".nav-products")) setProductsMenu(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") setMenu(false);
      if (event.key === "Escape") setProductsMenu(false);
    });

    const navLinks = [...document.querySelectorAll(".desktop-nav > a[href^='#']")];
    const navTargets = navLinks
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-25% 0px -65%", threshold: 0 }
    );

    navTargets.forEach((section) => navObserver.observe(section));
  }

  function initScrollEffects() {
    let ticking = false;

    function updateScrollUI() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollUI);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateScrollUI();

    const reveals = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 }
    );

    reveals.forEach((element) => revealObserver.observe(element));
  }

  function createSpecsMarkup(specs) {
    return specs
      .map(
        ([label, value]) => `
          <div class="product-spec">
            <span>${label}</span>
            <strong>${value}</strong>
          </div>
        `
      )
      .join("");
  }

  function getProductMedia(product, variantKey = null) {
    if (variantKey && product.variants?.[variantKey]) return product.variants[variantKey];
    return {
      image: product.image,
      alt: product.alt,
      position: product.position,
      tone: product.tone
    };
  }

  function configureVariantControls(product) {
    const controls = document.querySelector("[data-variant-controls]");
    const buttons = [...controls.querySelectorAll("button")];
    const variants: any[] = product.variants ? Object.entries(product.variants) : [];

    if (!variants.length || product.name !== "Arc Pod S") {
      controls.hidden = true;
      currentVariant = null;
      return;
    }

    controls.hidden = false;
    currentVariant = variants[0][0];
    buttons.forEach((button, index) => {
      const variant = variants[index];
      button.hidden = !variant;
      if (!variant) return;
      button.dataset.variant = variant[0];
      button.textContent = variant[1].label;
      button.classList.toggle("is-active", index === 0);
    });
  }

  let productStageReady = false;
  function updateProductMedia(media, animate = true) {
    const stage = document.querySelector("[data-product-stage]");
    const image = document.querySelector("[data-product-image]");

    window.clearTimeout(productSwapTimer);
    if (animate) stage.classList.add("is-changing");

    const commit = () => {
      if (productStageReady) image.src = media.image;
      else image.dataset.src = media.image;
      image.alt = media.alt;
      image.style.objectPosition = media.position || "center";
      stage.classList.toggle("is-dark", media.tone === "dark");
      image.onload = () => stage.classList.remove("is-changing");
      if (image.complete) stage.classList.remove("is-changing");
    };

    if (animate) productSwapTimer = window.setTimeout(commit, 180);
    else commit();
  }

  function renderProduct(productId, { animate = true } = {}) {
    const product = PRODUCT_DATA[productId];
    if (!product) return;
    currentProduct = productId;

    document.querySelectorAll("[data-product-id]").forEach((link) => {
      const active = link.dataset.productId === productId;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });

    document.querySelector("[data-product-code]").textContent = product.code;
    document.querySelector("[data-product-category]").textContent = product.category;
    document.querySelector("[data-product-kicker]").textContent = product.kicker;
    document.querySelector("[data-product-name]").textContent = product.name;
    document.querySelector("[data-product-statement]").textContent = product.statement;
    document.querySelector("[data-product-moq]").textContent = product.moq;
    document.querySelector("[data-product-specs]").innerHTML = createSpecsMarkup(product.specs);
    document.querySelectorAll("[data-product-page-link]").forEach((link) => {
      link.href = product.url;
      if (link.classList.contains("product-stage__media-link")) link.setAttribute("aria-label", `Open the ${product.name} product page`);
    });

    configureVariantControls(product);
    updateProductMedia(getProductMedia(product, currentVariant), animate);
  }

  function initProductExplorer() {
    const tabs = [...document.querySelectorAll("[data-product-id]")];

    tabs.forEach((link, index) => {
      link.addEventListener("pointerenter", () => renderProduct(link.dataset.productId));
      link.addEventListener("focus", () => renderProduct(link.dataset.productId));
      link.addEventListener("keydown", (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
        event.preventDefault();
        const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
        const next = tabs[(index + direction + tabs.length) % tabs.length];
        next.focus();
        renderProduct(next.dataset.productId);
      });
    });

    document.querySelectorAll("[data-variant]").forEach((button) => {
      button.addEventListener("click", () => {
        const product = PRODUCT_DATA[currentProduct];
        if (!product.variants?.[button.dataset.variant]) return;
        currentVariant = button.dataset.variant;
        button.parentElement.querySelectorAll("button").forEach((sibling) => {
          sibling.classList.toggle("is-active", sibling === button);
        });
        updateProductMedia(getProductMedia(product, currentVariant));
      });
    });

    renderProduct("pulse", { animate: false });
  }

  function downloadLineSheet() {
    const headerRow = ["Platform", "Category", "Indicative MOQ", "Specification 1", "Specification 2", "Specification 3", "Specification 4"];
    const rows = Object.values<any>(PRODUCT_DATA).map((product) => [
      product.name,
      product.category,
      product.moq,
      ...product.specs.map(([label, value]) => `${label}: ${value}`)
    ]);
    const note = ["NOTE", "All data is preliminary and subject to final quotation, engineering validation and market requirements."];
    const csv = [headerRow, ...rows, [], note]
      .map((row) => row.map((value) => `"${String(value ?? "").split('"').join('""')}"`).join(","))
      .join("\r\n");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lusmind-2026-wholesale-line-sheet.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function openInquiry(productName = "") {
    setMenu(false);
    if (productName) {
      const productSelect = document.querySelector("#product-interest");
      productSelect.value = productName;
      productSelect.dispatchEvent(new Event("change"));
    }
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.querySelector("#inquiry-form input[name='name']").focus({ preventScroll: true }), 700);
  }

  function initActions() {
    document.querySelectorAll("[data-catalog-download]").forEach((button) => {
      button.addEventListener("click", downloadLineSheet);
    });

    document.querySelectorAll("[data-inquiry]").forEach((button) => {
      button.addEventListener("click", () => openInquiry());
    });

    document.querySelector("[data-product-inquiry]").addEventListener("click", () => {
      openInquiry(PRODUCT_DATA[currentProduct].name);
    });

    const dialog = document.querySelector("#comparison-dialog");
    document.querySelector("[data-compare-open]").addEventListener("click", () => dialog.showModal());
    document.querySelector("[data-compare-close]").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      const clickedOutside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
      if (clickedOutside) dialog.close();
    });

    document.querySelectorAll(".faq details").forEach((detail) => {
      detail.addEventListener("toggle", () => {
        if (!detail.open) return;
        document.querySelectorAll(".faq details").forEach((other) => {
          if (other !== detail) other.open = false;
        });
      });
    });
  }

  function initInquiryForm() {
    const form = document.querySelector("#inquiry-form");
    const status = document.querySelector("#form-status");
    const productSelect = document.querySelector("#product-interest");
    const productLink = document.querySelector("[data-interest-product-link]");
    const productByName = Object.values<any>(PRODUCT_DATA).reduce((map, item) => map.set(item.name, item), new Map<string, any>());

    productSelect.addEventListener("change", () => {
      const selected = productByName.get(productSelect.value);
      productLink.hidden = !selected;
      if (selected) {
        productLink.href = selected.url;
        productLink.textContent = `View ${selected.name} details ↗`;
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const subject = `Lusmind partner inquiry — ${data.get("company")}`;
      const message = [
        `Name: ${data.get("name")}`,
        `Company: ${data.get("company")}`,
        `Business email: ${data.get("email")}`,
        `Target market: ${data.get("market")}`,
        `Product interest: ${data.get("product")}`,
        `Estimated quantity: ${data.get("quantity")}`,
        "",
        "Project brief:",
        data.get("message")
      ].join("\n");

      status.textContent = "Opening your email client…";
      window.location.href = `mailto:support@lusmind.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      window.setTimeout(() => {
        status.textContent = "Draft prepared for support@lusmind.com";
      }, 900);
    });
  }

  let heroTimer: any;
  let heroSlideshowStarted = false;
  function initHeroSlideshow() {
    if (heroSlideshowStarted) return;
    const slideshow = document.querySelector(".hero__slideshow");
    if (!slideshow) return;
    heroSlideshowStarted = true;
    const slides = [...slideshow.querySelectorAll(".hero__slide")];
    if (slides.length < 2) {
      slides[0]?.classList.add("is-active");
      return;
    }
    let index = 0;
    const show = (next) => {
      index = (next + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    };
    const start = () => {
      globalThis.window.clearInterval(heroTimer);
      heroTimer = globalThis.window.setInterval(() => show(index + 1), 2000);
    };
    show(0);
    start();
    // Background tabs should not burn frames on the crossfade.
    document.addEventListener("visibilitychange", () => {
      if (globalThis.document.hidden) globalThis.window.clearInterval(heroTimer);
      else start();
    });
    const media = slideshow.closest(".hero__media") || slideshow;
    media.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        show(index + 1);
        start();
      },
      true
    );

  }

  initAgeGate();
  initNavigation();
  initScrollEffects();
  initProductExplorer();
  initActions();
  initInquiryForm();


  return () => {
    scope.dispose();
    deferredTimers.forEach((timer) => globalThis.window.clearTimeout(timer));
    cancelAgeSlides();
    observers.forEach((observer) => observer.disconnect());
    globalThis.window.clearTimeout(productSwapTimer);
    globalThis.window.clearInterval(heroTimer);
    globalThis.document.body.classList.remove("is-locked", "is-menu-open");
  };
}
