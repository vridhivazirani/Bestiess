import React from 'react'

const PROJECTS = [
  { id: 201, title: 'Portfolio Revamp', date: '2024-03-20', icon: '🚀', friends: ['V', 'S'] },
  { id: 202, title: 'Sync Protocol v1.0', date: '2024-03-15', icon: '🔒', friends: ['S', 'M'] },
  { id: 203, title: 'Bestie Icon Pack', date: '2024-03-10', icon: '🎨', friends: ['M', 'V'] },
  { id: 204, title: 'Mood Tracker App', date: '2024-02-28', icon: '🌸', friends: ['A', 'L'] },
]

const Vault = () => (
  <div>
    <div className="pg-title">Project Vault 🏆</div>
    <p className="pg-sub">~ sacred archives of synchronized achievements ~</p>

    <div className="vault-grid">
      {PROJECTS.map(p => (
        <div key={p.id} className="vault-card">
          <div className="vault-top">
            <div className="vault-ico">{p.icon}</div>
            <div>
              <p className="vault-name">{p.title}</p>
              <span className="pill pill-green">✔ synced</span>
            </div>
          </div>
          <div className="vault-meta">
            <div><div className="vault-label">archived</div><div className="vault-val">{p.date}</div></div>
            <div style={{ textAlign: 'right' }}><div className="vault-label">project id</div><div className="vault-val" style={{ color: 'var(--pink)' }}>#SR_{p.id}</div></div>
          </div>
          <div className="vault-foot">
            <div className="ava-stack">
              {p.friends.map((f,i) => <div key={i} className="ava-item">{f}</div>)}
            </div>
            <button className="vault-link">browse tea →</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Vault
