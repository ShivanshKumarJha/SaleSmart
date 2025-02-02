import {useState} from 'react';
import BASE_URL from '../constants/BASE_URL.js';
import {useAuth} from './useAuth.jsx';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {dispatch} = useAuth();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('Attempting to connect to:', `${BASE_URL}/user/login`);
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
            });

            const json = await response.json();
            // console.log(json);

            if (!response.ok) {
                throw new Error(json.error || 'Login failed');
            }

            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
        } catch (err) {
            setError(err.message || 'Could not connect to server');
        } finally {
            setIsLoading(false);
        }
    };

    return {login, isLoading, error};
};
