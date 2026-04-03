import React, { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchPlaylists, createNewPlaylist, addSongToPlaylist } from "../../Playlist/playlist.slice.js"
import { playNext, playPrevious } from "../../player/player.slice.js"
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

    const dispatch = useDispatch()
    const { playlists } = useSelector((state) => state.playlists)
    const [showMenu, setShowMenu] = useState(false)
    const [newPlaylistName, setNewPlaylistName] = useState("")

    useEffect(() => {
        dispatch(fetchPlaylists())
    }, [dispatch])

    const handleNativePromptCreate = async () => {
        const name = window.prompt("Enter new playlist name:")
        if (name && name.trim()) {
            try {
                const newPlaylist = await dispatch(createNewPlaylist(name.trim())).unwrap();
                if (newPlaylist && newPlaylist._id && videoId) {
                    dispatch(addSongToPlaylist({ playlistId: newPlaylist._id, videoId }));
                }
            } catch (error) {
                console.error("Error creating playlist:", error);
            }
        }
        setShowMenu(false)
    }

    const handleAddToPlaylist = (playlistId) => {
        if (!videoId) return
        dispatch(addSongToPlaylist({ playlistId, videoId }))
        setShowMenu(false)
    }

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
                        } else if (event.data === window.YT.PlayerState.ENDED) {
                            setIsPlaying(false)
                            dispatch(playNext())
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
                <div className="song-title-row">
                    <h3 className="song-title">{title}</h3>
                    <div className="playlist-menu-container">
                        <button 
                            className="context-menu-btn" 
                            onClick={() => setShowMenu(!showMenu)}
                        >
                            ⋮
                        </button>
                        {showMenu && (
                            <div className="playlist-dropdown glass-panel">
                                <h4>Add to Playlist</h4>
                                
                                {playlists && playlists.length > 0 ? (
                                    <ul className="playlist-options">
                                        {playlists.map(pl => (
                                            <li key={pl._id} onClick={() => handleAddToPlaylist(pl._id)}>
                                                {pl.name}
                                            </li>
                                        ))}
                                        <div className="dropdown-divider" style={{height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.5rem 0'}}></div>
                                        <li onClick={handleNativePromptCreate} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                                            + Create New Playlist
                                        </li>
                                    </ul>
                                ) : (
                                    <ul className="playlist-options">
                                        <p className="empty-msg">No playlists yet</p>
                                        <li onClick={handleNativePromptCreate} style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                                            + Create New Playlist
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
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
                <button className="control-btn secondary" onClick={() => dispatch(playPrevious())}>⏮</button>
                <button className="control-btn primary play-pause" onClick={togglePlay}>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button className="control-btn secondary" onClick={() => dispatch(playNext())}>⏭</button>
            </div>
        </div>
    )
}

export default Music