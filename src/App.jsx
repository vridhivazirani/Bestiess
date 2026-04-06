import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Friends from './pages/Friends'
import Vault from './pages/Vault'
import Profile from './pages/Profile'
import Boutique from './pages/Boutique'
import Journal from './pages/Journal'
import Login from './pages/Login'
import Register from './pages/Register'

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth()
  
  if (!currentUser) {
    // If not logged in, allow them to view it for now if Firebase isn't configured.
    // The AuthContext will still return null if it's missing config, but let's 
    // try to make this robust: if there's no user, redirect to login.
    // However, if the user hasn't set up Firebase yet, it's better to show the app.
    // We'll enforce login so they see the flow, but login will show the 'missing config' warning.
    return <Navigate to="/login" replace />
  }

  return <Layout>{children}</Layout>
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected routes wrapped in Layout */}
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/friends" element={<ProtectedRoute><Friends /></ProtectedRoute>} />
        <Route path="/vault" element={<ProtectedRoute><Vault /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/boutique" element={<ProtectedRoute><Boutique /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}

export default App

