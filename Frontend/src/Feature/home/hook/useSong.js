import { useDispatch } from "react-redux";
import { fetchSong } from "../song.slice";

    export const useSong = () => {
    const dispatch = useDispatch();


    const handleGetSong = async (data) => {
        // Dispatch the action to fetch the song
        dispatch(fetchSong({ mood: data.mood }));
    };


    return {
        handleGetSong
    };
    };