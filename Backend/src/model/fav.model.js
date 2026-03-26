const mongoose = require("mongoose")

const favoriteSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    videoId: String,

    title: String,

    thumbnail: String

})
const favoriteModel = mongoose.model("Favorite", favoriteSchema)
module.exports = favoriteModel