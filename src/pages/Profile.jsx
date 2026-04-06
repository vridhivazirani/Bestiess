import React, { useState, useEffect } from 'react'
import QuickSettings from '../components/QuickSettings'
import { useAuth } from '../contexts/AuthContext'

const Profile = () => {
  const { userData, updateProfile } = useAuth()
  
  const [petHappy, setPetHappy] = useState(100)
  const [petEnergy, setPetEnergy] = useState(100)
  const [petMood, setPetMood] = useState('happy')

  useEffect(() => {
    if (userData) {
      setPetHappy(userData.petHappy ?? 100);
      setPetEnergy(userData.petEnergy ?? 100);
    }
  }, [userData])

  const feed = () => {
    const newEnergy = Math.min(100, petEnergy + 12);
    const newHappy = Math.min(100, petHappy + 5);
    setPetEnergy(newEnergy);
    setPetHappy(newHappy);
    setPetMood('eating');
    setTimeout(() => setPetMood('happy'), 1500);
    updateProfile({ petEnergy: newEnergy, petHappy: newHappy });
  }

  const play = () => {
    const newEnergy = Math.max(0, petEnergy - 8);
    const newHappy = Math.min(100, petHappy + 15);
    setPetEnergy(newEnergy);
    setPetHappy(newHappy);
    setPetMood('playing');
    setTimeout(() => setPetMood('happy'), 2000);
    updateProfile({ petEnergy: newEnergy, petHappy: newHappy });
  }

  // Pet energy slowly drains (simplified version that doesn't constantly write to DB)
  useEffect(() => {
    const id = setInterval(() => {
      setPetEnergy(e => Math.max(0, e - 1))
      setPetHappy(h => Math.max(0, h - 0.5))
    }, 60000) // every 60s
    return () => clearInterval(id)
  }, [])

  if (!userData) return <div className="empty-state"><div className="empty-title">Loading Hub...</div></div>;

  const petEmoji = petMood === 'eating' ? '🥕' : petMood === 'playing' ? '🎾' : petEnergy < 20 ? '😴' : '🐰'

  return (
    <div>
      <div className="pg-title">My Bestie Hub ✨</div>
      <p className="pg-sub">~ manage your sync persona & pet evolution ~</p>

      <div className="prof-layout">
        <div>
          <div className="prof-hero">
            <div className="prof-ava">
              <img src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${userData.avatar || 'KawaiiGirl'}`} alt="Me" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <p className="prof-name">{userData.displayName}</p>
                <span className="pill pill-pink">Elite Syncer 🌟</span>
              </div>
              <p className="prof-bio">"{userData.bio}"</p>
              <div className="prof-stats">
                <div className="stat"><div className="stat-n">42</div><div className="stat-l">Tasks</div></div>
                <div className="stat"><div className="stat-n" style={{ color: 'var(--sky)' }}>12</div><div className="stat-l">Besties</div></div>
                <div className="stat"><div className="stat-n" style={{ color: '#E8A040' }}>Lv.{userData.level}</div><div className="stat-l">Rank</div></div>
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
            <p style={{ fontFamily: "'DynaPuff', cursive", fontSize: '1rem', marginBottom: 4 }}>{userData.petName || 'Sugar Bunny'}</p>
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
            <button className="btn-feed" onClick={feed} aria-label="Feed your pet">Feed ✨</button>
            <button className="btn-play" onClick={play} aria-label="Play with your pet">Play 🎀</button>
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
