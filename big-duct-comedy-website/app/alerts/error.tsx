'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Alerts page error:', error)
  }, [error])

  return (
    <main className="alert-desk">
      <header className="desk-header">
        <Link className="desk-brand" href="/">
          <span className="back-arrow">←</span>
          <img src="/big-duct-logo.png" alt="Big Duct Comedy" />
        </Link>
        <div className="desk-identity">
          <span className="desk-beacon" aria-hidden="true" style={{ background: 'var(--red)' }} />
          <div>
            <strong>REALITY DESK</strong>
            <span>Connection issue</span>
          </div>
        </div>
      </header>

      <section className="desk-hero">
        <div>
          <p className="desk-kicker">Unable to load alerts</p>
          <h1>Something went wrong</h1>
          <p>
            The official alert feeds could not be reached. This may be a temporary
            network issue or a problem with the external data sources.
          </p>
        </div>
        <aside className="desk-status">
          <span className="status-light" style={{ background: 'var(--red)' }} />
          <div>
            <strong>Feed unavailable</strong>
            <span>Try again in a moment</span>
          </div>
        </aside>
      </section>

      <div style={{ 
        padding: '60px 40px',
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          padding: '30px',
          background: 'rgba(216, 34, 34, 0.1)',
          borderRadius: '8px',
          border: '3px solid var(--red)',
        }}>
          <h2 style={{ marginBottom: '16px', color: 'var(--red)' }}>
            ERROR
          </h2>
          <p style={{ marginBottom: '24px', lineHeight: 1.6 }}>
            The Reality Desk requires working connections to the National Weather
            Service and USGS earthquake feeds. Both sources appear unreachable
            right now.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={reset}
              style={{
                padding: '12px 24px',
                background: 'var(--blue)',
                color: 'white',
                border: '3px solid var(--ink)',
                boxShadow: '4px 4px 0 var(--ink)',
                fontWeight: 900,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              style={{
                padding: '12px 24px',
                background: 'white',
                color: 'var(--ink)',
                border: '3px solid var(--ink)',
                boxShadow: '4px 4px 0 var(--ink)',
                fontWeight: 900,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              Back to Comedy
            </Link>
          </div>
        </div>
        
        <p style={{ marginTop: '40px', color: 'var(--muted)', fontSize: '0.9rem' }}>
          If this persists, the official sources may be experiencing downtime.
          Check{' '}
          <a href="https://www.weather.gov/alerts" target="_blank" rel="noreferrer"
            style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
            weather.gov
          </a>{' '}
          or{' '}
          <a href="https://earthquake.usgs.gov/" target="_blank" rel="noreferrer"
            style={{ color: 'var(--blue)', textDecoration: 'underline' }}>
            earthquake.usgs.gov
          </a>{' '}
          directly.
        </p>
      </div>
    </main>
  )
}
