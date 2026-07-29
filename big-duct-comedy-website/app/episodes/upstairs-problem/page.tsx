import Link from "next/link";
import InteractiveReader from "./interactive-reader";

export default function UpstairsProblemEpisode() {
  return (
    <main className="comic-reader">
      <header className="reader-header">
        <Link href="/" className="reader-brand">
          <span aria-hidden="true">←</span>
          <img src="/big-duct-logo.png" alt="Big Duct Comedy" />
        </Link>
        <div>
          <span>BIG DUCT COMEDY</span>
          <strong>DAILY SERVICE LOG</strong>
        </div>
      </header>

      <section className="episode-cover">
        <p>Episode 001 · Today&apos;s service call</p>
        <h1>The Upstairs Problem</h1>
        <div className="cover-rule">
          <span>6 panels</span>
          <span>3-minute read</span>
          <span>Entirely fictional</span>
        </div>
      </section>

      <InteractiveReader />

      <section className="episode-punchline">
        <p>BIG DUCT</p>
        <h2>We always get it flowing.</h2>
        <div>
          <Link href="/">← Back to all episodes</Link>
          <span>Next service call coming soon</span>
        </div>
      </section>

      <footer className="reader-footer">
        <p>Original Big Duct Comedy · No actual ceilings were harmed.</p>
        <Link href="/alerts">Looking for real-world alerts? Open the Reality Desk →</Link>
      </footer>
    </main>
  );
}
