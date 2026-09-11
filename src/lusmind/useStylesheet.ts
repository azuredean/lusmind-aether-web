import { useLayoutEffect, useState } from "react";

/**
 * Loads one of the supplied Lusmind stylesheets for the lifetime of a route.
 * The two sheets share class names, so exactly one is ever enabled. Sheets are
 * kept in the DOM once loaded (disabled when inactive) so SPA navigation never
 * refetches CSS nor blanks the page.
 */
const ATTR = "data-lusmind-sheet";
const loaded = new Set<string>();

function findLink(href: string): HTMLLinkElement | null {
  if (typeof document === "undefined") return null;
  return document.head.querySelector<HTMLLinkElement>(`link[${ATTR}="${href}"]`);
}

function setActive(href: string) {
  document.head.querySelectorAll<HTMLLinkElement>(`link[${ATTR}]`).forEach((link) => {
    link.disabled = link.getAttribute(ATTR) !== href;
  });
}

export function useStylesheet(href: string): boolean {
  const [ready, setReady] = useState(() => {
    if (!href) return false;
    if (typeof document === "undefined") return true;
    const existing = findLink(href);
    return loaded.has(href) || Boolean(existing?.sheet);
  });

  // This must run before paint. A normal effect leaves one frame where the new
  // route is visible while the previous route's stylesheet is still active.
  useLayoutEffect(() => {
    if (!href) {
      setReady(false);
      return;
    }

    const existing = findLink(href);

    // Adopt a sheet injected by the boot script in index.html, or one kept from
    // an earlier visit to this route.
    if (existing && (loaded.has(href) || existing.sheet)) {
      loaded.add(href);
      setActive(href);
      setReady(true);
      return;
    }

    const link = existing ?? document.createElement("link");
    if (!existing) {
      link.rel = "stylesheet";
      link.href = href;
      link.setAttribute(ATTR, href);
      document.head.append(link);
    }
    setActive(href);
    setReady(false);

    const done = () => {
      loaded.add(href);
      setActive(href);
      setReady(true);
    };
    link.addEventListener("load", done);
    link.addEventListener("error", done);

    // The sheet can finish between the initial check and listener attachment.
    if (link.sheet) done();

    return () => {
      link.removeEventListener("load", done);
      link.removeEventListener("error", done);
    };
  }, [href]);

  return ready;
}
