import { useState } from 'react';
import { useAuth } from './useAuth.jsx';
import { useLocalStorage } from './useLocalStorage.jsx';
import BASE_URL from '../constants/BASE_URL.js';

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, user } = useAuth();
  const { updateLocalStorage } = useLocalStorage();
  const token = user?.token;

  const updateUser = async (userId, updatedFields) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/user/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedFields,
      });

      const json = await response.json();
      //   console.log('Updated User Response:', json);

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message || 'Failed to update user');
      } else {
        updateLocalStorage('user', 'user', json);
        dispatch({ type: 'UPDATE_USER', payload: json });
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      setError('An error occurred while updating the user');
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateUser };
};
