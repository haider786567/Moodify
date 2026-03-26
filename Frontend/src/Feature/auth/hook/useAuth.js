
import { useDispatch } from "react-redux";
import { loginUser,registerUser,fetchCurrentUser,logoutUser } from "../auth.slice";


export const useAuth = () => {
    const dispatch = useDispatch();
    return{
        login: (data) => dispatch(loginUser(data)),
        register: (data) => dispatch(registerUser(data)),
        getMe: () => dispatch(fetchCurrentUser()),
        logout: () => dispatch(logoutUser())    
    }
}