export type RouteMeta = {
  title: string;
  description: string;
  canonicalPath: string;
  imagePath: string;
  robots: "index,follow" | "noindex,follow";
};

const indexable = (
  title: string,
  description: string,
  canonicalPath: string,
  imagePath: string,
): RouteMeta => ({
  title,
  description,
  canonicalPath,
  imagePath,
  robots: "index,follow",
});

export const ROUTE_META: Record<string, RouteMeta> = {
  "/": indexable(
    "LusMind — Wholesale Vape & Heat Platforms",
    "LusMind develops vape, pod, heated-tobacco, e-liquid and AI-enabled product platforms for qualified distributors, wholesalers and private-label partners.",
    "/",
    "/assets/campaign/age-life-1.webp",
  ),
  "/flavor": indexable(
    "Flavor System | LusMind",
    "Explore the LusMind flavor system: sensory architecture, device calibration, market localization and production reference control for adult-market partners.",
    "/flavor",
    "/assets/flavor/flavor-atlas-1672.webp",
  ),
  "/products/royal-heat": indexable(
    "Royal Heat Series — Royal Slim & Royal Classic | LusMind",
    "Royal Heat is a two-product LusMind series: Royal Slim and Royal Classic. Compare both cigarette-format product platforms for qualified trade partners.",
    "/products/royal-heat",
    "/assets/campaign/royal-heat-hero.webp",
  ),
  "/products/royal-slim": indexable(
    "Royal Slim — Cigarette-Format Electronic Product | LusMind",
    "Royal Slim is a cigarette-referenced electronic product platform with a 2.2 mL reservoir, 250 mAh battery and selectable 1.0 Ω or 1.5 Ω coil specification.",
    "/products/royal-slim",
    "/assets/products/royal-slim.webp",
  ),
  "/products/royal-classic": indexable(
    "Royal Classic — Cigarette-Format Electronic Product | LusMind",
    "Royal Classic is a cigarette-referenced electronic product platform with a 1.8 mL reservoir, 200 mAh battery and selectable 1.0 Ω or 1.5 Ω coil specification.",
    "/products/royal-classic",
    "/assets/products/royal-classic.webp",
  ),
  "/products/fusion-one": indexable(
    "Fusion One — Hybrid Device Platform | LusMind",
    "Fusion One is a preliminary, customizable hybrid platform with a 2 mL pod, 300 mAh battery and selectable 0.8 Ω or 1.2 Ω coil specification.",
    "/products/fusion-one",
    "/assets/campaign/fusion-one-hero.webp",
  ),
  "/products/arc-pod-s": indexable(
    "Arc Pod S — Refillable Pod System | LusMind",
    "Arc Pod S is a refillable pod platform with a 2 mL pod, 10 mL bottle, 600 mAh battery, selectable 0.8 Ω or 1.2 Ω coil and 14 W output.",
    "/products/arc-pod-s",
    "/assets/campaign/arc-pod-s-hero.webp",
  ),
  "/products/core-20": indexable(
    "Core 20 — Heat-Not-Burn Platform | LusMind",
    "Core 20 is a compact heat-stick platform with a 1,300 mAh battery, 16–20 sessions per charge, 190-second sessions and a status display.",
    "/products/core-20",
    "/assets/campaign/core-20-hero.webp",
  ),
  "/products/ai-pulse": indexable(
    "AI Pulse — Smart Display Disposable Platform | LusMind",
    "AI Pulse is a high-capacity platform with a 30 mL pre-filled reservoir, 850 mAh USB-C rechargeable battery, dual-mesh coil and up to 25 W output.",
    "/products/ai-pulse",
    "/assets/campaign/ai-pulse-hero.webp",
  ),
  "/products/e-liquid": indexable(
    "E-Liquid Range — 24 Flavor Profiles | LusMind",
    "The LusMind e-liquid range includes 24 flavor profiles. Nicotine configuration, VG/PG balance, bottle format and artwork are defined per qualified trade program.",
    "/products/e-liquid",
    "/assets/eliquid/hero-1920.webp",
  ),
};

export const NOT_FOUND_META: RouteMeta = {
  title: "Page not found | LusMind",
  description: "The requested page is not part of the LusMind B2B platform.",
  canonicalPath: "",
  imagePath: "/assets/brand/lusmind-logo-720.webp",
  robots: "noindex,follow",
};

export const CANONICAL_PATHS = Object.keys(ROUTE_META);

export function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function getRouteMeta(pathname: string): RouteMeta {
  const normalized = normalizePathname(pathname);
  if (normalized === "/e-liquid") return ROUTE_META["/products/e-liquid"];
  return ROUTE_META[normalized] ?? NOT_FOUND_META;
}

export function getProductMeta(productId: string): RouteMeta | undefined {
  return ROUTE_META[`/products/${productId}`];
}
