const fs = require("fs");
const path = require("path");
const vm = require("vm");

const dir = __dirname;
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(dir, "config.js"), "utf8"), sandbox);
const C = sandbox.window.SITE_CONFIG;
if (!C) throw new Error("config.js did not define window.SITE_CONFIG");
if (!C.siteUrl) throw new Error("config.js needs a siteUrl, for example https://divmith.go-live.me/");

const base = String(C.siteUrl).replace(/\/*$/, "/");

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;");

const file = path.join(dir, "index.html");
let html = fs.readFileSync(file, "utf8");

function swap(re, text, what) {
  if (!re.test(html)) throw new Error("index.html is missing " + what);
  html = html.replace(re, () => text);
}

swap(/<h1 id="s-name">[\s\S]*?<\/h1>/, '<h1 id="s-name">' + esc(C.name) + "</h1>", '<h1 id="s-name">');
swap(/<p id="s-role" class="role">[\s\S]*?<\/p>/, '<p id="s-role" class="role">' + esc(C.role || "") + "</p>", '<p id="s-role">');

const links = (C.socials || []).map((s) =>
  '    <li><a href="' + esc(s.url) + '">' + esc(s.label || s.id) + "</a></li>"
);
swap(/<ul id="s-links">[\s\S]*?<\/ul>/, '<ul id="s-links">\n' + links.join("\n") + "\n  </ul>", '<ul id="s-links">');
swap(/<p id="s-copy" class="copy">[\s\S]*?<\/p>/, '<p id="s-copy" class="copy">' + esc(C.copyright || "") + "</p>", '<p id="s-copy">');

const title = esc(C.siteTitle || C.name);
swap(/<title>[\s\S]*?<\/title>/, "<title>" + title + "</title>", "<title>");

function setMeta(property, value) {
  const re = new RegExp('(<meta property="' + property + '" content=")[^"]*(">)');
  if (!re.test(html)) throw new Error("index.html is missing " + property);
  html = html.replace(re, (m, a, z) => a + esc(value) + z);
}
setMeta("og:title", C.shareTitle || C.name);
setMeta("og:url", base);
setMeta("og:image", base + "og-image.png");
swap(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + esc(base) + '">', 'the canonical link');

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: C.personName || C.name,
  url: base
};
if (C.role) person.jobTitle = C.role;
if (C.image && C.image.src) {
  person.image = /^https?:\/\//i.test(C.image.src) ? C.image.src : base + String(C.image.src).replace(/^\/+/, "");
}
const same = (C.socials || []).map((s) => s.url).filter(Boolean);
if (same.length) person.sameAs = same;
const json = JSON.stringify(person, null, 2).replace(/</g, "\\u003c");
swap(
  /<script type="application\/ld\+json" id="person-data">[\s\S]*?<\/script>/,
  '<script type="application/ld+json" id="person-data">\n' + json + "\n</script>",
  'the structured data script'
);

fs.writeFileSync(file, html);

fs.writeFileSync(
  path.join(dir, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  "  <url>\n    <loc>" + esc(base) + "</loc>\n  </url>\n" +
  "</urlset>\n"
);
fs.writeFileSync(
  path.join(dir, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: " + base + "sitemap.xml\n"
);

const about = html.match(/<div id="about">([\s\S]*?)<\/div>/);
const count = about ? (about[1].match(/<p[\s>]/g) || []).length : 0;
console.log("Updated index.html, sitemap.xml and robots.txt for " + base);
console.log(links.length + " social link(s), " + count + " about paragraph(s), structured data with " + Object.keys(person).length + " fields.");
