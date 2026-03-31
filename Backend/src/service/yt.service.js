const axios = require("axios")

const API_KEY = process.env.YOUTUBE_API_KEY

// ✅ Robust ISO duration parser
function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  const hours = parseInt(match[1] || 0)
  const minutes = parseInt(match[2] || 0)
  const seconds = parseInt(match[3] || 0)

  return hours * 3600 + minutes * 60 + seconds
}

async function getSong(query) {
  try {
    // 🔥 Step 1: Search
    const res = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          type: "video",
          videoCategoryId: "10",
          maxResults: 30,
          key: API_KEY
        }
      }
    )

    const items = res.data.items || []

    if (items.length === 0) {
      return []
    }

    // ✅ Extract valid IDs only
    const videoIds = items
      .map(item => item?.id?.videoId)
      .filter(Boolean)
      .join(",")

    if (!videoIds) return []

    // 🔥 Step 2: Get duration
    const detailsRes = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "contentDetails",
          id: videoIds,
          key: API_KEY
        }
      }
    )

    const durationMap = {}

    detailsRes.data.items.forEach(item => {
      durationMap[item.id] = parseDuration(item.contentDetails.duration)
    })

    // 🔥 Step 3: Combine
    const songs = items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      duration: durationMap[item.id.videoId] || 0
    }))

    // console.log("All songs:", songs)

    // 🔥 Step 4: Strict filter
    let validSongs = songs.filter(song => {
      const t = song.title.toLowerCase()

      return (
        song.duration > 120 &&
        song.duration < 400 &&
        t.includes("official") &&
        !t.includes("jukebox") &&
        !t.includes("mix") &&
        !t.includes("playlist") &&
        !t.includes("full album") &&
        t.includes("lofi")
      )
    })

    // 🔥 Step 5: Fallback filter (IMPORTANT)
    if (validSongs.length === 0) {
      validSongs = songs.filter(song => {
        const t = song.title.toLowerCase()

        return (
          song.duration > 120 &&
          song.duration < 400 &&
          !t.includes("jukebox") &&
          !t.includes("mix") &&
          !t.includes("playlist")
        )
      })
    }

    // console.log("Filtered songs:", validSongs)

    return validSongs

  } catch (error) {
    console.error("YouTube API error:", error.message)
    return []
  }
}

module.exports = getSong