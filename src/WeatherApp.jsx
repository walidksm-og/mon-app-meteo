import React, { useState, useEffect } from 'react'

function WeatherApp({ onBack }) {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const apiKey = 'f167491458fe305bdeb6673c174a6ddf'

  const quickCities = ['Aix-en-Provence', 'Paris', 'Monaco', 'Tokyo', 'New York']

  const fetchWeather = async (cityName) => {
    if (!cityName) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}&lang=fr`
      )

      if (!response.ok) {
        throw new Error('Ville introuvable ou problème de connexion')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setWeather(null)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  // Choix d'une icône / couleur en fonction du code météo
  const getWeatherVisual = (code) => {
    if (!code) return { icon: '🌍', gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)' }
    if (code >= 200 && code < 300) return { icon: '⛈️', gradient: 'linear-gradient(135deg, #6366f1, #312e81)' }
    if (code >= 300 && code < 600) return { icon: '🌧️', gradient: 'linear-gradient(135deg, #38bdf8, #1e40af)' }
    if (code >= 600 && code < 700) return { icon: '❄️', gradient: 'linear-gradient(135deg, #a5f3fc, #38bdf8)' }
    if (code >= 700 && code < 800) return { icon: '🌫️', gradient: 'linear-gradient(135deg, #94a3b8, #475569)' }
    if (code === 800) return { icon: '☀️', gradient: 'linear-gradient(135deg, #fbbf24, #f97316)' }
    if (code > 800) return { icon: '⛅', gradient: 'linear-gradient(135deg, #818cf8, #38bdf8)' }
    return { icon: '🌍', gradient: 'linear-gradient(135deg, #38bdf8, #818cf8)' }
  }

  const visual = weather ? getWeatherVisual(weather.weather[0].id) : getWeatherVisual(null)

  return (
    <div style={styles.page}>
      {/* Orbes lumineuses animées en fond */}
      <div style={{ ...styles.orb, top: '-10%', left: '-10%', background: '#38bdf8', animationDelay: '0s' }} />
      <div style={{ ...styles.orb, bottom: '-15%', right: '-10%', background: '#818cf8', animationDelay: '2s' }} />
      <div style={{ ...styles.orb, top: '40%', right: '20%', background: '#f472b6', width: '250px', height: '250px', animationDelay: '4s' }} />

      {onBack && (
        <button
          onClick={onBack}
          style={styles.backBtn}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.7' }}
        >
          ← Retour au portfolio
        </button>
      )}

      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={{ ...styles.pulseDot, background: loading ? '#fbbf24' : '#34d399' }} />
          <h2 style={styles.title}>METEO CORE</h2>
        </div>
        <p style={styles.subtitle}>Système d'analyse climatique en temps réel</p>

        <div style={styles.quickRow}>
          {quickCities.map((item) => (
            <button
              key={item}
              onClick={() => { setCity(item); fetchWeather(item) }}
              style={{
                ...styles.quickBtn,
                ...(city === item ? styles.quickBtnActive : {})
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(56, 189, 248, 0.2)'
                e.currentTarget.style.borderColor = '#38bdf8'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = city === item ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.08)'
                e.currentTarget.style.borderColor = city === item ? '#38bdf8' : 'rgba(255, 255, 255, 0.1)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Rechercher une autre ville..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
            onFocus={(e) => {
              e.target.style.borderColor = '#818cf8'
              e.target.style.boxShadow = '0 0 0 3px rgba(129, 140, 248, 0.2)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
              e.target.style.boxShadow = 'none'
            }}
          />
          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span style={styles.spinner} />
            ) : (
              '🔍'
            )}
          </button>
        </form>

        {error && (
          <div style={styles.errorBox}>
            🚨 {error}
          </div>
        )}

        {weather && !error && (
          <div key={weather.name} style={styles.resultBox}>
            <h3 style={styles.cityName}>
              {weather.name} <span style={styles.countryTag}>{weather.sys.country}</span>
            </h3>

            <div style={{
              ...styles.iconCircle,
              background: visual.gradient,
            }}>
              <span style={styles.weatherIcon}>{visual.icon}</span>
            </div>

            <div style={styles.temp}>
              {Math.round(weather.main.temp)}°
            </div>

            <p style={styles.description}>
              ✨ {weather.weather[0].description}
            </p>

            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Humidité</span>
                <span style={styles.statValue}>{weather.main.humidity}%</span>
              </div>
              <div style={styles.divider} />
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Vent</span>
                <span style={styles.statValue}>{Math.round(weather.wind.speed * 3.6)} km/h</span>
              </div>
              <div style={styles.divider} />
              <div style={styles.statItem}>
                <span style={styles.statLabel}>Ressenti</span>
                <span style={styles.statValue}>{Math.round(weather.main.feels_like)}°</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.6); }
          50% { opacity: 0.7; box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #64748b; }
      `}</style>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'radial-gradient(circle at 20% 20%, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
    color: '#fff',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '20px',
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden'
  },
  backBtn: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: '#e2e8f0',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    opacity: 0.7,
    transition: 'opacity 0.2s ease',
    zIndex: 2
  },
  orb: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    borderRadius: '50%',
    filter: 'blur(90px)',
    opacity: 0.35,
    animation: 'float 12s ease-in-out infinite'
  },
  card: {
    width: '100%',
    maxWidth: '480px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '35px',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '10px'
  },
  pulseDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  },
  title: {
    margin: 0,
    fontWeight: '700',
    letterSpacing: '2px',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8, #f472b6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '1.6rem'
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    margin: '0 0 25px 0'
  },
  quickRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '25px'
  },
  quickBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#e2e8f0',
    padding: '6px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.25s ease'
  },
  quickBtnActive: {
    background: 'rgba(56, 189, 248, 0.2)',
    borderColor: '#38bdf8'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px'
  },
  input: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '14px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    background: 'rgba(0, 0, 0, 0.25)',
    color: '#fff',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.25s ease'
  },
  submitBtn: {
    width: '54px',
    padding: '14px',
    borderRadius: '14px',
    border: 'none',
    background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1.1rem',
    boxShadow: '0 4px 16px rgba(56, 189, 248, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.4)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite'
  },
  errorBox: {
    color: '#f87171',
    background: 'rgba(248, 113, 113, 0.1)',
    border: '1px solid rgba(248, 113, 113, 0.3)',
    padding: '12px',
    borderRadius: '12px',
    fontSize: '0.9rem'
  },
  resultBox: {
    marginTop: '10px',
    animation: 'fadeInUp 0.5s ease-out'
  },
  cityName: {
    margin: '0 0 15px 0',
    fontSize: '1.6rem',
    fontWeight: '600'
  },
  countryTag: {
    fontSize: '1rem',
    color: '#38bdf8',
    fontWeight: '400'
  },
  iconCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px auto',
    boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
  },
  weatherIcon: {
    fontSize: '2.8rem'
  },
  temp: {
    fontSize: '4.5rem',
    fontWeight: '800',
    margin: '5px 0',
    background: 'linear-gradient(180deg, #fff 0%, #cbd5e1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-2px'
  },
  description: {
    textTransform: 'uppercase',
    color: '#38bdf8',
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '0.85rem',
    margin: '0 0 30px 0'
  },
  statsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    padding: '15px 20px',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.05)'
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  statLabel: {
    color: '#64748b',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    marginBottom: '4px'
  },
  statValue: {
    fontWeight: '600',
    fontSize: '1.1rem'
  },
  divider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255, 255, 255, 0.1)'
  }
}

export default WeatherApp