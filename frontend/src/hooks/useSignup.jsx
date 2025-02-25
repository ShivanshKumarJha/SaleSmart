import {useState} from 'react';
import BASE_URL from '../constants/BASE_URL.js';
import {useNavigate} from "react-router-dom";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const signup = async formData => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${BASE_URL}/user/signup`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.message || 'Signup failed');
            }

            navigate('/verify-otp', {
                state: {
                    email: json.email,
                    tempData: {
                        name: json.tempData?.name,
                        image: json.tempData?.image
                    }
                }
            });
        } catch (err) {
            setError(err.message || 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    return {signup, isLoading, error};
};
