import Link from "next/link";

export default function NotFound() {
  return (
    <article className="content-page">
      <h1>404 — Page Archived or Moved</h1>
      <p>
        This page is not available. The Megam docs were reorganized when this site was archived;
        some old URLs no longer resolve. Try the{" "}
        <Link href="/">documentation index</Link>.
      </p>
    </article>
  );
}
