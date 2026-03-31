import React from 'react'
import { NavLink } from 'react-router-dom'
import Logout from '../../home/component/Logout'

const Sidebar = () => {
  return (
    <aside className="sidebar glass-panel">
      
      <div className="sidebar-header">
        <span className="logo-icon">🎵</span>
        <span className="logo-text">Moodify</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/app" end className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">💿</span>
          <span className="label">Player</span>
        </NavLink>
        <NavLink to="/app/playlist" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">🎧</span>
          <span className="label">Playlist</span>
        </NavLink>
        <NavLink to="/app/history" className={({isActive}) => isActive ? "nav-item active" : "nav-item"}>
          <span className="icon">⏱️</span>
          <span className="label">History</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <Logout />
      </div>
      
    </aside>
  )
}

export default Sidebar
