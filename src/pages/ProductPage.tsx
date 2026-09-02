import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { productShellMarkup } from "@/lusmind/productShellMarkup";
import { initProduct } from "@/lusmind/productScript";
import { useStylesheet } from "@/lusmind/useStylesheet";
import { useInternalLinks } from "@/lusmind/useInternalLinks";
import NotFound from "@/pages/NotFound";
import { getProductMeta } from "@/seo/routeMeta";

const ProductPage = () => {
  const { productId = "" } = useParams();
  const ref = useRef<HTMLDivElement>(null);
  const meta = getProductMeta(productId);
  const known = Boolean(meta);
  const stylesReady = useStylesheet(known ? "/product-detail.css" : "");
  useInternalLinks(ref);

  useEffect(() => {
    if (!meta) return;
    window.scrollTo(0, 0);
    const dispose = initProduct(productId);
    return dispose;
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
