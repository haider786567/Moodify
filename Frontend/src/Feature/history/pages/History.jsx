import { useSelector, useDispatch } from "react-redux"
import { setCurrentSong } from "../../player/player.slice"
import "../style/history.scss"
import {  useEffect } from "react"
import { useHistory } from "../hooks/useHistory"
import {useNavigate} from "react-router-dom"


export default function History() {
  const { history, loading, err } = useSelector((state) => state.history) 
  const dispatch = useDispatch()
  const { loadHistory } = useHistory()
  const navigate = useNavigate()

  useEffect(() => {
    loadHistory()
  }, [])
  
  

  const handlePlay = (song) => {
    dispatch(setCurrentSong(song))
    navigate("/app")
    
  }

  if (loading) return <p>Loading...</p>
  if (err) return <p>Error: {err}</p>

  return (
    <div className="history-page">
      <h2>Listening History</h2>
      <p className="page-description">Your past played songs</p>

      <div className="history-list">
        {history.map((item) => (
          <div
            key={item._id}
            className="history-item"
            onClick={() => handlePlay(item)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="song-thumbnail"
            />

            <div className="song-info">
              <p className="song-title">{item.title}</p>
              <p className="song-meta">
                {new Date(item.playedAt).toLocaleDateString()}
              </p>
            </div>
            
            <button className="play-btn">▶</button>
          </div>
        ))}
      </div>
    </div>
  );
}
