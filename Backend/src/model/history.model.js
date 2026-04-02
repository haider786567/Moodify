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
    thumbnail: String,

    playedAt: {
        type: Date,
        default: Date.now
    }

    }
)
const historyModel = mongoose.model("History",historySchema)
historySchema.index({ userId: 1, videoId: 1 }, { unique: true })
module.exports = historyModel