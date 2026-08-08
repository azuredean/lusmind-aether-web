import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { productShellMarkup } from "@/lusmind/productShellMarkup";
import { initProduct } from "@/lusmind/productScript";
import { useStylesheet } from "@/lusmind/useStylesheet";
import { useInternalLinks } from "@/lusmind/useInternalLinks";
import NotFound from "@/pages/NotFound";

const PRODUCT_META: Record<string, { title: string; description: string }> = {
  "royal-heat": {
    title: "Royal Heat Series — Royal Slim & Royal Classic | Lusmind",
    description:
      "Royal Heat is a two-product Lusmind series: Royal Slim (2.2 mL / 250 mAh) and Royal Classic (1.8 mL / 200 mAh). Compare both cigarette-format products.",
  },
  "royal-slim": {
    title: "Royal Slim — Cigarette-Format Electronic Product | Lusmind",
    description:
      "Royal Slim: 2.2 mL e-liquid, 250 mAh battery, 2% / 5% nicotine, 1.0 Ω / 1.5 Ω coil, in a cigarette-referenced slim format for premium adult channels.",
  },
  "royal-classic": {
    title: "Royal Classic — Cigarette-Format Electronic Product | Lusmind",
    description:
      "Royal Classic: 1.8 mL e-liquid, 200 mAh battery, 2% / 5% nicotine, 1.0 Ω / 1.5 Ω coil, in a familiar classic cigarette proportion with a red and ivory identity.",
  },
  "fusion-one": {
    title: "Fusion One — Hybrid Device Platform | Lusmind",
    description:
      "Fusion One: 2 mL pod, 300 mAh battery, 2% / 5% nicotine and 0.8 Ω / 1.2 Ω coils in one slim aluminium hybrid platform. Preliminary, customizable specification.",
  },
  "arc-pod-s": {
    title: "Arc Pod S — Refillable Pod System | Lusmind",
    description:
      "Arc Pod S: 2 mL + 10 mL configuration, 600 mAh battery, 0.8 Ω / 1.2 Ω coils and 14 W output, in metal or tactile wrap finish families.",
  },
  "core-20": {
    title: "Core 20 — Heat-Not-Burn Platform | Lusmind",
    description:
      "Core 20: a compact heat-stick platform with a status display, one-button operation and a configurable temperature window. Provisional specification.",
  },
  "ai-pulse": {
    title: "AI Pulse — Smart Disposable Platform | Lusmind",
    description:
      "AI Pulse: 2 mL + 10 mL configuration, 600 mAh battery, dual-mesh coil and 14–22 W Eco / Boost output with a full-face graphic and status interface.",
  },
};

const ProductPage = () => {
  const { productId = "" } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const meta = PRODUCT_META[productId];
  const known = Boolean(meta);
  const stylesReady = useStylesheet(known ? "/product-detail.css" : "");
  useInternalLinks(ref);

  useEffect(() => {
    if (!meta) return;
    document.title = meta.title;
    let tag = document.head.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    const previous = tag.content;
    tag.content = meta.description;
    window.scrollTo(0, 0);
    const dispose = initProduct(productId);
    return () => {
      dispose();
      if (tag) tag.content = previous;
    };
  }, [meta, productId]);

  if (!known) return <NotFound />;

  return (
    <div
      ref={ref}
      key={productId}
      data-page="product"
      style={{ visibility: stylesReady ? "visible" : "hidden" }}
      dangerouslySetInnerHTML={{ __html: productShellMarkup }}
    />
  );
};

export default ProductPage;
