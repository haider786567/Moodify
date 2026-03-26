const express = require("express")
const app = express()

const cookie = require("cookie-parser")
const cors = require("cors")

const AuthRouter = require("./routes/auth.routes")
const SongRouter = require("./routes/song.routes")
const musicRouter = require("./routes/music.routes")

const { errorHandler } = require("./middleware/error.middleware")

app.use(express.json())
app.use(cookie())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use("/api/auth", AuthRouter)
app.use("/api/songs", SongRouter)
app.use("/api/music",musicRouter)


app.use(errorHandler)

module.exports = app