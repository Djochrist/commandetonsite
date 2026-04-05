import { useEffect } from "react";

const BASE_URL = "https://commandetonsite.vercel.app";
const OG_IMAGE = `${BASE_URL}/opengraph.jpg`;

interface SEOProps {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  structuredData?: object;
}

export function useSEO({ title, description, path, keywords, structuredData }: SEOProps) {
  const canonicalUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    document.title = title;

    setMeta("description", description);
    setMeta("robots", "index, follow");
    if (keywords) setMeta("keywords", keywords);

    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:url", canonicalUrl);
    setProperty("og:image", OG_IMAGE);
    setProperty("og:type", "website");
    setProperty("og:site_name", "CommandeTonSite");
    setProperty("og:locale", "fr_FR");

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", OG_IMAGE);

    setCanonical(canonicalUrl);

    if (structuredData) {
      let ld = document.querySelector('script[data-seo="ld"]') as HTMLScriptElement | null;
      if (!ld) {
        ld = document.createElement("script");
        ld.setAttribute("type", "application/ld+json");
        ld.setAttribute("data-seo", "ld");
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonicalUrl, keywords]);
}

function setMeta(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.name = name;
    document.head.appendChild(el);
  }
  el.content = content;
}

function setProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}
