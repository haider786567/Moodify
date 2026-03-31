import React from 'react'
import FaceExpression from '../../expression/component/FaceExpression.jsx'
import { useSong } from '../hook/useSong.js'
import Music from '../component/music.jsx'
import './home.scss'

const Home = () => {
    const { handleGetSong } = useSong()

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="greeting">
                    <h2>Welcome to Moodify</h2>
                    <p>Detect your mood to start playing the perfect track.</p>
                </div>
            </header>

            <div className="dashboard-grid">
                {/* Left Column: AI Scanner */}
                <div className="dashboard-panel scanner-panel glass-panel">
                    <div className="panel-header">
                        <h3><span className="icon">📸</span> Emotion Scanner</h3>
                    </div>
                    <div className="panel-content scanner-wrapper">
                        <FaceExpression 
                            onClick={(expression) => { handleGetSong({ mood: expression }) }}
                        />
                    </div>
                </div>

                {/* Right Column: Music Player */}
                <div className="dashboard-panel player-panel glass-panel">
                    <div className="panel-header">
                        <h3><span className="icon">🎵</span> Now Playing</h3>
                    </div>
                    <div className="panel-content player-wrapper">
                        <Music />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home 
