import React from 'react'
import { Link } from 'react-router-dom'
import './landing.scss'

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="ambient-bg"></div>
      
      <nav className="landing-nav glass-panel">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <span className="logo-text">Moodify</span>
        </div>
        <div className="nav-links">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Register</Link>
        </div>
      </nav>

      <main className="landing-hero">
        <div className="hero-content">
          <div className="badge glass-panel">
            <span className="badge-dot"></span>
            AI-Powered Music Discovery
          </div>
          <h1 className="hero-title">
            Your Vibe, <br/>
            <span className="highlight">Your Soundtrack.</span>
          </h1>
          <p className="hero-subtitle">
            Moodify connects with your camera to detect your facial expressions and instantaneously generates a personalized, Youtube-powered playlist that perfectly matches your current mood.
          </p>
          
          <div className="hero-cta">
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary glass-panel">Login to Account</Link>
          </div>
          
          <div className="features-grid">
            <div className="feature-card glass-panel">
              <div className="icon">📸</div>
              <h3>Instant Detection</h3>
              <p>State-of-the-art AI reads your emotion in real-time.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="icon">🎧</div>
              <h3>Infinite Music</h3>
              <p>Seamlessly streams tracks from YouTube's massive library.</p>
            </div>
            <div className="feature-card glass-panel">
              <div className="icon">⚡️</div>
              <h3>Smart History</h3>
              <p>Save your favorite tracks and review your past vibes.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Landing
