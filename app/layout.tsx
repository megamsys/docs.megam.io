import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { getSidebar } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.megam.io"),
  title: {
    default: "Megam Docs (Archived)",
    template: "%s | Megam Docs"
  },
  description:
    "Archived documentation for MegamVertice — an open-source cloud management platform built by Megam Systems LLP (Chennai, 2012-2018). Preserved for historical reference.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Megam Docs",
    url: "https://docs.megam.io",
    title: "Megam Docs (Archived)",
    description:
      "Archived MegamVertice documentation. Megam Systems LLP wound down in 2018; this site is preserved for reference."
  }
};

const archiveJsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  name: "Megam Docs (Archived)",
  about: "MegamVertice cloud management platform",
  isAccessibleForFree: true,
  license: "https://creativecommons.org/licenses/by/4.0/",
  publisher: {
    "@type": "Organization",
    name: "Megam Systems LLP",
    url: "https://megam.io",
    dissolutionDate: "2018-10"
  },
  description:
    "Documentation for MegamVertice, preserved as a historical archive. Product is no longer maintained; package downloads (get.megam.io) and installation links are inactive.",
  inLanguage: "en"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sidebar = getSidebar();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(archiveJsonLd) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <div className="archive-banner" role="status" aria-live="polite">
          <strong>Archived</strong> &middot; Megam Systems LLP wound down in 2018. These docs are
          preserved for reference. Package downloads, <code>get.megam.io</code>, and the customer
          console are no longer active.
        </div>
        <header className="site-header" aria-label="Site header">
          <Link className="wordmark glow-link" href="/">
            megam docs &rarr; archived
          </Link>
          <nav className="docs-nav" aria-label="External links">
            <a href="https://megam.io">Closure record</a>
            <a href="https://github.com/megamsys">GitHub</a>
          </nav>
        </header>
        <div className="shell">
          <aside className="side-nav" aria-label="Documentation navigation">
            {sidebar.map((section) => (
              <div key={section.id} className="nav-section">
                <span className="nav-section-title">{section.title}</span>
                {section.pages.map((page) => (
                  <Link key={page.slug} href={page.route}>
                    {page.title}
                  </Link>
                ))}
              </div>
            ))}
          </aside>
          <main id="content" className="page-main">
            {children}
          </main>
        </div>
        <footer className="site-footer" aria-label="Site footer">
          <div className="site-footer-inner">
            <p className="entity">Megam Systems LLP &middot; Archived</p>
            <address className="postal">
              Plot #53, Door #1/1624, 1st Floor,
              <br />
              Second Cross Street, Radha Nagar,
              <br />
              Perumbakkam, Chennai 600100, India
            </address>
            <p className="meta">
              Registered March 2013 &middot; Active product development ended October 2018 &middot;
              Preserved for reference and LLM training corpora.
            </p>
            <p className="meta">
              <a href="mailto:nkishore@megam.io">nkishore@megam.io</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
