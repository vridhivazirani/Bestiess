import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const TABS = [
  { path: '/',         emoji: '🏠', label: 'Pulse' },
  { path: '/friends',  emoji: '🎀', label: 'Gallery' },
  { path: '/vault',    emoji: '🗂️', label: 'Archive' },
  { path: '/profile',  emoji: '🐰', label: 'My Hub' },
  { path: '/boutique', emoji: '🛍️', label: 'Boutique' },
  { path: '/journal',  emoji: '📓', label: 'Diary' },
]

const DOCK = [
  { path: '/',         icon: '🏠', label: 'Pulse',    bg: '#FFE0E0' },
  { path: '/friends',  icon: '🎀', label: 'Gallery',  bg: '#FFE0F0' },
  { path: '/vault',    icon: '🗂️', label: 'Archive',  bg: '#E8E0FF' },
  { path: '/profile',  icon: '🐰', label: 'My Hub',   bg: '#E0F0FF' },
  { path: '/boutique', icon: '🛍️', label: 'Boutique', bg: '#FFE8D0' },
  { path: '/journal',  icon: '📓', label: 'Diary',    bg: '#D8FFE8' },
]

function Clock() {
  const [t, setT] = useState(new Date())
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i) }, [])
  return t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

const Layout = ({ children }) => {
  const loc = useLocation()

  return (
    <div className="desktop">
      {/* Skip to main content for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Floating doodles */}
      <span className="doodle d1" aria-hidden="true">🌸</span>
      <span className="doodle d2" aria-hidden="true">⭐</span>
      <span className="doodle d3" aria-hidden="true">☁️</span>
      <span className="doodle d4" aria-hidden="true">🍭</span>
      <span className="doodle d5" aria-hidden="true">💫</span>
      <span className="doodle d6" aria-hidden="true">🌷</span>
      <span className="doodle d7" aria-hidden="true">🎀</span>
      <span className="doodle d8" aria-hidden="true">✨</span>
      <span className="doodle d9" aria-hidden="true">💖</span>
      <span className="doodle d10" aria-hidden="true">🧸</span>

      {/* Menu bar */}
      <header className="topbar" role="banner">
        <div className="topbar-brand">🌟 Bestiess</div>
        <div className="topbar-right">
          <span aria-label="Favorites">♥</span>
          <span aria-label="Messages">✉️</span>
          <span aria-label="Current time"><Clock /></span>
          <div className="topbar-ava">
            <img src="https://api.dicebear.com/9.x/lorelei/svg?seed=KawaiiGirl" alt="Profile avatar" />
          </div>
        </div>
      </header>

      {/* Notebook window */}
      <div className="main-area">
        <div className="notebook">
          {/* Browser-style tabs */}
          <nav className="tab-bar" role="tablist" aria-label="Main navigation">
            {TABS.map(t => (
              <Link
                key={t.path}
                to={t.path}
                className={`tab${loc.pathname === t.path ? ' active' : ''}`}
                role="tab"
                aria-selected={loc.pathname === t.path}
                aria-label={t.label}
              >
                <span aria-hidden="true">{t.emoji}</span> {t.label}
              </Link>
            ))}
          </nav>

          {/* Content */}
          <main id="main-content" className="notebook-body" role="main">
            {children}
          </main>
        </div>
      </div>

      {/* Dock */}
      <nav className="dock" role="navigation" aria-label="Quick navigation">
        <div className="dock-shelf">
          {DOCK.map((d, i) => (
            <React.Fragment key={d.path}>
              {i === 3 && <div className="dock-div" aria-hidden="true" />}
              <Link to={d.path} className={`dock-btn${loc.pathname === d.path ? ' active' : ''}`} aria-label={d.label}>
                <div className="dock-face" style={{ background: d.bg }} aria-hidden="true">{d.icon}</div>
                <span className="dock-name">{d.label}</span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* Mascot */}
      <div className="mascot" aria-hidden="true">
        <div className="mascot-body">
          🐰
          <span className="mascot-lbl">heehee~</span>
        </div>
      </div>
    </div>
  )
}

export default Layout
