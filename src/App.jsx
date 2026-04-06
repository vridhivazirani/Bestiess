import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Friends from './pages/Friends'
import Vault from './pages/Vault'
import Profile from './pages/Profile'
import Boutique from './pages/Boutique'
import Journal from './pages/Journal'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Layout>
  )
}

export default App
