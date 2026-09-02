const origin = "https://lusmind.com";
const canonicalPaths = [
  "/",
  "/flavor",
  "/products/royal-heat",
  "/products/royal-slim",
  "/products/royal-classic",
  "/products/fusion-one",
  "/products/arc-pod-s",
  "/products/core-20",
  "/products/ai-pulse",
  "/products/e-liquid",
];

function firstMatch(html, expression) {
  return html.match(expression)?.[1]?.trim() ?? null;
}

function visibleBodyText(html) {
  const body = firstMatch(html, /<body[^>]*>([\s\S]*)<\/body>/i) ?? "";
  return body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const results = [];
for (const path of canonicalPaths) {
  const url = `${origin}${path}`;
  try {
    const response = await fetch(url, { redirect: "manual" });
    const html = await response.text();
    const title = firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const canonical = firstMatch(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)
      ?? firstMatch(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    results.push({
      url,
      status: response.status,
      title,
      canonical,
      serverTextBytes: visibleBodyText(html).length,
    });
  } catch (error) {
    results.push({ url, error: error.message });
  }
}

for (const path of ["/e-liquid", "/definitely-not-a-real-page"]) {
  try {
    const response = await fetch(`${origin}${path}`, { redirect: "manual" });
    results.push({ url: `${origin}${path}`, status: response.status, location: response.headers.get("location") });
  } catch (error) {
    results.push({ url: `${origin}${path}`, error: error.message });
  }
}

console.table(results);

const failures = results.filter(result =>
  result.error
  || (canonicalPaths.some(path => `${origin}${path}` === result.url)
    && (result.status !== 200 || !result.title || !result.canonical || result.serverTextBytes < 250))
  || (result.url === `${origin}/e-liquid` && ![301, 308].includes(result.status))
  || (result.url.endsWith("/definitely-not-a-real-page") && result.status !== 404)
);

if (failures.length) {
  console.error(`SEO verification failed for ${failures.length} check(s).`);
  process.exitCode = 1;
}
