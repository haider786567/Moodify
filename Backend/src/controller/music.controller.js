const getSong = require("../service/yt.service")
const getMoodQuery = require("../utils/moodquery.js")
const historyModel = require("../model/history.model");
const favoriteModel = require("../model/fav.model");
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
        
        
        const history  = await historyModel.create({
            userId: req.user.id,
            videoId: selectedSong.videoId,
            title: selectedSong.title,
            thumbnail: selectedSong.thumbnail,
            mood
        })
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
    if(!name){
        return res.status(400).json({error:"Playlist name is required"})
    }
    const playlist = await playlistModel.create({
        name,
        userId
    })
    res.status(201).json(playlist)
}
async function AddToPlaylist(req,res){
    const id = req.params.id
    const {videoId,title,thumbnail,channel} = req.body
    const playlist = await playlistModel.findById(id)
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    playlist.songs.push({videoId,title,thumbnail,channel})
    await playlist.save()
    res.status(200).json(playlist)
}
async function GetPlaylist(req,res){
    const userId = req.user.id
    const playlists = await playlistModel.find({userId})
    res.status(200).json(playlists)
}
async function DeletePlaylist(req,res){
    const id = req.params.id
    const playlist = await playlistModel.findByIdAndDelete(id)
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    res.status(200).json({message:"Playlist deleted"})
}
async function RemoveFromPlaylist(req,res){
    const id = req.params.id
    const {videoId} = req.body
    const playlist = await playlistModel.findById(id)
    if(!playlist){
        return res.status(404).json({error:"Playlist not found"})
    }
    playlist.songs = playlist.songs.filter(song => song.videoId !== videoId)
    await playlist.save()
    res.status(200).json(playlist)
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


module.exports = {getSongsByMood,history,CreatePlaylist,AddToPlaylist,GetPlaylist,DeletePlaylist,RemoveFromPlaylist,addToFav}
