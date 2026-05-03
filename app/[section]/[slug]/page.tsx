import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllRoutes, loadPage, routeFor } from "@/lib/content";

const SITE_URL = "https://docs.megam.io";

export function generateStaticParams() {
  return getAllRoutes();
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  try {
    const page = loadPage(section, slug);
    const url = `${SITE_URL}${routeFor(section, slug)}`;
    return {
      title: page.meta.title,
      description: page.meta.description || `${page.meta.title} — Megam Docs (Archived)`,
      alternates: { canonical: url }
    };
  } catch {
    return {};
  }
}

export default async function DocPage({
  params
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  let page;
  try {
    page = loadPage(section, slug);
  } catch {
    notFound();
  }

  return (
    <article
      className={`content-page page-${section}-${slug}`}
      dangerouslySetInnerHTML={{ __html: `<h1>${page.meta.title}</h1>${page.html}` }}
    />
  );
}
