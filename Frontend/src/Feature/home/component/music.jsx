import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import "./music.scss"



const Music = () => {
    

    const currentSong = useSelector((state) => state.player.currentSong)
    
    const videoId = currentSong ? currentSong.videoId : null
    const title = currentSong ? currentSong.title : "Loading..."
    
    

    
    

    const playerRef = useRef(null)
    const intervalRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isReady, setIsReady] = useState(false)

    // Load YouTube API
    useEffect(() => {
        const initPlayer = () => {
            if (!window.YT || !window.YT.Player ) return

            new window.YT.Player("yt-player", {
                height: "0",
                width: "0",
                // videoId: videoId,
                playerVars: {
                    autoplay: 1,
                    controls: 0,
                    mute: 1
                },
                events: {
                    onReady: (event) => {
                                console.log("READY ✅")

                                playerRef.current = event.target
                                setIsReady(true)

                                // 🔥 CRITICAL FIX
                                if (videoId) {
                                    event.target.loadVideoById(videoId)
                                    event.target.playVideo()
                                    setIsPlaying(true)
                                }
                                },
                    onStateChange: (event) => {
                        // 1 = playing, 2 = paused, 0 = ended
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setIsPlaying(true)
                        } else {
                            setIsPlaying(false)
                        }
                    }
                }
            })
        }

        if (window.YT && window.YT.Player) {
            initPlayer()
        } else {
            const tag = document.createElement("script")
            tag.src = "https://www.youtube.com/iframe_api"
            document.body.appendChild(tag)

            window.onYouTubeIframeAPIReady = initPlayer
        }
    }, [])

    // Change video safely
    useEffect(() => {
  if (!isReady || !playerRef.current || !videoId) return

  playerRef.current.loadVideoById(videoId)
  playerRef.current.unMute()
  playerRef.current.playVideo()

  setIsPlaying(true)
}, [videoId, isReady])

    // Progress tracking
    useEffect(() => {
        if (!isReady) return

        intervalRef.current = setInterval(() => {
            if (playerRef.current && isPlaying) {
                const current = playerRef.current.getCurrentTime()
                const total = playerRef.current.getDuration()

                if (total > 0) {
                    setProgress(current)
                    setDuration(total)
                }
            }
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [isReady, isPlaying])

    // Controls
    const togglePlay = () => {
        if (!playerRef.current) return

        if (isPlaying) {
            playerRef.current.pauseVideo()
            setIsPlaying(false)
        } else {
            playerRef.current.unMute()
            playerRef.current.playVideo()
            setIsPlaying(true)
        }
    }

    const handleSeek = (e) => {
        const value = Number(e.target.value)
        playerRef.current.seekTo(value, true)
        setProgress(value)
    }

    const formatTime = (timeInSeconds) => {
        const m = Math.floor(timeInSeconds / 60)
        const s = Math.floor(timeInSeconds % 60)
        return `${m}:${s < 10 ? '0' : ''}${s}`
    }

    if (!videoId) {
        return (
            <div className="music-player empty-state">
                <div className="empty-icon">🎧</div>
                <p>Waiting for mood detection...</p>
            </div>
        )
    }

    return (
        <div className="music-player">
            {/* Hidden YouTube Player */}
            <div id="yt-player"></div>

            {/* Album Art / Thumbnail */}
            <div className={`music-poster ${isPlaying ? 'playing' : ''}`}>
                <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt={title}
                    onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                    }}
                />
            </div>

            <div className="song-info">
                <h3 className="song-title">{title}</h3>
                <p className="song-artist">Moodify AI Selection</p>
            </div>

            {/* Progress bar */}
            <div className="progress-container">
                <span className="time current">{formatTime(progress)}</span>
                <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={progress}
                    onChange={handleSeek}
                    className="progress-bar"
                    style={{ backgroundSize: `${(progress / duration) * 100}% 100%` }}
                />
                <span className="time duration">{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className="controls">
                <button className="control-btn secondary">⏮</button>
                <button className="control-btn primary play-pause" onClick={togglePlay}>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn secondary">⏭</button>
            </div>
        </div>
    )
}

export default Music