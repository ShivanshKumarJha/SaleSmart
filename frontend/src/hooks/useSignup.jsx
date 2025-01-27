import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";
import BASE_URL from "../constants/BASE_URL.js";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useContext(AuthContext);

    const signup = async (name, email, password, confirm_password, image) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password, confirm_password, image}),
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
    };

    return {signup, isLoading, error};
}