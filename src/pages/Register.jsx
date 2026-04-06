import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return setError('Passwords do not match.');
    }
    if (username.trim() === '' || displayName.trim() === '') {
      return setError('Username and Display Name are required.');
    }
    
    try {
      setError('');
      setLoading(true);
      await register(email, password, username.toLowerCase(), displayName, "KawaiiGirl");
    } catch (err) {
      if (err.message === "Firebase not configured") {
        setError("Firebase is missing configuration. Please update src/firebase.js with your keys.");
      } else {
        setError(`Failed to create account: ${err.message}`);
      }
      setLoading(false);
    }
  }

  return (
    <div className="desktop" style={{ justifyContent: 'center', alignItems: 'center', padding: 20, overflowY: 'auto' }}>
      <div className="notebook" style={{ height: 'auto', maxWidth: 460, width: '100%', padding: 32, textAlign: 'center', margin: 'auto' }}>
        <h2 className="pg-title" style={{ justifyContent: 'center', fontSize: '2rem' }}>🎀 Join Bestiess</h2>
        <p className="pg-sub" style={{ marginBottom: 24 }}>~ create your sync persona ~</p>
        
        {error && (
          <div style={{ background: '#FFDDE2', border: '1.5px solid #E88BA0', color: '#E88BA0', padding: 12, borderRadius: 12, marginBottom: 16, fontFamily: 'Inter', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input 
              type="text" 
              className="compose-ta" 
              style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }} 
              placeholder="Display Name (e.g. Maya)" 
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              required 
            />
            <input 
              type="text" 
              className="compose-ta" 
              style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }} 
              placeholder="Username (@maya)" 
              value={username}
              onChange={e => setUsername(e.target.value)}
              required 
            />
          </div>
          
          <input 
            type="email" 
            className="compose-ta" 
            style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }} 
            placeholder="Email address" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            className="compose-ta" 
            style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }} 
            placeholder="Password (min 6 chars)" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <input 
            type="password" 
            className="compose-ta" 
            style={{ height: 'auto', minHeight: 'auto', padding: '10px 14px' }} 
            placeholder="Confirm Password" 
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required 
          />
          <button disabled={loading} className="btn-cute btn-pink" style={{ justifyContent: 'center', marginTop: 8 }} type="submit">
            Create Account ✨
          </button>
        </form>

        <p style={{ fontFamily: 'Gaegu', marginTop: 24, fontSize: '1rem', fontWeight: 700 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--pink)' }}>Log in here! 💕</Link>
        </p>
      </div>
    </div>
  );
}
