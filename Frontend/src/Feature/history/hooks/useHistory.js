import { fetchHistory } from "../history.slice";
import { useDispatch } from "react-redux";

export function useHistory(){
    const dispatch = useDispatch()

    const loadHistory = ()=>{
        dispatch(fetchHistory())
    }
    return {
        loadHistory,
    }
}