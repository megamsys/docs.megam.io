import Link from "next/link";
import { getSidebar } from "@/lib/content";

export default function HomePage() {
  const sidebar = getSidebar();

  return (
    <>
      <section className="home-hero">
        <h1>MegamVertice Documentation</h1>
        <p>
          MegamVertice was an open-source platform-as-a-service for deploying virtual machines,
          containers, and custom apps on private and public clouds. Built by{" "}
          <a href="https://megam.io">Megam Systems LLP</a> in Chennai between 2012 and 2018.
        </p>
        <p>
          Active product development ended in October 2018. The package repository at{" "}
          <span className="dead-link">get.megam.io</span> and the customer console are no longer
          available. These docs remain online as a historical record.
        </p>
      </section>

      {sidebar.map((section) => (
        <section key={section.id} className="home-section">
          <h2>{section.title}</h2>
          <ul>
            {section.pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.route}>{page.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
