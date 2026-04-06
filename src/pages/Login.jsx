import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err) {
      if (err.message === "Firebase not configured") {
        setError("Firebase is missing configuration. Please update src/firebase.js with your keys.");
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      if (err.message === "Firebase not configured") {
        setError("Firebase is missing configuration. Please update src/firebase.js with your keys.");
      } else {
        setError("Failed to sign in with Google.");
      }
    }
    setLoading(false);
  }

  return (
    <div className="desktop" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div className="notebook" style={{ height: 'auto', maxWidth: 400, padding: 32, textAlign: 'center' }}>
        <h2 className="pg-title" style={{ justifyContent: 'center', fontSize: '2.5rem' }}>🌟 Bestiess</h2>
        <p className="pg-sub" style={{ marginBottom: 24 }}>~ log in to sync ~</p>
        
        {error && (
          <div style={{ background: '#FFDDE2', border: '1.5px solid #E88BA0', color: '#E88BA0', padding: 12, borderRadius: 12, marginBottom: 16, fontFamily: 'Inter', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <button disabled={loading} className="btn-cute btn-pink" style={{ justifyContent: 'center', marginTop: 8 }} type="submit">
            Log In ✨
          </button>
        </form>

        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 1.5, background: 'var(--paper-lines)' }} />
          <span style={{ fontFamily: 'Gaegu', color: 'var(--text-light)', fontWeight: 700 }}>or</span>
          <div style={{ flex: 1, height: 1.5, background: 'var(--paper-lines)' }} />
        </div>

        <button 
          disabled={loading} 
          className="btn-cute btn-ghost" 
          style={{ width: '100%', justifyContent: 'center' }} 
          onClick={handleGoogleSignIn}
        >
          Sign in with Google 🌸
        </button>

        <p style={{ fontFamily: 'Gaegu', marginTop: 24, fontSize: '1rem', fontWeight: 700 }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--pink)' }}>Sign up here! 💕</Link>
        </p>
      </div>
    </div>
  );
}
