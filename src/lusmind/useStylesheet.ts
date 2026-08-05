import { useEffect, useState } from "react";

/**
 * Loads one of the supplied Lusmind stylesheets for the lifetime of a route.
 * Keeping the sheets separate avoids the homepage and product-detail styles
 * (which share class names) overwriting each other in the SPA.
 */
export function useStylesheet(href: string): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    if (!href) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    const done = () => setReady(true);
    link.addEventListener("load", done);
    link.addEventListener("error", done);
    document.head.append(link);

    return () => {
      link.removeEventListener("load", done);
      link.removeEventListener("error", done);
      link.remove();
    };
  }, [href]);

  return ready;
}
