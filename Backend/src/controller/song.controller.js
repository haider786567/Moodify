const songModel = require("../model/song.model")
const id3 = require("node-id3")
const storageService = require("../service/storage.service")

async function uploadSong(req,res){
    const songBuffer = req.file.buffer
    
    const {mood} = req.body
    const tags = id3.read(songBuffer)


    const [Songfile,Posterfile]=await Promise.all([
    storageService.uploadfile({
        buffer:songBuffer,
        filename:tags.title +".mp3",
        folder:"cohort2/moodify/songs"
    }),
    storageService.uploadfile({
        buffer:tags.image.imageBuffer,
        filename:tags.title +".jpeg",
        folder:"cohort2/moodify/poster"
    })
    ])
    
    const song = await songModel.create({
        title:tags.title,
        url:Songfile.url,
        posterurl:Posterfile.url,
        mood
    })
    res.status(200).json({
        message:"uploaded",
        song
    })
}

async function getsong(req,res){
    const {mood} = req.query
    const song = await songModel.findOne({
        mood,
        
    })
    res.status(200).json({
        message:"here is song ",
        song
    })
}
module.exports = {
    uploadSong,
    getsong
}