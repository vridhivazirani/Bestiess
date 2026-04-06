import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner({ onScanSuccess, onScanError }) {
  const [scannerReady, setScannerReady] = useState(false);

  useEffect(() => {
    // Delay slightly to ensure DOM element is ready
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "qr-reader",
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        false
      );

      scanner.render(
        (decodedText) => {
          scanner.clear();
          onScanSuccess(decodedText);
        },
        (error) => {
          if (onScanError) onScanError(error);
        }
      );
      setScannerReady(true);

      return () => {
        scanner.clear().catch(e => console.error("Failed to clear scanner", e));
      };
    }, 100);
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto', background: 'var(--paper)', padding: 16, borderRadius: 24, border: '2px dashed var(--pink)' }}>
      <h3 style={{ fontFamily: 'DynaPuff', color: 'var(--pink)', textAlign: 'center', marginBottom: 12 }}>Scan Bestie QR 📷</h3>
      <div id="qr-reader" style={{ width: '100%' }}></div>
      {!scannerReady && <p style={{ textAlign: 'center', fontFamily: 'Inter', color: 'var(--text-light)', marginTop: 10 }}>Initializing camera...</p>}
      <style>{`
        #qr-reader { border: none !important; }
        #qr-reader img { display: none; }
        #qr-reader__dashboard_section_csr button {
          background: var(--pink);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 12px;
          font-family: 'DynaPuff';
          cursor: pointer;
        }
        #qr-reader__dashboard_section_swaplink { display: none; }
      `}</style>
    </div>
  );
}
