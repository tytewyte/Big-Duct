import Link from "next/link";

type NwsFeature = {
  id: string;
  properties: {
    event?: string;
    headline?: string;
    severity?: string;
    certainty?: string;
    areaDesc?: string;
    sent?: string;
    ends?: string;
    web?: string;
  };
};

type QuakeFeature = {
  id: string;
  properties: {
    mag?: number;
    place?: string;
    time?: number;
    updated?: number;
    url?: string;
    status?: string;
  };
};

async function getOfficialAlerts() {
  const weatherRequest = fetch(
    "https://api.weather.gov/alerts/active?status=actual&message_type=alert",
    {
      headers: {
        Accept: "application/geo+json",
        "User-Agent": "BigDuctRealityDesk/0.1",
      },
      cache: "no-store",
      signal: AbortSignal.timeout(4500),
    },
  ).then((response) => {
    if (!response.ok) throw new Error("NWS unavailable");
    return response.json() as Promise<{ features?: NwsFeature[] }>;
  });

  const quakeRequest = fetch(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson",
    { cache: "no-store", signal: AbortSignal.timeout(4500) },
  ).then((response) => {
    if (!response.ok) throw new Error("USGS unavailable");
    return response.json() as Promise<{ features?: QuakeFeature[] }>;
  });

  const [weatherResult, quakeResult] = await Promise.allSettled([
    weatherRequest,
    quakeRequest,
  ]);

  const weather =
    weatherResult.status === "fulfilled"
      ? (weatherResult.value.features ?? [])
          .filter((item) =>
            ["Extreme", "Severe"].includes(item.properties.severity ?? ""),
          )
          .sort(
            (a, b) =>
              new Date(b.properties.sent ?? 0).getTime() -
              new Date(a.properties.sent ?? 0).getTime(),
          )
          .slice(0, 6)
      : [];

  const quakes =
    quakeResult.status === "fulfilled"
      ? (quakeResult.value.features ?? []).slice(0, 6)
      : [];

  return {
    weather,
    quakes,
    weatherAvailable: weatherResult.status === "fulfilled",
    quakesAvailable: quakeResult.status === "fulfilled",
  };
}

function formatTime(value?: string | number) {
  if (!value) return "Time unavailable";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

export default async function AlertsPage() {
  const alerts = await getOfficialAlerts();
  const refreshedAt = formatTime(Date.now());

  return (
    <main className="alert-desk">
      <header className="desk-header">
        <Link className="desk-brand" href="/">
          <span className="back-arrow">←</span>
          <img src="/big-duct-logo.png" alt="Big Duct Comedy" />
        </Link>
        <div className="desk-identity">
          <span className="desk-beacon" aria-hidden="true" />
          <div>
            <strong>REALITY DESK</strong>
            <span>Official information first</span>
          </div>
        </div>
      </header>

      <section className="desk-hero">
        <div>
          <p className="desk-kicker">Live source check</p>
          <h1>What is actually happening right now?</h1>
          <p>
            Current official warnings are separated from developing reports,
            recycled videos and claims that have not been confirmed.
          </p>
        </div>
        <aside className="desk-status">
          <span className="status-light" />
          <div>
            <strong>Official feeds checked</strong>
            <span>Refreshed {refreshedAt}</span>
          </div>
        </aside>
      </section>

      <section className="verification-key" aria-label="Verification status key">
        <div>
          <span className="key-dot confirmed" />
          <strong>CONFIRMED</strong>
          <p>Published by the responsible official agency.</p>
        </div>
        <div>
          <span className="key-dot developing" />
          <strong>DEVELOPING</strong>
          <p>Credible reporting exists, but important facts may change.</p>
        </div>
        <div>
          <span className="key-dot unverified" />
          <strong>UNVERIFIED</strong>
          <p>No dependable primary confirmation has been located.</p>
        </div>
      </section>

      <section className="feed-section">
        <div className="feed-heading">
          <div>
            <p className="desk-kicker">United States</p>
            <h2>Severe weather warnings</h2>
          </div>
          <a
            href="https://www.weather.gov/alerts"
            target="_blank"
            rel="noreferrer"
          >
            National Weather Service ↗
          </a>
        </div>

        {!alerts.weatherAvailable ? (
          <div className="feed-notice">
            The official weather feed could not be reached during this update.
            No substitute or guessed information is being shown.
          </div>
        ) : alerts.weather.length === 0 ? (
          <div className="feed-notice">
            No Extreme or Severe NWS warnings were returned during this update.
          </div>
        ) : (
          <div className="alert-list">
            {alerts.weather.map((alert) => (
              <article className="alert-card" key={alert.id}>
                <div className="alert-card-top">
                  <span className="official-badge">CONFIRMED · NWS</span>
                  <span>{formatTime(alert.properties.sent)}</span>
                </div>
                <h3>{alert.properties.event ?? "Weather alert"}</h3>
                <p className="alert-location">
                  {alert.properties.areaDesc ?? "Location not provided"}
                </p>
                <p>
                  {alert.properties.headline ??
                    "Open the official alert for complete instructions."}
                </p>
                {alert.properties.web ? (
                  <a
                    href={alert.properties.web}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the official warning ↗
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="feed-section dark-feed">
        <div className="feed-heading">
          <div>
            <p className="desk-kicker">Worldwide · Past 24 hours</p>
            <h2>Magnitude 4.5+ earthquakes</h2>
          </div>
          <a
            href="https://earthquake.usgs.gov/earthquakes/map/"
            target="_blank"
            rel="noreferrer"
          >
            U.S. Geological Survey ↗
          </a>
        </div>

        {!alerts.quakesAvailable ? (
          <div className="feed-notice dark-notice">
            The official earthquake feed could not be reached during this
            update. No substitute data is being shown.
          </div>
        ) : alerts.quakes.length === 0 ? (
          <div className="feed-notice dark-notice">
            No magnitude 4.5+ earthquakes were returned during this update.
          </div>
        ) : (
          <div className="quake-grid">
            {alerts.quakes.map((quake) => (
              <article className="quake-card" key={quake.id}>
                <div className="magnitude">
                  M {quake.properties.mag?.toFixed(1) ?? "—"}
                </div>
                <div>
                  <span className="official-badge usgs">
                    CONFIRMED · USGS
                  </span>
                  <h3>{quake.properties.place ?? "Location unavailable"}</h3>
                  <p>Occurred {formatTime(quake.properties.time)}</p>
                  {quake.properties.url ? (
                    <a
                      href={quake.properties.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open official event ↗
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="repost-section">
        <div className="repost-copy">
          <p className="desk-kicker">The harder problem</p>
          <h2>A new upload date does not make an old video new.</h2>
          <p>
            A trustworthy repost detector needs more than an AI opinion. It
            must compare frames, search for earlier copies, examine metadata,
            identify the claimed place and time, and check the event against
            primary sources.
          </p>
        </div>
        <div className="check-stack">
          <div>
            <span>01</span>
            <p>
              <strong>Find the earliest known copy</strong>
              Compare matching frames and captions across sources.
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <strong>Check time and place</strong>
              Test landmarks, weather, daylight and stated location.
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              <strong>Demand primary confirmation</strong>
              Match the claim to an agency, local authority or direct record.
            </p>
          </div>
          <div className="next-build">
            <span>NEXT BUILD</span>
            <p>
              Paste-a-link repost scanning. It will not be labeled working
              until it can show its evidence.
            </p>
          </div>
        </div>
      </section>

      <section className="source-wall">
        <div>
          <p className="desk-kicker">Coverage being added</p>
          <h2>One board, multiple primary sources.</h2>
        </div>
        <div className="source-grid">
          <a href="https://www.fema.gov/emergency-managers/practitioners/integrated-public-alert-warning-system" target="_blank" rel="noreferrer">
            <strong>FEMA / IPAWS</strong>
            <span>Public emergency warnings ↗</span>
          </a>
          <a href="https://www.nifc.gov/fire-information" target="_blank" rel="noreferrer">
            <strong>NIFC</strong>
            <span>Wildland fires ↗</span>
          </a>
          <a href="https://www.gdacs.org/" target="_blank" rel="noreferrer">
            <strong>GDACS</strong>
            <span>Global disaster alerts ↗</span>
          </a>
          <a href="https://www.aaro.mil/" target="_blank" rel="noreferrer">
            <strong>AARO</strong>
            <span>Official UAP records ↗</span>
          </a>
        </div>
      </section>

      <section className="safety-note">
        <strong>Important:</strong>
        <p>
          This site is an information organizer, not an emergency service. If
          you are in immediate danger, call 911 and follow local authorities,
          Wireless Emergency Alerts and emergency broadcasters.
        </p>
      </section>

      <footer className="desk-footer">
        <Link href="/">← Return to Big Duct Comedy</Link>
        <p>No manufactured stories. No old clips presented as new.</p>
      </footer>
    </main>
  );
}
