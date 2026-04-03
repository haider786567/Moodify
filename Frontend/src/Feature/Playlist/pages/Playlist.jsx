import React, { useEffect } from 'react'
import { usePlaylist } from '../hooks/usePlaylist';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong, playPlaylist } from '../../player/player.slice';
import './playlist.scss';

const Playlist = () => {
  const { handleFetchPlaylists } = usePlaylist();
  const { playlists, loading, error } = useSelector((state) => state.playlists);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchPlaylists();
  }, []);

  return (
    <div className="playlist-container">
      <header className="playlist-header">
        <h2>Your Playlists</h2>
        <p>Save and organize your favorite mood-based tracks here.</p>
      </header>

      {loading && <p className="loading-msg">Loading playlists...</p>}
      
      {error && <p className="error-msg">Error: {error}</p>}

      {!loading && !error && playlists.length === 0 && (
        <p className="empty-msg">You haven't created any playlists yet.</p>
      )}

      {playlists.length > 0 && (
        <div className="playlist-grid">
          {playlists.map((playlist) => (
            <div key={playlist._id} className="playlist-card glass-panel">
              <div className="playlist-card-header">
                <h3>{playlist.name}</h3>
                <span className="song-count">
                  {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                </span>
              </div>
              
              <div className="playlist-songs">
                {playlist.songs.length > 0 ? (
                  <>
                    {playlist.songs.slice(0, 3).map((song, idx) => (
                      <div 
                        key={idx} 
                        className="song-item" 
                        onClick={() => dispatch(playPlaylist({ songs: playlist.songs, startIndex: idx }))}
                        style={{ cursor: 'pointer' }}
                      >
                        <img 
                          src={song.thumbnail || `https://img.youtube.com/vi/${song.videoId}/default.jpg`} 
                          alt={song.title} 
                          className="song-thumb"
                        />
                        <div className="song-details">
                          <h4>{song.title}</h4>
                          <p>Moodify AI Selection</p>
                        </div>
                      </div>
                    ))}
                    {playlist.songs.length > 3 && (
                      <p className="more-songs">+{playlist.songs.length - 3} more</p>
                    )}
                  </>
                ) : (
                  <p className="empty-playlist">No songs in this playlist.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Playlist
