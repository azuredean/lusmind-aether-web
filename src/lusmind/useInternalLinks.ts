import { useEffect } from "react";
import type { RefObject } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Turns the plain <a href="/..."> links inside the imported static markup into
 * client-side navigations, while leaving in-page anchors, mail links and
 * external links to the browser.
 */
export function useInternalLinks(ref: RefObject<HTMLElement>) {
  const navigate = useNavigate();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      event.preventDefault();
      const [path, hash] = href.split("#");
      const target = path || "/";

      if (target === window.location.pathname) {
        if (hash) {
          document
            .getElementById(hash)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      navigate(hash ? `${target}#${hash}` : target);
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [navigate, ref]);
}
