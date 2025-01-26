import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (!authContext) {
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }
    return authContext
}