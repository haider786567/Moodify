const express = require("express")
const musicRouter = express.Router()
const musicController = require("../controller/music.controller")
const { identifyUser } = require("../middleware/auth.middleware")

musicRouter.get("/mood/:mood", identifyUser, musicController.getSongsByMood)
musicRouter.get("/history", identifyUser, musicController.history)
musicRouter.post("/playlist", identifyUser, musicController.CreatePlaylist)
musicRouter.post("/playlist/:id", identifyUser, musicController.AddToPlaylist)
musicRouter.get("/playlist", identifyUser, musicController.GetPlaylist) 
musicRouter.delete("/playlist/:id", identifyUser, musicController.DeletePlaylist)
musicRouter.delete("/playlist/:id/song", identifyUser, musicController.RemoveFromPlaylist)
musicRouter.post("/favorites", identifyUser, musicController.addToFav)


module.exports = musicRouter