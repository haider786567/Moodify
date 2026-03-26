const axios = require("axios")

const API_KEY = process.env.YOUTUBE_API_KEY

 async function getSong(query){
    const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
            params: {
        part: "snippet",
        q: query,
        type: "video",
        videoCategoryId: "10", 
        maxResults: 10,
        key: API_KEY}
    }
    )
    const songs = res.data.items.map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url
    }))
    console.log(songs);
    
    
    return songs


}
module.exports = getSong