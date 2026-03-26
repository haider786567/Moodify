const express = require("express")

const Songroute = express.Router()
const upload = require("../middleware/upload.middleware")
const SongConroller = require("../controller/song.controller")
const { identifyUser } = require("../middleware/auth.middleware")

Songroute.post("/", upload.single("songs"),SongConroller.uploadSong)
Songroute.get("/",SongConroller.getsong)

module.exports = Songroute