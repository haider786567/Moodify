const express = require("express")
const musicRouter = express.Router()
const musicController = require("../controller/music.controller")
const { identifyUser } = require("../middleware/auth.middleware")

musicRouter.get("/mood", identifyUser, musicController.getSongsByMood)
musicRouter.get("/history", identifyUser, musicController.history)
musicRouter.post(
  "/playlists",
  identifyUser,
  musicController.CreatePlaylist
);

musicRouter.get(
  "/playlists",
  identifyUser,
  musicController.GetPlaylist
);
musicRouter.get(
  "/playlists/:playlistId",
  identifyUser,
  musicController.GetSinglePlaylist
);

musicRouter.patch(
  "/playlists/:playlistId",
  identifyUser,
  musicController.UpdatePLaylist
);  


musicRouter.delete(
  "/playlists/:playlistId",
  identifyUser,
  musicController.DeletePlaylist
);

musicRouter.post(
  "/playlists/:playlistId/add",
  identifyUser,
  musicController.AddToPlaylist
);

musicRouter.delete(
  "/playlists/:playlistId/remove/:videoId",
  identifyUser,
  musicController.RemoveFromPlaylist
);
musicRouter.post("/favorites", identifyUser, musicController.addToFav)


module.exports = musicRouter