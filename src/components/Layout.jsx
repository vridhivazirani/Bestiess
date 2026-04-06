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
      {/* Floating doodles */}
      <span className="doodle d1">🌸</span>
      <span className="doodle d2">⭐</span>
      <span className="doodle d3">☁️</span>
      <span className="doodle d4">🍭</span>
      <span className="doodle d5">💫</span>
      <span className="doodle d6">🌷</span>
      <span className="doodle d7">🎀</span>
      <span className="doodle d8">✨</span>
      <span className="doodle d9">💖</span>
      <span className="doodle d10">🧸</span>

      {/* Menu bar */}
      <div className="topbar">
        <div className="topbar-brand">🌟 Bestiess</div>
        <div className="topbar-right">
          <span>♥</span>
          <span>✉️</span>
          <span><Clock /></span>
          <div className="topbar-ava">
            <img src="https://api.dicebear.com/9.x/lorelei/svg?seed=KawaiiGirl" alt="Me" />
          </div>
        </div>
      </div>

      {/* Notebook window */}
      <div className="main-area">
        <div className="notebook">
          {/* Browser-style tabs */}
          <div className="tab-bar">
            {TABS.map(t => (
              <Link
                key={t.path}
                to={t.path}
                className={`tab${loc.pathname === t.path ? ' active' : ''}`}
              >
                {t.emoji} {t.label}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="notebook-body">
            {children}
          </div>
        </div>
      </div>

      {/* Dock */}
      <div className="dock">
        <div className="dock-shelf">
          {DOCK.map((d, i) => (
            <React.Fragment key={d.path}>
              {i === 3 && <div className="dock-div" />}
              <Link to={d.path} className={`dock-btn${loc.pathname === d.path ? ' active' : ''}`}>
                <div className="dock-face" style={{ background: d.bg }}>{d.icon}</div>
                <span className="dock-name">{d.label}</span>
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Mascot */}
      <div className="mascot">
        <div className="mascot-body">
          🐰
          <span className="mascot-lbl">heehee~</span>
        </div>
      </div>
    </div>
  )
}

export default Layout
