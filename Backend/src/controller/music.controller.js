const getSong = require("../service/yt.service")
const getMoodQuery = require("../utils/moodquery.js")
const historyModel = require("../model/history.model");
const favoriteModel = require("../model/fav.model");
const playlistModel = require("../model/playlist.model")
async function getSongsByMood(req, res) {
    const {mood} = req.query
    console.log(mood);
    
    const query = getMoodQuery(mood)
    if (!query) {
        return res.status(400).json({ error: "Invalid mood" })
    }
    try {
        const songs = await getSong(query)

        console.log(songs);
        
        
        
        const randomIndex = Math.floor(Math.random() * songs.length)
        const selectedSong = songs[randomIndex]
        // console.log(selectedSong);
        
        
        const history = await historyModel.findOneAndUpdate(
    {
        userId: req.user.id,
        videoId: selectedSong.videoId
    },
    {
        $set: {
        playedAt: new Date(),
        mood
        },
        $setOnInsert: {
        title: selectedSong.title,
        thumbnail: selectedSong.thumbnail
        }
    },
    {
        upsert: true,
        new: true
    }
)
        console.log(history);
        res.status(200).json(selectedSong)
    } catch (error) {
        console.error("Error fetching songs:", error)
        res.status(500).json({ error: "Failed to fetch songs" })
    }
}

async function history(req,res){
    const userId = req.user.id
    const history = await historyModel.find({userId}).sort({playedAt:-1})
    if(!history){
        return res.status(404).json({error:"No history found"})
    }
    res.status(200).json(history)
}
async function CreatePlaylist(req,res){
    const {name} = req.body
    const userId = req.user.id
    const playlist = await playlistModel.create({
        name,
        userId,
        songs:[]
    })
    res.status(201).json(playlist)
}
async function GetPlaylist(req,res){
    const userId = req.user.id
    const playlists = await playlistModel.find({userId})
    res.status(200).json(playlists)
}
async function GetSinglePlaylist(req,res){
    const {playlistId} = req.params
    const playlist = await playlistModel.findById(playlistId)
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    res.status(200).json(playlist)
}
async function UpdatePLaylist(req,res){
    const {playlistId} = req.params
    const {name} = req.body
    const playlist = await playlistModel.findByIdAndUpdate(playlistId,{name},{new:true})
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    res.status(200).json(playlist)
}
async function DeletePlaylist(req,res){
    const {playlistId} = req.params
    const playlist = await playlistModel.findByIdAndDelete(playlistId)
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    res.status(200).json({message:"Playlist deleted successfully"})
}
async function AddToPlaylist(req,res){
    try {
        const { playlistId } = req.params;
        const {videoId} = req.body

        if (!videoId) {
            return res.status(400).json({
                error: "videoId is required"
            });
        }

        const playlist = await playlistModel.findOneAndUpdate(
            {
                _id: playlistId,
                userId: req.user.id
            },
            {
                $addToSet: { songs: { videoId } }
            },
            { new: true }
        );

        if (!playlist) {
            return res.status(404).json({
                error: "Playlist not found or unauthorized"
            });
        }

        res.status(200).json(playlist);

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
}
async function RemoveFromPlaylist(req, res) {
  try {
    const { playlistId, videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        error: "videoId is required"
      });
    }

    const playlist = await playlistModel.findOneAndUpdate(
      {
        _id: playlistId,
        userId: req.user.id
      },
      {
        $pull: { songs: { videoId } }
      },
      { new: true }
    );

    if (!playlist) {
      return res.status(404).json({
        error: "Playlist not found or unauthorized"
      });
    }

    res.status(200).json(playlist);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}
async function addToFav(req,res){
    const {videoId,title,thumbnail} = req.body
    const userId = req.user.id
    const fav = await favoriteModel.create({
        userId,
        videoId,
        title,
        thumbnail
    })
    res.status(201).json(fav)
}


module.exports = {getSongsByMood,history,CreatePlaylist,AddToPlaylist,GetPlaylist,DeletePlaylist,RemoveFromPlaylist,GetSinglePlaylist,addToFav,UpdatePLaylist}
