import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'

const THEMES = [
  { id: 'kawaii', label: 'Kawaii Pink 🌸', accent: '#F8A4B8', bg: '#FFE8EC' },
  { id: 'lavender', label: 'Lavender Dream 💜', accent: '#B48AD8', bg: '#F0E8FF' },
  { id: 'mint', label: 'Minty Fresh 🍃', accent: '#6BC4A0', bg: '#E0FFF0' },
  { id: 'sunset', label: 'Sunset Glow 🌅', accent: '#E8926A', bg: '#FFF0E8' },
]

const PRIVACY = ['Public 🌍', 'Friends Only 🔒', 'Private 🔐']

export default function QuickSettings() {
  const { userData, updateProfile } = useAuth();
  
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

  // If no userData loaded yet, render a skeleton
  if (!userData || !userData.settings) return <div className="qs-panel"><p>Loading settings...</p></div>;

  const { theme, privacy, notifs, dnd } = userData.settings;

  // Apply theme dynamically
  useEffect(() => {
    const t = THEMES[theme] || THEMES[0]
    document.documentElement.style.setProperty('--pink', t.accent)
    document.documentElement.style.setProperty('--heart', t.accent)
    document.body.style.background = t.bg
  }, [theme])

  const cycleTheme = () => updateProfile({ settings: { ...userData.settings, theme: (theme + 1) % THEMES.length } })
  const cyclePrivacy = () => updateProfile({ settings: { ...userData.settings, privacy: (privacy + 1) % PRIVACY.length } })
  const toggleNotifs = () => updateProfile({ settings: { ...userData.settings, notifs: !notifs } })
  const toggleDnd = () => updateProfile({ settings: { ...userData.settings, dnd: !dnd } })

  // ─── Display name ───
  const [name, setName] = useState(userData.displayName || '')
  const [editing, setEditing] = useState(false)
  const inputRef = useRef()
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus() }, [editing])

  const saveName = () => {
    setEditing(false);
    if (name.trim() !== userData.displayName) {
      updateProfile({ displayName: name.trim() });
    }
  }

  // ─── Status/Bio message ───
  const [bio, setBio] = useState(userData.bio || '')
  const [editingBio, setEditingBio] = useState(false)
  const bioRef = useRef()
  useEffect(() => { if (editingBio && bioRef.current) bioRef.current.focus() }, [editingBio])

  const saveBio = () => {
    setEditingBio(false);
    if (bio.trim() !== userData.bio) {
      updateProfile({ bio: bio.trim() });
    }
  }

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
            onBlur={saveName}
            onKeyDown={e => e.key === 'Enter' && saveName()}
            maxLength={30}
          />
        ) : (
          <button className="qs-val-btn" onClick={() => setEditing(true)} aria-label="Edit display name">
            {userData.displayName} ✏️
          </button>
        )}
      </div>

      {/* Bio */}
      <div className="qs-row">
        <span className="qs-label">Status</span>
        {editingBio ? (
          <input
            ref={bioRef}
            className="qs-input"
            value={bio}
            onChange={e => setBio(e.target.value)}
            onBlur={saveBio}
            onKeyDown={e => e.key === 'Enter' && saveBio()}
            maxLength={50}
          />
        ) : (
          <button className="qs-val-btn" onClick={() => setEditingBio(true)} aria-label="Edit bio">
            {userData.bio} ✏️
          </button>
        )}
      </div>

      {/* Theme */}
      <div className="qs-row">
        <span className="qs-label">Theme</span>
        <button className="pill pill-pink qs-cycle" onClick={cycleTheme} style={{ cursor: 'pointer', fontSize: '0.75rem' }} aria-label="Cycle theme">
          {THEMES[theme]?.label}
        </button>
      </div>

      {/* Privacy */}
      <div className="qs-row">
        <span className="qs-label">Privacy</span>
        <button className="pill pill-blue qs-cycle" onClick={cyclePrivacy} style={{ cursor: 'pointer', fontSize: '0.75rem' }} aria-label="Cycle privacy">
          {PRIVACY[privacy]}
        </button>
      </div>

      {/* Toggles */}
      <div className="qs-toggles">
        <div className="qs-toggle-row">
          <span className="qs-label">🔔 Notifications</span>
          <button className={`qs-switch ${notifs ? 'on' : ''}`} onClick={toggleNotifs} aria-label="Toggle notifications">
            <span className="qs-knob" />
          </button>
        </div>
        <div className="qs-toggle-row">
          <span className="qs-label">🌙 Do Not Disturb</span>
          <button className={`qs-switch ${dnd ? 'on' : ''}`} onClick={toggleDnd} aria-label="Toggle do not disturb">
            <span className="qs-knob" />
          </button>
        </div>
      </div>
    </div>
  )
}
