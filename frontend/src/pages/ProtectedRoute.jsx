import {useAuth} from "../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, isCheckingAuth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isCheckingAuth) {
            navigate('/login');
        }
    }, [isAuthenticated, isCheckingAuth, navigate]);

    return isAuthenticated ? children : null;
};

export default ProtectedRoute;