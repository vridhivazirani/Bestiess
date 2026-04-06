import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../contexts/AuthContext';

export default function QRCodeDisplay() {
  const { userData } = useAuth();

  if (!userData) return null;

  // We encode a simple JSON with the username so the scanner can read it
  const qrData = JSON.stringify({ action: 'add_friend', username: userData.username });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 24, background: 'var(--paper)', borderRadius: 24, border: '2px dashed var(--pink)' }}>
      <h3 style={{ fontFamily: 'DynaPuff', color: 'var(--pink)' }}>My Bestie Card 🎀</h3>
      <div style={{ padding: 12, background: 'white', borderRadius: 16, boxShadow: '0 4px 12px rgba(248,164,184,0.2)' }}>
        <QRCodeSVG 
          value={qrData} 
          size={180} 
          bgColor={"#ffffff"}
          fgColor={"#E88BA0"}
          level={"L"}
        />
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: '0.9rem', color: 'var(--text-light)', textAlign: 'center' }}>
        Show this to a friend to let them add you! <br/>
        <b>@{userData.username}</b>
      </p>
    </div>
  );
}
