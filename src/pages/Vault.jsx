import React from 'react'
import { useTasks } from '../hooks/useTasks'

const Vault = () => {
  const { tasks, loading } = useTasks()
  const archived = tasks.filter(t => t.status === 'Done')

  return (
    <div>
      <div className="pg-title">Project Vault 🏆</div>
      <p className="pg-sub">~ sacred archives of synchronized achievements ~</p>

      {loading ? (
        <div className="empty-state">
          <div className="empty-title">Loading archives...</div>
        </div>
      ) : archived.length === 0 ? (
        <div className="empty-state">
          <div className="empty-title">No completed projects yet!</div>
          <div className="empty-desc">When you mark a task as "Done" on the dashboard, it gets immortalized here!</div>
        </div>
      ) : (
        <div className="vault-grid">
          {archived.map(p => (
            <div key={p.id} className="vault-card">
              <div className="vault-top">
                <div className="vault-ico">{p.icon}</div>
                <div>
                  <p className="vault-name">{p.title}</p>
                  <span className="pill pill-green">✔ synced</span>
                </div>
              </div>
              <div className="vault-meta">
                <div>
                  <div className="vault-label">archived on</div>
                  <div className="vault-val">{p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString() : 'Just now'}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="vault-label">project id</div>
                  <div className="vault-val" style={{ color: 'var(--pink)' }}>#SR_{p.id.slice(0,4).toUpperCase()}</div>
                </div>
              </div>
              <div className="vault-foot">
                <div className="ava-stack">
                  <div className="ava-item">{p.who.charAt(0)}</div>
                </div>
                <button className="vault-link">browse tea →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Vault
