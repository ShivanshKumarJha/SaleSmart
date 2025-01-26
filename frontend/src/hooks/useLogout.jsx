import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";

export const useLogout = () => {
    const {dispatch} = useContext(AuthContext);

    const logout = async () => {
        localStorage.removeItem('user');
        dispatch({type: 'LOGOUT'});
    }

    return {logout};
}