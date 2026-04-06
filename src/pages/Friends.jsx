import React, { useState } from 'react';
import { useFriends } from '../hooks/useFriends';
import QRCodeDisplay from '../components/QRCodeDisplay';
import QRScanner from '../components/QRScanner';

const Friends = () => {
  const { friends, loading, requestFriend, poke, zap } = useFriends();
  const [showQR, setShowQR] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = async (data) => {
    try {
      const parsed = JSON.parse(data);
      if (parsed.action === 'add_friend' && parsed.username) {
        await requestFriend(parsed.username);
        setShowScanner(false);
        alert(`Successfully connected with @${parsed.username}! ✨`);
      }
    } catch (e) {
      alert(e.message || "Invalid QR code!");
      setShowScanner(false);
    }
  };

  return (
    <div>
      <div className="pg-title" role="heading" aria-level={1}>Bestie Gallery 💕</div>
      <p className="pg-sub">~ connect with besties in the hub ~</p>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <button className="btn-cute btn-pink" onClick={() => { setShowQR(true); setShowScanner(false); }}>
          My QR Code 🎀
        </button>
        <button className="btn-cute btn-ghost" onClick={() => { setShowScanner(true); setShowQR(false); }}>
          Scan QR 📷
        </button>
      </div>

      {showQR && (
        <div style={{ marginBottom: 24 }}>
          <QRCodeDisplay />
          <button className="btn-cute btn-ghost" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} onClick={() => setShowQR(false)}>Close</button>
        </div>
      )}

      {showScanner && (
        <div style={{ marginBottom: 24 }}>
          <QRScanner onScanSuccess={handleScan} />
          <button className="btn-cute btn-ghost" style={{ marginTop: 12, width: '100%', justifyContent: 'center' }} onClick={() => setShowScanner(false)}>Cancel Scan</button>
        </div>
      )}

      {loading ? (
        <div className="empty-state">
          <div className="empty-icon">⏳</div>
          <div className="empty-title">Loading besties...</div>
        </div>
      ) : friends.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">😢</div>
          <div className="empty-title">No one else here yet.</div>
          <div className="empty-desc">Tell your friends to join Bestiess so you can scan their QR codes!</div>
        </div>
      ) : (
        <div className="friends-grid">
          {friends.map(f => (
            <div key={f.uid || f.id} className="buddy">
              <div className="buddy-bg" style={{ background: `linear-gradient(180deg, white, ${f.color || '#FFE0E8'})` }} />
              <div style={{ position: 'relative', marginTop: -45 }}>
                <div className="buddy-pet">
                  {f.pet || '🐰'}
                  <div className="buddy-lvl">{f.level || 1}</div>
                </div>
              </div>
              <div className="buddy-info">
                <h3 className="buddy-name">{f.displayName || f.username}</h3>
                <div className="buddy-stat">{f.status || 'Online'}</div>
                <p className="buddy-bio">"{f.bio || 'New bestie in the hub! ✨'}"</p>
                <div className="buddy-btns">
                  <button className="btn-poke" aria-label={`Poke ${f.displayName || f.username}`} onClick={() => poke(f.id)}>Poke ✨</button>
                  <button className="btn-zap" aria-label={`Send energy to ${f.displayName || f.username}`} onClick={() => zap(f.id)}>⚡</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Friends;
