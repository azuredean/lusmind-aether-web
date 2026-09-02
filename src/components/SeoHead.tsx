import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/seo/routeMeta";

const ORIGIN = "https://lusmind.com";

function upsertMeta(selector: string, attribute: "name" | "property", key: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  return tag;
}

function setNamedMeta(name: string, content: string) {
  upsertMeta(`meta[name="${name}"]`, "name", name).content = content;
}

function setPropertyMeta(property: string, content: string) {
  upsertMeta(`meta[property="${property}"]`, "property", property).content = content;
}

const SeoHead = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.head
      .querySelectorAll("script[data-prerendered-route-schema]")
      .forEach((script) => script.remove());

    const meta = getRouteMeta(pathname);
    const canonicalUrl = meta.canonicalPath
      ? new URL(meta.canonicalPath, ORIGIN).href
      : "";
    const imageUrl = new URL(meta.imagePath, ORIGIN).href;

    document.title = meta.title;
    setNamedMeta("description", meta.description);
    setNamedMeta("robots", meta.robots);
    setNamedMeta("twitter:card", "summary_large_image");
    setNamedMeta("twitter:title", meta.title);
    setNamedMeta("twitter:description", meta.description);
    setNamedMeta("twitter:image", imageUrl);
    setPropertyMeta("og:site_name", "LusMind");
    setPropertyMeta("og:locale", "en_US");
    setPropertyMeta("og:type", "website");
    setPropertyMeta("og:title", meta.title);
    setPropertyMeta("og:description", meta.description);
    setPropertyMeta("og:image", imageUrl);
    setPropertyMeta("og:url", canonicalUrl || new URL(pathname, ORIGIN).href);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
    } else {
      canonical?.remove();
    }
  }, [pathname]);

  return null;
};

export default SeoHead;
