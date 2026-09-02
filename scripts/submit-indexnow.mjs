const host = "lusmind.com";
const key = "ace41a5b8d3245fc89fdbeb0ad6e3b5f";
const keyLocation = `https://${host}/${key}.txt`;

const corporateUrls = [`https://${host}/`];
const productUrls = [
  `https://${host}/flavor`,
  `https://${host}/products/royal-heat`,
  `https://${host}/products/royal-slim`,
  `https://${host}/products/royal-classic`,
  `https://${host}/products/fusion-one`,
  `https://${host}/products/arc-pod-s`,
  `https://${host}/products/core-20`,
  `https://${host}/products/ai-pulse`,
  `https://${host}/products/e-liquid`,
];

const includeProducts = process.argv.includes("--include-products");
const confirm = process.argv.includes("--confirm");
const urlList = includeProducts ? [...corporateUrls, ...productUrls] : corporateUrls;

if (!confirm) {
  console.error("Dry run only. Add --confirm after the key file is live and the selected URLs are legally cleared.");
  console.log(JSON.stringify({ host, keyLocation, urlList }, null, 2));
  process.exit(2);
}

const keyResponse = await fetch(keyLocation, { redirect: "follow" });
const hostedKey = (await keyResponse.text()).trim();
if (!keyResponse.ok || hostedKey !== key) {
  throw new Error(`IndexNow key is not live or does not match: ${keyResponse.status} ${keyLocation}`);
}

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});

console.log(JSON.stringify({ status: response.status, accepted: response.ok, urlList }, null, 2));
if (!response.ok) process.exitCode = 1;
