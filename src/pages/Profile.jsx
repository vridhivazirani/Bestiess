import React, { useState, useEffect } from 'react'
import QuickSettings from '../components/QuickSettings'

const Profile = () => {
  const [petHappy, setPetHappy] = useState(100)
  const [petEnergy, setPetEnergy] = useState(82)
  const [petMood, setPetMood] = useState('happy')

  const feed = () => {
    setPetEnergy(e => Math.min(100, e + 12))
    setPetHappy(h => Math.min(100, h + 5))
    setPetMood('eating')
    setTimeout(() => setPetMood('happy'), 1500)
  }

  const play = () => {
    setPetEnergy(e => Math.max(0, e - 8))
    setPetHappy(h => Math.min(100, h + 15))
    setPetMood('playing')
    setTimeout(() => setPetMood('happy'), 2000)
  }

  // Pet energy slowly drains
  useEffect(() => {
    const id = setInterval(() => {
      setPetEnergy(e => Math.max(0, e - 1))
      setPetHappy(h => Math.max(0, h - 0.5))
    }, 30000) // every 30s
    return () => clearInterval(id)
  }, [])

  const petEmoji = petMood === 'eating' ? '🥕' : petMood === 'playing' ? '🎾' : petEnergy < 20 ? '😴' : '🐰'

  return (
    <div>
      <div className="pg-title">My Bestie Hub ✨</div>
      <p className="pg-sub">~ manage your sync persona & pet evolution ~</p>

      <div className="prof-layout">
        <div>
          <div className="prof-hero">
            <div className="prof-ava">
              <img src="https://api.dicebear.com/9.x/lorelei/svg?seed=KawaiiGirl" alt="Me" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p className="prof-name">{localStorage.getItem('bestiess-name') || 'Vridhi Vazirani'}</p>
                <span className="pill pill-pink">Elite Syncer 🌟</span>
              </div>
              <p className="prof-bio">"{localStorage.getItem('bestiess-status') || 'Building the cutest things on the web! 🎀✨'}"</p>
              <div className="prof-stats">
                <div className="stat"><div className="stat-n">42</div><div className="stat-l">Tasks</div></div>
                <div className="stat"><div className="stat-n" style={{ color: 'var(--sky)' }}>12</div><div className="stat-l">Besties</div></div>
                <div className="stat"><div className="stat-n" style={{ color: '#E8A040' }}>Lv.15</div><div className="stat-l">Rank</div></div>
              </div>
            </div>
          </div>

          <div className="grid-2">
            <QuickSettings />
            <div className="sticker" style={{ background: 'linear-gradient(135deg, white, rgba(212,236,255,0.3))' }}>
              <div className="kawaii-header" style={{ fontSize: '1rem', marginBottom: 14 }}>❤️ Fav Syncs</div>
              <div className="ava-stack" style={{ marginBottom: 10 }}>
                {['V','S','M','A'].map((l,i) => <div key={i} className="ava-item">{l}</div>)}
              </div>
              <p style={{ fontFamily: "'Gaegu', cursive", color: 'var(--text-light)', fontWeight: 700, fontSize: '0.9rem' }}>4 besties in your fav circle~</p>
            </div>
          </div>
        </div>

        <div className="pet-box">
          <div className="kawaii-header" style={{ fontSize: '1.2rem' }}>Pet Evolution 🐰</div>
          <div className={`pet-face ${petMood !== 'happy' ? 'pet-bounce' : ''}`}>{petEmoji}</div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <p style={{ fontFamily: "'DynaPuff', cursive", fontSize: '1rem', marginBottom: 4 }}>Sugar Bunny</p>
            <span className="pill pill-pink">{petEnergy > 80 ? 'MAX ENERGY!' : petEnergy < 20 ? 'Sleepy...' : 'Active ✨'}</span>
          </div>
          <div className="prog-wrap">
            <div className="prog-label"><span>Happiness</span><span style={{ color: 'var(--pink)' }}>{Math.round(petHappy)}%</span></div>
            <div className="prog-bg"><div className="prog-fill prog-pink" style={{ width: `${petHappy}%`, transition: 'width 0.5s ease' }} /></div>
          </div>
          <div className="prog-wrap">
            <div className="prog-label"><span>Energy</span><span style={{ color: '#90C8E8' }}>{Math.round(petEnergy)}%</span></div>
            <div className="prog-bg"><div className="prog-fill prog-blue" style={{ width: `${petEnergy}%`, transition: 'width 0.5s ease' }} /></div>
          </div>
          <div className="pet-btns">
            <button className="btn-feed" onClick={feed}>Feed ✨</button>
            <button className="btn-play" onClick={play}>Play 🎀</button>
          </div>
          <p className="handwriting" style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
            {petMood === 'eating' ? '"Nom nom nom! 🥕"' : petMood === 'playing' ? '"Wheee! So fun! 🎾"' : petEnergy < 20 ? '"Sleepy... need rest 💤"' : '"Your pet loves you so much!"'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
