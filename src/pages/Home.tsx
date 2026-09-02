import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { homeMarkup } from "@/lusmind/homeMarkup";
import { initHome } from "@/lusmind/homeScript";
import { useStylesheet } from "@/lusmind/useStylesheet";
import { useInternalLinks } from "@/lusmind/useInternalLinks";

const Home = () => {
  const ref = useRef<HTMLDivElement>(null);
  const stylesReady = useStylesheet("/styles.css");
  const { hash } = useLocation();
  useInternalLinks(ref);

  useEffect(() => {
    const dispose = initHome();
    return dispose;
  }, []);

  useEffect(() => {
    if (!stylesReady || !hash) return;
    const id = hash.slice(1);
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [hash, stylesReady]);

  return (
    <div
      ref={ref}
      data-page="home"
      style={{ visibility: stylesReady ? "visible" : "hidden" }}
      dangerouslySetInnerHTML={{ __html: homeMarkup }}
    />
  );
};

export default Home;
