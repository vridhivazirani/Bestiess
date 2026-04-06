import React, { useState } from 'react'

const TASKS = [
  { id: 1, title: 'Hero Section Design', who: 'Vridhi', status: 'Done', icon: '🎨', color: '#E1F7E1' },
  { id: 2, title: 'Database Setup', who: 'Sam', status: 'In Progress', icon: '💿', color: '#E8D6FF' },
  { id: 3, title: 'Logo Concepts', who: 'Maya', status: 'Pending', icon: '🍎', color: '#FFDDE2' },
  { id: 4, title: 'Landing Copy', who: 'Vridhi', status: 'In Progress', icon: '✍️', color: '#D4ECFF' },
]

const UPDATES = [
  { id: 101, who: 'Vridhi', text: 'Just finished the hero layout! 🔥', time: '2m ago' },
  { id: 102, who: 'Sam', text: 'Struggling with the API but almost there 🚀', time: '15m ago' },
  { id: 103, who: 'Maya', text: 'Ready to sync? ✨', time: '1h ago' },
]

const pillClass = (s) => s === 'Done' ? 'pill pill-green' : s === 'In Progress' ? 'pill pill-blue' : 'pill pill-orange'

const Dashboard = () => {
  const [updates, setUpdates] = useState(UPDATES)
  const [modal, setModal] = useState(false)
  const [txt, setTxt] = useState('')

  const post = () => {
    if (!txt.trim()) return
    setUpdates([{ id: Date.now(), who: 'You', text: txt, time: 'Just now' }, ...updates])
    setTxt('')
    setModal(false)
  }

  return (
    <div>
      <div className="dash-layout">
        <section>
          <div className="pg-head">
            <h2 className="pg-title">Current Pulse ⚡️</h2>
            <button className="btn-cute btn-pink" onClick={() => setModal(true)} aria-label="Update your status">✏️ Update Status</button>
          </div>

          <div className="grid-auto">
            {TASKS.map(t => (
              <div key={t.id} className="task-card" style={{ background: `linear-gradient(135deg, white 60%, ${t.color} 100%)` }}>
                <div className="task-emoji">{t.icon}</div>
                <div className="task-meta">
                  <span className="task-id">task_{t.id}</span>
                  <span className={pillClass(t.status)}>{t.status}</span>
                </div>
                <p className="task-name">{t.title}</p>
                <div className="task-who">
                  <div className="task-ava">{t.who.charAt(0)}</div>
                  <span className="task-person">{t.who}</span>
                </div>
              </div>
            ))}
            <div className="add-card" role="button" tabIndex={0} aria-label="Add new task" onKeyDown={e => e.key === 'Enter' && null}>✚ add task</div>
          </div>
        </section>

        <aside>
          <div className="pulse-box">
            <div className="pulse-head">✨ Bestie Pulse</div>
            {updates.map(u => (
              <div key={u.id} className="pulse-msg">
                <div className="pulse-row">
                  <div className="pulse-ava">{u.who.charAt(0)}</div>
                  <span className="pulse-who">@{u.who}</span>
                  <span className="pulse-when">{u.time}</span>
                </div>
                <p className="pulse-txt">"{u.text}"</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {modal && (
        <div className="modal-bg" onClick={() => setModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-ttl">✨ Share the Joy!</h3>
            <textarea className="modal-ta" placeholder="What's the tea?? ☕" value={txt} onChange={e => setTxt(e.target.value)} autoFocus />
            <div className="modal-btns">
              <button className="btn-nah" onClick={() => setModal(false)}>later...</button>
              <button className="btn-cute btn-pink" style={{ flex: 1, justifyContent: 'center' }} onClick={post}>Post it! ✨</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
