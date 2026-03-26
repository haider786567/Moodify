import { useContext } from "react";
import { SongContext } from "../song.context";
import { getSong } from "../service/song.api";
export const useSong = ()=>{
    const context = useContext(SongContext)
    const {loading ,setloading,song,setsong}= context

    async function HandleGetSong({mood}){
        setloading(true)
        const data = await getSong({mood})
        setsong(data.song)
        setloading(false)
    }
    return (
        {loading,song,HandleGetSong}
    )
}