import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import FaceExpression from '../../expression/component/FaceExpression.jsx'
import { useSong } from '../hook/useSong.js'
import Music from '../component/music.jsx'
import { useHistory } from '../../history/hooks/useHistory.js'
import { setCurrentSong } from '../../player/player.slice.js'
import './home.scss'

const Home = () => {
    const { handleGetSong } = useSong()
    const { loadHistory } = useHistory()
    const { history, loading } = useSelector((state) => state.history)
    const dispatch = useDispatch()

    useEffect(() => {
        loadHistory()
    }, [])

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

            {/* Bottom Row: Previously Played */}
            <div className="dashboard-panel history-panel glass-panel">
                <div className="panel-header">
                    <h3><span className="icon">🕒</span> Previously Played</h3>
                </div>
                <div className="history-content">
                    {loading ? (
                        <p style={{ color: "var(--text-secondary)" }}>Loading history...</p>
                    ) : history && history.length > 0 ? (
                        <ul className="history-list">
                            {history.slice(0, 10).map((item, idx) => (
                                <li 
                                    key={idx} 
                                    className="history-item"
                                    onClick={() => dispatch(setCurrentSong(item))}
                                >
                                    <img 
                                        src={item.thumbnail || `https://img.youtube.com/vi/${item.videoId}/default.jpg`} 
                                        alt={item.title} 
                                        className="history-thumb" 
                                    />
                                    <div className="history-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.mood ? `Mood: ${item.mood}` : 'Moodify AI Selection'}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="empty-history" style={{ color: "var(--text-secondary)" }}>No previously played tracks yet.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home 
