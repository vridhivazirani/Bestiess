import React, { useState } from 'react'

const INIT = [
  { id: 1, text: 'Just had the best coffee sync with Sam! ☕️✨', emo: '🥰', date: 'Mar 28', time: '10:00 AM' },
  { id: 2, text: 'UI is finally looking cute. Dreamy vibes only! ☁️', emo: '🥹', date: 'Mar 28', time: '12:30 PM' },
  { id: 3, text: 'Need more stickers for the vault... Maya has so many! 🎀', emo: '🍭', date: 'Mar 27', time: '09:15 PM' },
  { id: 4, text: 'Finished chapter 3 of my fav book, so inspired ✨', emo: '☁️', date: 'Mar 27', time: '07:00 PM' },
]

const EMOJIS = ['✨', '🌸', '🎀', '🍭', '🧸', '☁️', '🫧', '🦄']

const Journal = () => {
  const [entries, setEntries] = useState(INIT)
  const [txt, setTxt] = useState('')
  const [emo, setEmo] = useState('✨')

  const post = () => {
    if (!txt.trim()) return
    setEntries([{ id: Date.now(), text: txt, emo, date: 'Today', time: 'Just now' }, ...entries])
    setTxt('')
  }

  return (
    <div>
      <div className="pg-title">Mood Diary 📓</div>
      <p className="pg-sub">~ a safe space for your daily tea and cute thoughts ~</p>

      <div className="jrnl-layout">
        <div>
          {entries.map(e => (
            <div key={e.id} className="jrnl-entry">
              <div className="jrnl-emo">{e.emo}</div>
              <div className="jrnl-body">
                <div className="jrnl-dates">
                  <span className="jrnl-dt">📅 {e.date}</span>
                  <span className="jrnl-dt">🕐 {e.time}</span>
                </div>
                <p className="jrnl-txt">"{e.text}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="compose">
          <p className="compose-ttl">write some tea... ☕️</p>
          <div className="emo-row">
            {EMOJIS.map(e => (
              <button key={e} className={`emo-btn${emo === e ? ' on' : ''}`} onClick={() => setEmo(e)}>{e}</button>
            ))}
          </div>
          <textarea
            className="compose-ta"
            placeholder="what's the vibe today? ✨"
            value={txt}
            onChange={e => setTxt(e.target.value)}
          />
          <button className="btn-cute btn-pink" style={{ justifyContent: 'center' }} onClick={post}>
            post entry ✨
          </button>
          <div className="streak">
            <span style={{ fontSize: '1.4rem' }}>🔥</span>
            <span className="streak-txt">3-Day Diary Streak!</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Journal
