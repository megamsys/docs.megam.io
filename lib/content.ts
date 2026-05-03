import fs from "node:fs";
import path from "node:path";

export type DocMeta = {
  title: string;
  description: string;
  order: number;
};

export type DocPage = {
  section: string;
  slug: string;
  meta: DocMeta;
  body: string;
  html: string;
};

export type SidebarSection = {
  id: string;
  title: string;
  pages: Array<{ slug: string; title: string; route: string }>;
};

const contentDir = path.join(process.cwd(), "content");

const sectionTitles: Record<string, string> = {
  overview: "Overview",
  gettingstarted: "Getting Started",
  installation: "Install",
  configuration: "Configure",
  connectors: "Connectors",
  customapps: "Custom Apps",
  prepackagedapps: "Pre-packaged Apps",
  containers: "Containers",
  machines: "Virtual Machines",
  domains: "Domains"
};

const sectionOrder = [
  "overview",
  "gettingstarted",
  "installation",
  "configuration",
  "connectors",
  "machines",
  "containers",
  "customapps",
  "prepackagedapps",
  "domains"
];

export function routeFor(section: string, slug: string): string {
  return `/${section}/${slug}`;
}

export function listAllPages(): DocPage[] {
  if (!fs.existsSync(contentDir)) return [];
  const out: DocPage[] = [];
  for (const section of fs.readdirSync(contentDir)) {
    const sectionDir = path.join(contentDir, section);
    if (!fs.statSync(sectionDir).isDirectory()) continue;
    for (const file of fs.readdirSync(sectionDir)) {
      if (!file.endsWith(".mdx") && !file.endsWith(".md")) continue;
      const slug = file.replace(/\.(mdx|md)$/, "");
      out.push(loadPage(section, slug));
    }
  }
  return out;
}

export function loadPage(section: string, slug: string): DocPage {
  const filePath = path.join(contentDir, section, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return {
    section,
    slug,
    meta,
    body,
    html: markdownToHtml(body)
  };
}

export function getSidebar(): SidebarSection[] {
  const pages = listAllPages();
  const bySection = new Map<string, DocPage[]>();
  for (const p of pages) {
    if (!bySection.has(p.section)) bySection.set(p.section, []);
    bySection.get(p.section)!.push(p);
  }
  const sections: SidebarSection[] = [];
  for (const id of sectionOrder) {
    const list = bySection.get(id);
    if (!list || list.length === 0) continue;
    list.sort((a, b) => a.meta.order - b.meta.order);
    sections.push({
      id,
      title: sectionTitles[id] ?? id,
      pages: list.map((p) => ({
        slug: p.slug,
        title: p.meta.title,
        route: routeFor(id, p.slug)
      }))
    });
  }
  return sections;
}

export function getAllRoutes(): Array<{ section: string; slug: string }> {
  return listAllPages().map((p) => ({ section: p.section, slug: p.slug }));
}

function parseFrontmatter(raw: string): { meta: DocMeta; body: string } {
  const meta: DocMeta = { title: "Megam Docs", description: "", order: 999 };
  if (!raw.startsWith("---")) return { meta, body: raw.trim() };
  const end = raw.indexOf("\n---", 3);
  if (end === -1) return { meta, body: raw.trim() };
  const fm = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();
  for (const line of fm.split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    const key = line.slice(0, sep).trim();
    const value = line.slice(sep + 1).trim();
    if (key === "title") meta.title = value;
    if (key === "description") meta.description = value;
    if (key === "order") meta.order = Number(value) || 999;
  }
  return { meta, body };
}

function markdownToHtml(markdown: string): string {
  const lines = markdown.split("\n");
  const out: string[] = [];
  let para: string[] = [];
  let list: string[] = [];
  let listType: "ul" | "ol" = "ul";
  let table: string[] = [];
  let inCode = false;
  let codeLang = "";
  let codeBuf: string[] = [];

  const flushPara = () => {
    if (para.length === 0) return;
    out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (list.length === 0) return;
    const items = list.map((i) => `<li>${inline(i)}</li>`).join("");
    out.push(`<${listType}>${items}</${listType}>`);
    list = [];
  };
  const flushTable = () => {
    if (table.length === 0) return;
    const rows = table.filter((row) => !/^\|?\s*:?-{3,}:?\s*\|/.test(row));
    const rendered = rows.map((row, idx) => {
      const cells = row
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((c) => c.trim());
      const tag = idx === 0 ? "th" : "td";
      return `<tr>${cells.map((c) => `<${tag}>${inline(c)}</${tag}>`).join("")}</tr>`;
    });
    out.push(`<table><tbody>${rendered.join("")}</tbody></table>`);
    table = [];
  };
  const flushCode = () => {
    const code = codeBuf.join("\n");
    out.push(
      `<pre><code class="lang-${escapeAttr(codeLang)}">${escapeHtml(code)}</code></pre>`
    );
    codeBuf = [];
    codeLang = "";
    inCode = false;
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushTable();
  };

  for (const rawLine of lines) {
    if (inCode) {
      const fence = /^(```|~~~)\s*$/.exec(rawLine.trim());
      if (fence) {
        flushCode();
        continue;
      }
      codeBuf.push(rawLine);
      continue;
    }

    const trimmed = rawLine.trim();

    const fence = /^(```|~~~)\s*([a-zA-Z0-9_-]*)\s*$/.exec(trimmed);
    if (fence) {
      flushAll();
      inCode = true;
      codeLang = fence[2] ?? "";
      continue;
    }

    if (trimmed === "" || trimmed === "---") {
      if (trimmed === "---") {
        flushAll();
        out.push("<hr />");
        continue;
      }
      flushAll();
      continue;
    }

    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushPara();
      flushList();
      table.push(trimmed);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushPara();
      flushTable();
      if (listType !== "ul") flushList();
      listType = "ul";
      list.push(trimmed.replace(/^[-*]\s+/, ""));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushPara();
      flushTable();
      if (listType !== "ol") flushList();
      listType = "ol";
      list.push(trimmed.replace(/^\d+\.\s+/, ""));
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushAll();
      const level = Math.min(heading[1].length, 6);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushAll();
      out.push(`<blockquote>${inline(trimmed.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    flushList();
    flushTable();
    para.push(trimmed);
  }

  if (inCode) flushCode();
  flushAll();
  return out.join("\n");
}

const DEAD_HOSTS = ["get.megam.io", "console.megam.io", "forum.megam.io", "api.megam.io"];

function isDeadHref(href: string): boolean {
  return DEAD_HOSTS.some((host) => href.includes(host));
}

function inline(value: string): string {
  let out = escapeHtml(value);
  // images: ![alt](src)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_m, alt: string, src: string) => {
    return `<img alt="${escapeAttr(alt)}" src="${escapeAttr(src)}" loading="lazy" />`;
  });
  // links: [text](href)
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, href: string) => {
    if (isDeadHref(href)) {
      return `<span class="dead-link" data-href="${escapeAttr(href)}">${label}</span>`;
    }
    const ext = /^https?:\/\//.test(href);
    const attr = ext ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeAttr(href)}"${attr}>${label}</a>`;
  });
  // bare URL detection for dead hosts in plain text
  for (const host of DEAD_HOSTS) {
    const re = new RegExp(`(https?://${host.replace(/\./g, "\\.")}[^\\s<]*)`, "g");
    out = out.replace(re, (m) => `<span class="dead-link">${m}</span>`);
  }
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(?<![*\w])\*([^*\n]+)\*(?!\w)/g, "<em>$1</em>");
  return out;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
