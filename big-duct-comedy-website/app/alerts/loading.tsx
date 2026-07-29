export default function Loading() {
  return (
    <main className="alert-desk">
      <header className="desk-header">
        <div className="desk-brand">
          <span className="back-arrow">←</span>
          <img src="/big-duct-logo.png" alt="Big Duct Comedy" />
        </div>
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
          <h1>Loading current alerts...</h1>
          <p>
            Checking official sources for weather warnings and earthquake data.
          </p>
        </div>
        <aside className="desk-status">
          <span className="status-light" style={{ opacity: 0.5 }} />
          <div>
            <strong>Checking feeds</strong>
            <span>Please wait...</span>
          </div>
        </aside>
      </section>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.2rem',
        color: 'var(--muted)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            border: '4px solid var(--blue)', 
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p>Fetching official alerts...</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
