import { useDispatch } from "react-redux";
import { fetchPlaylists,createNewPlaylist,addSongToPlaylist,removeSongFromPlaylist,deleteExistingPlaylist,getSingleExistingPlaylist,updateExistingPlaylist } from "../playlist.slice.js";

export const usePlaylist = () => {
    const dispatch = useDispatch();

    const handleFetchPlaylists = () => {
        dispatch(fetchPlaylists());
    };

    const handleCreatePlaylist = (name) => {
        dispatch(createNewPlaylist(name));
    };

    const handleAddToPlaylist = (playlistId, videoId) => {
        dispatch(addSongToPlaylist({ playlistId, videoId }));
    };

    const handleRemoveFromPlaylist = (playlistId, videoId) => {
        dispatch(removeSongFromPlaylist({ playlistId, videoId }));
    };

    const handleDeletePlaylist = (playlistId) => {
        dispatch(deleteExistingPlaylist(playlistId));
    };

    const handleGetSinglePlaylist = (playlistId) => {
        dispatch(getSingleExistingPlaylist(playlistId));
    };

    const handleUpdatePlaylist = (playlistId, name) => {
        dispatch(updateExistingPlaylist({ playlistId, name }));
    };

    return {
        handleFetchPlaylists,
        handleCreatePlaylist,
        handleAddToPlaylist,
        handleRemoveFromPlaylist,
        handleDeletePlaylist,
        handleGetSinglePlaylist,
        handleUpdatePlaylist
    };
};