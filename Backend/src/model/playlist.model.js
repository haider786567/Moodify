const mongoose = require("mongoose")


const playlistSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    songs:[{
        videoId: String,
        title: String,
        thumbnail: String,
        channel: String
    }],
},{
    timestamps:true
})
const playlistModel = mongoose.model("Playlist",playlistSchema)
module.exports = playlistModel