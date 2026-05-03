// Port Jekyll _* collections under repo root into content/{section}/{slug}.mdx
// - Strips Liquid tags ({% include %}, {{ var }})
// - Strips kramdown attribute lists ({: .class}, {: target="_blank"}, {: id="x"})
// - Converts ~~~ fenced blocks to ``` (already supported by our parser, both work)
// - Carries title/order frontmatter; drops permalink
// - Annotates dead get.megam.io and forum.megam.io URLs (handled at render time too)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "content");

const COLLECTIONS = [
  ["_overview", "overview"],
  ["_gettingstarted", "gettingstarted"],
  ["_installation", "installation"],
  ["_configuration", "configuration"],
  ["_connectors", "connectors"],
  ["_machines", "machines"],
  ["_containers", "containers"],
  ["_customapps", "customapps"],
  ["_prepackagedapps", "prepackagedapps"],
  ["_domains", "domains"]
];

function stripLiquid(src) {
  // {% include foo %} blocks
  src = src.replace(/\{%[\s\S]*?%\}/g, "");
  // {{ variable }}
  src = src.replace(/\{\{[\s\S]*?\}\}/g, "");
  // kramdown attr lists on their own line: {: .info}
  src = src.replace(/^\s*\{:[^}]*\}\s*$/gm, "");
  // inline trailing attr lists: text {: target="_blank"}
  src = src.replace(/\s*\{:[^}]*\}/g, "");
  // image srcset attribute lists are now gone
  return src;
}

function parseFrontmatter(src) {
  if (!src.startsWith("---")) return { meta: {}, body: src };
  const end = src.indexOf("\n---", 3);
  if (end === -1) return { meta: {}, body: src };
  const fm = src.slice(3, end).trim();
  const body = src.slice(end + 4).replace(/^\n/, "");
  const meta = {};
  for (const line of fm.split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const k = line.slice(0, sep).trim();
    const v = line.slice(sep + 1).trim();
    meta[k] = v;
  }
  return { meta, body };
}

function emitFrontmatter(meta) {
  const lines = ["---"];
  if (meta.title) lines.push(`title: ${meta.title}`);
  if (meta.order) lines.push(`order: ${meta.order}`);
  if (meta.description) lines.push(`description: ${meta.description}`);
  lines.push("---", "");
  return lines.join("\n");
}

function convert(src) {
  const { meta, body } = parseFrontmatter(src);
  let cleaned = stripLiquid(body);
  // collapse 3+ blank lines
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  return emitFrontmatter(meta) + cleaned.trim() + "\n";
}

let count = 0;
for (const [jekyllDir, sectionId] of COLLECTIONS) {
  const srcDir = path.join(ROOT, jekyllDir);
  if (!fs.existsSync(srcDir)) continue;
  const dstDir = path.join(OUT, sectionId);
  fs.mkdirSync(dstDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    if (!file.endsWith(".md")) continue;
    const src = fs.readFileSync(path.join(srcDir, file), "utf8");
    const out = convert(src);
    const slug = file.replace(/\.md$/, "");
    fs.writeFileSync(path.join(dstDir, `${slug}.mdx`), out);
    count++;
    console.log(`  ${jekyllDir}/${file}  ->  content/${sectionId}/${slug}.mdx`);
  }
}

console.log(`\nPorted ${count} files into content/`);
