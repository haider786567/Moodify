const mongoose = require("mongoose")

const historySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    videoId: String,

    title: String,

    mood: String,

    playedAt: {
        type: Date,
        default: Date.now
    }

    }
)
const historyModel = mongoose.model("History",historySchema)
module.exports = historyModel