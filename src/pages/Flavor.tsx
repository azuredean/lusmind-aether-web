import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { startFlavorHeadingDecode } from "@/lusmind/articleHeadingDecode";
import { useStylesheet } from "@/lusmind/useStylesheet";

const LiquidFlavorBackground = lazy(
  () => import("@/lusmind/LiquidFlavorBackground"),
);

const PRODUCTS = [
  {
    href: "/products/royal-slim",
    image: "/assets/products/royal-slim.webp",
    name: "Royal Slim",
    note: "Royal Heat series",
    code: "01A",
  },
  {
    href: "/products/royal-classic",
    image: "/assets/products/royal-classic.webp",
    name: "Royal Classic",
    note: "Royal Heat series",
    code: "01B",
  },
  {
    href: "/products/fusion-one",
    image: "/assets/campaign/fusion-one-hero.webp",
    name: "Fusion One",
    note: "Hybrid device",
    code: "02",
  },
  {
    href: "/products/arc-pod-s",
    image: "/assets/campaign/arc-pod-s-hero.webp",
    name: "Arc Pod S",
    note: "Refillable pod",
    code: "03",
  },
  {
    href: "/products/core-20",
    image: "/assets/campaign/core-20-hero.webp",
    name: "Core 20",
    note: "Heat-not-burn",
    code: "04",
  },
  {
    href: "/products/ai-pulse",
    image: "/assets/campaign/ai-pulse-hero.webp",
    name: "AI Pulse",
    note: "Smart disposable",
    code: "05",
  },
  {
    href: "/products/e-liquid",
    image: "/assets/eliquid/nav-promo-480.webp",
    name: "E-Liquid",
    note: "24 flavor profiles",
    code: "06",
  },
] as const;

type FlavorImageProps = {
  name: "flavor-streams" | "flavor-lab" | "flavor-panel" | "flavor-atlas";
  alt: string;
  className?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
};

function FlavorImage({
  name,
  alt,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  sizes = "(max-width: 900px) 100vw, 50vw",
}: FlavorImageProps) {
  const priorityProps =
    fetchPriority === "auto" ? {} : { fetchpriority: fetchPriority };

  return (
    <picture className={className}>
      <source
        type="image/webp"
        srcSet={`/assets/flavor/${name}-960.webp 960w, /assets/flavor/${name}-1672.webp 1672w`}
        sizes={sizes}
      />
      <img
        src={`/assets/flavor/${name}.png`}
        alt={alt}
        width="1672"
        height="941"
        loading={loading}
        {...priorityProps}
        decoding="async"
      />
    </picture>
  );
}

function AgeGate() {
  const [denied, setDenied] = useState(false);
  const [verified, setVerified] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.localStorage.getItem("lusmind-age-verified-v1") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.body.classList.toggle("is-locked", !verified);
    return () => document.body.classList.remove("is-locked");
  }, [verified]);

  if (verified) return null;

  const confirm = () => {
    try {
      window.localStorage.setItem("lusmind-age-verified-v1", "true");
    } catch {
      // Access still works when storage is unavailable.
    }
    setVerified(true);
  };

  return (
    <div
      className="age-gate flavor-age-gate"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flavor-age-title"
    >
      <FlavorImage
        name="flavor-panel"
        alt=""
        className="flavor-age-gate__backdrop"
        loading="eager"
        sizes="100vw"
      />
      <div className="flavor-age-gate__shade" aria-hidden="true" />
      <div className="age-gate__panel">
        <img
          src="/assets/brand/lusmind-logo-720.webp"
          alt="Lusmind"
          width="360"
          height="79"
        />
        <p className="eyebrow">Age verification / Trade site</p>
        <h2 id="flavor-age-title">
          {denied ? "Access restricted." : "For adults only."}
        </h2>
        <p>
          {denied
            ? "You must be of legal smoking age in your jurisdiction to view this website."
            : "This website contains nicotine-product information intended for adult trade professionals. Confirm that you are of legal smoking age in your jurisdiction."}
        </p>
        {!denied ? (
          <div className="age-gate__actions">
            <button className="button button--acid" type="button" onClick={confirm}>
              I am 21 or older
            </button>
            <button
              className="button button--ghost"
              type="button"
              onClick={() => setDenied(true)}
            >
              I am under 21
            </button>
          </div>
        ) : (
          <a className="button button--ghost" href="https://www.google.com/">
            Leave website
          </a>
        )}
        <small>
          Nicotine is an addictive chemical. Age restrictions vary by market.
        </small>
      </div>
    </div>
  );
}

function FlavorHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setProductsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", menuOpen);
    if (menuOpen) document.body.classList.add("is-locked");
    else if (
      window.localStorage.getItem("lusmind-age-verified-v1") === "true"
    ) {
      document.body.classList.remove("is-locked");
    }
    return () => {
      document.body.classList.remove("is-menu-open");
      document.body.classList.remove("is-locked");
    };
  }, [menuOpen]);

  const closeNavigation = () => {
    setProductsOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      <header ref={headerRef} className="site-header flavor-site-header">
        <Link className="brand" to="/" aria-label="Lusmind home">
          <img
            src="/assets/brand/lusmind-logo-720.webp"
            alt="Lusmind"
            width="260"
            height="57"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <div className="nav-products">
            <button
              className="nav-products__trigger"
              type="button"
              aria-expanded={productsOpen}
              aria-controls="flavor-product-dropdown"
              onClick={() => setProductsOpen((open) => !open)}
            >
              Products <span aria-hidden="true">+</span>
            </button>
            <div
              className={`product-dropdown${productsOpen ? " is-open" : ""}`}
              id="flavor-product-dropdown"
              aria-hidden={!productsOpen}
            >
              <p className="product-dropdown__label">
                The 2026 portfolio / 06 platforms · 07 products
              </p>
              <div className="product-dropdown__grid">
                {PRODUCTS.map((product) => (
                  <Link
                    key={product.href}
                    to={product.href}
                    onClick={closeNavigation}
                  >
                    <img
                      src={product.image}
                      alt=""
                      width="144"
                      height="96"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>
                      <strong>{product.name}</strong>
                      <small>{product.note}</small>
                    </span>
                    <b>{product.code}</b>
                  </Link>
                ))}
              </div>
              <Link
                className="product-dropdown__all"
                to="/#collection"
                onClick={closeNavigation}
              >
                Compare all platforms <span aria-hidden="true">↓</span>
              </Link>
            </div>
          </div>
          <Link className="is-active" aria-current="page" to="/flavor">
            Flavor
          </Link>
          <Link to="/#technology">Technology</Link>
          <Link to="/#wholesale">Wholesale</Link>
          <Link to="/#company">Company</Link>
        </nav>

        <Link className="header-cta" to="/#contact">
          Partner with us <span aria-hidden="true">↗</span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="flavor-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      <nav
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        id="flavor-mobile-menu"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <p className="eyebrow">Navigate / Flavor</p>
        <p className="mobile-menu__label">Products</p>
        <div className="mobile-products">
          {PRODUCTS.map((product) => (
            <Link
              key={product.href}
              to={product.href}
              onClick={closeNavigation}
            >
              <span>{product.code}</span>
              <strong>{product.name}</strong>
              <small>{product.note}</small>
            </Link>
          ))}
        </div>
        <div className="mobile-menu__sections">
          <Link to="/" onClick={closeNavigation}>
            Home
          </Link>
          <Link to="/flavor" aria-current="page" onClick={closeNavigation}>
            Flavor
          </Link>
          <Link to="/#technology" onClick={closeNavigation}>
            Technology
          </Link>
          <Link to="/#wholesale" onClick={closeNavigation}>
            Wholesale
          </Link>
          <Link to="/#company" onClick={closeNavigation}>
            Company
          </Link>
        </div>
        <Link
          className="button button--acid"
          to="/#contact"
          onClick={closeNavigation}
        >
          Start an inquiry
        </Link>
        <p className="mobile-menu__note">
          Available for qualified distributors, wholesalers and private-label
          partners.
        </p>
      </nav>
    </>
  );
}

function DeferredFlavorStream() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [staticOnly] = useState(() =>
    typeof window === "undefined" || window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)",
    ).matches,
  );

  useEffect(() => {
    if (staticOnly || !hostRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin: "420px 0px" },
    );
    observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [staticOnly]);

  return (
    <div ref={hostRef} className="flavor-stream-host" aria-hidden="true">
      <div className="flavor-liquid-form flavor-liquid-form--placeholder">
        <div className="flavor-liquid-form__fallback" />
      </div>
      {ready && !staticOnly ? (
        <Suspense fallback={null}>
          <LiquidFlavorBackground className="flavor-liquid-form--live" />
        </Suspense>
      ) : null}
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`flavor-reveal ${className}`}>{children}</div>;
}

const Flavor = () => {
  const stylesReady = useStylesheet("/styles.css");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!stylesReady) return;
    const root = heroRef.current;
    if (!root) return;
    return startFlavorHeadingDecode(root, {
      duration: 960,
      stagger: 70,
      scrambleLength: 5,
      preserveChance: 0.82,
      tailChance: 0.04,
    });
  }, [stylesReady]);

  useEffect(() => {
    if (!stylesReady) return;
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".flavor-reveal"),
    );
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [stylesReady]);

  return (
    <div
      className="flavor-page"
      style={{ visibility: stylesReady ? "visible" : "hidden" }}
    >
      <a className="skip-link" href="#flavor-main">
        Skip to flavor content
      </a>
      <AgeGate />
      <FlavorHeader />

      <main id="flavor-main">
        <section
          ref={heroRef}
          className="flavor-hero"
          aria-labelledby="flavor-hero-title"
        >
          <div className="flavor-hero__copy">
            <p className="eyebrow">The LUSMIND flavor position</p>
            <h1 id="flavor-hero-title">
              <span className="sr-only">
                Flavor is the product people return for.
              </span>
              <span aria-hidden="true" data-flavor-heading>
                Flavor is the product people return for.
              </span>
            </h1>
            <p className="flavor-hero__lede">
              We treat formulation, device calibration and market fit as one
              commercial system, because the first experience wins attention
              and the remembered flavor earns the reorder.
            </p>
            <div className="flavor-hero__actions">
              <a className="button button--ink" href="#flavor-system">
                Explore the system <span aria-hidden="true">↓</span>
              </a>
              <Link className="text-link" to="/#contact">
                Start a flavor brief <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>

          <div className="flavor-hero__visual">
            <FlavorImage
              name="flavor-streams"
              alt="Transparent flavor streams carrying citrus, berry, botanical and tobacco notes"
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
            />
            <div className="flavor-hero__legend" aria-label="Flavor dimensions">
              <span>Sweetness</span>
              <span>Cooling</span>
              <span>Acidity</span>
              <span>Body</span>
              <span>Aroma</span>
              <span>Finish</span>
            </div>
          </div>
        </section>

        <div className="flavor-principles" aria-label="Flavor system principles">
          <span>Profile architecture</span>
          <span>Delivery calibration</span>
          <span>Market localization</span>
          <span>Reference control</span>
        </div>

        <section
          className="flavor-system page-width"
          id="flavor-system"
          aria-labelledby="flavor-system-title"
        >
          <Reveal className="flavor-system__intro">
            <p className="eyebrow">A sensory map, not a flavor list</p>
            <h2 id="flavor-system-title">
              Every profile needs a clear reason to exist.
            </h2>
            <p>
              We define a target experience before naming a recipe. The work
              begins with the user, the market and the device, then translates
              that brief into an agreed sensory direction.
            </p>
          </Reveal>

          <Reveal className="flavor-system__atlas">
            <FlavorImage
              name="flavor-atlas"
              alt="A circular flavor atlas containing watermelon, citrus, cooling botanicals, berry, amber and tobacco directions"
              sizes="(max-width: 900px) 100vw, 92vw"
            />
            <p>
              A visual language for profile families, contrast and balance.
            </p>
          </Reveal>

          <dl className="flavor-system__dimensions">
            <Reveal>
              <dt>Profile architecture</dt>
              <dd>
                Sweetness, cooling, acidity, body, aroma and finish are shaped
                as one coherent experience.
              </dd>
            </Reveal>
            <Reveal>
              <dt>Device calibration</dt>
              <dd>
                Flavor direction is reviewed against delivery geometry, power
                behavior and coil response.
              </dd>
            </Reveal>
            <Reveal>
              <dt>Market localization</dt>
              <dd>
                Regional preference, channel context and climate inform the
                profile without erasing its identity.
              </dd>
            </Reveal>
            <Reveal>
              <dt>Production reference</dt>
              <dd>
                Agreed samples create a practical target for scale-up,
                documentation and repeat batch review.
              </dd>
            </Reveal>
          </dl>
        </section>

        <section className="flavor-lab" aria-labelledby="flavor-lab-title">
          <FlavorImage
            name="flavor-lab"
            alt="A perfumer in a clean white laboratory evaluating flavor materials and extracts"
            sizes="100vw"
          />
          <div className="flavor-lab__content page-width">
            <Reveal>
              <p className="eyebrow">From brief to production lock</p>
              <h2 id="flavor-lab-title">
                Sensory intent becomes a working reference.
              </h2>
            </Reveal>
            <ol className="flavor-process">
              <li>
                <span>Market brief</span>
                <p>User, channel, price architecture and launch context.</p>
              </li>
              <li>
                <span>Sensory direction</span>
                <p>Target notes, balance, intensity and finish.</p>
              </li>
              <li>
                <span>Lab sample</span>
                <p>Controlled iterations against the approved brief.</p>
              </li>
              <li>
                <span>Device match</span>
                <p>Review inside the intended delivery platform.</p>
              </li>
              <li>
                <span>Panel review</span>
                <p>Structured comparison and partner feedback.</p>
              </li>
              <li>
                <span>Reference lock</span>
                <p>Final direction for scale-up and documentation.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="flavor-panel" aria-labelledby="flavor-panel-title">
          <FlavorImage
            name="flavor-panel"
            alt="Three laboratory perfumers conducting a structured aroma panel"
            sizes="100vw"
          />
          <div className="flavor-panel__shade" aria-hidden="true" />
          <Reveal className="flavor-panel__copy page-width">
            <p className="eyebrow">Designed for the market it enters</p>
            <h2 id="flavor-panel-title">
              A shared language makes better decisions.
            </h2>
            <p>
              Distributors and brand partners need more than subjective
              adjectives. We turn feedback into a clear sensory brief so
              commercial, product and formulation teams can work toward the
              same target.
            </p>
            <Link className="button button--acid" to="/#contact">
              Request a tasting brief <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </section>

        <section className="flavor-commercial page-width">
          <Reveal className="flavor-commercial__statement">
            <p className="eyebrow">Built for reorder</p>
            <h2>
              The goal is not more flavors. It is a clearer reason to return.
            </h2>
          </Reveal>
          <Reveal className="flavor-commercial__copy">
            <p>
              For wholesale partners, the flavor decision sits at the center of
              range architecture. It shapes sampling, shelf logic, market
              differentiation and the story customers remember after the first
              purchase.
            </p>
            <Link className="text-link" to="/products/e-liquid">
              Explore the e-liquid range <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>
        </section>

        <section className="flavor-manifesto" aria-labelledby="flavor-manifesto-title">
          <div className="page-width flavor-manifesto__grid">
            <Reveal className="flavor-manifesto__copy">
              <p className="eyebrow">Build a market-specific direction</p>
              <h2 id="flavor-manifesto-title">
                One brief. One sensory reference. One scalable direction.
              </h2>
              <p>
                Bring us the market, channel, device and experience you want to
                own. We will help turn the brief into a range with a defined
                flavor point of view.
              </p>
              <div className="flavor-manifesto__actions">
                <Link className="button button--acid" to="/#contact">
                  Open a flavor project <span aria-hidden="true">↗</span>
                </Link>
                <Link className="button button--line" to="/#collection">
                  View product platforms
                </Link>
              </div>
            </Reveal>
            <div className="flavor-manifesto__visual">
              <DeferredFlavorStream />
              <span>Flavor Stream / LUSMIND sensory system</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer flavor-site-footer">
        <div className="page-width">
          <div className="footer__top">
            <Link className="footer__brand" to="/">
              <img
                src="/assets/brand/lusmind-logo-720.webp"
                alt="Lusmind"
                width="360"
                height="79"
              />
            </Link>
            <p>
              Product systems for adult markets.
              <br />
              Flavor built with intent.
            </p>
            <div className="footer__nav">
              <Link to="/#collection">Products</Link>
              <Link to="/flavor" aria-current="page">
                Flavor
              </Link>
              <Link to="/#technology">Technology</Link>
              <Link to="/#wholesale">Wholesale</Link>
              <Link to="/#contact">Contact</Link>
            </div>
          </div>
          <div className="footer__legal">
            <p>
              WARNING: Nicotine is an addictive chemical. Products shown are
              intended only for adults of legal smoking age and are not
              smoking-cessation devices. Availability is subject to local law.
            </p>
          </div>
          <div className="footer__bottom">
            <span>© 2026 Lusmind. All rights reserved.</span>
            <span>Preliminary B2B product presentation / V1.0</span>
            <a href="#flavor-main">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Flavor;
