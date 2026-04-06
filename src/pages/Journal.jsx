import React, { useState } from 'react'
import { useJournal } from '../hooks/useJournal'

const EMOJIS = ['✨', '🌸', '🎀', '🍭', '🧸', '☁️', '🫧', '🦄']

const Journal = () => {
  const { entries, loading, postEntry, removeEntry } = useJournal()
  const [txt, setTxt] = useState('')
  const [emo, setEmo] = useState('✨')
  const [isPosting, setIsPosting] = useState(false)

  const post = async () => {
    if (!txt.trim() || isPosting) return
    setIsPosting(true)
    await postEntry(txt, emo)
    setTxt('')
    setIsPosting(false)
  }

  const deleteEntry = async (id) => {
    await removeEntry(id)
  }

  return (
    <div>
      <div className="pg-title" role="heading" aria-level={1}>Mood Diary 📓</div>
      <p className="pg-sub">~ a safe space for your daily tea and cute thoughts ~</p>

      <div className="jrnl-layout">
        <div>
          {loading ? (
            <div className="empty-state">
              <div className="empty-icon">⏳</div>
              <div className="empty-title">Loading pages...</div>
            </div>
          ) : entries.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📖</div>
              <div className="empty-title">No entries yet~</div>
              <div className="empty-desc">Start writing your first diary entry! Every thought deserves a cute page 🌸</div>
            </div>
          ) : (
            entries.map(e => (
              <div key={e.id} className="jrnl-entry" role="article">
                <div className="jrnl-emo" aria-hidden="true">{e.emo}</div>
                <div className="jrnl-body">
                  <div className="jrnl-dates">
                    <span className="jrnl-dt">📅 {e.date}</span>
                    <span className="jrnl-dt">🕐 {e.time}</span>
                  </div>
                  <p className="jrnl-txt">"{e.text}"</p>
                </div>
                <button
                  className="btn-zap"
                  onClick={() => deleteEntry(e.id)}
                  aria-label="Delete entry"
                  style={{ alignSelf: 'flex-start', flexShrink: 0 }}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        <div className="compose" role="form" aria-label="New diary entry">
          <p className="compose-ttl">write some tea... ☕️</p>
          <textarea
            className="compose-ta"
            placeholder="what's the vibe today? ✨"
            value={txt}
            onChange={e => setTxt(e.target.value)}
            aria-label="Diary entry text"
            disabled={isPosting}
          />
          <div className="emo-row" role="radiogroup" aria-label="Choose a mood emoji">
            {EMOJIS.map(e => (
              <button
                key={e}
                className={`emo-btn${emo === e ? ' on' : ''}`}
                onClick={() => setEmo(e)}
                role="radio"
                aria-checked={emo === e}
                aria-label={`Mood: ${e}`}
                disabled={isPosting}
              >
                {e}
              </button>
            ))}
          </div>
          <button disabled={isPosting} className="btn-cute btn-pink" style={{ justifyContent: 'center', opacity: isPosting ? 0.7 : 1 }} onClick={post} aria-label="Post diary entry">
            {isPosting ? 'posting...' : 'post entry ✨'}
          </button>
          <div className="streak" role="status">
            <span style={{ fontSize: '1.4rem' }} aria-hidden="true">🔥</span>
            <span className="streak-txt">{entries.length} Entries Total!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journal

