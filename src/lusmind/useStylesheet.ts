import { useEffect, useState } from "react";

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
    return loaded.has(href) || document.getElementById("root")?.dataset.prerendered === "true";
  });

  useEffect(() => {
    if (!href) {
      setReady(false);
      return;
    }

    const existing = findLink(href);

    // Adopt a sheet injected by the boot script in index.html, or one kept from
    // an earlier visit to this route.
    const prerendered =
      document.getElementById("root")?.dataset.prerendered === "true";
    if (existing && (prerendered || loaded.has(href) || (existing.sheet && existing.sheet.cssRules))) {
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

    return () => {
      link.removeEventListener("load", done);
      link.removeEventListener("error", done);
    };
  }, [href]);

  return ready;
}
