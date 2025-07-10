import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import BASE_URL from '../constants/BASE_URL.js';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const signup = async formData => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/user/signup`, {
        method: 'POST',
        body: formData,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || 'Signup failed');
      }

      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
