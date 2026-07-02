import React, { useState } from 'react'
import WeatherApp from './WeatherApp.jsx'

const projects = [
  {
    id: 'ambre',
    icon: '☕',
    title: 'AMBRE',
    tagline: 'Café-Restaurant — site vitrine immersif',
    description:
      'Site single-page haut de gamme avec storytelling piloté par le scroll : tasse 3D interactive, transition "splash" au ralenti, menu filtrable par catégorie.',
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    gradient: 'linear-gradient(135deg, #f59e0b, #78350f)',
    href: 'https://ambre-cafe-site.vercel.app',
    cta: 'Voir le site',
  },
  {
    id: 'roadtorich',
    icon: '💎',
    title: 'RoadToRich',
    tagline: 'Suivi financier gamifié',
    description:
      'Tableau de bord gamifié pour piloter un parcours vers l’indépendance financière : phases, XP, badges, journal de progression.',
    tags: ['React', 'Tailwind'],
    gradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    href: 'https://roadtorich.vercel.app',
    cta: 'Voir le site',
  },
  {
    id: 'meteo',
    icon: '⛅',
    title: 'Météo Core',
    tagline: 'App météo en temps réel',
    description:
      'Recherche météo par ville avec rendu dynamique selon les conditions : icônes, dégradés, humidité, vent, ressenti.',
    tags: ['React', 'OpenWeatherMap API'],
    gradient: 'linear-gradient(135deg, #38bdf8, #312e81)',
    internal: true,
    cta: 'Essayer en direct',
  },
]

function App() {
  const [view, setView] = useState('home')
  const [hovered, setHovered] = useState(null)

  if (view === 'meteo') {
    return <WeatherApp onBack={() => setView('home')} />
  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.orb, top: '-10%', left: '-10%', background: '#38bdf8' }} />
      <div style={{ ...styles.orb, bottom: '-15%', right: '-10%', background: '#818cf8' }} />
      <div style={{ ...styles.orb, top: '45%', right: '15%', background: '#f472b6', width: '260px', height: '260px' }} />

      <main style={styles.container}>
        <header style={styles.header}>
          <p style={styles.eyebrow}>PORTFOLIO</p>
          <h1 style={styles.name}>Walid Kasmi</h1>
          <p style={styles.role}>Développeur Web — interfaces React rapides et soignées</p>
          <p style={styles.bio}>
            Je conçois et code des sites et applications web, du prototype à la mise en ligne :
            animations, interactivité, et attention aux détails.
          </p>
          <div style={styles.contactRow}>
            <a
              href="mailto:walidkasmi125@gmail.com"
              style={styles.contactBtn}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#38bdf8' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            >
              ✉️ walidkasmi125@gmail.com
            </a>
          </div>
        </header>

        <section>
          <h2 style={styles.sectionTitle}>Mes projets</h2>
          <div style={styles.grid}>
            {projects.map((p) => (
              <article
                key={p.id}
                style={{
                  ...styles.card,
                  transform: hovered === p.id ? 'translateY(-4px)' : 'translateY(0)',
                  borderColor: hovered === p.id ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                }}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div style={{ ...styles.iconCircle, background: p.gradient }}>
                  <span style={{ fontSize: '1.8rem' }}>{p.icon}</span>
                </div>
                <h3 style={styles.cardTitle}>{p.title}</h3>
                <p style={styles.cardTagline}>{p.tagline}</p>
                <p style={styles.cardDescription}>{p.description}</p>
                <div style={styles.tagRow}>
                  {p.tags.map((tag) => (
                    <span key={tag} style={styles.tagChip}>{tag}</span>
                  ))}
                </div>
                {p.internal ? (
                  <button onClick={() => setView('meteo')} style={styles.cardCta}>
                    {p.cta} →
                  </button>
                ) : (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" style={styles.cardCta}>
                    {p.cta} →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <footer style={styles.footer}>
          <p>© {new Date().getFullYear()} Walid Kasmi — fait avec React &amp; Vite</p>
        </footer>
      </main>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    background: 'radial-gradient(circle at 20% 20%, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
    color: '#fff',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    position: 'relative',
    overflowX: 'hidden',
  },
  orb: {
    position: 'fixed',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    filter: 'blur(90px)',
    opacity: 0.3,
    pointerEvents: 'none',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '960px',
    margin: '0 auto',
    padding: '80px 24px 40px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  eyebrow: {
    color: '#38bdf8',
    letterSpacing: '3px',
    fontSize: '0.8rem',
    fontWeight: 600,
    marginBottom: '12px',
  },
  name: {
    margin: '0 0 8px',
    fontSize: 'clamp(2.4rem, 6vw, 3.5rem)',
    fontWeight: 800,
    background: 'linear-gradient(90deg, #38bdf8, #818cf8, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  role: {
    color: '#cbd5e1',
    fontSize: '1.15rem',
    margin: '0 0 16px',
    fontWeight: 500,
  },
  bio: {
    color: '#94a3b8',
    fontSize: '1rem',
    maxWidth: '520px',
    margin: '0 auto 28px',
    lineHeight: 1.6,
  },
  contactRow: {
    display: 'flex',
    justifyContent: 'center',
  },
  contactBtn: {
    color: '#e2e8f0',
    textDecoration: 'none',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '999px',
    padding: '10px 20px',
    fontSize: '0.9rem',
    transition: 'border-color 0.2s ease',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: '0 0 32px',
    color: '#f1f5f9',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
    gap: '24px',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '24px',
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    transition: 'transform 0.25s ease, border-color 0.25s ease',
  },
  iconCircle: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '18px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
  },
  cardTitle: {
    margin: '0 0 4px',
    fontSize: '1.3rem',
    fontWeight: 700,
  },
  cardTagline: {
    margin: '0 0 12px',
    color: '#38bdf8',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  cardDescription: {
    margin: '0 0 18px',
    color: '#94a3b8',
    fontSize: '0.92rem',
    lineHeight: 1.6,
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '22px',
  },
  tagChip: {
    fontSize: '0.72rem',
    color: '#cbd5e1',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '999px',
    padding: '4px 10px',
  },
  cardCta: {
    marginTop: 'auto',
    color: '#0f172a',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '12px',
    padding: '10px 18px',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  footer: {
    textAlign: 'center',
    marginTop: '72px',
    color: '#64748b',
    fontSize: '0.85rem',
  },
}

export default App
