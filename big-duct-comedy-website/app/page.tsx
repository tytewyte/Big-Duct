import Link from "next/link";

const episodes = [
  {
    number: "003",
    title: "Measure Twice",
    image: "/comic-measure-twice.png",
    alt: "Big Duct technicians always measure twice before sliding it in",
    color: "blue",
  },
  {
    number: "002",
    title: "The Equipment",
    image: "/comic-equipment.png",
    alt: "Some guys have the equipment. Big Duct knows how to use it",
    color: "orange",
  },
];

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Big Duct Comedy",
    "description": "Original blue-collar comedy with daily service call stories",
    "url": "https://bigductcomedy.com",
    "publisher": {
      "@type": "Organization",
      "name": "Big Duct Comedy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bigductcomedy.com/big-duct-logo.png"
      }
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Big Duct Comedy home">
          <img src="/big-duct-logo.png" alt="Big Duct" />
          <span>COMEDY</span>
        </Link>

        <nav aria-label="Main navigation">
          <a href="#episodes">Episodes</a>
          <a href="#about">The Crew</a>
          <Link className="alert-button" href="/alerts">
            <span className="pulse" aria-hidden="true" />
            Real-World Alerts
          </Link>
        </nav>
      </header>

      <section className="comic-hero">
        <div className="halftone halftone-one" />
        <div className="hero-copy">
          <p className="eyebrow">Original blue-collar comedy · Episode 004</p>
          <h1>
            A new Big Duct
            <span>story every day.</span>
          </h1>
          <p className="hero-intro">
            Follow the Big Duct crew through service calls, bad decisions and
            the kind of jobs nobody warned them about.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/episodes/upstairs-problem">
              Read today&apos;s episode
            </Link>
            <Link className="news-link" href="/alerts">
              Something real happening? Check the alert desk →
            </Link>
          </div>
          <div className="trust-strip">
            <strong>COMEDY STAYS COMEDY.</strong>
            <span>Real alerts are sourced, dated and clearly separated.</span>
          </div>
        </div>

        <Link
          className="featured-comic"
          id="today"
          href="/episodes/upstairs-problem"
          aria-label="Read The Upstairs Problem"
        >
          <div className="issue-tab">TODAY&apos;S STORY</div>
          <img
            src="/comic-upstairs-hot.png"
            alt="She said her upstairs was hot, so I brought the Big Duct"
          />
          <div className="comic-shadow" aria-hidden="true" />
        </Link>
      </section>

      <section className="episodes-section" id="episodes">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the service log</p>
            <h2>Previous episodes</h2>
          </div>
          <p>
            One crew. Endless trades. Every episode is fictional comedy—not a
            real emergency report.
          </p>
        </div>

        <div className="episode-grid">
          {episodes.map((episode) => (
            <article className={`episode-card ${episode.color}`} key={episode.number}>
              <div className="episode-meta">
                <span>ISSUE #{episode.number}</span>
                <span>BIG DUCT FILES</span>
              </div>
              <img src={episode.image} alt={episode.alt} />
              <div className="episode-title">
                <h3>{episode.title}</h3>
                <span aria-hidden="true">→</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section" id="about">
        <div className="crew-panel">
          <p className="eyebrow">Meet the crew</p>
          <h2>Big problems call for a bigger duct.</h2>
          <p>
            The same two characters take on HVAC, fishing, plumbing, trucking
            and whatever job they probably should have turned down.
          </p>
        </div>
        <div className="reality-panel">
          <p className="eyebrow">No made-up emergencies</p>
          <h2>Before you share it, check it.</h2>
          <p>
            The Reality Desk is being built to separate current official
            warnings from recycled clips, rumors and unconfirmed claims.
          </p>
          <Link className="dark-button" href="/alerts">
            Open the Real-World Alert Desk
          </Link>
        </div>
      </section>

      <footer>
        <img src="/big-duct-logo.png" alt="" />
        <p>Original comedy. Real alerts stay real.</p>
        <p>© 2026 Big Duct Comedy</p>
      </footer>
    </main>
  );
}
