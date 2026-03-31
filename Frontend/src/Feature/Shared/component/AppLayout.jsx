import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './layout.scss'

const AppLayout = () => {
  return (
    <div className="app-layout">
      {/* Background ambient effect */}
      <div className="ambient-bg"></div>
      
      {/* Sidebar for Desktop, Bottom Nav for Mobile */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="main-content">
        <header className="mobile-header glass-panel">
          <div className="logo">
            <span className="logo-icon">🎵</span>
            <span className="logo-text">Moodify</span>
          </div>
        </header>

        <main className="page-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout
