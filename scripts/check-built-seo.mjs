import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const failures = [];

function fail(message) {
  failures.push(message);
}

async function read(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

function pageFile(pathname) {
  return pathname === "/"
    ? path.join(distRoot, "index.html")
    : path.join(distRoot, pathname.slice(1), "index.html");
}

function visibleText(html) {
  const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] || "";
  return body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#39);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const sitemap = await read("public/sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>(https:\/\/lusmind\.com[^<]*)<\/loc>/g)].map((match) => match[1]);

if (urls.length !== 10) fail(`Expected 10 canonical sitemap URLs, found ${urls.length}.`);
if (new Set(urls).size !== urls.length) fail("Sitemap contains duplicate URLs.");

const titles = [];
for (const url of urls) {
  const parsed = new URL(url);
  const pathname = parsed.pathname;
  const file = pageFile(pathname);
  try {
    await access(file);
    const html = await readFile(file, "utf8");
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1] || "";
    titles.push(title);

    if (!html.includes('data-prerendered="true"')) fail(`${pathname} is not prerendered.`);
    if (!html.includes(`<link rel="canonical" href="${url}" />`)) fail(`${pathname} has an incorrect canonical URL.`);
    if (!html.includes('<meta name="robots" content="index,follow" />')) fail(`${pathname} is not indexable.`);
    if (!/<h1\b/i.test(html)) fail(`${pathname} has no server-rendered H1.`);
    if (visibleText(html).length < 250) fail(`${pathname} has insufficient server-rendered text.`);
  } catch (error) {
    fail(`${pathname} output is missing or unreadable: ${error.message}`);
  }
}

if (new Set(titles).size !== titles.length) fail("Canonical routes do not all have unique titles.");
if (titles.some((title) => !title)) fail("At least one canonical route has no title.");

const notFound = await readFile(path.join(distRoot, "404.html"), "utf8");
if (!notFound.includes('data-prerendered="true"')) fail("404.html is not prerendered.");
if (!notFound.includes('<meta name="robots" content="noindex,follow" />')) fail("404.html is not marked noindex.");
if (notFound.includes('rel="canonical"')) fail("404.html should not declare a canonical URL.");
if (!/Page not found/i.test(notFound)) fail("404.html is missing its user-facing not-found message.");

const robots = await read("public/robots.txt");
if (!robots.includes("Sitemap: https://lusmind.com/sitemap.xml")) fail("robots.txt does not advertise the sitemap.");

const redirects = await read("public/_redirects");
if (!/^\/e-liquid\s+\/products\/e-liquid\s+301$/m.test(redirects)) fail("The e-liquid alias redirect is missing.");

const verification = (await read("public/googlef75d8919ca392e02.html")).trim();
if (verification !== "google-site-verification: googlef75d8919ca392e02.html") fail("Google verification file content is incorrect.");

const indexNowKey = (await read("public/ace41a5b8d3245fc89fdbeb0ad6e3b5f.txt")).trim();
if (indexNowKey !== "ace41a5b8d3245fc89fdbeb0ad6e3b5f") fail("IndexNow key file content is incorrect.");

if (failures.length) {
  console.error("SEO build checks failed:\n- " + failures.join("\n- "));
  process.exitCode = 1;
} else {
  console.log(`SEO build checks passed for ${urls.length} canonical routes, 404 handling, sitemap, robots, redirects and verification files.`);
}
