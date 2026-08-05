import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { productShellMarkup } from "@/lusmind/productShellMarkup";
import { initProduct } from "@/lusmind/productScript";
import { useStylesheet } from "@/lusmind/useStylesheet";
import { useInternalLinks } from "@/lusmind/useInternalLinks";
import NotFound from "@/pages/NotFound";

const PRODUCT_TITLES: Record<string, string> = {
  "royal-heat": "Royal Heat — Premium Heat-Stick Portfolio | Lusmind",
  "fusion-one": "Fusion One — Hybrid Device Platform | Lusmind",
  "arc-pod-s": "Arc Pod S — Refillable Pod System | Lusmind",
  "core-20": "Core 20 — Heat-Not-Burn Platform | Lusmind",
  "ai-pulse": "AI Pulse — Smart Disposable Platform | Lusmind",
};

const ProductPage = () => {
  const { productId = "" } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const known = Boolean(PRODUCT_TITLES[productId]);
  useStylesheet(known ? "/product-detail.css" : "");
  useInternalLinks(ref);

  useEffect(() => {
    if (!known) return;
    document.title = PRODUCT_TITLES[productId];
    window.scrollTo(0, 0);
    const dispose = initProduct(productId);
    return dispose;
  }, [known, productId]);

  if (!known) return <NotFound />;

  return (
    <div
      ref={ref}
      key={productId}
      data-page="product"
      dangerouslySetInnerHTML={{ __html: productShellMarkup }}
    />
  );
};

export default ProductPage;
