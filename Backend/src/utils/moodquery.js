const getMoodQuery =  (mood) => {
    const moodMap = {
    happy: "bollywood happy songs hindi upbeat official music video",
    sad: "bollywood sad songs hindi emotional official music video",
    surprised: "bollywood party songs hindi energetic official music video"
}
    return moodMap[mood] || null
}

module.exports = getMoodQuery       

