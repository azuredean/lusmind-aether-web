import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server.js";
import { createServer } from "vite";

const ORIGIN = "https://lusmind.com";
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function routeMetaBlock(meta) {
  const canonical = meta.canonicalPath ? new URL(meta.canonicalPath, ORIGIN).href : "";
  const image = new URL(meta.imagePath, ORIGIN).href;
  const lines = [
    `    <meta name="description" content="${escapeAttribute(meta.description)}" />`,
    `    <meta name="robots" content="${escapeAttribute(meta.robots)}" />`,
    '    <meta name="author" content="LusMind" />',
  ];

  if (canonical) lines.push(`    <link rel="canonical" href="${escapeAttribute(canonical)}" />`);

  lines.push(
    '    <meta property="og:site_name" content="LusMind" />',
    '    <meta property="og:locale" content="en_US" />',
    '    <meta property="og:type" content="website" />',
    `    <meta property="og:title" content="${escapeAttribute(meta.title)}" />`,
    `    <meta property="og:description" content="${escapeAttribute(meta.description)}" />`,
  );

  if (canonical) lines.push(`    <meta property="og:url" content="${escapeAttribute(canonical)}" />`);

  lines.push(
    `    <meta property="og:image" content="${escapeAttribute(image)}" />`,
    '    <meta name="twitter:card" content="summary_large_image" />',
    `    <meta name="twitter:title" content="${escapeAttribute(meta.title)}" />`,
    `    <meta name="twitter:description" content="${escapeAttribute(meta.description)}" />`,
    `    <meta name="twitter:image" content="${escapeAttribute(image)}" />`,
    `    <title>${escapeAttribute(meta.title)}</title>`,
  );

  return [
    "    <!-- LUSMIND_ROUTE_META_START -->",
    ...lines,
    "    <!-- LUSMIND_ROUTE_META_END -->",
  ].join("\n");
}

function replaceRouteMeta(html, meta) {
  const marker = /\s*<!-- LUSMIND_ROUTE_META_START -->[\s\S]*?<!-- LUSMIND_ROUTE_META_END -->/;
  if (!marker.test(html)) throw new Error("Route metadata markers are missing from dist/index.html");
  return html.replace(marker, `\n${routeMetaBlock(meta)}`);
}

function replaceRoot(html, markup) {
  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error("The Vite root placeholder is missing from dist/index.html");
  return html.replace(root, `<div id="root" data-prerendered="true">${markup}</div>`);
}

function injectRouteSchema(html, schemaText) {
  if (!schemaText) return html;
  const safeSchema = schemaText.replaceAll("<", "\\u003c");
  const script = `    <script type="application/ld+json" data-prerendered-route-schema>${safeSchema}</script>\n`;
  return html.replace("  </head>", `${script}  </head>`);
}

function restoreGlobal(name, existed, value) {
  if (existed) globalThis[name] = value;
  else Reflect.deleteProperty(globalThis, name);
}

function buildProductContent(initProduct, productId) {
  let productMarkup = "";
  let schemaText = "";
  const productMain = {
    get innerHTML() {
      return productMarkup;
    },
    set innerHTML(value) {
      productMarkup = value;
    },
  };
  const yearNode = { textContent: "" };
  const classList = { add() {}, remove() {}, toggle() {} };
  const style = { setProperty() {}, width: "", transform: "" };
  const documentStub = {
    documentElement: { style, scrollHeight: 0 },
    body: { classList },
    head: {
      append(node) {
        if (node?.type === "application/ld+json") schemaText = String(node.text || "");
      },
    },
    querySelector(selector) {
      if (selector === "#product-main") return productMain;
      if (selector === "[data-year]") return yearNode;
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return { type: "", text: "", remove() {} };
    },
    addEventListener() {},
    removeEventListener() {},
  };
  const windowStub = {
    location: { href: `${ORIGIN}/products/${productId}` },
    innerHeight: 900,
    scrollY: 0,
    localStorage: { getItem() { return null; }, setItem() {} },
    matchMedia() { return { matches: true }; },
    addEventListener() {},
    removeEventListener() {},
    requestAnimationFrame() { return 0; },
    cancelAnimationFrame() {},
    setTimeout() { return 0; },
    clearTimeout() {},
  };

  const hadDocument = Object.hasOwn(globalThis, "document");
  const hadWindow = Object.hasOwn(globalThis, "window");
  const originalDocument = globalThis.document;
  const originalWindow = globalThis.window;

  try {
    globalThis.document = documentStub;
    globalThis.window = windowStub;
    initProduct(productId);
  } finally {
    restoreGlobal("document", hadDocument, originalDocument);
    restoreGlobal("window", hadWindow, originalWindow);
  }

  if (!productMarkup || !schemaText) {
    throw new Error(`Product prerender did not produce complete content for ${productId}`);
  }

  return { productMarkup, schemaText };
}

function renderComponent(Component, location) {
  return renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location },
      React.createElement(Component),
    ),
  );
}

function renderProductPage(ProductPage, location) {
  return renderToStaticMarkup(
    React.createElement(
      StaticRouter,
      { location },
      React.createElement(
        Routes,
        null,
        React.createElement(Route, {
          path: "/products/:productId",
          element: React.createElement(ProductPage),
        }),
      ),
    ),
  );
}

async function writeRoute(baseHtml, routePath, meta, markup, schemaText = "") {
  let html = replaceRouteMeta(baseHtml, meta);
  html = replaceRoot(html, markup);
  html = injectRouteSchema(html, schemaText);

  const outputFile = routePath === "/"
    ? path.join(distRoot, "index.html")
    : path.join(distRoot, routePath.slice(1), "index.html");
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html, "utf8");
}

const vite = await createServer({
  root: projectRoot,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

try {
  const [{ default: Home }, { default: Flavor }, { default: ProductPage }, { default: NotFound }, productModule, metaModule] = await Promise.all([
    vite.ssrLoadModule("/src/pages/Home.tsx"),
    vite.ssrLoadModule("/src/pages/Flavor.tsx"),
    vite.ssrLoadModule("/src/pages/ProductPage.tsx"),
    vite.ssrLoadModule("/src/pages/NotFound.tsx"),
    vite.ssrLoadModule("/src/lusmind/productScript.ts"),
    vite.ssrLoadModule("/src/seo/routeMeta.ts"),
  ]);

  const baseHtml = await readFile(path.join(distRoot, "index.html"), "utf8");
  const { CANONICAL_PATHS, NOT_FOUND_META, ROUTE_META } = metaModule;

  for (const routePath of CANONICAL_PATHS) {
    let markup;
    let schemaText = "";

    if (routePath === "/") markup = renderComponent(Home, routePath);
    else if (routePath === "/flavor") markup = renderComponent(Flavor, routePath);
    else {
      const productId = routePath.split("/").at(-1);
      markup = renderProductPage(ProductPage, routePath);
      const product = buildProductContent(productModule.initProduct, productId);
      const emptyMain = '<main id="product-main"></main>';
      if (!markup.includes(emptyMain)) {
        throw new Error(`Product shell is missing its content target for ${routePath}`);
      }
      markup = markup.replace(emptyMain, `<main id="product-main">${product.productMarkup}</main>`);
      schemaText = product.schemaText;
    }

    await writeRoute(baseHtml, routePath, ROUTE_META[routePath], markup, schemaText);
  }

  const notFoundMarkup = renderComponent(NotFound, "/not-found");
  let notFoundHtml = replaceRouteMeta(baseHtml, NOT_FOUND_META);
  notFoundHtml = replaceRoot(notFoundHtml, notFoundMarkup);
  await writeFile(path.join(distRoot, "404.html"), notFoundHtml, "utf8");

  console.log(`Prerendered ${CANONICAL_PATHS.length} canonical routes and 404.html.`);
} finally {
  await vite.close();
}
