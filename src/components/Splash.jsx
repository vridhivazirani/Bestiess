import React, { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: 'booting up BESTIESS OS v3.0 ✨', delay: 400 },
  { text: 'loading friendship protocols... 💕', delay: 900 },
  { text: 'syncing bestie data... 🎀', delay: 1400 },
  { text: 'feeding the bunny... 🐰', delay: 1900 },
  { text: 'applying kawaii theme... 🌸', delay: 2400 },
  { text: 'almost there~ ☁️', delay: 2900 },
  { text: 'READY! welcome back, bestie! ♡', delay: 3400 },
]

const DESKTOP_ICONS = [
  { icon: '🏠', label: 'Pulse' },
  { icon: '🎀', label: 'Gallery' },
  { icon: '🗂️', label: 'Archive' },
  { icon: '📓', label: 'Diary' },
  { icon: '🛍️', label: 'Boutique' },
  { icon: '🐰', label: 'My Pet' },
  { icon: '🎵', label: 'Vibes' },
  { icon: '☁️', label: 'Cloud' },
]

const Splash = ({ onDone }) => {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('boot') // boot → desktop → fade
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    // Show boot lines one by one
    BOOT_LINES.forEach(({ text, delay }) => {
      setTimeout(() => setLines(l => [...l, text]), delay)
    })

    // Fill progress bar
    const prog = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(prog); return 100 }
        return p + 2
      })
    }, 80)

    // Switch to desktop phase
    setTimeout(() => setPhase('desktop'), 4200)

    return () => clearInterval(prog)
  }, [])

  const handleEnter = () => {
    setFadeOut(true)
    setTimeout(onDone, 800)
  }

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #2D1B3D 0%, #1A1028 50%, #2D1B3D 100%)',
        transition: 'opacity 0.8s ease',
        opacity: fadeOut ? 0 : 1,
        fontFamily: "'Gaegu', cursive",
        overflow: 'hidden',
      }}
    >
      {/* Background stars */}
      {[...Array(30)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 3 === 0 ? 3 : 2,
          height: i % 3 === 0 ? 3 : 2,
          background: 'white',
          borderRadius: '50%',
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          opacity: 0.3 + Math.random() * 0.5,
          animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}

      {/* Floating doodles */}
      {['🌸','⭐','✨','💖','🍭','☁️'].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          fontSize: '1.5rem',
          opacity: 0.35,
          top: `${10 + i * 14}%`,
          left: i % 2 === 0 ? `${3 + i}%` : undefined,
          right: i % 2 !== 0 ? `${3 + i}%` : undefined,
          animation: 'floatY 6s ease-in-out infinite',
          animationDelay: `${i * 0.8}s`,
        }}>{d}</div>
      ))}

      {/* THE COMPUTER */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>

        {/* Monitor body */}
        <div style={{
          width: 540,
          background: '#F5E6D8',
          border: '4px solid #D4B090',
          borderRadius: '20px 20px 8px 8px',
          padding: 12,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), inset 0 2px 0 rgba(255,255,255,0.3)',
          position: 'relative',
        }}>
          {/* Monitor brand */}
          <div style={{
            position: 'absolute', top: -2, left: '50%', transform: 'translateX(-50%)',
            background: '#C4A882', color: '#F5E6D8', fontSize: '0.6rem', fontWeight: 700,
            padding: '2px 14px', borderRadius: '0 0 8px 8px', letterSpacing: '0.2em',
            fontFamily: "'Patrick Hand', cursive",
          }}>BESTIESS</div>

          {/* Screen bezel */}
          <div style={{
            background: '#1A1028',
            border: '3px solid #C4A882',
            borderRadius: 12,
            padding: 16,
            minHeight: 300,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(255,150,200,0.05)',
          }}>
            {/* Screen shine */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '40%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%)',
              borderRadius: '10px 10px 0 0', pointerEvents: 'none',
            }} />

            {phase === 'boot' && (
              <div style={{ color: '#F8A4B8', padding: 8 }}>
                {/* Boot header */}
                <div style={{
                  borderBottom: '1px solid rgba(248,164,184,0.2)',
                  paddingBottom: 10, marginBottom: 12,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#E0D0F0' }}>BESTIESS OS v3.0 🌸</span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(248,164,184,0.5)' }}>kawaii edition</span>
                </div>

                {/* Boot lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {lines.map((line, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      fontSize: '0.82rem', color: i === lines.length - 1 ? '#FFD6E0' : 'rgba(248,164,184,0.6)',
                      fontWeight: i === lines.length - 1 ? 700 : 400,
                    }}>
                      <span style={{ color: '#9A7FBF' }}>&gt;</span>
                      <span style={{
                        animation: i === lines.length - 1 ? 'blink-in 0.3s ease' : 'none',
                      }}>{line}</span>
                    </div>
                  ))}

                  {/* Cursor blink */}
                  {lines.length < BOOT_LINES.length && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                      <span style={{ color: '#9A7FBF' }}>&gt;</span>
                      <span style={{ animation: 'cursor-blink 1s step-end infinite', color: '#F8A4B8' }}>█</span>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 20 }}>
                  <div style={{
                    height: 6, background: 'rgba(255,255,255,0.08)',
                    borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(248,164,184,0.2)',
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #C4A882, #F8A4B8)',
                      borderRadius: 4,
                      transition: 'width 0.1s linear',
                      boxShadow: '0 0 8px rgba(248,164,184,0.6)',
                    }} />
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginTop: 4, fontSize: '0.68rem', color: 'rgba(248,164,184,0.4)',
                  }}>
                    <span>loading...</span>
                    <span>{Math.min(progress, 100)}%</span>
                  </div>
                </div>
              </div>
            )}

            {phase === 'desktop' && (
              <div style={{
                animation: 'fade-in 0.5s ease forwards',
                height: '100%',
              }}>
                {/* Desktop wallpaper inner */}
                <div style={{
                  background: 'linear-gradient(135deg, #3D1F5A 0%, #2A1545 100%)',
                  borderRadius: 8, padding: 12, minHeight: 268,
                  backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(248,164,184,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(180,150,220,0.08) 0%, transparent 50%)',
                }}>
                  {/* Desktop toolbar */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '4px 8px',
                    background: 'rgba(255,255,255,0.06)',
                    borderRadius: 6, marginBottom: 12,
                    fontSize: '0.65rem', color: 'rgba(255,220,240,0.6)',
                  }}>
                    <span>🌸 Desktop</span>
                    <span>17:11 ♥</span>
                  </div>

                  {/* Desktop icons grid */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
                  }}>
                    {DESKTOP_ICONS.map((icon, i) => (
                      <div key={i} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                        cursor: 'pointer',
                        animation: `pop-in 0.4s ease ${i * 0.06}s both`,
                      }}>
                        <div style={{
                          width: 44, height: 44,
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          borderRadius: 12,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '1.4rem',
                          backdropFilter: 'blur(4px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}>
                          {icon.icon}
                        </div>
                        <span style={{
                          fontSize: '0.6rem', color: 'rgba(255,220,240,0.8)', fontWeight: 700,
                          textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                          fontFamily: "'Gaegu', cursive",
                        }}>{icon.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Click to enter */}
                  <div
                    onClick={handleEnter}
                    style={{
                      marginTop: 14, textAlign: 'center',
                      color: '#F8A4B8', fontSize: '0.85rem', fontWeight: 700,
                      cursor: 'pointer',
                      animation: 'cursor-blink 2s ease-in-out infinite',
                      padding: '8px 20px',
                      background: 'rgba(248,164,184,0.1)',
                      border: '1px solid rgba(248,164,184,0.3)',
                      borderRadius: 20,
                      display: 'inline-block',
                    }}
                  >
                    click anywhere to enter ✨
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Monitor neck */}
        <div style={{
          width: 60, height: 18,
          background: 'linear-gradient(180deg, #C4A882 0%, #B09070 100%)',
          clipPath: 'polygon(15% 0, 85% 0, 100% 100%, 0% 100%)',
        }} />

        {/* Monitor base */}
        <div style={{
          width: 180, height: 16,
          background: 'linear-gradient(180deg, #C4A882 0%, #9A7860 100%)',
          borderRadius: '0 0 40px 40px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }} />

        {/* Cute label under monitor */}
        {phase === 'desktop' && (
          <div
            onClick={handleEnter}
            style={{
              marginTop: 24, color: 'rgba(248,164,184,0.7)',
              fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.05em',
              animation: 'floatY 3s ease-in-out infinite',
            }}
          >
            ✦ tap to enter your bestie world ✦
          </div>
        )}
      </div>

      <style>{`
        @keyframes twinkle {
          0%,100% { opacity: 0.2; } 50% { opacity: 0.8; }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes cursor-blink {
          0%,100% { opacity: 1; } 50% { opacity: 0; }
        }
        @keyframes blink-in {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes pop-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

export default Splash
