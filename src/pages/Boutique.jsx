import React from 'react'

const ITEMS = [
  { id: 1, name: 'Glitter Wings', price: 450, icon: '🧚‍♀️', color: '#FFDDE2', rarity: 'Rare' },
  { id: 2, name: 'Rainbow Halo', price: 1200, icon: '🌈', color: '#E8E1F7', rarity: 'Elite' },
  { id: 3, name: 'Sparkle Wand', price: 300, icon: '🪄', color: '#E1F7E1', rarity: 'Common' },
  { id: 4, name: 'Heart Bow', price: 150, icon: '🎀', color: '#FFD6E0', rarity: 'Common' },
  { id: 5, name: 'Golden Crown', price: 2500, icon: '👑', color: '#FFF2CC', rarity: 'Legendary' },
  { id: 6, name: 'Cloud Bed', price: 800, icon: '☁️', color: '#D4ECFF', rarity: 'Rare' },
]

const rarityPill = (r) => {
  if (r === 'Legendary') return 'pill pill-orange'
  if (r === 'Elite') return 'pill pill-lilac'
  if (r === 'Rare') return 'pill pill-blue'
  return 'pill pill-green'
}

const Boutique = () => (
  <div>
    <div className="shop-top">
      <div>
        <div className="pg-title">Bestie Boutique 🛍️</div>
        <p className="pg-sub">~ spend your sync coins on cute things! ~</p>
      </div>
      <div className="coins">🪙 2,450 <span style={{ fontFamily: "'Gaegu', cursive", color: 'var(--text-light)', fontSize: '0.85rem' }}>coins</span></div>
    </div>

    <div className="shop-grid">
      {ITEMS.map(item => (
        <div key={item.id} className="shop-item">
          <div className="shop-pic" style={{ background: `linear-gradient(180deg, white, ${item.color})` }}>
            {item.icon}
          </div>
          <div className="shop-info">
            <span className={rarityPill(item.rarity)}>★ {item.rarity}</span>
            <p className="shop-nm">{item.name}</p>
            <button className="btn-buy" aria-label={`Buy ${item.name} for ${item.price} coins`}>🪙 {item.price} — Buy Now</button>
          </div>
        </div>
      ))}
    </div>

    <div className="sticker" style={{ marginTop: 24, background: 'linear-gradient(135deg, white, rgba(255,214,176,0.2))', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
      <div>
        <div className="kawaii-header" style={{ fontSize: '1.4rem', marginBottom: 8 }}>Mystery Box Dropping Soon! 🎁</div>
        <p className="handwriting" style={{ color: 'var(--text-light)', marginBottom: 14 }}>Keep syncing to unlock the Legendary Summer Icon set... ✨</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="prog-bg" style={{ flex: 1 }}>
            <div className="prog-fill prog-pink" style={{ width: '85%' }} />
          </div>
          <span className="pill pill-pink">85% synced</span>
        </div>
      </div>
      <div style={{ fontSize: '5rem', opacity: 0.1 }}>⚡</div>
    </div>
  </div>
)

export default Boutique
