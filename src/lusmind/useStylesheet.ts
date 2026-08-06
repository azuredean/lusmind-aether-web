import { useEffect, useState } from "react";

/**
 * Loads one of the supplied Lusmind stylesheets for the lifetime of a route.
 * Keeping the sheets separate avoids the homepage and product-detail styles
 * (which share class names) overwriting each other in the SPA.
 */
const loaded = new Set<string>();

export function useStylesheet(href: string): boolean {
  const [ready, setReady] = useState(() => (href ? loaded.has(href) : false));

  useEffect(() => {
    if (!href) {
      setReady(false);
      return;
    }
    if (loaded.has(href)) {
      setReady(true);
      return;
    }
    setReady(false);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    const done = () => {
      loaded.add(href);
      setReady(true);
    };
    link.addEventListener("load", done);
    link.addEventListener("error", done);
    document.head.append(link);

    return () => {
      link.removeEventListener("load", done);
      link.removeEventListener("error", done);
      link.remove();
      loaded.delete(href);
    };
  }, [href]);

  return ready;
}
