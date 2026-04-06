import React, { useState, useEffect, useRef } from 'react'

const THEMES = [
  { id: 'kawaii', label: 'Kawaii Pink 🌸', accent: '#F8A4B8', bg: '#FFE8EC' },
  { id: 'lavender', label: 'Lavender Dream 💜', accent: '#B48AD8', bg: '#F0E8FF' },
  { id: 'mint', label: 'Minty Fresh 🍃', accent: '#6BC4A0', bg: '#E0FFF0' },
  { id: 'sunset', label: 'Sunset Glow 🌅', accent: '#E8926A', bg: '#FFF0E8' },
]

const PRIVACY = ['Public 🌍', 'Friends Only 🔒', 'Private 🔐']

export default function QuickSettings() {
  // ─── Real-time clock ───
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // ─── Online status ───
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  // ─── Theme ───
  const [themeIdx, setThemeIdx] = useState(() => {
    const saved = localStorage.getItem('bestiess-theme')
    return saved ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('bestiess-theme', themeIdx)
    const t = THEMES[themeIdx]
    document.documentElement.style.setProperty('--pink', t.accent)
    document.documentElement.style.setProperty('--heart', t.accent)
    document.body.style.background = t.bg
  }, [themeIdx])

  const cycleTheme = () => setThemeIdx(i => (i + 1) % THEMES.length)

  // ─── Privacy ───
  const [privIdx, setPrivIdx] = useState(() => {
    const saved = localStorage.getItem('bestiess-privacy')
    return saved ? parseInt(saved, 10) : 1
  })

  useEffect(() => { localStorage.setItem('bestiess-privacy', privIdx) }, [privIdx])
  const cyclePrivacy = () => setPrivIdx(i => (i + 1) % PRIVACY.length)

  // ─── Notifications ───
  const [notifs, setNotifs] = useState(() => localStorage.getItem('bestiess-notifs') !== 'off')
  useEffect(() => { localStorage.setItem('bestiess-notifs', notifs ? 'on' : 'off') }, [notifs])

  // ─── DND mode ───
  const [dnd, setDnd] = useState(() => localStorage.getItem('bestiess-dnd') === 'on')
  useEffect(() => { localStorage.setItem('bestiess-dnd', dnd ? 'on' : 'off') }, [dnd])

  // ─── Display name ───
  const [name, setName] = useState(() => localStorage.getItem('bestiess-name') || 'Vridhi Vazirani')
  const [editing, setEditing] = useState(false)
  const inputRef = useRef()
  useEffect(() => { localStorage.setItem('bestiess-name', name) }, [name])
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus() }, [editing])

  // ─── Status message ───
  const [status, setStatus] = useState(() => localStorage.getItem('bestiess-status') || '✨ Building cute things!')
  const [editingStatus, setEditingStatus] = useState(false)
  const statusRef = useRef()
  useEffect(() => { localStorage.setItem('bestiess-status', status) }, [status])
  useEffect(() => { if (editingStatus && statusRef.current) statusRef.current.focus() }, [editingStatus])

  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  return (
    <div className="qs-panel">
      <div className="kawaii-header" style={{ fontSize: '1rem', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
        ⚙️ Quick Settings
        <span className={`qs-dot ${online ? 'qs-online' : 'qs-offline'}`} />
        <span className="qs-status-tag">{online ? 'Online' : 'Offline'}</span>
      </div>

      {/* Live Clock */}
      <div className="qs-clock-row">
        <div className="qs-clock">{timeStr}</div>
        <div className="qs-date">{dateStr}</div>
      </div>

      {/* Display Name */}
      <div className="qs-row">
        <span className="qs-label">Display Name</span>
        {editing ? (
          <input
            ref={inputRef}
            className="qs-input"
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={e => e.key === 'Enter' && setEditing(false)}
            maxLength={30}
          />
        ) : (
          <button className="qs-val-btn" onClick={() => setEditing(true)}>
            {name} ✏️
          </button>
        )}
      </div>

      {/* Status */}
      <div className="qs-row">
        <span className="qs-label">Status</span>
        {editingStatus ? (
          <input
            ref={statusRef}
            className="qs-input"
            value={status}
            onChange={e => setStatus(e.target.value)}
            onBlur={() => setEditingStatus(false)}
            onKeyDown={e => e.key === 'Enter' && setEditingStatus(false)}
            maxLength={50}
          />
        ) : (
          <button className="qs-val-btn" onClick={() => setEditingStatus(true)}>
            {status} ✏️
          </button>
        )}
      </div>

      {/* Theme */}
      <div className="qs-row">
        <span className="qs-label">Theme</span>
        <button className="pill pill-pink qs-cycle" onClick={cycleTheme} style={{ cursor: 'pointer', fontSize: '0.75rem' }}>
          {THEMES[themeIdx].label}
        </button>
      </div>

      {/* Privacy */}
      <div className="qs-row">
        <span className="qs-label">Privacy</span>
        <button className="pill pill-blue qs-cycle" onClick={cyclePrivacy} style={{ cursor: 'pointer', fontSize: '0.75rem' }}>
          {PRIVACY[privIdx]}
        </button>
      </div>

      {/* Toggles */}
      <div className="qs-toggles">
        <div className="qs-toggle-row">
          <span className="qs-label">🔔 Notifications</span>
          <button className={`qs-switch ${notifs ? 'on' : ''}`} onClick={() => setNotifs(n => !n)}>
            <span className="qs-knob" />
          </button>
        </div>
        <div className="qs-toggle-row">
          <span className="qs-label">🌙 Do Not Disturb</span>
          <button className={`qs-switch ${dnd ? 'on' : ''}`} onClick={() => setDnd(d => !d)}>
            <span className="qs-knob" />
          </button>
        </div>
      </div>

      {/* Quick links */}
      <div className="qs-quick-links">
        <span className="qs-label" style={{ marginBottom: 6, display: 'block' }}>Quick Actions</span>
        <div className="qs-btn-row">
          <button className="qs-action" onClick={() => { localStorage.clear(); window.location.reload() }}>
            🗑️ Reset All
          </button>
          <button className="qs-action" onClick={() => {
            const data = {
              theme: themeIdx,
              privacy: privIdx,
              notifs,
              dnd,
              name,
              status,
            }
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'bestiess-settings.json'
            a.click()
            URL.revokeObjectURL(url)
          }}>
            💾 Export
          </button>
          <label className="qs-action" style={{ cursor: 'pointer' }}>
            📂 Import
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = ev => {
                  try {
                    const d = JSON.parse(ev.target.result)
                    if (d.theme !== undefined) setThemeIdx(d.theme)
                    if (d.privacy !== undefined) setPrivIdx(d.privacy)
                    if (d.notifs !== undefined) setNotifs(d.notifs)
                    if (d.dnd !== undefined) setDnd(d.dnd)
                    if (d.name) setName(d.name)
                    if (d.status) setStatus(d.status)
                  } catch { /* ignore bad files */ }
                }
                reader.readAsText(file)
              }}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
