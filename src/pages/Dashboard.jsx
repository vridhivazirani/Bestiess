import React, { useState } from 'react'
import { usePulse } from '../hooks/usePulse'
import { useTasks } from '../hooks/useTasks'

const ICONS = ['🎨', '💿', '🍎', '✍️', '💼', '💖', '🧸', '☁️', '🎀']
const COLORS = ['#E1F7E1', '#E8D6FF', '#FFDDE2', '#D4ECFF', '#FFF2CC', '#FFE0E0', '#FFE8D0']

const pillClass = (s) => s === 'Done' ? 'pill pill-green' : s === 'In Progress' ? 'pill pill-blue' : 'pill pill-orange'

const Dashboard = () => {
  const { updates, loading, postUpdate } = usePulse()
  const { tasks, loading: loadingTasks, addTask, updateTaskStatus, deleteTask } = useTasks()
  
  const [modal, setModal] = useState(false)
  const [taskModal, setTaskModal] = useState(false)
  const [txt, setTxt] = useState('')
  const [isPosting, setIsPosting] = useState(false)

  // New task state
  const [taskName, setTaskName] = useState('')
  const [taskIcon, setTaskIcon] = useState('🎀')
  const [taskColor, setTaskColor] = useState('#FFDDE2')

  const post = async () => {
    if (!txt.trim() || isPosting) return
    setIsPosting(true)
    await postUpdate(txt)
    setTxt('')
    setModal(false)
    setIsPosting(false)
  }

  const handleAddTask = async (e) => {
    e.preventDefault()
    if (!taskName.trim()) return
    await addTask(taskName, 'Pending', taskIcon, taskColor)
    setTaskName('')
    setTaskModal(false)
  }

  const cycleStatus = (id, currentStatus) => {
    let next = 'Pending'
    if (currentStatus === 'Pending') next = 'In Progress'
    else if (currentStatus === 'In Progress') next = 'Done'
    else if (currentStatus === 'Done') next = 'Pending'
    updateTaskStatus(id, next)
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
            {loadingTasks ? (
              <div style={{ padding: 20, fontFamily: 'Gaegu', color: 'var(--text-light)' }}>Loading tasks...</div>
            ) : (
              <>
                {tasks.map(t => (
                  <div key={t.id} className="task-card" style={{ background: `linear-gradient(135deg, white 60%, ${t.color} 100%)`, cursor: 'pointer' }} onClick={() => cycleStatus(t.id, t.status)}>
                    
                    <button 
                      className="btn-nah" 
                      style={{ position: 'absolute', top: 8, right: 8, padding: '2px 6px', fontSize: '0.7rem' }} 
                      onClick={(e) => { e.stopPropagation(); deleteTask(t.id); }}
                    >
                      ✕
                    </button>

                    <div className="task-emoji">{t.icon}</div>
                    <div className="task-meta">
                      <span className="task-id">task_{t.id.slice(0,4)}</span>
                      <span className={pillClass(t.status)}>{t.status}</span>
                    </div>
                    <p className="task-name">{t.title}</p>
                    <div className="task-who">
                      <div className="task-ava">{t.who.charAt(0)}</div>
                      <span className="task-person">{t.who}</span>
                    </div>
                  </div>
                ))}
                <div className="add-card" role="button" tabIndex={0} aria-label="Add new task" onClick={() => setTaskModal(true)} onKeyDown={e => e.key === 'Enter' && setTaskModal(true)}>
                  ✚ add task
                </div>
              </>
            )}
          </div>
        </section>

        <aside>
          <div className="pulse-box">
            <div className="pulse-head">✨ Bestie Pulse</div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: 20, fontFamily: 'Gaegu', color: 'var(--text-light)' }}>Loading updates...</div>
            ) : updates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 20, fontFamily: 'Gaegu', color: 'var(--text-light)' }}>No updates yet! Be the first to post. ✨</div>
            ) : (
              updates.map(u => (
                <div key={u.id} className="pulse-msg">
                  <div className="pulse-row" style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="pulse-ava">
                      <img 
                        src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${u.avatar || u.who}`} 
                        alt="avatar" 
                        style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                      />
                    </div>
                    <span className="pulse-who">@{u.who}</span>
                    <span className="pulse-when" style={{ marginLeft: 'auto' }}>{u.time}</span>
                  </div>
                  <p className="pulse-txt">"{u.text}"</p>
                </div>
              ))
            )}
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
              <button disabled={isPosting} className="btn-cute btn-pink" style={{ flex: 1, justifyContent: 'center', opacity: isPosting ? 0.7 : 1 }} onClick={post}>
                {isPosting ? 'Posting...' : 'Post it! ✨'}
              </button>
            </div>
          </div>
        </div>
      )}

      {taskModal && (
        <div className="modal-bg" onClick={() => setTaskModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 360 }}>
            <h3 className="modal-ttl">✍️ New Bestie Task</h3>
            <form onSubmit={handleAddTask} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input 
                type="text" 
                className="compose-ta" 
                style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }}
                placeholder="What are we working on?" 
                value={taskName}
                onChange={e => setTaskName(e.target.value)}
                autoFocus
                required
              />
              
              <div>
                <label style={{ fontFamily: 'Gaegu', fontSize: '1.2rem', fontWeight: 700 }}>Choose Icon:</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {ICONS.map(i => (
                    <button type="button" key={i} onClick={() => setTaskIcon(i)} className="pill" style={{ opacity: taskIcon === i ? 1 : 0.5, border: taskIcon === i ? '2px solid var(--pink)' : 'none', background: 'transparent' }}>{i}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontFamily: 'Gaegu', fontSize: '1.2rem', fontWeight: 700 }}>Choose Color:</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
                  {COLORS.map(c => (
                    <div key={c} onClick={() => setTaskColor(c)} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: taskColor === c ? '2px solid var(--text)' : '2px solid transparent', cursor: 'pointer' }} />
                  ))}
                </div>
              </div>

              <div className="modal-btns" style={{ marginTop: 16 }}>
                <button type="button" className="btn-nah" onClick={() => setTaskModal(false)}>cancel</button>
                <button type="submit" className="btn-cute btn-pink" style={{ flex: 1, justifyContent: 'center' }}>
                  Create Task! 🌟
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
