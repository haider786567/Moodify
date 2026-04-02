import { useDispatch } from "react-redux";
import { fetchSong } from "../song.slice.js";
import { setCurrentSong } from "../../player/player.slice.js";

    export const useSong = () => {
    const dispatch = useDispatch();


    const handleGetSong = async (data) => {
        
        // Dispatch the action to fetch the song
        const result = await dispatch(fetchSong({ mood: data.mood }));
        dispatch(setCurrentSong(result.payload)) // Set the current song in the player state;
    };


    return {
        handleGetSong
    };
    };