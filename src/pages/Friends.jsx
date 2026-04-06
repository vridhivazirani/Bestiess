import React from 'react'

const FRIENDS = [
  { id: 1, name: 'Vridhi', status: 'Working on UI', level: 12, pet: '🐱', bio: 'Living that design life 🎀', color: '#FFE0E8' },
  { id: 2, name: 'Sam', status: 'Debugging', level: 8, pet: '🐶', bio: 'Code, Coffee, Repeat ☕️', color: '#E8E0FF' },
  { id: 3, name: 'Maya', status: 'Sleeping', level: 15, pet: '🐰', bio: 'Dreaming of cute things ✨', color: '#E0F0E8' },
  { id: 4, name: 'Aria', status: 'Designing', level: 10, pet: '🦊', bio: 'Pixels and pastels only 🌸', color: '#D4ECFF' },
  { id: 5, name: 'Luna', status: 'Reading', level: 9, pet: '🐻', bio: 'Chapter 12 and cozy vibes 📖', color: '#FFF2CC' },
  { id: 6, name: 'Zoe', status: 'Gaming', level: 14, pet: '🐸', bio: 'Just one more round... 🎮', color: '#E0F0FF' },
]

const Friends = () => (
  <div>
    <div className="pg-title">Bestie Gallery 💕</div>
    <p className="pg-sub">~ synced via TAMA protocol v3.0 ~</p>

    <div className="friends-grid">
      {FRIENDS.map(f => (
        <div key={f.id} className="buddy">
          <div className="buddy-bg" style={{ background: `linear-gradient(180deg, white, ${f.color})` }} />
          <div style={{ position: 'relative', marginTop: -45 }}>
            <div className="buddy-pet">{f.pet}<div className="buddy-lvl">{f.level}</div></div>
          </div>
          <div className="buddy-info">
            <h3 className="buddy-name">{f.name}</h3>
            <div className="buddy-stat">{f.status}</div>
            <p className="buddy-bio">"{f.bio}"</p>
            <div className="buddy-btns">
              <button className="btn-poke">Poke ✨</button>
              <button className="btn-zap">⚡</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Friends
