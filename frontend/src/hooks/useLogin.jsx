import {useState} from "react";
import BASE_URL from "../constants/BASE_URL.js";
import {useAuth} from "./useAuth.jsx";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuth();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/user/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    }

    return {login, isLoading, error};
}