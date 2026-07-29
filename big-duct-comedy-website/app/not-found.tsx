import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper)' }}>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ 
          fontSize: 'clamp(6rem, 12vw, 12rem)', 
          margin: '0 0 20px',
          fontFamily: 'Impact, sans-serif',
          color: 'var(--blue)',
          textShadow: '6px 6px 0 rgba(8, 103, 232, 0.2)',
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: 'clamp(1.8rem, 4vw, 3rem)', 
          margin: '0 0 16px',
          fontFamily: 'Impact, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '0.02em'
        }}>
          That duct don&apos;t connect
        </h2>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '32px', 
          color: 'var(--muted)',
          maxWidth: '500px',
          lineHeight: 1.6
        }}>
          The page you&apos;re looking for has gone missing, like a vent cap in a windstorm.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            href="/"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'var(--blue)',
              color: 'white',
              border: '3px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--ink)',
              fontWeight: 900,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              transition: 'all 0.2s',
            }}
          >
            Back to Home
          </Link>
          <Link 
            href="/alerts"
            style={{
              display: 'inline-block',
              padding: '16px 32px',
              background: 'var(--red)',
              color: 'white',
              border: '3px solid var(--ink)',
              boxShadow: '4px 4px 0 var(--ink)',
              fontWeight: 900,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}
          >
            Check Real Alerts
          </Link>
        </div>
        <img 
          src="/big-duct-logo.png" 
          alt="Big Duct Comedy" 
          style={{ 
            marginTop: '60px', 
            width: '200px',
            opacity: 0.6
          }}
        />
      </div>
    </main>
  )
}
